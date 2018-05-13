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
  targetArray.forEach((item, index) => {
    if (item.id === id) {
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
    console.log("[1] @@@@@@@@@@@@@@@@@@@@ Refresh Device @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    if (!reg) {
      console.log(reg.id, "could not be connected to");
      return;
    }

    if (!reg.token) {
      console.log(reg.id, "hides its token. Leave function");
      return;
    }
    console.log("@@@@ Detected Device: " + reg.id + " (" + reg.model + ") @@");

    const device = reg.device;
    let indexOfElement = -1;
    if (device.matches("type:miio:gateway")) {
      console.log("GATEWAY START");
      indexOfElement = findIdInArray(app.locals.xiaomi.gateways, device.id);
      if (indexOfElement < 0) {
        console.log("Gateway existiert nicht");
        app.locals.xiaomi.gateways.push(device);
      } else {
        console.log("Gateway existiert", reg.id);
        app.locals.xiaomi.gateways[indexOfElement] = device;
      }

      const children = device.children();
      for (let child of children) {
        // console.log(child);
        // console.log(child.state());
        // console.log(child.properties());
        console.log("@@@", child.id);
        // console.log(child.metadata);
        console.log(child.internalId, "@@@");
        // let p = "";
        // if (child.hasOwnProperty("model")) {
        //   p = child.model;
        // } else if (child.hasOwnProperty("miioModel")) {
        //   p = child.miioModel;
        // } else {
        //   console.log("NO MODEL INFO!");
        // }
        // console.log(p, "-> model");
        if (child.matches("type:miio:subdevice") && child.matches("cap:temperature")) {
          indexOfElement = findIdInArray(app.locals.xiaomi.sensors, child.id);
          if (indexOfElement < 0) {
            console.log("Sensor existiert nicht");
            app.locals.xiaomi.sensors.push(child);
          } else {
            console.log("Sensor existiert", child.id);
            app.locals.xiaomi.sensors[indexOfElement] = child;
          }
          child.on("temperatureChanged", temperature => {
            SensorServiceInstance.logData(app, child.id)
              .then(() => {
                console.log("OK INSERT");
              })
              .catch(error => {
                console.log("ERROR INSERTING @@ ", error);
              });
          });
        }
      }
      console.log("GATEWAY END");
    } else if (device.matches("type:miio:vacuum")) {
      console.log("vacuum");
      indexOfElement = findIdInArray(app.locals.xiaomi.robots, device.id);
      if (indexOfElement < 0) {
        console.log("Robot existiert nicht.");
        app.locals.xiaomi.robots.push(device);
      } else {
        console.log("Robot existiert", device.id);
        app.locals.xiaomi.robots[indexOfElement] = device;
      }
      // console.log("33Value of error is", await device.error());
      //  await console.log("error:", device.error);
      // device.error()
      //   .then((v) => {
      //     console.log("error", v);
      //   })
      //   .catch(console.log);
      // device.error()
      //   .then((v) => {
      //     console.log("error", v);
      //   })
      //   .catch(console.log);
      // await device.
      // if (device.matches("cap:charging-state")) {
      //   console.log("1cap:charging-state");

      //   console.log("2cap:charging-state", await device.charging());

      // }
      // device
      //   .batteryLevel()
      //   .then(v => {
      //     console.log("batteryLevel", v);
      //   })
      //   .catch(console.log);

      // device
      //   .state()
      //   .then(v => {
      //     console.log("state", v);
      //   })
      //   .catch(console.log);

      // // console.log(device.cleanTime);

      // device
      //   .fanSpeed()
      //   .then(v => {
      //     console.log("fanSpeed", v);
      //   })
      //   .catch(console.log);
      //  console.log("GATEWAY");
      //  console.log(iterator1);
      //  console.log("GATEWAY CHILDREN: ", children);
      //  console.log("GATEWAY CHILDREN: ");
      // for (let [key, value] of device.device.children()) {
      //   console.log(key + " = " + value);
      // }

      // device.device.activateCharging();
      // if (false) {
      //   device.device.cleaning()
      //     .then(isCleaning => {
      //       console.log("ISCLEANING: ", isCleaning);
      //       if (isCleaning === false) {
      //         console.log("CLEAN!");
      //         device.device.clean()
      //           .then(() => {
      //             setTimeout(() => {
      //               device.device.stop()
      //                 .then(console.log)
      //                 .catch(console.log);
      //             }, 10000);
      //           })
      //           .catch(console.log);

      //       }
      //     })
      //     .catch((e) => {
      //       console.log("error isCleaning", e);
      //     });

      // }
      /*
       * This device is a vacuum.
       */
      // console.log("@@@@");
      // console.log(device.device);
      // const device = device;
      // console.log(reg);
      // console.log(device);
    } else if (device.matches("type:miio:yeelight")) {
      console.log("yeelight detected");
      indexOfElement = findIdInArray(app.locals.xiaomi.yeelights, device.id);
      if (indexOfElement < 0) {
        console.log("Licht existiert nicht");
        app.locals.xiaomi.yeelights.push(device);
      } else {
        console.log("Licht existiert", device.id);
        app.locals.xiaomi.yeelights[indexOfElement] = device;
      }
    } else {
      console.log("DEVICE NOT FOUND!");
      console.log(device);
      // Do something useful with device
    }
    device.on("thing:unavailable", sub => console.log("device thing:unavailable", sub.id));
    device.on("unavailable", sub => console.log("device unavailable", sub.id));
    reg.on("thing:unavailable", sub => console.log("reg thing:unavailable", sub.id));
    reg.on("unavailable", sub => console.log("reg unavailable", sub.id));
  });
  devices.on("unavailable", reg => {
    console.log("device unavailable");
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
}
