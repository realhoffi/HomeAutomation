webpackJsonp([0],{

/***/ 132:
/*!****************************************************!*\
  !*** ./src/global/components/simple/ButtonRow.tsx ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ 1);
const office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 14);
class ButtonRow extends React.PureComponent {
    render() {
        return (React.createElement("div", { className: "ms-Grid-row" },
            React.createElement("div", { className: "ms-Grid-col ms-sm12 ms-textAlignRight" },
                React.createElement(office_ui_fabric_react_1.ActionButton, { "data-automation-id": "save", key: "save_btn_" + Date.now(), iconProps: { iconName: "Save" }, disabled: this.props.saveButtonProps.disabled, checked: this.props.saveButtonProps.checked, onClick: this.props.saveButtonProps.onClickFunc }, this.props.saveButtonProps.text),
                React.createElement(office_ui_fabric_react_1.ActionButton, { "data-automation-id": "cancel", key: "cancel_btn_" + Date.now(), iconProps: { iconName: "Cancel" }, disabled: this.props.cancelButtonProps.disabled, checked: this.props.cancelButtonProps.checked, onClick: this.props.cancelButtonProps.onClickFunc }, this.props.cancelButtonProps.text))));
    }
}
exports.ButtonRow = ButtonRow;


/***/ }),

/***/ 133:
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
    return new Promise((resolve, reject) => {
        let messages = [];
        if (!promises || promises.length === 0) {
            resolve(messages);
            return;
        }
        let count = 0;
        promises.forEach((promise, index) => {
            messages[index] = undefined;
            promise
                .then(data => {
                messages[index] = { isError: false, data: data };
                count++;
                if (count === promises.length) {
                    resolve(messages);
                    return;
                }
            })
                .catch(e => {
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

/***/ 187:
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

/***/ 197:
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

/***/ 238:
/*!****************************************************************!*\
  !*** ./src/projects/yeelight/components/pages/application.tsx ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise) {
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ 1);
const axios_1 = __webpack_require__(/*! axios */ 30);
const timers_1 = __webpack_require__(/*! timers */ 87);
const Yeelight_1 = __webpack_require__(/*! ../simple/Yeelight */ 461);
const react_1 = __webpack_require__(/*! react */ 1);
const intToRGB = __webpack_require__(/*! int-to-rgb */ 187);
class Application extends React.Component {
    constructor(props) {
        super(props);
        this.isMountedFinished = false;
        this.state = { lights: [], isInitialized: false, intervalId: undefined };
        this.colorChangedOnLight = this.colorChangedOnLight.bind(this);
        this.powerChangedOnLight = this.powerChangedOnLight.bind(this);
        this.colorSchemaChangedOnLight = this.colorSchemaChangedOnLight.bind(this);
        this.brightnessChangedOnLight = this.brightnessChangedOnLight.bind(this);
        this.colorTemperatureChangedOnLight = this.colorTemperatureChangedOnLight.bind(this);
        this.reloadLightInformations = this.reloadLightInformations.bind(this);
        this.loadDevices = this.loadDevices.bind(this);
    }
    componentDidMount() {
        document.title = "Yeelight Hauptseite";
        console.log("Yeelight componentDidMount");
        this.loadDevices().then(() => {
            if (this.isMountedFinished === true) {
                this.setState({ isInitialized: true });
            }
        });
        let interval = timers_1.setInterval(this.loadDevices, 30000);
        this.setState({ intervalId: interval["_id"] });
        this.isMountedFinished = true;
    }
    componentWillUnmount() {
        clearInterval(this.state.intervalId);
        this.isMountedFinished = false;
    }
    loadDevices() {
        if (!this.isMountedFinished) {
            Promise.resolve();
        }
        return axios_1.default.get("/api/lights/details")
            .then(results => {
            this.setState({ lights: results.data["lights"] });
        })
            .catch(error => { });
    }
    reloadLightInformations() {
        axios_1.default.get("/api/lights/details").then(result => {
            this.setState({ lights: result.data.lights });
            let newState = Object.assign({}, this.state);
        });
    }
    colorChangedOnLight(lightInformation, color) {
        let rgb = color.r * 65536 + color.g * 256 + color.b;
        axios_1.default.post("/api/lights/" + lightInformation.id + "/color/" + rgb).then(this.reloadLightInformations);
    }
    powerChangedOnLight(lightInformation) {
        axios_1.default.post("/api/lights/" + lightInformation.id + "/power").then(this.reloadLightInformations);
    }
    colorTemperatureChangedOnLight(lightInformation, colorTemperature) {
        axios_1.default.post("/api/lights/" + lightInformation.id + "/temperature/" + colorTemperature).then(this.reloadLightInformations);
    }
    colorSchemaChangedOnLight(lightInformation, color, brightness) {
        let rgb = color.r * 65536 + color.g * 256 + color.b;
        Promise.all([
            axios_1.default.post("/api/lights/" + lightInformation.id + "/brightness/" + brightness),
            axios_1.default.post("/api/lights/" + lightInformation.id + "/color/" + rgb)
        ]).then(this.reloadLightInformations);
    }
    brightnessChangedOnLight(lightInformation, brightness) {
        axios_1.default.post("/api/lights/" + lightInformation.id + "/brightness/" + brightness).then(this.reloadLightInformations);
    }
    render() {
        if (!this.state.isInitialized) {
            return false;
        }
        console.log("Yewelight render");
        return (React.createElement("div", { className: "ms-Grid-row" },
            React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                (!this.state.lights || this.state.lights.length < 1) && (React.createElement("h1", { className: "ms-font-xl ms-fontColor-themePrimary" }, "Keine Lampen gefunden")),
                React.createElement("div", { className: "ms-Grid-row" }, this.state.lights &&
                    this.state.lights.length > 0 &&
                    this.state.lights.map((light, index) => {
                        return (React.createElement("div", { className: "ms-Grid-col ms-sm12 ms-lg6 ms-xl3", key: "light_container_" + index },
                            React.createElement(react_1.Fragment, null,
                                React.createElement(Yeelight_1.Yeelight, { lightInformation: light, id: index + 22, onBrightnessChanged: this.brightnessChangedOnLight, onColorChanged: this.colorChangedOnLight, onColorSchemaChanged: this.colorSchemaChangedOnLight, onPowerChanged: this.powerChangedOnLight, onColorTemperatureChanged: this.colorTemperatureChangedOnLight }))));
                    })))));
    }
}
exports.Application = Application;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! bluebird */ 18)))

/***/ }),

/***/ 338:
/*!**********************************************************!*\
  !*** ./src/projects/xiaomi/components/pages/sensors.tsx ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise) {
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ 1);
const axios_1 = __webpack_require__(/*! axios */ 30);
const BaseWeatherSensor_1 = __webpack_require__(/*! ../../../../global/components/simple/BaseWeatherSensor */ 759);
const timers_1 = __webpack_require__(/*! timers */ 87);
const intToRGB = __webpack_require__(/*! int-to-rgb */ 187);
class Application extends React.Component {
    constructor(props) {
        super(props);
        this.isMountedFinished = false;
        this.state = { sensors: [], isInitialized: false, intervalId: undefined };
        this.loadDevices = this.loadDevices.bind(this);
    }
    componentDidMount() {
        document.title = "Yeelight Hauptseite";
        console.log("Yeelight componentDidMount");
        this.loadDevices().then(() => {
            if (this.isMountedFinished === true) {
                this.setState({ isInitialized: true });
            }
        });
        let interval = timers_1.setInterval(this.loadDevices, 30000);
        this.setState({ intervalId: interval["_id"] });
        this.isMountedFinished = true;
    }
    componentWillUnmount() {
        clearInterval(this.state.intervalId);
        this.isMountedFinished = false;
    }
    loadDevices() {
        if (!this.isMountedFinished) {
            Promise.resolve();
        }
        return axios_1.default.get("/api/sensors").then(result => {
            this.setState({ sensors: result.data["sensors"] });
        });
    }
    render() {
        if (!this.state.isInitialized) {
            return false;
        }
        return (React.createElement("div", { className: "ms-Grid-row" },
            React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                (!this.state.sensors || this.state.sensors.length < 1) && (React.createElement("h1", { className: "ms-font-xl ms-fontColor-themePrimary" }, "Keine Sensoren gefunden")),
                React.createElement("div", { className: "ms-Grid-row" }, this.state.sensors &&
                    this.state.sensors.length > 0 &&
                    this.state.sensors.map((sensor, index) => {
                        return (React.createElement("div", { className: "ms-Grid-col ms-sm12 ms-lg6 ms-xl3", key: "sensor_container_" + index },
                            React.createElement(BaseWeatherSensor_1.BaseWeatherSensor, { id: index, sensorInformations: sensor })));
                    })))));
    }
}
exports.Application = Application;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! bluebird */ 18)))

/***/ }),

/***/ 359:
/*!***********************************************************!*\
  !*** ./src/projects/xiaomi/components/pages/gateways.tsx ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise) {
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ 1);
const axios_1 = __webpack_require__(/*! axios */ 30);
const BaseLight_1 = __webpack_require__(/*! ../../../../global/components/simple/BaseLight */ 906);
const timers_1 = __webpack_require__(/*! timers */ 87);
const intToRGB = __webpack_require__(/*! int-to-rgb */ 187);
class Application extends React.Component {
    constructor(props) {
        super(props);
        this.isMountedFinished = false;
        this.state = {
            gateways: [],
            gatewayLights: [],
            isInitialized: false,
            intervalId: undefined
        };
        this.loadDevices = this.loadDevices.bind(this);
    }
    componentDidMount() {
        document.title = "Yeelight Hauptseite";
        console.log("Yeelight componentDidMount");
        this.loadDevices().then(() => {
            if (this.isMountedFinished === true) {
                this.setState({ isInitialized: true });
            }
        });
        let interval = timers_1.setInterval(this.loadDevices, 30000);
        this.setState({ intervalId: interval["_id"] });
        this.isMountedFinished = true;
    }
    componentWillUnmount() {
        clearInterval(this.state.intervalId);
        this.isMountedFinished = false;
    }
    loadDevices() {
        if (!this.isMountedFinished) {
            Promise.resolve();
        }
        return axios_1.default.get("/api/gateways")
            .then(results => {
            let gws = results.data["gateways"];
            let gwLights = gws.map(this.mapGatewayToLightModel);
            this.setState({ gateways: gws, gatewayLights: gwLights });
        })
            .catch(error => { });
    }
    mapGatewayToLightModel(gwModel) {
        return {
            id: gwModel.id,
            ip: gwModel.ip,
            power: gwModel.power,
            brightness: gwModel.brightness,
            name: gwModel.name,
            colorTemperature: gwModel.illuminance,
            rgb: gwModel.rgb
        };
    }
    render() {
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
                    this.state.gatewayLights.map((gw, index) => {
                        return (React.createElement("div", { className: "ms-Grid-col ms-sm12 ms-lg6 ms-xl3", key: "gwr_" + index },
                            React.createElement(BaseLight_1.BaseLight, { lightInformation: gw, id: index, onBrightnessChanged: (lightInformation, brightness) => {
                                    axios_1.default.post("/api/gateways/" +
                                        lightInformation.id +
                                        "/brightness/" +
                                        brightness).then(this.loadDevices);
                                }, onColorChanged: (lightInformation, color) => {
                                    axios_1.default.post("/api/gateways/" + lightInformation.id + "/color", { color }).then(this.loadDevices);
                                }, onColorSchemaChanged: (lightInformation, color, brightness) => {
                                    axios_1.default.post("/api/gateways/" + lightInformation.id + "/color", { color })
                                        .then(() => {
                                        return axios_1.default.post("/api/gateways/" +
                                            lightInformation.id +
                                            "/brightness/" +
                                            brightness);
                                    })
                                        .then(this.loadDevices);
                                }, onPowerChanged: (lightInformation) => {
                                    axios_1.default.post("/api/gateways/" + lightInformation.id + "/power").then(this.loadDevices);
                                } })));
                    })))));
    }
}
exports.Application = Application;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! bluebird */ 18)))

/***/ }),

