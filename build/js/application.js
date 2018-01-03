webpackJsonp([0],{

/***/ 183:
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

/***/ 232:
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
var axios_1 = __webpack_require__(/*! axios */ 49);
var timers_1 = __webpack_require__(/*! timers */ 86);
var Yeelight_1 = __webpack_require__(/*! ../simple/Yeelight */ 429);
var react_1 = __webpack_require__(/*! react */ 1);
var intToRGB = __webpack_require__(/*! int-to-rgb */ 183);
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! bluebird */ 23)))

/***/ }),

/***/ 306:
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
var axios_1 = __webpack_require__(/*! axios */ 49);
var BaseWeatherSensor_1 = __webpack_require__(/*! ../../../../global/components/simple/BaseWeatherSensor */ 711);
var timers_1 = __webpack_require__(/*! timers */ 86);
var intToRGB = __webpack_require__(/*! int-to-rgb */ 183);
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! bluebird */ 23)))

/***/ }),

/***/ 328:
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
var axios_1 = __webpack_require__(/*! axios */ 49);
var BaseLight_1 = __webpack_require__(/*! ../../../../global/components/simple/BaseLight */ 848);
var timers_1 = __webpack_require__(/*! timers */ 86);
var intToRGB = __webpack_require__(/*! int-to-rgb */ 183);
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! bluebird */ 23)))

/***/ }),

/***/ 329:
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
var office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 17);
var axios_1 = __webpack_require__(/*! axios */ 49);
var timers_1 = __webpack_require__(/*! timers */ 86);
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! bluebird */ 23)))

/***/ }),

/***/ 330:
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

/***/ 331:
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
var office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 17);
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

/***/ 332:
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
var office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 17);
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
        var v = isNaN(value) ? 0 : parseInt(value);
        this.props.onChanged(v);
        if (this.props.numberValueChanged) {
            this.props.numberValueChanged(v);
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

/***/ 333:
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

/***/ 334:
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

/***/ 335:
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
var react_router_dom_1 = __webpack_require__(/*! react-router-dom */ 83);
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

/***/ 371:
/*!*******************************************************!*\
  !*** multi ./src/global/components/pages/initApp.tsx ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/global/components/pages/initApp.tsx */372);


/***/ }),

/***/ 372:
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
var globalApplication_1 = __webpack_require__(/*! ./globalApplication */ 387);
var react_router_dom_1 = __webpack_require__(/*! react-router-dom */ 83);
var icons_1 = __webpack_require__(/*! @uifabric/icons */ 336);
icons_1.initializeIcons();
window.onload = function () {
    ReactDOM.render(React.createElement(react_router_dom_1.HashRouter, null,
        React.createElement(globalApplication_1.GlobalApplication, null)), document.getElementById("reactRoot"));
};


/***/ }),

/***/ 387:
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
var react_router_dom_1 = __webpack_require__(/*! react-router-dom */ 83);
var application_1 = __webpack_require__(/*! ./application */ 409);
var application_2 = __webpack_require__(/*! ../../../projects/yeelight/components/pages/application */ 232);
var application_3 = __webpack_require__(/*! ../../../projects/vacuumRoboter/components/pages/application */ 849);
var application_4 = __webpack_require__(/*! ../../../projects/aldi/components/pages/application */ 850);
var sensors_1 = __webpack_require__(/*! ../../../projects/xiaomi/components/pages/sensors */ 306);
var gateways_1 = __webpack_require__(/*! ../../../projects/xiaomi/components/pages/gateways */ 328);
var NotFoundPage_1 = __webpack_require__(/*! ../../components/simple/NotFoundPage */ 863);
var Routing_1 = __webpack_require__(/*! ../simple/Routing */ 335);
var basePage_1 = __webpack_require__(/*! ../container/basePage */ 331);
var systeminfo_1 = __webpack_require__(/*! ../../../projects/system/components/pages/systeminfo */ 329);
var office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 17);
var GlobalApplication = (function (_super) {
    __extends(GlobalApplication, _super);
    function GlobalApplication(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { selectedNavKey: "#" };
        _this.routeChanged = _this.routeChanged.bind(_this);
        return _this;
    }
    GlobalApplication.prototype.componentDidMount = function () {
        document.title = "Web-Application by Florian Hoffmann";
        console.log("componentDidMount Application");
        window.addEventListener("hashchange", this.routeChanged);
    };
    GlobalApplication.prototype.routeChanged = function () {
        console.log("route changed");
        var navKey = document.location.hash
            ? "#" + document.location.hash.replace("#/", "")
            : "#";
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

/***/ 409:
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
var application_1 = __webpack_require__(/*! ../../../projects/yeelight/components/pages/application */ 232);
var sensors_1 = __webpack_require__(/*! ../../../projects/xiaomi/components/pages/sensors */ 306);
var gateways_1 = __webpack_require__(/*! ../../../projects/xiaomi/components/pages/gateways */ 328);
var office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 17);
var PivotItem_1 = __webpack_require__(/*! office-ui-fabric-react/lib/components/Pivot/PivotItem */ 181);
var systeminfo_1 = __webpack_require__(/*! ../../../projects/system/components/pages/systeminfo */ 329);
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

/***/ 429:
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
var office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 17);
var Panel_1 = __webpack_require__(/*! ../../../../global/components/simple/Panel */ 76);
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

/***/ 711:
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
var office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 17);
var Panel_1 = __webpack_require__(/*! ../../../global/components/simple/Panel */ 76);
var react_1 = __webpack_require__(/*! react */ 1);
var BaseWeatherSensorChart_1 = __webpack_require__(/*! ./BaseWeatherSensorChart */ 712);
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

