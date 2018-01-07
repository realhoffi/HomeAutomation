webpackJsonp([0],{

/***/ 131:
/*!****************************************************!*\
  !*** ./src/global/components/simple/ButtonRow.tsx ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ 1);
var office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 14);
var ButtonRow = (function (_super) {
    __extends(ButtonRow, _super);
    function ButtonRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonRow.prototype.render = function () {
        return (React.createElement("div", { className: "ms-Grid-row" },
            React.createElement("div", { className: "ms-Grid-col ms-sm12 ms-textAlignRight" },
                React.createElement(office_ui_fabric_react_1.ActionButton, { "data-automation-id": "save", key: "save_btn_" + Date.now(), iconProps: { iconName: "Save" }, disabled: this.props.saveButtonProps.disabled, checked: this.props.saveButtonProps.checked, onClick: this.props.saveButtonProps.onClickFunc }, this.props.saveButtonProps.text),
                React.createElement(office_ui_fabric_react_1.ActionButton, { "data-automation-id": "cancel", key: "cancel_btn_" + Date.now(), iconProps: { iconName: "Cancel" }, disabled: this.props.cancelButtonProps.disabled, checked: this.props.cancelButtonProps.checked, onClick: this.props.cancelButtonProps.onClickFunc }, this.props.cancelButtonProps.text))));
    };
    return ButtonRow;
}(React.PureComponent));
exports.ButtonRow = ButtonRow;


/***/ }),

/***/ 132:
/*!*******************************!*\
  !*** ./src/helper/promise.ts ***!
  \*******************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise) {
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.promise_all_custom = promise_all_custom;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! bluebird */ 18)))

/***/ }),

/***/ 185:
/*!******************************************!*\
  !*** ./node_modules/int-to-rgb/index.js ***!
  \******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var errorMessage = 'Must provide an integer between 0 and 16777215';


module.exports = function(int) {
  if (typeof int !== 'number') throw new Error(errorMessage);
  if (Math.floor(int) !== int) throw new Error(errorMessage);
  if (int < 0 || int > 16777215) throw new Error(errorMessage);

  var red = int >> 16;
  var green = int - (red << 16) >> 8;
  var blue = int - (red << 16) - (green << 8);

  return {
    red: red,
    green: green,
    blue: blue
  }
}


/***/ }),

/***/ 234:
/*!****************************************************************!*\
  !*** ./src/projects/yeelight/components/pages/application.tsx ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise) {
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ 1);
var axios_1 = __webpack_require__(/*! axios */ 30);
var timers_1 = __webpack_require__(/*! timers */ 87);
var Yeelight_1 = __webpack_require__(/*! ../simple/Yeelight */ 433);
var react_1 = __webpack_require__(/*! react */ 1);
var intToRGB = __webpack_require__(/*! int-to-rgb */ 185);
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
        var interval = timers_1.setInterval(this.loadDevices, 30000);
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
        return axios_1.default.get("/api/lights/details")
            .then(function (results) {
            _this.setState({ lights: results.data["lights"] });
        })
            .catch(function (error) { });
    };
    Application.prototype.reloadLightInformations = function () {
        var _this = this;
        axios_1.default.get("/api/lights/details").then(function (result) {
            _this.setState({ lights: result.data.lights });
            var newState = __assign({}, _this.state);
        });
    };
    Application.prototype.colorChangedOnLight = function (lightInformation, color) {
        var rgb = color.r * 65536 + color.g * 256 + color.b;
        axios_1.default.post("/api/lights/" + lightInformation.id + "/color/" + rgb).then(this.reloadLightInformations);
    };
    Application.prototype.powerChangedOnLight = function (lightInformation) {
        axios_1.default.post("/api/lights/" + lightInformation.id + "/power").then(this.reloadLightInformations);
    };
    Application.prototype.colorTemperatureChangedOnLight = function (lightInformation, colorTemperature) {
        axios_1.default.post("/api/lights/" + lightInformation.id + "/temperature/" + colorTemperature).then(this.reloadLightInformations);
    };
    Application.prototype.colorSchemaChangedOnLight = function (lightInformation, color, brightness) {
        var rgb = color.r * 65536 + color.g * 256 + color.b;
        Promise.all([
            axios_1.default.post("/api/lights/" + lightInformation.id + "/brightness/" + brightness),
            axios_1.default.post("/api/lights/" + lightInformation.id + "/color/" + rgb)
        ]).then(this.reloadLightInformations);
    };
    Application.prototype.brightnessChangedOnLight = function (lightInformation, brightness) {
        axios_1.default.post("/api/lights/" + lightInformation.id + "/brightness/" + brightness).then(this.reloadLightInformations);
    };
    Application.prototype.render = function () {
        var _this = this;
        if (!this.state.isInitialized) {
            return false;
        }
        console.log("Yewelight render");
        return (React.createElement("div", { className: "ms-Grid-row" },
            React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                (!this.state.lights || this.state.lights.length < 1) && (React.createElement("h1", { className: "ms-font-xl ms-fontColor-themePrimary" }, "Keine Lampen gefunden")),
                React.createElement("div", { className: "ms-Grid-row" }, this.state.lights &&
                    this.state.lights.length > 0 &&
                    this.state.lights.map(function (light, index) {
                        return (React.createElement("div", { className: "ms-Grid-col ms-sm12 ms-lg6 ms-xl3", key: "light_container_" + index },
                            React.createElement(react_1.Fragment, null,
                                React.createElement(Yeelight_1.Yeelight, { lightInformation: light, id: index + 22, onBrightnessChanged: _this.brightnessChangedOnLight, onColorChanged: _this.colorChangedOnLight, onColorSchemaChanged: _this.colorSchemaChangedOnLight, onPowerChanged: _this.powerChangedOnLight, onColorTemperatureChanged: _this.colorTemperatureChangedOnLight }))));
                    })))));
    };
    return Application;
}(React.Component));
exports.Application = Application;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! bluebird */ 18)))

/***/ }),

/***/ 308:
/*!**********************************************************!*\
  !*** ./src/projects/xiaomi/components/pages/sensors.tsx ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise) {
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ 1);
var axios_1 = __webpack_require__(/*! axios */ 30);
var BaseWeatherSensor_1 = __webpack_require__(/*! ../../../../global/components/simple/BaseWeatherSensor */ 715);
var timers_1 = __webpack_require__(/*! timers */ 87);
var intToRGB = __webpack_require__(/*! int-to-rgb */ 185);
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
        var interval = timers_1.setInterval(this.loadDevices, 30000);
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
        return axios_1.default.get("/api/sensors").then(function (result) {
            _this.setState({ sensors: result.data["sensors"] });
        });
    };
    Application.prototype.render = function () {
        if (!this.state.isInitialized) {
            return false;
        }
        return (React.createElement("div", { className: "ms-Grid-row" },
            React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                (!this.state.sensors || this.state.sensors.length < 1) && (React.createElement("h1", { className: "ms-font-xl ms-fontColor-themePrimary" }, "Keine Sensoren gefunden")),
                React.createElement("div", { className: "ms-Grid-row" }, this.state.sensors &&
                    this.state.sensors.length > 0 &&
                    this.state.sensors.map(function (sensor, index) {
                        return (React.createElement("div", { className: "ms-Grid-col ms-sm12 ms-lg6 ms-xl3", key: "sensor_container_" + index },
                            React.createElement(BaseWeatherSensor_1.BaseWeatherSensor, { id: index, sensorInformations: sensor })));
                    })))));
    };
    return Application;
}(React.Component));
exports.Application = Application;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! bluebird */ 18)))

/***/ }),

/***/ 330:
/*!***********************************************************!*\
  !*** ./src/projects/xiaomi/components/pages/gateways.tsx ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise) {
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ 1);
var axios_1 = __webpack_require__(/*! axios */ 30);
var BaseLight_1 = __webpack_require__(/*! ../../../../global/components/simple/BaseLight */ 852);
var timers_1 = __webpack_require__(/*! timers */ 87);
var intToRGB = __webpack_require__(/*! int-to-rgb */ 185);
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
        var interval = timers_1.setInterval(this.loadDevices, 30000);
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
        return axios_1.default.get("/api/gateways")
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
        return (React.createElement("div", { className: "ms-Grid-row" },
            React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                (!this.state.gatewayLights ||
                    this.state.gatewayLights.length < 1) && (React.createElement("h1", { className: "ms-font-xl ms-fontColor-themePrimary" }, "Keine Gateways gefunden")),
                React.createElement("div", { className: "ms-Grid-row" }, this.state.gatewayLights &&
                    this.state.gatewayLights.length > 0 &&
                    this.state.gatewayLights.map(function (gw, index) {
                        return (React.createElement("div", { className: "ms-Grid-col ms-sm12 ms-lg6 ms-xl3", key: "gwr_" + index },
                            React.createElement(BaseLight_1.BaseLight, { lightInformation: gw, id: index, onBrightnessChanged: function (lightInformation, brightness) {
                                    axios_1.default.post("/api/gateways/" +
                                        lightInformation.id +
                                        "/brightness/" +
                                        brightness).then(_this.loadDevices);
                                }, onColorChanged: function (lightInformation, color) {
                                    axios_1.default.post("/api/gateways/" + lightInformation.id + "/color", { color: color }).then(_this.loadDevices);
                                }, onColorSchemaChanged: function (lightInformation, color, brightness) {
                                    axios_1.default.post("/api/gateways/" + lightInformation.id + "/color", { color: color })
                                        .then(function () {
                                        return axios_1.default.post("/api/gateways/" +
                                            lightInformation.id +
                                            "/brightness/" +
                                            brightness);
                                    })
                                        .then(_this.loadDevices);
                                }, onPowerChanged: function (lightInformation) {
                                    axios_1.default.post("/api/gateways/" + lightInformation.id + "/power").then(_this.loadDevices);
                                } })));
                    })))));
    };
    return Application;
}(React.Component));
exports.Application = Application;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! bluebird */ 18)))

/***/ }),

/***/ 331:
/*!*************************************************************!*\
  !*** ./src/projects/system/components/pages/systeminfo.tsx ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise) {
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ 1);
var office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 14);
var axios_1 = __webpack_require__(/*! axios */ 30);
var timers_1 = __webpack_require__(/*! timers */ 87);
var react_1 = __webpack_require__(/*! react */ 1);
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
        var interval = timers_1.setInterval(this.loadDevices, 10000);
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
        return axios_1.default.get("/api/system").then(function (result) {
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
        return (React.createElement("div", { className: "ms-Grid-row" },
            React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                React.createElement(office_ui_fabric_react_1.Label, { className: "ms-font-xl ms-fontColor-themePrimary" }, label),
                React.createElement("span", null, value))));
    };
    SystemInfo.prototype.getValueFromSystemInfo = function () {
        return (React.createElement(react_1.Fragment, null,
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
        return (React.createElement("div", { className: "ms-Grid-row" },
            React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                !this.state.systemInformation && (React.createElement("h1", { className: "ms-font-xl ms-fontColor-themePrimary" }, "Keine System-Informationen gefunden")),
                this.state.systemInformation && (React.createElement("div", { className: "ms-Grid-row" },
                    React.createElement("div", { className: "ms-Grid-col ms-sm12 ms-lg6 ms-xl3", key: "sysinfo_" }, this.getValueFromSystemInfo()))))));
    };
    return SystemInfo;
}(React.Component));
exports.SystemInfo = SystemInfo;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! bluebird */ 18)))

/***/ }),

