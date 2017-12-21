webpackJsonp([0],{

/***/ 110:
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
var Button_1 = __webpack_require__(/*! office-ui-fabric-react/lib/Button */ 17);
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
        return React.createElement("div", { className: c },
            React.createElement("div", { className: "custom-border-settings ms-borderColor-neutralLighter" },
                React.createElement("div", { className: "ms-bgColor-neutralLighter custom-panel-header" },
                    React.createElement(Button_1.IconButton, { disabled: false, style: { width: "40px", height: "36px" }, checked: false, iconProps: { iconName: this.props.canToggleContentHidden ? (this.state.isContentVisible ? "ChevronUp" : "ChevronDownMed") : "blank" }, title: "Emoji", ariaLabel: "Emoji", onClick: this.linkClicked }),
                    React.createElement("div", { onClick: this.linkClicked, style: { cursor: "pointer", width: this.props.headerControls ? "75%" : "100%" } },
                        React.createElement("span", { className: "ms-font-xl ms-fontColor-themePrimary" }, this.props.headerText)),
                    this.props.headerControls &&
                        this.props.headerControls),
                this.state.isContentVisible &&
                    React.createElement("div", { style: { padding: "10px", paddingTop: "15px" } }, this.props.children)));
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

/***/ 111:
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

/***/ 133:
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ 26);
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ 361);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ 206);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ 206);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../../process/browser.js */ 76)))

/***/ }),

/***/ 204:
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
var axios_1 = __webpack_require__(/*! axios */ 94);
var timers_1 = __webpack_require__(/*! timers */ 78);
var Yeelight_1 = __webpack_require__(/*! ../simple/Yeelight */ 376);
var react_1 = __webpack_require__(/*! react */ 1);
var intToRGB = __webpack_require__(/*! int-to-rgb */ 111);
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! bluebird */ 34)))

/***/ }),

/***/ 205:
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ 206:
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise) {

var utils = __webpack_require__(/*! ./../utils */ 26);
var settle = __webpack_require__(/*! ./../core/settle */ 362);
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ 364);
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ 365);
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ 366);
var createError = __webpack_require__(/*! ../core/createError */ 207);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(/*! ./../helpers/btoa */ 367);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if ("development" !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(/*! ./../helpers/cookies */ 368);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! bluebird */ 34)))

/***/ }),

/***/ 207:
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ 363);

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ 208:
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ 209:
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ 26:
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ 205);
var isBuffer = __webpack_require__(/*! is-buffer */ 359);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),

/***/ 278:
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
var axios_1 = __webpack_require__(/*! axios */ 94);
var BaseWeatherSensor_1 = __webpack_require__(/*! ../../../../global/components/simple/BaseWeatherSensor */ 656);
var timers_1 = __webpack_require__(/*! timers */ 78);
var intToRGB = __webpack_require__(/*! int-to-rgb */ 111);
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
        return React.createElement("div", { className: "ms-Grid-row" },
            React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                (!this.state.sensors || this.state.sensors.length < 1) &&
                    React.createElement("h1", { className: "ms-font-xl ms-fontColor-themePrimary" }, "Keine Sensoren gefunden"),
                React.createElement("div", { className: "ms-Grid-row" }, (this.state.sensors && this.state.sensors.length > 0) &&
                    this.state.sensors.map(function (sensor, index) {
                        return React.createElement("div", { className: "ms-Grid-col ms-sm12 ms-lg6 ms-xl3", key: "sensor_container_" + index },
                            React.createElement(BaseWeatherSensor_1.BaseWeatherSensor, { id: index, sensorInformations: sensor }));
                    }))));
    };
    return Application;
}(React.Component));
exports.Application = Application;


/***/ }),

/***/ 279:
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
var axios_1 = __webpack_require__(/*! axios */ 94);
var BaseLight_1 = __webpack_require__(/*! ../../../../global/components/simple/BaseLight */ 657);
var timers_1 = __webpack_require__(/*! timers */ 78);
var intToRGB = __webpack_require__(/*! int-to-rgb */ 111);
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
        return axios_1.default.get("/api/gateways").then(function (results) {
            if (_this.isMountedFinished === true) {
                var gws = results.data["gateways"];
                var gwLights = gws.map(_this.mapGatewayToLightModel);
                _this.setState({ gateways: gws, gatewayLights: gwLights });
            }
        }).catch(function (error) { });
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
        return React.createElement("div", { className: "ms-Grid-row" },
            React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                (!this.state.gatewayLights || this.state.gatewayLights.length < 1) &&
                    React.createElement("h1", { className: "ms-font-xl ms-fontColor-themePrimary" }, "Keine Gateways gefunden"),
                React.createElement("div", { className: "ms-Grid-row" }, (this.state.gatewayLights && this.state.gatewayLights.length > 0) &&
                    this.state.gatewayLights.map(function (gw, index) {
                        return React.createElement("div", { className: "ms-Grid-col ms-sm12 ms-lg6 ms-xl3", key: "gwr_" + index },
                            React.createElement(BaseLight_1.BaseLight, { lightInformation: gw, id: index, onBrightnessChanged: function (lightInformation, brightness) {
                                    axios_1.default.post("/api/gateways/" + lightInformation.id + "/brightness/" + brightness)
                                        .then(_this.loadDevices);
                                }, onColorChanged: function (lightInformation, color) {
                                    axios_1.default.post("/api/gateways/" + lightInformation.id + "/color", { color: color })
                                        .then(_this.loadDevices);
                                }, onColorSchemaChanged: function (lightInformation, color, brightness) {
                                    axios_1.default.post("/api/gateways/" + lightInformation.id + "/color", { color: color })
                                        .then(function () {
                                        return axios_1.default.post("/api/gateways/" + lightInformation.id + "/brightness/" + brightness);
                                    })
                                        .then(_this.loadDevices);
                                }, onPowerChanged: function (lightInformation) {
                                    axios_1.default.post("/api/gateways/" + lightInformation.id + "/power")
                                        .then(_this.loadDevices);
                                } }));
                    }))));
    };
    return Application;
}(React.Component));
exports.Application = Application;


/***/ }),

/***/ 280:
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
var office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 35);
var axios_1 = __webpack_require__(/*! axios */ 94);
var timers_1 = __webpack_require__(/*! timers */ 78);
var react_1 = __webpack_require__(/*! react */ 1);
var intToRGB = __webpack_require__(/*! int-to-rgb */ 111);
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

/***/ 281:
/*!***************************!*\
  !*** ./src/data/enums.ts ***!
  \***************************/
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

/***/ 282:
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
var office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 35);
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

/***/ 283:
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
var react_router_dom_1 = __webpack_require__(/*! react-router-dom */ 73);
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

/***/ 318:
/*!*******************************************************!*\
  !*** multi ./src/global/components/pages/initApp.tsx ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/global/components/pages/initApp.tsx */319);


/***/ }),

/***/ 319:
/*!*************************************************!*\
  !*** ./src/global/components/pages/initApp.tsx ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ReactDOM = __webpack_require__(/*! react-dom */ 49);
var React = __webpack_require__(/*! react */ 1);
var globalApplication_1 = __webpack_require__(/*! ./globalApplication */ 334);
var react_router_dom_1 = __webpack_require__(/*! react-router-dom */ 73);
var icons_1 = __webpack_require__(/*! @uifabric/icons */ 669);
icons_1.initializeIcons();
window.onload = function () {
    ReactDOM.render(React.createElement(react_router_dom_1.HashRouter, null,
        React.createElement(globalApplication_1.GlobalApplication, { requestUrl: "" })), document.getElementById("reactRoot"));
};


/***/ }),

/***/ 334:
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
var react_router_dom_1 = __webpack_require__(/*! react-router-dom */ 73);
var application_1 = __webpack_require__(/*! ./application */ 356);
var application_2 = __webpack_require__(/*! ../../../projects/yeelight/components/pages/application */ 204);
var application_3 = __webpack_require__(/*! ../../../projects/vacuumRoboter/components/pages/application */ 658);
var Application_1 = __webpack_require__(/*! ../../../projects/aldi/components/pages/Application */ 662);
var sensors_1 = __webpack_require__(/*! ../../../projects/xiaomi/components/pages/sensors */ 278);
var gateways_1 = __webpack_require__(/*! ../../../projects/xiaomi/components/pages/gateways */ 279);
var NotFoundPage_1 = __webpack_require__(/*! ../../components/simple/NotFoundPage */ 668);
var Routing_1 = __webpack_require__(/*! ../simple/Routing */ 283);
var basePage_1 = __webpack_require__(/*! ../container/basePage */ 282);
var systeminfo_1 = __webpack_require__(/*! ../../../projects/system/components/pages/systeminfo */ 280);
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
        return React.createElement(basePage_1.BasePage, { IncludeFabricElement: true, Body: React.createElement(react_router_dom_1.Switch, null,
                React.createElement(Routing_1.RedirectWithStatus, { status: 302, from: "/courses", to: "/aldi" }),
                React.createElement(react_router_dom_1.Route, { exact: true, path: "/", component: application_1.Application, key: "r1" }),
                React.createElement(react_router_dom_1.Route, { path: "/system", component: systeminfo_1.SystemInfo, key: "r8" }),
                React.createElement(react_router_dom_1.Route, { path: "/light", component: application_2.Application, key: "r2" }),
                React.createElement(react_router_dom_1.Route, { path: "/aldi", component: Application_1.Application, key: "r3" }),
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
                        React.createElement(react_router_dom_1.Link, { to: "/vacuum", replace: true }, "Vacuum")))) });
    };
    return GlobalApplication;
}(React.Component));
exports.GlobalApplication = GlobalApplication;


/***/ }),

/***/ 356:
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
var application_1 = __webpack_require__(/*! ../../../projects/yeelight/components/pages/application */ 204);
var sensors_1 = __webpack_require__(/*! ../../../projects/xiaomi/components/pages/sensors */ 278);
var gateways_1 = __webpack_require__(/*! ../../../projects/xiaomi/components/pages/gateways */ 279);
var office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 35);
var PivotItem_1 = __webpack_require__(/*! office-ui-fabric-react/lib/components/Pivot/PivotItem */ 162);
var systeminfo_1 = __webpack_require__(/*! ../../../projects/system/components/pages/systeminfo */ 280);
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
                React.createElement(PivotItem_1.PivotItem, { linkText: "Yeelights", itemIcon: "Lightbulb" },
                    React.createElement("div", { style: { paddingTop: "15px" } }, this.state.YeelightInformations)),
                React.createElement(PivotItem_1.PivotItem, { linkText: "Gateways", itemIcon: "Light" },
                    React.createElement("div", { style: { paddingTop: "15px" } }, this.state.GatewayInformations)),
                React.createElement(PivotItem_1.PivotItem, { linkText: "Sensoren", itemIcon: "CloudWeather" },
                    React.createElement("div", { style: { paddingTop: "15px" } }, this.state.SensorInformations)))));
    };
    return Application;
}(React.PureComponent));
exports.Application = Application;


/***/ }),

/***/ 358:
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise) {

var utils = __webpack_require__(/*! ./utils */ 26);
var bind = __webpack_require__(/*! ./helpers/bind */ 205);
var Axios = __webpack_require__(/*! ./core/Axios */ 360);
var defaults = __webpack_require__(/*! ./defaults */ 133);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ 209);
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ 374);
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ 208);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ 375);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! bluebird */ 34)))

/***/ }),

/***/ 359:
/*!*****************************************!*\
  !*** ./node_modules/is-buffer/index.js ***!
  \*****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),

/***/ 360:
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise) {

var defaults = __webpack_require__(/*! ./../defaults */ 133);
var utils = __webpack_require__(/*! ./../utils */ 26);
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ 369);
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ 370);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);
  config.method = config.method.toLowerCase();

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! bluebird */ 34)))

/***/ }),

/***/ 361:
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ 26);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ 362:
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ 207);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ 363:
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),

/***/ 364:
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ 26);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      }

      if (!utils.isArray(val)) {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ 365:
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ 26);

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ 366:
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ 26);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),

/***/ 367:
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/btoa.js ***!
  \************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),

/***/ 368:
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ 26);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),

