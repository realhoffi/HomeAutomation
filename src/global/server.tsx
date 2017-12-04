import path = require("path");
import { Server } from "http";
import * as http from "http";
import express = require("express");
import * as React from "react";
import debug = require("debug");
import url = require("url");
import fs = require("fs");
import { StaticRouter } from "react-router-dom";
import favicon = require("serve-favicon");
import { registerRoutes } from "../api/routes/routes";
import bodyParser = require("body-parser");
import { Request } from "express";

import Aqara = require("lumi-aqara");

function normalizePort(val) {
    let port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}
function getUriFromRequest(request: Request) {
    return url.format({
        protocol: request.protocol,
        host: request.get("host"),
        pathname: request.originalUrl
    });
}

const app = express();
const log = debug("serverjs");
const port = normalizePort(process.env.PORT || 8080);
const env = process.env.NODE_ENV || "production";

app.set("port", port);
app.use(favicon(path.join(__dirname, "icons", "favicon.ico")));
app.use("/css", express.static(path.join(__dirname, "css")));
app.use("/js", express.static(path.join(__dirname, "js")));
// configure app to use bodyParser(), this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// REGISTER OUR ROUTES -------------------------------
let router = express.Router();

router.use(function (req, res, next) {
    let uri = getUriFromRequest(req);
    console.log("Request on URL: " + uri);
    next();
});
registerRoutes(router);
// all of our routes will be prefixed with /api
app.use("/api", router);

app.locals = { xiaomi: { gateways: [] } };

// app.set("test", { "ID": "5ds" });
// app.set("xiaomi", { "gateways": [] });

app.get("/", function (request, response) {
    response.sendFile(path.join("views", "index.html"), { root: __dirname }, (error) => {
        app.locals.test += 1;
        if (error) {
            console.log("ERROR SENDFILE!" + JSON.stringify(error));
        }
        response.end();
    });
});

// last route to catch routing errors 404 not found
app.get("*", function (request, response) {
    let uri = getUriFromRequest(request);
    response.status(404).json({ "error": "route " + uri + " not found" });
    console.log("catch wrong api request from URL: " + uri);
});

app.use((err, req, res, next) => {
    res.status(500);
    res.render("error", { error: err });
});

app.listen(3000);

let server = http.createServer(app);
server.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    console.info(`Server running on http://localhost:${port} [${env}]`);
});


const aqara = new Aqara();
aqara.on("gateway", (gateway) => {
    console.log("Gateway discovered");
    gateway.on("ready", () => {
        let exists = app.locals.xiaomi.gateways.filter((gw) => {
            return gateway.sid === gw;
        });
        // console.log(exists);
        if (!exists || exists.length === 0) {
            console.log("Gateway existiert nicht");
            app.locals.xiaomi.gateways.push(gateway);
        } else {
            console.log("Gateway existiert bereits", gateway.sid);
        }

        console.log("Gateway is ready");
        console.log("IP:", gateway.ip);
        console.log("sid:", gateway.sid);
        gateway.setPassword("E2DFC915F00C49B4");
        // gateway.setColor({ r: 255, g: 255, b: 125 });
        // gateway.setColor({ r: 0, g: 0, b: 0 });
        // gateway.setIntensity(100);
    });

    gateway.on("offline", () => {
        gateway = null;
        console.log("Gateway is offline");
    });

    gateway.on("subdevice", (device) => {
        console.log("New device");
        console.log(`  Battery: ${device.getBatteryPercentage()}%`);
        console.log(`  Type: ${device.getType()}`);
        console.log(`  SID: ${device.getSid()}`);
        switch (device.getType()) {
            case "magnet":
                console.log(`  Magnet (${device.isOpen() ? "open" : "close"})`);
                device.on("open", () => {
                    console.log(`${device.getSid()} is now open`);
                });
                device.on("close", () => {
                    console.log(`${device.getSid()} is now close`);
                });
                break;
            case "switch":
                console.log(`  Switch`);
                device.on("click", () => {
                    console.log(`${device.getSid()} is clicked`);
                });
                device.on("doubleClick", () => {
                    console.log(`${device.getSid()} is double clicked`);
                });
                device.on("longClickPress", () => {
                    console.log(`${device.getSid()} is long pressed`);
                });
                device.on("longClickRelease", () => {
                    console.log(`${device.getSid()} is long released`);
                });
                break;
            case "motion":
                console.log(`  Motion (${device.hasMotion() ? "motion" : "no motion"})`);
                device.on("motion", () => {
                    console.log(`${device.getSid()} has motion${device.getLux() !== null ? " (lux:" + device.getLux() + ")" : ""}`);
                });
                device.on("noMotion", () => {
                    console.log(`${device.getSid()} has no motion (inactive:${device.getSecondsSinceMotion()}${device.getLux() !== null ? " lux:" + device.getLux() : ""})`);
                });
                break;
            case "sensor":
                console.log(`  Sensor (temperature:${device.getTemperature()}C rh:${device.getHumidity()}%${device.getPressure() != null ? " pressure:" + device.getPressure() + "kPa" : ""})`);
                device.on("update", () => {
                    console.log(`${device.getSid()} temperature: ${device.getTemperature()}C rh:${device.getHumidity()}%${device.getPressure() != null ? " pressure:" + device.getPressure() + "kPa" : ""}`);
                });
                break;
            case "leak":
                console.log(`  Leak sensor`);
                device.on("update", () => {
                    console.log(`${device.getSid()}${device.isLeaking() ? "" : " not"} leaking`);
                });
                break;
            case "cube":
                console.log(`  Cube`);
                device.on("update", () => {
                    console.log(`${device.getSid()} ${device.getStatus()}${device.getRotateDegrees() !== null ? " " + device.getRotateDegrees() : ""}`);
                });
                break;
        }
    });

    gateway.on("lightState", (state) => {
        let b = -1;
        console.log(`Light updated: ${JSON.stringify(state)}`);
        let exists = app.locals.xiaomi.gateways.find((gw, index) => {
            b = index;
            return gateway.sid === gw;
        });
        if (b > -1) {
            app.locals.xiaomi.gateways[b] = gateway;
        }
    });
});

// PW LAND : E2DFC915F00C49B4  192.168.178.45
