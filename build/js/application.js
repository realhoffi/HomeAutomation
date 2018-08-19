/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"application": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendor.bundle"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/moment/locale sync recursive de.js":
/*!***********************************************!*\
  !*** ./node_modules/moment/locale sync de.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./de.js": "./node_modules/moment/locale/de.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/moment/locale sync recursive de.js";

/***/ }),

/***/ "./src/enums/enums.ts":
/*!****************************!*\
  !*** ./src/enums/enums.ts ***!
  \****************************/
/*! exports provided: PageType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageType", function() { return PageType; });
var PageType;
(function (PageType) {
    PageType[PageType["Display"] = 0] = "Display";
    PageType[PageType["Edit"] = 1] = "Edit";
    PageType[PageType["Add"] = 2] = "Add";
})(PageType || (PageType = {}));


/***/ }),

/***/ "./src/global/components/container/basePage.tsx":
/*!******************************************************!*\
  !*** ./src/global/components/container/basePage.tsx ***!
  \******************************************************/
/*! exports provided: BasePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BasePage", function() { return BasePage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! office-ui-fabric-react */ "./node_modules/office-ui-fabric-react/lib/index.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var BasePage = (function (_super) {
    __extends(BasePage, _super);
    function BasePage(props) {
        return _super.call(this, props) || this;
    }
    BasePage.prototype.render = function () {
        console.log("render BasePage");
        var renderElement = null;
        var content = (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid" },
            this.props.Header && (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-row" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm12" }, this.props.Header))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-row" },
                this.props.Navigation && [
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm12 ms-md12 ms-lg3 ms-xl2", key: "navigation" }, this.props.Navigation),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm12 ms-md12 ms-lg9 ms-xl10", key: "content" }, this.props.Body)
                ],
                !this.props.Navigation && (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm12" }, this.props.Body))),
            this.props.Footer && (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-row" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm12" }, this.props.Footer)))));
        renderElement = this.props.IncludeFabricElement ? (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_1__["Fabric"], null, content)) : (content);
        return renderElement;
    };
    return BasePage;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]));



/***/ }),

/***/ "./src/global/components/pages/application.tsx":
/*!*****************************************************!*\
  !*** ./src/global/components/pages/application.tsx ***!
  \*****************************************************/
/*! exports provided: Application */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Application", function() { return Application; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _projects_yeelight_components_pages_application__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../projects/yeelight/components/pages/application */ "./src/projects/yeelight/components/pages/application.tsx");
/* harmony import */ var _projects_xiaomi_components_pages_sensors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../projects/xiaomi/components/pages/sensors */ "./src/projects/xiaomi/components/pages/sensors.tsx");
/* harmony import */ var _projects_xiaomi_components_pages_gateways__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../projects/xiaomi/components/pages/gateways */ "./src/projects/xiaomi/components/pages/gateways.tsx");
/* harmony import */ var office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! office-ui-fabric-react */ "./node_modules/office-ui-fabric-react/lib/index.js");
/* harmony import */ var _projects_system_components_pages_systeminfo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../projects/system/components/pages/systeminfo */ "./src/projects/system/components/pages/systeminfo.tsx");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();







var Application = (function (_super) {
    __extends(Application, _super);
    function Application(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            GatewayInformations: react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_projects_xiaomi_components_pages_gateways__WEBPACK_IMPORTED_MODULE_3__["Application"], null),
            SensorInformations: react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_projects_xiaomi_components_pages_sensors__WEBPACK_IMPORTED_MODULE_2__["Application"], null),
            YeelightInformations: react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_projects_yeelight_components_pages_application__WEBPACK_IMPORTED_MODULE_1__["Application"], null),
            SystemInformations: react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_projects_system_components_pages_systeminfo__WEBPACK_IMPORTED_MODULE_5__["SystemInfo"], null)
        };
        return _this;
    }
    Application.prototype.componentDidMount = function () {
        console.log("componentDidMount Application");
    };
    Application.prototype.render = function () {
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_4__["Pivot"], { linkSize: office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_4__["PivotLinkSize"].large },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_4__["PivotItem"], { linkText: "Sensoren", itemIcon: "CloudWeather" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { paddingTop: "15px" } }, this.state.SensorInformations)),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_4__["PivotItem"], { linkText: "Gateways", itemIcon: "Light" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { paddingTop: "15px" } }, this.state.GatewayInformations)),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_4__["PivotItem"], { linkText: "Yeelights", itemIcon: "Lightbulb" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { paddingTop: "15px" } }, this.state.YeelightInformations)))));
    };
    return Application;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]));



/***/ }),

/***/ "./src/global/components/pages/globalApplication.tsx":
/*!***********************************************************!*\
  !*** ./src/global/components/pages/globalApplication.tsx ***!
  \***********************************************************/
/*! exports provided: GlobalApplication */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GlobalApplication", function() { return GlobalApplication; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var _application__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./application */ "./src/global/components/pages/application.tsx");
/* harmony import */ var _projects_yeelight_components_pages_application__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../projects/yeelight/components/pages/application */ "./src/projects/yeelight/components/pages/application.tsx");
/* harmony import */ var _projects_vacuumRoboter_components_pages_application__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../projects/vacuumRoboter/components/pages/application */ "./src/projects/vacuumRoboter/components/pages/application.tsx");
/* harmony import */ var _projects_aldi_components_pages_application__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../projects/aldi/components/pages/application */ "./src/projects/aldi/components/pages/application.tsx");
/* harmony import */ var _projects_xiaomi_components_pages_sensors__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../projects/xiaomi/components/pages/sensors */ "./src/projects/xiaomi/components/pages/sensors.tsx");
/* harmony import */ var _projects_xiaomi_components_pages_gateways__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../projects/xiaomi/components/pages/gateways */ "./src/projects/xiaomi/components/pages/gateways.tsx");
/* harmony import */ var _components_simple_NotFoundPage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../components/simple/NotFoundPage */ "./src/global/components/simple/NotFoundPage.tsx");
/* harmony import */ var _simple_Routing__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../simple/Routing */ "./src/global/components/simple/Routing.tsx");
/* harmony import */ var _container_basePage__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../container/basePage */ "./src/global/components/container/basePage.tsx");
/* harmony import */ var _projects_system_components_pages_systeminfo__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../projects/system/components/pages/systeminfo */ "./src/projects/system/components/pages/systeminfo.tsx");
/* harmony import */ var office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! office-ui-fabric-react */ "./node_modules/office-ui-fabric-react/lib/index.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();













var GlobalApplication = (function (_super) {
    __extends(GlobalApplication, _super);
    function GlobalApplication(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { selectedNavKey: _this.getRouteIdFromHash() };
        _this.routeChanged = _this.routeChanged.bind(_this);
        return _this;
    }
    GlobalApplication.prototype.getRouteIdFromHash = function () {
        return document.location.hash
            ? "#" + document.location.hash.replace("#/", "")
            : "#";
    };
    GlobalApplication.prototype.componentDidMount = function () {
        document.title = "Web-Application by Florian Hoffmann";
        console.log("componentDidMount Application");
        window.addEventListener("hashchange", this.routeChanged);
    };
    GlobalApplication.prototype.routeChanged = function () {
        console.log("route changed");
        var navKey = this.getRouteIdFromHash();
        if (this.state.selectedNavKey === navKey) {
            return;
        }
        this.setState({
            selectedNavKey: navKey
        });
    };
    GlobalApplication.prototype.componentWillUnmount = function () {
        window.removeEventListener("hashchange", this.routeChanged);
    };
    GlobalApplication.prototype.render = function () {
        console.log("render Application");
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_container_basePage__WEBPACK_IMPORTED_MODULE_10__["BasePage"], { IncludeFabricElement: true, Body: react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Switch"], null,
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_simple_Routing__WEBPACK_IMPORTED_MODULE_9__["RedirectWithStatus"], { status: 302, from: "/courses", to: "/aldi" }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], { exact: true, path: "/", component: _application__WEBPACK_IMPORTED_MODULE_2__["Application"], key: "r1" }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], { path: "/system", component: _projects_system_components_pages_systeminfo__WEBPACK_IMPORTED_MODULE_11__["SystemInfo"], key: "r8" }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], { path: "/light", component: _projects_yeelight_components_pages_application__WEBPACK_IMPORTED_MODULE_3__["Application"], key: "r2" }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], { path: "/aldi", component: _projects_aldi_components_pages_application__WEBPACK_IMPORTED_MODULE_5__["Application"], key: "r3" }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], { path: "/vacuum", component: _projects_vacuumRoboter_components_pages_application__WEBPACK_IMPORTED_MODULE_4__["Application"], key: "r4" }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], { path: "/sensors", component: _projects_xiaomi_components_pages_sensors__WEBPACK_IMPORTED_MODULE_6__["Application"], key: "r6" }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], { path: "/gateways", component: _projects_xiaomi_components_pages_gateways__WEBPACK_IMPORTED_MODULE_7__["Application"], key: "r7" }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], { path: "*", component: _components_simple_NotFoundPage__WEBPACK_IMPORTED_MODULE_8__["NotFoundPage"], key: "r5" })), Navigation: react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", null,
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_12__["Nav"], { selectedKey: this.state.selectedNavKey, groups: [
                        {
                            name: "Navigation",
                            links: [
                                { key: "#", name: "root", url: "#" },
                                {
                                    key: "#system",
                                    name: "System-Informationen",
                                    url: "#system"
                                },
                                { key: "#light", name: "Yeelight", url: "#light" },
                                { key: "#sensors", name: "Sensoren", url: "#sensors" },
                                { key: "#gateways", name: "Gateways", url: "#gateways" },
                                { key: "#aldi", name: "Aldi", url: "#aldi" }
                            ]
                        }
                    ] })) }));
    };
    return GlobalApplication;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));



/***/ }),

/***/ "./src/global/components/pages/initApp.tsx":
/*!*************************************************!*\
  !*** ./src/global/components/pages/initApp.tsx ***!
  \*************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _globalApplication__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./globalApplication */ "./src/global/components/pages/globalApplication.tsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var _uifabric_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @uifabric/icons */ "./node_modules/@uifabric/icons/lib/index.js");





Object(_uifabric_icons__WEBPACK_IMPORTED_MODULE_4__["initializeIcons"])();
window.onload = function () {
    react_dom__WEBPACK_IMPORTED_MODULE_0__["render"](react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_3__["HashRouter"], null,
        react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_globalApplication__WEBPACK_IMPORTED_MODULE_2__["GlobalApplication"], null)), document.getElementById("reactRoot"));
};


/***/ }),

/***/ "./src/global/components/simple/BaseLight.tsx":
/*!****************************************************!*\
  !*** ./src/global/components/simple/BaseLight.tsx ***!
  \****************************************************/
/*! exports provided: BaseLight */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseLight", function() { return BaseLight; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! office-ui-fabric-react */ "./node_modules/office-ui-fabric-react/lib/index.js");
/* harmony import */ var _global_components_simple_Panel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../global/components/simple/Panel */ "./src/global/components/simple/Panel.tsx");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};



var BaseLight = (function (_super) {
    __extends(BaseLight, _super);
    function BaseLight(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { gateways: [] };
        _this.colorSchemes = [
            {
                name: "Bitte auswählen...",
                color: { r: 0, g: 0, b: 0 },
                brightness: -1
            },
            {
                name: "Romantik",
                color: { r: 235, g: 104, b: 119 },
                brightness: 43
            },
            {
                name: "Sky",
                color: { r: 0, g: 255, b: 127 },
                brightness: 43
            }
        ];
        _this.brightnessChanged = _this.brightnessChanged.bind(_this);
        _this.togglePower = _this.togglePower.bind(_this);
        _this.setBrightness = _this.setBrightness.bind(_this);
        _this.colorSchemeChanged = _this.colorSchemeChanged.bind(_this);
        _this.onRedChanged = _this.onRedChanged.bind(_this);
        _this.onBlueChanged = _this.onBlueChanged.bind(_this);
        _this.onGreenChanged = _this.onGreenChanged.bind(_this);
        return _this;
    }
    BaseLight.prototype.colorSchemeChanged = function (event) {
        var schemeIndex = event.currentTarget.selectedIndex;
        var schema = this.colorSchemes[schemeIndex];
        if (!schema || schema.intensity === -1)
            return;
        this.props.onColorSchemaChanged(this.props.lightInformation, schema.color, schema.brightness);
    };
    BaseLight.prototype.togglePower = function () {
        this.props.onPowerChanged(this.props.lightInformation);
    };
    BaseLight.prototype.setBrightness = function (value) {
        this.props.onBrightnessChanged(this.props.lightInformation, value);
    };
    BaseLight.prototype.brightnessChanged = function (value) {
        var _this = this;
        if (this.sliderDelay) {
            clearTimeout(this.sliderDelay);
        }
        this.sliderDelay = setTimeout(function () {
            _this.setBrightness(value);
        }, 400);
    };
    BaseLight.prototype.onColorChanged = function (color) {
        this.props.onColorChanged(this.props.lightInformation, color);
    };
    BaseLight.prototype.onRedChanged = function (value) {
        var _this = this;
        var color = __assign({}, this.props.lightInformation.rgb);
        color.r = value;
        if (this.sliderDelay) {
            clearTimeout(this.sliderDelay);
        }
        this.sliderDelay = setTimeout(function () {
            _this.onColorChanged(color);
        }, 400);
    };
    BaseLight.prototype.onBlueChanged = function (value) {
        var _this = this;
        var color = __assign({}, this.props.lightInformation.rgb);
        color.b = value;
        if (this.sliderDelay) {
            clearTimeout(this.sliderDelay);
        }
        this.sliderDelay = setTimeout(function () {
            _this.onColorChanged(color);
        }, 400);
    };
    BaseLight.prototype.onGreenChanged = function (value) {
        var _this = this;
        var color = __assign({}, this.props.lightInformation.rgb);
        color.g = value;
        if (this.sliderDelay) {
            clearTimeout(this.sliderDelay);
        }
        this.sliderDelay = setTimeout(function () {
            _this.onColorChanged(color);
        }, 400);
    };
    BaseLight.prototype.render = function () {
        console.log("baseLight render");
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-row", key: "list_" + this.props.id },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm12 ms-lg12" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_global_components_simple_Panel__WEBPACK_IMPORTED_MODULE_2__["Panel"], { headerText: this.props.lightInformation.name, className: "custom-padding-bottom-10px" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-row" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm6" },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h1", { className: "ms-font-xl ms-fontColor-themePrimary" }, this.props.lightInformation.power
                                ? "Licht anschalten"
                                : "Licht ausschalten"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_1__["Toggle"], { key: "light_power_" + this.props.id, checked: this.props.lightInformation.power, onText: "On", offText: "Off", onChanged: this.togglePower })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm6" },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h1", { className: "ms-font-xl ms-fontColor-themePrimary" }, "Farbschema"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("select", { onChange: this.colorSchemeChanged, style: { padding: "10px", width: "100%" }, disabled: !this.props.lightInformation.power }, this.colorSchemes.map(function (schema, index) {
                                return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { key: "option_schema_" + index, value: index }, schema.name));
                            }))),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm12" },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h1", { className: "ms-font-xl ms-fontColor-themePrimary" }, "Leuchtst\u00E4rke"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_1__["Slider"], { min: 1, max: 100, step: 1, disabled: !this.props.lightInformation.power, value: this.props.lightInformation.brightness, showValue: true, onChange: this.brightnessChanged })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm12" },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h1", { className: "ms-font-xl ms-fontColor-themePrimary" }, "RGB Farben"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_1__["Slider"], { label: "Rot", min: 0, max: 255, step: 1, disabled: !this.props.lightInformation.power, value: this.props.lightInformation.rgb.r, showValue: true, onChange: this.onRedChanged }),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_1__["Slider"], { label: "Gr\u00FCn", min: 0, max: 255, step: 1, disabled: !this.props.lightInformation.power, value: this.props.lightInformation.rgb.g, showValue: true, onChange: this.onGreenChanged }),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_1__["Slider"], { label: "Blau", min: 0, max: 255, step: 1, disabled: !this.props.lightInformation.power, value: this.props.lightInformation.rgb.b, showValue: true, onChange: this.onBlueChanged })))))));
    };
    return BaseLight;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));



/***/ }),

/***/ "./src/global/components/simple/BaseUebersicht.tsx":
/*!*********************************************************!*\
  !*** ./src/global/components/simple/BaseUebersicht.tsx ***!
  \*********************************************************/