/***/ 360:
/*!*************************************************************!*\
  !*** ./src/projects/system/components/pages/systeminfo.tsx ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise) {
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ 1);
const office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 14);
const axios_1 = __webpack_require__(/*! axios */ 30);
const timers_1 = __webpack_require__(/*! timers */ 87);
const react_1 = __webpack_require__(/*! react */ 1);
class SystemInfo extends React.Component {
    constructor(props) {
        super(props);
        this.isMountedFinished = false;
        this.state = {
            systemInformation: undefined,
            isInitialized: false,
            intervalId: undefined
        };
        this.loadDevices = this.loadDevices.bind(this);
    }
    componentDidMount() {
        document.title = "System Informationen";
        console.log("SystemInfo componentDidMount");
        this.loadDevices().then(() => {
            if (this.isMountedFinished === true) {
                this.setState({ isInitialized: true });
            }
        });
        let interval = timers_1.setInterval(this.loadDevices, 10000);
        this.setState({ intervalId: interval["_id"] });
        this.isMountedFinished = true;
    }
    componentWillUnmount() {
        clearInterval(this.state.intervalId);
        this.isMountedFinished = false;
    }
    loadDevices() {
        if (!this.isMountedFinished) {
            Promise.resolve();
        }
        return axios_1.default.get("/api/system").then(result => {
            this.setState({ systemInformation: result.data["system"] });
        });
    }
    convertRamToMBString(ram) {
        if (isNaN(ram)) {
            return "-";
        }
        return (ram / 1024 / 1024).toFixed(0) + " MB";
    }
    getUptimeString(uptime) {
        if (isNaN(uptime)) {
            return "-";
        }
        let hr = Math.floor(uptime / 60 / 60);
        let days = (hr / 24).toFixed(2);
        return `${hr} Stunden (${days} Tage)`;
    }
    getLabelRowForProperty(label, value) {
        return (React.createElement("div", { className: "ms-Grid-row" },
            React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                React.createElement(office_ui_fabric_react_1.Label, { className: "ms-font-xl ms-fontColor-themePrimary" }, label),
                React.createElement("span", null, value))));
    }
    getValueFromSystemInfo() {
        return (React.createElement(react_1.Fragment, null,
            this.getLabelRowForProperty("Hostname: ", `${this.state.systemInformation.hostname} (${this.state.systemInformation.userName})`),
            this.getLabelRowForProperty("Total Memory: ", this.convertRamToMBString(Number(this.state.systemInformation.totalMemory))),
            this.getLabelRowForProperty("Free Memory: ", this.convertRamToMBString(Number(this.state.systemInformation.freeMemory))),
            this.getLabelRowForProperty("Uptime: ", this.getUptimeString(this.state.systemInformation.uptime)),
            this.getLabelRowForProperty("Plattform: ", `${this.state.systemInformation.platform} (${this.state.systemInformation.arch})`)));
    }
    render() {
        if (!this.state.isInitialized) {
            return false;
        }
        return (React.createElement("div", { className: "ms-Grid-row" },
            React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                !this.state.systemInformation && (React.createElement("h1", { className: "ms-font-xl ms-fontColor-themePrimary" }, "Keine System-Informationen gefunden")),
                this.state.systemInformation && (React.createElement("div", { className: "ms-Grid-row" },
                    React.createElement("div", { className: "ms-Grid-col ms-sm12 ms-lg6 ms-xl3", key: "sysinfo_" }, this.getValueFromSystemInfo()))))));
    }
}
exports.SystemInfo = SystemInfo;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! bluebird */ 18)))

/***/ }),

/***/ 361:
/*!******************************************************!*\
  !*** ./src/global/components/container/basePage.tsx ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ 1);
const office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 14);
class BasePage extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        console.log("render BasePage");
        let renderElement = null;
        let content = (React.createElement("div", { className: "ms-Grid" },
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
    }
}
exports.BasePage = BasePage;


/***/ }),

/***/ 362:
/*!**********************************************************!*\
  !*** ./src/global/components/simple/NumberTextField.tsx ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ 1);
const office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 14);
class NumberTextField extends React.Component {
    constructor(props) {
        super(props);
        this.validateNumber = function (value) {
            return isNaN(Number(value))
                ? "The value should be a number, actual is " + value + "."
                : "";
        };
        this.valueChanged = this.valueChanged.bind(this);
    }
    valueChanged(value) {
        let v = value.replace(",", ".");
        let n = parseFloat(v);
        n = isNaN(n) ? 0 : n;
        this.props.onChanged(n);
        if (this.props.numberValueChanged) {
            this.props.numberValueChanged(n);
        }
    }
    render() {
        let v = this.props.numberValue || this.props.value || "";
        return (React.createElement(office_ui_fabric_react_1.TextField, { value: v.toString(), placeholder: this.props.placeholder, type: "number", prefix: this.props.prefix, suffix: this.props.suffix, required: this.props.required, label: this.props.label, onGetErrorMessage: this.validateNumber, onChanged: this.valueChanged }));
    }
}
exports.NumberTextField = NumberTextField;


/***/ }),

/***/ 363:
/*!************************************************************!*\
  !*** ./src/projects/aldi/components/stateless/Filiale.tsx ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ 1);
const office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 14);
const NumberTextField_1 = __webpack_require__(/*! ../../../../global/components/simple/NumberTextField */ 362);
const Panel_1 = __webpack_require__(/*! ../../../../global/components/simple/Panel */ 62);
const date_1 = __webpack_require__(/*! ../../../../helper/date */ 79);
class Filiale extends React.Component {
    constructor(props) {
        super(props);
        this.fahrDatumChanged = this.fahrDatumChanged.bind(this);
        this.deleteClicked = this.deleteClicked.bind(this);
        this.pkzChanged = this.pkzChanged.bind(this);
        this.testnummerChanged = this.testnummerChanged.bind(this);
        this.ausgabenChanged = this.ausgabenChanged.bind(this);
        this.einnahmenChanged = this.einnahmenChanged.bind(this);
        this.ortChanged = this.ortChanged.bind(this);
        this.strasseChanged = this.strasseChanged.bind(this);
        this.plzChanged = this.plzChanged.bind(this);
    }
    fahrDatumChanged(event) {
        let index = event.target.selectedIndex;
        let value = event.target.options[index].value;
        this.props.onFahrdatumChanged(this.props.id, parseInt(value));
    }
    deleteClicked() {
        this.props.onDeleteClick(this.props.id);
    }
    pkzChanged(value) {
        this.props.onPkzChanged(this.props.id, value);
    }
    testnummerChanged(value) {
        this.props.onTestnummerChanged(this.props.id, value);
    }
    ausgabenChanged(value) {
        this.props.onAusgabenChanged(this.props.id, value);
    }
    einnahmenChanged(value) {
        this.props.onEinnahmenChanged(this.props.id, value);
    }
    ortChanged(value) {
        this.props.onOrtChanged(this.props.id, value);
    }
    strasseChanged(value) {
        this.props.onStrasseChanged(this.props.id, value);
    }
    plzChanged(value) {
        this.props.onPlzChanged(this.props.id, value);
    }
    render() {
        console.log("render Filiale");
        return (React.createElement("div", { className: "ms-Grid-row", key: "filiale_" + this.props.id },
            React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                React.createElement(Panel_1.Panel, { headerText: this.props.title, headerControls: this.props.enableDeleteBtn ? (React.createElement(office_ui_fabric_react_1.ActionButton, { "data-info-title": "Filiale entfernen", "data-info-desc": "L\u00F6scht die Filiale", iconProps: { iconName: "Delete" }, onClick: this.deleteClicked })) : null },
                    React.createElement("div", { className: "ms-Grid-row" },
                        React.createElement("div", { className: "ms-Grid-col ms-sm12 ms-md5" },
                            React.createElement("div", null,
                                React.createElement(office_ui_fabric_react_1.Label, null, "Routenfahrdatum"),
                                React.createElement("select", { className: "custom-ddl-control", onChange: this.fahrDatumChanged, value: this.props.filiale.fahrdatum || undefined }, this.props.fahrdaten.map((fahrtDatum, index) => {
                                    return (React.createElement("option", { key: "fahrt__" + index, value: fahrtDatum.getTime() }, date_1.getGermanDateString(fahrtDatum)));
                                })))),
                        React.createElement("div", { className: "ms-Grid-col ms-sm8 ms-md4" },
                            React.createElement(NumberTextField_1.NumberTextField, { required: true, placeholder: "Testnummer", label: "Testnummer", numberValue: this.props.filiale.testnummer, onChanged: this.testnummerChanged })),
                        React.createElement("div", { className: "ms-Grid-col ms-sm4 ms-md3" },
                            React.createElement(NumberTextField_1.NumberTextField, { required: true, placeholder: "Pr\u00FCfkennziffer", label: "Pkz.", numberValue: this.props.filiale.pkz, onChanged: this.pkzChanged })),
                        React.createElement("div", { className: "ms-Grid-col ms-sm12 ms-lg5" },
                            React.createElement(office_ui_fabric_react_1.TextField, { required: true, placeholder: "Stra\u00DFe", label: "Stra\u00DFe", value: this.props.filiale.strasse, onChanged: this.strasseChanged })),
                        React.createElement("div", { className: "ms-Grid-col ms-sm4 ms-md3 ms-lg2" },
                            React.createElement(NumberTextField_1.NumberTextField, { required: true, placeholder: "Plz", label: "Plz", numberValue: this.props.filiale.plz, onChanged: this.plzChanged })),
                        React.createElement("div", { className: "ms-Grid-col ms-sm8 ms-md9 ms-lg5" },
                            React.createElement(office_ui_fabric_react_1.TextField, { required: true, placeholder: "Ort", label: "Ort", value: this.props.filiale.ort, onChanged: this.ortChanged })),
                        React.createElement("div", { className: "ms-Grid-col ms-sm6 ms-md6 ms-lg6" },
                            React.createElement(NumberTextField_1.NumberTextField, { placeholder: "Einnahmen", label: "Einnahmen", numberValue: this.props.filiale.einnahmen, onChanged: this.einnahmenChanged, suffix: " \u20AC" })),
                        React.createElement("div", { className: "ms-Grid-col ms-sm6 ms-md6 ms-lg6" },
                            React.createElement(NumberTextField_1.NumberTextField, { placeholder: "Ausgaben", label: "Ausgaben", numberValue: this.props.filiale.ausgaben, onChanged: this.ausgabenChanged, suffix: " \u20AC" })))))));
    }
}
exports.Filiale = Filiale;


/***/ }),

/***/ 364:
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/rng-browser.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues.bind(crypto)) ||
                      (typeof(msCrypto) != 'undefined' && msCrypto.getRandomValues.bind(msCrypto));
if (getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

  module.exports = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);

  module.exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}


/***/ }),

/***/ 365:
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

/***/ 366:
/*!*****************************************************!*\
  !*** ./src/projects/aldi/configuration/columns.tsx ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ 1);
const date_1 = __webpack_require__(/*! ../../../helper/date */ 79);
exports.defaultColumns = [];
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
        onRender: (item) => {
            return React.createElement("span", null, item.index);
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
        onRender: (item) => {
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
        onRender: (item) => {
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
        onRender: (item) => {
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
        isResizable: false,
        isCollapsable: false,
        data: "string",
        onRender: (item) => {
            return React.createElement("span", null, date_1.getGermanDateTimeString(new Date(item.created)));
        }
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
        onRender: (item) => {
            return React.createElement("span", null, item.index);
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
        onRender: (item) => {
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
        onRender: (item) => {
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
        onRender: (item) => {
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
        onRender: (item) => {
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
        onRender: (item) => {
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
        onRender: (item) => {
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
        onRender: (item) => {
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
        isResizable: false,
        isCollapsable: false,
        data: "string",
        onRender: (item) => {
            return React.createElement("span", null, date_1.getGermanDateTimeString(new Date(item.created)));
        }
    }
];


/***/ }),

/***/ 367:
/*!*********************************************************!*\
  !*** ./src/global/components/simple/BaseUebersicht.tsx ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ 1);
const office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 14);
const react_1 = __webpack_require__(/*! react */ 1);
class BaseUebersicht extends React.Component {
    constructor(props) {
        super(props);
        this.selectionHasChanged = this.selectionHasChanged.bind(this);
        this.onColumnClick = this.onColumnClick.bind(this);
        this.closeContextualMenue = this.closeContextualMenue.bind(this);
        this.deleteClicked = this.deleteClicked.bind(this);
        this.editClicked = this.editClicked.bind(this);
        this.callCtxVisible = this.callCtxVisible.bind(this);
        let commandItems = [
            {
                name: "Bearbeiten",
                key: "edit",
                icon: "edit",
                itemType: office_ui_fabric_react_1.ContextualMenuItemType.Normal,
                onClick: this.editClicked
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
                onClick: this.deleteClicked
            }
        ];
        this.state = {
            ctxMenues: commandItems,
            columns: this.props.columns,
            items: this.props.items
        };
        this._selection = new office_ui_fabric_react_1.Selection({
            onSelectionChanged: this.selectionHasChanged
        });
    }
    componentDidUpdate(prevProps, prevState, prevContext) {
        if (JSON.stringify(this.props.items) !== JSON.stringify(prevProps.items)) {
            this._selection["_onSelectionChanged"] = undefined;
            this._selection.getItems().forEach((e, i) => {
                this._selection.setIndexSelected(i, false, false);
            });
            this._selection.setAllSelected(false);
            this._selection["_onSelectionChanged"] = this.selectionHasChanged;
            this._selection.setItems(this.props.items, true);
            this.callCtxVisible(false);
            this.props.onItemSelectionChanged(this._selection.getSelection());
        }
    }
    callCtxVisible(isVisible) {
        if (this.props.ctxVisible === isVisible) {
            return;
        }
        this.props.onCtxMenueVisible(isVisible);
    }
    selectionHasChanged() {
        console.log("selectionHasChanged");
        let selection = this._selection.getSelection();
        this.props.onItemSelectionChanged(selection);
        if (!selection) {
            this.callCtxVisible(false);
        }
    }
    deleteClicked() {
        this.props
            .onDeleteItemClicked(this._selection.getSelection())
            .then(() => {
            this._selection.setAllSelected(false);
            this.callCtxVisible(false);
        })
            .catch(() => {
            alert("Es ist ein Fehler beim Löschen der Aktion aufgetreten");
        });
    }
    editClicked() {
        let selection = this._selection.getSelection();
        if (!selection || selection.length < 1) {
            return;
        }
        this.props.onEditItemClick(selection[0]);
    }
    closeContextualMenue() {
        this.props.onCtxMenueVisible(false);
    }
    onColumnClick(ev, column) {
        const { columns, items } = this.state;
        let newColumns = columns.slice();
        let currColumn = newColumns.filter((currCol, idx) => {
            return column.key === currCol.key;
        })[0];
        newColumns.forEach((newCol) => {
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
    }
    render() {
        console.log("render BaseUebersicht");
        return (React.createElement(react_1.Fragment, null,
            this.props.useCommandbar &&
                this.props.commandbarItems &&
                this.props.commandbarItems.length > 0 && (React.createElement("div", { className: "ms-Grid-row" },
                React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                    React.createElement(office_ui_fabric_react_1.CommandBar, { isSearchBoxVisible: this.props.enableSearchBox, items: this.props.commandbarItems })))),
            React.createElement("div", { className: "ms-Grid-row" },
                React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                    this.props.isLoading && React.createElement(office_ui_fabric_react_1.Spinner, { label: this.props.loadingText }),
                    !this.props.isLoading && (React.createElement(office_ui_fabric_react_1.DetailsList, { selectionMode: office_ui_fabric_react_1.SelectionMode.multiple, items: this.props.items, compact: false, columns: this.state.columns, setKey: "set", layoutMode: office_ui_fabric_react_1.DetailsListLayoutMode.justified, isHeaderVisible: true, selection: this._selection, selectionPreservedOnEmptyClick: false, enterModalSelectionOnTouch: false })))),
            this.props.ctxVisible && (React.createElement(office_ui_fabric_react_1.ContextualMenu, { directionalHint: 12, isBeakVisible: true, gapSpace: 10, beakWidth: 20, directionalHintFixed: true, target: this.props.ctxTarget, items: this.state.ctxMenues, onDismiss: this.closeContextualMenue }))));
    }
}
exports.BaseUebersicht = BaseUebersicht;


/***/ }),

/***/ 368:
/*!*******************************!*\
  !*** ./src/helper/sorting.ts ***!
  \*******************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function sortElement(elementOne, elementTwo, propertyName, descending = false) {
    let r = 0;
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
function sortArrayByProperty(arrayOfElements, propertyName, descending = false) {
    return arrayOfElements.sort((a, b) => {
        return sortElement(a, b, propertyName, descending);
    });
}
exports.sortArrayByProperty = sortArrayByProperty;


/***/ }),

/***/ 369:
/*!**************************************************!*\
  !*** ./src/global/components/simple/Routing.tsx ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ 1);
const react_router_dom_1 = __webpack_require__(/*! react-router-dom */ 84);
class RedirectWithStatus extends React.Component {
    render() {
        return (React.createElement(react_router_dom_1.Route, { render: ({ staticContext }) => {
                if (staticContext) {
                    staticContext.status = this.props.status;
                }
                return React.createElement(react_router_dom_1.Redirect, { from: this.props.from, to: this.props.to });
            } }));
    }
}
exports.RedirectWithStatus = RedirectWithStatus;
class Status extends React.Component {
    render() {
        return (React.createElement(react_router_dom_1.Route, { render: ({ staticContext }) => {
                if (staticContext) {
                    staticContext.status = this.props.code;
                }
                return this.props.children;
            } }));
    }
}
exports.Status = Status;


/***/ }),

