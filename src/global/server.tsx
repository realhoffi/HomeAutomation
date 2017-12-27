"use strict";
import path = require("path");
import * as http from "http";
import express = require("express");
import url = require("url");
import favicon = require("serve-favicon");
import { registerRoutes } from "../startUp/routes";
import { registerDevices } from "../startUp/miio";

import bodyParser = require("body-parser");
import { Request } from "express";
import { MongoClient } from "mongodb";

declare var MONGO_DB_CONNECTION_STRING: string;
declare var MONGO_DB_DATABASE_STRING: string;

function normalizePort(val) {
  let port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}
function getUriFromRequest(request: Request) {
  return url.format({
    protocol: request.protocol,
    host: request.get("host"),
    pathname: request.originalUrl
  });
}

const app = express();
const port = normalizePort(process.env.PORT || 8080);
const env = process.env.NODE_ENV || "production";

// DEFINE GLOBAL LOCALS FOR ITEMS
app.locals = {
  database: undefined,
  xiaomi: {
    gateways: [],
    yeelights: [],
    sensors: [],
    robots: []
  }
};
app.set("port", port);
app.use(favicon(path.join(__dirname, "icons", "favicon.ico")));
app.use("/css", express.static(path.join(__dirname, "css")));
app.use("/js", express.static(path.join(__dirname, "js")));
// configure app to use bodyParser(), this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// REGISTER ROUTES -------------------------------
let router = express.Router();
router.use(function(req, res, next) {
  let uri = getUriFromRequest(req);
  console.log("Request on URL: " + uri);
  next();
});
// all of our routes will be prefixed with /api
app.use("/api", router);
registerRoutes(router);
registerDevices(app);

app.get("/", function(request, response) {
  response.sendFile(
    path.join("views", "index.html"),
    { root: __dirname },
    error => {
      app.locals.test += 1;
      if (error) {
        console.log("ERROR SENDFILE!" + JSON.stringify(error));
      }
      response.end();
    }
  );
});

// last route to catch routing errors 404 not found
app.get("*", function(request, response) {
  let uri = getUriFromRequest(request);
  response.status(404).json({ error: "route " + uri + " not found" });
  console.log("catch wrong api request from URL: " + uri);
});

app.use((err, req, res, next) => {
  res.status(500);
  res.render("error", { error: err });
});

console.log("Tryconnect to Database: " + MONGO_DB_CONNECTION_STRING);
MongoClient.connect(MONGO_DB_CONNECTION_STRING, function(err, database) {
  if (err) {
    throw err;
  }
  console.log("Success connected to database:" + database);
  console.log("Read Database: " + MONGO_DB_DATABASE_STRING);

  app.locals.database = database.db(MONGO_DB_DATABASE_STRING);
  const note = { message: "Start Application", timestamp: Date.now() };
  // db
  //   .collections()
  //   .then(result => {
  //     console.log(
  //       result.forEach(col => {
  //         console.log("c: " + col.namespace);
  //       })
  //     );
  //   })
  //   .catch(error => {
  //     console.error("ERROR: " + error);
  //   });
  app.locals.database.collection("test").insert(note, (err, result) => {
    if (err) {
      console.log({ error: "An error has occurred" });
    } else {
      console.log(result.ops[0]);
    }
  });
  // db
  //   .collection("configuration")
  //   .find()
  //   .toArray(function(err, result) {
  //     if (err) {
  //       throw err;
  //     }
  //     console.log(result);
  //   });
});

let server = http.createServer(app);
server.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
});
