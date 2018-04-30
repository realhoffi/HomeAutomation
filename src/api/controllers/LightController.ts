"use strict";
import express from "express";
import { LightServiceInstance } from "../services/LightService";
import { ILightModel } from "../../interfaces/xiaomi";
const cfg = require("../../../config/config.json");
class LightController {
  router: express.Router;
  constructor(router: express.Router) {
    this.router = router;
    this.registerRoutes();
  }
  registerRoutes() {
    this.router.get("/lights", this.getLights.bind(this));
    this.router.get("/lights/details", this.getLightDetails.bind(this));
    this.router.get("/lights/:id/info/:properties", this.getLightProperties.bind(this));
    this.router.post("/lights/:id/power", this.setPower.bind(this));
    this.router.post("/lights/:id/brightness/:value", this.setBrightness.bind(this));
    this.router.post("/lights/:id/temperature/:value", this.setTemperature.bind(this));
    this.router.post("/lights/:id/color/:value", this.setColor.bind(this));
  }
  getLights(req: express.Request, res: express.Response) {
    LightServiceInstance.getLights(req.app).then(result => {
      res.json({ lights: result });
    });
  }
  getLightDetails(req: express.Request, res: express.Response) {
    return LightServiceInstance.getLightDetails(req.app)
      .then(lights => {
        console.log("-.-: " + JSON.stringify(lights));
        res.json({ lights: lights });
      })
      .catch(error => {
        res.status(500).json({ error: error });
      });
  }
  getLightProperties(req: express.Request, res: express.Response) {
    return LightServiceInstance.getLightProperties(req.app, req.params.id, req.params.properties.split(";"))
      .then(result => {
        res.json(result);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
  setPower(req: express.Request, res: express.Response) {
    return LightServiceInstance.setPower(req.app, req.params.id)
      .then(result => {
        res.json(result);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
  setBrightness(req: express.Request, res: express.Response) {
    return LightServiceInstance.setBrightness(req.app, req.params.id, req.params.value)
      .then(result => {
        res.json(result);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
  setTemperature(req: express.Request, res: express.Response) {
    return LightServiceInstance.setTemperature(req.app, req.params.id, req.params.value)
      .then(result => {
        console.log("setTemperature");
        res.json(result);
      })
      .catch(error => {
        console.log("error setTemperature");
        res.status(500).json(error);
      });
  }
  setColor(req: express.Request, res: express.Response) {
    return LightServiceInstance.setColor(req.app, req.params.id, req.params.value)
      .then(result => {
        res.json(result);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
}
export default LightController;