/*! exports provided: BaseUebersicht */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseUebersicht", function() { return BaseUebersicht; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! office-ui-fabric-react */ "./node_modules/office-ui-fabric-react/lib/index.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var BaseUebersicht = (function (_super) {
    __extends(BaseUebersicht, _super);
    function BaseUebersicht(props) {
        var _this = _super.call(this, props) || this;
        _this.selectionHasChanged = _this.selectionHasChanged.bind(_this);
        _this.onColumnClick = _this.onColumnClick.bind(_this);
        _this.closeContextualMenue = _this.closeContextualMenue.bind(_this);
        _this.deleteClicked = _this.deleteClicked.bind(_this);
        _this.editClicked = _this.editClicked.bind(_this);
        _this.callCtxVisible = _this.callCtxVisible.bind(_this);
        var commandItems = [
            {
                name: "Bearbeiten",
                key: "edit",
                icon: "edit",
                itemType: office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_1__["ContextualMenuItemType"].Normal,
                onClick: _this.editClicked
            },
            {
                key: "divider_1",
                itemType: office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_1__["ContextualMenuItemType"].Divider
            },
            {
                name: "Löschen",
                key: "delete",
                icon: "Delete",
                itemType: office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_1__["ContextualMenuItemType"].Normal,
                onClick: _this.deleteClicked
            }
        ];
        _this.state = {
            ctxMenues: commandItems,
            columns: _this.props.columns,
            items: _this.props.items
        };
        _this._selection = new office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_1__["Selection"]({
            onSelectionChanged: _this.selectionHasChanged
        });
        return _this;
    }
    BaseUebersicht.prototype.componentDidUpdate = function (prevProps, prevState, prevContext) {
        var _this = this;
        if (JSON.stringify(this.props.items) !== JSON.stringify(prevProps.items)) {
            this._selection["_onSelectionChanged"] = undefined;
            this._selection.getItems().forEach(function (e, i) {
                _this._selection.setIndexSelected(i, false, false);
            });
            this._selection.setAllSelected(false);
            this._selection["_onSelectionChanged"] = this.selectionHasChanged;
            this._selection.setItems(this.props.items, true);
            this.callCtxVisible(false);
            this.props.onItemSelectionChanged(this._selection.getSelection());
        }
    };
    BaseUebersicht.prototype.callCtxVisible = function (isVisible) {
        if (this.props.ctxVisible === isVisible) {
            return;
        }
        this.props.onCtxMenueVisible(isVisible);
    };
    BaseUebersicht.prototype.selectionHasChanged = function () {
        console.log("selectionHasChanged");
        var selection = this._selection.getSelection();
        this.props.onItemSelectionChanged(selection);
        if (!selection) {
            this.callCtxVisible(false);
        }
    };
    BaseUebersicht.prototype.deleteClicked = function () {
        var _this = this;
        this.props
            .onDeleteItemClicked(this._selection.getSelection())
            .then(function () {
            _this._selection.setAllSelected(false);
            _this.callCtxVisible(false);
        })
            .catch(function () {
            alert("Es ist ein Fehler beim Löschen der Aktion aufgetreten");
        });
    };
    BaseUebersicht.prototype.editClicked = function () {
        var selection = this._selection.getSelection();
        if (!selection || selection.length < 1) {
            return;
        }
        this.props.onEditItemClick(selection[0]);
    };
    BaseUebersicht.prototype.closeContextualMenue = function () {
        this.props.onCtxMenueVisible(false);
    };
    BaseUebersicht.prototype.onColumnClick = function (ev, column) {
        var _a = this.state, columns = _a.columns, items = _a.items;
        var newColumns = columns.slice();
        var currColumn = newColumns.filter(function (currCol, idx) {
            return column.key === currCol.key;
        })[0];
        newColumns.forEach(function (newCol) {
            if (newCol === currColumn) {
                currColumn.isSortedDescending = !currColumn.isSortedDescending;
                currColumn.isSorted = true;
            }
            else {
                newCol.isSorted = false;
                newCol.isSortedDescending = true;
            }
        });
        this.props.sortByPropertyName(currColumn.fieldName, currColumn.isSortedDescending);
        this.setState({
            columns: newColumns
        });
    };
    BaseUebersicht.prototype.render = function () {
        console.log("render BaseUebersicht");
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
            this.props.useCommandbar &&
                this.props.commandbarItems &&
                this.props.commandbarItems.length > 0 && (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-row" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm12" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_1__["CommandBar"], { items: this.props.commandbarItems })))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-row" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm12" },
                    this.props.isLoading && react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_1__["Spinner"], { label: this.props.loadingText }),
                    !this.props.isLoading && (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_1__["DetailsList"], { selectionMode: office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_1__["SelectionMode"].multiple, items: this.props.items, compact: false, columns: this.state.columns, setKey: "set", layoutMode: office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_1__["DetailsListLayoutMode"].justified, isHeaderVisible: true, selection: this._selection, selectionPreservedOnEmptyClick: false, enterModalSelectionOnTouch: false })))),
            this.props.ctxVisible && (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_1__["ContextualMenu"], { directionalHint: 12, isBeakVisible: true, gapSpace: 10, beakWidth: 20, directionalHintFixed: true, target: this.props.ctxTarget, items: this.state.ctxMenues, onDismiss: this.closeContextualMenue }))));
    };
    return BaseUebersicht;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));



/***/ }),

/***/ "./src/global/components/simple/BaseWeatherSensor.tsx":
/*!************************************************************!*\
  !*** ./src/global/components/simple/BaseWeatherSensor.tsx ***!
  \************************************************************/
/*! exports provided: BaseWeatherSensor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseWeatherSensor", function() { return BaseWeatherSensor; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! office-ui-fabric-react */ "./node_modules/office-ui-fabric-react/lib/index.js");
/* harmony import */ var _global_components_simple_Panel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../global/components/simple/Panel */ "./src/global/components/simple/Panel.tsx");
/* harmony import */ var _BaseWeatherSensorChart__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BaseWeatherSensorChart */ "./src/global/components/simple/BaseWeatherSensorChart.tsx");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();





var BaseWeatherSensor = (function (_super) {
    __extends(BaseWeatherSensor, _super);
    function BaseWeatherSensor(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { showDetails: false };
        _this.sensorDetailsClicked = _this.sensorDetailsClicked.bind(_this);
        return _this;
    }
    BaseWeatherSensor.prototype.sensorDetailsClicked = function () {
        this.setState({ showDetails: !this.state.showDetails });
    };
    BaseWeatherSensor.prototype.render = function () {
        console.log("BaseWeatherSensor render");
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-row", key: "sensor" + this.props.id },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm12" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_global_components_simple_Panel__WEBPACK_IMPORTED_MODULE_2__["Panel"], { headerText: this.props.sensorInformations.name, className: "custom-padding-bottom-10px", headerControls: react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", null,
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_1__["IconButton"], { checked: false, iconProps: {
                                iconName: "info"
                            }, title: "Charts \u00F6ffnen", ariaLabel: "Charts \u00F6ffnen", onClick: this.sensorDetailsClicked })) },
                    !this.state.showDetails && (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-row" },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm12" },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h1", { className: "ms-font-su ms-fontColor-themePrimary" }, this.props.sensorInformations.temperature + " °C"))),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-row" },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm6" },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h1", { className: "ms-font-xl ms-fontColor-themePrimary" },
                                    this.props.sensorInformations.humidity,
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: "ms-Icon ms-Icon--Precipitation", "aria-hidden": "true" }))),
                            this.props.sensorInformations.hasPressure && (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm6" },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h1", { className: "ms-font-xl ms-fontColor-themePrimary" }, this.props.sensorInformations.pressure)))))),
                    this.state.showDetails && react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_BaseWeatherSensorChart__WEBPACK_IMPORTED_MODULE_3__["BaseWeatherSensorChart"], { sensorInformations: this.props.sensorInformations })))));
    };
    return BaseWeatherSensor;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));



/***/ }),

/***/ "./src/global/components/simple/BaseWeatherSensorChart.tsx":
/*!*****************************************************************!*\
  !*** ./src/global/components/simple/BaseWeatherSensorChart.tsx ***!
  \*****************************************************************/
/*! exports provided: BaseWeatherSensorChart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Promise) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseWeatherSensorChart", function() { return BaseWeatherSensorChart; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_chartjs_2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-chartjs-2 */ "./node_modules/react-chartjs-2/es/index.js");
/* harmony import */ var _helper_date__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../helper/date */ "./src/helper/date.ts");
/* harmony import */ var office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! office-ui-fabric-react */ "./node_modules/office-ui-fabric-react/lib/index.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();





var options = [
    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { value: "1", key: "k1" }, "Heute"),
    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { value: "2", key: "k2" }, "Letzten 2 Tage"),
    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { value: "3", key: "k3" }, "Letzte Woche"),
    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { value: "4", key: "k4" }, "Alle")
];
var BaseWeatherSensorChart = (function (_super) {
    __extends(BaseWeatherSensorChart, _super);
    function BaseWeatherSensorChart(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            sensorData: undefined,
            rawSensorData: [],
            isError: false,
            isLoadingSensorData: true,
            selectedRange: "1",
            options: undefined
        };
        _this.dateRangeSelectionChanged = _this.dateRangeSelectionChanged.bind(_this);
        _this.getTooltipTitle = _this.getTooltipTitle.bind(_this);
        return _this;
    }
    BaseWeatherSensorChart.prototype.getChartData = function (defaultData) {
        var dataRows = defaultData;
        var data = {
            datasets: [],
            labels: []
        };
        data.datasets.push({ label: "Temperatur", data: [] });
        data.datasets.push({ label: "Luftfeuchtigkeit", data: [] });
        if (this.props.sensorInformations.hasPressure) {
            data.datasets.push({ label: "Druck", data: [] });
        }
        var labels = [];
        var tempValues = [];
        var humidityValues = [];
        var pressureValues = [];
        dataRows.forEach(function (row) {
            if (!row.timestamp)
                return;
            labels.push(row.timestamp);
            if (row.temperature && row.temperature < 100) {
                tempValues.push(row.temperature);
            }
            if (row.humidity && row.humidity >= 0) {
                humidityValues.push(row.humidity);
            }
            if (row.pressure && row.pressure >= 0) {
                pressureValues.push(row.pressure);
            }
        });
        data.labels = labels;
        data.datasets = [
            {
                data: tempValues,
                label: "Temperatur",
                backgroundColor: "rgba(75,0,192,0.4)",
                borderColor: "rgba(75,0,192,1)",
                borderCapStyle: "butt",
                borderJoinStyle: "miter",
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                lineTension: 0.3,
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 3,
                fill: false
            },
            {
                data: humidityValues,
                label: "Feuchtigkeit",
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: "butt",
                borderJoinStyle: "miter",
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                lineTension: 0.3,
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 3,
                fill: false
            }
        ];
        if (this.props.sensorInformations.hasPressure) {
            data.datasets.push({
                data: pressureValues,
                label: "Druck",
                backgroundColor: "rgba(255,255,0,0.4)",
                borderColor: "rgba(255,255,0,1)",
                borderCapStyle: "butt",
                borderJoinStyle: "miter",
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                lineTension: 0.3,
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 3,
                fill: false
            });
        }
        return data;
    };
    BaseWeatherSensorChart.prototype.querySensorDataByDateRange = function (from, to) {
        return axios__WEBPACK_IMPORTED_MODULE_1___default.a.get("/api/sensors/" + this.props.sensorInformations.id + "/between/" + from + "/" + to);
    };
    BaseWeatherSensorChart.prototype.queryAllSensorData = function () {
        return axios__WEBPACK_IMPORTED_MODULE_1___default.a.get("/api/sensors/" + this.props.sensorInformations.id + "/data");
    };
    BaseWeatherSensorChart.prototype.getDateTickRangeBySelection = function (selectedOption) {
        var from = -1;
        var to = -1;
        switch (selectedOption) {
            case "1":
                from = Object(_helper_date__WEBPACK_IMPORTED_MODULE_3__["setDatePropertiesToZero"])(new Date()).getTime();
                to = Date.now();
                break;
            case "2":
                from = Object(_helper_date__WEBPACK_IMPORTED_MODULE_3__["addDays"])(new Date(), -2, true).getTime();
                to = Date.now();
                break;
            case "3":
                from = Object(_helper_date__WEBPACK_IMPORTED_MODULE_3__["addDays"])(new Date(), -7, true).getTime();
                to = Date.now();
                break;
            case "4":
                break;
            default:
                console.log("getDateTickRangeBySelection", "value not found...", selectedOption);
        }
        return {
            from: from,
            to: to
        };
    };
    BaseWeatherSensorChart.prototype.queryLiveDate = function (selectedOption) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var dateRange = _this.getDateTickRangeBySelection(selectedOption);
            _this.querySensorDataByDateRange(dateRange.from, dateRange.to)
                .then(function (dataResult) {
                if (!dataResult.data) {
                    resolve([]);
                }
                if (!dataResult.data.items || dataResult.data.items.lenght === 0) {
                    resolve([]);
                }
                resolve(dataResult.data.items);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    BaseWeatherSensorChart.prototype.getTooltipTitle = function (tooltipItem, data) {
        var returnValue = undefined;
        if (this.state.rawSensorData && this.state.rawSensorData.length >= tooltipItem[0].index) {
            var sensorTimeStamp = this.state.rawSensorData[tooltipItem[0].index];
            if (sensorTimeStamp) {
                var timestamp = sensorTimeStamp.timestamp;
                returnValue = Object(_helper_date__WEBPACK_IMPORTED_MODULE_3__["getGermanDateTimeString"])(new Date(timestamp));
            }
        }
        if (!returnValue) {
            returnValue = data.labels[tooltipItem[0].index];
        }
        return returnValue;
    };
    BaseWeatherSensorChart.prototype.doSensorQueryNow = function () {
        var _this = this;
        this.queryLiveDate(this.state.selectedRange)
            .then(function (result) {
            var chartData = _this.getChartData(result);
            var options = { tooltips: {} };
            options.tooltips.callbacks = {
                title: _this.getTooltipTitle
            };
            if (chartData && chartData.labels && chartData.labels.length > 0) {
                chartData.labels = chartData.labels.map(function (label) {
                    label = Object(_helper_date__WEBPACK_IMPORTED_MODULE_3__["getGermanDateString"])(new Date(parseFloat(label.toString())));
                    return label;
                });
            }
            _this.setState({
                rawSensorData: result,
                options: options,
                sensorData: chartData,
                isLoadingSensorData: false
            });
        })
            .catch(function (error) {
            _this.setState({
                isError: true,
                isLoadingSensorData: false
            });
        });
    };
    BaseWeatherSensorChart.prototype.componentDidMount = function () {
        this.doSensorQueryNow();
    };
    BaseWeatherSensorChart.prototype.dateRangeSelectionChanged = function (event) {
        var _this = this;
        var index = event.target.selectedIndex;
        var selectedOptionValue = event.target.options[index].value;
        this.setState({
            isLoadingSensorData: true,
            selectedRange: selectedOptionValue
        }, function () {
            _this.doSensorQueryNow();
        });
    };
    BaseWeatherSensorChart.prototype.render = function () {
        console.log("BaseWeatherSensorChart render");
        if (!this.state.sensorData)
            return null;
        if (this.state.isError) {
            return (this.state.isError && (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-row" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm12" }, "Es ist ein Fehler aufgetreten..."))));
        }
        var sensorDataContent = null;
        if (this.state.isLoadingSensorData) {
            sensorDataContent = react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_4__["Spinner"], { size: office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_4__["SpinnerSize"].large, label: "Lade Sensor-Daten..." });
        }
        else {
            if (!this.state.sensorData) {
                sensorDataContent = "Keine Daten vorhanden...";
            }
            else {
                sensorDataContent = react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_chartjs_2__WEBPACK_IMPORTED_MODULE_2__["Line"], { datasetKeyProvider: undefined, data: this.state.sensorData, options: this.state.options, height: 400, width: 400 });
            }
        }
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-row" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm12" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-row" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm12" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_4__["Label"], null, "Zeitraum"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("select", { onChange: this.dateRangeSelectionChanged, value: this.state.selectedRange }, options))),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-row" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm12" }, sensorDataContent)))));
    };
    return BaseWeatherSensorChart;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! bluebird */ "./node_modules/bluebird/js/browser/bluebird.js")))

/***/ }),

/***/ "./src/global/components/simple/ButtonRow.tsx":
/*!****************************************************!*\
  !*** ./src/global/components/simple/ButtonRow.tsx ***!
  \****************************************************/
/*! exports provided: ButtonRow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ButtonRow", function() { return ButtonRow; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! office-ui-fabric-react */ "./node_modules/office-ui-fabric-react/lib/index.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var ButtonRow = (function (_super) {
    __extends(ButtonRow, _super);
    function ButtonRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonRow.prototype.render = function () {
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-row" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm12 ms-textAlignRight" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_1__["ActionButton"], { "data-automation-id": "save", key: "save_btn_" + Date.now(), iconProps: { iconName: "Save" }, disabled: this.props.saveButtonProps.disabled, checked: this.props.saveButtonProps.checked, onClick: this.props.saveButtonProps.onClickFunc }, this.props.saveButtonProps.text),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_1__["ActionButton"], { "data-automation-id": "cancel", key: "cancel_btn_" + Date.now(), iconProps: { iconName: "Cancel" }, disabled: this.props.cancelButtonProps.disabled, checked: this.props.cancelButtonProps.checked, onClick: this.props.cancelButtonProps.onClickFunc }, this.props.cancelButtonProps.text))));
    };
    return ButtonRow;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]));



/***/ }),

/***/ "./src/global/components/simple/NotFoundPage.tsx":
/*!*******************************************************!*\
  !*** ./src/global/components/simple/NotFoundPage.tsx ***!
  \*******************************************************/
/*! exports provided: NotFoundPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotFoundPage", function() { return NotFoundPage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var _Routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Routing */ "./src/global/components/simple/Routing.tsx");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var NotFoundPage = (function (_super) {
    __extends(NotFoundPage, _super);
    function NotFoundPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NotFoundPage.prototype.render = function () {
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Routing__WEBPACK_IMPORTED_MODULE_2__["Status"], { code: 404 },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "not-found" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h1", null, "404"),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h2", null, "Page not found!"),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null,
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], { to: "/", replace: true }, "Return to Main Page")))));
    };
    return NotFoundPage;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));



/***/ }),

/***/ "./src/global/components/simple/NumberTextField.tsx":
/*!**********************************************************!*\
  !*** ./src/global/components/simple/NumberTextField.tsx ***!
  \**********************************************************/
/*! exports provided: NumberTextField */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NumberTextField", function() { return NumberTextField; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! office-ui-fabric-react */ "./node_modules/office-ui-fabric-react/lib/index.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var NumberTextField = (function (_super) {
    __extends(NumberTextField, _super);
    function NumberTextField(props) {
        var _this = _super.call(this, props) || this;
        _this.validateNumber = function (value) {
            return isNaN(Number(value))
                ? "The value should be a number, actual is " + value + "."
                : "";
        };
        _this.valueChanged = _this.valueChanged.bind(_this);
        return _this;
    }
    NumberTextField.prototype.valueChanged = function (value) {
        var v = value.replace(",", ".");
        var n = parseFloat(v);
        n = isNaN(n) ? 0 : n;
        this.props.onChanged(n);
        if (this.props.numberValueChanged) {
            this.props.numberValueChanged(n);
        }
    };
    NumberTextField.prototype.render = function () {
        var v = this.props.numberValue || this.props.value || "";
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_1__["TextField"], { value: v.toString(), placeholder: this.props.placeholder, type: "number", prefix: this.props.prefix, suffix: this.props.suffix, required: this.props.required, label: this.props.label, onGetErrorMessage: this.validateNumber, onChanged: this.valueChanged }));
    };
    return NumberTextField;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));



/***/ }),

/***/ "./src/global/components/simple/Panel.tsx":
/*!************************************************!*\
  !*** ./src/global/components/simple/Panel.tsx ***!
  \************************************************/
/*! exports provided: Panel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Panel", function() { return Panel; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! office-ui-fabric-react */ "./node_modules/office-ui-fabric-react/lib/index.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};


