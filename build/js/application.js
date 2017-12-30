webpackJsonp([0],{

/***/ 120:
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
var Button_1 = __webpack_require__(/*! office-ui-fabric-react/lib/Button */ 18);
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

/***/ 182:
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

/***/ 231:
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
var axios_1 = __webpack_require__(/*! axios */ 71);
var timers_1 = __webpack_require__(/*! timers */ 85);
var Yeelight_1 = __webpack_require__(/*! ../simple/Yeelight */ 426);
var react_1 = __webpack_require__(/*! react */ 1);
var intToRGB = __webpack_require__(/*! int-to-rgb */ 182);
var Application = (function (_super) {
    __extends(Application, _super);
    function Application(props) {
        var _this = _super.call(this, props) || this;
        _this.isMountedFinished = false;
        _this.state = { lights: [], isInitialized: false };
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
        this.ival = timers_1.setInterval(this.loadDevices, 30000);
        this.isMountedFinished = true;
    };
    Application.prototype.componentWillUnmount = function () {
        clearInterval(this.ival);
        this.isMountedFinished = false;
    };
    Application.prototype.loadDevices = function () {
        var _this = this;
        return axios_1.default.get("/api/lights/details")
            .then(function (results) {
            if (_this.isMountedFinished === true) {
                _this.setState({ lights: results.data["lights"] });
            }
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! bluebird */ 38)))

/***/ }),

/***/ 305:
/*!**********************************************************!*\
  !*** ./src/projects/xiaomi/components/pages/sensors.tsx ***!
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
var axios_1 = __webpack_require__(/*! axios */ 71);
var BaseWeatherSensor_1 = __webpack_require__(/*! ../../../../global/components/simple/BaseWeatherSensor */ 708);
var timers_1 = __webpack_require__(/*! timers */ 85);
var intToRGB = __webpack_require__(/*! int-to-rgb */ 182);
var Application = (function (_super) {
    __extends(Application, _super);
    function Application(props) {
        var _this = _super.call(this, props) || this;
        _this.isMountedFinished = false;
        _this.state = { sensors: [], isInitialized: false };
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
        this.ival = timers_1.setInterval(this.loadDevices, 30000);
        this.isMountedFinished = true;
    };
    Application.prototype.componentWillUnmount = function () {
        clearInterval(this.ival);
        this.isMountedFinished = false;
    };
    Application.prototype.loadDevices = function () {
        var _this = this;
        return axios_1.default.get("/api/sensors").then(function (result) {
            if (_this.isMountedFinished === true) {
                _this.setState({ sensors: result.data["sensors"] });
            }
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


/***/ }),

/***/ 327:
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
function addDays(dateToAdd, daysToAdd, setHrsMinSecMiSecToZero) {
    if (setHrsMinSecMiSecToZero === void 0) { setHrsMinSecMiSecToZero = false; }
    var calculatedDate = new Date(dateToAdd);
    calculatedDate.setDate(calculatedDate.getDate() + daysToAdd);
    if (setHrsMinSecMiSecToZero) {
        calculatedDate.setMinutes(0);
        calculatedDate.setHours(0);
        calculatedDate.setSeconds(0);
        calculatedDate.setMilliseconds(0);
    }
    return calculatedDate;
}
exports.addDays = addDays;


/***/ }),

/***/ 328:
/*!***********************************************************!*\
  !*** ./src/projects/xiaomi/components/pages/gateways.tsx ***!
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
var axios_1 = __webpack_require__(/*! axios */ 71);
var BaseLight_1 = __webpack_require__(/*! ../../../../global/components/simple/BaseLight */ 845);
var timers_1 = __webpack_require__(/*! timers */ 85);
var intToRGB = __webpack_require__(/*! int-to-rgb */ 182);
var Application = (function (_super) {
    __extends(Application, _super);
    function Application(props) {
        var _this = _super.call(this, props) || this;
        _this.isMountedFinished = false;
        _this.state = { gateways: [], gatewayLights: [], isInitialized: false };
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
        this.ival = timers_1.setInterval(this.loadDevices, 30000);
        this.isMountedFinished = true;
    };
    Application.prototype.componentWillUnmount = function () {
        clearInterval(this.ival);
        this.isMountedFinished = false;
    };
    Application.prototype.loadDevices = function () {
        var _this = this;
        return axios_1.default.get("/api/gateways")
            .then(function (results) {
            if (_this.isMountedFinished === true) {
                var gws = results.data["gateways"];
                var gwLights = gws.map(_this.mapGatewayToLightModel);
                _this.setState({ gateways: gws, gatewayLights: gwLights });
            }
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


/***/ }),

/***/ 329:
/*!*************************************************************!*\
  !*** ./src/projects/system/components/pages/systeminfo.tsx ***!
  \*************************************************************/
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
var office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 29);
var axios_1 = __webpack_require__(/*! axios */ 71);
var timers_1 = __webpack_require__(/*! timers */ 85);
var react_1 = __webpack_require__(/*! react */ 1);
var SystemInfo = (function (_super) {
    __extends(SystemInfo, _super);
    function SystemInfo(props) {
        var _this = _super.call(this, props) || this;
        _this.isMountedFinished = false;
        _this.state = { systemInformation: undefined, isInitialized: false };
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
        this.ival = timers_1.setInterval(this.loadDevices, 10000);
        this.isMountedFinished = true;
    };
    SystemInfo.prototype.componentWillUnmount = function () {
        clearInterval(this.ival);
        this.isMountedFinished = false;
    };
    SystemInfo.prototype.loadDevices = function () {
        var _this = this;
        return axios_1.default.get("/api/system").then(function (result) {
            if (_this.isMountedFinished === true) {
                _this.setState({ systemInformation: result.data["system"] });
            }
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
var office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 29);
var BasePage = (function (_super) {
    __extends(BasePage, _super);
    function BasePage(props) {
        return _super.call(this, props) || this;
    }
    BasePage.prototype.render = function () {
        var renderElement = null;
        var content = React.createElement("div", { className: "ms-Grid" },
            this.props.Header &&
                React.createElement("div", { className: "ms-Grid-row" },
                    React.createElement("div", { className: "ms-Grid-col ms-sm12" }, this.props.Header)),
            React.createElement("div", { className: "ms-Grid-row" },
                this.props.Navigation && [
                    React.createElement("div", { className: "ms-Grid-col ms-sm12 ms-md12 ms-lg3 ms-xl2", key: "navigation" }, this.props.Navigation),
                    React.createElement("div", { className: "ms-Grid-col ms-sm12 ms-md12 ms-lg9 ms-xl10", key: "content" }, this.props.Body)
                ],
                !this.props.Navigation &&
                    React.createElement("div", { className: "ms-Grid-col ms-sm12" }, this.props.Body)),
            this.props.Footer &&
                React.createElement("div", { className: "ms-Grid-row" },
                    React.createElement("div", { className: "ms-Grid-col ms-sm12" }, this.props.Footer)));
        renderElement = this.props.IncludeFabricElement ? React.createElement(office_ui_fabric_react_1.Fabric, null, content) : content;
        return renderElement;
    };
    return BasePage;
}(React.PureComponent));
exports.BasePage = BasePage;


/***/ }),

/***/ 332:
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
var react_router_dom_1 = __webpack_require__(/*! react-router-dom */ 82);
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

/***/ 368:
/*!*******************************************************!*\
  !*** multi ./src/global/components/pages/initApp.tsx ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/global/components/pages/initApp.tsx */369);


/***/ }),

/***/ 369:
/*!*************************************************!*\
  !*** ./src/global/components/pages/initApp.tsx ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ReactDOM = __webpack_require__(/*! react-dom */ 55);
var React = __webpack_require__(/*! react */ 1);
var globalApplication_1 = __webpack_require__(/*! ./globalApplication */ 384);
var react_router_dom_1 = __webpack_require__(/*! react-router-dom */ 82);
var icons_1 = __webpack_require__(/*! @uifabric/icons */ 333);
icons_1.initializeIcons();
window.onload = function () {
    ReactDOM.render(React.createElement(react_router_dom_1.HashRouter, null,
        React.createElement(globalApplication_1.GlobalApplication, { requestUrl: "" })), document.getElementById("reactRoot"));
};


/***/ }),