/***/ 332:
/*!****************************!*\
  !*** ./src/enums/enums.ts ***!
  \****************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var PageType;
(function (PageType) {
    PageType[PageType["Display"] = 0] = "Display";
    PageType[PageType["Edit"] = 1] = "Edit";
    PageType[PageType["Add"] = 2] = "Add";
})(PageType = exports.PageType || (exports.PageType = {}));


/***/ }),

/***/ 333:
/*!******************************************************!*\
  !*** ./src/global/components/container/basePage.tsx ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ 1);
var office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 14);
var BasePage = (function (_super) {
    __extends(BasePage, _super);
    function BasePage(props) {
        return _super.call(this, props) || this;
    }
    BasePage.prototype.render = function () {
        console.log("render BasePage");
        var renderElement = null;
        var content = (React.createElement("div", { className: "ms-Grid" },
            this.props.Header && (React.createElement("div", { className: "ms-Grid-row" },
                React.createElement("div", { className: "ms-Grid-col ms-sm12" }, this.props.Header))),
            React.createElement("div", { className: "ms-Grid-row" },
                this.props.Navigation && [
                    React.createElement("div", { className: "ms-Grid-col ms-sm12 ms-md12 ms-lg3 ms-xl2", key: "navigation" }, this.props.Navigation),
                    React.createElement("div", { className: "ms-Grid-col ms-sm12 ms-md12 ms-lg9 ms-xl10", key: "content" }, this.props.Body)
                ],
                !this.props.Navigation && (React.createElement("div", { className: "ms-Grid-col ms-sm12" }, this.props.Body))),
            this.props.Footer && (React.createElement("div", { className: "ms-Grid-row" },
                React.createElement("div", { className: "ms-Grid-col ms-sm12" }, this.props.Footer)))));
        renderElement = this.props.IncludeFabricElement ? (React.createElement(office_ui_fabric_react_1.Fabric, null, content)) : (content);
        return renderElement;
    };
    return BasePage;
}(React.PureComponent));
exports.BasePage = BasePage;


/***/ }),

/***/ 334:
/*!**********************************************************!*\
  !*** ./src/global/components/simple/NumberTextField.tsx ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ 1);
var office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 14);
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
        return (React.createElement(office_ui_fabric_react_1.TextField, { value: v.toString(), placeholder: this.props.placeholder, type: "number", prefix: this.props.prefix, suffix: this.props.suffix, required: this.props.required, label: this.props.label, onGetErrorMessage: this.validateNumber, onChanged: this.valueChanged }));
    };
    return NumberTextField;
}(React.Component));
exports.NumberTextField = NumberTextField;


/***/ }),

/***/ 335:
/*!************************************************************!*\
  !*** ./src/projects/aldi/components/stateless/Filiale.tsx ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ 1);
var office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 14);
var NumberTextField_1 = __webpack_require__(/*! ../../../../global/components/simple/NumberTextField */ 334);
var Panel_1 = __webpack_require__(/*! ../../../../global/components/simple/Panel */ 61);
var date_1 = __webpack_require__(/*! ../../../../helper/date */ 78);
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
        return (React.createElement("div", { className: "ms-Grid-row", key: "filiale_" + this.props.id },
            React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                React.createElement(Panel_1.Panel, { headerText: this.props.title, headerControls: this.props.enableDeleteBtn ? (React.createElement(office_ui_fabric_react_1.ActionButton, { "data-info-title": "Filiale entfernen", "data-info-desc": "Löscht die Filiale", iconProps: { iconName: "Delete" }, onClick: this.deleteClicked })) : null },
                    React.createElement("div", { className: "ms-Grid-row" },
                        React.createElement("div", { className: "ms-Grid-col ms-sm12 ms-md5" },
                            React.createElement("div", null,
                                React.createElement(office_ui_fabric_react_1.Label, null, "Routenfahrdatum"),
                                React.createElement("select", { className: "custom-ddl-control", onChange: this.fahrDatumChanged, value: this.props.filiale.fahrdatum || undefined }, this.props.fahrdaten.map(function (fahrtDatum, index) {
                                    return (React.createElement("option", { key: "fahrt__" + index, value: fahrtDatum.getTime() }, date_1.getGermanDateString(fahrtDatum)));
                                })))),
                        React.createElement("div", { className: "ms-Grid-col ms-sm8 ms-md4" },
                            React.createElement(NumberTextField_1.NumberTextField, { required: true, placeholder: "Testnummer", label: "Testnummer", numberValue: this.props.filiale.testnummer, onChanged: this.testnummerChanged })),
                        React.createElement("div", { className: "ms-Grid-col ms-sm4 ms-md3" },
                            React.createElement(NumberTextField_1.NumberTextField, { required: true, placeholder: "Prüfkennziffer", label: "Pkz.", numberValue: this.props.filiale.pkz, onChanged: this.pkzChanged })),
                        React.createElement("div", { className: "ms-Grid-col ms-sm12 ms-lg5" },
                            React.createElement(office_ui_fabric_react_1.TextField, { required: true, placeholder: "Straße", label: "Straße", value: this.props.filiale.strasse, onChanged: this.strasseChanged })),
                        React.createElement("div", { className: "ms-Grid-col ms-sm4 ms-md3 ms-lg2" },
                            React.createElement(NumberTextField_1.NumberTextField, { required: true, placeholder: "Plz", label: "Plz", numberValue: this.props.filiale.plz, onChanged: this.plzChanged })),
                        React.createElement("div", { className: "ms-Grid-col ms-sm8 ms-md9 ms-lg5" },
                            React.createElement(office_ui_fabric_react_1.TextField, { required: true, placeholder: "Ort", label: "Ort", value: this.props.filiale.ort, onChanged: this.ortChanged })),
                        React.createElement("div", { className: "ms-Grid-col ms-sm6 ms-md6 ms-lg6" },
                            React.createElement(NumberTextField_1.NumberTextField, { placeholder: "Einnahmen", label: "Einnahmen", numberValue: this.props.filiale.einnahmen, onChanged: this.einnahmenChanged, suffix: " €" })),
                        React.createElement("div", { className: "ms-Grid-col ms-sm6 ms-md6 ms-lg6" },
                            React.createElement(NumberTextField_1.NumberTextField, { placeholder: "Ausgaben", label: "Ausgaben", numberValue: this.props.filiale.ausgaben, onChanged: this.ausgabenChanged, suffix: " €" })))))));
    };
    return Filiale;
}(React.Component));
exports.Filiale = Filiale;


/***/ }),

/***/ 336:
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/rng-browser.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection
var rng;

var crypto = global.crypto || global.msCrypto; // for IE 11
if (crypto && crypto.getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef
  rng = function whatwgRNG() {
    crypto.getRandomValues(rnds8);
    return rnds8;
  };
}

if (!rng) {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);
  rng = function() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}

module.exports = rng;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../../webpack/buildin/global.js */ 57)))

/***/ }),

/***/ 337:
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/bytesToUuid.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  return bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]];
}

module.exports = bytesToUuid;


/***/ }),

/***/ 338:
/*!***********************************************************!*\
  !*** ./src/projects/aldi/configuration/routenColumns.tsx ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ 1);
var date_1 = __webpack_require__(/*! ../../../helper/date */ 78);
exports.routeOverviewColumns = [
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
            return React.createElement("span", null, item.index);
        }
    },
    {
        key: "column2",
        name: "",
        fieldName: "ctx",
        minWidth: 30,
        maxWidth: 60,
        isResizable: true,
        isCollapsable: false,
        onRender: function (item) {
            return React.createElement("span", null, "...");
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
            return React.createElement("span", null, date_1.getGermanDateString(new Date(item.route_timestamp)));
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
            return React.createElement("span", null, date_1.getGermanDateTimeString(new Date(item.modified)));
        },
        isPadded: true
    },
    {
        key: "column4",
        name: "Erstellt am",
        fieldName: "created",
        minWidth: 100,
        maxWidth: 150,
        isResizable: true,
        isCollapsable: true,
        data: "string",
        onRender: function (item) {
            return React.createElement("span", null, date_1.getGermanDateTimeString(new Date(item.created)));
        },
        isPadded: true
    }
];
exports.filialOverviewColumns = [
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
            return React.createElement("span", null, item.index);
        }
    },
    {
        key: "column2",
        name: "",
        fieldName: "ctx",
        minWidth: 30,
        maxWidth: 60,
        isResizable: true,
        isCollapsable: false,
        onRender: function (item) {
            return React.createElement("span", null, "...");
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
            return React.createElement("span", null, item.strasse);
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
            return React.createElement("span", null, item.plz);
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
            return React.createElement("span", null, item.ort);
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
            return React.createElement("span", null, item.testnummer);
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
            return React.createElement("span", null, item.pkz);
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
            return React.createElement("span", null, date_1.getGermanDateTimeString(new Date(item.modified)));
        },
        isPadded: true
    },
    {
        key: "column4",
        name: "Erstellt am",
        fieldName: "created",
        minWidth: 100,
        maxWidth: 150,
        isResizable: true,
        isCollapsable: true,
        data: "string",
        onRender: function (item) {
            return React.createElement("span", null, date_1.getGermanDateTimeString(new Date(item.created)));
        },
        isPadded: true
    }
];


/***/ }),

/***/ 339:
/*!**************************************************!*\
  !*** ./src/global/components/simple/Routing.tsx ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ 1);
var react_router_dom_1 = __webpack_require__(/*! react-router-dom */ 84);
var RedirectWithStatus = (function (_super) {
    __extends(RedirectWithStatus, _super);
    function RedirectWithStatus() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RedirectWithStatus.prototype.render = function () {
        var _this = this;
        return (React.createElement(react_router_dom_1.Route, { render: function (_a) {
                var staticContext = _a.staticContext;
                if (staticContext) {
                    staticContext.status = _this.props.status;
                }
                return React.createElement(react_router_dom_1.Redirect, { from: _this.props.from, to: _this.props.to });
            } }));
    };
    return RedirectWithStatus;
}(React.Component));
exports.RedirectWithStatus = RedirectWithStatus;
var Status = (function (_super) {
    __extends(Status, _super);
    function Status() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Status.prototype.render = function () {
        var _this = this;
        return (React.createElement(react_router_dom_1.Route, { render: function (_a) {
                var staticContext = _a.staticContext;
                if (staticContext) {
                    staticContext.status = _this.props.code;
                }
                return _this.props.children;
            } }));
    };
    return Status;
}(React.Component));
exports.Status = Status;


/***/ }),

/***/ 375:
/*!*******************************************************!*\
  !*** multi ./src/global/components/pages/initApp.tsx ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/global/components/pages/initApp.tsx */376);


/***/ }),

/***/ 376:
/*!*************************************************!*\
  !*** ./src/global/components/pages/initApp.tsx ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ReactDOM = __webpack_require__(/*! react-dom */ 56);
var React = __webpack_require__(/*! react */ 1);
var globalApplication_1 = __webpack_require__(/*! ./globalApplication */ 391);
var react_router_dom_1 = __webpack_require__(/*! react-router-dom */ 84);
var icons_1 = __webpack_require__(/*! @uifabric/icons */ 340);
icons_1.initializeIcons();
window.onload = function () {
    ReactDOM.render(React.createElement(react_router_dom_1.HashRouter, null,
        React.createElement(globalApplication_1.GlobalApplication, null)), document.getElementById("reactRoot"));
};


/***/ }),

