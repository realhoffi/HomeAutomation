import { IGatewayModel, IRGBColor } from "../../interfaces/xiaomi";
import { Application } from "express";

"use strict";
const cfg = require("../../../config/config.json");
class GatewayService {
  getGateways(app: Application) {
    return new Promise((resolve, reject) => {
      let result: IGatewayModel[] = [];
      let gateways: any[] = app.locals.xiaomi.gateways;
      if (!gateways || gateways.length < 1) {
        reject({ gateways: result });
        return;
      }

      result = gateways.map((gw): IGatewayModel => {
        return {
          illuminance: gw.illuminance,
          id: gw.id,
          ip: gw.ip,
          power: gw.brightness > 0,
          rgb: gw.color || { b: 0, r: 0, g: 0 },
          name: "",
          brightness: gw.brightness
        };
      });
      cfg.devices.gateways.forEach(gw => {
        result.forEach(gwModel => {
          if (gwModel.id === gw.id) {
            gwModel.name = gw.name;
          }
        });
      });
      let requests = gateways.map(gw => {
        return gw.call("get_prop", ["rgb"]);
      });
      Promise.all(requests)
        .then(resultProperties => {
          resultProperties.forEach((properties, index) => {
            const buf = Buffer.alloc(4);
            buf.writeUInt32BE(properties[0], 0);
            result[index].rgb = {
              b: buf.readUInt8(3),
              g: buf.readUInt8(2),
              r: buf.readUInt8(1)
            };
            result[index].brightness = buf.readUInt8(0);
          });
          resolve({ gateways: result });
        })
        .catch(err => {
          console.log("Error:" + JSON.stringify(err));
          reject({ error: "error" });
        });
    });
  }
  getGatewayProperties(
    app: Application,
    gatewayId: string,
    properties: string[]
  ) {
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
      if (gateway) {
        const color = gateway.rgb;
        const bright = gateway.brightness;

        const brightness = Math.max(
          0,
          Math.min(100, Math.round(gateway.brightness > 0 ? 0 : 100))
        );
        const rgb =
          (brightness << 24) |
          (color.red << 16) |
          (color.green << 8) |
          color.blue;
        console.log("RGB::: " + rgb);
        gateway
          .call("set_rgb", [rgb], { refresh: true })
          .then(newValue => {
            resolve({ power: gateway.brightness > 0 });
          })
          .catch(() => {
            reject({ error: "brightness not set" });
          });
      } else {
        reject({
          error: "Kein Gateway mit ID " + gatewayId + " gefunden"
        });
      }
    });
  }
  setBrightness(app: Application, gatewayId: string, value: any) {
    return new Promise((resolve, reject) => {
      let gateways: any[] = app.locals.xiaomi.gateways;
      let gateway = gateways.find(gw => {
        return gw.id === gatewayId;
      });
      if (gateway) {
        let newBrightness = value;
        const color = gateway.rgb;
        const bright = gateway.brightness;

        const brightness = Math.max(
          0,
          Math.min(100, Math.round(newBrightness))
        );
        const rgb =
          (brightness << 24) |
          (color.red << 16) |
          (color.green << 8) |
          color.blue;

        gateway
          .call("set_rgb", [rgb], { refresh: true })
          .then(newValue => {
            resolve({ rgb: newValue });
          })
          .catch(() => {
            reject({ error: "brightness not set" });
          });
      } else {
        reject({ brightness: "error! can not set brightness" });
      }
    });
  }
  setColor(app: Application, gatewayId: string, colorValue: any) {
    return new Promise((resolve, reject) => {
      let gateways: any[] = app.locals.xiaomi.gateways;
      let gateway = gateways.find(gw => {
        return gw.id === gatewayId;
      });
      let color: IRGBColor = colorValue;
      console.log("Color: " + JSON.stringify(color));
      if (gateway && color) {
        const brightness = Math.max(
          0,
          Math.min(100, Math.round(gateway.brightness))
        );
        const rgb =
          (brightness << 24) | (color.r << 16) | (color.g << 8) | color.b;
        console.log("new color: " + rgb);
        gateway
          .call("set_rgb", [rgb], { refresh: true })
          .then(newValue => {
            resolve({ rgb: newValue });
          })
          .catch(() => {
            reject({ error: "color not set" });
          });
      }
    });
  }
}

export let GatewayServiceInstance = new GatewayService();
