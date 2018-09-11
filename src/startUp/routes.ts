"use strict";
import express from "express";
// import os = require("os");
import * as os from "os";
import LightController from "../api/controllers/LightController";
import SensorController from "../api/controllers/SensorController";
import GatewayController from "../api/controllers/GatewayController";
import AldiController from "../api/controllers/AldiController";

export function registerRoutes(router: express.Router) {
  const c1 = new LightController(router);
  const c2 = new SensorController(router);
  const c3 = new GatewayController(router);
  const c4 = new AldiController(router);

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
