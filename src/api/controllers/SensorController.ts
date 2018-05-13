"use strict";
import express from "express";
import * as SensorService from "../services/SensorService";
import { IBaseWeatherSensor } from "../../interfaces/xiaomi";
import { SensorServiceInstance } from "../services/SensorService";
const cfg = require("../../../config/config.json");
class SensorController {
  router: express.Router;
  constructor(router: express.Router) {
    this.router = router;
    this.registerRoutes();
  }
  registerRoutes() {
    this.router.get("/sensors", this.getSensors.bind(this));
    this.router.get("/sensors/:id/info/:properties", this.getProperties.bind(this));
    this.router.get("/sensors/:id/data/", this.getLoggedSensorData.bind(this));
    this.router.get("/sensors/:id/between/:t1/:t2", this.getLoggedSensorDataBetweenDates.bind(this));
  }

  getSensors(req: express.Request, res: express.Response) {
    SensorServiceInstance.getSensors(req.app).then(result => {
      res.json({ sensors: result });
    });
  }
  getProperties(req: express.Request, res: express.Response) {
    let result = SensorServiceInstance.getSensorProperties(req.app, req.params.id, req.params.properties.split(";"))
      .then(result => {
        res.status(200).json(result);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
  getLoggedSensorData(req: express.Request, res: express.Response) {
    let result = SensorServiceInstance.getSensorData(req.app, req.params.id)
      .then(result => {
        res.status(200).json(result);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
  getLoggedSensorDataBetweenDates(req: express.Request, res: express.Response) {
    let result = SensorServiceInstance.getSensorDataBetweenDates(req.app, req.params.id, req.params.t1, req.params.t2)
      .then(result => {
        res.status(200).json(result);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
}
export default SensorController;