/***/ 712:
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
var office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 17);
var axios_1 = __webpack_require__(/*! axios */ 49);
var react_chartjs_2_1 = __webpack_require__(/*! react-chartjs-2 */ 307);
var date_1 = __webpack_require__(/*! ../../../helper/date */ 97);
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
            isError: false,
            isLoadingSensorData: true,
            selectedRange: "1"
        };
        _this.dateRangeSelectionChanged = _this.dateRangeSelectionChanged.bind(_this);
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
            labels.push(date_1.getGermanDateString(new Date(row.timestamp)));
            tempValues.push(row.temperature);
            humidityValues.push(row.humidity);
            pressureValues.push(row.pressure);
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
                var dataRows = _this.getChartData(dataResult.data.items);
                resolve(dataRows);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    BaseWeatherSensorChart.prototype.doSensorQueryNow = function () {
        var _this = this;
        this.queryLiveDate(this.state.selectedRange)
            .then(function (result) {
            _this.setState({
                sensorData: result,
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
                sensorDataContent = React.createElement(react_chartjs_2_1.Line, { data: this.state.sensorData });
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! bluebird */ 23)))

/***/ }),

/***/ 76:
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
var Button_1 = __webpack_require__(/*! office-ui-fabric-react/lib/Button */ 19);
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

/***/ 848:
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
var office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 17);
var Panel_1 = __webpack_require__(/*! ../../../global/components/simple/Panel */ 76);
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

/***/ 849:
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