/***/ 369:
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ 26);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ 370:
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise) {

var utils = __webpack_require__(/*! ./../utils */ 26);
var transformData = __webpack_require__(/*! ./transformData */ 371);
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ 208);
var defaults = __webpack_require__(/*! ../defaults */ 133);
var isAbsoluteURL = __webpack_require__(/*! ./../helpers/isAbsoluteURL */ 372);
var combineURLs = __webpack_require__(/*! ./../helpers/combineURLs */ 373);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! bluebird */ 34)))

/***/ }),

/***/ 371:
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ 26);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ 372:
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ 373:
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ 374:
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise) {

var Cancel = __webpack_require__(/*! ./Cancel */ 209);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! bluebird */ 34)))

/***/ }),

/***/ 375:
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ 376:
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
var office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 35);
var Panel_1 = __webpack_require__(/*! ../../../../global/components/simple/Panel */ 110);
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

/***/ 656:
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
var Panel_1 = __webpack_require__(/*! ../../../global/components/simple/Panel */ 110);
var BaseWeatherSensor = (function (_super) {
    __extends(BaseWeatherSensor, _super);
    function BaseWeatherSensor(props) {
        return _super.call(this, props) || this;
    }
    BaseWeatherSensor.prototype.render = function () {
        console.log("BaseWeatherSensor render");
        return React.createElement("div", { className: "ms-Grid-row", key: "sensor" + this.props.id },
            React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                React.createElement(Panel_1.Panel, { headerText: this.props.sensorInformations.name, className: "custom-padding-bottom-10px" },
                    React.createElement("div", { className: "ms-Grid-row" },
                        React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                            React.createElement("h1", { className: "ms-font-su ms-fontColor-themePrimary" }, this.props.sensorInformations.temperature + " °C"))),
                    React.createElement("div", { className: "ms-Grid-row" },
                        React.createElement("div", { className: "ms-Grid-col ms-sm6" },
                            React.createElement("h1", { className: "ms-font-xl ms-fontColor-themePrimary" },
                                this.props.sensorInformations.humidity,
                                React.createElement("i", { className: "ms-Icon ms-Icon--Precipitation", "aria-hidden": "true" }))),
                        this.props.sensorInformations.hasPressure &&
                            React.createElement("div", { className: "ms-Grid-col ms-sm6" },
                                React.createElement("h1", { className: "ms-font-xl ms-fontColor-themePrimary" }, this.props.sensorInformations.pressure))))));
    };
    return BaseWeatherSensor;
}(React.Component));
exports.BaseWeatherSensor = BaseWeatherSensor;


/***/ }),

/***/ 657:
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
var office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 35);
var Panel_1 = __webpack_require__(/*! ../../../global/components/simple/Panel */ 110);
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

/***/ 658:
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
var debug = __webpack_require__(/*! debug */ 659);
var Application = (function (_super) {
    __extends(Application, _super);
    function Application(props) {
        return _super.call(this, props) || this;
    }
    Application.prototype.componentDidMount = function () {
        document.title = "Vacuum Roboter Hauptseite";
        debug("Component:Application")("Application Url: " + this.props.requestUrl);
    };
    Application.prototype.render = function () {
        return React.createElement("h1", null,
            "Hello from Vacuum Roboter!",
            React.createElement("br", null),
            "Your requested url is ",
            this.props.requestUrl);
    };
    return Application;
}(React.Component));
exports.Application = Application;


/***/ }),

/***/ 659:
/*!*******************************************!*\
  !*** ./node_modules/debug/src/browser.js ***!
  \*******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(/*! ./debug */ 660);
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  '#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC',
  '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF',
  '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC',
  '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF',
  '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC',
  '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033',
  '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366',
  '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933',
  '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC',
  '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF',
  '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // Internet Explorer and Edge do not support colors.
  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit')

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = Object({"NODE_ENV":"development"}).DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../../process/browser.js */ 76)))

/***/ }),

/***/ 660:
/*!*****************************************!*\
  !*** ./node_modules/debug/src/debug.js ***!
  \*****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__(/*! ms */ 661);

/**
 * Active `debug` instances.
 */
exports.instances = [];

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  var prevTime;

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);
  debug.destroy = destroy;

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  exports.instances.push(debug);

  return debug;
}

function destroy () {
  var index = exports.instances.indexOf(this);
  if (index !== -1) {
    exports.instances.splice(index, 1);
    return true;
  } else {
    return false;
  }
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var i;
  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }

  for (i = 0; i < exports.instances.length; i++) {
    var instance = exports.instances[i];
    instance.enabled = exports.enabled(instance.namespace);
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  if (name[name.length - 1] === '*') {
    return true;
  }
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}


/***/ }),

/***/ 661:
/*!**********************************!*\
  !*** ./node_modules/ms/index.js ***!
  \**********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') ||
    plural(ms, h, 'hour') ||
    plural(ms, m, 'minute') ||
    plural(ms, s, 'second') ||
    ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}


/***/ }),

/***/ 662:
/*!************************************************************!*\
  !*** ./src/projects/aldi/components/pages/Application.tsx ***!
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
var office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 35);
var ManageRoute_1 = __webpack_require__(/*! ./ManageRoute */ 663);
var enums_1 = __webpack_require__(/*! ../../../../data/enums */ 281);
var ToolTip_1 = __webpack_require__(/*! ../../../../global/components/simple/ToolTip */ 667);
var Application = (function (_super) {
    __extends(Application, _super);
    function Application(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { modalContent: undefined, showModal: false, isCalloutVisible: false, callOutContent: undefined };
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
        var c = React.createElement(ManageRoute_1.ManageRoute, { onExitPage: this.closeModal, pageType: enums_1.PageType.Add });
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
        var title = this.targetCallOutElement.hasAttribute("data-info-title") ? this.targetCallOutElement.getAttribute("data-info-title") : "";
        var description = this.targetCallOutElement.hasAttribute("data-info-desc") ? this.targetCallOutElement.getAttribute("data-info-desc") : "";
        if (!title && !description) {
            return;
        }
        this.setState({ isCalloutVisible: true, callOutContent: React.createElement(ToolTip_1.ToolTip, { Title: title, Description: description }) });
        return false;
    };
    Application.prototype.hideCallOut = function () {
        console.log("MouseOut");
        this.targetCallOutElement = null;
        this.setState({ isCalloutVisible: false, callOutContent: undefined });
        return false;
    };
    Application.prototype.render = function () {
        return React.createElement("div", { className: "ms-Grid-row" },
            (this.state.modalContent && this.state.showModal) &&
                React.createElement("div", { className: "ms-Grid-col ms-sm12" }, this.state.modalContent),
            (this.state.showModal === false) &&
                React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                    React.createElement("div", { className: "ms-Grid-row" },
                        React.createElement("div", { className: "ms-Grid-col ms-sm12 ms-lg4" },
                            React.createElement("div", { className: "custom-cmd-button" },
                                React.createElement(office_ui_fabric_react_1.CommandBarButton, { "data-info-title": "Route erfassen", "data-info-desc": "Erstellt eine neue Route für Aldi", iconProps: { iconName: "Add" }, text: "Route erfassen", onClick: this.addRouteClick, onMouseEnter: this.showCallOut, onMouseLeave: this.hideCallOut }))),
                        React.createElement("div", { className: "ms-Grid-col ms-sm12 ms-lg4" },
                            React.createElement("div", { className: "custom-cmd-button" },
                                React.createElement(office_ui_fabric_react_1.CommandBarButton, { iconProps: { iconName: "Add" }, text: "Filialen erfassen" }))))),
            this.state.isCalloutVisible &&
                React.createElement("div", null,
                    React.createElement(office_ui_fabric_react_1.Callout, { role: "alertdialog", ariaLabelledBy: "callout-label-2", className: "ms-CalloutExample-callout", gapSpace: 0, target: this.targetCallOutElement, onDismiss: this.hideCallOut, setInitialFocus: true }, this.state.callOutContent)));
    };
    return Application;
}(React.Component));
exports.Application = Application;


/***/ }),

/***/ 663:
/*!************************************************************!*\
  !*** ./src/projects/aldi/components/pages/ManageRoute.tsx ***!
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
var office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 35);
var enums_1 = __webpack_require__(/*! ../../../../data/enums */ 281);
var basePage_1 = __webpack_require__(/*! ../../../../global/components/container/basePage */ 282);
var ButtonRow_1 = __webpack_require__(/*! ../../../../global/components/simple/ButtonRow */ 664);
var Panel_1 = __webpack_require__(/*! ../../../../global/components/simple/Panel */ 110);
var NumberTextField_1 = __webpack_require__(/*! ../../../../global/components/simple/NumberTextField */ 665);
var date_1 = __webpack_require__(/*! ../../../../helper/date */ 666);
var ManageRoute = (function (_super) {
    __extends(ManageRoute, _super);
    function ManageRoute(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { filialen: [], routenfahrten: [], ausgaben: [], googleMapsLink: "" };
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
            return React.createElement("option", { value: index, key: "fahrt_opt_" + index }, date_1.getGermanDateString(fahrt));
        });
    };
    ManageRoute.prototype.render = function () {
        var _this = this;
        console.log("render ManageRoute");
        return React.createElement(basePage_1.BasePage, { IncludeFabricElement: false, Body: React.createElement("div", { className: "ms-Grid" },
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
                            (!this.state.ausgaben || this.state.ausgaben.length < 1) &&
                                React.createElement("div", { className: "ms-font-xl ms-fontColor-themePrimary" }, "Es wurden bisher keine Ausgaben erfasst"),
                            this.state.ausgaben.map(function (ausgabenWert, index) {
                                return React.createElement(Panel_1.Panel, { key: "ausgabe_" + index, headerText: "Ausgabe " + (index + 1), className: "custom-padding-bottom-10px", headerControls: React.createElement(office_ui_fabric_react_1.ActionButton, { "data-info-title": "Ausgabe " + (index + 1), "data-info-desc": "Ausgabe " + (index + 1), iconProps: { iconName: "Delete", className: "img-font-size-large" }, onClick: function () {
                                            var ns = __assign({}, _this.state);
                                            ns.ausgaben.splice(index, 1);
                                            _this.setState(ns);
                                        } }) }, React.createElement("div", { className: "ms-Grid-row" },
                                    React.createElement("div", { className: "ms-Grid-col ms-sm12 ms-lg6 " },
                                        React.createElement(office_ui_fabric_react_1.TextField, { placeholder: "Ausgabenbeschreibung", required: true, label: "Beschreibung der Ausgabe", value: ausgabenWert.title })),
                                    React.createElement("div", { className: "ms-Grid-col ms-sm12 ms-lg6" },
                                        React.createElement(NumberTextField_1.NumberTextField, { placeholder: "Ausgaben in Euro", label: "Wert der Ausgabe", required: true, numberValue: ausgabenWert.value, suffix: " Euro" }))));
                            })))),
                React.createElement("div", { className: "ms-Grid-row" },
                    React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                        React.createElement(Panel_1.Panel, { headerText: "Routenfahr-Daten verwalten", className: "custom-padding-bottom-10px", headerControls: React.createElement(office_ui_fabric_react_1.ActionButton, { "data-automation-id": "Add Routenfahrt", iconProps: { iconName: "Add" }, onClick: function () {
                                    var fahrten = _this.state.routenfahrten.concat([new Date()]);
                                    _this.setState({ routenfahrten: fahrten });
                                } }) },
                            (!this.state.routenfahrten || this.state.routenfahrten.length < 1) &&
                                React.createElement("div", { className: "ms-font-xl ms-fontColor-themePrimary" }, "Es wurden bisher keine Fahrdaten erfasst"),
                            this.state.routenfahrten.map(function (fahrt, index) {
                                return React.createElement("div", { className: "ms-Grid-row", key: "route_" + index },
                                    React.createElement("div", { className: "ms-Grid-col ms-sm2 ms-md1 ms-lg1" },
                                        React.createElement(office_ui_fabric_react_1.Label, { className: "ms-fontSize-l ms-textAlignCenter" }, index + 1)),
                                    React.createElement("div", { className: "ms-Grid-col ms-sm8 ms-md8 ms-lg6" },
                                        React.createElement(office_ui_fabric_react_1.DatePicker, { placeholder: "Bitte Fahrdatum auswählen", showWeekNumbers: true, showMonthPickerAsOverlay: true, allowTextInput: false, formatDate: date_1.getGermanDateString, firstDayOfWeek: 1, key: "fahrt" + index, value: fahrt, onSelectDate: function (date) {
                                                var ns = __assign({}, _this.state);
                                                ns.routenfahrten[index] = date;
                                                _this.setState(ns);
                                            } })),
                                    React.createElement("div", { className: "ms-Grid-col ms-sm2 ms-md2 ms-lg1" },
                                        React.createElement(office_ui_fabric_react_1.ActionButton, { "data-info-title": "Fahrdatum entfernen", "data-info-desc": "Löscht das Fahrdatum", iconProps: { iconName: "Delete", className: "img-font-size-large" }, onClick: function () {
                                                var ns = __assign({}, _this.state);
                                                ns.routenfahrten.splice(index, 1);
                                                _this.setState(ns);
                                            } })));
                            })))),
                React.createElement("div", { className: "ms-Grid-row" },
                    React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                        React.createElement(Panel_1.Panel, { headerText: "Fahrten verwalten", className: "custom-padding-bottom-10px", headerControls: React.createElement(office_ui_fabric_react_1.ActionButton, { "data-automation-id": "Add Ausgabe", iconProps: { iconName: "Add" }, onClick: function () {
                                    var ns = __assign({}, _this.state);
                                    ns.filialen.push({ Ausgaben: 0, Einnahmen: 0, Ort: "", Pkz: 0, Plz: 0, Straße: "", Testnummer: 0 });
                                    _this.setState(ns);
                                } }) },
                            (!this.state.filialen || this.state.filialen.length < 1) &&
                                React.createElement("div", { className: "ms-font-xl ms-fontColor-themePrimary" }, "Es wurden bisher keine Filialen erfasst"),
                            this.state.filialen.map(function (filiale, index) {
                                return React.createElement("div", { className: "ms-Grid-row", key: "fahrt_" + index },
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
                                                    React.createElement(NumberTextField_1.NumberTextField, { placeholder: "Ausgaben", label: "Ausgaben", numberValue: filiale.Ausgaben, suffix: " €" }))))));
                            })))),
                React.createElement("div", { className: "ms-Grid-row" },
                    React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                        React.createElement(ButtonRow_1.ButtonRow, { saveButtonProps: { checked: false, disabled: false, text: "Speichern", onClickFunc: this.saveClick }, cancelButtonProps: { checked: true, disabled: false, text: "Abbrechen", onClickFunc: this.cancelClick } })))), Header: React.createElement("div", { className: "ms-font-xxl ms-textAlignCenter" }, "Route verwalten") });
    };
    return ManageRoute;
}(React.Component));
exports.ManageRoute = ManageRoute;