/***/ 405:
/*!*******************************************************!*\
  !*** multi ./src/global/components/pages/initApp.tsx ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/global/components/pages/initApp.tsx */406);


/***/ }),

/***/ 406:
/*!*************************************************!*\
  !*** ./src/global/components/pages/initApp.tsx ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ReactDOM = __webpack_require__(/*! react-dom */ 58);
const React = __webpack_require__(/*! react */ 1);
const globalApplication_1 = __webpack_require__(/*! ./globalApplication */ 419);
const react_router_dom_1 = __webpack_require__(/*! react-router-dom */ 84);
const icons_1 = __webpack_require__(/*! @uifabric/icons */ 370);
icons_1.initializeIcons();
window.onload = () => {
    ReactDOM.render(React.createElement(react_router_dom_1.HashRouter, null,
        React.createElement(globalApplication_1.GlobalApplication, null)), document.getElementById("reactRoot"));
};


/***/ }),

/***/ 419:
/*!***********************************************************!*\
  !*** ./src/global/components/pages/globalApplication.tsx ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ 1);
const react_router_dom_1 = __webpack_require__(/*! react-router-dom */ 84);
const application_1 = __webpack_require__(/*! ./application */ 441);
const application_2 = __webpack_require__(/*! ../../../projects/yeelight/components/pages/application */ 238);
const application_3 = __webpack_require__(/*! ../../../projects/vacuumRoboter/components/pages/application */ 907);
const application_4 = __webpack_require__(/*! ../../../projects/aldi/components/pages/application */ 908);
const sensors_1 = __webpack_require__(/*! ../../../projects/xiaomi/components/pages/sensors */ 338);
const gateways_1 = __webpack_require__(/*! ../../../projects/xiaomi/components/pages/gateways */ 359);
const NotFoundPage_1 = __webpack_require__(/*! ../../components/simple/NotFoundPage */ 922);
const Routing_1 = __webpack_require__(/*! ../simple/Routing */ 369);
const basePage_1 = __webpack_require__(/*! ../container/basePage */ 361);
const systeminfo_1 = __webpack_require__(/*! ../../../projects/system/components/pages/systeminfo */ 360);
const office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 14);
class GlobalApplication extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selectedNavKey: this.getRouteIdFromHash() };
        this.routeChanged = this.routeChanged.bind(this);
    }
    getRouteIdFromHash() {
        return document.location.hash
            ? "#" + document.location.hash.replace("#/", "")
            : "#";
    }
    componentDidMount() {
        document.title = "Web-Application by Florian Hoffmann";
        console.log("componentDidMount Application");
        window.addEventListener("hashchange", this.routeChanged);
    }
    routeChanged() {
        console.log("route changed");
        let navKey = this.getRouteIdFromHash();
        if (this.state.selectedNavKey === navKey) {
            return;
        }
        this.setState({
            selectedNavKey: navKey
        });
    }
    componentWillUnmount() {
        window.removeEventListener("hashchange", this.routeChanged);
    }
    render() {
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
    }
}
exports.GlobalApplication = GlobalApplication;


/***/ }),

/***/ 441:
/*!*****************************************************!*\
  !*** ./src/global/components/pages/application.tsx ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ 1);
const application_1 = __webpack_require__(/*! ../../../projects/yeelight/components/pages/application */ 238);
const sensors_1 = __webpack_require__(/*! ../../../projects/xiaomi/components/pages/sensors */ 338);
const gateways_1 = __webpack_require__(/*! ../../../projects/xiaomi/components/pages/gateways */ 359);
const office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 14);
const PivotItem_1 = __webpack_require__(/*! office-ui-fabric-react/lib/components/Pivot/PivotItem */ 185);
const systeminfo_1 = __webpack_require__(/*! ../../../projects/system/components/pages/systeminfo */ 360);
class Application extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            GatewayInformations: React.createElement(gateways_1.Application, null),
            SensorInformations: React.createElement(sensors_1.Application, null),
            YeelightInformations: React.createElement(application_1.Application, null),
            SystemInformations: React.createElement(systeminfo_1.SystemInfo, null)
        };
    }
    componentDidMount() {
        console.log("componentDidMount Application");
    }
    render() {
        return (React.createElement("div", null,
            React.createElement(office_ui_fabric_react_1.Pivot, { linkSize: office_ui_fabric_react_1.PivotLinkSize.large },
                React.createElement(PivotItem_1.PivotItem, { linkText: "Sensoren", itemIcon: "CloudWeather" },
                    React.createElement("div", { style: { paddingTop: "15px" } }, this.state.SensorInformations)),
                React.createElement(PivotItem_1.PivotItem, { linkText: "Gateways", itemIcon: "Light" },
                    React.createElement("div", { style: { paddingTop: "15px" } }, this.state.GatewayInformations)),
                React.createElement(PivotItem_1.PivotItem, { linkText: "Yeelights", itemIcon: "Lightbulb" },
                    React.createElement("div", { style: { paddingTop: "15px" } }, this.state.YeelightInformations)))));
    }
}
exports.Application = Application;


/***/ }),

/***/ 461:
/*!**************************************************************!*\
  !*** ./src/projects/yeelight/components/simple/Yeelight.tsx ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ 1);
const office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 14);
const Panel_1 = __webpack_require__(/*! ../../../../global/components/simple/Panel */ 62);
class Yeelight extends React.Component {
    constructor(props) {
        super(props);
        this.state = { gateways: [] };
        this.colorSchemes = [
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
        this.brightnessChanged = this.brightnessChanged.bind(this);
        this.togglePower = this.togglePower.bind(this);
        this.setBrightness = this.setBrightness.bind(this);
        this.colorSchemeChanged = this.colorSchemeChanged.bind(this);
        this.colorTemperatureChanged = this.colorTemperatureChanged.bind(this);
        this.onRedChanged = this.onRedChanged.bind(this);
        this.onBlueChanged = this.onBlueChanged.bind(this);
        this.onGreenChanged = this.onGreenChanged.bind(this);
    }
    colorSchemeChanged(event) {
        let schemeIndex = event.currentTarget.selectedIndex;
        let schema = this.colorSchemes[schemeIndex];
        if (!schema || schema.intensity === -1)
            return;
        this.props.onColorSchemaChanged(this.props.lightInformation, schema.color, schema.brightness);
    }
    togglePower() {
        this.props.onPowerChanged(this.props.lightInformation);
    }
    setBrightness(value) {
        this.props.onBrightnessChanged(this.props.lightInformation, value);
    }
    brightnessChanged(value) {
        if (this.sliderDelay) {
            clearTimeout(this.sliderDelay);
        }
        this.sliderDelay = setTimeout(() => {
            this.setBrightness(value);
        }, 400);
    }
    colorTemperatureChanged(value) {
        if (this.sliderDelay) {
            clearTimeout(this.sliderDelay);
        }
        this.sliderDelay = setTimeout(() => {
            this.props.onColorTemperatureChanged(this.props.lightInformation, value);
        }, 400);
    }
    onColorChanged(color) {
        this.props.onColorChanged(this.props.lightInformation, color);
    }
    onRedChanged(value) {
        let color = Object.assign({}, this.props.lightInformation.rgb);
        color.r = value;
        if (this.sliderDelay) {
            clearTimeout(this.sliderDelay);
        }
        this.sliderDelay = setTimeout(() => {
            this.onColorChanged(color);
        }, 400);
    }
    onBlueChanged(value) {
        let color = Object.assign({}, this.props.lightInformation.rgb);
        color.b = value;
        if (this.sliderDelay) {
            clearTimeout(this.sliderDelay);
        }
        this.sliderDelay = setTimeout(() => {
            this.onColorChanged(color);
        }, 400);
    }
    onGreenChanged(value) {
        let color = Object.assign({}, this.props.lightInformation.rgb);
        color.g = value;
        if (this.sliderDelay) {
            clearTimeout(this.sliderDelay);
        }
        this.sliderDelay = setTimeout(() => {
            this.onColorChanged(color);
        }, 400);
    }
    render() {
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
                            React.createElement("select", { onChange: this.colorSchemeChanged, style: { padding: "10px", width: "100%" }, disabled: !this.props.lightInformation.power }, this.colorSchemes.map((schema, index) => {
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
                            React.createElement(office_ui_fabric_react_1.Slider, { label: "Gr\u00FCn", min: 0, max: 255, step: 1, disabled: !this.props.lightInformation.power, value: this.props.lightInformation.rgb.g, showValue: true, onChange: this.onGreenChanged }),
                            React.createElement(office_ui_fabric_react_1.Slider, { label: "Blau", min: 0, max: 255, step: 1, disabled: !this.props.lightInformation.power, value: this.props.lightInformation.rgb.b, showValue: true, onChange: this.onBlueChanged })))))));
    }
}
exports.Yeelight = Yeelight;


/***/ }),

/***/ 62:
/*!************************************************!*\
  !*** ./src/global/components/simple/Panel.tsx ***!
  \************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ 1);
const Button_1 = __webpack_require__(/*! office-ui-fabric-react/lib/Button */ 22);
class Panel extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isContentVisible: !this.props.isCollapsed
        };
        this.linkClicked = this.linkClicked.bind(this);
    }
    linkClicked(e) {
        if (this.props.canToggleContentHidden === false) {
            return false;
        }
        e.preventDefault();
        let newState = Object.assign({}, this.state);
        newState.isContentVisible = !newState.isContentVisible;
        this.setState(newState);
        return false;
    }
    render() {
        let panelClass = this.props.className || "";
        let contentClass = this.props.contentClass;
        return (React.createElement("div", { className: panelClass },
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
                this.state.isContentVisible && (React.createElement("div", { className: contentClass }, this.props.children)))));
    }
}
Panel.defaultProps = {
    headerText: "Kein Text",
    className: "",
    contentClass: "default-panel-content-container",
    isCollapsed: false,
    canToggleContentHidden: true,
    headerControls: null
};
exports.Panel = Panel;


/***/ }),

/***/ 759:
/*!************************************************************!*\
  !*** ./src/global/components/simple/BaseWeatherSensor.tsx ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ 1);
const office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 14);
const Panel_1 = __webpack_require__(/*! ../../../global/components/simple/Panel */ 62);
const react_1 = __webpack_require__(/*! react */ 1);
const BaseWeatherSensorChart_1 = __webpack_require__(/*! ./BaseWeatherSensorChart */ 760);
class BaseWeatherSensor extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showDetails: false };
        this.sensorDetailsClicked = this.sensorDetailsClicked.bind(this);
    }
    sensorDetailsClicked() {
        this.setState({ showDetails: !this.state.showDetails });
    }
    render() {
        console.log("BaseWeatherSensor render");
        return (React.createElement("div", { className: "ms-Grid-row", key: "sensor" + this.props.id },
            React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                React.createElement(Panel_1.Panel, { headerText: this.props.sensorInformations.name, className: "custom-padding-bottom-10px", headerControls: React.createElement("div", null,
                        React.createElement(office_ui_fabric_react_1.IconButton, { checked: false, iconProps: {
                                iconName: "info"
                            }, title: "Charts \u00F6ffnen", ariaLabel: "Charts \u00F6ffnen", onClick: this.sensorDetailsClicked })) },
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
    }
}
exports.BaseWeatherSensor = BaseWeatherSensor;


/***/ }),