/***/ 384:
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
var react_router_dom_1 = __webpack_require__(/*! react-router-dom */ 82);
var application_1 = __webpack_require__(/*! ./application */ 406);
var application_2 = __webpack_require__(/*! ../../../projects/yeelight/components/pages/application */ 231);
var application_3 = __webpack_require__(/*! ../../../projects/vacuumRoboter/components/pages/application */ 846);
var application_4 = __webpack_require__(/*! ../../../projects/aldi/components/pages/application */ 847);
var sensors_1 = __webpack_require__(/*! ../../../projects/xiaomi/components/pages/sensors */ 305);
var gateways_1 = __webpack_require__(/*! ../../../projects/xiaomi/components/pages/gateways */ 328);
var NotFoundPage_1 = __webpack_require__(/*! ../../components/simple/NotFoundPage */ 852);
var Routing_1 = __webpack_require__(/*! ../simple/Routing */ 332);
var basePage_1 = __webpack_require__(/*! ../container/basePage */ 331);
var systeminfo_1 = __webpack_require__(/*! ../../../projects/system/components/pages/systeminfo */ 329);
var GlobalApplication = (function (_super) {
    __extends(GlobalApplication, _super);
    function GlobalApplication(props) {
        return _super.call(this, props) || this;
    }
    GlobalApplication.prototype.componentDidMount = function () {
        document.title = "Web-Application by Florian Hoffmann";
        console.log("componentDidMount Application");
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
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement(react_router_dom_1.Link, { to: "/", replace: true }, "\u00DCbersicht")),
                    React.createElement("li", null,
                        React.createElement(react_router_dom_1.Link, { to: "/system", replace: true }, "System-Informationen")),
                    React.createElement("li", null,
                        React.createElement(react_router_dom_1.Link, { to: "/light", replace: true }, "Yeelight")),
                    React.createElement("li", null,
                        React.createElement(react_router_dom_1.Link, { to: "/sensors", replace: true }, "Sensoren")),
                    React.createElement("li", null,
                        React.createElement(react_router_dom_1.Link, { to: "/gateways", replace: true }, "Gateways")),
                    React.createElement("li", null,
                        React.createElement(react_router_dom_1.Link, { to: "/aldi", replace: true }, "Aldi")),
                    React.createElement("li", null,
                        React.createElement(react_router_dom_1.Link, { to: "/vacuum", replace: true }, "Vacuum")))) }));
    };
    return GlobalApplication;
}(React.Component));
exports.GlobalApplication = GlobalApplication;