/***/ 391:
/*!***********************************************************!*\
  !*** ./src/global/components/pages/globalApplication.tsx ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ 1);
var react_router_dom_1 = __webpack_require__(/*! react-router-dom */ 84);
var application_1 = __webpack_require__(/*! ./application */ 413);
var application_2 = __webpack_require__(/*! ../../../projects/yeelight/components/pages/application */ 234);
var application_3 = __webpack_require__(/*! ../../../projects/vacuumRoboter/components/pages/application */ 853);
var application_4 = __webpack_require__(/*! ../../../projects/aldi/components/pages/application */ 854);
var sensors_1 = __webpack_require__(/*! ../../../projects/xiaomi/components/pages/sensors */ 308);
var gateways_1 = __webpack_require__(/*! ../../../projects/xiaomi/components/pages/gateways */ 330);
var NotFoundPage_1 = __webpack_require__(/*! ../../components/simple/NotFoundPage */ 870);
var Routing_1 = __webpack_require__(/*! ../simple/Routing */ 339);
var basePage_1 = __webpack_require__(/*! ../container/basePage */ 333);
var systeminfo_1 = __webpack_require__(/*! ../../../projects/system/components/pages/systeminfo */ 331);
var office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 14);
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
        return (React.createElement(basePage_1.BasePage, { IncludeFabricElement: true, Body: React.createElement(react_router_dom_1.Switch, null,
                React.createElement(Routing_1.RedirectWithStatus, { status: 302, from: "/courses", to: "/aldi" }),
                React.createElement(react_router_dom_1.Route, { exact: true, path: "/", component: application_1.Application, key: "r1" }),
                React.createElement(react_router_dom_1.Route, { path: "/system", component: systeminfo_1.SystemInfo, key: "r8" }),
                React.createElement(react_router_dom_1.Route, { path: "/light", component: application_2.Application, key: "r2" }),
                React.createElement(react_router_dom_1.Route, { path: "/aldi", component: application_4.Application, key: "r3" }),
                React.createElement(react_router_dom_1.Route, { path: "/vacuum", component: application_3.Application, key: "r4" }),
                React.createElement(react_router_dom_1.Route, { path: "/sensors", component: sensors_1.Application, key: "r6" }),
                React.createElement(react_router_dom_1.Route, { path: "/gateways", component: gateways_1.Application, key: "r7" }),
                React.createElement(react_router_dom_1.Route, { path: "*", component: NotFoundPage_1.NotFoundPage, key: "r5" })), Navigation: React.createElement("div", null,
                React.createElement(office_ui_fabric_react_1.Nav, { selectedKey: this.state.selectedNavKey, groups: [
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
}(React.Component));
exports.GlobalApplication = GlobalApplication;


/***/ }),

/***/ 413:
/*!*****************************************************!*\
  !*** ./src/global/components/pages/application.tsx ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ 1);
var application_1 = __webpack_require__(/*! ../../../projects/yeelight/components/pages/application */ 234);
var sensors_1 = __webpack_require__(/*! ../../../projects/xiaomi/components/pages/sensors */ 308);
var gateways_1 = __webpack_require__(/*! ../../../projects/xiaomi/components/pages/gateways */ 330);
var office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 14);
var PivotItem_1 = __webpack_require__(/*! office-ui-fabric-react/lib/components/Pivot/PivotItem */ 183);
var systeminfo_1 = __webpack_require__(/*! ../../../projects/system/components/pages/systeminfo */ 331);
var Application = (function (_super) {
    __extends(Application, _super);
    function Application(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            GatewayInformations: React.createElement(gateways_1.Application, null),
            SensorInformations: React.createElement(sensors_1.Application, null),
            YeelightInformations: React.createElement(application_1.Application, null),
            SystemInformations: React.createElement(systeminfo_1.SystemInfo, null)
        };
        return _this;
    }
    Application.prototype.componentDidMount = function () {
        console.log("componentDidMount Application");
    };
    Application.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(office_ui_fabric_react_1.Pivot, { linkSize: office_ui_fabric_react_1.PivotLinkSize.large },
                React.createElement(PivotItem_1.PivotItem, { linkText: "Sensoren", itemIcon: "CloudWeather" },
                    React.createElement("div", { style: { paddingTop: "15px" } }, this.state.SensorInformations)),
                React.createElement(PivotItem_1.PivotItem, { linkText: "Gateways", itemIcon: "Light" },
                    React.createElement("div", { style: { paddingTop: "15px" } }, this.state.GatewayInformations)),
                React.createElement(PivotItem_1.PivotItem, { linkText: "Yeelights", itemIcon: "Lightbulb" },
                    React.createElement("div", { style: { paddingTop: "15px" } }, this.state.YeelightInformations)))));
    };
    return Application;
}(React.PureComponent));
exports.Application = Application;


/***/ }),

/***/ 433:
/*!**************************************************************!*\
  !*** ./src/projects/yeelight/components/simple/Yeelight.tsx ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ 1);
var office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 14);
var Panel_1 = __webpack_require__(/*! ../../../../global/components/simple/Panel */ 61);
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
        return (React.createElement("div", { className: "ms-Grid-row", key: "list_" + this.props.id },
            React.createElement("div", { className: "ms-Grid-col ms-sm12 ms-lg12" },
                React.createElement(Panel_1.Panel, { headerText: this.props.lightInformation.name, className: "custom-padding-bottom-10px" },
                    React.createElement("div", { className: "ms-Grid-row" },
                        React.createElement("div", { className: "ms-Grid-col ms-sm6" },
                            React.createElement("h1", { className: "ms-font-xl ms-fontColor-themePrimary" }, this.props.lightInformation.power
                                ? "Licht anschalten"
                                : "Licht ausschalten"),
                            React.createElement(office_ui_fabric_react_1.Toggle, { key: "light_power_" + this.props.id, checked: this.props.lightInformation.power, onText: "On", offText: "Off", onChanged: this.togglePower })),
                        React.createElement("div", { className: "ms-Grid-col ms-sm6" },
                            React.createElement("h1", { className: "ms-font-xl ms-fontColor-themePrimary" }, "Farbschema"),
                            React.createElement("select", { onChange: this.colorSchemeChanged, style: { padding: "10px", width: "100%" }, disabled: !this.props.lightInformation.power }, this.colorSchemes.map(function (schema, index) {
                                return (React.createElement("option", { key: "option_schema_" + index, value: index }, schema.name));
                            }))),
                        React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                            React.createElement("h1", { className: "ms-font-xl ms-fontColor-themePrimary" }, "Leuchtst\u00E4rke"),
                            React.createElement(office_ui_fabric_react_1.Slider, { min: 1, max: 100, step: 1, disabled: !this.props.lightInformation.power, value: this.props.lightInformation.brightness, showValue: true, onChange: this.brightnessChanged })),
                        React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                            React.createElement("h1", { className: "ms-font-xl ms-fontColor-themePrimary" }, "Farbtemperatur"),
                            React.createElement(office_ui_fabric_react_1.Slider, { min: 1700, max: 6500, step: 1, disabled: !this.props.lightInformation.power, value: this.props.lightInformation.colorTemperature, showValue: true, onChange: this.colorTemperatureChanged })),
                        React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                            React.createElement("h1", { className: "ms-font-xl ms-fontColor-themePrimary" }, "RGB Farben"),
                            React.createElement(office_ui_fabric_react_1.Slider, { label: "Rot", min: 0, max: 255, step: 1, disabled: !this.props.lightInformation.power, value: this.props.lightInformation.rgb.r, showValue: true, onChange: this.onRedChanged }),
                            React.createElement(office_ui_fabric_react_1.Slider, { label: "Grün", min: 0, max: 255, step: 1, disabled: !this.props.lightInformation.power, value: this.props.lightInformation.rgb.g, showValue: true, onChange: this.onGreenChanged }),
                            React.createElement(office_ui_fabric_react_1.Slider, { label: "Blau", min: 0, max: 255, step: 1, disabled: !this.props.lightInformation.power, value: this.props.lightInformation.rgb.b, showValue: true, onChange: this.onBlueChanged })))))));
    };
    return Yeelight;
}(React.Component));
exports.Yeelight = Yeelight;


/***/ }),

/***/ 61:
/*!************************************************!*\
  !*** ./src/global/components/simple/Panel.tsx ***!
  \************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ 1);
var Button_1 = __webpack_require__(/*! office-ui-fabric-react/lib/Button */ 20);
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
        var c = this.props.className || "";
        return (React.createElement("div", { className: c },
            React.createElement("div", { className: "custom-border-settings ms-borderColor-neutralLighter" },
                React.createElement("div", { className: "ms-bgColor-neutralLighter custom-panel-header" },
                    React.createElement(Button_1.IconButton, { disabled: false, style: { width: "40px", height: "36px" }, checked: false, iconProps: {
                            iconName: this.props.canToggleContentHidden
                                ? this.state.isContentVisible ? "ChevronUp" : "ChevronDownMed"
                                : "blank"
                        }, title: "Emoji", ariaLabel: "Emoji", onClick: this.linkClicked }),
                    React.createElement("div", { onClick: this.linkClicked, style: {
                            cursor: "pointer",
                            width: this.props.headerControls ? "75%" : "100%"
                        } },
                        React.createElement("span", { className: "ms-font-xl ms-fontColor-themePrimary" }, this.props.headerText)),
                    this.props.headerControls && this.props.headerControls),
                this.state.isContentVisible && (React.createElement("div", { style: { padding: "10px", paddingTop: "15px" } }, this.props.children)))));
    };
    Panel.defaultProps = {
        headerText: "Kein Text",
        className: "",
        isCollapsed: false,
        canToggleContentHidden: true,
        headerControls: null
    };
    return Panel;
}(React.PureComponent));
exports.Panel = Panel;


/***/ }),

/***/ 715:
/*!************************************************************!*\
  !*** ./src/global/components/simple/BaseWeatherSensor.tsx ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ 1);
var office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 14);
var Panel_1 = __webpack_require__(/*! ../../../global/components/simple/Panel */ 61);
var react_1 = __webpack_require__(/*! react */ 1);
var BaseWeatherSensorChart_1 = __webpack_require__(/*! ./BaseWeatherSensorChart */ 716);
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
        return (React.createElement("div", { className: "ms-Grid-row", key: "sensor" + this.props.id },
            React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                React.createElement(Panel_1.Panel, { headerText: this.props.sensorInformations.name, className: "custom-padding-bottom-10px", headerControls: React.createElement("div", null,
                        React.createElement(office_ui_fabric_react_1.IconButton, { checked: false, iconProps: {
                                iconName: "info"
                            }, title: "Charts öffnen", ariaLabel: "Charts öffnen", onClick: this.sensorDetailsClicked })) },
                    !this.state.showDetails && (React.createElement(react_1.Fragment, null,
                        React.createElement("div", { className: "ms-Grid-row" },
                            React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                                React.createElement("h1", { className: "ms-font-su ms-fontColor-themePrimary" }, this.props.sensorInformations.temperature + " °C"))),
                        React.createElement("div", { className: "ms-Grid-row" },
                            React.createElement("div", { className: "ms-Grid-col ms-sm6" },
                                React.createElement("h1", { className: "ms-font-xl ms-fontColor-themePrimary" },
                                    this.props.sensorInformations.humidity,
                                    React.createElement("i", { className: "ms-Icon ms-Icon--Precipitation", "aria-hidden": "true" }))),
                            this.props.sensorInformations.hasPressure && (React.createElement("div", { className: "ms-Grid-col ms-sm6" },
                                React.createElement("h1", { className: "ms-font-xl ms-fontColor-themePrimary" }, this.props.sensorInformations.pressure)))))),
                    this.state.showDetails && (React.createElement(BaseWeatherSensorChart_1.BaseWeatherSensorChart, { sensorInformations: this.props.sensorInformations }))))));
    };
    return BaseWeatherSensor;
}(React.Component));
exports.BaseWeatherSensor = BaseWeatherSensor;


