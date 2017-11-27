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

const app = express();
const log = debug("serverjs");
const port = normalizePort(process.env.PORT || 8080);
const env = process.env.NODE_ENV || "production";
const p = path.join("build", "views");

app.set("port", port);

app.use(favicon(path.join(__dirname, "icons", "favicon.ico")));
app.use("/css", express.static(path.join(__dirname, "css")));
app.use("/js", express.static(path.join(__dirname, "js")));

app.get("*", function (request, response) {
    let uri = url.format({
        protocol: request.protocol,
        host: request.get("host"),
        pathname: request.originalUrl
    });
    // console.log("Request started: " + uri);
    // console.log("dirname: " + __dirname);
    // console.log("filename: " + __filename);
    // console.log("request.path: " + request.path);

    let pp = "";
    switch (request.path) {
        case "/":
            response.sendFile(path.join("views", "index.html"), { root: __dirname }, (error) => {
                if (error) {
                    console.log("ERROR SENDFILE!" + JSON.stringify(error));
                }
                response.end();
            });
            break;
        default:
            console.log("Request started: " + request.path);
            console.log("app.use is correct?");
            response.end();
            break;
    }
});

app.listen(3000);

let server = http.createServer(app);
server.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    console.info(`Server running on http://localhost:${port} [${env}]`);
});
