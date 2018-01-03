"use strict";
import { Application } from "express";
import { IBaseWeatherSensor } from "../../interfaces/xiaomi";
import { Db } from "mongodb";
import { IFilialeModel, IRouteModel } from "../../interfaces/aldi";
import { ObjectId } from "bson";
const cfg = require("../../../config/config.json");
declare let MONGO_DB_FILIALEN_COLLECTION_STRING: string;
declare let MONGO_DB_ROUTEN_COLLECTION_STRING: string;

class AldiService {
  public getFilialen(app: Application) {
    return new Promise((resolve, reject) => {
      app.locals.database
        .collection(MONGO_DB_FILIALEN_COLLECTION_STRING)
        .find({})
        .toArray()
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          console.log("error inserting", JSON.stringify(error));
          reject({ message: "error query filialen" });
        });

      // };
    });
  }
  public getRouten(app: Application) {
    return new Promise((resolve, reject) => {
      let db = app.locals.database as Db;

      db
        .collection(MONGO_DB_ROUTEN_COLLECTION_STRING)
        .find({})
        .toArray()
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          console.log("error inserting", JSON.stringify(error));
          reject({ message: "error query routen" });
        });

      // };
    });
  }
  public addFiliale(app: Application, filiale: IFilialeModel) {
    return new Promise((resolve, reject) => {
      filiale.created = Date.now();
      filiale.modified = Date.now();
      let db = app.locals.database as Db;
      db
        .collection(MONGO_DB_FILIALEN_COLLECTION_STRING)
        .insert(filiale)
        .then(result => {
          resolve({
            message: "filiale inserted",
            insertedCount: result.insertedCount,
            insertedObjects: result.ops,
            insertedId: result.insertedId
          });
        })
        .catch(error => {
          console.log("error inserting", JSON.stringify(error));
          reject({ message: "not inserted" });
        });

      // };
    });
  }
  public addRoute(app: Application, route: IRouteModel) {
    return new Promise((resolve, reject) => {
      let db = app.locals.database as Db;
      route.created = Date.now();
      route.modified = Date.now();
      db
        .collection(MONGO_DB_ROUTEN_COLLECTION_STRING)
        .insert(route)
        .then(result => {
          resolve({
            message: "route inserted",
            insertedCount: result.insertedCount,
            insertedObjects: result.ops,
            insertedId: result.insertedId
          });
        })
        .catch(error => {
          console.log("error inserting", JSON.stringify(error));
          reject({ message: "not inserted" });
        });

      // };
    });
  }
  public deleteRoute(app: Application, routeId: string) {
    return new Promise((resolve, reject) => {
      let objectId = new ObjectId(routeId);
      let db = app.locals.database as Db;
      db
        .collection(MONGO_DB_ROUTEN_COLLECTION_STRING)
        .deleteOne({ _id: objectId })
        .then(result => {
          console.log("deleted");
          resolve({
            message: "route deleted",
            deletedCount: result.deletedCount
          });
        })
        .catch(error => {
          console.log("error deleting", JSON.stringify(error));
          reject({ message: "not deleted" });
        });

      // };
    });
  }
}

export let AldiServiceInstance = new AldiService();