/***/ }),

/***/ 664:
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
var office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 35);
var ButtonRow = (function (_super) {
    __extends(ButtonRow, _super);
    function ButtonRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonRow.prototype.render = function () {
        return React.createElement("div", { className: "ms-Grid-row" },
            React.createElement("div", { className: "ms-Grid-col ms-sm12 ms-textAlignRight" },
                React.createElement(office_ui_fabric_react_1.ActionButton, { "data-automation-id": "save", key: "save_btn_" + Date.now(), iconProps: { iconName: "Save" }, disabled: this.props.saveButtonProps.disabled, checked: this.props.saveButtonProps.checked, onClick: this.props.saveButtonProps.onClickFunc }, this.props.saveButtonProps.text),
                React.createElement(office_ui_fabric_react_1.ActionButton, { "data-automation-id": "cancel", key: "cancel_btn_" + Date.now(), iconProps: { iconName: "Cancel" }, disabled: this.props.cancelButtonProps.disabled, checked: this.props.cancelButtonProps.checked, onClick: this.props.cancelButtonProps.onClickFunc }, this.props.cancelButtonProps.text)));
    };
    return ButtonRow;
}(React.PureComponent));
exports.ButtonRow = ButtonRow;


/***/ }),

/***/ 665:
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
var office_ui_fabric_react_1 = __webpack_require__(/*! office-ui-fabric-react */ 35);
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

/***/ 666:
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
    return date.toLocaleString("de-DE", { year: "numeric", month: "2-digit", day: "2-digit" });
}
exports.getGermanDateString = getGermanDateString;


/***/ }),

/***/ 667:
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

/***/ 668:
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
var react_router_dom_1 = __webpack_require__(/*! react-router-dom */ 73);
var Routing_1 = __webpack_require__(/*! ./Routing */ 283);
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

/***/ 669:
/*!***************************************************!*\
  !*** ./node_modules/@uifabric/icons/lib/index.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var fabric_icons_1 = __webpack_require__(/*! ./fabric-icons */ 670);
var fabric_icons_0_1 = __webpack_require__(/*! ./fabric-icons-0 */ 671);
var fabric_icons_1_1 = __webpack_require__(/*! ./fabric-icons-1 */ 672);
var fabric_icons_2_1 = __webpack_require__(/*! ./fabric-icons-2 */ 673);
var fabric_icons_3_1 = __webpack_require__(/*! ./fabric-icons-3 */ 674);
var fabric_icons_4_1 = __webpack_require__(/*! ./fabric-icons-4 */ 675);
var fabric_icons_5_1 = __webpack_require__(/*! ./fabric-icons-5 */ 676);
var fabric_icons_6_1 = __webpack_require__(/*! ./fabric-icons-6 */ 677);
var fabric_icons_7_1 = __webpack_require__(/*! ./fabric-icons-7 */ 678);
var fabric_icons_8_1 = __webpack_require__(/*! ./fabric-icons-8 */ 679);
var fabric_icons_9_1 = __webpack_require__(/*! ./fabric-icons-9 */ 680);
var fabric_icons_10_1 = __webpack_require__(/*! ./fabric-icons-10 */ 681);
var fabric_icons_11_1 = __webpack_require__(/*! ./fabric-icons-11 */ 682);
__webpack_require__(/*! ./icon-aliases */ 683);
var DEFAULT_BASE_URL = 'https://spoprod-a.akamaihd.net/files/fabric/assets/icons/';
function initializeIcons(baseUrl, options) {
    if (baseUrl === void 0) { baseUrl = DEFAULT_BASE_URL; }
    [fabric_icons_1.initializeIcons, fabric_icons_0_1.initializeIcons, fabric_icons_1_1.initializeIcons, fabric_icons_2_1.initializeIcons, fabric_icons_3_1.initializeIcons, fabric_icons_4_1.initializeIcons, fabric_icons_5_1.initializeIcons, fabric_icons_6_1.initializeIcons, fabric_icons_7_1.initializeIcons, fabric_icons_8_1.initializeIcons, fabric_icons_9_1.initializeIcons, fabric_icons_10_1.initializeIcons, fabric_icons_11_1.initializeIcons].forEach(function (initialize) { return initialize(baseUrl, options); });
}
exports.initializeIcons = initializeIcons;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 670:
/*!**********************************************************!*\
  !*** ./node_modules/@uifabric/icons/lib/fabric-icons.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// tslint:disable:max-line-length
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(/*! @uifabric/styling/lib/index */ 20);
function initializeIcons(baseUrl, options) {
    if (baseUrl === void 0) { baseUrl = ''; }
    var subset = {
        style: {
            MozOsxFontSmoothing: 'grayscale',
            WebkitFontSmoothing: 'antialiased',
            fontStyle: 'normal',
            fontWeight: 'normal',
            speak: 'none'
        },
        fontFace: {
            fontFamily: "\"FabricMDL2Icons\"",
            src: "url('" + baseUrl + "fabric-icons-4ac62dd2.woff') format('woff')",
        },
        icons: {
            'GlobalNavButton': '\uE700',
            'ChevronDown': '\uE70D',
            'ChevronUp': '\uE70E',
            'Edit': '\uE70F',
            'Add': '\uE710',
            'Cancel': '\uE711',
            'More': '\uE712',
            'Settings': '\uE713',
            'Mail': '\uE715',
            'Filter': '\uE71C',
            'Search': '\uE721',
            'Share': '\uE72D',
            'FavoriteStar': '\uE734',
            'FavoriteStarFill': '\uE735',
            'CheckMark': '\uE73E',
            'Delete': '\uE74D',
            'ChevronLeft': '\uE76B',
            'ChevronRight': '\uE76C',
            'Calendar': '\uE787',
            'Undo': '\uE7A7',
            'Flag': '\uE7C1',
            'Page': '\uE7C3',
            'View': '\uE890',
            'Clear': '\uE894',
            'Download': '\uE896',
            'Upload': '\uE898',
            'Folder': '\uE8B7',
            'Sort': '\uE8CB',
            'AlignRight': '\uE8E2',
            'AlignLeft': '\uE8E4',
            'Tag': '\uE8EC',
            'AddFriend': '\uE8FA',
            'Info': '\uE946',
            'Pinned': '\uE840',
            'SortLines': '\uE9D0',
            'List': '\uEA37',
            'CircleRing': '\uEA3A',
            'Heart': '\uEB51',
            'HeartFill': '\uEB52',
            'Tiles': '\uECA5',
            'Embed': '\uECCE',
            'Ascending': '\uEDC0',
            'Descending': '\uEDC1',
            'SortUp': '\uEE68',
            'SortDown': '\uEE69',
            'SyncToPC': '\uEE6E',
            'LargeGrid': '\uEECB',
            'SkypeCheck': '\uEF80',
            'SkypeClock': '\uEF81',
            'SkypeMinus': '\uEF82',
            'ClearFilter': '\uEF8F',
            'Flow': '\uEF90',
            'StatusCircleCheckmark': '\uF13E',
            'MoreVertical': '\uF2BC'
        }
    };
    index_1.registerIcons(subset, options);
}
exports.initializeIcons = initializeIcons;
//# sourceMappingURL=fabric-icons.js.map

/***/ }),