/***/ }),

/***/ 716:
/*!*****************************************************************!*\
  !*** ./src/global/components/simple/BaseWeatherSensorChart.tsx ***!
  \*****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise) {
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ 1);
var office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 14);
var axios_1 = __webpack_require__(/*! axios */ 30);
var react_chartjs_2_1 = __webpack_require__(/*! react-chartjs-2 */ 309);
var date_1 = __webpack_require__(/*! ../../../helper/date */ 78);
var options = [
    React.createElement("option", { value: "1", key: "k1" }, "Heute"),
    React.createElement("option", { value: "2", key: "k2" }, "Letzten 2 Tage"),
    React.createElement("option", { value: "3", key: "k3" }, "Letzte Woche"),
    React.createElement("option", { value: "4", key: "k4" }, "Alle")
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
        return axios_1.default.get("/api/sensors/" +
            this.props.sensorInformations.id +
            "/between/" +
            from +
            "/" +
            to);
    };
    BaseWeatherSensorChart.prototype.queryAllSensorData = function () {
        return axios_1.default.get("/api/sensors/" + this.props.sensorInformations.id + "/data");
    };
    BaseWeatherSensorChart.prototype.getDateTickRangeBySelection = function (selectedOption) {
        var from = -1;
        var to = -1;
        switch (selectedOption) {
            case "1":
                from = date_1.setDatePropertiesToZero(new Date()).getTime();
                to = Date.now();
                break;
            case "2":
                from = date_1.addDays(new Date(), -2, true).getTime();
                to = Date.now();
                break;
            case "3":
                from = date_1.addDays(new Date(), -7, true).getTime();
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
        if (this.state.rawSensorData &&
            this.state.rawSensorData.length >= tooltipItem[0].index) {
            var sensorTimeStamp = this.state.rawSensorData[tooltipItem[0].index];
            if (sensorTimeStamp) {
                var timestamp = sensorTimeStamp.timestamp;
                returnValue = date_1.getGermanDateTimeString(new Date(timestamp));
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
                    label = date_1.getGermanDateString(new Date(parseFloat(label.toString())));
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
            return (this.state.isError && (React.createElement("div", { className: "ms-Grid-row" },
                React.createElement("div", { className: "ms-Grid-col ms-sm12" }, "Es ist ein Fehler aufgetreten..."))));
        }
        var sensorDataContent = null;
        if (this.state.isLoadingSensorData) {
            sensorDataContent = (React.createElement(office_ui_fabric_react_1.Spinner, { size: office_ui_fabric_react_1.SpinnerSize.large, label: "Lade Sensor-Daten..." }));
        }
        else {
            if (!this.state.sensorData) {
                sensorDataContent = "Keine Daten vorhanden...";
            }
            else {
                sensorDataContent = (React.createElement(react_chartjs_2_1.Line, { data: this.state.sensorData, options: this.state.options }));
            }
        }
        return (React.createElement("div", { className: "ms-Grid-row" },
            React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                React.createElement("div", { className: "ms-Grid-row" },
                    React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                        React.createElement(office_ui_fabric_react_1.Label, null, "Zeitraum"),
                        React.createElement("select", { onChange: this.dateRangeSelectionChanged, value: this.state.selectedRange }, options))),
                React.createElement("div", { className: "ms-Grid-row" },
                    React.createElement("div", { className: "ms-Grid-col ms-sm12" }, sensorDataContent)))));
    };
    return BaseWeatherSensorChart;
}(React.Component));
exports.BaseWeatherSensorChart = BaseWeatherSensorChart;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! bluebird */ 18)))

/***/ }),

/***/ 78:
/*!****************************!*\
  !*** ./src/helper/date.ts ***!
  \****************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
exports.getGermanDateString = getGermanDateString;
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
exports.getGermanDateTimeString = getGermanDateTimeString;
function addDays(dateToAdd, daysToAdd, setHrsMinSecMiSecToZero) {
    if (setHrsMinSecMiSecToZero === void 0) { setHrsMinSecMiSecToZero = false; }
    var calculatedDate = new Date(dateToAdd);
    calculatedDate.setDate(calculatedDate.getDate() + daysToAdd);
    if (setHrsMinSecMiSecToZero) {
        calculatedDate = setDatePropertiesToZero(calculatedDate);
    }
    return calculatedDate;
}
exports.addDays = addDays;
function setDatePropertiesToZero(dateToSet) {
    var calculatedDate = new Date(dateToSet);
    calculatedDate.setMinutes(0);
    calculatedDate.setHours(0);
    calculatedDate.setSeconds(0);
    calculatedDate.setMilliseconds(0);
    return calculatedDate;
}
exports.setDatePropertiesToZero = setDatePropertiesToZero;


/***/ }),

/***/ 852:
/*!****************************************************!*\
  !*** ./src/global/components/simple/BaseLight.tsx ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ 1);
var office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 14);
var Panel_1 = __webpack_require__(/*! ../../../global/components/simple/Panel */ 61);
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
        return (React.createElement("div", { className: "ms-Grid-row", key: "list_" + this.props.id },
            React.createElement("div", { className: "ms-Grid-col ms-sm12 ms-lg12" },
                React.createElement(Panel_1.Panel, { headerText: this.props.lightInformation.name, className: "custom-padding-bottom-10px" },
                    React.createElement("div", { className: "ms-Grid-row" },
                        React.createElement("div", { className: "ms-Grid-col ms-sm6" },
                            React.createElement("h1", { className: "ms-font-xl ms-fontColor-themePrimary" }, this.props.lightInformation.power
                                ? "Licht anschalten"
                                : "Licht ausschalten"),
                            React.createElement(office_ui_fabric_react_1.Toggle, { key: "light_power_" + this.props.id, checked: this.props.lightInformation.power, onText: "On", offText: "Off", onChanged: this.togglePower })),
                        React.createElement("div", { className: "ms-Grid-col ms-sm6" },
                            React.createElement("h1", { className: "ms-font-xl ms-fontColor-themePrimary" }, "Farbschema"),
                            React.createElement("select", { onChange: this.colorSchemeChanged, style: { padding: "10px", width: "100%" }, disabled: !this.props.lightInformation.power }, this.colorSchemes.map(function (schema, index) {
                                return (React.createElement("option", { key: "option_schema_" + index, value: index }, schema.name));
                            }))),
                        React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                            React.createElement("h1", { className: "ms-font-xl ms-fontColor-themePrimary" }, "Leuchtst\u00E4rke"),
                            React.createElement(office_ui_fabric_react_1.Slider, { min: 1, max: 100, step: 1, disabled: !this.props.lightInformation.power, value: this.props.lightInformation.brightness, showValue: true, onChange: this.brightnessChanged })),
                        React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                            React.createElement("h1", { className: "ms-font-xl ms-fontColor-themePrimary" }, "RGB Farben"),
                            React.createElement(office_ui_fabric_react_1.Slider, { label: "Rot", min: 0, max: 255, step: 1, disabled: !this.props.lightInformation.power, value: this.props.lightInformation.rgb.r, showValue: true, onChange: this.onRedChanged }),
                            React.createElement(office_ui_fabric_react_1.Slider, { label: "Grün", min: 0, max: 255, step: 1, disabled: !this.props.lightInformation.power, value: this.props.lightInformation.rgb.g, showValue: true, onChange: this.onGreenChanged }),
                            React.createElement(office_ui_fabric_react_1.Slider, { label: "Blau", min: 0, max: 255, step: 1, disabled: !this.props.lightInformation.power, value: this.props.lightInformation.rgb.b, showValue: true, onChange: this.onBlueChanged })))))));
    };
    return BaseLight;
}(React.Component));
exports.BaseLight = BaseLight;


/***/ }),

/***/ 853:
/*!*********************************************************************!*\
  !*** ./src/projects/vacuumRoboter/components/pages/application.tsx ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ 1);
var Application = (function (_super) {
    __extends(Application, _super);
    function Application(props) {
        return _super.call(this, props) || this;
    }
    Application.prototype.componentDidMount = function () {
        document.title = "Vacuum Roboter Hauptseite";
    };
    Application.prototype.render = function () {
        return (React.createElement("h1", null,
            "Hello from Vacuum Roboter!",
            React.createElement("br", null),
            "Your requested url is",
            " ",
            this.props.requestUrl));
    };
    return Application;
}(React.Component));
exports.Application = Application;


/***/ }),