var Panel = (function (_super) {
    __extends(Panel, _super);
    function Panel(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            isContentVisible: !_this.props.isCollapsed
        };
        _this.linkClicked = _this.linkClicked.bind(_this);
        return _this;
    }
    Panel.prototype.linkClicked = function (e) {
        if (this.props.canToggleContentHidden === false) {
            return false;
        }
        e.preventDefault();
        var newState = __assign({}, this.state);
        newState.isContentVisible = !newState.isContentVisible;
        this.setState(newState);
        return false;
    };
    Panel.prototype.render = function () {
        var panelClass = this.props.className || "";
        var contentClass = this.props.contentClass;
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: panelClass },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "custom-border-settings ms-borderColor-neutralLighter" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-bgColor-neutralLighter custom-panel-header" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_1__["IconButton"], { disabled: false, style: { width: "40px", height: "36px" }, checked: false, iconProps: {
                            iconName: this.props.canToggleContentHidden ? (this.state.isContentVisible ? "ChevronUp" : "ChevronDownMed") : "blank"
                        }, title: "Emoji", ariaLabel: "Emoji", onClick: this.linkClicked }),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { onClick: this.linkClicked, style: {
                            cursor: "pointer",
                            width: this.props.headerControls ? "75%" : "100%"
                        } },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", { className: "ms-font-xl ms-fontColor-themePrimary" }, this.props.headerText)),
                    this.props.headerControls && this.props.headerControls),
                this.state.isContentVisible && react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: contentClass }, this.props.children))));
    };
    Panel.defaultProps = {
        headerText: "Kein Text",
        className: "",
        contentClass: "default-panel-content-container",
        isCollapsed: false,
        canToggleContentHidden: true,
        headerControls: null
    };
    return Panel;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]));



/***/ }),

/***/ "./src/global/components/simple/Routing.tsx":
/*!**************************************************!*\
  !*** ./src/global/components/simple/Routing.tsx ***!
  \**************************************************/
/*! exports provided: RedirectWithStatus, Status */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RedirectWithStatus", function() { return RedirectWithStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Status", function() { return Status; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var RedirectWithStatus = (function (_super) {
    __extends(RedirectWithStatus, _super);
    function RedirectWithStatus() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RedirectWithStatus.prototype.render = function () {
        var _this = this;
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], { render: function (_a) {
                var staticContext = _a.staticContext;
                if (staticContext) {
                    staticContext.statusCode = _this.props.status;
                }
                return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Redirect"], { from: _this.props.from, to: _this.props.to });
            } }));
    };
    return RedirectWithStatus;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));

var Status = (function (_super) {
    __extends(Status, _super);
    function Status() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Status.prototype.render = function () {
        var _this = this;
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], { render: function (_a) {
                var staticContext = _a.staticContext;
                if (staticContext) {
                    staticContext.statusCode = _this.props.code;
                }
                return _this.props.children;
            } }));
    };
    return Status;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));



/***/ }),

/***/ "./src/global/components/simple/ToolTip.tsx":
/*!**************************************************!*\
  !*** ./src/global/components/simple/ToolTip.tsx ***!
  \**************************************************/
/*! exports provided: ToolTip */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolTip", function() { return ToolTip; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var ToolTip = (function (_super) {
    __extends(ToolTip, _super);
    function ToolTip() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToolTip.prototype.render = function () {
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { minWidth: "150px" } },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-CalloutExample-header", style: { padding: "18px 24px 12px" } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", { className: "ms-fontColor-themePrimary ms-fontWeight-semibold ms-font-l ms-fontSize-l" }, this.props.Title)),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-CalloutExample-inner", style: { height: "100%", padding: "0 24px 20px" } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-font-l ms-fontSize-m" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", { className: "ms-CalloutExample-subText" }, this.props.Description)))));
    };
    return ToolTip;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]));



/***/ }),

/***/ "./src/helper/date.ts":
/*!****************************!*\
  !*** ./src/helper/date.ts ***!
  \****************************/
/*! exports provided: getGermanDateString, getGermanDateTimeString, addDays, setDatePropertiesToZero */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getGermanDateString", function() { return getGermanDateString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getGermanDateTimeString", function() { return getGermanDateTimeString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addDays", function() { return addDays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDatePropertiesToZero", function() { return setDatePropertiesToZero; });
function getGermanDateString(date) {
    if (!date) {
        return "";
    }
    return date.toLocaleString("de-DE", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    });
}
function getGermanDateTimeString(date) {
    if (!date) {
        return "";
    }
    return date.toLocaleString("de-DE", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });
}
function addDays(dateToAdd, daysToAdd, setHrsMinSecMiSecToZero) {
    if (setHrsMinSecMiSecToZero === void 0) { setHrsMinSecMiSecToZero = false; }
    var calculatedDate = new Date(dateToAdd);
    calculatedDate.setDate(calculatedDate.getDate() + daysToAdd);
    if (setHrsMinSecMiSecToZero) {
        calculatedDate = setDatePropertiesToZero(calculatedDate);
    }
    return calculatedDate;
}
function setDatePropertiesToZero(dateToSet) {
    var calculatedDate = new Date(dateToSet);
    calculatedDate.setMinutes(0);
    calculatedDate.setHours(0);
    calculatedDate.setSeconds(0);
    calculatedDate.setMilliseconds(0);
    return calculatedDate;
}


/***/ }),

/***/ "./src/helper/promise.ts":
/*!*******************************!*\
  !*** ./src/helper/promise.ts ***!
  \*******************************/
/*! exports provided: promise_all_custom */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Promise) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "promise_all_custom", function() { return promise_all_custom; });
function promise_all_custom(promises) {
    return new Promise(function (resolve, reject) {
        var messages = [];
        if (!promises || promises.length === 0) {
            resolve(messages);
            return;
        }
        var count = 0;
        promises.forEach(function (promise, index) {
            messages[index] = undefined;
            promise
                .then(function (data) {
                messages[index] = { isError: false, data: data };
                count++;
                if (count === promises.length) {
                    resolve(messages);
                    return;
                }
            })
                .catch(function (e) {
                messages[index] = { isError: true, data: e };
                count++;
                if (count === promises.length) {
                    resolve(messages);
                    return;
                }
            });
        });
    });
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! bluebird */ "./node_modules/bluebird/js/browser/bluebird.js")))

/***/ }),

/***/ "./src/helper/sorting.ts":
/*!*******************************!*\
  !*** ./src/helper/sorting.ts ***!
  \*******************************/
/*! exports provided: sortElement, sortArrayByProperty */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sortElement", function() { return sortElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sortArrayByProperty", function() { return sortArrayByProperty; });
function sortElement(elementOne, elementTwo, propertyName, descending) {
    if (descending === void 0) { descending = false; }
    var r = 0;
    if (!elementOne.hasOwnProperty(propertyName) ||
        !elementTwo.hasOwnProperty(propertyName)) {
    }
    else if (elementOne[propertyName] < elementTwo[propertyName]) {
        r = 1;
    }
    else if (elementOne[propertyName] > elementTwo[propertyName]) {
        r = -1;
    }
    else {
        r = 0;
    }
    return descending ? r * -1 : r;
}
function sortArrayByProperty(arrayOfElements, propertyName, descending) {
    if (descending === void 0) { descending = false; }
    return arrayOfElements.sort(function (a, b) {
        return sortElement(a, b, propertyName, descending);
    });
}


/***/ }),

/***/ "./src/projects/aldi/components/intelligent/Filiale.tsx":
/*!**************************************************************!*\
  !*** ./src/projects/aldi/components/intelligent/Filiale.tsx ***!
  \**************************************************************/
/*! exports provided: Filiale */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Filiale", function() { return Filiale; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _enums_enums__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../enums/enums */ "./src/enums/enums.ts");
/* harmony import */ var _stateless_Filiale__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../stateless/Filiale */ "./src/projects/aldi/components/stateless/Filiale.tsx");
/* harmony import */ var _helper_promise__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../helper/promise */ "./src/helper/promise.ts");
/* harmony import */ var office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! office-ui-fabric-react */ "./node_modules/office-ui-fabric-react/lib/index.js");
/* harmony import */ var _global_components_simple_ButtonRow__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../global/components/simple/ButtonRow */ "./src/global/components/simple/ButtonRow.tsx");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};








var Filiale = (function (_super) {
    __extends(Filiale, _super);
    function Filiale(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            dbEntry: undefined,
            routes: [],
            viewModel: undefined,
            loadingState: {
                isLoading: true,
                isError: false,
                error: { message: "", stacktrace: "" }
            },
            availableRouteDates: []
        };
        _this.onAusgabenChanged = _this.onAusgabenChanged.bind(_this);
        _this.onDeleteClick = _this.onDeleteClick.bind(_this);
        _this.onEinnahmenChanged = _this.onEinnahmenChanged.bind(_this);
        _this.onFahrdatumChanged = _this.onFahrdatumChanged.bind(_this);
        _this.onOrtChanged = _this.onOrtChanged.bind(_this);
        _this.onPkzChanged = _this.onPkzChanged.bind(_this);
        _this.onPlzChanged = _this.onPlzChanged.bind(_this);
        _this.onStrasseChanged = _this.onStrasseChanged.bind(_this);
        _this.onTestnummerChanged = _this.onTestnummerChanged.bind(_this);
        _this.saveClicked = _this.saveClicked.bind(_this);
        _this.cancelClicked = _this.cancelClicked.bind(_this);
        return _this;
    }
    Filiale.prototype.componentDidMount = function () {
        var _this = this;
        var promises = [axios__WEBPACK_IMPORTED_MODULE_1___default.a.get("api/routen")];
        if (this.props.pageType !== _enums_enums__WEBPACK_IMPORTED_MODULE_2__["PageType"].Add) {
            promises.push(axios__WEBPACK_IMPORTED_MODULE_1___default.a.get("api/filialen/" + this.props.filialeId));
        }
        Object(_helper_promise__WEBPACK_IMPORTED_MODULE_4__["promise_all_custom"])(promises)
            .then(function (data) {
            if (data[0].isError) {
                alert("Fehler beim Abfragen der Daten...");
                return;
            }
            if (_this.props.pageType !== _enums_enums__WEBPACK_IMPORTED_MODULE_2__["PageType"].Add) {
                if (data[1].isError) {
                    alert("Fehler beim Abfragen der Daten...");
                    return;
                }
            }
            var routes = data[0].data.data || [];
            if (!routes || routes.length === 0) {
                var ns = __assign({}, _this.state);
                ns.loadingState = {
                    isLoading: false,
                    isError: true,
                    error: { message: "Keine Routen gefunden...", stacktrace: "" }
                };
                _this.setState(ns);
                return;
            }
            routes = routes.sort(function (a, b) {
                return a.route_timestamp > b.route_timestamp ? 1 : a.route_timestamp < b.route_timestamp ? -1 : 0;
            });
            var dates = routes.map(function (route) {
                return new Date(route.route_timestamp);
            });
            var filiale = undefined;
            if (_this.props.pageType === _enums_enums__WEBPACK_IMPORTED_MODULE_2__["PageType"].Add) {
                filiale = {
                    _id: undefined,
                    ausgaben: 0,
                    created: Date.now(),
                    einnahmen: 0,
                    modified: Date.now(),
                    ort: "",
                    pkz: 0,
                    plz: 0,
                    strasse: "",
                    route_id: "",
                    testnummer: 0,
                    timestamp: Date.now()
                };
                if (routes.length > 0) {
                    filiale.route_id = routes[0]._id;
                }
            }
            else {
                filiale = data[1].data.data.filiale || undefined;
            }
            if (!filiale) {
                var ns = __assign({}, _this.state);
                ns.loadingState = {
                    isLoading: false,
                    isError: true,
                    error: { message: "Keine Filiale gefunden...", stacktrace: "" }
                };
                _this.setState(ns);
                return;
            }
            var vm = {
                _id: filiale._id,
                ausgaben: filiale.ausgaben,
                einnahmen: filiale.einnahmen,
                index: 1,
                ort: filiale.ort,
                pkz: filiale.pkz,
                timestamp: filiale.timestamp,
                testnummer: filiale.testnummer,
                strasse: filiale.strasse,
                plz: filiale.plz,
                fahrdatum: null
            };
            routes.forEach(function (route) {
                if (filiale.route_id === route._id) {
                    vm.fahrdatum = route.route_timestamp;
                }
            });
            _this.setState({
                loadingState: {
                    isLoading: false,
                    isError: false,
                    error: { message: "", stacktrace: "" }
                },
                availableRouteDates: dates,
                routes: routes,
                dbEntry: filiale,
                viewModel: vm
            });
        })
            .catch(function () {
            alert("Fehler beim Laden");
        });
    };
    Filiale.prototype.cancelClicked = function () {
        this.props.cancel_clicked();
    };
    Filiale.prototype.saveClicked = function () {
        var _this = this;
        var routeId = "";
        this.state.routes.forEach(function (route) {
            if (route.route_timestamp === _this.state.viewModel.fahrdatum) {
                routeId = route._id;
            }
        });
        var data = {
            _id: this.state.viewModel._id,
            ausgaben: this.state.viewModel.ausgaben,
            einnahmen: this.state.viewModel.einnahmen,
            ort: this.state.viewModel.ort,
            pkz: this.state.viewModel.pkz,
            plz: this.state.viewModel.plz,
            strasse: this.state.viewModel.strasse,
            testnummer: this.state.viewModel.testnummer,
            timestamp: this.state.viewModel.timestamp,
            route_id: routeId
        };
        if (this.props.pageType === _enums_enums__WEBPACK_IMPORTED_MODULE_2__["PageType"].Edit) {
            axios__WEBPACK_IMPORTED_MODULE_1___default.a.put("/api/filialen/" + this.state.dbEntry._id, { filiale: data })
                .then(function (response) {
                _this.props.ok_clicked();
                return null;
            })
                .catch(function (e) {
                console.log("Fehler", JSON.stringify(e));
                alert("Fehler saveClicked");
            });
        }
        if (this.props.pageType === _enums_enums__WEBPACK_IMPORTED_MODULE_2__["PageType"].Add) {
            axios__WEBPACK_IMPORTED_MODULE_1___default.a.post("/api/filialen", { filiale: data })
                .then(function (response) {
                _this.props.ok_clicked();
                return null;
            })
                .catch(function (e) {
                console.log("Fehler", JSON.stringify(e));
                alert("Fehler saveClicked");
            });
        }
        else {
            this.props.ok_clicked();
            return null;
        }
    };
    Filiale.prototype.onDeleteClick = function (id) {
        alert("Löschen nicht erlaubt");
    };
    Filiale.prototype.onFahrdatumChanged = function (id, value) {
        var vm = __assign({}, this.state);
        vm.viewModel.fahrdatum = value;
        this.setState(vm);
    };
    Filiale.prototype.onPkzChanged = function (id, value) {
        var vm = __assign({}, this.state);
        vm.viewModel.pkz = value;
        this.setState(vm);
    };
    Filiale.prototype.onTestnummerChanged = function (id, value) {
        var vm = __assign({}, this.state);
        vm.viewModel.testnummer = value;
        this.setState(vm);
    };
    Filiale.prototype.onAusgabenChanged = function (id, value) {
        var vm = __assign({}, this.state);
        vm.viewModel.ausgaben = value;
        this.setState(vm);
    };
    Filiale.prototype.onEinnahmenChanged = function (id, value) {
        var vm = __assign({}, this.state);
        vm.viewModel.einnahmen = value;
        this.setState(vm);
    };
    Filiale.prototype.onOrtChanged = function (id, value) {
        var vm = __assign({}, this.state);
        vm.viewModel.ort = value;
        this.setState(vm);
    };
    Filiale.prototype.onStrasseChanged = function (id, value) {
        var vm = __assign({}, this.state);
        vm.viewModel.strasse = value;
        this.setState(vm);
    };
    Filiale.prototype.onPlzChanged = function (id, value) {
        var vm = __assign({}, this.state);
        vm.viewModel.plz = value;
        this.setState(vm);
    };
    Filiale.prototype.render = function () {
        console.log("render Filiale");
        if (this.state.loadingState.isLoading) {
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_5__["Spinner"], { label: "Lade Filiale...", size: office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_5__["SpinnerSize"].large });
        }
        if (this.state.loadingState.isError) {
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h1", null, "Es ist ein Fehler beim Laden aufgetreten... (Message: " + this.state.loadingState.error.message + ")");
        }
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_stateless_Filiale__WEBPACK_IMPORTED_MODULE_3__["Filiale"], { filiale: this.state.viewModel, id: this.state.dbEntry._id, key: "_1", fahrdaten: this.state.availableRouteDates, title: this.props.headerText, onAusgabenChanged: this.onAusgabenChanged, onDeleteClick: this.onDeleteClick, onEinnahmenChanged: this.onEinnahmenChanged, onFahrdatumChanged: this.onFahrdatumChanged, onOrtChanged: this.onOrtChanged, onPkzChanged: this.onPkzChanged, onPlzChanged: this.onPlzChanged, onStrasseChanged: this.onStrasseChanged, onTestnummerChanged: this.onTestnummerChanged, enableDeleteBtn: false }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-row" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm12" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_global_components_simple_ButtonRow__WEBPACK_IMPORTED_MODULE_6__["ButtonRow"], { saveButtonProps: {
                            text: "Speichern",
                            disabled: false,
                            checked: false,
                            onClickFunc: this.saveClicked
                        }, cancelButtonProps: {
                            text: "Abbrechen",
                            disabled: false,
                            checked: false,
                            onClickFunc: this.cancelClicked
                        } })))));
    };
    return Filiale;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));



/***/ }),

/***/ "./src/projects/aldi/components/intelligent/Filialuebersicht.tsx":
/*!***********************************************************************!*\
  !*** ./src/projects/aldi/components/intelligent/Filialuebersicht.tsx ***!
  \***********************************************************************/
/*! exports provided: Filialuebersicht */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Promise) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Filialuebersicht", function() { return Filialuebersicht; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! office-ui-fabric-react */ "./node_modules/office-ui-fabric-react/lib/index.js");
/* harmony import */ var _configuration_columns__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../configuration/columns */ "./src/projects/aldi/configuration/columns.tsx");
/* harmony import */ var _global_components_simple_BaseUebersicht__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../global/components/simple/BaseUebersicht */ "./src/global/components/simple/BaseUebersicht.tsx");
/* harmony import */ var _helper_sorting__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../helper/sorting */ "./src/helper/sorting.ts");
/* harmony import */ var _helper_promise__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../helper/promise */ "./src/helper/promise.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};