/***/ }),

/***/ 406:
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
var application_1 = __webpack_require__(/*! ../../../projects/yeelight/components/pages/application */ 231);
var sensors_1 = __webpack_require__(/*! ../../../projects/xiaomi/components/pages/sensors */ 305);
var gateways_1 = __webpack_require__(/*! ../../../projects/xiaomi/components/pages/gateways */ 328);
var office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 29);
var PivotItem_1 = __webpack_require__(/*! office-ui-fabric-react/lib/components/Pivot/PivotItem */ 180);
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

/***/ 426:
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
var office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 29);
var Panel_1 = __webpack_require__(/*! ../../../../global/components/simple/Panel */ 120);
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

/***/ 708:
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
var office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 29);
var Panel_1 = __webpack_require__(/*! ../../../global/components/simple/Panel */ 120);
var react_1 = __webpack_require__(/*! react */ 1);
var BaseWeatherSensorChart_1 = __webpack_require__(/*! ./BaseWeatherSensorChart */ 709);
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

/***/ 709:
/*!*****************************************************************!*\
  !*** ./src/global/components/simple/BaseWeatherSensorChart.tsx ***!
  \*****************************************************************/
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
var office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 29);
var axios_1 = __webpack_require__(/*! axios */ 71);
var react_chartjs_2_1 = __webpack_require__(/*! react-chartjs-2 */ 306);
var date_1 = __webpack_require__(/*! ../../../helper/date */ 327);
var options = [
    React.createElement("option", { value: "1", key: "k1" }, "Heute"),
    React.createElement("option", { value: "2", key: "k2" }, "Letzte Woche"),
    React.createElement("option", { value: "3", key: "k3" }, "Alle"),
    React.createElement("option", { value: "4", key: "k4" }, "Letzten 2 Tage")
];
var BaseWeatherSensorChart = (function (_super) {
    __extends(BaseWeatherSensorChart, _super);
    function BaseWeatherSensorChart(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            sensorData: undefined,
            temporarySensorData: undefined,
            isError: false,
            selectedRange: "1"
        };
        _this.dateRangeSelectionChanged = _this.dateRangeSelectionChanged.bind(_this);
        return _this;
    }
    BaseWeatherSensorChart.prototype.filterDataBySelectedDateRange = function (itemArray, selectedRange) {
        var items = [];
        itemArray.forEach(function (row) {
            if (!row.timestamp && !row.insertTime)
                return;
            var itemCreationDate = new Date(row.timestam || row.insertTime);
            var itemCreationDateString = date_1.getGermanDateString(itemCreationDate);
            var calculatedDate = new Date();
            switch (selectedRange) {
                case "1":
                    if (date_1.getGermanDateString(new Date()) === itemCreationDateString) {
                        items.push(row);
                    }
                    break;
                case "2":
                    calculatedDate = date_1.addDays(calculatedDate, -7, true);
                    if (itemCreationDate.getTime() >= calculatedDate.getTime()) {
                        items.push(row);
                    }
                    break;
                case "3":
                    items.push(row);
                    break;
                case "4":
                    calculatedDate = date_1.addDays(calculatedDate, -2, true);
                    if (itemCreationDate.getTime() >= calculatedDate.getTime()) {
                        items.push(row);
                    }
                    break;
                default:
                    console.log("getDataBySelectedDateRange", "value not found...", selectedRange);
            }
        });
        return items;
    };
    BaseWeatherSensorChart.prototype.getChartData = function (defaultData, selectedRange) {
        var dataRows = defaultData;
        dataRows = this.filterDataBySelectedDateRange(dataRows, selectedRange);
        var data = { datasets: [], labels: [] };
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
            if (!row.timestamp && !row.insertTime)
                return;
            labels.push(date_1.getGermanDateString(new Date(row.timestam || row.insertTime)));
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
                pointRadius: 2,
                pointHitRadius: 10,
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
                pointRadius: 2,
                pointHitRadius: 10,
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
                pointRadius: 2,
                pointHitRadius: 10,
                fill: false
            });
        }
        return data;
    };
    BaseWeatherSensorChart.prototype.componentDidMount = function () {
        var _this = this;
        axios_1.default.get("/api/sensors/" + this.props.sensorInformations.id + "/data")
            .then(function (dataResult) {
            if (!dataResult.data) {
                return;
            }
            if (!dataResult.data.items || dataResult.data.items.lenght === 0) {
                return;
            }
            var dataRows = _this.getChartData(dataResult.data.items, _this.state.selectedRange);
            _this.setState({
                sensorData: dataResult.data.items,
                temporarySensorData: dataRows
            });
        })
            .catch(function (error) {
            _this.setState({ isError: true });
        });
    };
    BaseWeatherSensorChart.prototype.dateRangeSelectionChanged = function (event) {
        var index = event.target.selectedIndex;
        var selectedOptionValue = event.target.options[index].value;
        var items = this.getChartData(this.state.sensorData, selectedOptionValue);
        this.setState({
            selectedRange: selectedOptionValue,
            temporarySensorData: items
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
        return (React.createElement("div", { className: "ms-Grid-row" },
            React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                React.createElement("div", { className: "ms-Grid-row" },
                    React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                        React.createElement(office_ui_fabric_react_1.Label, null, "Zeitraum"),
                        React.createElement("select", { onChange: this.dateRangeSelectionChanged, value: this.state.selectedRange }, options))),
                React.createElement("div", { className: "ms-Grid-row" },
                    React.createElement("div", { className: "ms-Grid-col ms-sm12" }, !this.state.sensorData ? ("Keine Daten vorhanden...") : (React.createElement(react_chartjs_2_1.Line, { data: this.state.temporarySensorData })))))));
    };
    return BaseWeatherSensorChart;
}(React.Component));
exports.BaseWeatherSensorChart = BaseWeatherSensorChart;


