"use strict";
import express from "express";
import { AldiServiceInstance } from "../services/AldiService";
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
    this.router.delete("/filialen/:filialId", this.deleteFiliale.bind(this));

    this.router.get("/filialen/:filialId", this.getFiliale.bind(this));
    this.router.put("/filialen/:filialId", this.updateFiliale.bind(this));
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
  deleteFiliale(req: express.Request, res: express.Response) {
    console.log("filialId", JSON.stringify(req.params.filialId));
    let result = AldiServiceInstance.deleteFiliale(req.app, req.params.filialId)
      .then(result => {
        res.status(200).json(result);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
  getFiliale(req: express.Request, res: express.Response) {
    console.log("filialId", JSON.stringify(req.params.filialId));
    let result = AldiServiceInstance.getFiliale(req.app, req.params.filialId)
      .then(result => {
        res.status(200).json(result);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
  updateFiliale(req: express.Request, res: express.Response) {
    console.log("updateFiliale");
    console.log("filialId", JSON.stringify(req.params.filialId));
    console.log("filiale", JSON.stringify(req.body.filiale));
    let result = AldiServiceInstance.updateFiliale(req.app, req.params.filialId, req.body.filiale)
      .then(result => {
        res.status(200).json(result);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
}
export default AldiController;