var Filialuebersicht = (function (_super) {
    __extends(Filialuebersicht, _super);
    function Filialuebersicht(props) {
        var _this = _super.call(this, props) || this;
        _this.selectionHasChanged = _this.selectionHasChanged.bind(_this);
        _this.deleteAllFilialenClicked = _this.deleteAllFilialenClicked.bind(_this);
        _this.deleteFilialeClicked = _this.deleteFilialeClicked.bind(_this);
        _this.sortItems = _this.sortItems.bind(_this);
        _this.deleteFiliale = _this.deleteFiliale.bind(_this);
        _this.deleteFilialen = _this.deleteFilialen.bind(_this);
        _this.editFiliale = _this.editFiliale.bind(_this);
        _this.onCtxMenueVisible = _this.onCtxMenueVisible.bind(_this);
        _this.renderContext = _this.renderContext.bind(_this);
        _this.showMoreClicked = _this.showMoreClicked.bind(_this);
        var commardbarItems = [].concat(_this.props.commandbarItems);
        if (!commardbarItems) {
            commardbarItems = [];
        }
        commardbarItems.push({
            key: "delete",
            name: "Delete Selected",
            icon: "delete",
            disabled: true,
            onClick: _this.deleteAllFilialenClicked
        });
        var cols = _configuration_columns__WEBPACK_IMPORTED_MODULE_3__["filialOverviewColumns"].map(function (col) {
            if (col.fieldName === "ctx") {
                col.onRender = _this.renderContext;
            }
            return col;
        });
        _this.state = {
            isLoading: true,
            columns: cols,
            items: [],
            rawItems: [],
            selectedItems: [],
            commandbarItems: commardbarItems,
            ctxTarget: undefined,
            isCtxVisible: false
        };
        return _this;
    }
    Filialuebersicht.prototype.componentDidMount = function () {
        var _this = this;
        this.loadFilialen()
            .then(function (data) {
            _this.setState({
                rawItems: data.rawItems,
                items: data.transformedItems,
                isLoading: false
            });
            return null;
        })
            .catch(function (error) {
            alert("Fehler loadFilialen");
        });
    };
    Filialuebersicht.prototype.renderContext = function () {
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-font-xl ms-fontColor-themePrimary" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_2__["IconButton"], { checked: false, iconProps: { iconName: "More" }, title: "More", ariaLabel: "More", onClick: this.showMoreClicked })));
    };
    Filialuebersicht.prototype.showMoreClicked = function (event) {
        this.setState({
            isCtxVisible: true,
            ctxTarget: event.target
        });
    };
    Filialuebersicht.prototype.selectionHasChanged = function (selectedItems) {
        var newState = __assign({}, this.state);
        newState.selectedItems = selectedItems;
        newState.commandbarItems.forEach(function (item) {
            if (item.key === "delete") {
                item.disabled = !selectedItems || selectedItems.length < 1;
            }
        });
        this.setState(newState);
    };
    Filialuebersicht.prototype.getFilialViewModelByRouteModel = function (items) {
        return items.map(function (item, index) {
            return {
                index: index + 1,
                _id: item._id,
                created: item.created,
                einnahmen: item.einnahmen,
                ausgaben: item.ausgaben,
                modified: item.modified,
                timestamp: item.timestamp,
                fahrdatum: -1,
                ort: item.ort,
                pkz: item.pkz,
                plz: item.plz,
                strasse: item.strasse,
                testnummer: item.testnummer
            };
        });
    };
    Filialuebersicht.prototype.loadFilialen = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.loadFilialenRequest()
                .then(function (data) {
                var items = _this.getFilialViewModelByRouteModel(data);
                resolve({
                    rawItems: data || [],
                    transformedItems: items || []
                });
            })
                .catch(function () {
                alert("Fehler beim Laden der Filialen");
            });
        });
    };
    Filialuebersicht.prototype.deleteFilialen = function (filialElements) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var promises = [];
            filialElements.forEach(function (filiale) {
                promises.push(_this.deleteFilialeElementRequest(filiale));
            });
            Object(_helper_promise__WEBPACK_IMPORTED_MODULE_6__["promise_all_custom"])(promises)
                .then(function () {
                resolve();
            })
                .catch(function () {
                alert("Grober Fehler!");
                reject();
            });
        });
    };
    Filialuebersicht.prototype.loadFilialenRequest = function () {
        return new Promise(function (resolve, reject) {
            axios__WEBPACK_IMPORTED_MODULE_1___default.a.get("/api/filialen")
                .then(function (results) {
                resolve(results.data);
            })
                .catch(function () {
                reject();
            });
        });
    };
    Filialuebersicht.prototype.deleteFilialeElementRequest = function (route) {
        return axios__WEBPACK_IMPORTED_MODULE_1___default.a.delete("/api/filialen/" + route._id);
    };
    Filialuebersicht.prototype.deleteFiliale = function (selectedItems) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!selectedItems || selectedItems.length === 0 || selectedItems.length > 1) {
                resolve();
                return null;
            }
            return _this.deleteFilialen(selectedItems)
                .then(function () {
                return _this.loadFilialen();
            })
                .then(function (data) {
                _this.setState({
                    rawItems: data.rawItems,
                    items: data.transformedItems,
                    isLoading: false
                }, function () {
                    resolve();
                    return null;
                });
            })
                .catch(function (error) {
                alert("Fehler deleteFiliale");
                reject();
                return null;
            });
        });
    };
    Filialuebersicht.prototype.editFiliale = function (selectedFiliale) {
        if (selectedFiliale) {
            this.props.onEditFilialeClick(selectedFiliale);
        }
    };
    Filialuebersicht.prototype.sortItems = function (propertyName, descending) {
        return Object(_helper_sorting__WEBPACK_IMPORTED_MODULE_5__["sortArrayByProperty"])(this.state.items, propertyName, descending);
    };
    Filialuebersicht.prototype.deleteFilialeClicked = function (selectedItems) {
        return this.deleteFiliale(selectedItems);
    };
    Filialuebersicht.prototype.deleteAllFilialenClicked = function () {
        var _this = this;
        return this.setState({ isLoading: true }, function () {
            _this.deleteFilialen(_this.state.selectedItems).then(function () {
                _this.loadFilialen()
                    .then(function (data) {
                    _this.setState({
                        rawItems: data.rawItems,
                        items: data.transformedItems,
                        isLoading: false
                    });
                    return null;
                })
                    .catch(function (error) {
                    alert("Fehler loadFilialen");
                });
            });
        });
    };
    Filialuebersicht.prototype.onCtxMenueVisible = function (isVisible) {
        if (this.state.isCtxVisible === isVisible) {
            return;
        }
        var ns = __assign({}, this.state);
        ns.isCtxVisible = isVisible;
        if (isVisible === false) {
            ns.ctxTarget = null;
        }
        this.setState(ns);
    };
    Filialuebersicht.prototype.render = function () {
        console.log("render Filialuebersicht");
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_global_components_simple_BaseUebersicht__WEBPACK_IMPORTED_MODULE_4__["BaseUebersicht"], { key: "fu", onCtxMenueVisible: this.onCtxMenueVisible, ctxVisible: this.state.isCtxVisible, ctxTarget: this.state.ctxTarget, onDeleteItemClicked: this.deleteFilialeClicked, columns: this.state.columns, items: this.state.items, onEditItemClick: this.editFiliale, onItemSelectionChanged: this.selectionHasChanged, sortByPropertyName: this.sortItems, isLoading: this.state.isLoading, loadingText: "Filialen werden geladen", useCommandbar: true, enableSearchBox: false, commandbarItems: this.state.commandbarItems }));
    };
    return Filialuebersicht;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! bluebird */ "./node_modules/bluebird/js/browser/bluebird.js")))

/***/ }),

/***/ "./src/projects/aldi/components/intelligent/Routenuebersicht.tsx":
/*!***********************************************************************!*\
  !*** ./src/projects/aldi/components/intelligent/Routenuebersicht.tsx ***!
  \***********************************************************************/
/*! exports provided: Routenuebersicht */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Promise) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Routenuebersicht", function() { return Routenuebersicht; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! office-ui-fabric-react */ "./node_modules/office-ui-fabric-react/lib/index.js");
/* harmony import */ var _configuration_columns__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../configuration/columns */ "./src/projects/aldi/configuration/columns.tsx");
/* harmony import */ var _global_components_simple_BaseUebersicht__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../global/components/simple/BaseUebersicht */ "./src/global/components/simple/BaseUebersicht.tsx");
/* harmony import */ var _helper_promise__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../helper/promise */ "./src/helper/promise.ts");
/* harmony import */ var _helper_sorting__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../helper/sorting */ "./src/helper/sorting.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};







var Routenuebersicht = (function (_super) {
    __extends(Routenuebersicht, _super);
    function Routenuebersicht(props) {
        var _this = _super.call(this, props) || this;
        _this.selectionHasChanged = _this.selectionHasChanged.bind(_this);
        _this.deleteAllRoutenClicked = _this.deleteAllRoutenClicked.bind(_this);
        _this.deleteRouteClicked = _this.deleteRouteClicked.bind(_this);
        _this.sortItems = _this.sortItems.bind(_this);
        _this.deleteRoute = _this.deleteRoute.bind(_this);
        _this.deleteRouten = _this.deleteRouten.bind(_this);
        _this.editRoute = _this.editRoute.bind(_this);
        _this.onCtxMenueVisible = _this.onCtxMenueVisible.bind(_this);
        _this.renderContext = _this.renderContext.bind(_this);
        _this.showMoreClicked = _this.showMoreClicked.bind(_this);
        var commardbarItems = [].concat(_this.props.commandbarItems);
        if (!commardbarItems) {
            commardbarItems = [];
        }
        commardbarItems.push({
            key: "delete",
            name: "Delete Selected",
            icon: "delete",
            disabled: true,
            onClick: _this.deleteAllRoutenClicked
        });
        var cols = _configuration_columns__WEBPACK_IMPORTED_MODULE_3__["routeOverviewColumns"].map(function (col) {
            if (col.fieldName === "ctx") {
                col.onRender = _this.renderContext;
            }
            return col;
        });
        _this.state = {
            isLoading: true,
            columns: cols,
            items: [],
            rawItems: [],
            selectedItems: [],
            commandbarItems: commardbarItems,
            ctxTarget: undefined,
            isCtxVisible: false
        };
        return _this;
    }
    Routenuebersicht.prototype.componentDidMount = function () {
        var _this = this;
        this.loadRouten()
            .then(function (data) {
            _this.setState({
                rawItems: data.rawItems,
                items: data.transformedItems,
                isLoading: false
            });
            return null;
        })
            .catch(function (error) {
            alert("Fehler loadRouten");
        });
    };
    Routenuebersicht.prototype.renderContext = function () {
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-font-xl ms-fontColor-themePrimary" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_2__["IconButton"], { checked: false, iconProps: { iconName: "More" }, title: "More", ariaLabel: "More", onClick: this.showMoreClicked })));
    };
    Routenuebersicht.prototype.showMoreClicked = function (event) {
        this.setState({
            isCtxVisible: true,
            ctxTarget: event.target
        });
    };
    Routenuebersicht.prototype.onCtxMenueVisible = function (isVisible) {
        if (this.state.isCtxVisible === isVisible) {
            return;
        }
        var ns = __assign({}, this.state);
        ns.isCtxVisible = isVisible;
        if (isVisible === false) {
            ns.ctxTarget = null;
        }
        this.setState(ns);
    };
    Routenuebersicht.prototype.selectionHasChanged = function (selectedItems) {
        var newState = __assign({}, this.state);
        newState.selectedItems = selectedItems;
        newState.commandbarItems.forEach(function (item) {
            if (item.key === "delete") {
                item.disabled = !selectedItems || selectedItems.length < 1;
            }
        });
        this.setState(newState);
    };
    Routenuebersicht.prototype.getRouteViewModelByRouteModel = function (items) {
        return items.map(function (item, index) {
            return {
                index: index + 1,
                _id: item._id,
                created: item.created,
                modified: item.modified,
                timestamp: item.timestamp,
                links: item.links,
                route_timestamp: item.route_timestamp,
                ausgaben: item.ausgaben
            };
        });
    };
    Routenuebersicht.prototype.loadRouten = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.loadRoutenRequest()
                .then(function (data) {
                var items = _this.getRouteViewModelByRouteModel(data);
                resolve({
                    rawItems: data || [],
                    transformedItems: items || []
                });
            })
                .catch(function () {
                alert("Fehler beim Laden der Routen");
            });
        });
    };
    Routenuebersicht.prototype.deleteRouten = function (routenElements) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var promises = [];
            routenElements.forEach(function (route) {
                promises.push(_this.deleteRouteElementRequest(route));
            });
            Object(_helper_promise__WEBPACK_IMPORTED_MODULE_5__["promise_all_custom"])(promises)
                .then(function () {
                resolve();
            })
                .catch(function () {
                alert("Grober Fehler deleteRouten!");
                reject();
            });
        });
    };
    Routenuebersicht.prototype.loadRoutenRequest = function () {
        return new Promise(function (resolve, reject) {
            axios__WEBPACK_IMPORTED_MODULE_1___default.a.get("/api/routen")
                .then(function (results) {
                resolve(results.data);
            })
                .catch(function () {
                reject();
            });
        });
    };
    Routenuebersicht.prototype.deleteRouteElementRequest = function (route) {
        return axios__WEBPACK_IMPORTED_MODULE_1___default.a.delete("/api/routen/" + route._id);
    };
    Routenuebersicht.prototype.deleteRoute = function (selectedItems) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!selectedItems ||
                selectedItems.length === 0 ||
                selectedItems.length > 1) {
                resolve();
                return null;
            }
            return _this.deleteRouten(selectedItems)
                .then(function () {
                return _this.loadRouten();
            })
                .then(function (data) {
                _this.setState({
                    rawItems: data.rawItems,
                    items: data.transformedItems,
                    isLoading: false
                }, function () {
                    resolve();
                    return null;
                });
            })
                .catch(function (error) {
                alert("Fehler deleteRoute");
                reject();
                return null;
            });
        });
    };
    Routenuebersicht.prototype.editRoute = function (selectedRoute) {
        if (selectedRoute) {
            this.props.onEditRouteClick(selectedRoute);
        }
    };
    Routenuebersicht.prototype.sortItems = function (propertyName, descending) {
        return Object(_helper_sorting__WEBPACK_IMPORTED_MODULE_6__["sortArrayByProperty"])(this.state.items, propertyName, descending);
    };
    Routenuebersicht.prototype.deleteRouteClicked = function (selectedItems) {
        return this.deleteRoute(selectedItems);
    };
    Routenuebersicht.prototype.deleteAllRoutenClicked = function () {
        var _this = this;
        return this.setState({ isLoading: true }, function () {
            _this.deleteRouten(_this.state.selectedItems)
                .then(function () {
                _this.loadRouten().then(function (data) {
                    _this.setState({
                        rawItems: data.rawItems,
                        items: data.transformedItems,
                        isLoading: false
                    });
                    return null;
                });
            })
                .catch(function (error) {
                alert("Fehler deleteAllRoutenClicked");
            });
        });
    };
    Routenuebersicht.prototype.render = function () {
        console.log("render Routenuebersicht");
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_global_components_simple_BaseUebersicht__WEBPACK_IMPORTED_MODULE_4__["BaseUebersicht"], { key: "ru", ctxTarget: this.state.ctxTarget, ctxVisible: this.state.isCtxVisible, onCtxMenueVisible: this.onCtxMenueVisible, onDeleteItemClicked: this.deleteRouteClicked, columns: this.state.columns, items: this.state.items, onEditItemClick: this.editRoute, onItemSelectionChanged: this.selectionHasChanged, sortByPropertyName: this.sortItems, isLoading: this.state.isLoading, loadingText: "Routen werden geladen", useCommandbar: true, enableSearchBox: false, commandbarItems: this.state.commandbarItems }));
    };
    return Routenuebersicht;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! bluebird */ "./node_modules/bluebird/js/browser/bluebird.js")))

/***/ }),

/***/ "./src/projects/aldi/components/intelligent/UploadFilialen.tsx":
/*!*********************************************************************!*\
  !*** ./src/projects/aldi/components/intelligent/UploadFilialen.tsx ***!
  \*********************************************************************/
/*! exports provided: UploadFilialen */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Promise) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UploadFilialen", function() { return UploadFilialen; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! office-ui-fabric-react */ "./node_modules/office-ui-fabric-react/lib/index.js");
/* harmony import */ var _global_components_simple_ButtonRow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../global/components/simple/ButtonRow */ "./src/global/components/simple/ButtonRow.tsx");
/* harmony import */ var _helper_date__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../helper/date */ "./src/helper/date.ts");
/* harmony import */ var _helper_promise__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../helper/promise */ "./src/helper/promise.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();







