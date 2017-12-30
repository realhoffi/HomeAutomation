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
import { initializeDatabase } from "../startUp/database";

// import iobroker = require("iobroker.mihome-vacuum");

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

app.get("/", function(request, response) {
  response.sendFile(
    path.join("views", "index.html"),
    { root: __dirname },
    error => {
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
initializeDatabase(app)
  .then(() => {
    registerRoutes(router);
    registerDevices(app);
    let server = http.createServer(app);
    server.listen(port, err => {
      if (err) {
        return console.error(err);
      }
      console.info(`Server running on http://localhost:${port} [${env}]`);
    });
  })
  .catch(error => {
    console.log("Can not start application", JSON.stringify(error));
  });
