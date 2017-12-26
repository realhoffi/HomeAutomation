import path = require("path");
import { Server } from "http";
import * as http from "http";
import express = require("express");
import * as React from "react";
// import debug = require("debug");
import url = require("url");
import fs = require("fs");
import { StaticRouter } from "react-router-dom";
import favicon = require("serve-favicon");
import { registerRoutes } from "../api/routes/routes";
import bodyParser = require("body-parser");
import { Request } from "express";
import { MongoClient } from "mongodb";

const client = MongoClient;
// import Aqara = require("lumi-aqara");
// const MongoClient = require("mongodb").MongoClient;

const miio = require("miio");

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
function findIdInArray(targetArray: any[], id): number {
  let returnValue = -1;
  if (!targetArray) {
    console.log("findIdInArray: exit, array is null");
    return returnValue;
  }
  // console.log("targetArray length: " + targetArray.length);
  targetArray.forEach((item, index) => {
    if (item.id === id) {
      // console.log("findIdInArray: element found at index " + index);
      returnValue = index;
    }
  });
  console.log("findIdInArray: element at index: " + returnValue);
  return returnValue;
}

const app = express();
// const log = debug("serverjs");
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
router.use(function(req, res, next) {
  let uri = getUriFromRequest(req);
  console.log("Request on URL: " + uri);
  next();
});
registerRoutes(router);
// all of our routes will be prefixed with /api
app.use("/api", router);

app.locals = {
  xiaomi: {
    gateways: [],
    yeelights: [],
    sensors: [],
    robots: []
  }
};

app.get("/", function(request, response) {
  response.sendFile(
    path.join("views", "index.html"),
    { root: __dirname },
    error => {
      app.locals.test += 1;
      if (error) {
        console.log("ERROR SENDFILE!" + JSON.stringify(error));
      }
      response.end();
    }
  );
});

// last route to catch routing errors 404 not found
app.get("*", function(request, response) {
  let uri = getUriFromRequest(request);
  response.status(404).json({ error: "route " + uri + " not found" });
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

const devices = miio.devices({
  cacheTime: 15 // 5 minutes. Default is 1800 seconds (30 minutes)
});

devices.on("available", reg => {
  console.log("Refresh Device");
  const device = reg.device;
  // console.log(reg);
  if (!device) {
    console.log(reg.id, "could not be connected to");
    return;
  }

  if (!reg.token && device.type !== "sensor") {
    console.log(reg.id, "hides its token. Leave function");
    return;
  }
  console.log("@@ Detected Device: " + device.id + " (" + device.type + ") @@");

  device.on("propertyChanged", e =>
    console.log("propertyChanged: " + e.property, e.oldValue, e.value)
  );
  // Some devices have custom events
  device.on("action", e => console.log("Action performed:", e.id));

  // console.log(reg);
  // console.log("@@device.type: " + device.type);

  // device.discover().then(info => console.log(info));
  // device.management.info().then(console.log);

  let indexOfElement = -1;
  switch (device.type) {
    case "vacuum":
      indexOfElement = findIdInArray(app.locals.xiaomi.robots, device.id);
      if (indexOfElement < 0) {
        console.log("Robot existiert nicht");
        app.locals.xiaomi.robots.push(device);
      } else {
        console.log("Robot existiert", device.id);
        app.locals.xiaomi.robots[indexOfElement] = device;
      }
      break;
    case "light":
      indexOfElement = findIdInArray(app.locals.xiaomi.yeelights, device.id);
      if (indexOfElement < 0) {
        console.log("Licht existiert nicht");
        app.locals.xiaomi.yeelights.push(device);
      } else {
        console.log("Licht existiert", device.id);
        app.locals.xiaomi.yeelights[indexOfElement] = device;
      }
      break;
    case "gateway":
      indexOfElement = findIdInArray(app.locals.xiaomi.gateways, device.id);
      if (indexOfElement < 0) {
        console.log("Gateway existiert nicht");
        app.locals.xiaomi.gateways.push(device);
      } else {
        console.log("Gateway existiert", reg.id);
        app.locals.xiaomi.gateways[indexOfElement] = device;
      }
      break;
    case "sensor":
      // console.log("SENSOR DETECTED");
      // device.defineProperty("batteryLevel");
      // device.defineProperty("battery_level");
      // device.defineProperty("voltage");
      // device.defineProperty("voltage");
      // device.loadProperties(["voltage"]).then(p => {
      //   //  device.getProperties(Array[string]);
      //   console.log(p);
      // });

      indexOfElement = findIdInArray(app.locals.xiaomi.sensors, device.id);
      if (indexOfElement < 0) {
        console.log("Sensor existiert nicht");
        app.locals.xiaomi.sensors.push(device);
      } else {
        console.log("Sensor existiert", device.id);
        app.locals.xiaomi.sensors[indexOfElement] = device;
      }
      break;
    default:
      "Found no Type: " + device.type;
  }
  // console.log("indexOfElement: " + indexOfElement);
});

devices.on("unavailable", reg => {
  if (!reg.device) {
    console.log("Device " + reg.id + " not available");
    return;
  }
  // console.log(reg.device);
  let device = reg.device;
  console.log("Device " + device.id + " not available. Remove from Collection");
  let indexOfElement = findIdInArray(app.locals.xiaomi.sensors, device.id);
  // console.log("indexOfElement: " + indexOfElement);
  if (indexOfElement < 0) {
    indexOfElement = findIdInArray(app.locals.xiaomi.gateways, device.id);
    // console.log("indexOfElement: " + indexOfElement);
  } else {
    app.locals.xiaomi.sensors.splice(indexOfElement, 1);
    return;
  }
  if (indexOfElement < 0) {
    indexOfElement = findIdInArray(app.locals.xiaomi.yeelights, device.id);
    // console.log("indexOfElement: " + indexOfElement);
  } else {
    app.locals.xiaomi.gateways.splice(indexOfElement, 1);
    return;
  }
  if (indexOfElement < 0) {
    //   console.log("Device mit Id " + device.id + " existiert in keinem Array");
    return;
  } else {
    app.locals.xiaomi.yeelights.splice(indexOfElement, 1);
  }
  console.log("Device mit Id " + device.id + " entfernt");
});

devices.on("error", err => {
  // err.device points to info about the device
  console.log("Something went wrong connecting to device", err);
});

// const device = miio.createDevice({
//   address: "192.168.178.47",
//   token: "414375516b425130423230383676396d",
//   model: "rockrobo.vacuum.v1"
// });
// device
//   .monitor(60000)
//   .then(r => {
//     console.log("wuuuuuuuuuuuuuu Init Dv: " + r);
//   })
//   .catch(error => {
//     console.error("FEHLER: !" + error);
//   });
// const device = miio.createDevice({
//     address: "192.168.178.46",
//     token: "2ac2001076e0dc34df6c0f05a68f011e",
//     model: "yeelink.light.color1"
// });

// device.init()
//     .then(() => {

//         console.log("KK");
//         console.log(device);

//         if (device.hasCapability("power")) {
//             device.setPower(!device.power)
//                 .then(console.log)
//                 .catch(console.error);
//         }
//     })
//     .catch((e) => { console.error(e); });
// PW LAND : E2DFC915F00C49B4  192.168.178.45

// miio --update 72779159 --token 1d875d510c9dd2c28e19abc2c3fed89b
// miio --update 74217308 --token 7932627133756e393939483475574d58
// miio --update 77079675 --token 623f34fc24bffabc06a1a1605b0858b4