var UploadFilialen = (function (_super) {
    __extends(UploadFilialen, _super);
    function UploadFilialen(props) {
        var _this = _super.call(this, props) || this;
        _this.textareaElement = undefined;
        _this.selectRouteElement = undefined;
        _this.cancelBtnClick = _this.cancelBtnClick.bind(_this);
        _this.uploadClick = _this.uploadClick.bind(_this);
        _this.setTextareaElement = _this.setTextareaElement.bind(_this);
        _this.setSelectRouteElement = _this.setSelectRouteElement.bind(_this);
        _this.state = {
            routes: [],
            isInitialized: false,
            isError: false,
            isUploading: false
        };
        return _this;
    }
    UploadFilialen.prototype.componentDidMount = function () {
        var _this = this;
        this.loadRoutenRequest()
            .then(function (result) {
            _this.setState({ routes: result, isInitialized: true });
        })
            .catch(function (e) {
            alert("Routen konnten nicht geladen werden...");
            _this.setState({ isError: true });
        });
    };
    UploadFilialen.prototype.loadRoutenRequest = function () {
        return new Promise(function (resolve, reject) {
            axios__WEBPACK_IMPORTED_MODULE_1___default.a.get("/api/routen")
                .then(function (results) {
                resolve(results.data);
            })
                .catch(function () {
                reject();
            });
        });
    };
    UploadFilialen.prototype.saveFilialen = function (filialen) {
        var filialPromises = filialen.map(function (filiale, index) {
            return axios__WEBPACK_IMPORTED_MODULE_1___default.a.post("/api/filialen", {
                filiale: filiale
            });
        });
        return Object(_helper_promise__WEBPACK_IMPORTED_MODULE_5__["promise_all_custom"])(filialPromises);
    };
    UploadFilialen.prototype.parseNumber = function (value) {
        value = value.replace(/,/g, ".");
        value = value.replace(/[^-0-9.]/g, "");
        var returnValue = parseFloat(value);
        if (isNaN(returnValue)) {
            return -1;
        }
        return returnValue;
    };
    UploadFilialen.prototype.createFilialen = function (value) {
        var _this = this;
        var ret = {
            import: [],
            importCount: 0,
            skipCount: 0,
            messages: []
        };
        if (!value) {
            ret.messages.push("Kein Initialwert übergeben");
            return ret;
        }
        var filialen = value.split("\n");
        if (!filialen || filialen.length === 0) {
            ret.messages.push("Es konnten keine Filialen ausgelesen werden");
            return ret;
        }
        var selectedRoute = "";
        if (this.selectRouteElement && this.selectRouteElement.options.length > 0) {
            selectedRoute = this.selectRouteElement.options[this.selectRouteElement.selectedIndex].value;
        }
        filialen.forEach(function (filiale) {
            var rows = filiale.split("\t");
            if (!rows || rows.length < 7) {
                ret.messages.push("Es konnten keine Filial-Eigenschaften ausgelesen werden. [Wert: " +
                    filiale +
                    "]");
                ret.skipCount += 1;
                return;
            }
            var model = {
                timestamp: Date.now(),
                ausgaben: _this.parseNumber(rows[0].trim()),
                einnahmen: _this.parseNumber(rows[1].trim()),
                plz: _this.parseNumber(rows[2].trim()),
                ort: rows[3].trim(),
                strasse: rows[4].trim(),
                testnummer: _this.parseNumber(rows[5].trim()),
                pkz: _this.parseNumber(rows[6].trim()),
                route_id: selectedRoute
            };
            ret.importCount += 1;
            ret.import.push(model);
        });
        return ret;
    };
    UploadFilialen.prototype.cancelBtnClick = function () {
        this.props.cancelBtnClick();
    };
    UploadFilialen.prototype.uploadClick = function () {
        var _this = this;
        var filialen = this.createFilialen(this.textareaElement ? this.textareaElement.value : "");
        if (!filialen) {
            return;
        }
        this.setState({ isUploading: true }, function () {
            _this.saveFilialen(filialen.import)
                .then(function (r) {
                if (r.length === filialen.importCount) {
                    _this.props.uploadFinished();
                }
                else {
                    alert("NIX OK");
                }
                return null;
            })
                .catch(function (error) {
                alert("Globaler Error in saveFilialen");
                _this.setState({ isError: true });
            });
        });
    };
    UploadFilialen.prototype.setTextareaElement = function (element) {
        this.textareaElement = element;
    };
    UploadFilialen.prototype.setSelectRouteElement = function (element) {
        this.selectRouteElement = element;
    };
    UploadFilialen.prototype.render = function () {
        console.log("render UploadFilialen");
        if (!this.state.isInitialized) {
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_2__["Spinner"], { label: "Lade Daten..." });
        }
        if (this.state.isError) {
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h1", null, "Es ist ein Fehler aufgetreten... ");
        }
        if (this.state.isUploading) {
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_2__["Spinner"], { label: "Importiere Filialen..." });
        }
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-row" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm12" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { padding: "25px" } },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_2__["Label"], null, "Routenfahrt auswählen"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("select", { ref: this.setSelectRouteElement }, this.state.routes.map(function (route, index) {
                            return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { value: route._id, key: "r_" + index }, Object(_helper_date__WEBPACK_IMPORTED_MODULE_4__["getGermanDateString"])(new Date(route.route_timestamp))));
                        }))))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-row" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm12" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("textarea", { rows: 20, ref: this.setTextareaElement, style: { width: "100%" } }))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-row" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm12" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_global_components_simple_ButtonRow__WEBPACK_IMPORTED_MODULE_3__["ButtonRow"], { saveButtonProps: {
                            text: "Upload",
                            disabled: false,
                            checked: false,
                            onClickFunc: this.uploadClick
                        }, cancelButtonProps: {
                            text: "Abbrechen",
                            disabled: false,
                            checked: false,
                            onClickFunc: this.cancelBtnClick
                        } })))));
    };
    return UploadFilialen;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! bluebird */ "./node_modules/bluebird/js/browser/bluebird.js")))

/***/ }),

/***/ "./src/projects/aldi/components/intelligent/UploadRoutes.tsx":
/*!*******************************************************************!*\
  !*** ./src/projects/aldi/components/intelligent/UploadRoutes.tsx ***!
  \*******************************************************************/
/*! exports provided: UploadRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Promise) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UploadRoutes", function() { return UploadRoutes; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _global_components_simple_ButtonRow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../global/components/simple/ButtonRow */ "./src/global/components/simple/ButtonRow.tsx");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var UploadRoutes = (function (_super) {
    __extends(UploadRoutes, _super);
    function UploadRoutes(props) {
        var _this = _super.call(this, props) || this;
        _this.textareaElement = undefined;
        _this.uploadClick = _this.uploadClick.bind(_this);
        _this.cancelClick = _this.cancelClick.bind(_this);
        _this.setRef = _this.setRef.bind(_this);
        return _this;
    }
    UploadRoutes.prototype.saveRoutes = function (routes) {
        return new Promise(function (resolve, reject) {
            var promises = [];
            routes.forEach(function (route) {
                promises.push(axios__WEBPACK_IMPORTED_MODULE_1___default.a.post("/api/routen", { route: route }));
            });
            Promise.all(promises)
                .then(function (results) {
                console.log(JSON.stringify(results));
                var resultValue = [];
                results.forEach(function (p) {
                    if (p.data.insertedObjects && p.data.insertedObjects.length > 0) {
                        resultValue = resultValue.concat(p.data.insertedObjects);
                    }
                });
                resolve(resultValue);
            })
                .catch(function (error) {
                console.log("saveRoutes", JSON.stringify(error));
                reject({ message: "Kein Einfügen", error: error });
            });
        });
    };
    UploadRoutes.prototype.createRoutes = function (value) {
        var returnValues = [];
        if (!value) {
            return returnValues;
        }
        var routes = value.split("\n");
        routes.forEach(function (route) {
            var rows = route.split("\t");
            var r = {
                timestamp: Date.now(),
                route_timestamp: Date.now(),
                ausgaben: [],
                links: []
            };
            returnValues.push(r);
        });
        return;
    };
    UploadRoutes.prototype.uploadClick = function () {
        var routes = this.createRoutes(this.textareaElement ? this.textareaElement.value : "");
        this.props.uploadClick(routes);
    };
    UploadRoutes.prototype.cancelClick = function () {
        this.props.cancelClick();
    };
    UploadRoutes.prototype.setRef = function (element) {
        this.textareaElement = element;
    };
    UploadRoutes.prototype.render = function () {
        console.log("render UploadRoutes");
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-row" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm12" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("textarea", { cols: 100, rows: 40, ref: this.setRef }))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-row" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm12" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_global_components_simple_ButtonRow__WEBPACK_IMPORTED_MODULE_2__["ButtonRow"], { saveButtonProps: {
                            text: "Upload",
                            disabled: false,
                            checked: false,
                            onClickFunc: this.uploadClick
                        }, cancelButtonProps: {
                            text: "Abbrechen",
                            disabled: false,
                            checked: false,
                            onClickFunc: this.cancelClick
                        } })))));
    };
    return UploadRoutes;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! bluebird */ "./node_modules/bluebird/js/browser/bluebird.js")))

/***/ }),

/***/ "./src/projects/aldi/components/pages/application.tsx":
/*!************************************************************!*\
  !*** ./src/projects/aldi/components/pages/application.tsx ***!
  \************************************************************/
/*! exports provided: Application */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Application", function() { return Application; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _manageRoute__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./manageRoute */ "./src/projects/aldi/components/pages/manageRoute.tsx");
/* harmony import */ var _enums_enums__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../enums/enums */ "./src/enums/enums.ts");
/* harmony import */ var _global_components_simple_ToolTip__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../global/components/simple/ToolTip */ "./src/global/components/simple/ToolTip.tsx");
/* harmony import */ var _intelligent_Routenuebersicht__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../intelligent/Routenuebersicht */ "./src/projects/aldi/components/intelligent/Routenuebersicht.tsx");
/* harmony import */ var _intelligent_UploadRoutes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../intelligent/UploadRoutes */ "./src/projects/aldi/components/intelligent/UploadRoutes.tsx");
/* harmony import */ var _intelligent_UploadFilialen__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../intelligent/UploadFilialen */ "./src/projects/aldi/components/intelligent/UploadFilialen.tsx");
/* harmony import */ var _intelligent_Filialuebersicht__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../intelligent/Filialuebersicht */ "./src/projects/aldi/components/intelligent/Filialuebersicht.tsx");
/* harmony import */ var _global_components_simple_Panel__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../global/components/simple/Panel */ "./src/global/components/simple/Panel.tsx");
/* harmony import */ var _intelligent_Filiale__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../intelligent/Filiale */ "./src/projects/aldi/components/intelligent/Filiale.tsx");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();











var Application = (function (_super) {
    __extends(Application, _super);
    function Application(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            modalContent: undefined,
            showModal: false,
            isCalloutVisible: false,
            callOutContent: undefined,
            selectedRoutes: [],
            selectedFilialen: []
        };
        _this.closeModal = _this.closeModal.bind(_this);
        _this.showCallOut = _this.showCallOut.bind(_this);
        _this.hideCallOut = _this.hideCallOut.bind(_this);
        _this.routeUploaded = _this.routeUploaded.bind(_this);
        _this.showUploadRoutesClick = _this.showUploadRoutesClick.bind(_this);
        _this.uploadFilialen = _this.uploadFilialen.bind(_this);
        _this.showUploadFilialenClick = _this.showUploadFilialenClick.bind(_this);
        _this.editRoute = _this.editRoute.bind(_this);
        _this.addRouteClick = _this.addRouteClick.bind(_this);
        _this.createFiliale = _this.createFiliale.bind(_this);
        _this.editFiliale = _this.editFiliale.bind(_this);
        _this.filialeSavedClick = _this.filialeSavedClick.bind(_this);
        return _this;
    }
    Application.prototype.showUploadFilialenClick = function () {
        this.setState({
            showModal: true,
            modalContent: react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_intelligent_UploadFilialen__WEBPACK_IMPORTED_MODULE_6__["UploadFilialen"], { uploadFinished: this.uploadFilialen, cancelBtnClick: this.closeModal })
        });
    };
    Application.prototype.uploadFilialen = function () {
        this.closeModal();
    };
    Application.prototype.showUploadRoutesClick = function () {
        this.setState({
            showModal: true,
            modalContent: react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_intelligent_UploadRoutes__WEBPACK_IMPORTED_MODULE_5__["UploadRoutes"], { uploadClick: this.routeUploaded, cancelClick: this.closeModal })
        });
    };
    Application.prototype.routeUploaded = function (routes) {
        this.closeModal();
    };
    Application.prototype.addRouteClick = function () {
        this.setState({
            showModal: true,
            modalContent: react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_manageRoute__WEBPACK_IMPORTED_MODULE_1__["ManageRoute"], { onExitPage: this.closeModal, pageType: _enums_enums__WEBPACK_IMPORTED_MODULE_2__["PageType"].Add })
        });
        this.hideCallOut();
    };
    Application.prototype.closeModal = function (copiedState) {
        if (copiedState === void 0) { copiedState = undefined; }
        if (copiedState) {
            copiedState.showModal = false;
            copiedState.modalContent = undefined;
            return copiedState;
        }
        else {
            this.setState({ showModal: false, modalContent: undefined });
        }
    };
    Application.prototype.showCallOut = function (event) {
        console.log("MouseIn - " + event.target["tagName"]);
        if (this.state.isCalloutVisible || this.state.showModal) {
            return;
        }
        this.targetCallOutElement = event.target;
        var title = this.targetCallOutElement.hasAttribute("data-info-title") ? this.targetCallOutElement.getAttribute("data-info-title") : "";
        var description = this.targetCallOutElement.hasAttribute("data-info-desc") ? this.targetCallOutElement.getAttribute("data-info-desc") : "";
        if (!title && !description) {
            return;
        }
        this.setState({
            isCalloutVisible: true,
            callOutContent: react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_global_components_simple_ToolTip__WEBPACK_IMPORTED_MODULE_3__["ToolTip"], { Title: title, Description: description })
        });
        return false;
    };
    Application.prototype.hideCallOut = function () {
        console.log("MouseOut");
        this.targetCallOutElement = null;
        this.setState({ isCalloutVisible: false, callOutContent: undefined });
        return false;
    };
    Application.prototype.filialeSavedClick = function () {
        this.closeModal();
    };
    Application.prototype.editRoute = function (routeElement) { };
    Application.prototype.editFiliale = function (filialElement) {
        this.setState({
            showModal: true,
            modalContent: (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_intelligent_Filiale__WEBPACK_IMPORTED_MODULE_9__["Filiale"], { cancel_clicked: this.closeModal, pageType: _enums_enums__WEBPACK_IMPORTED_MODULE_2__["PageType"].Edit, filialeId: filialElement._id, headerText: "Filiale bearbeiten", ok_clicked: this.filialeSavedClick }))
        });
        this.hideCallOut();
    };
    Application.prototype.createFiliale = function () {
        this.setState({
            showModal: true,
            modalContent: react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_intelligent_Filiale__WEBPACK_IMPORTED_MODULE_9__["Filiale"], { cancel_clicked: this.closeModal, pageType: _enums_enums__WEBPACK_IMPORTED_MODULE_2__["PageType"].Add, filialeId: null, headerText: "Filiale hinzuf\u00FCgen", ok_clicked: this.filialeSavedClick })
        });
        this.hideCallOut();
    };
    Application.prototype.render = function () {
        console.log("render application");
        if (this.state.showModal && !!this.state.modalContent) {
            return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-row" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm12" }, this.state.modalContent)));
        }
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-row" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm12" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_global_components_simple_Panel__WEBPACK_IMPORTED_MODULE_8__["Panel"], { contentClass: "custom-padding-top-10px", headerText: "Routen\u00FCbersicht", className: "custom-padding-bottom-10px custom-padding-top-10px" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_intelligent_Routenuebersicht__WEBPACK_IMPORTED_MODULE_4__["Routenuebersicht"], { onEditRouteClick: this.editRoute, commandbarItems: [
                                {
                                    key: "newItem",
                                    name: "New",
                                    icon: "Add",
                                    onClick: this.addRouteClick
                                },
                                {
                                    key: "import",
                                    name: "Import",
                                    icon: "import",
                                    onClick: this.showUploadRoutesClick
                                }
                            ] })))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-row" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm12" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_global_components_simple_Panel__WEBPACK_IMPORTED_MODULE_8__["Panel"], { contentClass: "custom-padding-top-10px", headerText: "Filial\u00FCbersicht", className: "custom-padding-bottom-10px" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", null,
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_intelligent_Filialuebersicht__WEBPACK_IMPORTED_MODULE_7__["Filialuebersicht"], { onEditFilialeClick: this.editFiliale, commandbarItems: [
                                    {
                                        key: "newItem",
                                        name: "New",
                                        icon: "Add",
                                        onClick: this.createFiliale
                                    },
                                    {
                                        key: "import",
                                        name: "Import",
                                        icon: "import",
                                        onClick: this.showUploadFilialenClick
                                    }
                                ] })))))));
    };
    return Application;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));



/***/ }),

/***/ "./src/projects/aldi/components/pages/manageRoute.tsx":
/*!************************************************************!*\
  !*** ./src/projects/aldi/components/pages/manageRoute.tsx ***!
  \************************************************************/
/*! exports provided: ManageRoute */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Promise) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManageRoute", function() { return ManageRoute; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! office-ui-fabric-react */ "./node_modules/office-ui-fabric-react/lib/index.js");
/* harmony import */ var _enums_enums__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../enums/enums */ "./src/enums/enums.ts");
/* harmony import */ var _global_components_container_basePage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../global/components/container/basePage */ "./src/global/components/container/basePage.tsx");
/* harmony import */ var _global_components_simple_ButtonRow__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../global/components/simple/ButtonRow */ "./src/global/components/simple/ButtonRow.tsx");
/* harmony import */ var _global_components_simple_Panel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../global/components/simple/Panel */ "./src/global/components/simple/Panel.tsx");
/* harmony import */ var _helper_date__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../helper/date */ "./src/helper/date.ts");
/* harmony import */ var _stateless_Link__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../stateless/Link */ "./src/projects/aldi/components/stateless/Link.tsx");
/* harmony import */ var _stateless_Ausgabe__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../stateless/Ausgabe */ "./src/projects/aldi/components/stateless/Ausgabe.tsx");
/* harmony import */ var _stateless_Filiale__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../stateless/Filiale */ "./src/projects/aldi/components/stateless/Filiale.tsx");
/* harmony import */ var _stateless_Routenfahrt__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../stateless/Routenfahrt */ "./src/projects/aldi/components/stateless/Routenfahrt.tsx");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_12__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};













