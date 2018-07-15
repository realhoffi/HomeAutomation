import { MongoClient } from "mongodb";
import { Application } from "express";

declare let MONGO_DB_CONNECTION_STRING: string;
declare let MONGO_DB_DATABASE_STRING: string;
declare let MONGO_DB_APPLICATION_COLLECTION_STRING: string;

export function initializeDatabase(app: Application) {
  return new Promise((resolve, reject) => {
    console.log("Try connect to Database", MONGO_DB_CONNECTION_STRING);
    MongoClient.connect(
      MONGO_DB_CONNECTION_STRING,
      function(err, database) {
        if (err) {
          reject({ message: "Error adding database startup entry", error: err });
          // throw err;
        }

        console.log("Success connected to database.", MONGO_DB_CONNECTION_STRING);
        console.log("Set Database and add startup entry: " + MONGO_DB_DATABASE_STRING);
        app.locals.database = database.db(MONGO_DB_DATABASE_STRING);
        const note = { message: "Start Application", timestamp: Date.now() };
        app.locals.database.collection(MONGO_DB_APPLICATION_COLLECTION_STRING).insert(note, (err, result) => {
          if (err) {
            console.log({ error: "An error has occurred" });
            reject({ message: "Error adding database startup entry" });
          } else {
            // console.log(result.ops[0]);
            resolve();
          }
        });
      }
    );
  });
}