/***/ 850:
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
var axios_1 = __webpack_require__(/*! axios */ 49);
var office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 17);
var manageRoute_1 = __webpack_require__(/*! ./manageRoute */ 851);
var enums_1 = __webpack_require__(/*! ../../../../enums/enums */ 330);
var ToolTip_1 = __webpack_require__(/*! ../../../../global/components/simple/ToolTip */ 860);
var Routenuebersicht_1 = __webpack_require__(/*! ../intelligent/Routenuebersicht */ 861);
var Application = (function (_super) {
    __extends(Application, _super);
    function Application(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            modalContent: undefined,
            showModal: false,
            isCalloutVisible: false,
            callOutContent: undefined,
            routen: []
        };
        _this.addRouteClick = _this.addRouteClick.bind(_this);
        _this.closeModal = _this.closeModal.bind(_this);
        _this.showCallOut = _this.showCallOut.bind(_this);
        _this.hideCallOut = _this.hideCallOut.bind(_this);
        _this.sortItemsByPropertyName = _this.sortItemsByPropertyName.bind(_this);
        _this.editRoute = _this.editRoute.bind(_this);
        _this.deleteRoute = _this.deleteRoute.bind(_this);
        return _this;
    }
    Application.prototype.getRouteViewModelByRouteModel = function (items) {
        return items.map(function (item, index) {
            return __assign({ filialen: undefined, index: index + 1 }, item);
        });
    };
    Application.prototype.componentDidMount = function () {
        var _this = this;
        document.title = "Aldi Hauptseite";
        this.loadRouten()
            .then(function (data) {
            var items = _this.getRouteViewModelByRouteModel(data);
            _this.setState({ routen: items });
        })
            .catch(function () {
            alert("Fehler beim laden der Routen");
        });
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
    Application.prototype.deleteRouteElement = function (route) {
        return new Promise(function (resolve, reject) {
            axios_1.default.delete("/api/routen/" + route._id)
                .then(function (results) {
                resolve(results.data);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    Application.prototype.sortItemsByPropertyName = function (propertyName, descending) {
        if (descending) {
            return this.state.routen.sort(function (a, b) {
                if (!a.hasOwnProperty(propertyName) ||
                    !b.hasOwnProperty(propertyName)) {
                    return 0;
                }
                if (a[propertyName] < b[propertyName]) {
                    return 1;
                }
                if (a[propertyName] > b[propertyName]) {
                    return -1;
                }
                return 0;
            });
        }
        else {
            return this.state.routen.sort(function (a, b) {
                if (!a.hasOwnProperty(propertyName) ||
                    !b.hasOwnProperty(propertyName)) {
                    return 0;
                }
                if (a[propertyName] < b[propertyName]) {
                    return -1;
                }
                if (a[propertyName] > b[propertyName]) {
                    return 1;
                }
                return 0;
            });
        }
    };
    Application.prototype.addRouteClick = function () {
        var c = (React.createElement(manageRoute_1.ManageRoute, { onExitPage: this.closeModal, pageType: enums_1.PageType.Add }));
        this.setState({ showModal: true, modalContent: c });
        this.hideCallOut();
    };
    Application.prototype.closeModal = function () {
        this.setState({ showModal: false, modalContent: undefined });
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
    Application.prototype.deleteRoute = function (routeElement) {
        var _this = this;
        this.deleteRouteElement(routeElement)
            .then(function (result) {
            return _this.loadRouten();
        })
            .then(function (data) {
            var items = _this.getRouteViewModelByRouteModel(data);
            _this.setState({ routen: items });
        })
            .catch(function (error) {
            debugger;
            var n = "";
        });
    };
    Application.prototype.editRoute = function (routeElement) { };
    Application.prototype.render = function () {
        console.log("render application");
        if (this.state.showModal && !!this.state.modalContent) {
            return (React.createElement("div", { className: "ms-Grid-row" },
                React.createElement("div", { className: "ms-Grid-col ms-sm12" }, this.state.modalContent)));
        }
        return (React.createElement("div", { className: "ms-Grid-row" },
            React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                React.createElement("div", { className: "ms-Grid-row" },
                    React.createElement("div", { className: "ms-Grid-col ms-sm12 ms-lg4" },
                        React.createElement("div", { className: "custom-cmd-button" },
                            React.createElement(office_ui_fabric_react_1.CommandBarButton, { "data-info-title": "Route erfassen", "data-info-desc": "Erstellt eine neue Route für Aldi", iconProps: { iconName: "Add" }, text: "Route erfassen", onClick: this.addRouteClick, onMouseEnter: this.showCallOut, onMouseLeave: this.hideCallOut }))),
                    React.createElement("div", { className: "ms-Grid-col ms-sm12 ms-lg4" },
                        React.createElement("div", { className: "custom-cmd-button" },
                            React.createElement(office_ui_fabric_react_1.CommandBarButton, { iconProps: { iconName: "Add" }, text: "Filialen erfassen" }))))),
            React.createElement("div", { className: "ms-Grid-row" },
                React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                    React.createElement(Routenuebersicht_1.Routenuebersicht, { items: this.state.routen, sortByPropertyName: this.sortItemsByPropertyName, deleteRoute: this.deleteRoute, editRoute: this.editRoute })))));
    };
    return Application;
}(React.Component));
exports.Application = Application;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! bluebird */ 23)))

/***/ }),

/***/ 851:
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
var office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 17);
var enums_1 = __webpack_require__(/*! ../../../../enums/enums */ 330);
var basePage_1 = __webpack_require__(/*! ../../../../global/components/container/basePage */ 331);
var ButtonRow_1 = __webpack_require__(/*! ../../../../global/components/simple/ButtonRow */ 852);
var Panel_1 = __webpack_require__(/*! ../../../../global/components/simple/Panel */ 76);
var date_1 = __webpack_require__(/*! ../../../../helper/date */ 97);
var Link_1 = __webpack_require__(/*! ../stateless/Link */ 853);
var Ausgabe_1 = __webpack_require__(/*! ../stateless/Ausgabe */ 854);
var Filiale_1 = __webpack_require__(/*! ../stateless/Filiale */ 855);
var Routenfahrt_1 = __webpack_require__(/*! ../stateless/Routenfahrt */ 856);
var uuid_1 = __webpack_require__(/*! uuid */ 857);
var axios_1 = __webpack_require__(/*! axios */ 49);
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
        var fahrten = this.state.routenfahrten.concat([new Date()]);
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
                                return (React.createElement(Filiale_1.Filiale, { key: "route_" + index, id: index.toString(), title: "Fahrt " + (index + 1), filiale: filiale, fahrdaten: _this.state.routenfahrten, onDeleteClick: _this.deleteFiliale, onAusgabenChanged: _this.ausgabenChanged, onEinnahmenChanged: _this.einnahmenChanged, onFahrdatumChanged: _this.fahrdatumChanged, onOrtChanged: _this.ortChanged, onPkzChanged: _this.pkzChanged, onPlzChanged: _this.plzChanged, onStrasseChanged: _this.strasseChanged, onTestnummerChanged: _this.testnummerChanged }));
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! bluebird */ 23)))