var ManageRoute = (function (_super) {
    __extends(ManageRoute, _super);
    function ManageRoute(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            filialen: [],
            routenfahrten: [],
            ausgaben: [],
            links: []
        };
        _this.cancelClick = _this.cancelClick.bind(_this);
        _this.saveClick = _this.saveClick.bind(_this);
        _this.addLink = _this.addLink.bind(_this);
        _this.deleteLink = _this.deleteLink.bind(_this);
        _this.linkChanged = _this.linkChanged.bind(_this);
        _this.addAusgabe = _this.addAusgabe.bind(_this);
        _this.deleteAusgabe = _this.deleteAusgabe.bind(_this);
        _this.ausgabeDescriptionChanged = _this.ausgabeDescriptionChanged.bind(_this);
        _this.ausgabeValueChanged = _this.ausgabeValueChanged.bind(_this);
        _this.deleteFiliale = _this.deleteFiliale.bind(_this);
        _this.addFiliale = _this.addFiliale.bind(_this);
        _this.pkzChanged = _this.pkzChanged.bind(_this);
        _this.einnahmenChanged = _this.einnahmenChanged.bind(_this);
        _this.ausgabenChanged = _this.ausgabenChanged.bind(_this);
        _this.plzChanged = _this.plzChanged.bind(_this);
        _this.testnummerChanged = _this.testnummerChanged.bind(_this);
        _this.fahrdatumChanged = _this.fahrdatumChanged.bind(_this);
        _this.ortChanged = _this.ortChanged.bind(_this);
        _this.strasseChanged = _this.strasseChanged.bind(_this);
        _this.addRoutenfahrt = _this.addRoutenfahrt.bind(_this);
        _this.deleteRoutenfahrt = _this.deleteRoutenfahrt.bind(_this);
        _this.changeRouteDate = _this.changeRouteDate.bind(_this);
        return _this;
    }
    ManageRoute.prototype.componentDidMount = function () {
        var docTitle = "";
        switch (this.props.pageType) {
            case _enums_enums__WEBPACK_IMPORTED_MODULE_2__["PageType"].Display:
                docTitle = "Route anzeigen";
                break;
            case _enums_enums__WEBPACK_IMPORTED_MODULE_2__["PageType"].Edit:
                docTitle = "Route bearbeiten";
                break;
            case _enums_enums__WEBPACK_IMPORTED_MODULE_2__["PageType"].Add:
                docTitle = "Route hinzufügen";
                break;
            default:
                break;
        }
        document.title = docTitle;
    };
    ManageRoute.prototype.saveRoutes = function (routes) {
        return new Promise(function (resolve, reject) {
            var promises = [];
            routes.forEach(function (route) {
                promises.push(axios__WEBPACK_IMPORTED_MODULE_12___default.a.post("/api/routen", { route: route }));
            });
            Promise.all(promises)
                .then(function (results) {
                console.log(JSON.stringify(results));
                var resultValue = [];
                results.forEach(function (p) {
                    if (p.data.insertedObjects && p.data.insertedObjects.length > 0) {
                        resultValue = resultValue.concat(p.data.insertedObjects);
                    }
                });
                resolve(resultValue);
            })
                .catch(function (error) {
                console.log("saveRoutes", JSON.stringify(error));
                reject({ message: "Kein Einfügen", error: error });
            });
        });
    };
    ManageRoute.prototype.saveFilialen = function (filialen) {
        return new Promise(function (resolve, reject) {
            var promises = [];
            filialen.forEach(function (filiale) {
                promises.push(axios__WEBPACK_IMPORTED_MODULE_12___default.a.post("/api/filialen", { filiale: filiale }));
            });
            Promise.all(promises)
                .then(function (results) {
                console.log(JSON.stringify(results));
                var resultValue = [];
                results.forEach(function (p) {
                    if (p.data.insertedObjects && p.data.insertedObjects.length > 0) {
                        resultValue = resultValue.concat(p.data.insertedObjects);
                    }
                });
                resolve(resultValue);
            })
                .catch(function (error) {
                console.log("saveFilialen", JSON.stringify(error));
                reject({ message: "Kein Einfügen", error: error });
            });
        });
    };
    ManageRoute.prototype.saveClick = function () {
        var _this = this;
        console.log("Save Click");
        if (!this.state.routenfahrten || this.state.routenfahrten.length < 0) {
            return;
        }
        var routenModels = [];
        this.state.routenfahrten.forEach(function (fahrt) {
            var route = {
                route_timestamp: fahrt.getTime(),
                ausgaben: [],
                links: [],
                timestamp: Date.now()
            };
            _this.state.ausgaben.forEach(function (ausgabe) {
                route.ausgaben.push({
                    value: ausgabe.value,
                    description: ausgabe.description,
                    id: ausgabe.id
                });
            });
            _this.state.links.forEach(function (link) {
                route.links.push({
                    link: link.link,
                    text: link.text,
                    id: link.id
                });
            });
            routenModels.push(route);
        });
        this.saveRoutes(routenModels)
            .then(function (insertedRouten) {
            if (_this.state.routenfahrten.length === insertedRouten.length) {
                console.log("ROUTES OK!");
            }
            var filialen = [];
            filialen = _this.state.filialen.map(function (filiale) {
                var routeId = "";
                insertedRouten.forEach(function (route) {
                    if (filiale.fahrdatum === route.route_timestamp) {
                        routeId = route._id;
                    }
                });
                return {
                    ausgaben: filiale.ausgaben,
                    einnahmen: filiale.einnahmen,
                    ort: filiale.ort,
                    pkz: filiale.pkz,
                    plz: filiale.plz,
                    strasse: filiale.strasse,
                    testnummer: filiale.testnummer,
                    timestamp: Date.now(),
                    route_id: routeId
                };
            });
            return _this.saveFilialen(filialen);
        })
            .then(function (insertedFilialen) {
            if (_this.state.filialen.length === insertedFilialen.length) {
                console.log("FILIALEN OK!");
            }
        })
            .catch(function () { });
    };
    ManageRoute.prototype.cancelClick = function () {
        console.log("cancel Click");
        this.props.onExitPage();
    };
    ManageRoute.prototype.getRouteSelectOptions = function () {
        if (!this.state.routenfahrten || this.state.routenfahrten.length < 1) {
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { value: "" }, "Bitte Fahrdaten anlegen");
        }
        return this.state.routenfahrten.map(function (fahrt, index) {
            return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { value: index, key: "fahrt_opt_" + index }, Object(_helper_date__WEBPACK_IMPORTED_MODULE_6__["getGermanDateString"])(fahrt)));
        });
    };
    ManageRoute.prototype.addFiliale = function () {
        var ns = __assign({}, this.state);
        ns.filialen.push({
            index: ns.filialen.length + 1,
            ausgaben: 0,
            einnahmen: 0,
            ort: "",
            pkz: 0,
            plz: 0,
            strasse: "",
            testnummer: 0,
            timestamp: Date.now(),
            fahrdatum: this.state.routenfahrten.length > 0 ? this.state.routenfahrten[0].getTime() : Object(_helper_date__WEBPACK_IMPORTED_MODULE_6__["setDatePropertiesToZero"])(new Date()).getTime()
        });
        this.setState(ns);
    };
    ManageRoute.prototype.deleteFiliale = function (id) {
        var ns = __assign({}, this.state);
        ns.filialen.splice(parseInt(id), 1);
        this.setState(ns);
    };
    ManageRoute.prototype.ausgabenChanged = function (id, value) {
        var ns = __assign({}, this.state);
        ns.filialen[parseInt(id)].ausgaben = value;
        this.setState(ns);
    };
    ManageRoute.prototype.einnahmenChanged = function (id, value) {
        var ns = __assign({}, this.state);
        ns.filialen[parseInt(id)].einnahmen = value;
        this.setState(ns);
    };
    ManageRoute.prototype.pkzChanged = function (id, value) {
        var ns = __assign({}, this.state);
        ns.filialen[parseInt(id)].pkz = value;
        this.setState(ns);
    };
    ManageRoute.prototype.plzChanged = function (id, value) {
        var ns = __assign({}, this.state);
        ns.filialen[parseInt(id)].plz = value;
        this.setState(ns);
    };
    ManageRoute.prototype.testnummerChanged = function (id, value) {
        var ns = __assign({}, this.state);
        ns.filialen[parseInt(id)].testnummer = value;
        this.setState(ns);
    };
    ManageRoute.prototype.fahrdatumChanged = function (id, value) {
        var ns = __assign({}, this.state);
        ns.filialen[parseInt(id)].fahrdatum = value;
        this.setState(ns);
    };
    ManageRoute.prototype.strasseChanged = function (id, value) {
        var ns = __assign({}, this.state);
        ns.filialen[parseInt(id)].strasse = value;
        this.setState(ns);
    };
    ManageRoute.prototype.ortChanged = function (id, value) {
        var ns = __assign({}, this.state);
        ns.filialen[parseInt(id)].ort = value;
        this.setState(ns);
    };
    ManageRoute.prototype.addAusgabe = function () {
        var ns = __assign({}, this.state);
        ns.ausgaben.push({
            description: "",
            value: 0,
            id: Object(uuid__WEBPACK_IMPORTED_MODULE_11__["v4"])()
        });
        this.setState(ns);
    };
    ManageRoute.prototype.deleteAusgabe = function (id) {
        var ns = __assign({}, this.state);
        ns.ausgaben.splice(parseInt(id), 1);
        this.setState(ns);
    };
    ManageRoute.prototype.ausgabeValueChanged = function (id, value) {
        var ns = __assign({}, this.state);
        ns.ausgaben[parseInt(id)].value = value;
        this.setState(ns);
    };
    ManageRoute.prototype.ausgabeDescriptionChanged = function (id, value) {
        var ns = __assign({}, this.state);
        ns.ausgaben[parseInt(id)].description = value;
        this.setState(ns);
    };
    ManageRoute.prototype.addLink = function () {
        var ns = __assign({}, this.state);
        ns.links.push({
            link: "",
            text: "",
            id: Object(uuid__WEBPACK_IMPORTED_MODULE_11__["v4"])()
        });
        this.setState(ns);
    };
    ManageRoute.prototype.deleteLink = function (id) {
        var ns = __assign({}, this.state);
        ns.links.splice(parseInt(id), 1);
        this.setState(ns);
    };
    ManageRoute.prototype.linkChanged = function (id, value) {
        var ns = __assign({}, this.state);
        ns.links[parseInt(id)].link = value;
        this.setState(ns);
    };
    ManageRoute.prototype.addRoutenfahrt = function () {
        var fahrten = this.state.routenfahrten.concat([Object(_helper_date__WEBPACK_IMPORTED_MODULE_6__["setDatePropertiesToZero"])(new Date())]);
        this.setState({
            routenfahrten: fahrten
        });
    };
    ManageRoute.prototype.deleteRoutenfahrt = function (id) {
        var ns = __assign({}, this.state);
        ns.routenfahrten.splice(parseInt(id), 1);
        this.setState(ns);
    };
    ManageRoute.prototype.changeRouteDate = function (id, value) {
        var d = value || new Date();
        var ns = __assign({}, this.state);
        var newFahrten = [];
        ns.routenfahrten.forEach(function (element, index) {
            newFahrten.push(index === parseInt(id) ? value : element);
        });
        ns.routenfahrten = newFahrten;
        this.setState(ns);
    };
    ManageRoute.prototype.render = function () {
        var _this = this;
        console.log("render ManageRoute");
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_global_components_container_basePage__WEBPACK_IMPORTED_MODULE_3__["BasePage"], { IncludeFabricElement: false, Body: react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-row" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm12" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_global_components_simple_Panel__WEBPACK_IMPORTED_MODULE_5__["Panel"], { headerText: "Routenlinks", className: "custom-padding-bottom-10px", headerControls: react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_1__["ActionButton"], { "data-automation-id": "Add Link", iconProps: { iconName: "Add" }, onClick: this.addLink }) }, this.state.links.map(function (link, index) {
                            return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_stateless_Link__WEBPACK_IMPORTED_MODULE_7__["Link"], { key: "link_" + index, linkId: index.toString(), linkModel: link, title: "Link " + (index + 1), onDeleteClick: _this.deleteLink, onLinkHrefChanged: _this.linkChanged }));
                        })))),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-row" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm12" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_global_components_simple_Panel__WEBPACK_IMPORTED_MODULE_5__["Panel"], { headerText: "Globale Ausgaben", className: "custom-padding-bottom-10px", headerControls: react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_1__["ActionButton"], { "data-automation-id": "Add Ausgabe", iconProps: { iconName: "Add" }, onClick: this.addAusgabe }) },
                            (!this.state.ausgaben || this.state.ausgaben.length < 1) && (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-font-xl ms-fontColor-themePrimary" }, "Es wurden bisher keine globalen Ausgaben erfasst")),
                            this.state.ausgaben.map(function (ausgabe, index) {
                                return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_stateless_Ausgabe__WEBPACK_IMPORTED_MODULE_8__["Ausgabe"], { key: "ausgabe_" + index, ausgabeId: index.toString(), onDeleteClick: _this.deleteAusgabe, title: "Ausgabe " + (index + 1), ausgabeModel: ausgabe, onDescriptionChanged: _this.ausgabeDescriptionChanged, onValueChanged: _this.ausgabeValueChanged }));
                            })))),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-row" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm12" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_global_components_simple_Panel__WEBPACK_IMPORTED_MODULE_5__["Panel"], { headerText: "Routenfahrdaten verwalten", className: "custom-padding-bottom-10px", headerControls: react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_1__["ActionButton"], { "data-automation-id": "Add Routenfahrt", iconProps: { iconName: "Add" }, onClick: this.addRoutenfahrt }) },
                            (!this.state.routenfahrten || this.state.routenfahrten.length < 1) && (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-font-xl ms-fontColor-themePrimary" }, "Es wurden bisher keine Routenfahrdaten erfasst")),
                            this.state.routenfahrten.map(function (fahrt, index) {
                                return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_stateless_Routenfahrt__WEBPACK_IMPORTED_MODULE_10__["Routenfahrt"], { key: "routnefahrt_" + index, onDateChanged: _this.changeRouteDate, onDeleteClick: _this.deleteRoutenfahrt, routenfahrtId: index.toString(), title: "Routenfahrt " + (index + 1), value: fahrt }));
                            })))),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-row" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm12" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_global_components_simple_Panel__WEBPACK_IMPORTED_MODULE_5__["Panel"], { headerText: "Fahrten verwalten", className: "custom-padding-bottom-10px", headerControls: react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_1__["ActionButton"], { "data-automation-id": "Add Ausgabe", iconProps: { iconName: "Add" }, onClick: this.addFiliale }) },
                            (!this.state.filialen || this.state.filialen.length < 1) && react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-font-xl ms-fontColor-themePrimary" }, "Es wurden bisher keine Filialen erfasst"),
                            this.state.filialen.map(function (filiale, index) {
                                return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_stateless_Filiale__WEBPACK_IMPORTED_MODULE_9__["Filiale"], { key: "route_" + index, id: index.toString(), title: "Fahrt " + (index + 1), filiale: filiale, fahrdaten: _this.state.routenfahrten, onDeleteClick: _this.deleteFiliale, onAusgabenChanged: _this.ausgabenChanged, onEinnahmenChanged: _this.einnahmenChanged, onFahrdatumChanged: _this.fahrdatumChanged, onOrtChanged: _this.ortChanged, onPkzChanged: _this.pkzChanged, onPlzChanged: _this.plzChanged, onStrasseChanged: _this.strasseChanged, onTestnummerChanged: _this.testnummerChanged, enableDeleteBtn: true }));
                            })))),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-row" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm12" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_global_components_simple_ButtonRow__WEBPACK_IMPORTED_MODULE_4__["ButtonRow"], { saveButtonProps: {
                                checked: false,
                                disabled: false,
                                text: "Speichern",
                                onClickFunc: this.saveClick
                            }, cancelButtonProps: {
                                checked: true,
                                disabled: false,
                                text: "Abbrechen",
                                onClickFunc: this.cancelClick
                            } })))), Header: react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-font-xxl ms-textAlignCenter" }, "Fahrten verwalten") }));
    };
    return ManageRoute;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! bluebird */ "./node_modules/bluebird/js/browser/bluebird.js")))

/***/ }),

/***/ "./src/projects/aldi/components/stateless/Ausgabe.tsx":
/*!************************************************************!*\
  !*** ./src/projects/aldi/components/stateless/Ausgabe.tsx ***!
  \************************************************************/
/*! exports provided: Ausgabe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ausgabe", function() { return Ausgabe; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! office-ui-fabric-react */ "./node_modules/office-ui-fabric-react/lib/index.js");
/* harmony import */ var _global_components_simple_NumberTextField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../global/components/simple/NumberTextField */ "./src/global/components/simple/NumberTextField.tsx");
/* harmony import */ var _global_components_simple_Panel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../global/components/simple/Panel */ "./src/global/components/simple/Panel.tsx");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var defaultOption = react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { key: "-1" }, "Bitte einen Wert angeben");
var Ausgabe = (function (_super) {
    __extends(Ausgabe, _super);
    function Ausgabe(props) {
        var _this = _super.call(this, props) || this;
        _this.deleteClicked = _this.deleteClicked.bind(_this);
        _this.onDescriptionChanged = _this.onDescriptionChanged.bind(_this);
        _this.onValueChanged = _this.onValueChanged.bind(_this);
        return _this;
    }
    Ausgabe.prototype.deleteClicked = function () {
        this.props.onDeleteClick(this.props.ausgabeId);
    };
    Ausgabe.prototype.onValueChanged = function (value) {
        this.props.onValueChanged(this.props.ausgabeId, value);
    };
    Ausgabe.prototype.onDescriptionChanged = function (value) {
        this.props.onDescriptionChanged(this.props.ausgabeId, value);
    };
    Ausgabe.prototype.render = function () {
        console.log("render Ausgabe");
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_global_components_simple_Panel__WEBPACK_IMPORTED_MODULE_3__["Panel"], { key: "ausgabe_" + this.props.ausgabeId, headerText: this.props.title, className: "custom-padding-bottom-10px", headerControls: react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_1__["ActionButton"], { "data-info-title": this.props.title + " löschen", "data-info-desc": this.props.title + " löschen", iconProps: {
                    iconName: "Delete",
                    className: "img-font-size-large"
                }, onClick: this.deleteClicked }) }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-row" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm12 ms-lg6" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_1__["TextField"], { placeholder: "Beschreibung der Ausgabe (z.B. Tanken)", required: true, label: "Beschreibung der Ausgabe", value: this.props.ausgabeModel.description, onChanged: this.onDescriptionChanged })),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm12 ms-lg6" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_global_components_simple_NumberTextField__WEBPACK_IMPORTED_MODULE_2__["NumberTextField"], { placeholder: "Ausgaben in Euro", label: "Wert der Ausgabe", required: true, numberValue: this.props.ausgabeModel.value, suffix: "Euro", onChanged: this.onValueChanged })))));
    };
    return Ausgabe;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]));



/***/ }),

/***/ "./src/projects/aldi/components/stateless/Filiale.tsx":
/*!************************************************************!*\
  !*** ./src/projects/aldi/components/stateless/Filiale.tsx ***!
  \************************************************************/
/*! exports provided: Filiale */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Filiale", function() { return Filiale; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! office-ui-fabric-react */ "./node_modules/office-ui-fabric-react/lib/index.js");
/* harmony import */ var _global_components_simple_NumberTextField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../global/components/simple/NumberTextField */ "./src/global/components/simple/NumberTextField.tsx");
/* harmony import */ var _global_components_simple_Panel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../global/components/simple/Panel */ "./src/global/components/simple/Panel.tsx");
/* harmony import */ var _helper_date__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../helper/date */ "./src/helper/date.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();





