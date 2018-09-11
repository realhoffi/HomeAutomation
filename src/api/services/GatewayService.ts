import { IGatewayModel, IRGBColor } from "../../interfaces/xiaomi";
import { Application } from "express";
"use strict";
const cfg = require("../../../config/config.json");
class GatewayService {
  private getGatewayLight(gateway) {
    if (!gateway) {
      return undefined;
    }
    const children = gateway.children();
    for (let child of children) {
      if (child.matches("type:miio:gateway-light")) {
        return child;
      }
    }
  }
  private getGatewayData(app: Application, id: string): Promise<IGatewayModel> {
    return new Promise((resolve, reject) => {
      let result: IGatewayModel = {
        illuminance: -1,
        id: id,
        ip: "",
        power: false,
        rgb: { b: 0, r: 0, g: 0 },
        name: "",
        brightness: -1
      };
      let gateways: any[] = app.locals.xiaomi.gateways;
      if (!gateways || gateways.length < 1) {
        console.log("NO GATEWAYS FOUND!");
        resolve(undefined);
        return;
      }
      let filteredGw = undefined;
      gateways.forEach(gw => {
        if (gw.id === id) {
          filteredGw = gw;
        }
      });
      if (!filteredGw) {
        console.log("NO GATEWAY FOUND WITH ID:", id, result.id);
        resolve(undefined);
        return;
      }
      let proms = [];

      let p1 = filteredGw.illuminance().then(value => {
        result.illuminance = value ? value.value : -1;
      });
      proms.push(p1);
      let light = this.getGatewayLight(filteredGw);
      if (!light) {
        console.log("NO LIGHT FOUND!");
        resolve(undefined);
        return;
      }
      let p2 = light.power().then(value => {
        result.power = value;
      });
      proms.push(p2);
      let p3 = light.color().then(value => {
        console.log("color", value);
        result.rgb = { r: value.values[0], g: value.values[1], b: value.values[2] };
      });
      proms.push(p3);
      let p4 = light.brightness().then(value => {
        result.brightness = value;
      });
      proms.push(p4);
      Promise.all(proms).then(() => {
        let cleanId = id.indexOf(":") > -1 ? id.split(":")[1] : id;
        cfg.devices.gateways.forEach(gw => {
          if (cleanId === gw.id) {
            result.name = gw.name;
          }
        });
        resolve(result);
      });
    });
  }
  getGateways(app: Application) {
    return new Promise((resolve, reject) => {
      let result: IGatewayModel[] = [];
      let gateways: any[] = app.locals.xiaomi.gateways;
      if (!gateways || gateways.length < 1) {
        console.log("NO GATEWAYS FOUND!");
        reject({ gateways: result });
        return;
      }
      let proms = [];
      gateways.forEach(gw => {
        let p = this.getGatewayData(app, gw.id).then(data => {
          if (data) {
            result.push(data);
          }
        });
        proms.push(p);
      });
      Promise.all(proms)
        .then(resultProperties => {
          resolve({ gateways: result });
        })
        .catch(err => {
          console.log("Error:" + JSON.stringify(err));
          reject({ error: "error" });
        });
    });
  }
  getGatewayProperties(app: Application, gatewayId: string, properties: string[]) {
    return new Promise((resolve, reject) => {
      let gateways: any[] = app.locals.xiaomi.gateways;
      let gateway = gateways.find(gw => {
        return gw.id === gatewayId;
      });
      if (gateway) {
        gateway
          .call("get_prop", properties)
          .then(resultProperties => {
            console.log("GWPROPS: " + JSON.stringify(resultProperties));
            resolve({ id: gatewayId, properties: resultProperties });
          })
          .catch(() => {
            reject({ error: "prop not fetched" });
          });
      } else {
        reject({ error: "Gateway not found" });
      }
    });
  }
  setPower(app: Application, gatewayId: string) {
    return new Promise((resolve, reject) => {
      let gateways: any[] = app.locals.xiaomi.gateways;
      let gateway = gateways.find(gw => {
        return gw.id === gatewayId;
      });
      if (!gateway) {
        reject({ error: "Kein Gateway mit ID " + gatewayId + " gefunden" });
      }
      let light = this.getGatewayLight(gateway);
      light.power().then(power => {
        light.power(!power).then(() => {
          resolve(!power);
          return;
        });
      });
    });
  }
  setBrightness(app: Application, gatewayId: string, value: any) {
    return new Promise((resolve, reject) => {
      let gateways: any[] = app.locals.xiaomi.gateways;
      let gateway = gateways.find(gw => {
        return gw.id === gatewayId;
      });
      if (!gateway) {
        reject({ error: "Kein Gateway mit ID " + gatewayId + " gefunden" });
      }
      let light = this.getGatewayLight(gateway);
      light.changeBrightness(value).then(newValue => {
        resolve(newValue);
        return;
      });
    });
  }
  setColor(app: Application, gatewayId: string, colorValue: any) {
    return new Promise((resolve, reject) => {
      let gateways: any[] = app.locals.xiaomi.gateways;
      let gateway = gateways.find(gw => {
        return gw.id === gatewayId;
      });
      if (!gateway) {
        reject({ error: "Kein Gateway mit ID " + gatewayId + " gefunden" });
      }

      let color: IRGBColor = colorValue;
      let light = this.getGatewayLight(gateway);
      light.changeColor({ rgb: { red: color.r, green: color.g, blue: color.b } }).then(newValue => {
        resolve(newValue);
        return;
      });
    });
  }
}

export let GatewayServiceInstance = new GatewayService();