/***/ 854:
/*!************************************************************!*\
  !*** ./src/projects/aldi/components/pages/application.tsx ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise) {
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ 1);
var axios_1 = __webpack_require__(/*! axios */ 30);
var office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 14);
var manageRoute_1 = __webpack_require__(/*! ./manageRoute */ 855);
var enums_1 = __webpack_require__(/*! ../../../../enums/enums */ 332);
var react_1 = __webpack_require__(/*! react */ 1);
var ToolTip_1 = __webpack_require__(/*! ../../../../global/components/simple/ToolTip */ 862);
var Routenuebersicht_1 = __webpack_require__(/*! ../intelligent/Routenuebersicht */ 863);
var UploadRoutes_1 = __webpack_require__(/*! ../intelligent/UploadRoutes */ 864);
var UploadFilialen_1 = __webpack_require__(/*! ../intelligent/UploadFilialen */ 865);
var promise_1 = __webpack_require__(/*! ../../../../helper/promise */ 132);
var Filialuebersicht_1 = __webpack_require__(/*! ../intelligent/Filialuebersicht */ 866);
var Panel_1 = __webpack_require__(/*! ../../../../global/components/simple/Panel */ 61);
var Filiale_1 = __webpack_require__(/*! ../intelligent/Filiale */ 869);
var Application = (function (_super) {
    __extends(Application, _super);
    function Application(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            modalContent: undefined,
            showModal: false,
            isCalloutVisible: false,
            callOutContent: undefined,
            routen: [],
            selectedRoutes: [],
            filialen: [],
            selectedFilialen: []
        };
        _this.addRouteClick = _this.addRouteClick.bind(_this);
        _this.closeModal = _this.closeModal.bind(_this);
        _this.showCallOut = _this.showCallOut.bind(_this);
        _this.hideCallOut = _this.hideCallOut.bind(_this);
        _this.sortRoutesByPropertyName = _this.sortRoutesByPropertyName.bind(_this);
        _this.sortFilialenByPropertyName = _this.sortFilialenByPropertyName.bind(_this);
        _this.filialeSelectionChanged = _this.filialeSelectionChanged.bind(_this);
        _this.routeSelectionChanged = _this.routeSelectionChanged.bind(_this);
        _this.deleteSelectedRoutes = _this.deleteSelectedRoutes.bind(_this);
        _this.deleteSelectedFilialen = _this.deleteSelectedFilialen.bind(_this);
        _this.routeUploaded = _this.routeUploaded.bind(_this);
        _this.showUploadRoutesClick = _this.showUploadRoutesClick.bind(_this);
        _this.uploadFilialen = _this.uploadFilialen.bind(_this);
        _this.showUploadFilialenClick = _this.showUploadFilialenClick.bind(_this);
        _this.editRoute = _this.editRoute.bind(_this);
        _this.deleteRoutes = _this.deleteRoutes.bind(_this);
        _this.editFiliale = _this.editFiliale.bind(_this);
        _this.deleteFilialen = _this.deleteFilialen.bind(_this);
        _this.deleteSelectedItems = _this.deleteSelectedItems.bind(_this);
        _this.filialeSavedClick = _this.filialeSavedClick.bind(_this);
        return _this;
    }
    Application.prototype.getRouteViewModelByRouteModel = function (items) {
        return items.map(function (item, index) {
            return __assign({ filialen: undefined, index: index + 1 }, item);
        });
    };
    Application.prototype.getFilialViewModelByRouteModel = function (items) {
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
    Application.prototype.componentDidMount = function () {
        var _this = this;
        document.title = "Aldi Hauptseite";
        var promises = [this.reloadRouten()];
        promise_1.promise_all_custom(promises)
            .then(function (results) {
            if (!results) {
                alert("Fehler beim Laden der Elemente!");
                return;
            }
            _this.setState({
                routen: results[0].data || []
            });
            results.forEach(function (r, index) {
                if (r.isError) {
                    switch (index) {
                        case 1:
                            alert("Routen konnten nicht geladen werden");
                            break;
                        case 2:
                            alert("Filialen konnten nicht geladen werden");
                            break;
                    }
                }
            });
        })
            .catch(function (e) {
            console.log("Fehler beim Laden der Elemente!", JSON.stringify(e));
            alert("Fehler beim Laden der Elemente!");
        });
    };
    Application.prototype.routeSelectionChanged = function (routes) {
        this.setState({ selectedRoutes: routes });
    };
    Application.prototype.filialeSelectionChanged = function (filialen) {
        this.setState({ selectedFilialen: filialen });
    };
    Application.prototype.loadRouten = function () {
        return new Promise(function (resolve, reject) {
            axios_1.default.get("/api/routen")
                .then(function (results) {
                resolve(results.data);
            })
                .catch(function () {
                reject();
            });
        });
    };
    Application.prototype.loadFilialen = function () {
        return new Promise(function (resolve, reject) {
            axios_1.default.get("/api/filialen")
                .then(function (results) {
                resolve(results.data);
            })
                .catch(function () {
                reject();
            });
        });
    };
    Application.prototype.deleteFilialeElement = function (route) {
        return axios_1.default.delete("/api/filialen/" + route._id);
    };
    Application.prototype.deleteRouteElement = function (route) {
        return axios_1.default.delete("/api/routen/" + route._id);
    };
    Application.prototype.deleteSelectedItems = function () {
        var _this = this;
        if (this.state.selectedFilialen.length < 1 &&
            this.state.selectedRoutes.length < 1) {
            return;
        }
        promise_1.promise_all_custom([
            this.deleteSelectedRoutes(),
            this.deleteSelectedFilialen()
        ])
            .then(function () {
            _this.setState({ selectedFilialen: [], selectedRoutes: [] });
        })
            .catch(function () {
            alert("grober fehler deleteSelectedItems");
        });
    };
    Application.prototype.sortElement = function (a, b, propertyName, descending) {
        if (descending === void 0) { descending = false; }
        var r = 0;
        if (!a.hasOwnProperty(propertyName) || !b.hasOwnProperty(propertyName)) {
        }
        else if (a[propertyName] < b[propertyName]) {
            r = 1;
        }
        else if (a[propertyName] > b[propertyName]) {
            r = -1;
        }
        else {
            r = 0;
        }
        return descending ? r * -1 : r;
    };
    Application.prototype.sortRoutesByPropertyName = function (propertyName, descending) {
        var _this = this;
        return this.state.routen.sort(function (a, b) {
            return _this.sortElement(a, b, propertyName, descending);
        });
    };
    Application.prototype.sortFilialenByPropertyName = function (propertyName, descending) {
        var _this = this;
        return this.state.filialen.sort(function (a, b) {
            return _this.sortElement(a, b, propertyName, descending);
        });
    };
    Application.prototype.showUploadFilialenClick = function () {
        this.setState({
            showModal: true,
            modalContent: (React.createElement(UploadFilialen_1.UploadFilialen, { uploadFinished: this.uploadFilialen, cancelBtnClick: this.closeModal, routes: this.state.routen }))
        });
    };
    Application.prototype.reloadFilialen = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.loadFilialen()
                .then(function (data) {
                var items = _this.getFilialViewModelByRouteModel(data);
                resolve(items);
            })
                .catch(function () {
                alert("Fehler beim Laden der Filialen");
            });
        });
    };
    Application.prototype.reloadRouten = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.loadRouten()
                .then(function (data) {
                var items = _this.getRouteViewModelByRouteModel(data);
                resolve(items);
            })
                .catch(function () {
                alert("Fehler beim Laden der Filialen");
            });
        });
    };
    Application.prototype.uploadFilialen = function () {
        var _this = this;
        this.reloadFilialen()
            .then(function (data) {
            _this.setState({ filialen: data }, function () {
                _this.closeModal();
            });
        })
            .catch(function () {
            alert("Fehler beim Laden der Filialen");
        });
    };
    Application.prototype.deleteSelectedRoutes = function () {
        return this.deleteRoutes(this.state.selectedRoutes);
    };
    Application.prototype.deleteSelectedFilialen = function () {
        return this.deleteFilialen(this.state.selectedFilialen);
    };
    Application.prototype.showUploadRoutesClick = function () {
        this.setState({
            showModal: true,
            modalContent: (React.createElement(UploadRoutes_1.UploadRoutes, { uploadClick: this.routeUploaded, cancelClick: this.closeModal }))
        });
    };
    Application.prototype.routeUploaded = function (routes) {
        var _this = this;
        this.reloadRouten()
            .then(function (data) {
            _this.setState({ routen: data }, function () {
                _this.closeModal();
            });
        })
            .catch(function () {
            alert("Fehler beim Laden der Routen");
        });
    };
    Application.prototype.addRouteClick = function () {
        this.setState({
            showModal: true,
            modalContent: (React.createElement(manageRoute_1.ManageRoute, { onExitPage: this.closeModal, pageType: enums_1.PageType.Add }))
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
        var title = this.targetCallOutElement.hasAttribute("data-info-title")
            ? this.targetCallOutElement.getAttribute("data-info-title")
            : "";
        var description = this.targetCallOutElement.hasAttribute("data-info-desc")
            ? this.targetCallOutElement.getAttribute("data-info-desc")
            : "";
        if (!title && !description) {
            return;
        }
        this.setState({
            isCalloutVisible: true,
            callOutContent: React.createElement(ToolTip_1.ToolTip, { Title: title, Description: description })
        });
        return false;
    };
    Application.prototype.hideCallOut = function () {
        console.log("MouseOut");
        this.targetCallOutElement = null;
        this.setState({ isCalloutVisible: false, callOutContent: undefined });
        return false;
    };
    Application.prototype.deleteFilialen = function (filialElements) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var promises = [];
            filialElements.forEach(function (filiale) {
                promises.push(_this.deleteFilialeElement(filiale));
            });
            promise_1.promise_all_custom(promises)
                .then(function () {
                return _this.reloadFilialen();
            })
                .then(function (data) {
                _this.setState({ filialen: data }, function () {
                    resolve();
                });
            })
                .catch(function () {
                alert("Grober Fehler!");
                reject();
            });
        });
    };
    Application.prototype.deleteRoutes = function (routeElements) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var promises = [];
            routeElements.forEach(function (routeElement) {
                promises.push(_this.deleteRouteElement(routeElement));
            });
            promise_1.promise_all_custom(promises)
                .then(function () {
                return _this.reloadRouten();
            })
                .then(function (data) {
                _this.setState({ routen: data }, function () {
                    resolve();
                });
            })
                .catch(function () {
                alert("Grober Fehler!");
                reject();
            });
        });
    };
    Application.prototype.filialeSavedClick = function () {
        var _this = this;
        this.reloadFilialen().then(function (r) {
            var newState = __assign({}, _this.state);
            _this.closeModal(newState);
            newState.filialen = r;
            _this.setState(newState);
            return null;
        });
        return null;
    };
    Application.prototype.editRoute = function (routeElement) { };
    Application.prototype.editFiliale = function (filialElement) {
        this.setState({
            showModal: true,
            modalContent: (React.createElement(Filiale_1.Filiale, { cancel_clicked: this.closeModal, pageType: enums_1.PageType.Edit, filialeId: filialElement._id, headerText: "Filiale bearbeiten", ok_clicked: this.filialeSavedClick }))
        });
        this.hideCallOut();
    };
    Application.prototype.render = function () {
        console.log("render application");
        if (this.state.showModal && !!this.state.modalContent) {
            return (React.createElement("div", { className: "ms-Grid-row" },
                React.createElement("div", { className: "ms-Grid-col ms-sm12" }, this.state.modalContent)));
        }
        return (React.createElement(react_1.Fragment, null,
            React.createElement("div", { className: "ms-Grid-row" },
                React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                    React.createElement(office_ui_fabric_react_1.CommandBar, { isSearchBoxVisible: true, items: [
                            {
                                key: "newItem",
                                name: "New",
                                icon: "Add",
                                items: [
                                    {
                                        key: "newroute",
                                        name: "Route",
                                        icon: "Mail",
                                        onClick: this.addRouteClick
                                    },
                                    {
                                        key: "newfiliale",
                                        name: "Neue Filiale",
                                        icon: "Calendar"
                                    }
                                ]
                            },
                            {
                                key: "import",
                                name: "Import",
                                icon: "import",
                                items: [
                                    {
                                        key: "uploadroutes",
                                        name: "Routen",
                                        icon: "Mail",
                                        onClick: this.showUploadRoutesClick
                                    },
                                    {
                                        key: "uploadsfilalen",
                                        name: "Filialen",
                                        icon: "Calendar",
                                        onClick: this.showUploadFilialenClick
                                    }
                                ]
                            },
                            {
                                key: "delete",
                                name: "Löschen",
                                icon: "delete",
                                onClick: this.deleteSelectedItems
                            }
                        ] }))),
            React.createElement("div", { className: "ms-Grid-row" },
                React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                    React.createElement(Panel_1.Panel, { headerText: "Routenübersicht", className: "custom-padding-bottom-10px custom-padding-top-10px" },
                        React.createElement(Routenuebersicht_1.Routenuebersicht, { items: this.state.routen, sortByPropertyName: this.sortRoutesByPropertyName, onDeleteRouteClicked: this.deleteRoutes, onEditRouteClick: this.editRoute, selectionChanged: this.routeSelectionChanged })))),
            React.createElement("div", { className: "ms-Grid-row" },
                React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                    React.createElement(Panel_1.Panel, { headerText: "Filialübersicht", className: "custom-padding-bottom-10px" },
                        React.createElement(Filialuebersicht_1.Filialuebersicht, { onEditFilialeClick: this.editFiliale, commandbarItems: [
                                {
                                    key: "newItem",
                                    name: "New",
                                    icon: "Add",
                                    disabled: true
                                },
                                {
                                    key: "import",
                                    name: "Import",
                                    icon: "import",
                                    onClick: this.showUploadFilialenClick
                                }
                            ] }))))));
    };
    return Application;
}(React.Component));
exports.Application = Application;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! bluebird */ 18)))

/***/ }),