/***/ 671:
/*!************************************************************!*\
  !*** ./node_modules/@uifabric/icons/lib/fabric-icons-0.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// tslint:disable:max-line-length
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(/*! @uifabric/styling/lib/index */ 20);
function initializeIcons(baseUrl, options) {
    if (baseUrl === void 0) { baseUrl = ''; }
    var subset = {
        style: {
            MozOsxFontSmoothing: 'grayscale',
            WebkitFontSmoothing: 'antialiased',
            fontStyle: 'normal',
            fontWeight: 'normal',
            speak: 'none'
        },
        fontFace: {
            fontFamily: "\"FabricMDL2Icons-0\"",
            src: "url('" + baseUrl + "fabric-icons-0-8a1666a2.woff') format('woff')",
        },
        icons: {
            'DecreaseIndentLegacy': '\uE290',
            'IncreaseIndentLegacy': '\uE291',
            'InternetSharing': '\uE704',
            'Brightness': '\uE706',
            'MapPin': '\uE707',
            'Airplane': '\uE709',
            'Tablet': '\uE70A',
            'QuickNote': '\uE70B',
            'Video': '\uE714',
            'People': '\uE716',
            'Phone': '\uE717',
            'Pin': '\uE718',
            'Shop': '\uE719',
            'Stop': '\uE71A',
            'Link': '\uE71B',
            'Zoom': '\uE71E',
            'ZoomOut': '\uE71F',
            'Microphone': '\uE720',
            'Camera': '\uE722',
            'Attach': '\uE723',
            'Send': '\uE724',
            'FavoriteList': '\uE728',
            'PageSolid': '\uE729',
            'Forward': '\uE72A',
            'Back': '\uE72B',
            'Refresh': '\uE72C',
            'Lock': '\uE72E',
            'EMI': '\uE731',
            'MiniLink': '\uE732',
            'Blocked': '\uE733',
            'ReadingMode': '\uE736',
            'Favicon': '\uE737',
            'Remove': '\uE738',
            'Checkbox': '\uE739',
            'CheckboxComposite': '\uE73A',
            'CheckboxIndeterminate': '\uE73C',
            'CheckboxCompositeReversed': '\uE73D',
            'BackToWindow': '\uE73F',
            'FullScreen': '\uE740',
            'Print': '\uE749',
            'Up': '\uE74A',
            'Down': '\uE74B',
            'Save': '\uE74E',
            'Cloud': '\uE753',
            'CommandPrompt': '\uE756',
            'Sad': '\uE757',
            'SIPMove': '\uE759',
            'EraseTool': '\uE75C',
            'GripperTool': '\uE75E',
            'Dialpad': '\uE75F',
            'PageLeft': '\uE760',
            'PageRight': '\uE761',
            'MultiSelect': '\uE762',
            'Play': '\uE768',
            'Pause': '\uE769',
            'Emoji2': '\uE76E',
            'GripperBarHorizontal': '\uE76F',
            'System': '\uE770',
            'Personalize': '\uE771',
            'SearchAndApps': '\uE773',
            'Globe': '\uE774',
            'ContactInfo': '\uE779',
            'Unpin': '\uE77A',
            'Contact': '\uE77B',
            'Memo': '\uE77C',
            'Paste': '\uE77F',
            'WindowsLogo': '\uE782',
            'Error': '\uE783',
            'GripperBarVertical': '\uE784',
            'Unlock': '\uE785',
            'Megaphone': '\uE789',
            'AutoEnhanceOn': '\uE78D',
            'AutoEnhanceOff': '\uE78E',
            'Color': '\uE790',
            'SaveAs': '\uE792',
            'Light': '\uE793',
            'Filters': '\uE795',
            'AspectRatio': '\uE799',
            'Contrast': '\uE7A1',
            'Redo': '\uE7A6',
            'PhotoCollection': '\uE7AA',
            'Album': '\uE7AB',
            'Rotate': '\uE7AD',
            'PanoIndicator': '\uE7B0',
            'RedEye': '\uE7B3',
            'ThumbnailView': '\uE7B6',
            'Package': '\uE7B8',
            'Warning': '\uE7BA',
            'Financial': '\uE7BB',
            'Education': '\uE7BE',
            'ShoppingCart': '\uE7BF',
            'Train': '\uE7C0',
            'Move': '\uE7C2',
            'TouchPointer': '\uE7C9',
            'Merge': '\uE7D5',
            'TurnRight': '\uE7DB',
            'Ferry': '\uE7E3',
            'Highlight': '\uE7E6',
            'Tab': '\uE7E9',
            'Admin': '\uE7EF'
        }
    };
    index_1.registerIcons(subset, options);
}
exports.initializeIcons = initializeIcons;
//# sourceMappingURL=fabric-icons-0.js.map

/***/ }),

/***/ 672:
/*!************************************************************!*\
  !*** ./node_modules/@uifabric/icons/lib/fabric-icons-1.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// tslint:disable:max-line-length
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(/*! @uifabric/styling/lib/index */ 20);
function initializeIcons(baseUrl, options) {
    if (baseUrl === void 0) { baseUrl = ''; }
    var subset = {
        style: {
            MozOsxFontSmoothing: 'grayscale',
            WebkitFontSmoothing: 'antialiased',
            fontStyle: 'normal',
            fontWeight: 'normal',
            speak: 'none'
        },
        fontFace: {
            fontFamily: "\"FabricMDL2Icons-1\"",
            src: "url('" + baseUrl + "fabric-icons-1-a961c249.woff') format('woff')",
        },
        icons: {
            'TVMonitor': '\uE7F4',
            'Speakers': '\uE7F5',
            'Nav2DMapView': '\uE800',
            'Car': '\uE804',
            'Bus': '\uE806',
            'EatDrink': '\uE807',
            'LocationCircle': '\uE80E',
            'Home': '\uE80F',
            'SwitcherStartEnd': '\uE810',
            'ParkingLocation': '\uE811',
            'IncidentTriangle': '\uE814',
            'Touch': '\uE815',
            'MapDirections': '\uE816',
            'History': '\uE81C',
            'Location': '\uE81D',
            'Work': '\uE821',
            'Recent': '\uE823',
            'Hotel': '\uE824',
            'LocationDot': '\uE827',
            'News': '\uE900',
            'Chat': '\uE901',
            'Group': '\uE902',
            'Previous': '\uE892',
            'Next': '\uE893',
            'Sync': '\uE895',
            'Help': '\uE897',
            'Emoji': '\uE899',
            'MailForward': '\uE89C',
            'ClosePane': '\uE89F',
            'OpenPane': '\uE8A0',
            'PreviewLink': '\uE8A1',
            'ZoomIn': '\uE8A3',
            'Bookmarks': '\uE8A4',
            'Document': '\uE8A5',
            'ProtectedDocument': '\uE8A6',
            'OpenInNewWindow': '\uE8A7',
            'MailFill': '\uE8A8',
            'ViewAll': '\uE8A9',
            'Switch': '\uE8AB',
            'Rename': '\uE8AC',
            'Import': '\uE8B5',
            'Picture': '\uE8B9',
            'ShowResults': '\uE8BC',
            'Message': '\uE8BD',
            'CalendarDay': '\uE8BF',
            'CalendarWeek': '\uE8C0',
            'MailReplyAll': '\uE8C2',
            'Read': '\uE8C3',
            'Cut': '\uE8C6',
            'PaymentCard': '\uE8C7',
            'Copy': '\uE8C8',
            'Important': '\uE8C9',
            'MailReply': '\uE8CA',
            'GotoToday': '\uE8D1',
            'Font': '\uE8D2',
            'FontColor': '\uE8D3',
            'FolderFill': '\uE8D5',
            'Permissions': '\uE8D7',
            'DisableUpdates': '\uE8D8',
            'Unfavorite': '\uE8D9',
            'Italic': '\uE8DB',
            'Underline': '\uE8DC',
            'Bold': '\uE8DD',
            'MoveToFolder': '\uE8DE',
            'Dislike': '\uE8E0',
            'Like': '\uE8E1',
            'AlignCenter': '\uE8E3',
            'OpenFile': '\uE8E5',
            'FontDecrease': '\uE8E7',
            'FontIncrease': '\uE8E8',
            'FontSize': '\uE8E9',
            'CellPhone': '\uE8EA',
            'Library': '\uE8F1',
            'PostUpdate': '\uE8F3',
            'NewFolder': '\uE8F4',
            'CalendarReply': '\uE8F5',
            'UnsyncFolder': '\uE8F6',
            'SyncFolder': '\uE8F7',
            'BlockContact': '\uE8F8',
            'BulletedList': '\uE8FD',
            'Preview': '\uE8FF',
            'World': '\uE909',
            'Comment': '\uE90A',
            'DockLeft': '\uE90C',
            'DockRight': '\uE90D',
            'Repair': '\uE90F',
            'Accounts': '\uE910',
            'RadioBullet': '\uE915',
            'Stopwatch': '\uE916',
            'Clock': '\uE917',
            'WorldClock': '\uE918',
            'AlarmClock': '\uE919',
            'Hospital': '\uE91D',
            'Timer': '\uE91E',
            'FullCircleMask': '\uE91F',
            'LocationFill': '\uE920',
            'ChromeMinimize': '\uE921',
            'Annotation': '\uE924',
            'ChromeClose': '\uE8BB',
            'Accept': '\uE8FB'
        }
    };
    index_1.registerIcons(subset, options);
}
exports.initializeIcons = initializeIcons;
//# sourceMappingURL=fabric-icons-1.js.map

/***/ }),

/***/ 673:
/*!************************************************************!*\
  !*** ./node_modules/@uifabric/icons/lib/fabric-icons-2.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// tslint:disable:max-line-length
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(/*! @uifabric/styling/lib/index */ 20);
function initializeIcons(baseUrl, options) {
    if (baseUrl === void 0) { baseUrl = ''; }
    var subset = {
        style: {
            MozOsxFontSmoothing: 'grayscale',
            WebkitFontSmoothing: 'antialiased',
            fontStyle: 'normal',
            fontWeight: 'normal',
            speak: 'none'
        },
        fontFace: {
            fontFamily: "\"FabricMDL2Icons-2\"",
            src: "url('" + baseUrl + "fabric-icons-2-2be8dca9.woff') format('woff')",
        },
        icons: {
            'Fingerprint': '\uE928',
            'Handwriting': '\uE929',
            'StackIndicator': '\uE7FF',
            'Completed': '\uE930',
            'Label': '\uE932',
            'FlickDown': '\uE935',
            'FlickUp': '\uE936',
            'FlickLeft': '\uE937',
            'FlickRight': '\uE938',
            'Streaming': '\uE93E',
            'MusicInCollection': '\uE940',
            'OneDrive': '\uE941',
            'CompassNW': '\uE942',
            'Code': '\uE943',
            'LightningBolt': '\uE945',
            'CalculatorMultiply': '\uE947',
            'CalculatorAddition': '\uE948',
            'CalculatorSubtract': '\uE949',
            'CalculatorEqualTo': '\uE94E',
            'PrintfaxPrinterFile': '\uE956',
            'Communications': '\uE95A',
            'Headset': '\uE95B',
            'Health': '\uE95E',
            'ChevronUpSmall': '\uE96D',
            'ChevronDownSmall': '\uE96E',
            'ChevronLeftSmall': '\uE96F',
            'ChevronRightSmall': '\uE970',
            'ChevronUpMed': '\uE971',
            'ChevronDownMed': '\uE972',
            'ChevronLeftMed': '\uE973',
            'ChevronRightMed': '\uE974',
            'Dictionary': '\uE82D',
            'ChromeBack': '\uE830',
            'PC1': '\uE977',
            'PresenceChickletVideo': '\uE979',
            'Reply': '\uE97A',
            'HalfAlpha': '\uE97E',
            'LockSolid': '\uE9A2',
            'ConstructionCone': '\uE98F',
            'DoubleChevronLeftMed': '\uE991',
            'Volume0': '\uE992',
            'Volume1': '\uE993',
            'Volume2': '\uE994',
            'Volume3': '\uE995',
            'CaretHollow': '\uE817',
            'CaretSolid': '\uE818',
            'FolderOpen': '\uE838',
            'PinnedFill': '\uE842',
            'Chart': '\uE999',
            'Robot': '\uE99A',
            'BidiLtr': '\uE9AA',
            'BidiRtl': '\uE9AB',
            'RevToggleKey': '\uE845',
            'RightDoubleQuote': '\uE9B1',
            'Sunny': '\uE9BD',
            'CloudWeather': '\uE9BE',
            'Cloudy': '\uE9BF',
            'PartlyCloudyDay': '\uE9C0',
            'PartlyCloudyNight': '\uE9C1',
            'ClearNight': '\uE9C2',
            'RainShowersDay': '\uE9C3',
            'Rain': '\uE9C4',
            'Thunderstorms': '\uE9C6',
            'RainSnow': '\uE9C7',
            'Snow': '\uE9C8',
            'BlowingSnow': '\uE9C9',
            'Frigid': '\uE9CA',
            'Fog': '\uE9CB',
            'Squalls': '\uE9CC',
            'Duststorm': '\uE9CD',
            'Unknown': '\uE9CE',
            'Precipitation': '\uE9CF',
            'Ringer': '\uEA8F',
            'PDF': '\uEA90',
            'Ribbon': '\uE9D1',
            'AreaChart': '\uE9D2',
            'Assign': '\uE9D3',
            'CheckList': '\uE9D5',
            'Diagnostic': '\uE9D9',
            'Generate': '\uE9DA',
            'LineChart': '\uE9E6',
            'Equalizer': '\uE9E9',
            'BarChartHorizontal': '\uE9EB',
            'BarChartVertical': '\uE9EC',
            'Freezing': '\uE9EF',
            'Processing': '\uE9F5',
            'SnowShowerDay': '\uE9FD',
            'HailDay': '\uEA00',
            'WorkFlow': '\uEA01',
            'StoreLogoMed': '\uEA04',
            'TriangleSolid': '\uEA08',
            'RainShowersNight': '\uEA0F',
            'SnowShowerNight': '\uEA11',
            'HailNight': '\uEA13',
            'Info2': '\uEA1F',
            'StoreLogo': '\uEA96',
            'MultiSelectMirrored': '\uEA98',
            'Broom': '\uEA99',
            'MusicInCollectionFill': '\uEA36',
            'Asterisk': '\uEA38'
        }
    };
    index_1.registerIcons(subset, options);
}
exports.initializeIcons = initializeIcons;
//# sourceMappingURL=fabric-icons-2.js.map