/***/ 760:
/*!*****************************************************************!*\
  !*** ./src/global/components/simple/BaseWeatherSensorChart.tsx ***!
  \*****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise) {
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ 1);
const office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 14);
const axios_1 = __webpack_require__(/*! axios */ 30);
const react_chartjs_2_1 = __webpack_require__(/*! react-chartjs-2 */ 339);
const date_1 = __webpack_require__(/*! ../../../helper/date */ 79);
const options = [
    React.createElement("option", { value: "1", key: "k1" }, "Heute"),
    React.createElement("option", { value: "2", key: "k2" }, "Letzten 2 Tage"),
    React.createElement("option", { value: "3", key: "k3" }, "Letzte Woche"),
    React.createElement("option", { value: "4", key: "k4" }, "Alle")
];
class BaseWeatherSensorChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sensorData: undefined,
            rawSensorData: [],
            isError: false,
            isLoadingSensorData: true,
            selectedRange: "1",
            options: undefined
        };
        this.dateRangeSelectionChanged = this.dateRangeSelectionChanged.bind(this);
        this.getTooltipTitle = this.getTooltipTitle.bind(this);
    }
    getChartData(defaultData) {
        let dataRows = defaultData;
        let data = {
            datasets: [],
            labels: []
        };
        data.datasets.push({ label: "Temperatur", data: [] });
        data.datasets.push({ label: "Luftfeuchtigkeit", data: [] });
        if (this.props.sensorInformations.hasPressure) {
            data.datasets.push({ label: "Druck", data: [] });
        }
        let labels = [];
        let tempValues = [];
        let humidityValues = [];
        let pressureValues = [];
        dataRows.forEach(row => {
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
    }
    querySensorDataByDateRange(from, to) {
        return axios_1.default.get("/api/sensors/" +
            this.props.sensorInformations.id +
            "/between/" +
            from +
            "/" +
            to);
    }
    queryAllSensorData() {
        return axios_1.default.get("/api/sensors/" + this.props.sensorInformations.id + "/data");
    }
    getDateTickRangeBySelection(selectedOption) {
        let from = -1;
        let to = -1;
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
    }
    queryLiveDate(selectedOption) {
        return new Promise((resolve, reject) => {
            let dateRange = this.getDateTickRangeBySelection(selectedOption);
            this.querySensorDataByDateRange(dateRange.from, dateRange.to)
                .then(dataResult => {
                if (!dataResult.data) {
                    resolve([]);
                }
                if (!dataResult.data.items || dataResult.data.items.lenght === 0) {
                    resolve([]);
                }
                resolve(dataResult.data.items);
            })
                .catch(error => {
                reject(error);
            });
        });
    }
    getTooltipTitle(tooltipItem, data) {
        let returnValue = undefined;
        if (this.state.rawSensorData &&
            this.state.rawSensorData.length >= tooltipItem[0].index) {
            let sensorTimeStamp = this.state.rawSensorData[tooltipItem[0].index];
            if (sensorTimeStamp) {
                let timestamp = sensorTimeStamp.timestamp;
                returnValue = date_1.getGermanDateTimeString(new Date(timestamp));
            }
        }
        if (!returnValue) {
            returnValue = data.labels[tooltipItem[0].index];
        }
        return returnValue;
    }
    doSensorQueryNow() {
        this.queryLiveDate(this.state.selectedRange)
            .then(result => {
            let chartData = this.getChartData(result);
            let options = { tooltips: {} };
            options.tooltips.callbacks = {
                title: this.getTooltipTitle
            };
            if (chartData && chartData.labels && chartData.labels.length > 0) {
                chartData.labels = chartData.labels.map(label => {
                    label = date_1.getGermanDateString(new Date(parseFloat(label.toString())));
                    return label;
                });
            }
            this.setState({
                rawSensorData: result,
                options: options,
                sensorData: chartData,
                isLoadingSensorData: false
            });
        })
            .catch(error => {
            this.setState({
                isError: true,
                isLoadingSensorData: false
            });
        });
    }
    componentDidMount() {
        this.doSensorQueryNow();
    }
    dateRangeSelectionChanged(event) {
        let index = event.target.selectedIndex;
        let selectedOptionValue = event.target.options[index].value;
        this.setState({
            isLoadingSensorData: true,
            selectedRange: selectedOptionValue
        }, () => {
            this.doSensorQueryNow();
        });
    }
    render() {
        console.log("BaseWeatherSensorChart render");
        if (!this.state.sensorData)
            return null;
        if (this.state.isError) {
            return (this.state.isError && (React.createElement("div", { className: "ms-Grid-row" },
                React.createElement("div", { className: "ms-Grid-col ms-sm12" }, "Es ist ein Fehler aufgetreten..."))));
        }
        let sensorDataContent = null;
        if (this.state.isLoadingSensorData) {
            sensorDataContent = (React.createElement(office_ui_fabric_react_1.Spinner, { size: office_ui_fabric_react_1.SpinnerSize.large, label: "Lade Sensor-Daten..." }));
        }
        else {
            if (!this.state.sensorData) {
                sensorDataContent = "Keine Daten vorhanden...";
            }
            else {
                sensorDataContent = (React.createElement(react_chartjs_2_1.Line, { data: this.state.sensorData, options: this.state.options, height: 400, width: 400 }));
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
    }
}
exports.BaseWeatherSensorChart = BaseWeatherSensorChart;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! bluebird */ 18)))

/***/ }),

/***/ 79:
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
function addDays(dateToAdd, daysToAdd, setHrsMinSecMiSecToZero = false) {
    let calculatedDate = new Date(dateToAdd);
    calculatedDate.setDate(calculatedDate.getDate() + daysToAdd);
    if (setHrsMinSecMiSecToZero) {
        calculatedDate = setDatePropertiesToZero(calculatedDate);
    }
    return calculatedDate;
}
exports.addDays = addDays;
function setDatePropertiesToZero(dateToSet) {
    let calculatedDate = new Date(dateToSet);
    calculatedDate.setMinutes(0);
    calculatedDate.setHours(0);
    calculatedDate.setSeconds(0);
    calculatedDate.setMilliseconds(0);
    return calculatedDate;
}
exports.setDatePropertiesToZero = setDatePropertiesToZero;


/***/ }),

/***/ 906:
/*!****************************************************!*\
  !*** ./src/global/components/simple/BaseLight.tsx ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ 1);
const office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 14);
const Panel_1 = __webpack_require__(/*! ../../../global/components/simple/Panel */ 62);
class BaseLight extends React.Component {
    constructor(props) {
        super(props);
        this.state = { gateways: [] };
        this.colorSchemes = [
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
        this.brightnessChanged = this.brightnessChanged.bind(this);
        this.togglePower = this.togglePower.bind(this);
        this.setBrightness = this.setBrightness.bind(this);
        this.colorSchemeChanged = this.colorSchemeChanged.bind(this);
        this.onRedChanged = this.onRedChanged.bind(this);
        this.onBlueChanged = this.onBlueChanged.bind(this);
        this.onGreenChanged = this.onGreenChanged.bind(this);
    }
    colorSchemeChanged(event) {
        let schemeIndex = event.currentTarget.selectedIndex;
        let schema = this.colorSchemes[schemeIndex];
        if (!schema || schema.intensity === -1)
            return;
        this.props.onColorSchemaChanged(this.props.lightInformation, schema.color, schema.brightness);
    }
    togglePower() {
        this.props.onPowerChanged(this.props.lightInformation);
    }
    setBrightness(value) {
        this.props.onBrightnessChanged(this.props.lightInformation, value);
    }
    brightnessChanged(value) {
        if (this.sliderDelay) {
            clearTimeout(this.sliderDelay);
        }
        this.sliderDelay = setTimeout(() => {
            this.setBrightness(value);
        }, 400);
    }
    onColorChanged(color) {
        this.props.onColorChanged(this.props.lightInformation, color);
    }
    onRedChanged(value) {
        let color = Object.assign({}, this.props.lightInformation.rgb);
        color.r = value;
        if (this.sliderDelay) {
            clearTimeout(this.sliderDelay);
        }
        this.sliderDelay = setTimeout(() => {
            this.onColorChanged(color);
        }, 400);
    }
    onBlueChanged(value) {
        let color = Object.assign({}, this.props.lightInformation.rgb);
        color.b = value;
        if (this.sliderDelay) {
            clearTimeout(this.sliderDelay);
        }
        this.sliderDelay = setTimeout(() => {
            this.onColorChanged(color);
        }, 400);
    }
    onGreenChanged(value) {
        let color = Object.assign({}, this.props.lightInformation.rgb);
        color.g = value;
        if (this.sliderDelay) {
            clearTimeout(this.sliderDelay);
        }
        this.sliderDelay = setTimeout(() => {
            this.onColorChanged(color);
        }, 400);
    }
    render() {
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
                            React.createElement("select", { onChange: this.colorSchemeChanged, style: { padding: "10px", width: "100%" }, disabled: !this.props.lightInformation.power }, this.colorSchemes.map((schema, index) => {
                                return (React.createElement("option", { key: "option_schema_" + index, value: index }, schema.name));
                            }))),
                        React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                            React.createElement("h1", { className: "ms-font-xl ms-fontColor-themePrimary" }, "Leuchtst\u00E4rke"),
                            React.createElement(office_ui_fabric_react_1.Slider, { min: 1, max: 100, step: 1, disabled: !this.props.lightInformation.power, value: this.props.lightInformation.brightness, showValue: true, onChange: this.brightnessChanged })),
                        React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                            React.createElement("h1", { className: "ms-font-xl ms-fontColor-themePrimary" }, "RGB Farben"),
                            React.createElement(office_ui_fabric_react_1.Slider, { label: "Rot", min: 0, max: 255, step: 1, disabled: !this.props.lightInformation.power, value: this.props.lightInformation.rgb.r, showValue: true, onChange: this.onRedChanged }),
                            React.createElement(office_ui_fabric_react_1.Slider, { label: "Gr\u00FCn", min: 0, max: 255, step: 1, disabled: !this.props.lightInformation.power, value: this.props.lightInformation.rgb.g, showValue: true, onChange: this.onGreenChanged }),
                            React.createElement(office_ui_fabric_react_1.Slider, { label: "Blau", min: 0, max: 255, step: 1, disabled: !this.props.lightInformation.power, value: this.props.lightInformation.rgb.b, showValue: true, onChange: this.onBlueChanged })))))));
    }
}
exports.BaseLight = BaseLight;


/***/ }),

/***/ 907:
/*!*********************************************************************!*\
  !*** ./src/projects/vacuumRoboter/components/pages/application.tsx ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ 1);
class Application extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        document.title = "Vacuum Roboter Hauptseite";
    }
    render() {
        return (React.createElement("h1", null,
            "Hello from Vacuum Roboter!",
            React.createElement("br", null),
            "Your requested url is",
            " ",
            this.props.requestUrl));
    }
}
exports.Application = Application;


/***/ }),

