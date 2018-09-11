import { MongoClient, Db } from "mongodb";
import { Promise } from "bluebird";
import { RechnungServiceInstance } from "../../api/services/RechnungService";

declare let MONGO_DB_CONNECTION_STRING: string;
declare let MONGO_DB_DATABASE_STRING: string;
declare let MONGO_DB_CONFIGURATION_COLLECTION_STRING: string;
declare let MONGO_DB_SENSOR_COLLECTION_STRING: string;
declare let MONGO_DB_MERGED_SENSOR_DATA_COLLECTION_STRING: string;

// : Promise<Db>
export function initializeDatabase() {
  return new Promise((resolve, reject) => {
    console.log("Try connect to Database", MONGO_DB_CONNECTION_STRING);
    MongoClient.connect(
      MONGO_DB_CONNECTION_STRING,
      { useNewUrlParser: true },
      function(err, database) {
        if (err) {
          reject({ message: "Error adding database startup entry", error: err });
          // throw err;
        }
        console.log("Success connected to database.", MONGO_DB_CONNECTION_STRING);
        resolve(database.db(MONGO_DB_DATABASE_STRING));
      }
    );
  });
}

function createRechnungen() {
  let db = null;
  initializeDatabase()
    .then(database => {
      console.log("[runMergeJob] DB LOADED");
      db = database as Db;
      return db;
    })
    .then((db: Db) => {
      return RechnungServiceInstance.createRechnung(db);
    })
    .then(() => {
      console.log("Finished");
      process.exit();
    })
    .catch(console.log);
}
createRechnungen();