/***/ }),

/***/ 674:
/*!************************************************************!*\
  !*** ./node_modules/@uifabric/icons/lib/fabric-icons-3.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// tslint:disable:max-line-length
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(/*! @uifabric/styling/lib/index */ 20);
function initializeIcons(baseUrl, options) {
    if (baseUrl === void 0) { baseUrl = ''; }
    var subset = {
        style: {
            MozOsxFontSmoothing: 'grayscale',
            WebkitFontSmoothing: 'antialiased',
            fontStyle: 'normal',
            fontWeight: 'normal',
            speak: 'none'
        },
        fontFace: {
            fontFamily: "\"FabricMDL2Icons-3\"",
            src: "url('" + baseUrl + "fabric-icons-3-80b6008d.woff') format('woff')",
        },
        icons: {
            'ErrorBadge': '\uEA39',
            'CircleFill': '\uEA3B',
            'Record2': '\uEA3F',
            'BookmarksMirrored': '\uEA41',
            'BulletedListMirrored': '\uEA42',
            'CaretHollowMirrored': '\uEA45',
            'CaretSolidMirrored': '\uEA46',
            'ChromeBackMirrored': '\uEA47',
            'ClosePaneMirrored': '\uEA49',
            'DockLeftMirrored': '\uEA4C',
            'DoubleChevronLeftMedMirrored': '\uEA4D',
            'HelpMirrored': '\uEA51',
            'ImportMirrored': '\uEA52',
            'ListMirrored': '\uEA55',
            'MailForwardMirrored': '\uEA56',
            'MailReplyMirrored': '\uEA57',
            'MailReplyAllMirrored': '\uEA58',
            'OpenPaneMirrored': '\uEA5B',
            'ParkingLocationMirrored': '\uEA5E',
            'SendMirrored': '\uEA63',
            'ShowResultsMirrored': '\uEA65',
            'ThumbnailViewMirrored': '\uEA67',
            'Devices3': '\uEA6C',
            'Lightbulb': '\uEA80',
            'StatusTriangle': '\uEA82',
            'VolumeDisabled': '\uEA85',
            'Puzzle': '\uEA86',
            'EmojiNeutral': '\uEA87',
            'EmojiDisappointed': '\uEA88',
            'HomeSolid': '\uEA8A',
            'Cocktails': '\uEA9D',
            'Wines': '\uEABF',
            'Articles': '\uEAC1',
            'Cycling': '\uEAC7',
            'DietPlanNotebook': '\uEAC8',
            'Pill': '\uEACB',
            'ExerciseTracker': '\uEACC',
            'Medical': '\uEAD4',
            'Running': '\uEADA',
            'Weights': '\uEADB',
            'BarChart4': '\uEAE7',
            'CirclePlus': '\uEAEE',
            'Coffee': '\uEAEF',
            'Cotton': '\uEAF3',
            'Market': '\uEAFC',
            'Money': '\uEAFD',
            'PieDouble': '\uEB04',
            'PieSingle': '\uEB05',
            'RemoveFilter': '\uEB08',
            'Savings': '\uEB0B',
            'StockDown': '\uEB0F',
            'StockUp': '\uEB11',
            'MSNVideos': '\uEB1C',
            'Cricket': '\uEB1E',
            'Golf': '\uEB1F',
            'Baseball': '\uEB20',
            'Soccer': '\uEB21',
            'MoreSports': '\uEB22',
            'AutoRacing': '\uEB24',
            'CollegeHoops': '\uEB25',
            'CollegeFootball': '\uEB26',
            'ProFootball': '\uEB27',
            'ProHockey': '\uEB28',
            'Rugby': '\uEB2D',
            'Tennis': '\uEB33',
            'Arrivals': '\uEB34',
            'Design': '\uEB3C',
            'Website': '\uEB41',
            'Drop': '\uEB42',
            'SkiResorts': '\uEB45',
            'Snowflake': '\uEB46',
            'BusSolid': '\uEB47',
            'FerrySolid': '\uEB48',
            'AirplaneSolid': '\uEB4C',
            'TrainSolid': '\uEB4D',
            'Ticket': '\uEB54',
            'Devices4': '\uEB66',
            'AzureLogo': '\uEB6A',
            'BingLogo': '\uEB6B',
            'MSNLogo': '\uEB6C',
            'OutlookLogoInverse': '\uEB6D',
            'OfficeLogo': '\uEB6E',
            'SkypeLogo': '\uEB6F',
            'Door': '\uEB75',
            'EditMirrored': '\uEB7E',
            'GiftCard': '\uEB8E',
            'DoubleBookmark': '\uEB8F',
            'StatusErrorFull': '\uEB90',
            'Certificate': '\uEB95',
            'FastForward': '\uEB9D',
            'Rewind': '\uEB9E',
            'Photo2': '\uEB9F',
            'OpenSource': '\uEBC2',
            'CloudDownload': '\uEBD3',
            'WindDirection': '\uEBE6',
            'Family': '\uEBDA',
            'CSS': '\uEBEF',
            'JS': '\uEBF0',
            'DeliveryTruck': '\uEBF4',
            'ReminderPerson': '\uEBF7'
        }
    };
    index_1.registerIcons(subset, options);
}
exports.initializeIcons = initializeIcons;
//# sourceMappingURL=fabric-icons-3.js.map

/***/ }),

/***/ 675:
/*!************************************************************!*\
  !*** ./node_modules/@uifabric/icons/lib/fabric-icons-4.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// tslint:disable:max-line-length
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(/*! @uifabric/styling/lib/index */ 20);
function initializeIcons(baseUrl, options) {
    if (baseUrl === void 0) { baseUrl = ''; }
    var subset = {
        style: {
            MozOsxFontSmoothing: 'grayscale',
            WebkitFontSmoothing: 'antialiased',
            fontStyle: 'normal',
            fontWeight: 'normal',
            speak: 'none'
        },
        fontFace: {
            fontFamily: "\"FabricMDL2Icons-4\"",
            src: "url('" + baseUrl + "fabric-icons-4-46fbc7bc.woff') format('woff')",
        },
        icons: {
            'ReminderGroup': '\uEBF8',
            'Umbrella': '\uEC04',
            'NetworkTower': '\uEC05',
            'CityNext': '\uEC06',
            'Section': '\uEC0C',
            'OneNoteLogoInverse': '\uEC0D',
            'ToggleFilled': '\uEC11',
            'ToggleBorder': '\uEC12',
            'SliderThumb': '\uEC13',
            'ToggleThumb': '\uEC14',
            'Documentation': '\uEC17',
            'Badge': '\uEC1B',
            'Giftbox': '\uEC1F',
            'VisualStudioLogo': '\uEC22',
            'ExcelLogoInverse': '\uEC28',
            'WordLogoInverse': '\uEC29',
            'PowerPointLogoInverse': '\uEC2A',
            'Cafe': '\uEC32',
            'SpeedHigh': '\uEC4A',
            'ThisPC': '\uEC4E',
            'MusicNote': '\uEC4F',
            'MicOff': '\uEC54',
            'EdgeLogo': '\uEC60',
            'CompletedSolid': '\uEC61',
            'AlbumRemove': '\uEC62',
            'MessageFill': '\uEC70',
            'TabletSelected': '\uEC74',
            'MobileSelected': '\uEC75',
            'LaptopSelected': '\uEC76',
            'TVMonitorSelected': '\uEC77',
            'DeveloperTools': '\uEC7A',
            'InsertTextBox': '\uEC7D',
            'LowerBrightness': '\uEC8A',
            'CloudUpload': '\uEC8E',
            'ScrollUpDown': '\uEC8F',
            'DateTime': '\uEC92',
            'Event': '\uECA3',
            'Cake': '\uECA4',
            'Org': '\uECA6',
            'PartyLeader': '\uECA7',
            'DRM': '\uECA8',
            'CloudAdd': '\uECA9',
            'AppIconDefault': '\uECAA',
            'Photo2Add': '\uECAB',
            'Photo2Remove': '\uECAC',
            'POI': '\uECAF',
            'AddTo': '\uECC8',
            'RadioBtnOff': '\uECCA',
            'RadioBtnOn': '\uECCB',
            'ExploreContent': '\uECCD',
            'VideoSolid': '\uEA0C',
            'Teamwork': '\uEA12',
            'PeopleAdd': '\uEA15',
            'Glasses': '\uEA16',
            'DateTime2': '\uEA17',
            'Shield': '\uEA18',
            'Header1': '\uEA19',
            'PageAdd': '\uEA1A',
            'NumberedList': '\uEA1C',
            'PowerBILogo': '\uEA1E',
            'Product': '\uECDC',
            'ProgressLoopInner': '\uECDE',
            'ProgressLoopOuter': '\uECDF',
            'Blocked2': '\uECE4',
            'FangBody': '\uECEB',
            'Glimmer': '\uECF4',
            'ChatInviteFriend': '\uECFE',
            'Crown': '\uED01',
            'Feedback': '\uED15',
            'SharepointLogoInverse': '\uED18',
            'YammerLogo': '\uED19',
            'Hide': '\uED1A',
            'Uneditable': '\uED1D',
            'ReturnToSession': '\uED24',
            'OpenFolderHorizontal': '\uED25',
            'CalendarMirrored': '\uED28',
            'SwayLogoInverse': '\uED29',
            'OutOfOffice': '\uED34',
            'Trophy': '\uED3F',
            'ReopenPages': '\uED50',
            'AADLogo': '\uED68',
            'AccessLogo': '\uED69',
            'AdminALogoInverse32': '\uED6A',
            'AdminCLogoInverse32': '\uED6B',
            'AdminDLogoInverse32': '\uED6C',
            'AdminELogoInverse32': '\uED6D',
            'AdminLLogoInverse32': '\uED6E',
            'AdminMLogoInverse32': '\uED6F',
            'AdminOLogoInverse32': '\uED70',
            'AdminPLogoInverse32': '\uED71',
            'AdminSLogoInverse32': '\uED72',
            'AdminYLogoInverse32': '\uED73',
            'DelveLogoInverse': '\uED76',
            'ExchangeLogoInverse': '\uED78',
            'LyncLogo': '\uED79',
            'OfficeVideoLogoInverse': '\uED7A'
        }
    };
    index_1.registerIcons(subset, options);
}
exports.initializeIcons = initializeIcons;
//# sourceMappingURL=fabric-icons-4.js.map

/***/ }),