/***/ 855:
/*!************************************************************!*\
  !*** ./src/projects/aldi/components/pages/manageRoute.tsx ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise) {
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ 1);
var office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 14);
var enums_1 = __webpack_require__(/*! ../../../../enums/enums */ 332);
var basePage_1 = __webpack_require__(/*! ../../../../global/components/container/basePage */ 333);
var ButtonRow_1 = __webpack_require__(/*! ../../../../global/components/simple/ButtonRow */ 131);
var Panel_1 = __webpack_require__(/*! ../../../../global/components/simple/Panel */ 61);
var date_1 = __webpack_require__(/*! ../../../../helper/date */ 78);
var Link_1 = __webpack_require__(/*! ../stateless/Link */ 856);
var Ausgabe_1 = __webpack_require__(/*! ../stateless/Ausgabe */ 857);
var Filiale_1 = __webpack_require__(/*! ../stateless/Filiale */ 335);
var Routenfahrt_1 = __webpack_require__(/*! ../stateless/Routenfahrt */ 858);
var uuid_1 = __webpack_require__(/*! uuid */ 859);
var axios_1 = __webpack_require__(/*! axios */ 30);
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
            case enums_1.PageType.Display:
                docTitle = "Route anzeigen";
                break;
            case enums_1.PageType.Edit:
                docTitle = "Route bearbeiten";
                break;
            case enums_1.PageType.Add:
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
                promises.push(axios_1.default.post("/api/routen", { route: route }));
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
                promises.push(axios_1.default.post("/api/filialen", { filiale: filiale }));
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
            return React.createElement("option", { value: "" }, "Bitte Fahrdaten anlegen");
        }
        return this.state.routenfahrten.map(function (fahrt, index) {
            return (React.createElement("option", { value: index, key: "fahrt_opt_" + index }, date_1.getGermanDateString(fahrt)));
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
            fahrdatum: this.state.routenfahrten.length > 0
                ? this.state.routenfahrten[0].getTime()
                : date_1.setDatePropertiesToZero(new Date()).getTime()
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
            id: uuid_1.v4()
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
            id: uuid_1.v4()
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
        var fahrten = this.state.routenfahrten.concat([
            date_1.setDatePropertiesToZero(new Date())
        ]);
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
        return (React.createElement(basePage_1.BasePage, { IncludeFabricElement: false, Body: React.createElement("div", { className: "ms-Grid" },
                React.createElement("div", { className: "ms-Grid-row" },
                    React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                        React.createElement(Panel_1.Panel, { headerText: "Routenlinks", className: "custom-padding-bottom-10px", headerControls: React.createElement(office_ui_fabric_react_1.ActionButton, { "data-automation-id": "Add Link", iconProps: { iconName: "Add" }, onClick: this.addLink }) }, this.state.links.map(function (link, index) {
                            return (React.createElement(Link_1.Link, { key: "link_" + index, linkId: index.toString(), linkModel: link, title: "Link " + (index + 1), onDeleteClick: _this.deleteLink, onLinkHrefChanged: _this.linkChanged }));
                        })))),
                React.createElement("div", { className: "ms-Grid-row" },
                    React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                        React.createElement(Panel_1.Panel, { headerText: "Globale Ausgaben", className: "custom-padding-bottom-10px", headerControls: React.createElement(office_ui_fabric_react_1.ActionButton, { "data-automation-id": "Add Ausgabe", iconProps: { iconName: "Add" }, onClick: this.addAusgabe }) },
                            (!this.state.ausgaben || this.state.ausgaben.length < 1) && (React.createElement("div", { className: "ms-font-xl ms-fontColor-themePrimary" }, "Es wurden bisher keine globalen Ausgaben erfasst")),
                            this.state.ausgaben.map(function (ausgabe, index) {
                                return (React.createElement(Ausgabe_1.Ausgabe, { key: "ausgabe_" + index, ausgabeId: index.toString(), onDeleteClick: _this.deleteAusgabe, title: "Ausgabe " + (index + 1), ausgabeModel: ausgabe, onDescriptionChanged: _this.ausgabeDescriptionChanged, onValueChanged: _this.ausgabeValueChanged }));
                            })))),
                React.createElement("div", { className: "ms-Grid-row" },
                    React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                        React.createElement(Panel_1.Panel, { headerText: "Routenfahrdaten verwalten", className: "custom-padding-bottom-10px", headerControls: React.createElement(office_ui_fabric_react_1.ActionButton, { "data-automation-id": "Add Routenfahrt", iconProps: { iconName: "Add" }, onClick: this.addRoutenfahrt }) },
                            (!this.state.routenfahrten ||
                                this.state.routenfahrten.length < 1) && (React.createElement("div", { className: "ms-font-xl ms-fontColor-themePrimary" }, "Es wurden bisher keine Routenfahrdaten erfasst")),
                            this.state.routenfahrten.map(function (fahrt, index) {
                                return (React.createElement(Routenfahrt_1.Routenfahrt, { key: "routnefahrt_" + index, onDateChanged: _this.changeRouteDate, onDeleteClick: _this.deleteRoutenfahrt, routenfahrtId: index.toString(), title: "Routenfahrt " + (index + 1), value: fahrt }));
                            })))),
                React.createElement("div", { className: "ms-Grid-row" },
                    React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                        React.createElement(Panel_1.Panel, { headerText: "Fahrten verwalten", className: "custom-padding-bottom-10px", headerControls: React.createElement(office_ui_fabric_react_1.ActionButton, { "data-automation-id": "Add Ausgabe", iconProps: { iconName: "Add" }, onClick: this.addFiliale }) },
                            (!this.state.filialen || this.state.filialen.length < 1) && (React.createElement("div", { className: "ms-font-xl ms-fontColor-themePrimary" }, "Es wurden bisher keine Filialen erfasst")),
                            this.state.filialen.map(function (filiale, index) {
                                return (React.createElement(Filiale_1.Filiale, { key: "route_" + index, id: index.toString(), title: "Fahrt " + (index + 1), filiale: filiale, fahrdaten: _this.state.routenfahrten, onDeleteClick: _this.deleteFiliale, onAusgabenChanged: _this.ausgabenChanged, onEinnahmenChanged: _this.einnahmenChanged, onFahrdatumChanged: _this.fahrdatumChanged, onOrtChanged: _this.ortChanged, onPkzChanged: _this.pkzChanged, onPlzChanged: _this.plzChanged, onStrasseChanged: _this.strasseChanged, onTestnummerChanged: _this.testnummerChanged, enableDeleteBtn: true }));
                            })))),
                React.createElement("div", { className: "ms-Grid-row" },
                    React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                        React.createElement(ButtonRow_1.ButtonRow, { saveButtonProps: {
                                checked: false,
                                disabled: false,
                                text: "Speichern",
                                onClickFunc: this.saveClick
                            }, cancelButtonProps: {
                                checked: true,
                                disabled: false,
                                text: "Abbrechen",
                                onClickFunc: this.cancelClick
                            } })))), Header: React.createElement("div", { className: "ms-font-xxl ms-textAlignCenter" }, "Fahrten verwalten") }));
    };
    return ManageRoute;
}(React.Component));
exports.ManageRoute = ManageRoute;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! bluebird */ 18)))

/***/ }),

/***/ 856:
/*!*********************************************************!*\
  !*** ./src/projects/aldi/components/stateless/Link.tsx ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ 1);
var office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 14);
var defaultOption = React.createElement("option", { key: "-1" }, "Bitte einen Wert angeben");
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
        return (React.createElement("div", { className: "ms-Grid-row", key: "link_comp_" + this.props.linkId },
            React.createElement("div", { className: "ms-Grid-col ms-sm2 ms-lg1" },
                React.createElement(office_ui_fabric_react_1.Label, null,
                    React.createElement(office_ui_fabric_react_1.Link, { href: this.props.linkModel.link, disabled: !this.props.linkModel.link, target: "_blank" }, this.props.title))),
            React.createElement("div", { className: "ms-Grid-col ms-sm8 ms-lg-10" },
                React.createElement(office_ui_fabric_react_1.TextField, { placeholder: "Link eingeben", value: this.props.linkModel.link, onChanged: this.onLinkHrefChanged })),
            React.createElement("div", { className: "ms-Grid-col ms-sm2 ms-lg1" },
                React.createElement(office_ui_fabric_react_1.ActionButton, { "data-info-title": "Link entfernen", "data-info-desc": "Löscht den Link", iconProps: {
                        iconName: "Delete",
                        className: "img-font-size-large"
                    }, onClick: this.deleteLinkClicked }))));
    };
    return Link;
}(React.PureComponent));
exports.Link = Link;


/***/ }),

/***/ 857:
/*!************************************************************!*\
  !*** ./src/projects/aldi/components/stateless/Ausgabe.tsx ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ 1);
var office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 14);
var NumberTextField_1 = __webpack_require__(/*! ../../../../global/components/simple/NumberTextField */ 334);
var Panel_1 = __webpack_require__(/*! ../../../../global/components/simple/Panel */ 61);
var defaultOption = React.createElement("option", { key: "-1" }, "Bitte einen Wert angeben");
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
        return (React.createElement(Panel_1.Panel, { key: "ausgabe_" + this.props.ausgabeId, headerText: this.props.title, className: "custom-padding-bottom-10px", headerControls: React.createElement(office_ui_fabric_react_1.ActionButton, { "data-info-title": this.props.title + " löschen", "data-info-desc": this.props.title + " löschen", iconProps: {
                    iconName: "Delete",
                    className: "img-font-size-large"
                }, onClick: this.deleteClicked }) }, React.createElement("div", { className: "ms-Grid-row" },
            React.createElement("div", { className: "ms-Grid-col ms-sm12 ms-lg6" },
                React.createElement(office_ui_fabric_react_1.TextField, { placeholder: "Beschreibung der Ausgabe (z.B. Tanken)", required: true, label: "Beschreibung der Ausgabe", value: this.props.ausgabeModel.description, onChanged: this.onDescriptionChanged })),
            React.createElement("div", { className: "ms-Grid-col ms-sm12 ms-lg6" },
                React.createElement(NumberTextField_1.NumberTextField, { placeholder: "Ausgaben in Euro", label: "Wert der Ausgabe", required: true, numberValue: this.props.ausgabeModel.value, suffix: "Euro", onChanged: this.onValueChanged })))));
    };
    return Ausgabe;
}(React.PureComponent));
exports.Ausgabe = Ausgabe;


/***/ }),

/***/ 858:
/*!****************************************************************!*\
  !*** ./src/projects/aldi/components/stateless/Routenfahrt.tsx ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ 1);
var office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 14);
var date_1 = __webpack_require__(/*! ../../../../helper/date */ 78);
var defaultOption = React.createElement("option", { key: "-1" }, "Bitte einen Wert angeben");
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
        return (React.createElement("div", { className: "ms-Grid-row", key: "route_" + this.props.routenfahrtId },
            React.createElement("div", { className: "ms-Grid-col ms-sm2 ms-md1 ms-lg1" },
                React.createElement(office_ui_fabric_react_1.Label, { className: "ms-fontSize-l ms-textAlignCenter" }, this.props.title)),
            React.createElement("div", { className: "ms-Grid-col ms-sm8 ms-md8 ms-lg6" },
                React.createElement(office_ui_fabric_react_1.DatePicker, { placeholder: "Bitte Routenfahrdatum auswählen", showWeekNumbers: true, showMonthPickerAsOverlay: true, allowTextInput: false, formatDate: date_1.getGermanDateString, firstDayOfWeek: 1, key: "fahrt" + this.props.routenfahrtId, value: this.props.value, onSelectDate: this.dateChanged })),
            React.createElement("div", { className: "ms-Grid-col ms-sm2 ms-md2 ms-lg1" },
                React.createElement(office_ui_fabric_react_1.ActionButton, { "data-info-title": "Fahrdatum entfernen", "data-info-desc": "Löscht das Fahrdatum", iconProps: {
                        iconName: "Delete",
                        className: "img-font-size-large"
                    }, onClick: this.deleteRoutenfahrtClicked }))));
    };
    return Routenfahrt;
}(React.PureComponent));
exports.Routenfahrt = Routenfahrt;


/***/ }),

/***/ 859:
/*!************************************!*\
  !*** ./node_modules/uuid/index.js ***!
  \************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var v1 = __webpack_require__(/*! ./v1 */ 860);
var v4 = __webpack_require__(/*! ./v4 */ 861);

