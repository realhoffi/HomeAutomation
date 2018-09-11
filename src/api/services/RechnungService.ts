"use strict";

import { Application } from "express";
import { Db } from "mongodb";
import { ObjectId } from "bson";
import { AldiServiceInstance } from "./AldiService";
import { DokumentServiceInstance } from "./DokumentService";
declare let MONGO_DB_FILIALEN_COLLECTION_STRING: string;
declare let MONGO_DB_ROUTEN_COLLECTION_STRING: string;

class RechnungService {
  public getNumber(value: any) {
    let n = value.toString().indexOf(",") > -1 ? value.toString().replace(",", ".") : value;
    n = parseFloat(n);
    if (isNaN(n)) {
      console.log("getNumber => NaN: ", value);
      return -1;
    }
    return Math.round(n).toFixed(2);
  }
  public createRechnung(db: Db) {
    console.log("createRechnung");
    return new Promise(async (resolve, reject) => {
      let filialen = await AldiServiceInstance.getFilialenByDbObject(db);
      console.log("Anzahl Rechnungen: " + filialen.length);
      filialen.forEach((filiale, index) => {
        let date = new Date();
        let metadata = {
          testnummer: filiale.testnummer,
          verguetung: "12.00",
          reisekosten: this.getNumber(filiale.einnahmen - 12),
          gesamt: this.getNumber(filiale.einnahmen),
          strasse: filiale.strasse,
          plz: filiale.plz,
          ort: filiale.ort,
          rechnungsnummer: `RE-2017-${filiale.testnummer}-${index}`,
          rechnungsdatum: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
        };
        let fname = `C:\\Projects\\HomeAutomation\\documents\\Rechnung_${filiale.testnummer}.docx`;
        DokumentServiceInstance.CreateDocX(fname, "C:\\Projects\\HomeAutomation\\documents\\TemplateRechnung.docx", metadata);
      });
      console.log("finished createRechnung");
      resolve();
      return;
    });
  }
  public getFiliale(app: Application, filialId: string) {
    return new Promise((resolve, reject) => {
      let objectId = new ObjectId(filialId);
      console.log(objectId + "@" + JSON.stringify(objectId) + "@");
      let db = app.locals.database as Db;
      db.collection(MONGO_DB_FILIALEN_COLLECTION_STRING)
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
    });
  }
  public getRouten(app: Application) {
    return new Promise((resolve, reject) => {
      let db = app.locals.database as Db;

      db.collection(MONGO_DB_ROUTEN_COLLECTION_STRING)
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
}

export let RechnungServiceInstance = new RechnungService();