/***/ }),

/***/ 852:
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
var office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 17);
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

/***/ 853:
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
var office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 17);
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

/***/ 854:
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
var office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 17);
var NumberTextField_1 = __webpack_require__(/*! ../../../../global/components/simple/NumberTextField */ 332);
var Panel_1 = __webpack_require__(/*! ../../../../global/components/simple/Panel */ 76);
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

/***/ 855:
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
var office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 17);
var NumberTextField_1 = __webpack_require__(/*! ../../../../global/components/simple/NumberTextField */ 332);
var Panel_1 = __webpack_require__(/*! ../../../../global/components/simple/Panel */ 76);
var date_1 = __webpack_require__(/*! ../../../../helper/date */ 97);
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
        return (React.createElement("div", { className: "ms-Grid-row" },
            React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                React.createElement("div", { className: "ms-Grid-row", key: "filiale_" + this.props.id },
                    React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                        React.createElement(Panel_1.Panel, { headerText: this.props.title, headerControls: React.createElement(office_ui_fabric_react_1.ActionButton, { "data-info-title": "Filiale entfernen", "data-info-desc": "Löscht die Filiale", iconProps: { iconName: "Delete" }, onClick: this.deleteClicked }) },
                            React.createElement("div", { className: "ms-Grid-row" },
                                React.createElement("div", { className: "ms-Grid-col ms-sm12 ms-md5" },
                                    React.createElement("div", null,
                                        React.createElement(office_ui_fabric_react_1.Label, null, "Routenfahrdatum"),
                                        React.createElement("select", { className: "custom-ddl-control", onChange: this.fahrDatumChanged, value: this.props.filiale.fahrdatum }, this.props.fahrdaten.map(function (fahrtDatum, index) {
                                            return (React.createElement("option", { key: "fahrt__" + index, value: fahrtDatum.getTime() }, date_1.getGermanDateString(fahrtDatum)));
                                        })))),
                                React.createElement("div", { className: "ms-Grid-col ms-sm9 ms-md5" },
                                    React.createElement(NumberTextField_1.NumberTextField, { required: true, placeholder: "Testnummer", label: "Testnummer", numberValue: this.props.filiale.testnummer, onChanged: this.testnummerChanged })),
                                React.createElement("div", { className: "ms-Grid-col ms-sm3 ms-md2" },
                                    React.createElement(NumberTextField_1.NumberTextField, { required: true, placeholder: "Prüfkennziffer", label: "Pkz.", numberValue: this.props.filiale.pkz, onChanged: this.pkzChanged })),
                                React.createElement("div", { className: "ms-Grid-col ms-sm12 ms-lg5" },
                                    React.createElement(office_ui_fabric_react_1.TextField, { required: true, placeholder: "Straße", label: "Straße", value: this.props.filiale.strasse, onChanged: this.strasseChanged })),
                                React.createElement("div", { className: "ms-Grid-col ms-sm3 ms-md3 ms-lg2" },
                                    React.createElement(NumberTextField_1.NumberTextField, { required: true, placeholder: "Plz", label: "Plz", numberValue: this.props.filiale.plz, onChanged: this.plzChanged })),
                                React.createElement("div", { className: "ms-Grid-col ms-sm9 ms-md9 ms-lg5" },
                                    React.createElement(office_ui_fabric_react_1.TextField, { required: true, placeholder: "Ort", label: "Ort", value: this.props.filiale.ort, onChanged: this.ortChanged })),
                                React.createElement("div", { className: "ms-Grid-col ms-sm6 ms-md6 ms-lg6" },
                                    React.createElement(NumberTextField_1.NumberTextField, { placeholder: "Einnahmen", label: "Einnahmen", numberValue: this.props.filiale.einnahmen, onChanged: this.einnahmenChanged, suffix: " €" })),
                                React.createElement("div", { className: "ms-Grid-col ms-sm6 ms-md6 ms-lg6" },
                                    React.createElement(NumberTextField_1.NumberTextField, { placeholder: "Ausgaben", label: "Ausgaben", numberValue: this.props.filiale.ausgaben, onChanged: this.ausgabenChanged, suffix: " €" })))))))));
    };
    return Filiale;
}(React.Component));
exports.Filiale = Filiale;


