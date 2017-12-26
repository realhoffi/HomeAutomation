"use strict";
import { ILightModel } from "../../interfaces/xiaomi";
import { Application } from "express";

const cfg = require("./../../config/config.json");
class LightService {
  getLights(app: Application): ILightModel[] {
    let result: ILightModel[] = [];
    let yeelights: any[] = app.locals.xiaomi.yeelights;
    if (!yeelights || yeelights.length < 1) {
      return result;
    }

    result = yeelights.map((light, index) => {
      return {
        name: "",
        power: light.power,
        id: light.id,
        intensity: light.intensity,
        brightness: light.brightness,
        colorTemperature: light.colorTemperature,
        ip: light.address,
        rgb: light.rgb || { b: 0, g: 0, r: 0 }
      } as ILightModel;
    });

    cfg.devices.lights.forEach(light => {
      result.forEach(lightModel => {
        if (lightModel.id === light.id) {
          lightModel.name = light.name;
        }
      });
    });
    return result;
  }
  getLightDetails(app: Application) {
    return new Promise<ILightModel[]>((resolve, reject) => {
      let result: ILightModel[] = [];
      let yeelights: any[] = app.locals.xiaomi.yeelights;
      console.log("step 0:" + yeelights.length);
      if (!yeelights || yeelights.length < 1) {
        resolve(result);
        return;
      }
      console.log("step 1");
      result = yeelights.map((light, index) => {
        return {
          name: "",
          power: light.power,
          id: light.id,
          intensity: light.intensity,
          brightness: light.brightness,
          colorTemperature: light.colorTemperature,
          ip: light.address,
          rgb: light.rgb || { b: 0, g: 0, r: 0 }
        } as ILightModel;
      });
      cfg.devices.lights.forEach(light => {
        result.forEach(lightModel => {
          if (lightModel.id === light.id) {
            lightModel.name = light.name;
          }
        });
      });
      console.log("step 2");
      let requests = yeelights.map(light => {
        return light.call("get_prop", ["rgb", "ct", "name", "HUE"]);
      });
      Promise.all(requests)
        .then(resultProperties => {
          resultProperties.forEach((properties, index) => {
            console.log("PROPERTIES: " + properties);
            const intToRGB = require("int-to-rgb");
            const rgbInt = parseInt(properties[0]);
            const colors = intToRGB(rgbInt);
            result[index].rgb = {
              b: colors.blue,
              g: colors.green,
              r: colors.red
            };
            result[index].colorTemperature = properties[1];
          });
          resolve(result);
        })
        .catch(error => {
          reject({ message: "error query 'get_prop'", error: error });
        });
    });
  }
  getLightProperties(app: Application, lightId: string, properties: string[]) {
    return new Promise((resolve, reject) => {
      let yeelights: any[] = app.locals.xiaomi.yeelights;
      let light = yeelights.find(gw => {
        return gw.id === lightId;
      });
      if (light) {
        light
          .call("get_prop", properties)
          .then(resultProperties => {
            resolve({ id: lightId, properties: resultProperties });
          })
          .catch(() => {
            reject({ info: "Error fetching Info" });
          });
      } else {
        reject({ info: "Light not found" });
      }
    });
  }
  setPower(app: Application, lightId: string) {
    return new Promise((resolve, reject) => {
      let yeelights: any[] = app.locals.xiaomi.yeelights;
      let light = yeelights.find(gw => {
        return gw.id === lightId;
      });
      if (!light) {
        reject({ power: "Light not found" });
        return;
      }
      light
        .setPower(!light.power)
        .then(newValue => {
          resolve({ power: newValue });
        })
        .catch(error => {
          reject({
            message: "can not set power",
            response: error,
            power: "error"
          });
        });
    });
  }
  setBrightness(app: Application, lightId: string, value: string) {
    return new Promise((resolve, reject) => {
      let yeelights: any[] = app.locals.xiaomi.yeelights;
      let light = yeelights.find(gw => {
        return gw.id === lightId;
      });
      if (!light) {
        reject({ brightness: "Light not found" });
        return;
      }
      console.log("found light: " + lightId + " @@ brightness: " + value);
      let bright = parseInt(value);

      light
        .setBrightness(bright)
        .then(newValue => {
          console.log("Light brightness: " + bright);
          resolve({ brightness: newValue });
        })
        .catch(() => {
          reject({ brightness: "error" });
        });
    });
  }
  setTemperature(app: Application, lightId: string, value: string) {
    return new Promise((resolve, reject) => {
      let yeelights: any[] = app.locals.xiaomi.yeelights;
      let light = yeelights.find(gw => {
        return gw.id === lightId;
      });
      if (!light) {
        reject({ set_ct_abx: "light not found" });
        return;
      }
      let parsedValue = parseInt(value);
      if (parsedValue < 1700 || parsedValue > 6500) {
        reject({ error: "value must between 1700 and 6500" });
        return;
      }
      //  _propertiesToMonitor: [ 'power', 'bright', 'color_mode', 'model', 'ct', 'delayoff', 'rgb' ],
      light
        .call("set_ct_abx", [parsedValue, "smooth", 100])
        .then(newValue => {
          console.log("set ct!" + newValue);
          resolve({ set_ct_abx: newValue });
        })
        .catch(() => {
          reject({ set_ct_abx: "error" });
        });
    });
  }
  setColor(app: Application, lightId: string, value: string) {
    return new Promise((resolve, reject) => {
      let yeelights: any[] = app.locals.xiaomi.yeelights;
      let light = yeelights.find(gw => {
        return gw.id === lightId;
      });
      if (!light) {
        reject({ rgb: "light not found" });
        return;
      }
      let parsedValue = parseInt(value);
      if (isNaN(parsedValue)) {
        reject({ error: "can not parse color temperature" });
      }

      light
        .call("set_rgb", [parsedValue, "smooth", 200])
        .then(newValue => {
          resolve({ rgb: newValue });
        })
        .catch(() => {
          reject({ rgb: "error" });
        });
    });
  }
}
export let LightServiceInstance = new LightService();