/***/ 908:
/*!************************************************************!*\
  !*** ./src/projects/aldi/components/pages/application.tsx ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ 1);
const manageRoute_1 = __webpack_require__(/*! ./manageRoute */ 909);
const enums_1 = __webpack_require__(/*! ../../../../enums/enums */ 197);
const react_1 = __webpack_require__(/*! react */ 1);
const ToolTip_1 = __webpack_require__(/*! ../../../../global/components/simple/ToolTip */ 916);
const Routenuebersicht_1 = __webpack_require__(/*! ../intelligent/Routenuebersicht */ 917);
const UploadRoutes_1 = __webpack_require__(/*! ../intelligent/UploadRoutes */ 918);
const UploadFilialen_1 = __webpack_require__(/*! ../intelligent/UploadFilialen */ 919);
const Filialuebersicht_1 = __webpack_require__(/*! ../intelligent/Filialuebersicht */ 920);
const Panel_1 = __webpack_require__(/*! ../../../../global/components/simple/Panel */ 62);
const Filiale_1 = __webpack_require__(/*! ../intelligent/Filiale */ 921);
class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalContent: undefined,
            showModal: false,
            isCalloutVisible: false,
            callOutContent: undefined,
            selectedRoutes: [],
            selectedFilialen: []
        };
        this.closeModal = this.closeModal.bind(this);
        this.showCallOut = this.showCallOut.bind(this);
        this.hideCallOut = this.hideCallOut.bind(this);
        this.routeUploaded = this.routeUploaded.bind(this);
        this.showUploadRoutesClick = this.showUploadRoutesClick.bind(this);
        this.uploadFilialen = this.uploadFilialen.bind(this);
        this.showUploadFilialenClick = this.showUploadFilialenClick.bind(this);
        this.editRoute = this.editRoute.bind(this);
        this.addRouteClick = this.addRouteClick.bind(this);
        this.createFiliale = this.createFiliale.bind(this);
        this.editFiliale = this.editFiliale.bind(this);
        this.filialeSavedClick = this.filialeSavedClick.bind(this);
    }
    showUploadFilialenClick() {
        this.setState({
            showModal: true,
            modalContent: (React.createElement(UploadFilialen_1.UploadFilialen, { uploadFinished: this.uploadFilialen, cancelBtnClick: this.closeModal }))
        });
    }
    uploadFilialen() {
        this.closeModal();
    }
    showUploadRoutesClick() {
        this.setState({
            showModal: true,
            modalContent: (React.createElement(UploadRoutes_1.UploadRoutes, { uploadClick: this.routeUploaded, cancelClick: this.closeModal }))
        });
    }
    routeUploaded(routes) {
        this.closeModal();
    }
    addRouteClick() {
        this.setState({
            showModal: true,
            modalContent: (React.createElement(manageRoute_1.ManageRoute, { onExitPage: this.closeModal, pageType: enums_1.PageType.Add }))
        });
        this.hideCallOut();
    }
    closeModal(copiedState = undefined) {
        if (copiedState) {
            copiedState.showModal = false;
            copiedState.modalContent = undefined;
            return copiedState;
        }
        else {
            this.setState({ showModal: false, modalContent: undefined });
        }
    }
    showCallOut(event) {
        console.log("MouseIn - " + event.target["tagName"]);
        if (this.state.isCalloutVisible || this.state.showModal) {
            return;
        }
        this.targetCallOutElement = event.target;
        let title = this.targetCallOutElement.hasAttribute("data-info-title")
            ? this.targetCallOutElement.getAttribute("data-info-title")
            : "";
        let description = this.targetCallOutElement.hasAttribute("data-info-desc")
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
    }
    hideCallOut() {
        console.log("MouseOut");
        this.targetCallOutElement = null;
        this.setState({ isCalloutVisible: false, callOutContent: undefined });
        return false;
    }
    filialeSavedClick() {
        this.closeModal();
    }
    editRoute(routeElement) { }
    editFiliale(filialElement) {
        this.setState({
            showModal: true,
            modalContent: (React.createElement(Filiale_1.Filiale, { cancel_clicked: this.closeModal, pageType: enums_1.PageType.Edit, filialeId: filialElement._id, headerText: "Filiale bearbeiten", ok_clicked: this.filialeSavedClick }))
        });
        this.hideCallOut();
    }
    createFiliale() {
        this.setState({
            showModal: true,
            modalContent: (React.createElement(Filiale_1.Filiale, { cancel_clicked: this.closeModal, pageType: enums_1.PageType.Add, filialeId: null, headerText: "Filiale hinzuf\u00FCgen", ok_clicked: this.filialeSavedClick }))
        });
        this.hideCallOut();
    }
    render() {
        console.log("render application");
        if (this.state.showModal && !!this.state.modalContent) {
            return (React.createElement("div", { className: "ms-Grid-row" },
                React.createElement("div", { className: "ms-Grid-col ms-sm12" }, this.state.modalContent)));
        }
        return (React.createElement(react_1.Fragment, null,
            React.createElement("div", { className: "ms-Grid-row" },
                React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                    React.createElement(Panel_1.Panel, { contentClass: "custom-padding-top-10px", headerText: "Routen\u00FCbersicht", className: "custom-padding-bottom-10px custom-padding-top-10px" },
                        React.createElement(Routenuebersicht_1.Routenuebersicht, { onEditRouteClick: this.editRoute, commandbarItems: [
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
            React.createElement("div", { className: "ms-Grid-row" },
                React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                    React.createElement(Panel_1.Panel, { contentClass: "custom-padding-top-10px", headerText: "Filial\u00FCbersicht", className: "custom-padding-bottom-10px" },
                        React.createElement("div", null,
                            React.createElement(Filialuebersicht_1.Filialuebersicht, { onEditFilialeClick: this.editFiliale, commandbarItems: [
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
    }
}
exports.Application = Application;


/***/ }),

/***/ 909:
/*!************************************************************!*\
  !*** ./src/projects/aldi/components/pages/manageRoute.tsx ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise) {
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ 1);
const office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 14);
const enums_1 = __webpack_require__(/*! ../../../../enums/enums */ 197);
const basePage_1 = __webpack_require__(/*! ../../../../global/components/container/basePage */ 361);
const ButtonRow_1 = __webpack_require__(/*! ../../../../global/components/simple/ButtonRow */ 132);
const Panel_1 = __webpack_require__(/*! ../../../../global/components/simple/Panel */ 62);
const date_1 = __webpack_require__(/*! ../../../../helper/date */ 79);
const Link_1 = __webpack_require__(/*! ../stateless/Link */ 910);
const Ausgabe_1 = __webpack_require__(/*! ../stateless/Ausgabe */ 911);
const Filiale_1 = __webpack_require__(/*! ../stateless/Filiale */ 363);
const Routenfahrt_1 = __webpack_require__(/*! ../stateless/Routenfahrt */ 912);
const uuid_1 = __webpack_require__(/*! uuid */ 913);
const axios_1 = __webpack_require__(/*! axios */ 30);
class ManageRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filialen: [],
            routenfahrten: [],
            ausgaben: [],
            links: []
        };
        this.cancelClick = this.cancelClick.bind(this);
        this.saveClick = this.saveClick.bind(this);
        this.addLink = this.addLink.bind(this);
        this.deleteLink = this.deleteLink.bind(this);
        this.linkChanged = this.linkChanged.bind(this);
        this.addAusgabe = this.addAusgabe.bind(this);
        this.deleteAusgabe = this.deleteAusgabe.bind(this);
        this.ausgabeDescriptionChanged = this.ausgabeDescriptionChanged.bind(this);
        this.ausgabeValueChanged = this.ausgabeValueChanged.bind(this);
        this.deleteFiliale = this.deleteFiliale.bind(this);
        this.addFiliale = this.addFiliale.bind(this);
        this.pkzChanged = this.pkzChanged.bind(this);
        this.einnahmenChanged = this.einnahmenChanged.bind(this);
        this.ausgabenChanged = this.ausgabenChanged.bind(this);
        this.plzChanged = this.plzChanged.bind(this);
        this.testnummerChanged = this.testnummerChanged.bind(this);
        this.fahrdatumChanged = this.fahrdatumChanged.bind(this);
        this.ortChanged = this.ortChanged.bind(this);
        this.strasseChanged = this.strasseChanged.bind(this);
        this.addRoutenfahrt = this.addRoutenfahrt.bind(this);
        this.deleteRoutenfahrt = this.deleteRoutenfahrt.bind(this);
        this.changeRouteDate = this.changeRouteDate.bind(this);
    }
    componentDidMount() {
        let docTitle = "";
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
    }
    saveRoutes(routes) {
        return new Promise((resolve, reject) => {
            let promises = [];
            routes.forEach(route => {
                promises.push(axios_1.default.post("/api/routen", { route }));
            });
            Promise.all(promises)
                .then(results => {
                console.log(JSON.stringify(results));
                let resultValue = [];
                results.forEach(p => {
                    if (p.data.insertedObjects && p.data.insertedObjects.length > 0) {
                        resultValue = resultValue.concat(p.data.insertedObjects);
                    }
                });
                resolve(resultValue);
            })
                .catch(error => {
                console.log("saveRoutes", JSON.stringify(error));
                reject({ message: "Kein Einfügen", error: error });
            });
        });
    }
    saveFilialen(filialen) {
        return new Promise((resolve, reject) => {
            let promises = [];
            filialen.forEach(filiale => {
                promises.push(axios_1.default.post("/api/filialen", { filiale }));
            });
            Promise.all(promises)
                .then(results => {
                console.log(JSON.stringify(results));
                let resultValue = [];
                results.forEach(p => {
                    if (p.data.insertedObjects && p.data.insertedObjects.length > 0) {
                        resultValue = resultValue.concat(p.data.insertedObjects);
                    }
                });
                resolve(resultValue);
            })
                .catch(error => {
                console.log("saveFilialen", JSON.stringify(error));
                reject({ message: "Kein Einfügen", error: error });
            });
        });
    }
    saveClick() {
        console.log("Save Click");
        if (!this.state.routenfahrten || this.state.routenfahrten.length < 0) {
            return;
        }
        let routenModels = [];
        this.state.routenfahrten.forEach(fahrt => {
            let route = {
                route_timestamp: fahrt.getTime(),
                ausgaben: [],
                links: [],
                timestamp: Date.now()
            };
            this.state.ausgaben.forEach(ausgabe => {
                route.ausgaben.push({
                    value: ausgabe.value,
                    description: ausgabe.description,
                    id: ausgabe.id
                });
            });
            this.state.links.forEach(link => {
                route.links.push({
                    link: link.link,
                    text: link.text,
                    id: link.id
                });
            });
            routenModels.push(route);
        });
        this.saveRoutes(routenModels)
            .then(insertedRouten => {
            if (this.state.routenfahrten.length === insertedRouten.length) {
                console.log("ROUTES OK!");
            }
            let filialen = [];
            filialen = this.state.filialen.map(filiale => {
                let routeId = "";
                insertedRouten.forEach(route => {
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
            return this.saveFilialen(filialen);
        })
            .then(insertedFilialen => {
            if (this.state.filialen.length === insertedFilialen.length) {
                console.log("FILIALEN OK!");
            }
        })
            .catch(() => { });
    }
    cancelClick() {
        console.log("cancel Click");
        this.props.onExitPage();
    }
    getRouteSelectOptions() {
        if (!this.state.routenfahrten || this.state.routenfahrten.length < 1) {
            return React.createElement("option", { value: "" }, "Bitte Fahrdaten anlegen");
        }
        return this.state.routenfahrten.map((fahrt, index) => {
            return (React.createElement("option", { value: index, key: "fahrt_opt_" + index }, date_1.getGermanDateString(fahrt)));
        });
    }
    addFiliale() {
        let ns = Object.assign({}, this.state);
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
    }
    deleteFiliale(id) {
        let ns = Object.assign({}, this.state);
        ns.filialen.splice(parseInt(id), 1);
        this.setState(ns);
    }
    ausgabenChanged(id, value) {
        let ns = Object.assign({}, this.state);
        ns.filialen[parseInt(id)].ausgaben = value;
        this.setState(ns);
    }
    einnahmenChanged(id, value) {
        let ns = Object.assign({}, this.state);
        ns.filialen[parseInt(id)].einnahmen = value;
        this.setState(ns);
    }
    pkzChanged(id, value) {
        let ns = Object.assign({}, this.state);
        ns.filialen[parseInt(id)].pkz = value;
        this.setState(ns);
    }
    plzChanged(id, value) {
        let ns = Object.assign({}, this.state);
        ns.filialen[parseInt(id)].plz = value;
        this.setState(ns);
    }
    testnummerChanged(id, value) {
        let ns = Object.assign({}, this.state);
        ns.filialen[parseInt(id)].testnummer = value;
        this.setState(ns);
    }
    fahrdatumChanged(id, value) {
        let ns = Object.assign({}, this.state);
        ns.filialen[parseInt(id)].fahrdatum = value;
        this.setState(ns);
    }
    strasseChanged(id, value) {
        let ns = Object.assign({}, this.state);
        ns.filialen[parseInt(id)].strasse = value;
        this.setState(ns);
    }
    ortChanged(id, value) {
        let ns = Object.assign({}, this.state);
        ns.filialen[parseInt(id)].ort = value;
        this.setState(ns);
    }
    addAusgabe() {
        let ns = Object.assign({}, this.state);
        ns.ausgaben.push({
            description: "",
            value: 0,
            id: uuid_1.v4()
        });
        this.setState(ns);
    }
    deleteAusgabe(id) {
        let ns = Object.assign({}, this.state);
        ns.ausgaben.splice(parseInt(id), 1);
        this.setState(ns);
    }
    ausgabeValueChanged(id, value) {
        let ns = Object.assign({}, this.state);
        ns.ausgaben[parseInt(id)].value = value;
        this.setState(ns);
    }
    ausgabeDescriptionChanged(id, value) {
        let ns = Object.assign({}, this.state);
        ns.ausgaben[parseInt(id)].description = value;
        this.setState(ns);
    }
    addLink() {
        let ns = Object.assign({}, this.state);
        ns.links.push({
            link: "",
            text: "",
            id: uuid_1.v4()
        });
        this.setState(ns);
    }
    deleteLink(id) {
        let ns = Object.assign({}, this.state);
        ns.links.splice(parseInt(id), 1);
        this.setState(ns);
    }
    linkChanged(id, value) {
        let ns = Object.assign({}, this.state);
        ns.links[parseInt(id)].link = value;
        this.setState(ns);
    }
    addRoutenfahrt() {
        let fahrten = this.state.routenfahrten.concat([
            date_1.setDatePropertiesToZero(new Date())
        ]);
        this.setState({
            routenfahrten: fahrten
        });
    }
    deleteRoutenfahrt(id) {
        let ns = Object.assign({}, this.state);
        ns.routenfahrten.splice(parseInt(id), 1);
        this.setState(ns);
    }
    changeRouteDate(id, value) {
        let d = value || new Date();
        let ns = Object.assign({}, this.state);
        let newFahrten = [];
        ns.routenfahrten.forEach((element, index) => {
            newFahrten.push(index === parseInt(id) ? value : element);
        });
        ns.routenfahrten = newFahrten;
        this.setState(ns);
    }
    render() {
        console.log("render ManageRoute");
        return (React.createElement(basePage_1.BasePage, { IncludeFabricElement: false, Body: React.createElement("div", { className: "ms-Grid" },
                React.createElement("div", { className: "ms-Grid-row" },
                    React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                        React.createElement(Panel_1.Panel, { headerText: "Routenlinks", className: "custom-padding-bottom-10px", headerControls: React.createElement(office_ui_fabric_react_1.ActionButton, { "data-automation-id": "Add Link", iconProps: { iconName: "Add" }, onClick: this.addLink }) }, this.state.links.map((link, index) => {
                            return (React.createElement(Link_1.Link, { key: "link_" + index, linkId: index.toString(), linkModel: link, title: "Link " + (index + 1), onDeleteClick: this.deleteLink, onLinkHrefChanged: this.linkChanged }));
                        })))),
                React.createElement("div", { className: "ms-Grid-row" },
                    React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                        React.createElement(Panel_1.Panel, { headerText: "Globale Ausgaben", className: "custom-padding-bottom-10px", headerControls: React.createElement(office_ui_fabric_react_1.ActionButton, { "data-automation-id": "Add Ausgabe", iconProps: { iconName: "Add" }, onClick: this.addAusgabe }) },
                            (!this.state.ausgaben || this.state.ausgaben.length < 1) && (React.createElement("div", { className: "ms-font-xl ms-fontColor-themePrimary" }, "Es wurden bisher keine globalen Ausgaben erfasst")),
                            this.state.ausgaben.map((ausgabe, index) => {
                                return (React.createElement(Ausgabe_1.Ausgabe, { key: "ausgabe_" + index, ausgabeId: index.toString(), onDeleteClick: this.deleteAusgabe, title: "Ausgabe " + (index + 1), ausgabeModel: ausgabe, onDescriptionChanged: this.ausgabeDescriptionChanged, onValueChanged: this.ausgabeValueChanged }));
                            })))),
                React.createElement("div", { className: "ms-Grid-row" },
                    React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                        React.createElement(Panel_1.Panel, { headerText: "Routenfahrdaten verwalten", className: "custom-padding-bottom-10px", headerControls: React.createElement(office_ui_fabric_react_1.ActionButton, { "data-automation-id": "Add Routenfahrt", iconProps: { iconName: "Add" }, onClick: this.addRoutenfahrt }) },
                            (!this.state.routenfahrten ||
                                this.state.routenfahrten.length < 1) && (React.createElement("div", { className: "ms-font-xl ms-fontColor-themePrimary" }, "Es wurden bisher keine Routenfahrdaten erfasst")),
                            this.state.routenfahrten.map((fahrt, index) => {
                                return (React.createElement(Routenfahrt_1.Routenfahrt, { key: "routnefahrt_" + index, onDateChanged: this.changeRouteDate, onDeleteClick: this.deleteRoutenfahrt, routenfahrtId: index.toString(), title: "Routenfahrt " + (index + 1), value: fahrt }));
                            })))),
                React.createElement("div", { className: "ms-Grid-row" },
                    React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                        React.createElement(Panel_1.Panel, { headerText: "Fahrten verwalten", className: "custom-padding-bottom-10px", headerControls: React.createElement(office_ui_fabric_react_1.ActionButton, { "data-automation-id": "Add Ausgabe", iconProps: { iconName: "Add" }, onClick: this.addFiliale }) },
                            (!this.state.filialen || this.state.filialen.length < 1) && (React.createElement("div", { className: "ms-font-xl ms-fontColor-themePrimary" }, "Es wurden bisher keine Filialen erfasst")),
                            this.state.filialen.map((filiale, index) => {
                                return (React.createElement(Filiale_1.Filiale, { key: "route_" + index, id: index.toString(), title: "Fahrt " + (index + 1), filiale: filiale, fahrdaten: this.state.routenfahrten, onDeleteClick: this.deleteFiliale, onAusgabenChanged: this.ausgabenChanged, onEinnahmenChanged: this.einnahmenChanged, onFahrdatumChanged: this.fahrdatumChanged, onOrtChanged: this.ortChanged, onPkzChanged: this.pkzChanged, onPlzChanged: this.plzChanged, onStrasseChanged: this.strasseChanged, onTestnummerChanged: this.testnummerChanged, enableDeleteBtn: true }));
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
    }
}
exports.ManageRoute = ManageRoute;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! bluebird */ 18)))

/***/ }),

/***/ 910:
/*!*********************************************************!*\
  !*** ./src/projects/aldi/components/stateless/Link.tsx ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ 1);
const office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 14);
const defaultOption = React.createElement("option", { key: "-1" }, "Bitte einen Wert angeben");
class Link extends React.PureComponent {
    constructor(props) {
        super(props);
        this.deleteLinkClicked = this.deleteLinkClicked.bind(this);
        this.onLinkHrefChanged = this.onLinkHrefChanged.bind(this);
    }
    deleteLinkClicked() {
        this.props.onDeleteClick(this.props.linkId);
    }
    onLinkHrefChanged(value) {
        this.props.onLinkHrefChanged(this.props.linkId, value);
    }
    render() {
        console.log("render Link");
        return (React.createElement("div", { className: "ms-Grid-row", key: "link_comp_" + this.props.linkId },
            React.createElement("div", { className: "ms-Grid-col ms-sm2 ms-lg1" },
                React.createElement(office_ui_fabric_react_1.Label, null,
                    React.createElement(office_ui_fabric_react_1.Link, { href: this.props.linkModel.link, disabled: !this.props.linkModel.link, target: "_blank" }, this.props.title))),
            React.createElement("div", { className: "ms-Grid-col ms-sm8 ms-lg-10" },
                React.createElement(office_ui_fabric_react_1.TextField, { placeholder: "Link eingeben", value: this.props.linkModel.link, onChanged: this.onLinkHrefChanged })),
            React.createElement("div", { className: "ms-Grid-col ms-sm2 ms-lg1" },
                React.createElement(office_ui_fabric_react_1.ActionButton, { "data-info-title": "Link entfernen", "data-info-desc": "L\u00F6scht den Link", iconProps: {
                        iconName: "Delete",
                        className: "img-font-size-large"
                    }, onClick: this.deleteLinkClicked }))));
    }
}
exports.Link = Link;


/***/ }),

/***/ 911:
/*!************************************************************!*\
  !*** ./src/projects/aldi/components/stateless/Ausgabe.tsx ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ 1);
const office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 14);
const NumberTextField_1 = __webpack_require__(/*! ../../../../global/components/simple/NumberTextField */ 362);
const Panel_1 = __webpack_require__(/*! ../../../../global/components/simple/Panel */ 62);
const defaultOption = React.createElement("option", { key: "-1" }, "Bitte einen Wert angeben");
class Ausgabe extends React.PureComponent {
    constructor(props) {
        super(props);
        this.deleteClicked = this.deleteClicked.bind(this);
        this.onDescriptionChanged = this.onDescriptionChanged.bind(this);
        this.onValueChanged = this.onValueChanged.bind(this);
    }
    deleteClicked() {
        this.props.onDeleteClick(this.props.ausgabeId);
    }
    onValueChanged(value) {
        this.props.onValueChanged(this.props.ausgabeId, value);
    }
    onDescriptionChanged(value) {
        this.props.onDescriptionChanged(this.props.ausgabeId, value);
    }
    render() {
        console.log("render Ausgabe");
        return (React.createElement(Panel_1.Panel, { key: "ausgabe_" + this.props.ausgabeId, headerText: this.props.title, className: "custom-padding-bottom-10px", headerControls: React.createElement(office_ui_fabric_react_1.ActionButton, { "data-info-title": this.props.title + " löschen", "data-info-desc": this.props.title + " löschen", iconProps: {
                    iconName: "Delete",
                    className: "img-font-size-large"
                }, onClick: this.deleteClicked }) }, React.createElement("div", { className: "ms-Grid-row" },
            React.createElement("div", { className: "ms-Grid-col ms-sm12 ms-lg6" },
                React.createElement(office_ui_fabric_react_1.TextField, { placeholder: "Beschreibung der Ausgabe (z.B. Tanken)", required: true, label: "Beschreibung der Ausgabe", value: this.props.ausgabeModel.description, onChanged: this.onDescriptionChanged })),
            React.createElement("div", { className: "ms-Grid-col ms-sm12 ms-lg6" },
                React.createElement(NumberTextField_1.NumberTextField, { placeholder: "Ausgaben in Euro", label: "Wert der Ausgabe", required: true, numberValue: this.props.ausgabeModel.value, suffix: "Euro", onChanged: this.onValueChanged })))));
    }
}
exports.Ausgabe = Ausgabe;


/***/ }),

/***/ 912:
/*!****************************************************************!*\
  !*** ./src/projects/aldi/components/stateless/Routenfahrt.tsx ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ 1);
const office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 14);
const date_1 = __webpack_require__(/*! ../../../../helper/date */ 79);
const defaultOption = React.createElement("option", { key: "-1" }, "Bitte einen Wert angeben");
class Routenfahrt extends React.PureComponent {
    constructor(props) {
        super(props);
        this.deleteRoutenfahrtClicked = this.deleteRoutenfahrtClicked.bind(this);
        this.dateChanged = this.dateChanged.bind(this);
    }
    deleteRoutenfahrtClicked() {
        this.props.onDeleteClick(this.props.routenfahrtId);
    }
    dateChanged(date) {
        this.props.onDateChanged(this.props.routenfahrtId, date);
    }
    render() {
        console.log("render Routenfahrt");
        return (React.createElement("div", { className: "ms-Grid-row", key: "route_" + this.props.routenfahrtId },
            React.createElement("div", { className: "ms-Grid-col ms-sm2 ms-md1 ms-lg1" },
                React.createElement(office_ui_fabric_react_1.Label, { className: "ms-fontSize-l ms-textAlignCenter" }, this.props.title)),
            React.createElement("div", { className: "ms-Grid-col ms-sm8 ms-md8 ms-lg6" },
                React.createElement(office_ui_fabric_react_1.DatePicker, { placeholder: "Bitte Routenfahrdatum ausw\u00E4hlen", showWeekNumbers: true, showMonthPickerAsOverlay: true, allowTextInput: false, formatDate: date_1.getGermanDateString, firstDayOfWeek: 1, key: "fahrt" + this.props.routenfahrtId, value: this.props.value, onSelectDate: this.dateChanged })),
            React.createElement("div", { className: "ms-Grid-col ms-sm2 ms-md2 ms-lg1" },
                React.createElement(office_ui_fabric_react_1.ActionButton, { "data-info-title": "Fahrdatum entfernen", "data-info-desc": "L\u00F6scht das Fahrdatum", iconProps: {
                        iconName: "Delete",
                        className: "img-font-size-large"
                    }, onClick: this.deleteRoutenfahrtClicked }))));
    }
}
exports.Routenfahrt = Routenfahrt;


/***/ }),

/***/ 913:
/*!************************************!*\
  !*** ./node_modules/uuid/index.js ***!
  \************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var v1 = __webpack_require__(/*! ./v1 */ 914);
var v4 = __webpack_require__(/*! ./v4 */ 915);

var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;

module.exports = uuid;


/***/ }),

