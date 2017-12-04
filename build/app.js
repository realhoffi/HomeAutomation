/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*************************************!*\
  !*** multi ./src/global/server.tsx ***!
  \*************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/global/server.tsx */1);


/***/ }),
/* 1 */
/*!*******************************!*\
  !*** ./src/global/server.tsx ***!
  \*******************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var path = __webpack_require__(/*! path */ 2);
var http = __webpack_require__(/*! http */ 3);
var express = __webpack_require__(/*! express */ 4);
var debug = __webpack_require__(/*! debug */ 5);
var url = __webpack_require__(/*! url */ 6);
var favicon = __webpack_require__(/*! serve-favicon */ 7);
var routes_1 = __webpack_require__(/*! ../api/routes/routes */ 8);
var bodyParser = __webpack_require__(/*! body-parser */ 9);
var Aqara = __webpack_require__(/*! lumi-aqara */ 10);
function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}
function getUriFromRequest(request) {
    return url.format({
        protocol: request.protocol,
        host: request.get("host"),
        pathname: request.originalUrl
    });
}
var app = express();
var log = debug("serverjs");
var port = normalizePort(Object({"NODE_ENV":"development"}).PORT || 8080);
var env = "development" || "production";
app.set("port", port);
app.use(favicon(path.join(__dirname, "icons", "favicon.ico")));
app.use("/css", express.static(path.join(__dirname, "css")));
app.use("/js", express.static(path.join(__dirname, "js")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var router = express.Router();
router.use(function (req, res, next) {
    var uri = getUriFromRequest(req);
    console.log("Request on URL: " + uri);
    next();
});
routes_1.registerRoutes(router);
app.use("/api", router);
app.locals = { xiaomi: { gateways: [] } };
app.get("/", function (request, response) {
    response.sendFile(path.join("views", "index.html"), { root: __dirname }, function (error) {
        app.locals.test += 1;
        if (error) {
            console.log("ERROR SENDFILE!" + JSON.stringify(error));
        }
        response.end();
    });
});
app.get("*", function (request, response) {
    var uri = getUriFromRequest(request);
    response.status(404).json({ "error": "route " + uri + " not found" });
    console.log("catch wrong api request from URL: " + uri);
});
app.use(function (err, req, res, next) {
    res.status(500);
    res.render("error", { error: err });
});
app.listen(3000);
var server = http.createServer(app);
server.listen(port, function (err) {
    if (err) {
        return console.error(err);
    }
    console.info("Server running on http://localhost:" + port + " [" + env + "]");
});
var aqara = new Aqara();
aqara.on("gateway", function (gateway) {
    console.log("Gateway discovered");
    gateway.on("ready", function () {
        var exists = app.locals.xiaomi.gateways.filter(function (gw) {
            return gateway.sid === gw;
        });
        if (!exists || exists.length === 0) {
            console.log("Gateway existiert nicht");
            app.locals.xiaomi.gateways.push(gateway);
        }
        else {
            console.log("Gateway existiert bereits", gateway.sid);
        }
        console.log("Gateway is ready");
        console.log("IP:", gateway.ip);
        console.log("sid:", gateway.sid);
        gateway.setPassword("E2DFC915F00C49B4");
    });
    gateway.on("offline", function () {
        gateway = null;
        console.log("Gateway is offline");
    });
    gateway.on("subdevice", function (device) {
        console.log("New device");
        console.log("  Battery: " + device.getBatteryPercentage() + "%");
        console.log("  Type: " + device.getType());
        console.log("  SID: " + device.getSid());
        switch (device.getType()) {
            case "magnet":
                console.log("  Magnet (" + (device.isOpen() ? "open" : "close") + ")");
                device.on("open", function () {
                    console.log(device.getSid() + " is now open");
                });
                device.on("close", function () {
                    console.log(device.getSid() + " is now close");
                });
                break;
            case "switch":
                console.log("  Switch");
                device.on("click", function () {
                    console.log(device.getSid() + " is clicked");
                });
                device.on("doubleClick", function () {
                    console.log(device.getSid() + " is double clicked");
                });
                device.on("longClickPress", function () {
                    console.log(device.getSid() + " is long pressed");
                });
                device.on("longClickRelease", function () {
                    console.log(device.getSid() + " is long released");
                });
                break;
            case "motion":
                console.log("  Motion (" + (device.hasMotion() ? "motion" : "no motion") + ")");
                device.on("motion", function () {
                    console.log(device.getSid() + " has motion" + (device.getLux() !== null ? " (lux:" + device.getLux() + ")" : ""));
                });
                device.on("noMotion", function () {
                    console.log(device.getSid() + " has no motion (inactive:" + device.getSecondsSinceMotion() + (device.getLux() !== null ? " lux:" + device.getLux() : "") + ")");
                });
                break;
            case "sensor":
                console.log("  Sensor (temperature:" + device.getTemperature() + "C rh:" + device.getHumidity() + "%" + (device.getPressure() != null ? " pressure:" + device.getPressure() + "kPa" : "") + ")");
                device.on("update", function () {
                    console.log(device.getSid() + " temperature: " + device.getTemperature() + "C rh:" + device.getHumidity() + "%" + (device.getPressure() != null ? " pressure:" + device.getPressure() + "kPa" : ""));
                });
                break;
            case "leak":
                console.log("  Leak sensor");
                device.on("update", function () {
                    console.log("" + device.getSid() + (device.isLeaking() ? "" : " not") + " leaking");
                });
                break;
            case "cube":
                console.log("  Cube");
                device.on("update", function () {
                    console.log(device.getSid() + " " + device.getStatus() + (device.getRotateDegrees() !== null ? " " + device.getRotateDegrees() : ""));
                });
                break;
        }
    });
    gateway.on("lightState", function (state) {
        var b = -1;
        console.log("Light updated: " + JSON.stringify(state));
        var exists = app.locals.xiaomi.gateways.find(function (gw, index) {
            b = index;
            return gateway.sid === gw;
        });
        if (b > -1) {
            app.locals.xiaomi.gateways[b] = gateway;
        }
    });
});


/***/ }),
/* 2 */
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 3 */
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 4 */
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 5 */
/*!************************!*\
  !*** external "debug" ***!
  \************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("debug");

/***/ }),
/* 6 */
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 7 */
/*!********************************!*\
  !*** external "serve-favicon" ***!
  \********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("serve-favicon");

/***/ }),
/* 8 */
/*!**********************************!*\
  !*** ./src/api/routes/routes.ts ***!
  \**********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function registerRoutes(router) {
    router.route("/bears").get(function (req, res) {
        res.json({ "ID": 1 });
    });
    router.route("/tears").get(function (req, res) {
        res.json({ "ID": 2 });
    });
    router.route("/gateways").get(function (req, res) {
        var result = [];
        var gateways = req.app.locals.xiaomi.gateways;
        if (gateways && gateways.length > 0) {
            result = gateways.map(function (gw) {
                return {
                    intensity: gw.intensity,
                    sid: gw.sid,
                    ip: gw.ip,
                    on: gw.intensity > 0,
                    rgb: gw.color
                };
            });
        }
        res.json({ gateways: result });
    });
    router.route("/gateways/:sid/intensity/:value").post(function (req, res) {
        var gateways = req.app.locals.xiaomi.gateways;
        var gateway = gateways.find(function (gw) {
            return gw.sid === req.params["sid"];
        });
        if (gateway) {
            console.log("found gw: " + req.params.sid);
            gateway.setIntensity(req.params.value);
        }
        res.json({ "intensity": req.params.value });
    });
    router.route("/gateways/:sid/color").post(function (req, res) {
        var gateways = req.app.locals.xiaomi.gateways;
        var gateway = gateways.find(function (gw) {
            return gw.sid === req.params["sid"];
        });
        var color = req.body || undefined;
        console.log(color);
        if (gateway && color) {
            console.log("found gw: " + req.params.sid);
            gateway.setColor(color);
        }
        res.json(color);
    });
    router.route("/gateways/:sid/").get(function (req, res) {
        var gateways = req.app.locals.xiaomi.gateways;
        var gateway = gateways.find(function (gw) {
            return gw.sid === req.params["sid"];
        });
        if (gateway) {
            res.status(200).json({
                intensity: gateway.intensity,
                sid: gateway.sid,
                ip: gateway.ip,
                on: gateway.intensity > 0,
                rgb: gateway.color
            });
        }
        else {
            res.status(500).json({ error: "Gateway mit sid " + req.params["sid"] + " nicht gefunden" });
        }
    });
}
exports.registerRoutes = registerRoutes;


/***/ }),
/* 9 */
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 10 */
/*!*****************************!*\
  !*** external "lumi-aqara" ***!
  \*****************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("lumi-aqara");

/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map