"use strict";
import { Application } from "express";
import { IBaseWeatherSensor } from "../../interfaces/xiaomi";
import { Db } from "mongodb";
const cfg = require("../../../config/config.json");
declare let MONGO_DB_SENSOR_COLLECTION_STRING: string;
declare let MONGO_DB_MERGED_SENSOR_DATA_COLLECTION_STRING: string;

class SensorService {
  private getCurrentDataFromSensor(app: Application, id: string): Promise<IBaseWeatherSensor> {
    return new Promise<IBaseWeatherSensor>((resolve, reject) => {
      let sensordata = undefined;
      let sensors: any[] = app.locals.xiaomi.sensors;
      if (!sensors || sensors.length < 1) {
        resolve(sensordata);
        return;
      }
      let sensor = undefined;
      sensors.forEach(element => {
        if (element.id === id) {
          sensor = element;
          return;
        }
      });

      // console.log("getCurrentDataFromSensor", id);
      let result = {
        timestamp: Date.now(),
        name: "",
        hasPressure: sensor.matches("cap:atmospheric-pressure"),
        id: sensor.id,
        ip: sensor.ip,
        humidity: -1,
        pressure: -1,
        temperature: -1
      } as IBaseWeatherSensor;
      let proms = [];
      if (sensor.matches("cap:relative-humidity")) {
        let p1 = sensor.relativeHumidity().then(humidity => {
          result.humidity = humidity;
        });
        proms.push(p1);
      }
      let p2 = sensor.temperature().then(temperature => {
        result.temperature = temperature ? temperature.value : -1;
      });
      proms.push(p2);
      if (sensor.matches("cap:battery-level")) {
        // sensor.batteryLevel().then(batterie => {
        //   console.log(batterie);
        //   //   result.pressure = pressure;
        //   // });
        // });
      }
      if (sensor.matches("cap:atmospheric-pressure")) {
        // console.log(sensor);
        // let p3 = sensor.atmosphericPressure().then(pressure => {
        //   result.pressure = pressure;
        // });
        // let p3 = sensor.pressure().then(pressure => {
        //   result.pressure = pressure;
        // });
        // proms.push(p3);
      }
      Promise.all(proms).then(() => {
        let cleanId = result.id;
        if (cleanId.indexOf(":") > -1) {
          cleanId = cleanId.split(":")[1];
        }
        result.id = cleanId;
        cfg.devices.sensors.forEach(sensor => {
          if (cleanId === sensor.id) {
            result.name = sensor.name;
          }
        });
        resolve(result);
      });
    });
  }
  public getSensors(app: Application): Promise<IBaseWeatherSensor[]> {
    return new Promise<IBaseWeatherSensor[]>((resolve, reject) => {
      let result: IBaseWeatherSensor[] = [];
      let sensors: any[] = app.locals.xiaomi.sensors;
      if (!sensors || sensors.length < 1) {
        resolve(result);
        return;
      }
      let proms = [];
      if (sensors && sensors.length > 0) {
        sensors.forEach((sensor, index) => {
          let p = this.getCurrentDataFromSensor(app, sensor.id).then(data => {
            result.push(data);
          });
          proms.push(p);
        });
      }
      Promise.all(proms).then(() => {
        resolve(result);
      });
    });
  }
  public getSensorProperties(app: Application, sensorId: string, properties: string[]): Promise<any> {
    return new Promise((resolve, reject) => {
      let sensors: any[] = app.locals.xiaomi.sensors;
      let sensor = sensors.find(sens => {
        return sens.id === sensorId;
      });
      if (!sensor) {
        reject({ message: "sensor not found" });
        return;
      }
      sensor._parent
        .call("get_device_prop_exp", [["lumi." + sensor.id, ...properties]])
        .then(resultProperties => {
          resolve({ id: sensorId, properties: resultProperties });
        })
        .catch(error => {
          console.log(error);
          reject({
            message: "error on query sensor method 'get_device_prop_exp'. Msg: " + error
          });
        });
    });
  }
  public logData(app: Application, sensorId: string) {
    return new Promise((resolve, reject) => {
      let sensors: any[] = app.locals.xiaomi.sensors;
      let sensor = sensors.find(sens => {
        return sens.id === sensorId;
      });
      if (!sensor) {
        reject({ message: "sensor not found" });
        return;
      } else {
        console.log("sensor found! ID: " + sensor.id);
      }
      this.getCurrentDataFromSensor(app, sensorId).then(data => {
        console.log("add data now.", JSON.stringify(data));
        app.locals.database
          .collection(MONGO_DB_SENSOR_COLLECTION_STRING)
          .insert(data)
          .then(result => {
            resolve({ message: "inserted" });
          })
          .catch(error => {
            console.log("error inserting", JSON.stringify(error));
            reject({ message: "not inserted" });
          });
      });
    });
  }
  public getSensorData(app: Application, sensorId?: string) {
    return new Promise((resolve, reject) => {
      let sensors: any[] = app.locals.xiaomi.sensors;
      let query = !sensorId || sensorId === "*" ? {} : { id: sensorId };
      if (sensorId) {
        let sensor = sensors.find(sens => {
          return sens.id === sensorId;
        });
      }
      console.log("Query Sensor Data: ", query);
      let db = app.locals.database as Db;

      db
        .collection(MONGO_DB_SENSOR_COLLECTION_STRING)
        .find(query)
        .toArray()
        .then(resultItems => {
          resolve({ items: resultItems });
        })
        .catch(() => {
          reject({ message: "not inserted" });
        });
    });
  }
  public getSensorDataBetweenDates(app: Application, sensorId: string, startDateTicks: string, endDateTicks: string) {
    return new Promise((resolve, reject) => {
      let sensors: any[] = app.locals.xiaomi.sensors;

      let from = parseInt(startDateTicks);
      let to = parseInt(endDateTicks);
      if (isNaN(from) || isNaN(to)) {
        reject({ message: "Parameter 'from' oder 'to' ist keine number!" });
      }
      let query = {
        id: sensorId
        //  timestamp: { $gte: from, $lte: to }
      };
      let ts = [];
      if (!isNaN(from) && from !== -1) {
        ts.push({ $gte: from });
      }
      if (!isNaN(to) && to !== -1) {
        ts.push({ $lte: to });
      }
      if (ts.length > 0) {
        let objTs = {};
        ts.forEach(element => {
          Object.keys(element).forEach(key => {
            objTs[key] = element[key];
          });
        });
        query["timestamp"] = objTs;
      }
      console.log("Query Sensor Data: ", query);
      let db = app.locals.database as Db;

      db
        .collection(MONGO_DB_SENSOR_COLLECTION_STRING)
        .find(query)
        .toArray()
        .then(resultItems => {
          console.log("Query result count: " + resultItems.length);
          resolve({ items: resultItems });
        })
        .catch(() => {
          reject({ message: "not inserted" });
        });
    });
  }
}

export let SensorServiceInstance = new SensorService();
