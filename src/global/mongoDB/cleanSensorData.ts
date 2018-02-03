let fs = require("fs");
import { MongoClient, Db, Collection, Timestamp } from "mongodb";
import {
  getGermanDateString,
  setDatePropertiesToZero
} from "../../helper/date";
import { IBaseWeatherSensor } from "../../interfaces/xiaomi";
import { json } from "express";
import { resultItem } from "office-ui-fabric-react/lib/components/pickers/PeoplePicker/PeoplePicker.scss";
declare let MONGO_DB_CONNECTION_STRING: string;
declare let MONGO_DB_DATABASE_STRING: string;
declare let MONGO_DB_CONFIGURATION_COLLECTION_STRING: string;
declare let MONGO_DB_SENSOR_COLLECTION_STRING: string;
declare let MONGO_DB_MERGED_SENSOR_DATA_COLLECTION_STRING: string;

export interface ISensorQueryResult {
  id: string;
  minValue: number;
  maxValue: number;
  count: number;
  items: any[];
}
export interface ISensorDataCollection {
  sensorId: string;
  dateValueString: string;
  items: ISensorData[];
}
export interface ISensorData {
  sensorId: string;
  timestamp: number;
  dateValue: Date;
  rawSensorData: any;
}
export interface ICleanSensorCongfigurationEntry {
  sensorId: string;
  timestamp: number;
}
export function initializeDatabase() {
  return new Promise((resolve, reject) => {
    console.log("Try connect to Database", MONGO_DB_CONNECTION_STRING);
    MongoClient.connect(MONGO_DB_CONNECTION_STRING, function(err, database) {
      if (err) {
        reject({ message: "Error adding database startup entry", error: err });
        // throw err;
      }
      console.log("Success connected to database.", MONGO_DB_CONNECTION_STRING);
      resolve(database.db(MONGO_DB_DATABASE_STRING));
    });
  });
}
export function cleanSensorData(database: Db) {
  // 1. Sensordaten auslesen (mit altem MAX Wert aus DB) -> OK
  // 2. Sensordaten verarbeiten -> OK
  // 3. Sensordaten in DB schreiben -> OK
  // 4. MAX-Timestamp in DB setzen, damit beim nächsten mal dort wieder angefangen werden kann -> OK
  let collection = database.collection(MONGO_DB_SENSOR_COLLECTION_STRING);
  collection.distinct("id", {}).then((sensorIds: any[]) => {
    sensorIds.forEach(sensorId => {
      let maxItems = 0;
      let itemsToInsert = [];
      let sensorConfiguration = null;
      getSensorConfiguration(database, sensorId)
        .then(cfg => {
          //  console.log(`[${sensorId}] cfg: ` + JSON.stringify(cfg));
          let ts = cfg ? cfg.timestamp : -1;
          //  console.log("TS:", ts);
          // console.log(`[${sensorId}] getSensorData`);
          return getSensorData(sensorId, ts, collection);
        })
        // .catch(() => {
        //   console.log(
        //     `[${sensorId}] Fehler beim Auslesen der Sensor-Configuration`
        //   );
        // })
        //  getSensorData(sensorId, collection)
        .then(result => {
          if (!result || result.count === 0 || !result.items) {
            console.log(`[${sensorId}] !!! EXIT !!! NO DATA AVAILABLE !!!`);
            return;
          }
          maxItems = result.count;
          sensorConfiguration = {
            sensorId: result.id,
            timestamp: result.maxValue
          };
          // console.log(`[${sensorId}] mergeSensorData`);
          return mergeSensorDataByDate(result);
        })
        .then((sensorData: ISensorDataCollection[]) => {
          // Alle Sensor-Daten für einen Sensor gruppiert nach Datum
          itemsToInsert = mergeSensorDataByHours(sensorData);
          console.log(`[${sensorId}] Ergebnis: ${itemsToInsert.length}`);
          let perc = 100 - itemsToInsert.length * 100 / maxItems;
          console.log(`[${sensorId}] Saved ${perc.toFixed(1)}%`);
          return itemsToInsert;
        })
        .then(mergedResult => {
          console.log(
            `[${sensorId}] Insert ${itemsToInsert.length} DB-Entries now...`
          );
          let mergedCollection = database.collection(
            MONGO_DB_MERGED_SENSOR_DATA_COLLECTION_STRING
          );
          return mergedCollection.insert(mergedResult);
        })
        .then(insertResult => {
          console.log(
            `[${sensorId}] Finished... INSERTED ${
              insertResult.insertedCount
            } of ${itemsToInsert.length}`
          );
          console.log(`[${sensorId}] Adding Configurations now...`);
          return saveSensorConfiguration(database, sensorConfiguration);
        })
        .then(() => {
          console.log(`[${sensorId}] Inserted Sensor-Configuration`);
          console.log(`[${sensorId}] !!!FINISHED!!!`);
        })
        .catch(error => {
          console.log(
            `[${sensorId}] ERROR (cleanSensorData): ${JSON.stringify(error)}`
          );
        });
    });
  });
}
export function getSensorData(
  sensorId: string,
  cfgTimestamp: number,
  collection: Collection
): Promise<ISensorQueryResult> {
  return new Promise((resolve, reject) => {
    console.log("[${sensorId}] TIMESTAMP: " + JSON.stringify(cfgTimestamp));
    let searchItem = { id: sensorId };
    if (cfgTimestamp !== -1) {
      searchItem["timestamp"] = { $gt: cfgTimestamp };
    }
    console.log(`[${sensorId}] SEARCH-QUERY: ` + JSON.stringify(searchItem));

    collection
      .find(searchItem)
      .count()
      .then(maxItemCount => {
        if (maxItemCount === 0) {
          resolve({
            id: sensorId,
            minValue: -1,
            maxValue: -1,
            count: 0,
            items: []
          });
          return;
        }
        let promises = [];
        let pageSize = 500;
        let pages = Math.ceil(maxItemCount / pageSize);
        //  console.log("sensorId-Entry COUNT: " + maxItemCount);
        // console.log("PAGES: " + pages);
        for (let index = 1; index <= pages; index++) {
          // { id: sensorId }
          let promiseRequest = collection
            .find(searchItem)
            // .sort({ timestamp: 1 })
            .skip(pageSize * (index - 1))
            .limit(pageSize)
            .toArray();
          promises.push(promiseRequest);
        }
        let itemCount = maxItemCount;
        let promiseCount = promises.length;
        console.log(
          `[${sensorId}] Anzahl: ${itemCount} @@ Seiten: ${pages} @@ promiseCount: ${promiseCount} `
        );
        Promise.all(promises)
          .then(promises => {
            let resultItems: any[] = [];
            promises.forEach((promise: any[]) => {
              resultItems = resultItems.concat(promise);
            });
            resultItems.sort((entryA, entryB) => {
              return entryA["timestamp"] > entryB["timestamp"]
                ? 1
                : entryA["timestamp"] < entryB["timestamp"] ? -1 : 0;
            });
            console.log(
              `[${sensorId}] Sortierte Sensordaten: ${resultItems.length}`
            );
            if (itemCount !== resultItems.length) {
              console.log(
                "CAREFUL -> Missmatch Paging-Global Count! Itemcount !== resultItems.length"
              );
            }
            resolve({
              id: sensorId,
              minValue: resultItems[0].timestamp,
              maxValue: resultItems[resultItems.length - 1].timestamp,
              count: resultItems.length,
              items: resultItems
            });
          })
          .catch(error => {
            console.log(
              `[${sensorId}] ERROR (getSensorData): ${JSON.stringify(error)}`
            );
            reject();
          });
      });
  });
}
export function mergeSensorDataByDate(sensorQueryResult: ISensorQueryResult) {
  return new Promise((resolve, reject) => {
    let sensorDataByDateResult: ISensorDataCollection[] = [];
    sensorQueryResult.items.forEach(item => {
      let sensorDataElement: ISensorData = {
        sensorId: item.id,
        timestamp: item.timestamp,
        dateValue: new Date(item.timestamp),
        rawSensorData: item
      };
      let foundElement = sensorDataByDateResult.find(e => {
        return (
          e.dateValueString === getGermanDateString(sensorDataElement.dateValue)
        );
      });
      if (foundElement) {
        foundElement.items.push(sensorDataElement);
      } else {
        sensorDataByDateResult.push({
          sensorId: sensorDataElement.sensorId,
          dateValueString: getGermanDateString(sensorDataElement.dateValue),
          items: [sensorDataElement]
        });
      }
    });
    resolve(sensorDataByDateResult);
  });
}
export function mergeSensorDataByHours(
  sensorDataGroupByDate: ISensorDataCollection[]
) {
  let mergedDataResult: IBaseWeatherSensor[] = [];
  sensorDataGroupByDate.forEach(dateSensorData => {
    let mergedHourEntries: ISensorDataCollection[] = [];
    dateSensorData.items.forEach(dateSensorDataSubItem => {
      let foundElement = mergedHourEntries.find(e => {
        return (
          e.dateValueString ===
          dateSensorDataSubItem.dateValue.getHours().toString()
        );
      });
      if (foundElement) {
        foundElement.items.push(dateSensorDataSubItem);
      } else {
        mergedHourEntries.push({
          sensorId: dateSensorDataSubItem.sensorId,
          dateValueString: dateSensorDataSubItem.dateValue
            .getHours()
            .toString(),
          items: [
            {
              rawSensorData: dateSensorDataSubItem.rawSensorData,
              dateValue: null,
              sensorId: dateSensorDataSubItem.sensorId,
              timestamp: 0
            }
          ]
        });
      }
    });
    // console.log(
    //   "mergeSensorDataByHours - mergedHourEntries: " + mergedHourEntries.length
    // );
    // Alle Daten für ein Datum eines Sensors für jede Stunde gruppiert!
    let result = mergeSensorDataResults(mergedHourEntries);
    mergedDataResult = mergedDataResult.concat(result || []);
  });
  return mergedDataResult;
}
export function mergeSensorDataResults(sensorData: ISensorDataCollection[]) {
  let mergedDataResult: IBaseWeatherSensor[] = [];
  sensorData.forEach(mergedHourEntry => {
    let mergedSensorDataEntry: IBaseWeatherSensor = {
      temperature: 0,
      humidity: 0,
      pressure: 0,
      hasPressure: true,
      id: mergedHourEntry.sensorId,
      ip: "",
      name: "",
      timestamp: 0
    };
    mergedHourEntry.items.forEach(hourData => {
      let hourDataEntry = hourData.rawSensorData as IBaseWeatherSensor;
      mergedSensorDataEntry.hasPressure = hourDataEntry.pressure !== -1;
      mergedSensorDataEntry.humidity += hourDataEntry.humidity;
      mergedSensorDataEntry.temperature += hourDataEntry.temperature;
      mergedSensorDataEntry.pressure += hourDataEntry.pressure;
      mergedSensorDataEntry.timestamp = hourDataEntry.timestamp;
      mergedSensorDataEntry.name = hourDataEntry.name;
      mergedSensorDataEntry.ip = hourDataEntry.ip;
    });
    mergedSensorDataEntry.humidity = parseFloat(
      (mergedSensorDataEntry.humidity / mergedHourEntry.items.length).toFixed(2)
    );
    mergedSensorDataEntry.temperature = parseFloat(
      (
        mergedSensorDataEntry.temperature / mergedHourEntry.items.length
      ).toFixed(2)
    );
    mergedSensorDataEntry.pressure = parseFloat(
      (mergedSensorDataEntry.pressure / mergedHourEntry.items.length).toFixed(2)
    );
    let entryTimeStamp = new Date(mergedSensorDataEntry.timestamp);
    entryTimeStamp = setDatePropertiesToZero(entryTimeStamp);
    entryTimeStamp.setHours(parseInt(mergedHourEntry.dateValueString) + 1);
    mergedSensorDataEntry.timestamp = entryTimeStamp.getTime();
    mergedDataResult.push(mergedSensorDataEntry);
    // console.log(
    //   "Stunde: " + hr.dateValueString + " - Count: " + hr.items.length
    // );
  });
  // console.log("mergeSensorDataResults: " + mergedDataResult.length);
  return mergedDataResult;
}
export function getSensorConfiguration(
  database: Db,
  sensorId: string
): Promise<ICleanSensorCongfigurationEntry> {
  return new Promise((resolve, reject) => {
    let configurationCollection = database.collection(
      MONGO_DB_CONFIGURATION_COLLECTION_STRING
    );
    console.log(`[${sensorId}] Search Sensor-Configuration`);
    configurationCollection
      .find({ sensorId: sensorId })
      .toArray()
      .then(result => {
        if (!result || result.length === 0) {
          console.log(`[${sensorId}] Kein Konfigurations-Eintrag gefunden...`);
          resolve(undefined);
        } else if (result.length > 1) {
          console.log(
            `[${sensorId}] Mehrere Konfigurations-Eintrag gefunden...`
          );
          reject("Mehrere Konfigurations-Eintrag gefunden");
        } else {
          // console.log(JSON.stringify(result));
          console.log(`[${sensorId}] Konfigurations-Eintrag gefunden...`);
          resolve(result[0]);
        }
      })
      .catch(e => {
        console.log(`[${sensorId}] Konfigurations-Eintrag gefunden...`);
        console.log("Fehler bei der Suche nach Konfiguration-Eintrag ...");
        reject(e);
      });
  });
}
export function saveSensorConfiguration(
  database: Db,
  configuration: ICleanSensorCongfigurationEntry
) {
  return new Promise((resolve, reject) => {
    let configurationCollection = database.collection(
      MONGO_DB_CONFIGURATION_COLLECTION_STRING
    );
    getSensorConfiguration(database, configuration.sensorId)
      .then(cfg => {
        if (!cfg) {
          // console.log("NOT found...");
          configurationCollection
            .insert(configuration)
            .then(() => {
              console.log(
                `[${
                  configuration.sensorId
                }] Konfigurations-Eintrag erfolgreich; hinzugefügt;...`
              );
              resolve();
            })
            .catch(() => {
              console.log(
                `[${
                  configuration.sensorId
                }] Fehler; beim; Hinzufügen; des; Konfiguration-Eintrags;...`
              );
              reject("Fehler beim Hinzufügen des Konfiguration-Eintrags");
            });
        } else {
          // console.log("found...");
          configurationCollection
            .updateOne(
              { sensorId: cfg.sensorId },
              { $set: { timestamp: configuration.timestamp } }
            )
            .then(() => {
              console.log(
                `[${
                  configuration.sensorId
                }] Konfigurations-Eintrag; erfolgreich; geupdated;...`
              );
              resolve();
            })
            .catch(() => {
              console.log(
                `[${
                  configuration.sensorId
                }] Fehler; beim; Updaten; des; Konfiguration-Eintrags;...`
              );
              reject("Fehler beim Updaten des Konfiguration-Eintrags");
            });
        }
      })
      .catch(() => {
        reject();
      });
  });
}
initializeDatabase()
  .then(cleanSensorData)
  .catch(console.error);