/***/ }),

/***/ 845:
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
var office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 29);
var Panel_1 = __webpack_require__(/*! ../../../global/components/simple/Panel */ 120);
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

/***/ 846:
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

/***/ 847:
/*!************************************************************!*\
  !*** ./src/projects/aldi/components/pages/application.tsx ***!
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
var office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 29);
var manageRoute_1 = __webpack_require__(/*! ./manageRoute */ 848);
var enums_1 = __webpack_require__(/*! ../../../../enums/enums */ 330);
var ToolTip_1 = __webpack_require__(/*! ../../../../global/components/simple/ToolTip */ 851);
var Application = (function (_super) {
    __extends(Application, _super);
    function Application(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            modalContent: undefined,
            showModal: false,
            isCalloutVisible: false,
            callOutContent: undefined
        };
        _this.addRouteClick = _this.addRouteClick.bind(_this);
        _this.closeModal = _this.closeModal.bind(_this);
        _this.showCallOut = _this.showCallOut.bind(_this);
        _this.hideCallOut = _this.hideCallOut.bind(_this);
        return _this;
    }
    Application.prototype.componentDidMount = function () {
        document.title = "Aldi Hauptseite";
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
    Application.prototype.render = function () {
        return (React.createElement("div", { className: "ms-Grid-row" },
            this.state.modalContent &&
                this.state.showModal && (React.createElement("div", { className: "ms-Grid-col ms-sm12" }, this.state.modalContent)),
            this.state.showModal === false && (React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                React.createElement("div", { className: "ms-Grid-row" },
                    React.createElement("div", { className: "ms-Grid-col ms-sm12 ms-lg4" },
                        React.createElement("div", { className: "custom-cmd-button" },
                            React.createElement(office_ui_fabric_react_1.CommandBarButton, { "data-info-title": "Route erfassen", "data-info-desc": "Erstellt eine neue Route für Aldi", iconProps: { iconName: "Add" }, text: "Route erfassen", onClick: this.addRouteClick, onMouseEnter: this.showCallOut, onMouseLeave: this.hideCallOut }))),
                    React.createElement("div", { className: "ms-Grid-col ms-sm12 ms-lg4" },
                        React.createElement("div", { className: "custom-cmd-button" },
                            React.createElement(office_ui_fabric_react_1.CommandBarButton, { iconProps: { iconName: "Add" }, text: "Filialen erfassen" })))))),
            this.state.isCalloutVisible && (React.createElement("div", null,
                React.createElement(office_ui_fabric_react_1.Callout, { role: "alertdialog", ariaLabelledBy: "callout-label-2", className: "ms-CalloutExample-callout", gapSpace: 0, target: this.targetCallOutElement, onDismiss: this.hideCallOut, setInitialFocus: true }, this.state.callOutContent)))));
    };
    return Application;
}(React.Component));
exports.Application = Application;