var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;

module.exports = uuid;


/***/ }),

/***/ 860:
/*!*********************************!*\
  !*** ./node_modules/uuid/v1.js ***!
  \*********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(/*! ./lib/rng */ 336);
var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ 337);

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

// random #'s we need to init node and clockseq
var _seedBytes = rng();

// Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
var _nodeId = [
  _seedBytes[0] | 0x01,
  _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
];

// Per 4.2.2, randomize (14 bit) clockseq
var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

// Previous uuid creation time
var _lastMSecs = 0, _lastNSecs = 0;

// See https://github.com/broofa/node-uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};

  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  var node = options.node || _nodeId;
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : bytesToUuid(b);
}

module.exports = v1;


/***/ }),

/***/ 861:
/*!*********************************!*\
  !*** ./node_modules/uuid/v4.js ***!
  \*********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(/*! ./lib/rng */ 336);
var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ 337);

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options == 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;


/***/ }),

/***/ 862:
/*!**************************************************!*\
  !*** ./src/global/components/simple/ToolTip.tsx ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ 1);
var ToolTip = (function (_super) {
    __extends(ToolTip, _super);
    function ToolTip() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToolTip.prototype.render = function () {
        return (React.createElement("div", { style: { minWidth: "150px" } },
            React.createElement("div", { className: "ms-CalloutExample-header", style: { padding: "18px 24px 12px" } },
                React.createElement("span", { className: "ms-fontColor-themePrimary ms-fontWeight-semibold ms-font-l ms-fontSize-l" }, this.props.Title)),
            React.createElement("div", { className: "ms-CalloutExample-inner", style: { height: "100%", padding: "0 24px 20px" } },
                React.createElement("div", { className: "ms-font-l ms-fontSize-m" },
                    React.createElement("p", { className: "ms-CalloutExample-subText" }, this.props.Description)))));
    };
    return ToolTip;
}(React.PureComponent));
exports.ToolTip = ToolTip;


/***/ }),

/***/ 863:
/*!***********************************************************************!*\
  !*** ./src/projects/aldi/components/intelligent/Routenuebersicht.tsx ***!
  \***********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ 1);
var office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 14);
var routenColumns_1 = __webpack_require__(/*! ../../configuration/routenColumns */ 338);
var react_1 = __webpack_require__(/*! react */ 1);
var Routenuebersicht = (function (_super) {
    __extends(Routenuebersicht, _super);
    function Routenuebersicht(props) {
        var _this = _super.call(this, props) || this;
        _this.selectionHasChanged = _this.selectionHasChanged.bind(_this);
        _this.selectionHasChanged = _this.selectionHasChanged.bind(_this);
        _this.onColumnClick = _this.onColumnClick.bind(_this);
        _this.renderContext = _this.renderContext.bind(_this);
        _this.showMoreClicked = _this.showMoreClicked.bind(_this);
        _this.closeContextualMenue = _this.closeContextualMenue.bind(_this);
        _this.deleteRoute = _this.deleteRoute.bind(_this);
        _this.editRoute = _this.editRoute.bind(_this);
        var cols = routenColumns_1.routeOverviewColumns.map(function (col) {
            col.onColumnClick = _this.onColumnClick;
            if (col.fieldName === "ctx") {
                col.onRender = _this.renderContext;
            }
            return col;
        });
        _this.state = {
            columns: cols,
            showContextMenue: false,
            selectedItems: undefined
        };
        _this._selection = new office_ui_fabric_react_1.Selection({
            onSelectionChanged: _this.selectionHasChanged
        });
        return _this;
    }
    Routenuebersicht.prototype.componentDidUpdate = function (prevProps, prevState, prevContext) {
        if (JSON.stringify(this.props.items) !== JSON.stringify(prevProps.items)) {
        }
        else {
            console.log("NO update items");
        }
    };
    Routenuebersicht.prototype.selectionHasChanged = function () {
        console.log("selectionHasChanged");
        console.log("count: " + this._selection.getSelectedCount());
        this.props.selectionChanged(this._selection.getSelection());
    };
    Routenuebersicht.prototype.deleteRoute = function () {
        var _this = this;
        this.props
            .onDeleteRouteClicked(this.state.selectedItems)
            .then(function () {
            _this._selection.setAllSelected(false);
            _this.setState({ selectedItems: undefined, showContextMenue: false });
        })
            .catch(function () {
            alert("Es ist ein Fehler beim Löschen der Route aufgetreten");
        });
    };
    Routenuebersicht.prototype.editRoute = function () {
        this.props.onEditRouteClick(this.state.selectedItems[0]);
        this.setState({ selectedItems: undefined, showContextMenue: false });
    };
    Routenuebersicht.prototype.closeContextualMenue = function () {
        this.setState({ showContextMenue: false });
    };
    Routenuebersicht.prototype.showMoreClicked = function (event) {
        this._target = event.target;
        this.setState({
            showContextMenue: true,
            selectedItems: this._selection.getSelection()
        });
    };
    Routenuebersicht.prototype.renderContext = function () {
        return (React.createElement("div", { className: "ms-font-xl ms-fontColor-themePrimary" },
            React.createElement(office_ui_fabric_react_1.IconButton, { checked: false, iconProps: { iconName: "More" }, title: "More", ariaLabel: "More", onClick: this.showMoreClicked })));
    };
    Routenuebersicht.prototype.onColumnClick = function (ev, column) {
        var columns = this.state.columns;
        var newItems = [];
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
        this.setState({
            columns: newColumns
        });
    };
    Routenuebersicht.prototype.render = function () {
        console.log("render Routenuebersicht");
        return (React.createElement(react_1.Fragment, null,
            React.createElement(office_ui_fabric_react_1.DetailsList, { selectionMode: office_ui_fabric_react_1.SelectionMode.multiple, items: this.props.items, compact: false, columns: this.state.columns, setKey: "set", layoutMode: office_ui_fabric_react_1.DetailsListLayoutMode.justified, isHeaderVisible: true, selection: this._selection, selectionPreservedOnEmptyClick: false, enterModalSelectionOnTouch: false }),
            this.state.showContextMenue && (React.createElement(office_ui_fabric_react_1.ContextualMenu, { directionalHint: 12, isBeakVisible: true, gapSpace: 10, beakWidth: 20, directionalHintFixed: true, target: this._target, items: [
                    {
                        name: "Bearbeiten",
                        key: "edit",
                        icon: "edit",
                        itemType: office_ui_fabric_react_1.ContextualMenuItemType.Normal
                    },
                    {
                        key: "divider_1",
                        itemType: office_ui_fabric_react_1.ContextualMenuItemType.Divider
                    },
                    {
                        name: "Löschen",
                        key: "delete",
                        icon: "Delete",
                        itemType: office_ui_fabric_react_1.ContextualMenuItemType.Normal,
                        onClick: this.deleteRoute
                    }
                ], onDismiss: this.closeContextualMenue }))));
    };
    return Routenuebersicht;
}(React.Component));
exports.Routenuebersicht = Routenuebersicht;


/***/ }),

/***/ 864:
/*!*******************************************************************!*\
  !*** ./src/projects/aldi/components/intelligent/UploadRoutes.tsx ***!
  \*******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise) {
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ 1);
var axios_1 = __webpack_require__(/*! axios */ 30);
var react_1 = __webpack_require__(/*! react */ 1);
var ButtonRow_1 = __webpack_require__(/*! ../../../../global/components/simple/ButtonRow */ 131);
var UploadRoutes = (function (_super) {
    __extends(UploadRoutes, _super);
    function UploadRoutes(props) {
        var _this = _super.call(this, props) || this;
        _this.textareaElement = undefined;
        _this.uploadClick = _this.uploadClick.bind(_this);
        _this.setRef = _this.setRef.bind(_this);
        return _this;
    }
    UploadRoutes.prototype.saveRoutes = function (routes) {
        return new Promise(function (resolve, reject) {
            var promises = [];
            routes.forEach(function (route) {
                promises.push(axios_1.default.post("/api/routen", { route: route }));
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
    UploadRoutes.prototype.setRef = function (element) {
        this.textareaElement = element;
    };
    UploadRoutes.prototype.render = function () {
        console.log("render UploadRoutes");
        return (React.createElement(react_1.Fragment, null,
            React.createElement("div", { className: "ms-Grid-row" },
                React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                    React.createElement("textarea", { cols: 100, rows: 40, ref: this.setRef }))),
            React.createElement("div", { className: "ms-Grid-row" },
                React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                    React.createElement(ButtonRow_1.ButtonRow, { saveButtonProps: {
                            text: "Upload",
                            disabled: false,
                            checked: false,
                            onClickFunc: this.uploadClick
                        }, cancelButtonProps: {
                            text: "Abbrechen",
                            disabled: false,
                            checked: false,
                            onClickFunc: this.props.cancelClick
                        } })))));
    };
    return UploadRoutes;
}(React.Component));
exports.UploadRoutes = UploadRoutes;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! bluebird */ 18)))

/***/ }),

/***/ 865:
/*!*********************************************************************!*\
  !*** ./src/projects/aldi/components/intelligent/UploadFilialen.tsx ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ 1);
var axios_1 = __webpack_require__(/*! axios */ 30);
var office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 14);
var react_1 = __webpack_require__(/*! react */ 1);
var ButtonRow_1 = __webpack_require__(/*! ../../../../global/components/simple/ButtonRow */ 131);
var date_1 = __webpack_require__(/*! ../../../../helper/date */ 78);
var promise_1 = __webpack_require__(/*! ../../../../helper/promise */ 132);
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
        return _this;
    }
    UploadFilialen.prototype.saveFilialen = function (filialen) {
        var filialPromises = filialen.map(function (filiale, index) {
            return axios_1.default.post("/api/filialen", {
                filiale: filiale
            });
        });
        return promise_1.promise_all_custom(filialPromises);
    };
    UploadFilialen.prototype.parseNumber = function (value) {
        value = value.replace(/,/g, ".");
        value = value.replace(/[^0-9.]/g, "");
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
                pkz: _this.parseNumber(rows[5].trim()),
                testnummer: _this.parseNumber(rows[6].trim()),
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
        this.saveFilialen(filialen.import)
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
        return (React.createElement(react_1.Fragment, null,
            React.createElement("div", { className: "ms-Grid-row" },
                React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                    React.createElement("div", { style: { padding: "25px" } },
                        React.createElement(office_ui_fabric_react_1.Label, null, "Routenfahrt auswählen"),
                        React.createElement("select", { ref: this.setSelectRouteElement }, this.props.routes.map(function (route, index) {
                            return (React.createElement("option", { value: route._id, key: "r_" + index }, date_1.getGermanDateString(new Date(route.route_timestamp))));
                        }))))),
            React.createElement("div", { className: "ms-Grid-row" },
                React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                    React.createElement("textarea", { rows: 20, ref: this.setTextareaElement, style: { width: "100%" } }))),
            React.createElement("div", { className: "ms-Grid-row" },
                React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                    React.createElement(ButtonRow_1.ButtonRow, { saveButtonProps: {
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
}(React.Component));
exports.UploadFilialen = UploadFilialen;


/***/ }),

/***/ 866:
/*!***********************************************************************!*\
  !*** ./src/projects/aldi/components/intelligent/Filialuebersicht.tsx ***!
  \***********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise) {
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ 1);
var axios_1 = __webpack_require__(/*! axios */ 30);
var BaseUebersicht_1 = __webpack_require__(/*! ../../../../global/components/simple/BaseUebersicht */ 867);
var sorting_1 = __webpack_require__(/*! ../../../../helper/sorting */ 868);
var promise_1 = __webpack_require__(/*! ../../../../helper/promise */ 132);
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
        _this.state = {
            isLoading: true,
            columns: [],
            items: [],
            rawItems: [],
            selectedItems: [],
            commandbarItems: commardbarItems
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
    Filialuebersicht.prototype.selectionHasChanged = function (selectedItems) {
        var newState = __assign({}, this.state);
        newState.selectedItems = selectedItems;
        newState.commandbarItems.forEach(function (item) {
            if (item.key === "delete") {
                item.disabled = !selectedItems || selectedItems.length < 0;
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
            promise_1.promise_all_custom(promises)
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
            axios_1.default.get("/api/filialen")
                .then(function (results) {
                resolve(results.data);
            })
                .catch(function () {
                reject();
            });
        });
    };
    Filialuebersicht.prototype.deleteFilialeElementRequest = function (route) {
        return axios_1.default.delete("/api/filialen/" + route._id);
    };
    Filialuebersicht.prototype.deleteFiliale = function (selectedItems) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!selectedItems ||
                selectedItems.length === 0 ||
                selectedItems.length > 1) {
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
        return sorting_1.sortArrayByProperty(this.state.items, propertyName, descending);
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
    Filialuebersicht.prototype.render = function () {
        console.log("render Filialuebersicht");
        return (React.createElement(BaseUebersicht_1.BaseUebersicht, { onDeleteItemClicked: this.deleteFilialeClicked, columns: [], items: this.state.items, onEditItemClick: this.editFiliale, onItemSelectionChanged: this.selectionHasChanged, sortByPropertyName: this.sortItems, isLoading: this.state.isLoading, loadingText: "Filialen werden geladen", useCommandbar: true, enableSearchBox: false, commandbarItems: this.state.commandbarItems }));
    };
    return Filialuebersicht;
}(React.Component));
exports.Filialuebersicht = Filialuebersicht;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! bluebird */ 18)))

