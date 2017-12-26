"use strict";
import express from "express";
import os = require("os");

import LightController from "../api/controllers/LightController";
import SensorController from "../api/controllers/SensorController";
import GatewayController from "../api/controllers/GatewayController";

export function registerRoutes(router: express.Router) {
  const c1 = new LightController(router);
  const c2 = new SensorController(router);
  const c3 = new GatewayController(router);

  // router.route("/gateways/:id/info/:properties").get(function(req, res) {
  //   let gateways: any[] = req.app.locals.xiaomi.gateways;
  //   let gateway = gateways.find(gw => {
  //     return gw.id === req.params.id;
  //   });
  //   if (gateway) {
  //     gateway
  //       .call("get_prop", req.params.properties.split(";"))
  //       .then(resultProperties => {
  //         console.log("GWPROPS: " + JSON.stringify(resultProperties));
  //         res.json({ id: req.params.id, properties: resultProperties });
  //       })
  //       .catch(() => {
  //         res.status(500).json({ error: "prop not fetched" });
  //       });
  //   } else {
  //     res.status(500).json({ error: "Gateway not found" });
  //   }
  // });
  // router
  //   .route("/gateways/:id/info/:method/:properties")
  //   .get(function(req, res) {
  //     let gateways: any[] = req.app.locals.xiaomi.gateways;
  //     let gateway = gateways.find(gw => {
  //       return gw.id === req.params.id;
  //     });
  //     if (gateway) {
  //       gateway
  //         .call(req.params.method, req.params.properties.split(";"))
  //         .then(resultProperties => {
  //           console.log("GWPROPS: " + JSON.stringify(resultProperties));
  //           res.json({ id: req.params.id, properties: resultProperties });
  //         })
  //         .catch(() => {
  //           res.status(500).json({ error: "prop not fetched" });
  //         });
  //     } else {
  //       res.status(500).json({ error: "Gateway not found" });
  //     }
  //   });
  // router.route("/gateways/:id/devApi").get(function(req, res) {
  //   let gateways: any[] = req.app.locals.xiaomi.gateways;
  //   let gateway = gateways.find(gw => {
  //     return gw.id === req.params.id;
  //   });
  //   if (gateway) {
  //     console.log(gateway.id + "@@" + gateway.sid);
  //     // tslint:disable-next-line:quotemark
  //     let b = '{"cmd": "whois"}';
  //     // tslint:disable-next-line:quotemark
  //     b = '{"cmd": "get_id_list"}';
  //     // b = '{"cmd": "read", "sid": "158d0001b962aa"}';
  //     b = gateway.devApi.send(b);
  //     // .then(resultProperties => {
  //     //   console.log("GWPROPS: " + JSON.stringify(resultProperties));
  //     //   res.json({ id: req.params.id, properties: resultProperties });
  //     // })
  //     // .catch(() => {
  //     //   res.status(500).json({ error: "prop not fetched" });
  //     // });
  //   } else {
  //     res.status(500).json({ error: "Gateway not found" });
  //   }
  // });

  router.route("/robots").get(function(req, res) {
    let robots: any[] = req.app.locals.xiaomi.robots;
    let robotsState: any[] = [];

    robots.forEach(rob => {
      robotsState.push({
        battery: rob.battery,
        in_cleaning: rob.in_cleaning,
        fan_power: rob.fan_power,
        clean_area: rob.clean_area,
        clean_time: rob.clean_time,
        state: rob.state
      });
    });

    res.json({ robots: robotsState });
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