/***/ 676:
/*!************************************************************!*\
  !*** ./node_modules/@uifabric/icons/lib/fabric-icons-5.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// tslint:disable:max-line-length
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(/*! @uifabric/styling/lib/index */ 20);
function initializeIcons(baseUrl, options) {
    if (baseUrl === void 0) { baseUrl = ''; }
    var subset = {
        style: {
            MozOsxFontSmoothing: 'grayscale',
            WebkitFontSmoothing: 'antialiased',
            fontStyle: 'normal',
            fontWeight: 'normal',
            speak: 'none'
        },
        fontFace: {
            fontFamily: "\"FabricMDL2Icons-5\"",
            src: "url('" + baseUrl + "fabric-icons-5-5bc71068.woff') format('woff')",
        },
        icons: {
            'SocialListeningLogo': '\uED7C',
            'VisioLogoInverse': '\uED7D',
            'Balloons': '\uED7E',
            'Cat': '\uED7F',
            'MailAlert': '\uED80',
            'MailCheck': '\uED81',
            'MailLowImportance': '\uED82',
            'MailPause': '\uED83',
            'MailRepeat': '\uED84',
            'SecurityGroup': '\uED85',
            'Table': '\uED86',
            'VoicemailForward': '\uED87',
            'VoicemailReply': '\uED88',
            'Waffle': '\uED89',
            'RemoveEvent': '\uED8A',
            'EventInfo': '\uED8B',
            'ForwardEvent': '\uED8C',
            'WipePhone': '\uED8D',
            'AddOnlineMeeting': '\uED8E',
            'JoinOnlineMeeting': '\uED8F',
            'RemoveLink': '\uED90',
            'PeopleBlock': '\uED91',
            'PeopleRepeat': '\uED92',
            'PeopleAlert': '\uED93',
            'PeoplePause': '\uED94',
            'TransferCall': '\uED95',
            'AddPhone': '\uED96',
            'UnknownCall': '\uED97',
            'NoteReply': '\uED98',
            'NoteForward': '\uED99',
            'NotePinned': '\uED9A',
            'RemoveOccurrence': '\uED9B',
            'Timeline': '\uED9C',
            'EditNote': '\uED9D',
            'CircleHalfFull': '\uED9E',
            'Room': '\uED9F',
            'Unsubscribe': '\uEDA0',
            'Subscribe': '\uEDA1',
            'RecurringTask': '\uEDB2',
            'TaskManager': '\uEDB7',
            'TaskManagerMirrored': '\uEDB8',
            'Combine': '\uEDBB',
            'Split': '\uEDBC',
            'DoubleChevronUp': '\uEDBD',
            'DoubleChevronLeft': '\uEDBE',
            'DoubleChevronRight': '\uEDBF',
            'TextBox': '\uEDC2',
            'TextField': '\uEDC3',
            'NumberField': '\uEDC4',
            'Dropdown': '\uEDC5',
            'BookingsLogo': '\uEDC7',
            'ClassNotebookLogoInverse': '\uEDC8',
            'DelveAnalyticsLogo': '\uEDCA',
            'DocsLogoInverse': '\uEDCB',
            'Dynamics365Logo': '\uEDCC',
            'DynamicSMBLogo': '\uEDCD',
            'OfficeAssistantLogo': '\uEDCE',
            'OfficeStoreLogo': '\uEDCF',
            'OneNoteEduLogoInverse': '\uEDD0',
            'PlannerLogo': '\uEDD1',
            'PowerApps': '\uEDD2',
            'Suitcase': '\uEDD3',
            'ProjectLogoInverse': '\uEDD4',
            'CaretLeft8': '\uEDD5',
            'CaretRight8': '\uEDD6',
            'CaretUp8': '\uEDD7',
            'CaretDown8': '\uEDD8',
            'CaretLeftSolid8': '\uEDD9',
            'CaretRightSolid8': '\uEDDA',
            'CaretUpSolid8': '\uEDDB',
            'CaretDownSolid8': '\uEDDC',
            'ClearFormatting': '\uEDDD',
            'Superscript': '\uEDDE',
            'Subscript': '\uEDDF',
            'Strikethrough': '\uEDE0',
            'Export': '\uEDE1',
            'ExportMirrored': '\uEDE2',
            'SingleBookmark': '\uEDFF',
            'DoubleChevronDown': '\uEE04',
            'ReplyAll': '\uEE0A',
            'Questionnaire': '\uEE19',
            'ReplyMirrored': '\uEE35',
            'ReplyAllMirrored': '\uEE36',
            'AddGroup': '\uEE3D',
            'QuestionnaireMirrored': '\uEE4B',
            'TemporaryUser': '\uEE58',
            'CaretSolid16': '\uEE62',
            'GroupedDescending': '\uEE66',
            'GroupedAscending': '\uEE67',
            'AwayStatus': '\uEE6A',
            'MyMoviesTV': '\uEE6C',
            'AustralianRules': '\uEE70',
            'WifiEthernet': '\uEE77',
            'DateTimeMirrored': '\uEE93',
            'StopSolid': '\uEE95',
            'DoubleChevronUp12': '\uEE96',
            'DoubleChevronDown12': '\uEE97',
            'DoubleChevronLeft12': '\uEE98',
            'DoubleChevronRight12': '\uEE99'
        }
    };
    index_1.registerIcons(subset, options);
}
exports.initializeIcons = initializeIcons;
//# sourceMappingURL=fabric-icons-5.js.map

/***/ }),

/***/ 677:
/*!************************************************************!*\
  !*** ./node_modules/@uifabric/icons/lib/fabric-icons-6.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// tslint:disable:max-line-length
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(/*! @uifabric/styling/lib/index */ 20);
function initializeIcons(baseUrl, options) {
    if (baseUrl === void 0) { baseUrl = ''; }
    var subset = {
        style: {
            MozOsxFontSmoothing: 'grayscale',
            WebkitFontSmoothing: 'antialiased',
            fontStyle: 'normal',
            fontWeight: 'normal',
            speak: 'none'
        },
        fontFace: {
            fontFamily: "\"FabricMDL2Icons-6\"",
            src: "url('" + baseUrl + "fabric-icons-6-328cd253.woff') format('woff')",
        },
        icons: {
            'CalendarAgenda': '\uEE9A',
            'AddEvent': '\uEEB5',
            'AssetLibrary': '\uEEB6',
            'DataConnectionLibrary': '\uEEB7',
            'DocLibrary': '\uEEB8',
            'FormLibrary': '\uEEB9',
            'FormLibraryMirrored': '\uEEBA',
            'ReportLibrary': '\uEEBB',
            'ReportLibraryMirrored': '\uEEBC',
            'ContactCard': '\uEEBD',
            'CustomList': '\uEEBE',
            'CustomListMirrored': '\uEEBF',
            'IssueTracking': '\uEEC0',
            'IssueTrackingMirrored': '\uEEC1',
            'PictureLibrary': '\uEEC2',
            'OfficeAddinsLogo': '\uEEC7',
            'OfflineOneDriveParachute': '\uEEC8',
            'OfflineOneDriveParachuteDisabled': '\uEEC9',
            'TriangleSolidUp12': '\uEECC',
            'TriangleSolidDown12': '\uEECD',
            'TriangleSolidLeft12': '\uEECE',
            'TriangleSolidRight12': '\uEECF',
            'TriangleUp12': '\uEED0',
            'TriangleDown12': '\uEED1',
            'TriangleLeft12': '\uEED2',
            'TriangleRight12': '\uEED3',
            'ArrowUpRight8': '\uEED4',
            'ArrowDownRight8': '\uEED5',
            'DocumentSet': '\uEED6',
            'DelveAnalytics': '\uEEEE',
            'ArrowUpRightMirrored8': '\uEEEF',
            'ArrowDownRightMirrored8': '\uEEF0',
            'OneDriveAdd': '\uEF32',
            'Header2': '\uEF36',
            'Header3': '\uEF37',
            'Header4': '\uEF38',
            'MarketDown': '\uEF42',
            'CalendarWorkWeek': '\uEF51',
            'SidePanel': '\uEF52',
            'GlobeFavorite': '\uEF53',
            'CaretTopLeftSolid8': '\uEF54',
            'CaretTopRightSolid8': '\uEF55',
            'ViewAll2': '\uEF56',
            'DocumentReply': '\uEF57',
            'PlayerSettings': '\uEF58',
            'ReceiptForward': '\uEF59',
            'ReceiptReply': '\uEF5A',
            'ReceiptCheck': '\uEF5B',
            'Fax': '\uEF5C',
            'RecurringEvent': '\uEF5D',
            'ReplyAlt': '\uEF5E',
            'ReplyAllAlt': '\uEF5F',
            'EditStyle': '\uEF60',
            'EditMail': '\uEF61',
            'Lifesaver': '\uEF62',
            'LifesaverLock': '\uEF63',
            'InboxCheck': '\uEF64',
            'FolderSearch': '\uEF65',
            'CollapseMenu': '\uEF66',
            'ExpandMenu': '\uEF67',
            'Boards': '\uEF68',
            'SunAdd': '\uEF69',
            'SunQuestionMark': '\uEF6A',
            'LandscapeOrientation': '\uEF6B',
            'DocumentSearch': '\uEF6C',
            'PublicCalendar': '\uEF6D',
            'PublicContactCard': '\uEF6E',
            'PublicEmail': '\uEF6F',
            'PublicFolder': '\uEF70',
            'WordDocument': '\uEF71',
            'PowerPointDocument': '\uEF72',
            'ExcelDocument': '\uEF73',
            'GroupedList': '\uEF74',
            'ClassroomLogo': '\uEF75',
            'Sections': '\uEF76',
            'EditPhoto': '\uEF77',
            'Starburst': '\uEF78',
            'ShareiOS': '\uEF79',
            'AirTickets': '\uEF7A',
            'PencilReply': '\uEF7B',
            'Tiles2': '\uEF7C',
            'SkypeCircleCheck': '\uEF7D',
            'SkypeCircleClock': '\uEF7E',
            'SkypeCircleMinus': '\uEF7F',
            'SkypeMessage': '\uEF83',
            'ClosedCaption': '\uEF84',
            'ATPLogo': '\uEF85',
            'OfficeFormsLogoInverse': '\uEF86',
            'RecycleBin': '\uEF87',
            'EmptyRecycleBin': '\uEF88',
            'Hide2': '\uEF89',
            'Breadcrumb': '\uEF8C',
            'PageEdit': '\uEFB6',
            'Database': '\uEFC7',
            'DocumentManagement': '\uEFFC',
            'CRMReport': '\uEFFE',
            'ZipFolder': '\uF012',
            'TextDocument': '\uF029'
        }
    };
    index_1.registerIcons(subset, options);
}
exports.initializeIcons = initializeIcons;
//# sourceMappingURL=fabric-icons-6.js.map

/***/ }),

/***/ 678:
/*!************************************************************!*\
  !*** ./node_modules/@uifabric/icons/lib/fabric-icons-7.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// tslint:disable:max-line-length
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(/*! @uifabric/styling/lib/index */ 20);
function initializeIcons(baseUrl, options) {
    if (baseUrl === void 0) { baseUrl = ''; }
    var subset = {
        style: {
            MozOsxFontSmoothing: 'grayscale',
            WebkitFontSmoothing: 'antialiased',
            fontStyle: 'normal',
            fontWeight: 'normal',
            speak: 'none'
        },
        fontFace: {
            fontFamily: "\"FabricMDL2Icons-7\"",
            src: "url('" + baseUrl + "fabric-icons-7-1bae3315.woff') format('woff')",
        },
        icons: {
            'PageCheckedOut': '\uF02C',
            'SaveAndClose': '\uF038',
            'Script': '\uF03A',
            'Archive': '\uF03F',
            'ActivityFeed': '\uF056',
            'EventDate': '\uF059',
            'CaretRight': '\uF06B',
            'SetAction': '\uF071',
            'CaretSolidLeft': '\uF08D',
            'CaretSolidDown': '\uF08E',
            'CaretSolidRight': '\uF08F',
            'CaretSolidUp': '\uF090',
            'PowerAppsLogo': '\uF091',
            'PowerApps2Logo': '\uF092',
            'SearchIssue': '\uF09A',
            'SearchIssueMirrored': '\uF09B',
            'FabricAssetLibrary': '\uF09C',
            'FabricDataConnectionLibrary': '\uF09D',
            'FabricDocLibrary': '\uF09E',
            'FabricFormLibrary': '\uF09F',
            'FabricFormLibraryMirrored': '\uF0A0',
            'FabricReportLibrary': '\uF0A1',
            'FabricReportLibraryMirrored': '\uF0A2',
            'FabricPublicFolder': '\uF0A3',
            'FabricFolderSearch': '\uF0A4',
            'FabricMovetoFolder': '\uF0A5',
            'FabricUnsyncFolder': '\uF0A6',
            'FabricSyncFolder': '\uF0A7',
            'FabricOpenFolderHorizontal': '\uF0A8',
            'FabricFolder': '\uF0A9',
            'FabricFolderFill': '\uF0AA',
            'FabricNewFolder': '\uF0AB',
            'FabricPictureLibrary': '\uF0AC',
            'AddFavorite': '\uF0C8',
            'AddFavoriteFill': '\uF0C9',
            'BufferTimeBefore': '\uF0CF',
            'BufferTimeAfter': '\uF0D0',
            'BufferTimeBoth': '\uF0D1',
            'CannedChat': '\uF0F2',
            'SkypeForBusinessLogo': '\uF0FC',
            'PageCheckedin': '\uF104',
            'CaretBottomLeftSolid8': '\uF121',
            'CaretBottomRightSolid8': '\uF122',
            'FolderHorizontal': '\uF12B',
            'MicrosoftStaffhubLogo': '\uF130',
            'GiftboxOpen': '\uF133',
            'StatusCircleOuter': '\uF136',
            'StatusCircleInner': '\uF137',
            'ExploreContentSingle': '\uF164',
            'CollapseContent': '\uF165',
            'CollapseContentSingle': '\uF166',
            'InfoSolid': '\uF167',
            'ProgressRingDots': '\uF16A',
            'CaloriesAdd': '\uF172',
            'BranchFork': '\uF173',
            'HardDriveGroup': '\uF18F',
            'BucketColor': '\uF1B6',
            'BucketColorFill': '\uF1B7',
            'Taskboard': '\uF1C2',
            'SingleColumn': '\uF1D3',
            'DoubleColumn': '\uF1D4',
            'TripleColumn': '\uF1D5',
            'ColumnLeftTwoThirds': '\uF1D6',
            'ColumnRightTwoThirds': '\uF1D7',
            'AccessLogoFill': '\uF1DB',
            'AnalyticsLogo': '\uF1DE',
            'AnalyticsQuery': '\uF1DF',
            'NewAnalyticsQuery': '\uF1E0',
            'AnalyticsReport': '\uF1E1',
            'WordLogo': '\uF1E3',
            'WordLogoFill': '\uF1E4',
            'ExcelLogo': '\uF1E5',
            'ExcelLogoFill': '\uF1E6',
            'OneNoteLogo': '\uF1E7',
            'OneNoteLogoFill': '\uF1E8',
            'OutlookLogo': '\uF1E9',
            'OutlookLogoFill': '\uF1EA',
            'PowerPointLogo': '\uF1EB',
            'PowerPointLogoFill': '\uF1EC',
            'PublisherLogo': '\uF1ED',
            'PublisherLogoFill': '\uF1EE',
            'ScheduleEventAction': '\uF1EF',
            'FlameSolid': '\uF1F3',
            'ServerProcesses': '\uF1FE',
            'Server': '\uF201',
            'SaveAll': '\uF203',
            'LinkedInLogo': '\uF20A',
            'SidePanelMirrored': '\uF221',
            'ProtectRestrict': '\uF22A',
            'GridViewSmall': '\uF232',
            'GridViewMedium': '\uF233',
            'GridViewLarge': '\uF234',
            'Step': '\uF241',
            'StepInsert': '\uF242',
            'StepShared': '\uF243',
            'StepSharedAdd': '\uF244',
            'StepSharedInsert': '\uF245',
            'ViewDashboard': '\uF246',
            'ViewList': '\uF247',
            'ViewListGroup': '\uF248'
        }
    };
    index_1.registerIcons(subset, options);
}
exports.initializeIcons = initializeIcons;
//# sourceMappingURL=fabric-icons-7.js.map