/***/ }),

/***/ 867:
/*!*********************************************************!*\
  !*** ./src/global/components/simple/BaseUebersicht.tsx ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ 1);
var office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 14);
var react_1 = __webpack_require__(/*! react */ 1);
var routenColumns_1 = __webpack_require__(/*! ../../../projects/aldi/configuration/routenColumns */ 338);
var BaseUebersicht = (function (_super) {
    __extends(BaseUebersicht, _super);
    function BaseUebersicht(props) {
        var _this = _super.call(this, props) || this;
        _this.selectionHasChanged = _this.selectionHasChanged.bind(_this);
        _this.onColumnClick = _this.onColumnClick.bind(_this);
        _this.renderContext = _this.renderContext.bind(_this);
        _this.showMoreClicked = _this.showMoreClicked.bind(_this);
        _this.closeContextualMenue = _this.closeContextualMenue.bind(_this);
        _this.deleteFiliale = _this.deleteFiliale.bind(_this);
        _this.editFiliale = _this.editFiliale.bind(_this);
        var cols = routenColumns_1.filialOverviewColumns.map(function (col) {
            col.onColumnClick = _this.onColumnClick;
            if (col.fieldName === "ctx") {
                col.onRender = _this.renderContext;
            }
            return col;
        });
        _this.state = {
            columns: cols,
            items: _this.props.items,
            showContextMenue: false,
            selectedItems: undefined
        };
        _this._selection = new office_ui_fabric_react_1.Selection({
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
            this.setState({ selectedItems: undefined, showContextMenue: false });
        }
    };
    BaseUebersicht.prototype.selectionHasChanged = function () {
        console.log("selectionHasChanged");
        this.props.onItemSelectionChanged(this._selection.getSelection());
        this.forceUpdate();
    };
    BaseUebersicht.prototype.deleteFiliale = function () {
        var _this = this;
        this.props
            .onDeleteItemClicked(this.state.selectedItems)
            .then(function () {
            _this._selection.setAllSelected(false);
            _this.setState({ selectedItems: undefined, showContextMenue: false });
        })
            .catch(function () {
            alert("Es ist ein Fehler beim Löschen der Filiale aufgetreten");
        });
    };
    BaseUebersicht.prototype.editFiliale = function () {
        this.props.onEditItemClick(this.state.selectedItems[0]);
        this.setState({ selectedItems: undefined, showContextMenue: false });
    };
    BaseUebersicht.prototype.closeContextualMenue = function () {
        this.setState({ showContextMenue: false });
    };
    BaseUebersicht.prototype.showMoreClicked = function (event) {
        this._target = event.target;
        this.setState({
            showContextMenue: true,
            selectedItems: this._selection.getSelection() || []
        });
    };
    BaseUebersicht.prototype.renderContext = function () {
        return (React.createElement("div", { className: "ms-font-xl ms-fontColor-themePrimary" },
            React.createElement(office_ui_fabric_react_1.IconButton, { checked: false, iconProps: { iconName: "More" }, title: "More", ariaLabel: "More", onClick: this.showMoreClicked })));
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
        if (this.props.isLoading) {
            return React.createElement(office_ui_fabric_react_1.Spinner, { label: this.props.loadingText });
        }
        return (React.createElement(react_1.Fragment, null,
            this.props.useCommandbar &&
                this.props.commandbarItems &&
                this.props.commandbarItems.length > 0 && (React.createElement("div", { className: "ms-Grid-row" },
                React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                    React.createElement(office_ui_fabric_react_1.CommandBar, { isSearchBoxVisible: this.props.enableSearchBox, items: this.props.commandbarItems })))),
            React.createElement(office_ui_fabric_react_1.DetailsList, { selectionMode: office_ui_fabric_react_1.SelectionMode.multiple, items: this.props.items, compact: false, columns: this.state.columns, setKey: "set", layoutMode: office_ui_fabric_react_1.DetailsListLayoutMode.justified, isHeaderVisible: true, selection: this._selection, selectionPreservedOnEmptyClick: false, enterModalSelectionOnTouch: false }),
            this.state.showContextMenue && (React.createElement(office_ui_fabric_react_1.ContextualMenu, { directionalHint: 12, isBeakVisible: true, gapSpace: 10, beakWidth: 20, directionalHintFixed: true, target: this._target, items: [
                    {
                        name: "Bearbeiten",
                        key: "edit",
                        icon: "edit",
                        itemType: office_ui_fabric_react_1.ContextualMenuItemType.Normal,
                        onClick: this.editFiliale
                    },
                    {
                        key: "divider_1",
                        itemType: office_ui_fabric_react_1.ContextualMenuItemType.Divider
                    },
                    {
                        name: "Löschen",
                        key: "delete",
                        icon: "Delete",
                        itemType: office_ui_fabric_react_1.ContextualMenuItemType.Normal,
                        onClick: this.deleteFiliale
                    }
                ], onDismiss: this.closeContextualMenue }))));
    };
    return BaseUebersicht;
}(React.Component));
exports.BaseUebersicht = BaseUebersicht;


/***/ }),

/***/ 868:
/*!*******************************!*\
  !*** ./src/helper/sorting.ts ***!
  \*******************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
exports.sortElement = sortElement;
function sortArrayByProperty(arrayOfElements, propertyName, descending) {
    if (descending === void 0) { descending = false; }
    return arrayOfElements.sort(function (a, b) {
        return sortElement(a, b, propertyName, descending);
    });
}
exports.sortArrayByProperty = sortArrayByProperty;


/***/ }),

/***/ 869:
/*!**************************************************************!*\
  !*** ./src/projects/aldi/components/intelligent/Filiale.tsx ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ 1);
var axios_1 = __webpack_require__(/*! axios */ 30);
var Filiale_1 = __webpack_require__(/*! ../stateless/Filiale */ 335);
var promise_1 = __webpack_require__(/*! ../../../../helper/promise */ 132);
var office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 14);
var react_1 = __webpack_require__(/*! react */ 1);
var ButtonRow_1 = __webpack_require__(/*! ../../../../global/components/simple/ButtonRow */ 131);
var Filiale = (function (_super) {
    __extends(Filiale, _super);
    function Filiale(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            dbEntry: undefined,
            routes: [],
            viewModel: undefined,
            isInitilized: false,
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
        promise_1.promise_all_custom([
            axios_1.default.get("api/routen"),
            axios_1.default.get("api/filialen/" + this.props.filialeId)
        ])
            .then(function (data) {
            if (data[0].isError || data[1].isError) {
                alert("Fehler beim Abfragen der Daten...");
                return;
            }
            var routes = data[0].data.data || [];
            var filiale = data[1].data.data.filiale || undefined;
            if (!routes || routes.length === 0) {
                alert("Keine Routen gefunden...");
                return;
            }
            if (!filiale) {
                alert("Keine Filiale gefunden...");
                return;
            }
            routes = routes.sort(function (a, b) {
                return a.route_timestamp > b.route_timestamp
                    ? 1
                    : a.route_timestamp < b.route_timestamp ? -1 : 0;
            });
            var dates = routes.map(function (route) {
                return new Date(route.route_timestamp);
            });
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
                isInitilized: true,
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
        var f = "";
        this.state.routes.forEach(function (route) {
            if (route.route_timestamp === _this.state.viewModel.fahrdatum) {
                f = route._id;
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
            route_id: f
        };
        axios_1.default.put("/api/filialen/" + this.state.dbEntry._id, { filiale: data })
            .then(function (response) {
            _this.props.ok_clicked();
            return null;
        })
            .catch(function (e) {
            console.log("Fehler", JSON.stringify(e));
            alert("Fehler");
        });
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
        if (!this.state.isInitilized) {
            return React.createElement(office_ui_fabric_react_1.Spinner, { label: "Lade Filiale...", size: office_ui_fabric_react_1.SpinnerSize.large });
        }
        return (React.createElement(react_1.Fragment, null,
            React.createElement(Filiale_1.Filiale, { filiale: this.state.viewModel, id: this.state.dbEntry._id, key: "_1", fahrdaten: this.state.availableRouteDates, title: this.props.headerText, onAusgabenChanged: this.onAusgabenChanged, onDeleteClick: this.onDeleteClick, onEinnahmenChanged: this.onEinnahmenChanged, onFahrdatumChanged: this.onFahrdatumChanged, onOrtChanged: this.onOrtChanged, onPkzChanged: this.onPkzChanged, onPlzChanged: this.onPlzChanged, onStrasseChanged: this.onStrasseChanged, onTestnummerChanged: this.onTestnummerChanged, enableDeleteBtn: false }),
            React.createElement("div", { className: "ms-Grid-row" },
                React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                    React.createElement(ButtonRow_1.ButtonRow, { saveButtonProps: {
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
}(React.Component));
exports.Filiale = Filiale;


/***/ }),

/***/ 870:
/*!*******************************************************!*\
  !*** ./src/global/components/simple/NotFoundPage.tsx ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ 1);
var react_router_dom_1 = __webpack_require__(/*! react-router-dom */ 84);
var Routing_1 = __webpack_require__(/*! ./Routing */ 339);
var NotFoundPage = (function (_super) {
    __extends(NotFoundPage, _super);
    function NotFoundPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NotFoundPage.prototype.render = function () {
        return (React.createElement(Routing_1.Status, { code: 404 },
            React.createElement("div", { className: "not-found" },
                React.createElement("h1", null, "404"),
                React.createElement("h2", null, "Page not found!"),
                React.createElement("p", null,
                    React.createElement(react_router_dom_1.Link, { to: "/", replace: true }, "Return to Main Page")))));
    };
    return NotFoundPage;
}(React.Component));
exports.NotFoundPage = NotFoundPage;


/***/ })

},[375]);
//# sourceMappingURL=application.js.map