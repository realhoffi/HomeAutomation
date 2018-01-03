"use strict";
import express from "express";
import * as SensorService from "../services/SensorService";
import { IBaseWeatherSensor } from "../../interfaces/xiaomi";
import { SensorServiceInstance } from "../services/SensorService";
import { AldiServiceInstance } from "../services/AldiService";
const cfg = require("../../../config/config.json");
class AldiController {
  router: express.Router;
  constructor(router: express.Router) {
    this.router = router;
    this.registerRoutes();
  }
  registerRoutes() {
    this.router.get("/routen", this.getRoutes.bind(this));
    this.router.get("/filialen", this.getFilialen.bind(this));

    this.router.post("/filialen", this.addFiliale.bind(this));
    this.router.post("/routen", this.addRoute.bind(this));

    this.router.delete("/routen/:routeId", this.deleteRoute.bind(this));
  }

  getRoutes(req: express.Request, res: express.Response) {
    let result = AldiServiceInstance.getRouten(req.app)
      .then(result => {
        res.status(200).json(result);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }

  getFilialen(req: express.Request, res: express.Response) {
    let result = AldiServiceInstance.getFilialen(req.app)
      .then(result => {
        res.status(200).json(result);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
  addRoute(req: express.Request, res: express.Response) {
    console.log(JSON.stringify(req.body.route));
    let result = AldiServiceInstance.addRoute(req.app, req.body.route)
      .then(result => {
        res.status(200).json(result);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
  deleteRoute(req: express.Request, res: express.Response) {
    console.log(JSON.stringify(req.params.routeId));
    let result = AldiServiceInstance.deleteRoute(req.app, req.params.routeId)
      .then(result => {
        res.status(200).json(result);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }

  addFiliale(req: express.Request, res: express.Response) {
    let result = AldiServiceInstance.addFiliale(req.app, req.body.filiale)
      .then(result => {
        res.status(200).json(result);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
}
export default AldiController;