/***/ }),

/***/ 848:
/*!************************************************************!*\
  !*** ./src/projects/aldi/components/pages/manageRoute.tsx ***!
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
var office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 29);
var enums_1 = __webpack_require__(/*! ../../../../enums/enums */ 330);
var basePage_1 = __webpack_require__(/*! ../../../../global/components/container/basePage */ 331);
var ButtonRow_1 = __webpack_require__(/*! ../../../../global/components/simple/ButtonRow */ 849);
var Panel_1 = __webpack_require__(/*! ../../../../global/components/simple/Panel */ 120);
var NumberTextField_1 = __webpack_require__(/*! ../../../../global/components/simple/NumberTextField */ 850);
var date_1 = __webpack_require__(/*! ../../../../helper/date */ 327);
var ManageRoute = (function (_super) {
    __extends(ManageRoute, _super);
    function ManageRoute(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            filialen: [],
            routenfahrten: [],
            ausgaben: [],
            googleMapsLink: ""
        };
        _this.cancelClick = _this.cancelClick.bind(_this);
        _this.saveClick = _this.saveClick.bind(_this);
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
    ManageRoute.prototype.saveClick = function () {
        console.log("Save Click");
        this.props.onExitPage();
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
    ManageRoute.prototype.render = function () {
        var _this = this;
        console.log("render ManageRoute");
        return (React.createElement(basePage_1.BasePage, { IncludeFabricElement: false, Body: React.createElement("div", { className: "ms-Grid" },
                React.createElement("div", { className: "ms-Grid-row" },
                    React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                        React.createElement(Panel_1.Panel, { headerText: "Routeninformationen", className: "custom-padding-bottom-10px" },
                            React.createElement("div", { className: "ms-Grid-row" },
                                React.createElement("div", { className: "ms-Grid-col ms-sm2 ms-lg1" },
                                    React.createElement(office_ui_fabric_react_1.Label, null,
                                        React.createElement(office_ui_fabric_react_1.Link, { href: this.state.googleMapsLink, disabled: !this.state.googleMapsLink, target: "_blank" }, "Maps"))),
                                React.createElement("div", { className: "ms-Grid-col ms-sm10" },
                                    React.createElement(office_ui_fabric_react_1.TextField, { placeholder: "Link zu Google Maps", value: this.state.googleMapsLink, onChanged: function (text) {
                                            _this.setState({ googleMapsLink: text });
                                        } })))))),
                React.createElement("div", { className: "ms-Grid-row" },
                    React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                        React.createElement(Panel_1.Panel, { headerText: "Ausgaben", className: "custom-padding-bottom-10px", headerControls: React.createElement(office_ui_fabric_react_1.ActionButton, { "data-automation-id": "Add Ausgabe", iconProps: { iconName: "Add" }, onClick: function () {
                                    var ns = __assign({}, _this.state);
                                    ns.ausgaben.push({ title: "", value: 0 });
                                    _this.setState(ns);
                                } }) },
                            (!this.state.ausgaben || this.state.ausgaben.length < 1) && (React.createElement("div", { className: "ms-font-xl ms-fontColor-themePrimary" }, "Es wurden bisher keine Ausgaben erfasst")),
                            this.state.ausgaben.map(function (ausgabenWert, index) {
                                return (React.createElement(Panel_1.Panel, { key: "ausgabe_" + index, headerText: "Ausgabe " + (index + 1), className: "custom-padding-bottom-10px", headerControls: React.createElement(office_ui_fabric_react_1.ActionButton, { "data-info-title": "Ausgabe " + (index + 1), "data-info-desc": "Ausgabe " + (index + 1), iconProps: {
                                            iconName: "Delete",
                                            className: "img-font-size-large"
                                        }, onClick: function () {
                                            var ns = __assign({}, _this.state);
                                            ns.ausgaben.splice(index, 1);
                                            _this.setState(ns);
                                        } }) }, React.createElement("div", { className: "ms-Grid-row" },
                                    React.createElement("div", { className: "ms-Grid-col ms-sm12 ms-lg6 " },
                                        React.createElement(office_ui_fabric_react_1.TextField, { placeholder: "Ausgabenbeschreibung", required: true, label: "Beschreibung der Ausgabe", value: ausgabenWert.title })),
                                    React.createElement("div", { className: "ms-Grid-col ms-sm12 ms-lg6" },
                                        React.createElement(NumberTextField_1.NumberTextField, { placeholder: "Ausgaben in Euro", label: "Wert der Ausgabe", required: true, numberValue: ausgabenWert.value, suffix: " Euro" })))));
                            })))),
                React.createElement("div", { className: "ms-Grid-row" },
                    React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                        React.createElement(Panel_1.Panel, { headerText: "Routenfahr-Daten verwalten", className: "custom-padding-bottom-10px", headerControls: React.createElement(office_ui_fabric_react_1.ActionButton, { "data-automation-id": "Add Routenfahrt", iconProps: { iconName: "Add" }, onClick: function () {
                                    var fahrten = _this.state.routenfahrten.concat([
                                        new Date()
                                    ]);
                                    _this.setState({ routenfahrten: fahrten });
                                } }) },
                            (!this.state.routenfahrten ||
                                this.state.routenfahrten.length < 1) && (React.createElement("div", { className: "ms-font-xl ms-fontColor-themePrimary" }, "Es wurden bisher keine Fahrdaten erfasst")),
                            this.state.routenfahrten.map(function (fahrt, index) {
                                return (React.createElement("div", { className: "ms-Grid-row", key: "route_" + index },
                                    React.createElement("div", { className: "ms-Grid-col ms-sm2 ms-md1 ms-lg1" },
                                        React.createElement(office_ui_fabric_react_1.Label, { className: "ms-fontSize-l ms-textAlignCenter" }, index + 1)),
                                    React.createElement("div", { className: "ms-Grid-col ms-sm8 ms-md8 ms-lg6" },
                                        React.createElement(office_ui_fabric_react_1.DatePicker, { placeholder: "Bitte Fahrdatum auswählen", showWeekNumbers: true, showMonthPickerAsOverlay: true, allowTextInput: false, formatDate: date_1.getGermanDateString, firstDayOfWeek: 1, key: "fahrt" + index, value: fahrt, onSelectDate: function (date) {
                                                var ns = __assign({}, _this.state);
                                                ns.routenfahrten[index] = date;
                                                _this.setState(ns);
                                            } })),
                                    React.createElement("div", { className: "ms-Grid-col ms-sm2 ms-md2 ms-lg1" },
                                        React.createElement(office_ui_fabric_react_1.ActionButton, { "data-info-title": "Fahrdatum entfernen", "data-info-desc": "Löscht das Fahrdatum", iconProps: {
                                                iconName: "Delete",
                                                className: "img-font-size-large"
                                            }, onClick: function () {
                                                var ns = __assign({}, _this.state);
                                                ns.routenfahrten.splice(index, 1);
                                                _this.setState(ns);
                                            } }))));
                            })))),
                React.createElement("div", { className: "ms-Grid-row" },
                    React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                        React.createElement(Panel_1.Panel, { headerText: "Fahrten verwalten", className: "custom-padding-bottom-10px", headerControls: React.createElement(office_ui_fabric_react_1.ActionButton, { "data-automation-id": "Add Ausgabe", iconProps: { iconName: "Add" }, onClick: function () {
                                    var ns = __assign({}, _this.state);
                                    ns.filialen.push({
                                        Ausgaben: 0,
                                        Einnahmen: 0,
                                        Ort: "",
                                        Pkz: 0,
                                        Plz: 0,
                                        Straße: "",
                                        Testnummer: 0
                                    });
                                    _this.setState(ns);
                                } }) },
                            (!this.state.filialen || this.state.filialen.length < 1) && (React.createElement("div", { className: "ms-font-xl ms-fontColor-themePrimary" }, "Es wurden bisher keine Filialen erfasst")),
                            this.state.filialen.map(function (filiale, index) {
                                return (React.createElement("div", { className: "ms-Grid-row", key: "fahrt_" + index },
                                    React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                                        React.createElement(Panel_1.Panel, { headerText: "Fahrt " + (index + 1), headerControls: React.createElement(office_ui_fabric_react_1.ActionButton, { "data-info-title": "Filiale entfernen", "data-info-desc": "Löscht die Filiale", iconProps: { iconName: "Delete" }, onClick: function () {
                                                    var ns = __assign({}, _this.state);
                                                    ns.filialen.splice(index, 1);
                                                    _this.setState(ns);
                                                } }) },
                                            React.createElement("div", { className: "ms-Grid-row" },
                                                React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                                                    React.createElement("select", { style: { padding: "10px", width: "100%" } }, _this.getRouteSelectOptions())),
                                                React.createElement("div", { className: "ms-Grid-col ms-sm12 ms-lg5" },
                                                    React.createElement(office_ui_fabric_react_1.TextField, { required: true, placeholder: "Straße", label: "Straße", value: filiale.Straße })),
                                                React.createElement("div", { className: "ms-Grid-col ms-sm3 ms-md3 ms-lg2" },
                                                    React.createElement(NumberTextField_1.NumberTextField, { required: true, placeholder: "Plz", label: "Plz", numberValue: filiale.Plz })),
                                                React.createElement("div", { className: "ms-Grid-col ms-sm9 ms-md9 ms-lg5" },
                                                    React.createElement(office_ui_fabric_react_1.TextField, { required: true, placeholder: "Ort", label: "Ort", value: filiale.Ort })),
                                                React.createElement("div", { className: "ms-Grid-col ms-sm9 ms-md10" },
                                                    React.createElement(NumberTextField_1.NumberTextField, { required: true, placeholder: "Testnummer", label: "Testnummer", numberValue: filiale.Testnummer })),
                                                React.createElement("div", { className: "ms-Grid-col ms-sm3 ms-md2" },
                                                    React.createElement(NumberTextField_1.NumberTextField, { required: true, placeholder: "Prüfkennziffer", label: "Pkz.", numberValue: filiale.Pkz })),
                                                React.createElement("div", { className: "ms-Grid-col ms-sm6 ms-md6 ms-lg6" },
                                                    React.createElement(NumberTextField_1.NumberTextField, { placeholder: "Einnahmen", label: "Einnahmen", numberValue: filiale.Einnahmen, suffix: " €" })),
                                                React.createElement("div", { className: "ms-Grid-col ms-sm6 ms-md6 ms-lg6" },
                                                    React.createElement(NumberTextField_1.NumberTextField, { placeholder: "Ausgaben", label: "Ausgaben", numberValue: filiale.Ausgaben, suffix: " €" })))))));
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
                            } })))), Header: React.createElement("div", { className: "ms-font-xxl ms-textAlignCenter" }, "Route verwalten") }));
    };
    return ManageRoute;
}(React.Component));
exports.ManageRoute = ManageRoute;


/***/ }),

/***/ 849:
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
var office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 29);
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

/***/ 850:
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
var office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 29);
var NumberTextField = (function (_super) {
    __extends(NumberTextField, _super);
    function NumberTextField(props) {
        var _this = _super.call(this, props) || this;
        _this.validateNumber = function (value) {
            return isNaN(Number(value))
                ? "The value should be a number, actual is " + value + "."
                : "";
        };
        return _this;
    }
    NumberTextField.prototype.render = function () {
        var v = this.props.numberValue || this.props.value || "";
        return (React.createElement(office_ui_fabric_react_1.TextField, { value: v.toString(), placeholder: this.props.placeholder, type: "number", prefix: this.props.prefix, suffix: this.props.suffix, required: this.props.required, label: this.props.label, onGetErrorMessage: this.validateNumber }));
    };
    return NumberTextField;
}(React.Component));
exports.NumberTextField = NumberTextField;


/***/ }),

/***/ 851:
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

/***/ 852:
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
var react_router_dom_1 = __webpack_require__(/*! react-router-dom */ 82);
var Routing_1 = __webpack_require__(/*! ./Routing */ 332);
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

},[368]);
//# sourceMappingURL=application.js.map