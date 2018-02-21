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
  public getFilialen(app: Application): Promise<any[]> {
    return this.getFilialenByDbObject(app.locals.database);
  }
  public getFilialenByDbObject(db: Db): Promise<any[]> {
    return new Promise((resolve, reject) => {
      db.collection(MONGO_DB_FILIALEN_COLLECTION_STRING)
        .find({})
        .toArray()
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          console.log("error inserting", JSON.stringify(error));
          reject({ message: "error query filialen" });
        });
    });
  }
  public getFiliale(app: Application, filialId: string) {
    return new Promise((resolve, reject) => {
      let objectId = new ObjectId(filialId);
      console.log(objectId + "@" + JSON.stringify(objectId) + "@");
      let db = app.locals.database as Db;
      db
        .collection(MONGO_DB_FILIALEN_COLLECTION_STRING)
        .findOne({ _id: objectId })
        .then(result => {
          console.log("filiale found");
          resolve({
            message: "filiale found",
            filiale: result
          });
        })
        .catch(error => {
          console.log("error finding filiale", JSON.stringify(error));
          reject({ message: "not found" });
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
  public deleteFiliale(app: Application, filialId: string) {
    return new Promise((resolve, reject) => {
      let objectId = new ObjectId(filialId);
      console.log(objectId + "@" + JSON.stringify(objectId) + "@");
      let db = app.locals.database as Db;
      db
        .collection(MONGO_DB_FILIALEN_COLLECTION_STRING)
        .deleteOne({ _id: objectId })
        .then(result => {
          console.log("deleted filiale");
          resolve({
            message: "filiale deleted",
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
  public updateFiliale(
    app: Application,
    filialId: string,
    filiale: IFilialeModel
  ) {
    return new Promise((resolve, reject) => {
      let objectId = new ObjectId(filialId);
      let b: any = { ...filiale };
      delete b._id;
      console.log("B:" + JSON.stringify(b) + "@");
      let db = app.locals.database as Db;
      db
        .collection(MONGO_DB_FILIALEN_COLLECTION_STRING)
        .updateOne(
          { _id: objectId },
          {
            $set: b
          },
          { upsert: true }
        )
        .then(result => {
          console.log("edited filiale");
          resolve({
            message: "filiale edited",
            modifiedCount: result.modifiedCount,
            matchedCount: result.matchedCount,
            upsertedCount: result.upsertedCount,
            upsertedId: result.upsertedId
          });
        })
        .catch(error => {
          console.log("error editing", JSON.stringify(error));
          reject({ message: "not deleted" });
        });
    });
  }
}

export let AldiServiceInstance = new AldiService();
