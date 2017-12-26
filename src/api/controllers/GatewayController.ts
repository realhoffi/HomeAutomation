"use strict";
import express from "express";
import { GatewayServiceInstance } from "../services/GatewayService";
import { IGatewayModel, IRGBColor } from "../../interfaces/xiaomi";
const cfg = require("./../../config/config.json");

class GatewayController {
  router: express.Router;
  constructor(router: express.Router) {
    this.router = router;
    this.registerRoutes();
  }
  registerRoutes() {
    this.router.get("/gateways", this.getGateways.bind(this));
    this.router.get(
      "/gateways/:id/info/:properties",
      this.getGatewayProperties.bind(this)
    );
    this.router.post(
      "/gateways/:id/brightness/:value",
      this.setBrightness.bind(this)
    );
    this.router.post("/gateways/:id/color", this.setColor.bind(this));
    this.router.post("/gateways/:id/power", this.setPower.bind(this));
  }

  getGateways(req: express.Request, res: express.Response) {
    return GatewayServiceInstance.getGateways(req.app)
      .then(result => {
        res.json(result);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
  getGatewayProperties(req: express.Request, res: express.Response) {
    return GatewayServiceInstance.getGatewayProperties(
      req.app,
      req.params.id,
      req.params.properties.split(";")
    )
      .then(result => {
        res.json(result);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
  setPower(req: express.Request, res: express.Response) {
    return GatewayServiceInstance.setPower(req.app, req.params.id)
      .then(result => {
        res.json(result);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
  setBrightness(req: express.Request, res: express.Response) {
    return GatewayServiceInstance.setBrightness(
      req.app,
      req.params.id,
      req.params.value
    )
      .then(result => {
        res.json(result);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
  setColor(req: express.Request, res: express.Response) {
    return GatewayServiceInstance.setColor(
      req.app,
      req.params.id,
      req.body.color
    )
      .then(result => {
        res.json(result);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
}

export default GatewayController;
