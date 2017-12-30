"use strict";
import express from "express";
import { SensorServiceInstance } from "../api/services/SensorService";
const miio = require("miio");

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
export function registerDevices(app: express.Application) {
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
    console.log(
      "@@ Detected Device: " + device.id + " (" + device.type + ") @@"
    );

    device.on("propertyChanged", e => {
      console.log(
        "@@ Detected Device propertyChanged: " +
          device.id +
          " (" +
          device.type +
          ") @@"
      );
      console.log(
        "propertyChanged: " + e.property,
        e.oldValue,
        e.value,
        JSON.stringify(e)
      );
      if (device.type !== "sensor") {
        console.log("Exit, no Sensor!");
        return;
      }
      SensorServiceInstance.logData(app, device.id)
        .then(() => {
          console.log("OK INSERT");
        })
        .catch(error => {
          console.log("ERROR INSERTING @@ ", error);
        });
    });
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
    console.log(
      "Device " + device.id + " not available. Remove from Collection"
    );
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
}

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
