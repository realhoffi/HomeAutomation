import express = require("express");
import { IGatewayModel, IGatewayColor } from "../../models/gateway";
export function registerRoutes(router: express.Router) {
    router.route("/bears").get(function (req, res) {
        // req.app.locals.test -= 5;
        res.json({ "ID": 1 });
        // res.json([{ "ID": "1" }, req.app.locals, req.app.get("test")]);
    });

    router.route("/tears").get(function (req, res) {
        res.json({ "ID": 2 });
        //  req.app.locals.test += 100;
        //  res.json([{ "ID": "2" }, req.app.locals]);
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