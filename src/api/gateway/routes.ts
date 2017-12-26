"use strict";
import { Request, Response } from "express";

import { IGatewayModel } from "../../interfaces/xiaomi";
const cfg = require("./../../config/config.json");

export let getGateways = function(req: Request, res: Response) {
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
};
