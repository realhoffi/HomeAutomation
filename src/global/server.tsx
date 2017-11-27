import path = require("path");
import { Server } from "http";
import * as http from "http";
import express = require("express");
import * as React from "react";
import debug = require("debug");
import url = require("url");
import fs = require("fs");
import { StaticRouter } from "react-router-dom";
import favicon = require("serve-favicon");
import { registerRoutes } from "../api/routes/routes";
import bodyParser = require("body-parser");
import { Request } from "express";

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
const log = debug("serverjs");
const port = normalizePort(process.env.PORT || 8080);
const env = process.env.NODE_ENV || "production";
const p = path.join("build", "views");

app.set("port", port);

app.use(favicon(path.join(__dirname, "icons", "favicon.ico")));
app.use("/css", express.static(path.join(__dirname, "css")));
app.use("/js", express.static(path.join(__dirname, "js")));
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// REGISTER OUR ROUTES -------------------------------
let router = express.Router();
// all of our routes will be prefixed with /api
app.use("/api", router);

router.use(function (req, res, next) {
    let uri = getUriFromRequest(req);
    console.log("Request on URL: " + uri);
    // make sure we go to the next routes and don't stop here
    next();
});

registerRoutes(router);

app.get("/", function (request, response) {
    // let uri = this.getUriFromRequest(request);
    // console.log("Request started: " + uri);
    // console.log("dirname: " + __dirname);
    // console.log("filename: " + __filename);
    // console.log("request.path: " + request.path);
    response.sendFile(path.join("views", "index.html"), { root: __dirname }, (error) => {
        if (error) {
            console.log("ERROR SENDFILE!" + JSON.stringify(error));
        }
        response.end();
    });
});

// last route to catch routing errors 404 not found
app.get("*", function (request, response) {
    let uri = getUriFromRequest(request);
    // res.status(404).json({ "error": "route not found" });
    console.log("catch wrong api request from URL: " + uri);
    response.status(404).send("route not found...");
});

app.listen(3000);

let server = http.createServer(app);
server.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    console.info(`Server running on http://localhost:${port} [${env}]`);
});