/***/ }),

/***/ 679:
/*!************************************************************!*\
  !*** ./node_modules/@uifabric/icons/lib/fabric-icons-8.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// tslint:disable:max-line-length
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(/*! @uifabric/styling/lib/index */ 20);
function initializeIcons(baseUrl, options) {
    if (baseUrl === void 0) { baseUrl = ''; }
    var subset = {
        style: {
            MozOsxFontSmoothing: 'grayscale',
            WebkitFontSmoothing: 'antialiased',
            fontStyle: 'normal',
            fontWeight: 'normal',
            speak: 'none'
        },
        fontFace: {
            fontFamily: "\"FabricMDL2Icons-8\"",
            src: "url('" + baseUrl + "fabric-icons-8-bf5c8e0c.woff') format('woff')",
        },
        icons: {
            'ViewListTree': '\uF249',
            'TriggerAuto': '\uF24A',
            'TriggerUser': '\uF24B',
            'PivotChart': '\uF24C',
            'StackedBarChart': '\uF24D',
            'StackedLineChart': '\uF24E',
            'BuildQueue': '\uF24F',
            'BuildQueueNew': '\uF250',
            'UserFollowed': '\uF25C',
            'VennDiagram': '\uF273',
            'FiveTileGrid': '\uF274',
            'FocalPoint': '\uF277',
            'TeamsLogoInverse': '\uF27A',
            'TeamsLogo': '\uF27B',
            'TeamsLogoFill': '\uF27C',
            'SkypeForBusinessLogoFill': '\uF27D',
            'SharepointLogo': '\uF27E',
            'SharepointLogoFill': '\uF27F',
            'DelveLogo': '\uF280',
            'DelveLogoFill': '\uF281',
            'OfficeVideoLogo': '\uF282',
            'OfficeVideoLogoFill': '\uF283',
            'ExchangeLogo': '\uF284',
            'ExchangeLogoFill': '\uF285',
            'DocumentApproval': '\uF28B',
            'CloneToDesktop': '\uF28C',
            'InstallToDrive': '\uF28D',
            'Blur': '\uF28E',
            'Build': '\uF28F',
            'ProcessMetaTask': '\uF290',
            'BranchFork2': '\uF291',
            'BranchLocked': '\uF292',
            'BranchCommit': '\uF293',
            'BranchCompare': '\uF294',
            'BranchMerge': '\uF295',
            'BranchPullRequest': '\uF296',
            'BranchSearch': '\uF297',
            'BranchShelveset': '\uF298',
            'RawSource': '\uF299',
            'MergeDuplicate': '\uF29A',
            'RowsGroup': '\uF29B',
            'RowsChild': '\uF29C',
            'Deploy': '\uF29D',
            'Redeploy': '\uF29E',
            'ServerEnviroment': '\uF29F',
            'Plug': '\uF300',
            'PlugSolid': '\uF301',
            'PlugConnected': '\uF302',
            'PlugDisconnected': '\uF303',
            'UnlockSolid': '\uF304',
            'Variable': '\uF305',
            'Parameter': '\uF306',
            'CommentUrgent': '\uF307',
            'Storyboard': '\uF308',
            'DiffInline': '\uF309',
            'DiffSideBySide': '\uF30A',
            'ImageDiff': '\uF30B',
            'ImagePixel': '\uF30C',
            'FileBug': '\uF30D',
            'FileCode': '\uF30E',
            'FileComment': '\uF30F',
            'FileImage': '\uF311',
            'FileSymlink': '\uF312',
            'AutoFillTemplate': '\uF313',
            'WorkItem': '\uF314',
            'WorkItemBug': '\uF315',
            'LogRemove': '\uF316',
            'ColumnOptions': '\uF317',
            'Packages': '\uF318',
            'BuildIssue': '\uF319',
            'AssessmentGroup': '\uF31A',
            'VariableGroup': '\uF31B',
            'FullHistory': '\uF31C',
            'BusinessHoursSign': '\uF310',
            'VisioDiagram': '\uF2A0',
            'HighlightMappedShapes': '\uF2A1',
            'TextCallout': '\uF2A2',
            'IconSetsFlag': '\uF2A4',
            'VisioLogo': '\uF2A7',
            'VisioLogoFill': '\uF2A8',
            'VisioDocument': '\uF2A9',
            'TimelineProgress': '\uF2AA',
            'TimelineDelivery': '\uF2AB',
            'Backlog': '\uF2AC',
            'TeamFavorite': '\uF2AD',
            'TaskGroup': '\uF2AE',
            'TaskGroupMirrored': '\uF2AF',
            'ScopeTemplate': '\uF2B0',
            'AssessmentGroupTemplate': '\uF2B1',
            'NewTeamProject': '\uF2B2',
            'CommentAdd': '\uF2B3',
            'CommentNext': '\uF2B4',
            'CommentPrevious': '\uF2B5',
            'ShopServer': '\uF2B6',
            'LocaleLanguage': '\uF2B7',
            'QueryList': '\uF2B8',
            'UserSync': '\uF2B9',
            'UserPause': '\uF2BA',
            'StreamingOff': '\uF2BB',
            'ArrowTallUpLeft': '\uF2BD'
        }
    };
    index_1.registerIcons(subset, options);
}
exports.initializeIcons = initializeIcons;
//# sourceMappingURL=fabric-icons-8.js.map

/***/ }),

/***/ 680:
/*!************************************************************!*\
  !*** ./node_modules/@uifabric/icons/lib/fabric-icons-9.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// tslint:disable:max-line-length
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(/*! @uifabric/styling/lib/index */ 20);
function initializeIcons(baseUrl, options) {
    if (baseUrl === void 0) { baseUrl = ''; }
    var subset = {
        style: {
            MozOsxFontSmoothing: 'grayscale',
            WebkitFontSmoothing: 'antialiased',
            fontStyle: 'normal',
            fontWeight: 'normal',
            speak: 'none'
        },
        fontFace: {
            fontFamily: "\"FabricMDL2Icons-9\"",
            src: "url('" + baseUrl + "fabric-icons-9-a362212c.woff') format('woff')",
        },
        icons: {
            'ArrowTallUpRight': '\uF2BE',
            'ArrowTallDownLeft': '\uF2BF',
            'ArrowTallDownRight': '\uF2C0',
            'FieldEmpty': '\uF2C1',
            'FieldFilled': '\uF2C2',
            'FieldChanged': '\uF2C3',
            'FieldNotChanged': '\uF2C4',
            'RingerOff': '\uF2C5',
            'PlayResume': '\uF2C6',
            'BulletedList2': '\uF2C7',
            'BulletedList2Mirrored': '\uF2C8',
            'ImageCrosshair': '\uF2C9',
            'GitGraph': '\uF2CA',
            'Repo': '\uF2CB',
            'RepoSolid': '\uF2CC',
            'FolderQuery': '\uF2CD',
            'FolderList': '\uF2CE',
            'FolderListMirrored': '\uF2CF',
            'LocationOutline': '\uF2D0',
            'POISolid': '\uF2D1',
            'CalculatorNotEqualTo': '\uF2D2',
            'BoxSubtractSolid': '\uF2D3',
            'BoxAdditionSolid': '\uF2D4',
            'BoxMultiplySolid': '\uF2D5',
            'BoxPlaySolid': '\uF2D6',
            'BoxCheckmarkSolid': '\uF2D7',
            'CirclePauseSolid': '\uF2D8',
            'CirclePause': '\uF2D9',
            'MSNVideosSolid': '\uF2DA',
            'CircleStopSolid': '\uF2DB',
            'CircleStop': '\uF2DC',
            'NavigateBack': '\uF2DD',
            'NavigateBackMirrored': '\uF2DE',
            'NavigateForward': '\uF2DF',
            'NavigateForwardMirrored': '\uF2E0',
            'UnknownSolid': '\uF2E1',
            'UnknownMirroredSolid': '\uF2E2',
            'CircleAddition': '\uF2E3',
            'CircleAdditionSolid': '\uF2E4',
            'FilePDB': '\uF2E5',
            'FileTemplate': '\uF2E6',
            'FileSQL': '\uF2E7',
            'FileJAVA': '\uF2E8',
            'FileASPX': '\uF2E9',
            'FileCSS': '\uF2EA',
            'FileSass': '\uF2EB',
            'FileLess': '\uF2EC',
            'FileHTML': '\uF2ED',
            'JavaScriptLanguage': '\uF2EE',
            'CSharpLanguage': '\uF2EF',
            'CSharp': '\uF2F0',
            'VisualBasicLanguage': '\uF2F1',
            'VB': '\uF2F2',
            'CPlusPlusLanguage': '\uF2F3',
            'CPlusPlus': '\uF2F4',
            'FSharpLanguage': '\uF2F5',
            'FSharp': '\uF2F6',
            'TypeScriptLanguage': '\uF2F7',
            'PythonLanguage': '\uF2F8',
            'PY': '\uF2F9',
            'CoffeeScript': '\uF2FA',
            'MarkDownLanguage': '\uF2FB',
            'FullWidth': '\uF2FE',
            'FullWidthEdit': '\uF2FF',
            'SingleColumnEdit': '\uF321',
            'DoubleColumnEdit': '\uF322',
            'TripleColumnEdit': '\uF323',
            'ColumnLeftTwoThirdsEdit': '\uF324',
            'ColumnRightTwoThirdsEdit': '\uF325',
            'StreamLogo': '\uF329',
            'AlertSolid': '\uF331',
            'MegaphoneSolid': '\uF332',
            'TaskSolid': '\uF333',
            'ConfigurationSolid': '\uF334',
            'BugSolid': '\uF335',
            'CrownSolid': '\uF336',
            'Trophy2Solid': '\uF337',
            'QuickNoteSolid': '\uF338',
            'ConstructionConeSolid': '\uF339',
            'PageListSolid': '\uF33A',
            'PageListMirroredSolid': '\uF33B',
            'StarburstSolid': '\uF33C',
            'ReadingModeSolid': '\uF33D',
            'SadSolid': '\uF33E',
            'HealthSolid': '\uF33F',
            'ShieldSolid': '\uF340',
            'GiftBoxSolid': '\uF341',
            'ShoppingCartSolid': '\uF342',
            'MailSolid': '\uF343',
            'ChatSolid': '\uF344',
            'RibbonSolid': '\uF345',
            'FinancialSolid': '\uF346',
            'FinancialMirroredSolid': '\uF347',
            'HeadsetSolid': '\uF348',
            'PermissionsSolid': '\uF349',
            'ParkingSolid': '\uF34A',
            'ParkingMirroredSolid': '\uF34B',
            'DiamondSolid': '\uF34C',
            'AsteriskSolid': '\uF34D',
            'OfflineStorageSolid': '\uF34E'
        }
    };
    index_1.registerIcons(subset, options);
}
exports.initializeIcons = initializeIcons;
//# sourceMappingURL=fabric-icons-9.js.map