/***/ 914:
/*!*********************************!*\
  !*** ./node_modules/uuid/v1.js ***!
  \*********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(/*! ./lib/rng */ 364);
var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ 365);

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;
var _clockseq;

// Previous uuid creation time
var _lastMSecs = 0;
var _lastNSecs = 0;

// See https://github.com/broofa/node-uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189
  if (node == null || clockseq == null) {
    var seedBytes = rng();
    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [
        seedBytes[0] | 0x01,
        seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]
      ];
    }
    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  }

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
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : bytesToUuid(b);
}

module.exports = v1;


/***/ }),

/***/ 915:
/*!*********************************!*\
  !*** ./node_modules/uuid/v4.js ***!
  \*********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(/*! ./lib/rng */ 364);
var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ 365);

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
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

/***/ 916:
/*!**************************************************!*\
  !*** ./src/global/components/simple/ToolTip.tsx ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ 1);
class ToolTip extends React.PureComponent {
    render() {
        return (React.createElement("div", { style: { minWidth: "150px" } },
            React.createElement("div", { className: "ms-CalloutExample-header", style: { padding: "18px 24px 12px" } },
                React.createElement("span", { className: "ms-fontColor-themePrimary ms-fontWeight-semibold ms-font-l ms-fontSize-l" }, this.props.Title)),
            React.createElement("div", { className: "ms-CalloutExample-inner", style: { height: "100%", padding: "0 24px 20px" } },
                React.createElement("div", { className: "ms-font-l ms-fontSize-m" },
                    React.createElement("p", { className: "ms-CalloutExample-subText" }, this.props.Description)))));
    }
}
exports.ToolTip = ToolTip;


/***/ }),