/***/ }),

/***/ 856:
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
var office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 17);
var date_1 = __webpack_require__(/*! ../../../../helper/date */ 97);
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

/***/ 857:
/*!************************************!*\
  !*** ./node_modules/uuid/index.js ***!
  \************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var v1 = __webpack_require__(/*! ./v1 */ 858);
var v4 = __webpack_require__(/*! ./v4 */ 859);

var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;

module.exports = uuid;


/***/ }),

/***/ 858:
/*!*********************************!*\
  !*** ./node_modules/uuid/v1.js ***!
  \*********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(/*! ./lib/rng */ 333);
var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ 334);

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

/***/ 859:
/*!*********************************!*\
  !*** ./node_modules/uuid/v4.js ***!
  \*********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(/*! ./lib/rng */ 333);
var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ 334);

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

/***/ 860:
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

/***/ 861:
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
var office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 17);
var routenColumns_1 = __webpack_require__(/*! ../../configuration/routenColumns */ 862);
var react_1 = __webpack_require__(/*! react */ 1);
var Routenuebersicht = (function (_super) {
    __extends(Routenuebersicht, _super);
    function Routenuebersicht(props) {
        var _this = _super.call(this, props) || this;
        _this._selection = new office_ui_fabric_react_1.Selection({});
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
            items: _this.props.items,
            showContextMenue: false,
            selectedItem: undefined
        };
        return _this;
    }
    Routenuebersicht.prototype.deleteRoute = function () {
        this.props.deleteRoute(this.state.selectedItem);
        this.setState({ selectedItem: undefined, showContextMenue: false });
    };
    Routenuebersicht.prototype.editRoute = function () {
        this.props.editRoute(this.state.selectedItem);
        this.setState({ selectedItem: undefined, showContextMenue: false });
    };
    Routenuebersicht.prototype.closeContextualMenue = function () {
        this.setState({ showContextMenue: false });
    };
    Routenuebersicht.prototype.showMoreClicked = function (event) {
        this._target = event.target;
        this.setState({
            showContextMenue: true,
            selectedItem: this._selection.getSelection()[0]
        });
    };
    Routenuebersicht.prototype.renderContext = function () {
        return (React.createElement("div", { className: "ms-font-xl ms-fontColor-themePrimary" },
            React.createElement(office_ui_fabric_react_1.IconButton, { checked: false, iconProps: { iconName: "More" }, title: "More", ariaLabel: "More", onClick: this.showMoreClicked })));
    };
    Routenuebersicht.prototype.onColumnClick = function (ev, column) {
        var _a = this.state, columns = _a.columns, items = _a.items;
        var newItems = items.slice();
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
        newItems = this.props.sortByPropertyName(currColumn.fieldName, currColumn.isSortedDescending);
        this.setState({
            columns: newColumns,
            items: newItems
        });
    };
    Routenuebersicht.prototype.render = function () {
        console.log("render Routenuebersicht");
        return (React.createElement(react_1.Fragment, null,
            React.createElement(office_ui_fabric_react_1.MarqueeSelection, { selection: this._selection, isEnabled: false },
                React.createElement(office_ui_fabric_react_1.DetailsList, { selectionMode: office_ui_fabric_react_1.SelectionMode.none, items: this.props.items, compact: false, columns: this.state.columns, setKey: "set", layoutMode: office_ui_fabric_react_1.DetailsListLayoutMode.justified, isHeaderVisible: true, selection: this._selection, selectionPreservedOnEmptyClick: true, enterModalSelectionOnTouch: true })),
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

/***/ 862:
/*!***********************************************************!*\
  !*** ./src/projects/aldi/configuration/routenColumns.tsx ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ 1);
var date_1 = __webpack_require__(/*! ../../../helper/date */ 97);
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


/***/ }),

/***/ 863:
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
var react_router_dom_1 = __webpack_require__(/*! react-router-dom */ 83);
var Routing_1 = __webpack_require__(/*! ./Routing */ 335);
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


/***/ }),

/***/ 97:
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


/***/ })

},[371]);
//# sourceMappingURL=application.js.map