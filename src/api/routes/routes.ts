import express = require("express");
import { ILightModel, IRGBColor, IBaseWeatherSensor } from "../../models/xiaomi";
import { request } from "http";
const cfg = require("./../../config/config.json");
export function registerRoutes(router: express.Router) {
    router.route("/sensors").get(function (req, res) {
        let result: IBaseWeatherSensor[] = [];
        let sensors: any[] = req.app.locals.xiaomi.sensors;
        if (sensors && sensors.length > 0) {
            result = sensors.map((sensor, index) => {
                return {
                    name: "",
                    hasPressure: sensor.hasCapability("pressure"),
                    id: sensor.id,
                    ip: sensor.ip,
                    humidity: sensor.humidity || -1,
                    pressure: sensor.pressure || -1,
                    temperature: sensor.temperature || -1,
                } as IBaseWeatherSensor;
            });
            console.log(JSON.stringify(result));
        }
        cfg.devices.sensors.forEach((sensor) => {
            result.forEach((sens) => {
                if (sens.id === sensor.id) {
                    sens.name = sensor.name;
                }
            });
        });
        res.json({ sensors: result });
    });

    router.route("/lights").get(function (req, res) {
        let a = cfg;
        console.log(cfg);
        let result: ILightModel[] = [];
        let yeelights: any[] = req.app.locals.xiaomi.yeelights;
        console.log("WEBAPI: " + yeelights.length);
        if (yeelights && yeelights.length > 0) {
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

            cfg.devices.lights.forEach((light) => {
                result.forEach((lightModel) => {
                    if (lightModel.id === light.id) {
                        lightModel.name = light.name;
                    }
                });
            });

            console.log(JSON.stringify(result));

        }
        res.json({ lights: result });
    });
    router.route("/lights/details").get(function (req, res) {
        let result: ILightModel[] = [];
        let yeelights: any[] = req.app.locals.xiaomi.yeelights;
        if (!yeelights || yeelights.length < 1) {
            res.json({ lights: result });
            res.end();
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
        cfg.devices.lights.forEach((light) => {
            result.forEach((lightModel) => {
                if (lightModel.id === light.id) {
                    lightModel.name = light.name;
                }
            });
        });
        let requests = yeelights.map((light) => {
            return light.call("get_prop", ["rgb", "ct"]);
        });
        Promise.all(requests).then((resultProperties) => {
            resultProperties.forEach((properties, index) => {
                console.log("PROPERTIES: " + properties);
                const intToRGB = require("int-to-rgb");
                const rgbInt = parseInt(properties[0]);
                const colors = intToRGB(rgbInt);
                result[index].rgb = { b: colors.blue, g: colors.green, r: colors.red };
            });
            res.json({ lights: result });
        }).catch(() => {
            res.status(500).json({ error: "error" });
        });
    });
    router.route("/lights/:id/info/:properties").get(function (req, res) {
        let yeelights: any[] = req.app.locals.xiaomi.yeelights;
        let light = yeelights.find((gw) => {
            return gw.id === req.params.id;
        });
        if (light) {
            light.call("get_prop", req.params.properties.split(";")).then((resultProperties) => {
                res.json({ id: req.params.id, "properties": resultProperties });
            });
        }

    });
    router.route("/lights/:id/power").post(function (req, res) {
        let yeelights: any[] = req.app.locals.xiaomi.yeelights;
        let light = yeelights.find((gw) => {
            return gw.id === req.params.id;
        });
        if (light) {
            light.setPower(!light.power).then((newValue, b) => {
                res.json({ "power": newValue });
            });
        }

    });
    router.route("/lights/:id/brightness/:value").post(function (req, res) {
        let yeelights: any[] = req.app.locals.xiaomi.yeelights;
        let light = yeelights.find((gw) => {
            return gw.id === req.params.id;
        });
        if (light) {
            console.log("PROPERTIES ");
            console.log("power: " + light.power);
            console.log("brightness: " + light.brightness);
            console.log("colorMode: " + light.colorMode);
            console.log("colorTemperature: " + light.colorTemperature);
            console.log("model: " + light.model);

            // 'color:temperature', 'color:rgb'
            console.log("found light: " + req.params.id + " @@ brightness: " + req.params.value);
            let bright = parseInt(req.params.value);

            light.setBrightness(bright).then(() => {
                console.log("Light brightness: " + bright);
            });
            // const rgb = 255 * 65536 + 1 * 256 + 1;
            // light.call("set_rgb", [rgb, "smooth", 500]);
        }
        res.json({ "intensity": req.params.value });
    });
    router.route("/lights/:id/temperature/:value").post(function (req, res) {
        let yeelights: any[] = req.app.locals.xiaomi.yeelights;
        let light = yeelights.find((gw) => {
            return gw.id === req.params.id;
        });
        if (light) {
            let parsedValue = parseInt(req.params.value);
            if (parsedValue < 1700 || parsedValue > 6500) {
                res.status(500).json({ error: "value must between 1700 and 6500" });
            }
            //  _propertiesToMonitor: [ 'power', 'bright', 'color_mode', 'model', 'ct', 'delayoff', 'rgb' ],
            light.call("set_ct_abx", [parsedValue, "smooth", 100]).then((a) => {
                console.log("set ct!" + a);
                res.json({ "set_ct_abx": req.params.value });
            });
        }

    });
    router.route("/lights/:id/color/:value").post(function (req, res) {
        let yeelights: any[] = req.app.locals.xiaomi.yeelights;
        let light = yeelights.find((gw) => {
            return gw.id === req.params.id;
        });
        if (light) {
            let parsedValue = parseInt(req.params.value);
            if (isNaN(parsedValue)) {
                res.status(500).json({ error: "value must between 1700 and 6500" });
            }

            light.call("set_rgb", [parsedValue, "smooth", 500]).then((a) => {
                res.json({ "rgb": a });
            });
        }
    });


    router.route("/gateways").get(function (req, res) {
        let result: IGatewayModel[] = [];
        let gateways: any[] = req.app.locals.xiaomi.gateways;
        if (gateways && gateways.length > 0) {
            result = gateways.map((gw): IGatewayModel => {
                return {
                    intensity: gw.intensity,
                    sid: gw.sid,
                    ip: gw.ip,
                    on: gw.intensity > 0,
                    rgb: gw.color
                };
            });
        }
        res.json({ gateways: result });
    });
    router.route("/gateways/:sid/intensity/:value").post(function (req, res) {
        let gateways: any[] = req.app.locals.xiaomi.gateways;
        let gateway = gateways.find((gw) => {
            return gw.sid === req.params["sid"];
        });
        if (gateway) {
            console.log("found gw: " + req.params.sid);
            gateway.setIntensity(req.params.value);
        }
        res.json({ "intensity": req.params.value });
    });
    router.route("/gateways/:sid/color").post(function (req, res) {
        let gateways: any[] = req.app.locals.xiaomi.gateways;
        let gateway = gateways.find((gw) => {
            return gw.sid === req.params["sid"];
        });
        let color = req.body || undefined;
        console.log(color);
        if (gateway && color) {
            console.log("found gw: " + req.params.sid);
            gateway.setColor(color);
        }
        res.json(color as {});
    });
    router.route("/gateways/:sid/").get(function (req, res) {
        let gateways: any[] = req.app.locals.xiaomi.gateways;
        let gateway = gateways.find((gw) => {
            return gw.sid === req.params["sid"];
        });
        if (gateway) {
            res.status(200).json({
                intensity: gateway.intensity,
                sid: gateway.sid,
                ip: gateway.ip,
                on: gateway.intensity > 0,
                rgb: gateway.color
            });
        } else {
            res.status(500).json({ error: "Gateway mit sid " + req.params["sid"] + " nicht gefunden" });
        }
    });
}