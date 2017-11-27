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
var p = path.join("build", "views");
app.set("port", port);
app.use(favicon(path.join(__dirname, "icons", "favicon.ico")));
app.use("/css", express.static(path.join(__dirname, "css")));
app.use("/js", express.static(path.join(__dirname, "js")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var router = express.Router();
app.use("/api", router);
router.use(function (req, res, next) {
    var uri = getUriFromRequest(req);
    console.log("Request on URL: " + uri);
    next();
});
routes_1.registerRoutes(router);
app.get("/", function (request, response) {
    response.sendFile(path.join("views", "index.html"), { root: __dirname }, function (error) {
        if (error) {
            console.log("ERROR SENDFILE!" + JSON.stringify(error));
        }
        response.end();
    });
});
app.get("*", function (request, response) {
    var uri = getUriFromRequest(request);
    console.log("catch wrong api request from URL: " + uri);
    response.status(404).send("route not found...");
});
app.listen(3000);
var server = http.createServer(app);
server.listen(port, function (err) {
    if (err) {
        return console.error(err);
    }
    console.info("Server running on http://localhost:" + port + " [" + env + "]");
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
        res.json([{ "ID": "1" }]);
    });
    router.route("/tears").get(function (req, res) {
        res.json([{ "ID": "2" }]);
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

/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map