/***/ }),

/***/ 681:
/*!*************************************************************!*\
  !*** ./node_modules/@uifabric/icons/lib/fabric-icons-10.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// tslint:disable:max-line-length
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(/*! @uifabric/styling/lib/index */ 20);
function initializeIcons(baseUrl, options) {
    if (baseUrl === void 0) { baseUrl = ''; }
    var iconSubset = {
        style: {
            MozOsxFontSmoothing: 'grayscale',
            WebkitFontSmoothing: 'antialiased',
            fontStyle: 'normal',
            fontWeight: 'normal',
            speak: 'none'
        },
        fontFace: {
            fontFamily: "\"FabricMDL2Icons-10\"",
            src: "url('" + baseUrl + "fabric-icons-10-a9486bb8.woff') format('woff')",
        },
        icons: {
            'BankSolid': '\uF34F',
            'DecisionSolid': '\uF350',
            'Parachute': '\uF351',
            'ParachuteSolid': '\uF352',
            'FiltersSolid': '\uF353',
            'ColorSolid': '\uF354',
            'ReviewSolid': '\uF355',
            'ReviewRequestSolid': '\uF356',
            'ReviewRequestMirroredSolid': '\uF357',
            'ReviewResponseSolid': '\uF358',
            'FeedbackRequestSolid': '\uF359',
            'FeedbackRequestMirroredSolid': '\uF35A',
            'FeedbackResponseSolid': '\uF35B',
            'WorkItemBar': '\uF35C',
            'WorkItemBarSolid': '\uF35D',
            'Separator': '\uF35E',
            'NavigateExternalInline': '\uF35F',
            'PlanView': '\uF360',
            'TimelineMatrixView': '\uF361',
            'EngineeringGroup': '\uF362',
            'ProjectCollection': '\uF363',
            'CaretBottomRightCenter8': '\uF364',
            'CaretBottomLeftCenter8': '\uF365',
            'CaretTopRightCenter8': '\uF366',
            'CaretTopLeftCenter8': '\uF367',
            'DonutChart': '\uF368',
            'ChevronUnfold10': '\uF369',
            'ChevronFold10': '\uF36A',
            'DoubleChevronDown8': '\uF36B',
            'DoubleChevronUp8': '\uF36C',
            'DoubleChevronLeft8': '\uF36D',
            'DoubleChevronRight8': '\uF36E',
            'ChevronDownEnd6': '\uF36F',
            'ChevronUpEnd6': '\uF370',
            'ChevronLeftEnd6': '\uF371',
            'ChevronRightEnd6': '\uF372',
            'AzureAPIManagement': '\uF37F',
            'AzureServiceEndpoint': '\uF380',
            'VSTSLogo': '\uF381',
            'VSTSAltLogo1': '\uF382',
            'VSTSAltLogo2': '\uF383',
            'FileTypeSolution': '\uF387',
            'WordLogoInverse16': '\uF390',
            'WordLogo16': '\uF391',
            'WordLogoFill16': '\uF392',
            'PowerPointLogoInverse16': '\uF393',
            'PowerPointLogo16': '\uF394',
            'PowerPointLogoFill16': '\uF395',
            'ExcelLogoInverse16': '\uF396',
            'ExcelLogo16': '\uF397',
            'ExcelLogoFill16': '\uF398',
            'OneNoteLogoInverse16': '\uF399',
            'OneNoteLogo16': '\uF39A',
            'OneNoteLogoFill16': '\uF39B',
            'OutlookLogoInverse16': '\uF39C',
            'OutlookLogo16': '\uF39D',
            'OutlookLogoFill16': '\uF39E',
            'PublisherLogoInverse16': '\uF39F',
            'PublisherLogo16': '\uF3A0',
            'PublisherLogoFill16': '\uF3A1',
            'VisioLogoInverse16': '\uF3A2',
            'VisioLogo16': '\uF3A3',
            'VisioLogoFill16': '\uF3A4',
            'TestBeaker': '\uF3A5',
            'TestBeakerSolid': '\uF3A6',
            'TestExploreSolid': '\uF3A7',
            'TestAutoSolid': '\uF3A8',
            'TestUserSolid': '\uF3A9',
            'TestImpactSolid': '\uF3AA',
            'TestPlan': '\uF3AB',
            'TestStep': '\uF3AC',
            'TestParameter': '\uF3AD',
            'TestSuite': '\uF3AE',
            'TestCase': '\uF3AF',
            'Sprint': '\uF3B0',
            'SignOut': '\uF3B1',
            'TriggerApproval': '\uF3B2',
            'Rocket': '\uF3B3',
            'AzureKeyVault': '\uF3B4',
            'LikeSolid': '\uF3BF',
            'DislikeSolid': '\uF3C0',
            'DeclineCall': '\uF405',
            'Spacer': '\uF40D',
            'SkypeLogo16': '\uF40E',
            'SkypeForBusinessLogo16': '\uF40F',
            'SkypeForBusinessLogoFill16': '\uF410',
            'FilterSolid': '\uF412',
            'MailUndelivered': '\uF415',
            'MailTentative': '\uF416',
            'MailTentativeMirrored': '\uF417',
            'MailReminder': '\uF418',
            'ReceiptUndelivered': '\uF419',
            'ReceiptTentative': '\uF41A',
            'ReceiptTentativeMirrored': '\uF41B',
            'Inbox': '\uF41C',
            'IRMReply': '\uF41D'
        }
    };
    index_1.registerIcons(iconSubset, options);
}
exports.initializeIcons = initializeIcons;
//# sourceMappingURL=fabric-icons-10.js.map

/***/ }),

/***/ 682:
/*!*************************************************************!*\
  !*** ./node_modules/@uifabric/icons/lib/fabric-icons-11.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// tslint:disable:max-line-length
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(/*! @uifabric/styling/lib/index */ 20);
function initializeIcons(baseUrl, options) {
    if (baseUrl === void 0) { baseUrl = ''; }
    var subset = {
        style: {
            MozOsxFontSmoothing: 'grayscale',
            WebkitFontSmoothing: 'antialiased',
            fontStyle: 'normal',
            fontWeight: 'normal',
            speak: 'none'
        },
        fontFace: {
            fontFamily: "\"FabricMDL2Icons-11\"",
            src: "url('" + baseUrl + "fabric-icons-11-c0dbf638.woff') format('woff')",
        },
        icons: {
            'IRMReplyMirrored': '\uF41E',
            'IRMForward': '\uF41F',
            'IRMForwardMirrored': '\uF420',
            'VoicemailIRM': '\uF421',
            'EventAccepted': '\uF422',
            'EventTentative': '\uF423',
            'EventTentativeMirrored': '\uF424',
            'EventDeclined': '\uF425',
            'IDBadge': '\uF427',
            'OfficeFormsLogoInverse16': '\uF433',
            'OfficeFormsLogo': '\uF434',
            'OfficeFormsLogoFill': '\uF435',
            'OfficeFormsLogo16': '\uF436',
            'OfficeFormsLogoFill16': '\uF437',
            'OfficeFormsLogoInverse24': '\uF43A',
            'OfficeFormsLogo24': '\uF43B',
            'OfficeFormsLogoFill24': '\uF43C',
            'PageLock': '\uF43F',
            'NotExecuted': '\uF440',
            'NotImpactedSolid': '\uF441',
            'FieldReadOnly': '\uF442',
            'FieldRequired': '\uF443',
            'BacklogBoard': '\uF444',
            'ExternalBuild': '\uF445',
            'ExternalTFVC': '\uF446',
            'ExternalXAML': '\uF447',
            'IssueSolid': '\uF448',
            'DefectSolid': '\uF449',
            'LadybugSolid': '\uF44A',
            'MTMLogo': '\uF44B',
            'NugetLogo': '\uF44C',
            'TFVCLogo': '\uF44D',
            'ProjectLogo32': '\uF47E',
            'ProjectLogoFill32': '\uF47F',
            'ProjectLogo16': '\uF480',
            'ProjectLogoFill16': '\uF481',
            'SwayLogo32': '\uF482',
            'SwayLogoFill32': '\uF483',
            'SwayLogo16': '\uF484',
            'SwayLogoFill16': '\uF485',
            'ClassNotebookLogo32': '\uF486',
            'ClassNotebookLogoFill32': '\uF487',
            'ClassNotebookLogo16': '\uF488',
            'ClassNotebookLogoFill16': '\uF489',
            'ClassNotebookLogoInverse32': '\uF48A',
            'ClassNotebookLogoInverse16': '\uF48B',
            'StaffNotebookLogo32': '\uF48C',
            'StaffNotebookLogoFill32': '\uF48D',
            'StaffNotebookLogo16': '\uF48E',
            'StaffNotebookLogoFill16': '\uF48F',
            'StaffNotebookLogoInverted32': '\uF490',
            'StaffNotebookLogoInverted16': '\uF491',
            'KaizalaLogo': '\uF492',
            'TaskLogo': '\uF493',
            'ProtectionCenterLogo32': '\uF494',
            'NonprofitLogo32': '\uF495',
            'GallatinLogo': '\uF496',
            'Globe2': '\uF49A',
            'Guitar': '\uF49B',
            'Breakfast': '\uF49C',
            'Brunch': '\uF49D',
            'BeerMug': '\uF49E',
            'Vacation': '\uF49F',
            'Teeth': '\uF4A0',
            'Taxi': '\uF4A1',
            'Chopsticks': '\uF4A2',
            'SyncOccurence': '\uF4A3',
            'UnsyncOccurence': '\uF4A4',
            'PrimaryCalendar': '\uF4AE',
            'SearchCalendar': '\uF4AF',
            'VideoOff': '\uF4B0',
            'MicrosoftFlowLogo': '\uF4B1',
            'BusinessCenterLogo': '\uF4B2',
            'ToDoLogoBottom': '\uF4B3',
            'ToDoLogoTop': '\uF4B4',
            'EditSolid12': '\uF4B5',
            'EditSolidMirrored12': '\uF4B6',
            'UneditableSolid12': '\uF4B7',
            'UneditableSolidMirrored12': '\uF4B8',
            'UneditableMirrored': '\uF4B9',
            'AdminALogo32': '\uF4BA',
            'AdminALogoFill32': '\uF4BB',
            'ToDoLogoInverse': '\uF4BC',
            'Snooze': '\uF4BD'
        }
    };
    index_1.registerIcons(subset, options);
}
exports.initializeIcons = initializeIcons;
//# sourceMappingURL=fabric-icons-11.js.map

/***/ }),

/***/ 683:
/*!**********************************************************!*\
  !*** ./node_modules/@uifabric/icons/lib/icon-aliases.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(/*! @uifabric/styling/lib/index */ 20);
index_1.registerIconAlias('trash', 'delete');
//# sourceMappingURL=icon-aliases.js.map

/***/ }),

/***/ 94:
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ 358);

/***/ })

},[318]);
//# sourceMappingURL=application.js.map