/***/ 917:
/*!***********************************************************************!*\
  !*** ./src/projects/aldi/components/intelligent/Routenuebersicht.tsx ***!
  \***********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise) {
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ 1);
const axios_1 = __webpack_require__(/*! axios */ 30);
const office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 14);
const columns_1 = __webpack_require__(/*! ../../configuration/columns */ 366);
const BaseUebersicht_1 = __webpack_require__(/*! ../../../../global/components/simple/BaseUebersicht */ 367);
const promise_1 = __webpack_require__(/*! ../../../../helper/promise */ 133);
const sorting_1 = __webpack_require__(/*! ../../../../helper/sorting */ 368);
class Routenuebersicht extends React.Component {
    constructor(props) {
        super(props);
        this.selectionHasChanged = this.selectionHasChanged.bind(this);
        this.deleteAllRoutenClicked = this.deleteAllRoutenClicked.bind(this);
        this.deleteRouteClicked = this.deleteRouteClicked.bind(this);
        this.sortItems = this.sortItems.bind(this);
        this.deleteRoute = this.deleteRoute.bind(this);
        this.deleteRouten = this.deleteRouten.bind(this);
        this.editRoute = this.editRoute.bind(this);
        this.onCtxMenueVisible = this.onCtxMenueVisible.bind(this);
        this.renderContext = this.renderContext.bind(this);
        this.showMoreClicked = this.showMoreClicked.bind(this);
        let commardbarItems = [].concat(this.props.commandbarItems);
        if (!commardbarItems) {
            commardbarItems = [];
        }
        commardbarItems.push({
            key: "delete",
            name: "Delete Selected",
            icon: "delete",
            disabled: true,
            onClick: this.deleteAllRoutenClicked
        });
        let cols = columns_1.routeOverviewColumns.map(col => {
            if (col.fieldName === "ctx") {
                col.onRender = this.renderContext;
            }
            return col;
        });
        this.state = {
            isLoading: true,
            columns: cols,
            items: [],
            rawItems: [],
            selectedItems: [],
            commandbarItems: commardbarItems,
            ctxTarget: undefined,
            isCtxVisible: false
        };
    }
    componentDidMount() {
        this.loadRouten()
            .then((data) => {
            this.setState({
                rawItems: data.rawItems,
                items: data.transformedItems,
                isLoading: false
            });
            return null;
        })
            .catch(error => {
            alert("Fehler loadRouten");
        });
    }
    renderContext() {
        return (React.createElement("div", { className: "ms-font-xl ms-fontColor-themePrimary" },
            React.createElement(office_ui_fabric_react_1.IconButton, { checked: false, iconProps: { iconName: "More" }, title: "More", ariaLabel: "More", onClick: this.showMoreClicked })));
    }
    showMoreClicked(event) {
        this.setState({
            isCtxVisible: true,
            ctxTarget: event.target
        });
    }
    onCtxMenueVisible(isVisible) {
        if (this.state.isCtxVisible === isVisible) {
            return;
        }
        let ns = Object.assign({}, this.state);
        ns.isCtxVisible = isVisible;
        if (isVisible === false) {
            ns.ctxTarget = null;
        }
        this.setState(ns);
    }
    selectionHasChanged(selectedItems) {
        let newState = Object.assign({}, this.state);
        newState.selectedItems = selectedItems;
        newState.commandbarItems.forEach(item => {
            if (item.key === "delete") {
                item.disabled = !selectedItems || selectedItems.length < 1;
            }
        });
        this.setState(newState);
    }
    getRouteViewModelByRouteModel(items) {
        return items.map((item, index) => {
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
    }
    loadRouten() {
        return new Promise((resolve, reject) => {
            this.loadRoutenRequest()
                .then((data) => {
                let items = this.getRouteViewModelByRouteModel(data);
                resolve({
                    rawItems: data || [],
                    transformedItems: items || []
                });
            })
                .catch(() => {
                alert("Fehler beim Laden der Routen");
            });
        });
    }
    deleteRouten(routenElements) {
        return new Promise((resolve, reject) => {
            let promises = [];
            routenElements.forEach(route => {
                promises.push(this.deleteRouteElementRequest(route));
            });
            promise_1.promise_all_custom(promises)
                .then(() => {
                resolve();
            })
                .catch(() => {
                alert("Grober Fehler deleteRouten!");
                reject();
            });
        });
    }
    loadRoutenRequest() {
        return new Promise((resolve, reject) => {
            axios_1.default.get("/api/routen")
                .then(results => {
                resolve(results.data);
            })
                .catch(() => {
                reject();
            });
        });
    }
    deleteRouteElementRequest(route) {
        return axios_1.default.delete("/api/routen/" + route._id);
    }
    deleteRoute(selectedItems) {
        return new Promise((resolve, reject) => {
            if (!selectedItems ||
                selectedItems.length === 0 ||
                selectedItems.length > 1) {
                resolve();
                return null;
            }
            return this.deleteRouten(selectedItems)
                .then(() => {
                return this.loadRouten();
            })
                .then((data) => {
                this.setState({
                    rawItems: data.rawItems,
                    items: data.transformedItems,
                    isLoading: false
                }, () => {
                    resolve();
                    return null;
                });
            })
                .catch(error => {
                alert("Fehler deleteRoute");
                reject();
                return null;
            });
        });
    }
    editRoute(selectedRoute) {
        if (selectedRoute) {
            this.props.onEditRouteClick(selectedRoute);
        }
    }
    sortItems(propertyName, descending) {
        return sorting_1.sortArrayByProperty(this.state.items, propertyName, descending);
    }
    deleteRouteClicked(selectedItems) {
        return this.deleteRoute(selectedItems);
    }
    deleteAllRoutenClicked() {
        return this.setState({ isLoading: true }, () => {
            this.deleteRouten(this.state.selectedItems)
                .then(() => {
                this.loadRouten().then((data) => {
                    this.setState({
                        rawItems: data.rawItems,
                        items: data.transformedItems,
                        isLoading: false
                    });
                    return null;
                });
            })
                .catch(error => {
                alert("Fehler deleteAllRoutenClicked");
            });
        });
    }
    render() {
        console.log("render Routenuebersicht");
        return (React.createElement(BaseUebersicht_1.BaseUebersicht, { key: "ru", ctxTarget: this.state.ctxTarget, ctxVisible: this.state.isCtxVisible, onCtxMenueVisible: this.onCtxMenueVisible, onDeleteItemClicked: this.deleteRouteClicked, columns: this.state.columns, items: this.state.items, onEditItemClick: this.editRoute, onItemSelectionChanged: this.selectionHasChanged, sortByPropertyName: this.sortItems, isLoading: this.state.isLoading, loadingText: "Routen werden geladen", useCommandbar: true, enableSearchBox: false, commandbarItems: this.state.commandbarItems }));
    }
}
exports.Routenuebersicht = Routenuebersicht;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! bluebird */ 18)))

/***/ }),

/***/ 918:
/*!*******************************************************************!*\
  !*** ./src/projects/aldi/components/intelligent/UploadRoutes.tsx ***!
  \*******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise) {
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ 1);
const axios_1 = __webpack_require__(/*! axios */ 30);
const react_1 = __webpack_require__(/*! react */ 1);
const ButtonRow_1 = __webpack_require__(/*! ../../../../global/components/simple/ButtonRow */ 132);
class UploadRoutes extends React.Component {
    constructor(props) {
        super(props);
        this.textareaElement = undefined;
        this.uploadClick = this.uploadClick.bind(this);
        this.cancelClick = this.cancelClick.bind(this);
        this.setRef = this.setRef.bind(this);
    }
    saveRoutes(routes) {
        return new Promise((resolve, reject) => {
            let promises = [];
            routes.forEach(route => {
                promises.push(axios_1.default.post("/api/routen", { route }));
            });
            Promise.all(promises)
                .then(results => {
                console.log(JSON.stringify(results));
                let resultValue = [];
                results.forEach(p => {
                    if (p.data.insertedObjects && p.data.insertedObjects.length > 0) {
                        resultValue = resultValue.concat(p.data.insertedObjects);
                    }
                });
                resolve(resultValue);
            })
                .catch(error => {
                console.log("saveRoutes", JSON.stringify(error));
                reject({ message: "Kein Einfügen", error: error });
            });
        });
    }
    createRoutes(value) {
        let returnValues = [];
        if (!value) {
            return returnValues;
        }
        let routes = value.split("\n");
        routes.forEach(route => {
            let rows = route.split("\t");
            let r = {
                timestamp: Date.now(),
                route_timestamp: Date.now(),
                ausgaben: [],
                links: []
            };
            returnValues.push(r);
        });
        return;
    }
    uploadClick() {
        let routes = this.createRoutes(this.textareaElement ? this.textareaElement.value : "");
        this.props.uploadClick(routes);
    }
    cancelClick() {
        this.props.cancelClick();
    }
    setRef(element) {
        this.textareaElement = element;
    }
    render() {
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
                            onClickFunc: this.cancelClick
                        } })))));
    }
}
exports.UploadRoutes = UploadRoutes;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! bluebird */ 18)))

/***/ }),

