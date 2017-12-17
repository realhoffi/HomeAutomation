// import express = require("express");
import express from "express";
import os = require("os");
import {
  ILightModel,
  IRGBColor,
  IBaseWeatherSensor,
  IGatewayModel
} from "../../models/xiaomi";
import { request } from "http";

const cfg = require("./../../config/config.json");
export function registerRoutes(router: express.Router) {
  router.route("/sensors").get(function(req, res) {
    let result: IBaseWeatherSensor[] = [];
    let sensors: any[] = req.app.locals.xiaomi.sensors;
    if (!sensors || sensors.length < 1) {
      res.json({ sensors: result });
      return;
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
      //   console.log(JSON.stringify(result));
    }
    cfg.devices.sensors.forEach(sensor => {
      result.forEach(sens => {
        if (sens.id === sensor.id) {
          sens.name = sensor.name;
        }
      });
    });
    res.json({ sensors: result });
  });
  router.route("/sensors/:id/info/:properties").get(function(req, res) {
    let sensors: any[] = req.app.locals.xiaomi.sensors;
    let sensor = sensors.find(sens => {
      return sens.id === req.params.id;
    });
    if (sensor) {
      console.log("batteryLevel: " + sensor.batteryLevel);
      console.log("battery_level: " + sensor.battery_level);
      console.log("voltage: " + sensor.voltage);
      sensor._parent
        .call("get_device_prop_exp", [
          ["lumi." + sensor.id, ...req.params.properties.split(";")]
        ])
        .then(resultProperties => {
          res.json({ id: req.params.id, properties: resultProperties });
        })
        .catch(error => {
          console.log(error);
          res.status(500).json({ info: "Error fetching Info" });
        });
    } else {
      res.status(500).json({ info: "sensor not found" });
    }
  });

  router.route("/lights").get(function(req, res) {
    let result: ILightModel[] = [];
    let yeelights: any[] = req.app.locals.xiaomi.yeelights;
    // console.log("WEBAPI: " + yeelights.length);
    if (!yeelights || yeelights.length < 1) {
      res.json({ lights: result });
      res.end();
      return;
    }

    // let p = [];
    result = yeelights.map((light, index) => {
      // p.push(light.call("set_name", ["lampe_bad"]));
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

    res.json({ lights: result });
    // Promise.all(p).then(() => {
    //     console.log("Set Name");
    //     res.json({ lights: result });
    // }).catch(() => {
    //     console.log("Set Name failed");
    //     res.status(500).json({ error: "failed" });
    // });
    // console.log(JSON.stringify(result));
  });
  router.route("/lights/details").get(function(req, res) {
    let result: ILightModel[] = [];
    let yeelights: any[] = req.app.locals.xiaomi.yeelights;
    if (!yeelights || yeelights.length < 1) {
      res.json({ lights: result });
      return;
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
    let requests = yeelights.map(light => {
      return light.call("get_prop", ["rgb", "ct", "name", "HUE"]);
      // .then((properties) => {
      //     console.log("PROPERTIES: " + properties);
      // }).catch(() => {
      //     console.log("ERROR PROPERTIES");
      // });
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
        res.json({ lights: result });
      })
      .catch(() => {
        res.status(500).json({ error: "error" });
      });
  });
  router.route("/lights/:id/info/:properties").get(function(req, res) {
    let yeelights: any[] = req.app.locals.xiaomi.yeelights;
    let light = yeelights.find(gw => {
      return gw.id === req.params.id;
    });
    if (light) {
      light
        .call("get_prop", req.params.properties.split(";"))
        .then(resultProperties => {
          res.json({ id: req.params.id, properties: resultProperties });
        })
        .catch(() => {
          res.status(500).json({ info: "Error fetching Info" });
        });
    } else {
      res.status(500).json({ info: "Light not found" });
    }
  });
  router.route("/lights/:id/power").post(function(req, res) {
    let yeelights: any[] = req.app.locals.xiaomi.yeelights;
    let light = yeelights.find(gw => {
      return gw.id === req.params.id;
    });
    if (light) {
      light
        .setPower(!light.power)
        .then((newValue, b) => {
          res.json({ power: newValue });
        })
        .catch(() => {
          res.status(500).json({ power: "error" });
        });
    } else {
      res.status(500).json({ power: "Light not found" });
    }
  });
  router.route("/lights/:id/brightness/:value").post(function(req, res) {
    let yeelights: any[] = req.app.locals.xiaomi.yeelights;
    let light = yeelights.find(gw => {
      return gw.id === req.params.id;
    });
    if (light) {
      // console.log("PROPERTIES ");
      // console.log("power: " + light.power);
      // console.log("brightness: " + light.brightness);
      // console.log("colorMode: " + light.colorMode);
      // console.log("colorTemperature: " + light.colorTemperature);
      // console.log("model: " + light.model);

      // 'color:temperature', 'color:rgb'
      console.log(
        "found light: " + req.params.id + " @@ brightness: " + req.params.value
      );
      let bright = parseInt(req.params.value);

      light
        .setBrightness(bright)
        .then(() => {
          console.log("Light brightness: " + bright);
          res.json({ brightness: req.params.value });
        })
        .catch(() => {
          res.status(500).json({ brightness: "error" });
        });
    } else {
      res.status(500).json({ brightness: "Light not found" });
    }
  });
  router.route("/lights/:id/temperature/:value").post(function(req, res) {
    let yeelights: any[] = req.app.locals.xiaomi.yeelights;
    let light = yeelights.find(gw => {
      return gw.id === req.params.id;
    });
    if (light) {
      let parsedValue = parseInt(req.params.value);
      if (parsedValue < 1700 || parsedValue > 6500) {
        res.status(500).json({ error: "value must between 1700 and 6500" });
      }
      //  _propertiesToMonitor: [ 'power', 'bright', 'color_mode', 'model', 'ct', 'delayoff', 'rgb' ],
      light
        .call("set_ct_abx", [parsedValue, "smooth", 100])
        .then(a => {
          console.log("set ct!" + a);
          res.json({ set_ct_abx: req.params.value });
        })
        .catch(() => {
          res.status(500).json({ set_ct_abx: "error" });
        });
    } else {
      res.status(500).json({ set_ct_abx: "error" });
    }
  });
  router.route("/lights/:id/color/:value").post(function(req, res) {
    let yeelights: any[] = req.app.locals.xiaomi.yeelights;
    let light = yeelights.find(gw => {
      return gw.id === req.params.id;
    });
    if (!light) {
      res.status(500).json({ rgb: "light not found" });
      return;
    }
    let parsedValue = parseInt(req.params.value);
    if (isNaN(parsedValue)) {
      res.status(500).json({ error: "value must between 1700 and 6500" });
    }

    light
      .call("set_rgb", [parsedValue, "smooth", 500])
      .then(newValue => {
        res.json({ rgb: newValue });
      })
      .catch(() => {
        res.status(500).json({ rgb: "error" });
      });
  });

  router.route("/gateways").get(function(req, res) {
    let result: IGatewayModel[] = [];
    let gateways: any[] = req.app.locals.xiaomi.gateways;
    if (!gateways || gateways.length < 1) {
      res.json({ gateways: result });
      return;
    }

    result = gateways.map((gw): IGatewayModel => {
      //   console.log("RGB: " + JSON.stringify(gw.color));
      //   console.log("brightness: " + JSON.stringify(gw.brightness));

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
      // .then(() => {
      //     console.log("fetching RGB on Gateway Ok");
      // }).catch(() => {
      //     console.log("Error fetching RGB on Gateway");
      // });
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
        res.json({ gateways: result });
      })
      .catch(err => {
        console.log("Error:" + JSON.stringify(err));
        res.status(500).json({ error: "error" });
      });
  });
  router.route("/gateways/:id/info/:properties").get(function(req, res) {
    let gateways: any[] = req.app.locals.xiaomi.gateways;
    let gateway = gateways.find(gw => {
      return gw.id === req.params.id;
    });
    if (gateway) {
      gateway
        .call("get_prop", req.params.properties.split(";"))
        .then(resultProperties => {
          console.log("GWPROPS: " + JSON.stringify(resultProperties));
          res.json({ id: req.params.id, properties: resultProperties });
        })
        .catch(() => {
          res.status(500).json({ error: "prop not fetched" });
        });
    } else {
      res.status(500).json({ error: "Gateway not found" });
    }
  });
  router.route("/gateways/:id/brightness/:value").post(function(req, res) {
    let gateways: any[] = req.app.locals.xiaomi.gateways;
    let gateway = gateways.find(gw => {
      return gw.id === req.params["id"];
    });
    if (gateway) {
      let newBrightness = req.params.value;
      const color = gateway.rgb;
      const bright = gateway.brightness;

      const brightness = Math.max(0, Math.min(100, Math.round(newBrightness)));
      const rgb =
        (brightness << 24) |
        (color.red << 16) |
        (color.green << 8) |
        color.blue;

      gateway
        .call("set_rgb", [rgb], { refresh: true })
        .then(newValue => {
          res.json({ rgb: newValue });
        })
        .catch(() => {
          res.status(500).json({ error: "brightness not set" });
        });
    } else {
      res.status(500).json({ brightness: "error! can not set brightness" });
    }
  });
  router.route("/gateways/:id/color").post(function(req, res) {
    let gateways: any[] = req.app.locals.xiaomi.gateways;
    let gateway = gateways.find(gw => {
      return gw.id === req.params["id"];
    });
    let color: IRGBColor = req.body.color;
    console.log("Color: " + JSON.stringify(color));
    if (gateway && color) {
      console.log("found gw: " + req.params.id);

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
          res.json({ rgb: newValue });
        })
        .catch(() => {
          res.status(500).json({ error: "color not set" });
        });
    }
  });
  router.route("/gateways/:id/power").post(function(req, res) {
    let gateways: any[] = req.app.locals.xiaomi.gateways;
    let gateway = gateways.find(gw => {
      return gw.id === req.params["id"];
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
          res.json({ power: gateway.brightness > 0 });
        })
        .catch(() => {
          res.json({ error: "brightness not set" });
        });
    } else {
      res.status(500).json({
        error: "Kein Gateway mit ID " + req.params["id"] + " gefunden"
      });
    }
  });

  router.route("/system").get(function(req, res) {
    res.json({
      system: {
        freeMemory: os.freemem(),
        totalMemory: os.totalmem(),
        hostname: os.hostname(),
        userName: os.userInfo().username,
        uptime: os.uptime(),
        platform: os.platform(),
        arch: os.arch()
      }
    });
    //  res.status(500).json({ error: "error" });
  });
}