var Filiale = (function (_super) {
    __extends(Filiale, _super);
    function Filiale(props) {
        var _this = _super.call(this, props) || this;
        _this.fahrDatumChanged = _this.fahrDatumChanged.bind(_this);
        _this.deleteClicked = _this.deleteClicked.bind(_this);
        _this.pkzChanged = _this.pkzChanged.bind(_this);
        _this.testnummerChanged = _this.testnummerChanged.bind(_this);
        _this.ausgabenChanged = _this.ausgabenChanged.bind(_this);
        _this.einnahmenChanged = _this.einnahmenChanged.bind(_this);
        _this.ortChanged = _this.ortChanged.bind(_this);
        _this.strasseChanged = _this.strasseChanged.bind(_this);
        _this.plzChanged = _this.plzChanged.bind(_this);
        return _this;
    }
    Filiale.prototype.fahrDatumChanged = function (event) {
        var index = event.target.selectedIndex;
        var value = event.target.options[index].value;
        this.props.onFahrdatumChanged(this.props.id, parseInt(value));
    };
    Filiale.prototype.deleteClicked = function () {
        this.props.onDeleteClick(this.props.id);
    };
    Filiale.prototype.pkzChanged = function (value) {
        this.props.onPkzChanged(this.props.id, value);
    };
    Filiale.prototype.testnummerChanged = function (value) {
        this.props.onTestnummerChanged(this.props.id, value);
    };
    Filiale.prototype.ausgabenChanged = function (value) {
        this.props.onAusgabenChanged(this.props.id, value);
    };
    Filiale.prototype.einnahmenChanged = function (value) {
        this.props.onEinnahmenChanged(this.props.id, value);
    };
    Filiale.prototype.ortChanged = function (value) {
        this.props.onOrtChanged(this.props.id, value);
    };
    Filiale.prototype.strasseChanged = function (value) {
        this.props.onStrasseChanged(this.props.id, value);
    };
    Filiale.prototype.plzChanged = function (value) {
        this.props.onPlzChanged(this.props.id, value);
    };
    Filiale.prototype.render = function () {
        console.log("render Filiale");
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-row", key: "filiale_" + this.props.id },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm12" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_global_components_simple_Panel__WEBPACK_IMPORTED_MODULE_3__["Panel"], { headerText: this.props.title, headerControls: this.props.enableDeleteBtn ? (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_1__["ActionButton"], { "data-info-title": "Filiale entfernen", "data-info-desc": "L\u00F6scht die Filiale", iconProps: { iconName: "Delete" }, onClick: this.deleteClicked })) : null },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-row" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm12 ms-md5" },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", null,
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_1__["Label"], null, "Routenfahrdatum"),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("select", { className: "custom-ddl-control", onChange: this.fahrDatumChanged, value: this.props.filiale.fahrdatum || undefined }, this.props.fahrdaten.map(function (fahrtDatum, index) {
                                    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { key: "fahrt__" + index, value: fahrtDatum.getTime() }, Object(_helper_date__WEBPACK_IMPORTED_MODULE_4__["getGermanDateString"])(fahrtDatum)));
                                })))),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm8 ms-md4" },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_global_components_simple_NumberTextField__WEBPACK_IMPORTED_MODULE_2__["NumberTextField"], { required: true, placeholder: "Testnummer", label: "Testnummer", numberValue: this.props.filiale.testnummer, onChanged: this.testnummerChanged })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm4 ms-md3" },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_global_components_simple_NumberTextField__WEBPACK_IMPORTED_MODULE_2__["NumberTextField"], { required: true, placeholder: "Pr\u00FCfkennziffer", label: "Pkz.", numberValue: this.props.filiale.pkz, onChanged: this.pkzChanged })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm12 ms-lg5" },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_1__["TextField"], { required: true, placeholder: "Stra\u00DFe", label: "Stra\u00DFe", value: this.props.filiale.strasse, onChanged: this.strasseChanged })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm4 ms-md3 ms-lg2" },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_global_components_simple_NumberTextField__WEBPACK_IMPORTED_MODULE_2__["NumberTextField"], { required: true, placeholder: "Plz", label: "Plz", numberValue: this.props.filiale.plz, onChanged: this.plzChanged })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm8 ms-md9 ms-lg5" },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_1__["TextField"], { required: true, placeholder: "Ort", label: "Ort", value: this.props.filiale.ort, onChanged: this.ortChanged })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm6 ms-md6 ms-lg6" },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_global_components_simple_NumberTextField__WEBPACK_IMPORTED_MODULE_2__["NumberTextField"], { placeholder: "Einnahmen", label: "Einnahmen", numberValue: this.props.filiale.einnahmen, onChanged: this.einnahmenChanged, suffix: " \u20AC" })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm6 ms-md6 ms-lg6" },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_global_components_simple_NumberTextField__WEBPACK_IMPORTED_MODULE_2__["NumberTextField"], { placeholder: "Ausgaben", label: "Ausgaben", numberValue: this.props.filiale.ausgaben, onChanged: this.ausgabenChanged, suffix: " \u20AC" })))))));
    };
    return Filiale;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));



/***/ }),

/***/ "./src/projects/aldi/components/stateless/Link.tsx":
/*!*********************************************************!*\
  !*** ./src/projects/aldi/components/stateless/Link.tsx ***!
  \*********************************************************/
/*! exports provided: Link */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Link", function() { return Link; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! office-ui-fabric-react */ "./node_modules/office-ui-fabric-react/lib/index.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var defaultOption = react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { key: "-1" }, "Bitte einen Wert angeben");
var Link = (function (_super) {
    __extends(Link, _super);
    function Link(props) {
        var _this = _super.call(this, props) || this;
        _this.deleteLinkClicked = _this.deleteLinkClicked.bind(_this);
        _this.onLinkHrefChanged = _this.onLinkHrefChanged.bind(_this);
        return _this;
    }
    Link.prototype.deleteLinkClicked = function () {
        this.props.onDeleteClick(this.props.linkId);
    };
    Link.prototype.onLinkHrefChanged = function (value) {
        this.props.onLinkHrefChanged(this.props.linkId, value);
    };
    Link.prototype.render = function () {
        console.log("render Link");
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-row", key: "link_comp_" + this.props.linkId },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm2 ms-lg1" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_1__["Label"], null,
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_1__["Link"], { href: this.props.linkModel.link, disabled: !this.props.linkModel.link, target: "_blank" }, this.props.title))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm8 ms-lg-10" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_1__["TextField"], { placeholder: "Link eingeben", value: this.props.linkModel.link, onChanged: this.onLinkHrefChanged })),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm2 ms-lg1" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_1__["ActionButton"], { "data-info-title": "Link entfernen", "data-info-desc": "L\u00F6scht den Link", iconProps: {
                        iconName: "Delete",
                        className: "img-font-size-large"
                    }, onClick: this.deleteLinkClicked }))));
    };
    return Link;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]));



/***/ }),

/***/ "./src/projects/aldi/components/stateless/Routenfahrt.tsx":
/*!****************************************************************!*\
  !*** ./src/projects/aldi/components/stateless/Routenfahrt.tsx ***!
  \****************************************************************/
/*! exports provided: Routenfahrt */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Routenfahrt", function() { return Routenfahrt; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! office-ui-fabric-react */ "./node_modules/office-ui-fabric-react/lib/index.js");
/* harmony import */ var _helper_date__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../helper/date */ "./src/helper/date.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var defaultOption = react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { key: "-1" }, "Bitte einen Wert angeben");
var Routenfahrt = (function (_super) {
    __extends(Routenfahrt, _super);
    function Routenfahrt(props) {
        var _this = _super.call(this, props) || this;
        _this.deleteRoutenfahrtClicked = _this.deleteRoutenfahrtClicked.bind(_this);
        _this.dateChanged = _this.dateChanged.bind(_this);
        return _this;
    }
    Routenfahrt.prototype.deleteRoutenfahrtClicked = function () {
        this.props.onDeleteClick(this.props.routenfahrtId);
    };
    Routenfahrt.prototype.dateChanged = function (date) {
        this.props.onDateChanged(this.props.routenfahrtId, date);
    };
    Routenfahrt.prototype.render = function () {
        console.log("render Routenfahrt");
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-row", key: "route_" + this.props.routenfahrtId },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm2 ms-md1 ms-lg1" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_1__["Label"], { className: "ms-fontSize-l ms-textAlignCenter" }, this.props.title)),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm8 ms-md8 ms-lg6" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_1__["DatePicker"], { placeholder: "Bitte Routenfahrdatum ausw\u00E4hlen", showWeekNumbers: true, showMonthPickerAsOverlay: true, allowTextInput: false, formatDate: _helper_date__WEBPACK_IMPORTED_MODULE_2__["getGermanDateString"], firstDayOfWeek: 1, key: "fahrt" + this.props.routenfahrtId, value: this.props.value, onSelectDate: this.dateChanged })),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm2 ms-md2 ms-lg1" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_1__["ActionButton"], { "data-info-title": "Fahrdatum entfernen", "data-info-desc": "L\u00F6scht das Fahrdatum", iconProps: {
                        iconName: "Delete",
                        className: "img-font-size-large"
                    }, onClick: this.deleteRoutenfahrtClicked }))));
    };
    return Routenfahrt;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]));



/***/ }),

/***/ "./src/projects/aldi/configuration/columns.tsx":
/*!*****************************************************!*\
  !*** ./src/projects/aldi/configuration/columns.tsx ***!
  \*****************************************************/
/*! exports provided: defaultColumns, routeOverviewColumns, filialOverviewColumns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultColumns", function() { return defaultColumns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routeOverviewColumns", function() { return routeOverviewColumns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filialOverviewColumns", function() { return filialOverviewColumns; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helper_date__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../helper/date */ "./src/helper/date.ts");


var defaultColumns = [];
var routeOverviewColumns = [
    {
        key: "column1",
        name: "#",
        fieldName: "index",
        minWidth: 30,
        maxWidth: 60,
        isResizable: true,
        isCollapsable: true,
        data: "number",
        onRender: function (item) {
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null, item.index);
        }
    },
    {
        key: "column2",
        name: "",
        fieldName: "ctx",
        minWidth: 30,
        maxWidth: 60,
        isResizable: false,
        isCollapsable: false,
        onRender: function (item) {
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null, "...");
        }
    },
    {
        key: "column5",
        name: "Fahrdatum",
        fieldName: "route_timestamp",
        minWidth: 70,
        maxWidth: 90,
        isResizable: true,
        isCollapsable: true,
        data: "string",
        onRender: function (item) {
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null, Object(_helper_date__WEBPACK_IMPORTED_MODULE_1__["getGermanDateString"])(new Date(item.route_timestamp)));
        }
    },
    {
        key: "column3",
        name: "Bearbeitet am",
        fieldName: "modified",
        minWidth: 100,
        maxWidth: 150,
        isResizable: true,
        data: "string",
        onRender: function (item) {
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null, Object(_helper_date__WEBPACK_IMPORTED_MODULE_1__["getGermanDateTimeString"])(new Date(item.modified)));
        },
        isPadded: true
    },
    {
        key: "column4",
        name: "Erstellt am",
        fieldName: "created",
        minWidth: 100,
        maxWidth: 150,
        isResizable: false,
        isCollapsable: false,
        data: "string",
        onRender: function (item) {
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null, Object(_helper_date__WEBPACK_IMPORTED_MODULE_1__["getGermanDateTimeString"])(new Date(item.created)));
        }
    }
];
var filialOverviewColumns = [
    {
        key: "column1",
        name: "#",
        fieldName: "index",
        minWidth: 30,
        maxWidth: 60,
        isResizable: true,
        isCollapsable: true,
        data: "number",
        onRender: function (item) {
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null, item.index);
        }
    },
    {
        key: "column2",
        name: "",
        fieldName: "ctx",
        minWidth: 30,
        maxWidth: 60,
        isResizable: false,
        isCollapsable: false,
        onRender: function (item) {
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null, "...");
        }
    },
    {
        key: "column7",
        name: "Straße",
        fieldName: "strasse",
        minWidth: 150,
        maxWidth: 200,
        isResizable: true,
        isCollapsable: true,
        data: "string",
        onRender: function (item) {
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null, item.strasse);
        }
    },
    {
        key: "column5",
        name: "Plz",
        fieldName: "plz",
        minWidth: 70,
        maxWidth: 90,
        isResizable: true,
        isCollapsable: true,
        data: "string",
        onRender: function (item) {
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null, item.plz);
        }
    },
    {
        key: "column6",
        name: "Ort",
        fieldName: "ort",
        minWidth: 100,
        maxWidth: 120,
        isResizable: true,
        isCollapsable: true,
        data: "string",
        onRender: function (item) {
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null, item.ort);
        }
    },
    {
        key: "column8",
        name: "Testnummer",
        fieldName: "testnummer",
        minWidth: 100,
        maxWidth: 120,
        isResizable: true,
        isCollapsable: true,
        data: "string",
        onRender: function (item) {
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null, item.testnummer);
        }
    },
    {
        key: "column9",
        name: "Pkz",
        fieldName: "pkz",
        minWidth: 30,
        maxWidth: 40,
        isResizable: true,
        isCollapsable: true,
        data: "string",
        onRender: function (item) {
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null, item.pkz);
        }
    },
    {
        key: "column3",
        name: "Bearbeitet am",
        fieldName: "modified",
        minWidth: 100,
        maxWidth: 150,
        isResizable: true,
        data: "string",
        onRender: function (item) {
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null, Object(_helper_date__WEBPACK_IMPORTED_MODULE_1__["getGermanDateTimeString"])(new Date(item.modified)));
        },
        isPadded: true
    },
    {
        key: "column4",
        name: "Erstellt am",
        fieldName: "created",
        minWidth: 100,
        maxWidth: 150,
        isResizable: false,
        isCollapsable: false,
        data: "string",
        onRender: function (item) {
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null, Object(_helper_date__WEBPACK_IMPORTED_MODULE_1__["getGermanDateTimeString"])(new Date(item.created)));
        }
    }
];


/***/ }),

/***/ "./src/projects/system/components/pages/systeminfo.tsx":
/*!*************************************************************!*\
  !*** ./src/projects/system/components/pages/systeminfo.tsx ***!
  \*************************************************************/
/*! exports provided: SystemInfo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Promise) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SystemInfo", function() { return SystemInfo; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! office-ui-fabric-react */ "./node_modules/office-ui-fabric-react/lib/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var timers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! timers */ "../../Users/florian/AppData/Roaming/npm/node_modules/webpack/node_modules/timers-browserify/main.js");
/* harmony import */ var timers__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(timers__WEBPACK_IMPORTED_MODULE_3__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();





var SystemInfo = (function (_super) {
    __extends(SystemInfo, _super);
    function SystemInfo(props) {
        var _this = _super.call(this, props) || this;
        _this.isMountedFinished = false;
        _this.state = {
            systemInformation: undefined,
            isInitialized: false,
            intervalId: undefined
        };
        _this.loadDevices = _this.loadDevices.bind(_this);
        return _this;
    }
    SystemInfo.prototype.componentDidMount = function () {
        var _this = this;
        document.title = "System Informationen";
        console.log("SystemInfo componentDidMount");
        this.loadDevices().then(function () {
            if (_this.isMountedFinished === true) {
                _this.setState({ isInitialized: true });
            }
        });
        var interval = Object(timers__WEBPACK_IMPORTED_MODULE_3__["setInterval"])(this.loadDevices, 10000);
        this.setState({ intervalId: interval["_id"] });
        this.isMountedFinished = true;
    };
    SystemInfo.prototype.componentWillUnmount = function () {
        clearInterval(this.state.intervalId);
        this.isMountedFinished = false;
    };
    SystemInfo.prototype.loadDevices = function () {
        var _this = this;
        if (!this.isMountedFinished) {
            Promise.resolve();
        }
        return axios__WEBPACK_IMPORTED_MODULE_2___default.a.get("/api/system").then(function (result) {
            _this.setState({ systemInformation: result.data["system"] });
        });
    };
    SystemInfo.prototype.convertRamToMBString = function (ram) {
        if (isNaN(ram)) {
            return "-";
        }
        return (ram / 1024 / 1024).toFixed(0) + " MB";
    };
    SystemInfo.prototype.getUptimeString = function (uptime) {
        if (isNaN(uptime)) {
            return "-";
        }
        var hr = Math.floor(uptime / 60 / 60);
        var days = (hr / 24).toFixed(2);
        return hr + " Stunden (" + days + " Tage)";
    };
    SystemInfo.prototype.getLabelRowForProperty = function (label, value) {
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-row" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm12" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_1__["Label"], { className: "ms-font-xl ms-fontColor-themePrimary" }, label),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null, value))));
    };
    SystemInfo.prototype.getValueFromSystemInfo = function () {
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
            this.getLabelRowForProperty("Hostname: ", this.state.systemInformation.hostname + " (" + this.state.systemInformation.userName + ")"),
            this.getLabelRowForProperty("Total Memory: ", this.convertRamToMBString(Number(this.state.systemInformation.totalMemory))),
            this.getLabelRowForProperty("Free Memory: ", this.convertRamToMBString(Number(this.state.systemInformation.freeMemory))),
            this.getLabelRowForProperty("Uptime: ", this.getUptimeString(this.state.systemInformation.uptime)),
            this.getLabelRowForProperty("Plattform: ", this.state.systemInformation.platform + " (" + this.state.systemInformation.arch + ")")));
    };
    SystemInfo.prototype.render = function () {
        if (!this.state.isInitialized) {
            return false;
        }
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-row" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm12" },
                !this.state.systemInformation && (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h1", { className: "ms-font-xl ms-fontColor-themePrimary" }, "Keine System-Informationen gefunden")),
                this.state.systemInformation && (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-row" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm12 ms-lg6 ms-xl3", key: "sysinfo_" }, this.getValueFromSystemInfo()))))));
    };
    return SystemInfo;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! bluebird */ "./node_modules/bluebird/js/browser/bluebird.js")))

/***/ }),

/***/ "./src/projects/vacuumRoboter/components/pages/application.tsx":
/*!*********************************************************************!*\
  !*** ./src/projects/vacuumRoboter/components/pages/application.tsx ***!
  \*********************************************************************/
/*! exports provided: Application */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Application", function() { return Application; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Application = (function (_super) {
    __extends(Application, _super);
    function Application(props) {
        return _super.call(this, props) || this;
    }
    Application.prototype.componentDidMount = function () {
        document.title = "Vacuum Roboter Hauptseite";
    };
    Application.prototype.render = function () {
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h1", null,
            "Hello from Vacuum Roboter!",
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("br", null),
            "Your requested url is",
            " ",
            this.props.requestUrl));
    };
    return Application;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));



/***/ }),

/***/ "./src/projects/xiaomi/components/pages/gateways.tsx":
/*!***********************************************************!*\
  !*** ./src/projects/xiaomi/components/pages/gateways.tsx ***!
  \***********************************************************/
