(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'axios', './lib/RequestManager', './lib/extend'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('axios'), require('./lib/RequestManager'), require('./lib/extend'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.axios, global.RequestManager, global.extend);
    global.index = mod.exports;
  }
})(this, function (exports, _axios, _RequestManager, _extend) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = patchAxios;

  var _RequestManager2 = _interopRequireDefault(_RequestManager);

  var _extend2 = _interopRequireDefault(_extend);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function patchAxios(axios, options) {

    var defaults = {
      debug: false
    };
    var settings = (0, _extend2.default)({}, defaults, options);

    var requestManager = new _RequestManager2.default(settings);

    /**
     * Global request interceptor
     * Any request with a `requestId` key in the config will be:
     *  - cancelled if already sent
     *  - added to the `pendingRequests` hash if not, with a cancel function
     */
    axios.interceptors.request.use(function (config) {
      var requestId = config.requestId;

      if (requestId) {
        var source = _axios.CancelToken.source();
        config.cancelToken = source.token;
        requestManager.addRequest(requestId, source.cancel);
      }
      return config;
    });

    /**
     * Global response interceptor
     * Check for the `requestId` and remove it from the `pendingRequests` hash
     */
    axios.interceptors.response.use(function (response) {
      var requestId = response.config.requestId;

      if (requestId) {
        requestManager.removeRequest(requestId);
      }
      return response;
    });

    /**
     * Global axios method to cancel a single request by ID
     * @param requestId: string
     * @param reason
     */
    axios.cancel = function (requestId, reason) {
      if (requestId) {
        requestManager.cancelRequest(requestId, reason);
      }
    };

    /**
     * Global axios method to cancel all requests
     */
    axios.cancelAll = function (reason) {
      requestManager.cancelAllRequests(reason);
    };
  }
});