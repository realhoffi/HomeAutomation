"use strict";
import { Application } from "express";
import { IBaseWeatherSensor } from "../../interfaces/xiaomi";
import { Db } from "mongodb";
const cfg = require("../../../config/config.json");
class SensorService {
  public getSensors(app: Application): IBaseWeatherSensor[] {
    let result: IBaseWeatherSensor[] = [];
    let sensors: any[] = app.locals.xiaomi.sensors;
    if (!sensors || sensors.length < 1) {
      return result;
    }
    if (sensors && sensors.length > 0) {
      result = sensors.map((sensor, index) => {
        return {
          name: "",
          hasPressure: sensor.hasCapability("pressure"),
          id: sensor.id,
          ip: sensor.ip,
          humidity: sensor.humidity || -1,
          pressure: sensor.hasCapability("pressure") ? sensor.pressure : -1,
          temperature: sensor.temperature || -1
        } as IBaseWeatherSensor;
      });
    }
    cfg.devices.sensors.forEach(sensor => {
      result.forEach(sens => {
        if (sens.id === sensor.id) {
          sens.name = sensor.name;
        }
      });
    });
    return result;
  }
  public getSensorProperties(
    app: Application,
    sensorId: string,
    properties: string[]
  ): Promise<any> {
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
            message:
              "error on query sensor method 'get_device_prop_exp'. Msg: " +
              error
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
      }
      //  let db = app.locals.database as Db;

      app.locals.database
        .collection("test")
        .insert({
          insertTime: Date.now(),
          id: sensor.id,
          ip: sensor.ip,
          humidity: sensor.humidity || -1,
          pressure: sensor.hasCapability("pressure") ? sensor.pressure : -1,
          temperature: sensor.temperature || -1
        })
        .then(result => {
          resolve({ message: "inserted" });
        })
        .catch(() => {
          reject({ message: "not inserted" });
        });

      // };
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
        .collection("test")
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
}

export let SensorServiceInstance = new SensorService();
