"use strict";
import { ILightModel } from "../../interfaces/xiaomi";
import { Application } from "express";
const { color } = require("abstract-things/values");

const cfg = require("../../../config/config.json");
class LightService {
  private getLightData(app: Application, id: string): Promise<ILightModel> {
    return new Promise((resolve, reject) => {
      let result: ILightModel = {
        colorTemperature: -1,
        id: id,
        ip: "",
        power: false,
        rgb: { b: 0, r: 0, g: 0 },
        name: "",
        brightness: -1
      };
      let lights: any[] = app.locals.xiaomi.yeelights;
      if (!lights || lights.length < 1) {
        console.log("NO LIGHTS FOUND!");
        resolve(undefined);
        return;
      }
      let filteredLight = undefined;
      lights.forEach(light => {
        if (light.id === id) {
          filteredLight = light;
        }
      });
      if (!filteredLight) {
        console.log("NO LIGHT FOUND WITH ID:", id, result.id);
        resolve(undefined);
        return;
      }
      let proms = [];

      let p1 = filteredLight.call("get_prop", ["rgb", "ct", "name", "HUE"]).then(properties => {
        console.log("PROPERTIES: " + properties);
        const intToRGB = require("int-to-rgb");
        const rgbInt = parseInt(properties[0]);
        const colors = intToRGB(rgbInt);
        result.rgb = {
          b: colors.blue,
          g: colors.green,
          r: colors.red
        };
        result.colorTemperature = properties[1];
      });
      proms.push(p1);
      let p2 = filteredLight.power().then(value => {
        result.power = value;
      });
      proms.push(p2);
      let p4 = filteredLight.brightness().then(value => {
        result.brightness = value;
      });
      proms.push(p4);
      Promise.all(proms)
        .then(() => {
          let cleanId = id.indexOf(":") > -1 ? id.split(":")[1] : id;
          cfg.devices.lights.forEach(gw => {
            if (cleanId === gw.id) {
              result.name = gw.name;
            }
          });
          resolve(result);
          //  filteredLight.destroy();
        })
        .catch(() => {
          reject();
        });
    });
  }
  getLights(app: Application): Promise<ILightModel[]> {
    return new Promise((resolve, reject) => {
      let result: ILightModel[] = [];
      let yeelights: any[] = app.locals.xiaomi.yeelights;
      if (!yeelights || yeelights.length < 1) {
        resolve(result);
      }
      let proms = [];
      yeelights.forEach(gw => {
        let p = this.getLightData(app, gw.id).then(data => {
          if (data) {
            result.push(data);
          }
        });
        proms.push(p);
      });
      Promise.all(proms)
        .then(resultProperties => {
          resolve(result);
        })
        .catch(err => {
          console.log("Error:" + JSON.stringify(err));
          reject({ error: "error" });
        });
    });
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
      let proms = [];
      yeelights.forEach(gw => {
        let p = this.getLightData(app, gw.id).then(data => {
          if (data) {
            result.push(data);
          }
        });
        proms.push(p);
      });
      Promise.all(proms)
        .then(resultProperties => {
          resolve(result);
        })
        .catch(err => {
          console.log("Error:" + JSON.stringify(err));
          reject({ error: "error" });
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
            //  light.destroy();
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
      let yeelight = yeelights.find(gw => {
        return gw.id === lightId;
      });
      this.getLightData(app, lightId).then(light => {
        if (!light) {
          reject({ power: "Light not found" });
          return;
        }
        yeelight
          .power(!light.power)
          .then(newValue => {
            resolve({ power: newValue });
            // yeelight.destroy();
          })
          .catch(error => {
            reject({
              message: "can not set power",
              response: error,
              power: "error"
            });
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
      light
        .brightness(value)
        .then(newValue => {
          console.log("Light brightness: " + newValue);
          resolve({ brightness: newValue });
          //  light.destroy();
        })
        .catch(e => {
          console.log("Error changeBrightness!", JSON.stringify(e));
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
      // this.updateColor(color.temperature(parsedValue));
      //  _propertiesToMonitor: [ 'power', 'bright', 'color_mode', 'model', 'ct', 'delayoff', 'rgb' ],

      light
        .call("set_ct_abx", [parsedValue, "smooth", 100])
        .then(newValue => {
          console.log("set ct!" + newValue);
          // light.destroy();
          resolve({ set_ct_abx: newValue });
        })
        .catch(e => {
          console.log("error... updateColor in setTemperature", e);
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
        return;
      }
      console.log("set color to: " + parsedValue);
      light
        .call("set_rgb", [parsedValue, "smooth", 200])
        .then(newValue => {
          resolve({ rgb: newValue });
          //    light.destroy();
        })
        .catch(() => {
          reject({ rgb: "error" });
        });
    });
  }
}
export let LightServiceInstance = new LightService();