/***/ 919:
/*!*********************************************************************!*\
  !*** ./src/projects/aldi/components/intelligent/UploadFilialen.tsx ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise) {
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ 1);
const axios_1 = __webpack_require__(/*! axios */ 30);
const office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 14);
const react_1 = __webpack_require__(/*! react */ 1);
const ButtonRow_1 = __webpack_require__(/*! ../../../../global/components/simple/ButtonRow */ 132);
const date_1 = __webpack_require__(/*! ../../../../helper/date */ 79);
const promise_1 = __webpack_require__(/*! ../../../../helper/promise */ 133);
class UploadFilialen extends React.Component {
    constructor(props) {
        super(props);
        this.textareaElement = undefined;
        this.selectRouteElement = undefined;
        this.cancelBtnClick = this.cancelBtnClick.bind(this);
        this.uploadClick = this.uploadClick.bind(this);
        this.setTextareaElement = this.setTextareaElement.bind(this);
        this.setSelectRouteElement = this.setSelectRouteElement.bind(this);
        this.state = {
            routes: [],
            isInitialized: false,
            isError: false,
            isUploading: false
        };
    }
    componentDidMount() {
        this.loadRoutenRequest()
            .then((result) => {
            this.setState({ routes: result, isInitialized: true });
        })
            .catch(e => {
            alert("Routen konnten nicht geladen werden...");
            this.setState({ isError: true });
        });
    }
    loadRoutenRequest() {
        return new Promise((resolve, reject) => {
            axios_1.default.get("/api/routen")
                .then(results => {
                resolve(results.data);
            })
                .catch(() => {
                reject();
            });
        });
    }
    saveFilialen(filialen) {
        let filialPromises = filialen.map((filiale, index) => {
            return axios_1.default.post("/api/filialen", {
                filiale
            });
        });
        return promise_1.promise_all_custom(filialPromises);
    }
    parseNumber(value) {
        value = value.replace(/,/g, ".");
        value = value.replace(/[^-0-9.]/g, "");
        let returnValue = parseFloat(value);
        if (isNaN(returnValue)) {
            return -1;
        }
        return returnValue;
    }
    createFilialen(value) {
        let ret = {
            import: [],
            importCount: 0,
            skipCount: 0,
            messages: []
        };
        if (!value) {
            ret.messages.push("Kein Initialwert übergeben");
            return ret;
        }
        let filialen = value.split("\n");
        if (!filialen || filialen.length === 0) {
            ret.messages.push("Es konnten keine Filialen ausgelesen werden");
            return ret;
        }
        let selectedRoute = "";
        if (this.selectRouteElement && this.selectRouteElement.options.length > 0) {
            selectedRoute = this.selectRouteElement.options[this.selectRouteElement.selectedIndex].value;
        }
        filialen.forEach(filiale => {
            let rows = filiale.split("\t");
            if (!rows || rows.length < 7) {
                ret.messages.push("Es konnten keine Filial-Eigenschaften ausgelesen werden. [Wert: " +
                    filiale +
                    "]");
                ret.skipCount += 1;
                return;
            }
            let model = {
                timestamp: Date.now(),
                ausgaben: this.parseNumber(rows[0].trim()),
                einnahmen: this.parseNumber(rows[1].trim()),
                plz: this.parseNumber(rows[2].trim()),
                ort: rows[3].trim(),
                strasse: rows[4].trim(),
                testnummer: this.parseNumber(rows[5].trim()),
                pkz: this.parseNumber(rows[6].trim()),
                route_id: selectedRoute
            };
            ret.importCount += 1;
            ret.import.push(model);
        });
        return ret;
    }
    cancelBtnClick() {
        this.props.cancelBtnClick();
    }
    uploadClick() {
        let filialen = this.createFilialen(this.textareaElement ? this.textareaElement.value : "");
        if (!filialen) {
            return;
        }
        this.setState({ isUploading: true }, () => {
            this.saveFilialen(filialen.import)
                .then(r => {
                if (r.length === filialen.importCount) {
                    this.props.uploadFinished();
                }
                else {
                    alert("NIX OK");
                }
                return null;
            })
                .catch(error => {
                alert("Globaler Error in saveFilialen");
                this.setState({ isError: true });
            });
        });
    }
    setTextareaElement(element) {
        this.textareaElement = element;
    }
    setSelectRouteElement(element) {
        this.selectRouteElement = element;
    }
    render() {
        console.log("render UploadFilialen");
        if (!this.state.isInitialized) {
            return React.createElement(office_ui_fabric_react_1.Spinner, { label: "Lade Daten..." });
        }
        if (this.state.isError) {
            return React.createElement("h1", null, "Es ist ein Fehler aufgetreten... ");
        }
        if (this.state.isUploading) {
            return React.createElement(office_ui_fabric_react_1.Spinner, { label: "Importiere Filialen..." });
        }
        return (React.createElement(react_1.Fragment, null,
            React.createElement("div", { className: "ms-Grid-row" },
                React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                    React.createElement("div", { style: { padding: "25px" } },
                        React.createElement(office_ui_fabric_react_1.Label, null, "Routenfahrt auswählen"),
                        React.createElement("select", { ref: this.setSelectRouteElement }, this.state.routes.map((route, index) => {
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
    }
}
exports.UploadFilialen = UploadFilialen;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! bluebird */ 18)))

/***/ }),

/***/ 920:
/*!***********************************************************************!*\
  !*** ./src/projects/aldi/components/intelligent/Filialuebersicht.tsx ***!
  \***********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise) {
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ 1);
const axios_1 = __webpack_require__(/*! axios */ 30);
const office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 14);
const columns_1 = __webpack_require__(/*! ../../configuration/columns */ 366);
const BaseUebersicht_1 = __webpack_require__(/*! ../../../../global/components/simple/BaseUebersicht */ 367);
const sorting_1 = __webpack_require__(/*! ../../../../helper/sorting */ 368);
const promise_1 = __webpack_require__(/*! ../../../../helper/promise */ 133);
class Filialuebersicht extends React.Component {
    constructor(props) {
        super(props);
        this.selectionHasChanged = this.selectionHasChanged.bind(this);
        this.deleteAllFilialenClicked = this.deleteAllFilialenClicked.bind(this);
        this.deleteFilialeClicked = this.deleteFilialeClicked.bind(this);
        this.sortItems = this.sortItems.bind(this);
        this.deleteFiliale = this.deleteFiliale.bind(this);
        this.deleteFilialen = this.deleteFilialen.bind(this);
        this.editFiliale = this.editFiliale.bind(this);
        this.onCtxMenueVisible = this.onCtxMenueVisible.bind(this);
        this.renderContext = this.renderContext.bind(this);
        this.showMoreClicked = this.showMoreClicked.bind(this);
        let commardbarItems = [].concat(this.props.commandbarItems);
        if (!commardbarItems) {
            commardbarItems = [];
        }
        commardbarItems.push({
            key: "delete",
            name: "Delete Selected",
            icon: "delete",
            disabled: true,
            onClick: this.deleteAllFilialenClicked
        });
        let cols = columns_1.filialOverviewColumns.map(col => {
            if (col.fieldName === "ctx") {
                col.onRender = this.renderContext;
            }
            return col;
        });
        this.state = {
            isLoading: true,
            columns: cols,
            items: [],
            rawItems: [],
            selectedItems: [],
            commandbarItems: commardbarItems,
            ctxTarget: undefined,
            isCtxVisible: false
        };
    }
    componentDidMount() {
        this.loadFilialen()
            .then((data) => {
            this.setState({
                rawItems: data.rawItems,
                items: data.transformedItems,
                isLoading: false
            });
            return null;
        })
            .catch(error => {
            alert("Fehler loadFilialen");
        });
    }
    renderContext() {
        return (React.createElement("div", { className: "ms-font-xl ms-fontColor-themePrimary" },
            React.createElement(office_ui_fabric_react_1.IconButton, { checked: false, iconProps: { iconName: "More" }, title: "More", ariaLabel: "More", onClick: this.showMoreClicked })));
    }
    showMoreClicked(event) {
        this.setState({
            isCtxVisible: true,
            ctxTarget: event.target
        });
    }
    selectionHasChanged(selectedItems) {
        let newState = Object.assign({}, this.state);
        newState.selectedItems = selectedItems;
        newState.commandbarItems.forEach(item => {
            if (item.key === "delete") {
                item.disabled = !selectedItems || selectedItems.length < 1;
            }
        });
        this.setState(newState);
    }
    getFilialViewModelByRouteModel(items) {
        return items.map((item, index) => {
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
    }
    loadFilialen() {
        return new Promise((resolve, reject) => {
            this.loadFilialenRequest()
                .then((data) => {
                let items = this.getFilialViewModelByRouteModel(data);
                resolve({
                    rawItems: data || [],
                    transformedItems: items || []
                });
            })
                .catch(() => {
                alert("Fehler beim Laden der Filialen");
            });
        });
    }
    deleteFilialen(filialElements) {
        return new Promise((resolve, reject) => {
            let promises = [];
            filialElements.forEach(filiale => {
                promises.push(this.deleteFilialeElementRequest(filiale));
            });
            promise_1.promise_all_custom(promises)
                .then(() => {
                resolve();
            })
                .catch(() => {
                alert("Grober Fehler!");
                reject();
            });
        });
    }
    loadFilialenRequest() {
        return new Promise((resolve, reject) => {
            axios_1.default.get("/api/filialen")
                .then(results => {
                resolve(results.data);
            })
                .catch(() => {
                reject();
            });
        });
    }
    deleteFilialeElementRequest(route) {
        return axios_1.default.delete("/api/filialen/" + route._id);
    }
    deleteFiliale(selectedItems) {
        return new Promise((resolve, reject) => {
            if (!selectedItems ||
                selectedItems.length === 0 ||
                selectedItems.length > 1) {
                resolve();
                return null;
            }
            return this.deleteFilialen(selectedItems)
                .then(() => {
                return this.loadFilialen();
            })
                .then((data) => {
                this.setState({
                    rawItems: data.rawItems,
                    items: data.transformedItems,
                    isLoading: false
                }, () => {
                    resolve();
                    return null;
                });
            })
                .catch(error => {
                alert("Fehler deleteFiliale");
                reject();
                return null;
            });
        });
    }
    editFiliale(selectedFiliale) {
        if (selectedFiliale) {
            this.props.onEditFilialeClick(selectedFiliale);
        }
    }
    sortItems(propertyName, descending) {
        return sorting_1.sortArrayByProperty(this.state.items, propertyName, descending);
    }
    deleteFilialeClicked(selectedItems) {
        return this.deleteFiliale(selectedItems);
    }
    deleteAllFilialenClicked() {
        return this.setState({ isLoading: true }, () => {
            this.deleteFilialen(this.state.selectedItems).then(() => {
                this.loadFilialen()
                    .then((data) => {
                    this.setState({
                        rawItems: data.rawItems,
                        items: data.transformedItems,
                        isLoading: false
                    });
                    return null;
                })
                    .catch(error => {
                    alert("Fehler loadFilialen");
                });
            });
        });
    }
    onCtxMenueVisible(isVisible) {
        if (this.state.isCtxVisible === isVisible) {
            return;
        }
        let ns = Object.assign({}, this.state);
        ns.isCtxVisible = isVisible;
        if (isVisible === false) {
            ns.ctxTarget = null;
        }
        this.setState(ns);
    }
    render() {
        console.log("render Filialuebersicht");
        return (React.createElement(BaseUebersicht_1.BaseUebersicht, { key: "fu", onCtxMenueVisible: this.onCtxMenueVisible, ctxVisible: this.state.isCtxVisible, ctxTarget: this.state.ctxTarget, onDeleteItemClicked: this.deleteFilialeClicked, columns: this.state.columns, items: this.state.items, onEditItemClick: this.editFiliale, onItemSelectionChanged: this.selectionHasChanged, sortByPropertyName: this.sortItems, isLoading: this.state.isLoading, loadingText: "Filialen werden geladen", useCommandbar: true, enableSearchBox: false, commandbarItems: this.state.commandbarItems }));
    }
}
exports.Filialuebersicht = Filialuebersicht;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! bluebird */ 18)))

/***/ }),

/***/ 921:
/*!**************************************************************!*\
  !*** ./src/projects/aldi/components/intelligent/Filiale.tsx ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ 1);
const axios_1 = __webpack_require__(/*! axios */ 30);
const enums_1 = __webpack_require__(/*! ../../../../enums/enums */ 197);
const Filiale_1 = __webpack_require__(/*! ../stateless/Filiale */ 363);
const promise_1 = __webpack_require__(/*! ../../../../helper/promise */ 133);
const office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 14);
const react_1 = __webpack_require__(/*! react */ 1);
const ButtonRow_1 = __webpack_require__(/*! ../../../../global/components/simple/ButtonRow */ 132);
class Filiale extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
        this.onAusgabenChanged = this.onAusgabenChanged.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.onEinnahmenChanged = this.onEinnahmenChanged.bind(this);
        this.onFahrdatumChanged = this.onFahrdatumChanged.bind(this);
        this.onOrtChanged = this.onOrtChanged.bind(this);
        this.onPkzChanged = this.onPkzChanged.bind(this);
        this.onPlzChanged = this.onPlzChanged.bind(this);
        this.onStrasseChanged = this.onStrasseChanged.bind(this);
        this.onTestnummerChanged = this.onTestnummerChanged.bind(this);
        this.saveClicked = this.saveClicked.bind(this);
        this.cancelClicked = this.cancelClicked.bind(this);
    }
    componentDidMount() {
        let promises = [axios_1.default.get("api/routen")];
        if (this.props.pageType !== enums_1.PageType.Add) {
            promises.push(axios_1.default.get("api/filialen/" + this.props.filialeId));
        }
        promise_1.promise_all_custom(promises)
            .then(data => {
            if (data[0].isError) {
                alert("Fehler beim Abfragen der Daten...");
                return;
            }
            if (this.props.pageType !== enums_1.PageType.Add) {
                if (data[1].isError) {
                    alert("Fehler beim Abfragen der Daten...");
                    return;
                }
            }
            let routes = data[0].data.data || [];
            if (!routes || routes.length === 0) {
                let ns = Object.assign({}, this.state);
                ns.loadingState = {
                    isLoading: false,
                    isError: true,
                    error: { message: "Keine Routen gefunden...", stacktrace: "" }
                };
                this.setState(ns);
                return;
            }
            routes = routes.sort((a, b) => {
                return a.route_timestamp > b.route_timestamp
                    ? 1
                    : a.route_timestamp < b.route_timestamp ? -1 : 0;
            });
            let dates = routes.map(route => {
                return new Date(route.route_timestamp);
            });
            let filiale = undefined;
            if (this.props.pageType === enums_1.PageType.Add) {
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
                let ns = Object.assign({}, this.state);
                ns.loadingState = {
                    isLoading: false,
                    isError: true,
                    error: { message: "Keine Filiale gefunden...", stacktrace: "" }
                };
                this.setState(ns);
                return;
            }
            let vm = {
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
            routes.forEach(route => {
                if (filiale.route_id === route._id) {
                    vm.fahrdatum = route.route_timestamp;
                }
            });
            this.setState({
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
            .catch(() => {
            alert("Fehler beim Laden");
        });
    }
    cancelClicked() {
        this.props.cancel_clicked();
    }
    saveClicked() {
        let routeId = "";
        this.state.routes.forEach(route => {
            if (route.route_timestamp === this.state.viewModel.fahrdatum) {
                routeId = route._id;
            }
        });
        let data = {
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
        if (this.props.pageType === enums_1.PageType.Edit) {
            axios_1.default.put("/api/filialen/" + this.state.dbEntry._id, { filiale: data })
                .then(response => {
                this.props.ok_clicked();
                return null;
            })
                .catch(e => {
                console.log("Fehler", JSON.stringify(e));
                alert("Fehler saveClicked");
            });
        }
        if (this.props.pageType === enums_1.PageType.Add) {
            axios_1.default.post("/api/filialen", { filiale: data })
                .then(response => {
                this.props.ok_clicked();
                return null;
            })
                .catch(e => {
                console.log("Fehler", JSON.stringify(e));
                alert("Fehler saveClicked");
            });
        }
        else {
            this.props.ok_clicked();
            return null;
        }
    }
    onDeleteClick(id) {
        alert("Löschen nicht erlaubt");
    }
    onFahrdatumChanged(id, value) {
        let vm = Object.assign({}, this.state);
        vm.viewModel.fahrdatum = value;
        this.setState(vm);
    }
    onPkzChanged(id, value) {
        let vm = Object.assign({}, this.state);
        vm.viewModel.pkz = value;
        this.setState(vm);
    }
    onTestnummerChanged(id, value) {
        let vm = Object.assign({}, this.state);
        vm.viewModel.testnummer = value;
        this.setState(vm);
    }
    onAusgabenChanged(id, value) {
        let vm = Object.assign({}, this.state);
        vm.viewModel.ausgaben = value;
        this.setState(vm);
    }
    onEinnahmenChanged(id, value) {
        let vm = Object.assign({}, this.state);
        vm.viewModel.einnahmen = value;
        this.setState(vm);
    }
    onOrtChanged(id, value) {
        let vm = Object.assign({}, this.state);
        vm.viewModel.ort = value;
        this.setState(vm);
    }
    onStrasseChanged(id, value) {
        let vm = Object.assign({}, this.state);
        vm.viewModel.strasse = value;
        this.setState(vm);
    }
    onPlzChanged(id, value) {
        let vm = Object.assign({}, this.state);
        vm.viewModel.plz = value;
        this.setState(vm);
    }
    render() {
        console.log("render Filiale");
        if (this.state.loadingState.isLoading) {
            return React.createElement(office_ui_fabric_react_1.Spinner, { label: "Lade Filiale...", size: office_ui_fabric_react_1.SpinnerSize.large });
        }
        if (this.state.loadingState.isError) {
            return (React.createElement("h1", null, "Es ist ein Fehler beim Laden aufgetreten... (Message: " +
                this.state.loadingState.error.message +
                ")"));
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
    }
}
exports.Filiale = Filiale;


/***/ }),

/***/ 922:
/*!*******************************************************!*\
  !*** ./src/global/components/simple/NotFoundPage.tsx ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ 1);
const react_router_dom_1 = __webpack_require__(/*! react-router-dom */ 84);
const Routing_1 = __webpack_require__(/*! ./Routing */ 369);
class NotFoundPage extends React.Component {
    render() {
        return (React.createElement(Routing_1.Status, { code: 404 },
            React.createElement("div", { className: "not-found" },
                React.createElement("h1", null, "404"),
                React.createElement("h2", null, "Page not found!"),
                React.createElement("p", null,
                    React.createElement(react_router_dom_1.Link, { to: "/", replace: true }, "Return to Main Page")))));
    }
}
exports.NotFoundPage = NotFoundPage;


/***/ })

},[405]);
//# sourceMappingURL=application.js.map