/*! exports provided: Application */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Promise) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Application", function() { return Application; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _global_components_simple_BaseLight__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../global/components/simple/BaseLight */ "./src/global/components/simple/BaseLight.tsx");
/* harmony import */ var timers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! timers */ "../../Users/florian/AppData/Roaming/npm/node_modules/webpack/node_modules/timers-browserify/main.js");
/* harmony import */ var timers__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(timers__WEBPACK_IMPORTED_MODULE_3__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var Application = (function (_super) {
    __extends(Application, _super);
    function Application(props) {
        var _this = _super.call(this, props) || this;
        _this.isMountedFinished = false;
        _this.state = {
            gateways: [],
            gatewayLights: [],
            isInitialized: false,
            intervalId: undefined
        };
        _this.loadDevices = _this.loadDevices.bind(_this);
        return _this;
    }
    Application.prototype.componentDidMount = function () {
        var _this = this;
        document.title = "Yeelight Hauptseite";
        console.log("Yeelight componentDidMount");
        this.loadDevices().then(function () {
            if (_this.isMountedFinished === true) {
                _this.setState({ isInitialized: true });
            }
        });
        var interval = Object(timers__WEBPACK_IMPORTED_MODULE_3__["setInterval"])(this.loadDevices, 30000);
        this.setState({ intervalId: interval["_id"] });
        this.isMountedFinished = true;
    };
    Application.prototype.componentWillUnmount = function () {
        clearInterval(this.state.intervalId);
        this.isMountedFinished = false;
    };
    Application.prototype.loadDevices = function () {
        var _this = this;
        if (!this.isMountedFinished) {
            Promise.resolve();
        }
        return axios__WEBPACK_IMPORTED_MODULE_1___default.a.get("/api/gateways")
            .then(function (results) {
            var gws = results.data["gateways"];
            var gwLights = gws.map(_this.mapGatewayToLightModel);
            _this.setState({ gateways: gws, gatewayLights: gwLights });
        })
            .catch(function (error) { });
    };
    Application.prototype.mapGatewayToLightModel = function (gwModel) {
        return {
            id: gwModel.id,
            ip: gwModel.ip,
            power: gwModel.power,
            brightness: gwModel.brightness,
            name: gwModel.name,
            colorTemperature: gwModel.illuminance,
            rgb: gwModel.rgb
        };
    };
    Application.prototype.render = function () {
        var _this = this;
        if (!this.state.isInitialized) {
            return false;
        }
        console.log("Yewelight render");
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-row" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm12" },
                (!this.state.gatewayLights || this.state.gatewayLights.length < 1) && react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h1", { className: "ms-font-xl ms-fontColor-themePrimary" }, "Keine Gateways gefunden"),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-row" }, this.state.gatewayLights &&
                    this.state.gatewayLights.length > 0 &&
                    this.state.gatewayLights.map(function (gw, index) {
                        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm12 ms-lg6 ms-xl3", key: "gwr_" + index },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_global_components_simple_BaseLight__WEBPACK_IMPORTED_MODULE_2__["BaseLight"], { lightInformation: gw, id: index, onBrightnessChanged: function (lightInformation, brightness) {
                                    axios__WEBPACK_IMPORTED_MODULE_1___default.a.post("/api/gateways/" + lightInformation.id + "/brightness/" + brightness).then(_this.loadDevices);
                                }, onColorChanged: function (lightInformation, color) {
                                    axios__WEBPACK_IMPORTED_MODULE_1___default.a.post("/api/gateways/" + lightInformation.id + "/color", { color: color }).then(_this.loadDevices);
                                }, onColorSchemaChanged: function (lightInformation, color, brightness) {
                                    axios__WEBPACK_IMPORTED_MODULE_1___default.a.post("/api/gateways/" + lightInformation.id + "/color", { color: color })
                                        .then(function () {
                                        return axios__WEBPACK_IMPORTED_MODULE_1___default.a.post("/api/gateways/" + lightInformation.id + "/brightness/" + brightness);
                                    })
                                        .then(_this.loadDevices);
                                }, onPowerChanged: function (lightInformation) {
                                    axios__WEBPACK_IMPORTED_MODULE_1___default.a.post("/api/gateways/" + lightInformation.id + "/power").then(_this.loadDevices);
                                } })));
                    })))));
    };
    return Application;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! bluebird */ "./node_modules/bluebird/js/browser/bluebird.js")))

/***/ }),

/***/ "./src/projects/xiaomi/components/pages/sensors.tsx":
/*!**********************************************************!*\
  !*** ./src/projects/xiaomi/components/pages/sensors.tsx ***!
  \**********************************************************/
/*! exports provided: Application */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Promise) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Application", function() { return Application; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _global_components_simple_BaseWeatherSensor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../global/components/simple/BaseWeatherSensor */ "./src/global/components/simple/BaseWeatherSensor.tsx");
/* harmony import */ var timers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! timers */ "../../Users/florian/AppData/Roaming/npm/node_modules/webpack/node_modules/timers-browserify/main.js");
/* harmony import */ var timers__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(timers__WEBPACK_IMPORTED_MODULE_3__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var Application = (function (_super) {
    __extends(Application, _super);
    function Application(props) {
        var _this = _super.call(this, props) || this;
        _this.isMountedFinished = false;
        _this.state = { sensors: [], isInitialized: false, intervalId: undefined };
        _this.loadDevices = _this.loadDevices.bind(_this);
        return _this;
    }
    Application.prototype.componentDidMount = function () {
        var _this = this;
        document.title = "Yeelight Hauptseite";
        console.log("Yeelight componentDidMount");
        this.loadDevices().then(function () {
            if (_this.isMountedFinished === true) {
                _this.setState({ isInitialized: true });
            }
        });
        var interval = Object(timers__WEBPACK_IMPORTED_MODULE_3__["setInterval"])(this.loadDevices, 30000);
        this.setState({ intervalId: interval["_id"] });
        this.isMountedFinished = true;
    };
    Application.prototype.componentWillUnmount = function () {
        clearInterval(this.state.intervalId);
        this.isMountedFinished = false;
    };
    Application.prototype.loadDevices = function () {
        var _this = this;
        if (!this.isMountedFinished) {
            Promise.resolve();
        }
        return axios__WEBPACK_IMPORTED_MODULE_1___default.a.get("/api/sensors").then(function (result) {
            _this.setState({ sensors: result.data["sensors"] });
        });
    };
    Application.prototype.render = function () {
        if (!this.state.isInitialized) {
            return false;
        }
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-row" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm12" },
                (!this.state.sensors || this.state.sensors.length < 1) && react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h1", { className: "ms-font-xl ms-fontColor-themePrimary" }, "Keine Sensoren gefunden"),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-row" }, this.state.sensors &&
                    this.state.sensors.length > 0 &&
                    this.state.sensors.map(function (sensor, index) {
                        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm12 ms-lg6 ms-xl3", key: "sensor_container_" + index },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_global_components_simple_BaseWeatherSensor__WEBPACK_IMPORTED_MODULE_2__["BaseWeatherSensor"], { id: index, sensorInformations: sensor })));
                    })))));
    };
    return Application;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! bluebird */ "./node_modules/bluebird/js/browser/bluebird.js")))

/***/ }),

/***/ "./src/projects/yeelight/components/pages/application.tsx":
/*!****************************************************************!*\
  !*** ./src/projects/yeelight/components/pages/application.tsx ***!
  \****************************************************************/
/*! exports provided: Application */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Promise) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Application", function() { return Application; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var timers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! timers */ "../../Users/florian/AppData/Roaming/npm/node_modules/webpack/node_modules/timers-browserify/main.js");
/* harmony import */ var timers__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(timers__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _simple_Yeelight__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../simple/Yeelight */ "./src/projects/yeelight/components/simple/Yeelight.tsx");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};





var Application = (function (_super) {
    __extends(Application, _super);
    function Application(props) {
        var _this = _super.call(this, props) || this;
        _this.isMountedFinished = false;
        _this.state = { lights: [], isInitialized: false, intervalId: undefined };
        _this.colorChangedOnLight = _this.colorChangedOnLight.bind(_this);
        _this.powerChangedOnLight = _this.powerChangedOnLight.bind(_this);
        _this.colorSchemaChangedOnLight = _this.colorSchemaChangedOnLight.bind(_this);
        _this.brightnessChangedOnLight = _this.brightnessChangedOnLight.bind(_this);
        _this.colorTemperatureChangedOnLight = _this.colorTemperatureChangedOnLight.bind(_this);
        _this.reloadLightInformations = _this.reloadLightInformations.bind(_this);
        _this.loadDevices = _this.loadDevices.bind(_this);
        return _this;
    }
    Application.prototype.componentDidMount = function () {
        var _this = this;
        document.title = "Yeelight Hauptseite";
        console.log("Yeelight componentDidMount");
        this.loadDevices().then(function () {
            if (_this.isMountedFinished === true) {
                _this.setState({ isInitialized: true });
            }
        });
        var interval = Object(timers__WEBPACK_IMPORTED_MODULE_2__["setInterval"])(this.loadDevices, 30000);
        this.setState({ intervalId: interval["_id"] });
        this.isMountedFinished = true;
    };
    Application.prototype.componentWillUnmount = function () {
        clearInterval(this.state.intervalId);
        this.isMountedFinished = false;
    };
    Application.prototype.loadDevices = function () {
        var _this = this;
        if (!this.isMountedFinished) {
            Promise.resolve();
        }
        return axios__WEBPACK_IMPORTED_MODULE_1___default.a.get("/api/lights/details")
            .then(function (results) {
            _this.setState({ lights: results.data["lights"] });
        })
            .catch(function (error) { });
    };
    Application.prototype.reloadLightInformations = function () {
        var _this = this;
        axios__WEBPACK_IMPORTED_MODULE_1___default.a.get("/api/lights/details").then(function (result) {
            _this.setState({ lights: result.data.lights });
            var newState = __assign({}, _this.state);
        });
    };
    Application.prototype.colorChangedOnLight = function (lightInformation, color) {
        var rgb = color.r * 65536 + color.g * 256 + color.b;
        axios__WEBPACK_IMPORTED_MODULE_1___default.a.post("/api/lights/" + lightInformation.id + "/color/" + rgb).then(this.reloadLightInformations);
    };
    Application.prototype.powerChangedOnLight = function (lightInformation) {
        axios__WEBPACK_IMPORTED_MODULE_1___default.a.post("/api/lights/" + lightInformation.id + "/power").then(this.reloadLightInformations);
    };
    Application.prototype.colorTemperatureChangedOnLight = function (lightInformation, colorTemperature) {
        axios__WEBPACK_IMPORTED_MODULE_1___default.a.post("/api/lights/" + lightInformation.id + "/temperature/" + colorTemperature).then(this.reloadLightInformations);
    };
    Application.prototype.colorSchemaChangedOnLight = function (lightInformation, color, brightness) {
        var rgb = color.r * 65536 + color.g * 256 + color.b;
        Promise.all([axios__WEBPACK_IMPORTED_MODULE_1___default.a.post("/api/lights/" + lightInformation.id + "/brightness/" + brightness), axios__WEBPACK_IMPORTED_MODULE_1___default.a.post("/api/lights/" + lightInformation.id + "/color/" + rgb)]).then(this.reloadLightInformations);
    };
    Application.prototype.brightnessChangedOnLight = function (lightInformation, brightness) {
        axios__WEBPACK_IMPORTED_MODULE_1___default.a.post("/api/lights/" + lightInformation.id + "/brightness/" + brightness).then(this.reloadLightInformations);
    };
    Application.prototype.render = function () {
        var _this = this;
        if (!this.state.isInitialized) {
            return false;
        }
        console.log("Yewelight render");
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-row" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm12" },
                (!this.state.lights || this.state.lights.length < 1) && react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h1", { className: "ms-font-xl ms-fontColor-themePrimary" }, "Keine Lampen gefunden"),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-row" }, this.state.lights &&
                    this.state.lights.length > 0 &&
                    this.state.lights.map(function (light, index) {
                        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm12 ms-lg6 ms-xl3", key: "light_container_" + index },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_simple_Yeelight__WEBPACK_IMPORTED_MODULE_3__["Yeelight"], { lightInformation: light, id: index + 22, onBrightnessChanged: _this.brightnessChangedOnLight, onColorChanged: _this.colorChangedOnLight, onColorSchemaChanged: _this.colorSchemaChangedOnLight, onPowerChanged: _this.powerChangedOnLight, onColorTemperatureChanged: _this.colorTemperatureChangedOnLight }))));
                    })))));
    };
    return Application;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! bluebird */ "./node_modules/bluebird/js/browser/bluebird.js")))

/***/ }),

/***/ "./src/projects/yeelight/components/simple/Yeelight.tsx":
/*!**************************************************************!*\
  !*** ./src/projects/yeelight/components/simple/Yeelight.tsx ***!
  \**************************************************************/
/*! exports provided: Yeelight */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Yeelight", function() { return Yeelight; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! office-ui-fabric-react */ "./node_modules/office-ui-fabric-react/lib/index.js");
/* harmony import */ var _global_components_simple_Panel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../global/components/simple/Panel */ "./src/global/components/simple/Panel.tsx");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};



var Yeelight = (function (_super) {
    __extends(Yeelight, _super);
    function Yeelight(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { gateways: [] };
        _this.colorSchemes = [
            {
                name: "Bitte auswählen...",
                color: { r: 0, g: 0, b: 0 },
                brightness: -1
            },
            {
                name: "Romantik",
                color: { r: 235, g: 104, b: 119 },
                brightness: 43
            },
            {
                name: "Sky",
                color: { r: 0, g: 255, b: 127 },
                brightness: 43
            }
        ];
        _this.brightnessChanged = _this.brightnessChanged.bind(_this);
        _this.togglePower = _this.togglePower.bind(_this);
        _this.setBrightness = _this.setBrightness.bind(_this);
        _this.colorSchemeChanged = _this.colorSchemeChanged.bind(_this);
        _this.colorTemperatureChanged = _this.colorTemperatureChanged.bind(_this);
        _this.onRedChanged = _this.onRedChanged.bind(_this);
        _this.onBlueChanged = _this.onBlueChanged.bind(_this);
        _this.onGreenChanged = _this.onGreenChanged.bind(_this);
        return _this;
    }
    Yeelight.prototype.colorSchemeChanged = function (event) {
        var schemeIndex = event.currentTarget.selectedIndex;
        var schema = this.colorSchemes[schemeIndex];
        if (!schema || schema.intensity === -1)
            return;
        this.props.onColorSchemaChanged(this.props.lightInformation, schema.color, schema.brightness);
    };
    Yeelight.prototype.togglePower = function () {
        this.props.onPowerChanged(this.props.lightInformation);
    };
    Yeelight.prototype.setBrightness = function (value) {
        this.props.onBrightnessChanged(this.props.lightInformation, value);
    };
    Yeelight.prototype.brightnessChanged = function (value) {
        var _this = this;
        if (this.sliderDelay) {
            clearTimeout(this.sliderDelay);
        }
        this.sliderDelay = setTimeout(function () {
            _this.setBrightness(value);
        }, 400);
    };
    Yeelight.prototype.colorTemperatureChanged = function (value) {
        var _this = this;
        if (this.sliderDelay) {
            clearTimeout(this.sliderDelay);
        }
        this.sliderDelay = setTimeout(function () {
            _this.props.onColorTemperatureChanged(_this.props.lightInformation, value);
        }, 400);
    };
    Yeelight.prototype.onColorChanged = function (color) {
        this.props.onColorChanged(this.props.lightInformation, color);
    };
    Yeelight.prototype.onRedChanged = function (value) {
        var _this = this;
        var color = __assign({}, this.props.lightInformation.rgb);
        color.r = value;
        if (this.sliderDelay) {
            clearTimeout(this.sliderDelay);
        }
        this.sliderDelay = setTimeout(function () {
            _this.onColorChanged(color);
        }, 400);
    };
    Yeelight.prototype.onBlueChanged = function (value) {
        var _this = this;
        var color = __assign({}, this.props.lightInformation.rgb);
        color.b = value;
        if (this.sliderDelay) {
            clearTimeout(this.sliderDelay);
        }
        this.sliderDelay = setTimeout(function () {
            _this.onColorChanged(color);
        }, 400);
    };
    Yeelight.prototype.onGreenChanged = function (value) {
        var _this = this;
        var color = __assign({}, this.props.lightInformation.rgb);
        color.g = value;
        if (this.sliderDelay) {
            clearTimeout(this.sliderDelay);
        }
        this.sliderDelay = setTimeout(function () {
            _this.onColorChanged(color);
        }, 400);
    };
    Yeelight.prototype.render = function () {
        console.log("Yeelight render");
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-row", key: "list_" + this.props.id },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm12 ms-lg12" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_global_components_simple_Panel__WEBPACK_IMPORTED_MODULE_2__["Panel"], { headerText: this.props.lightInformation.name, className: "custom-padding-bottom-10px" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-row" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm6" },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h1", { className: "ms-font-xl ms-fontColor-themePrimary" }, this.props.lightInformation.power ? "Licht anschalten" : "Licht ausschalten"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_1__["Toggle"], { key: "light_power_" + this.props.id, checked: this.props.lightInformation.power, onText: "On", offText: "Off", onChanged: this.togglePower })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm6" },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h1", { className: "ms-font-xl ms-fontColor-themePrimary" }, "Farbschema"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("select", { onChange: this.colorSchemeChanged, style: { padding: "10px", width: "100%" }, disabled: !this.props.lightInformation.power }, this.colorSchemes.map(function (schema, index) {
                                return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { key: "option_schema_" + index, value: index }, schema.name));
                            }))),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm12" },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h1", { className: "ms-font-xl ms-fontColor-themePrimary" }, "Leuchtst\u00E4rke"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_1__["Slider"], { min: 1, max: 100, step: 1, disabled: !this.props.lightInformation.power, value: this.props.lightInformation.brightness, showValue: true, onChange: this.brightnessChanged })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm12" },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h1", { className: "ms-font-xl ms-fontColor-themePrimary" }, "Farbtemperatur"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_1__["Slider"], { min: 1700, max: 6500, step: 1, disabled: !this.props.lightInformation.power, value: this.props.lightInformation.colorTemperature, showValue: true, onChange: this.colorTemperatureChanged })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "ms-Grid-col ms-sm12" },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h1", { className: "ms-font-xl ms-fontColor-themePrimary" }, "RGB Farben"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_1__["Slider"], { label: "Rot", min: 0, max: 255, step: 1, disabled: !this.props.lightInformation.power, value: this.props.lightInformation.rgb.r, showValue: true, onChange: this.onRedChanged }),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_1__["Slider"], { label: "Gr\u00FCn", min: 0, max: 255, step: 1, disabled: !this.props.lightInformation.power, value: this.props.lightInformation.rgb.g, showValue: true, onChange: this.onGreenChanged }),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](office_ui_fabric_react__WEBPACK_IMPORTED_MODULE_1__["Slider"], { label: "Blau", min: 0, max: 255, step: 1, disabled: !this.props.lightInformation.power, value: this.props.lightInformation.rgb.b, showValue: true, onChange: this.onBlueChanged })))))));
    };
    return Yeelight;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));



/***/ }),

/***/ 0:
/*!*******************************************************!*\
  !*** multi ./src/global/components/pages/initApp.tsx ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/global/components/pages/initApp.tsx */"./src/global/components/pages/initApp.tsx");


/***/ })

/******/ });
//# sourceMappingURL=application.js.map