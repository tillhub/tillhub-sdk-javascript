"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
var tslib_1 = require("tslib");
var axios_1 = tslib_1.__importDefault(require("axios"));
var environment_1 = require("./environment");
var defaultHeaders = {
    'X-Client-Type': 'Tillhub SDK JavaScript',
    'X-Client-Version': environment_1.environment.VERSION
};
var Client = (function () {
    function Client(options) {
        var _a;
        this.responseInterceptorIds = [];
        this.requestInterceptorIds = [];
        this.axiosInstance = axios_1.default.create({
            timeout: (_a = options.timeout) !== null && _a !== void 0 ? _a : 10000,
            headers: tslib_1.__assign(tslib_1.__assign({}, options.headers), defaultHeaders)
        });
    }
    Client.getInstance = function (options) {
        if (Client.instance) {
            Client.instance.setDefaults(options);
        }
        if (!Client.instance) {
            Client.instance = new Client(options);
        }
        return Client.instance;
    };
    Client.clearInstance = function () {
        Client.instance.clearDefaults();
    };
    Client.prototype.getClient = function () {
        return Client.instance.axiosInstance;
    };
    Client.prototype.setDefaults = function (options) {
        var _a, _b;
        Client.instance.axiosInstance.defaults.headers.common = tslib_1.__assign(tslib_1.__assign({}, this.axiosInstance.defaults.headers.common), options.headers);
        Client.instance.axiosInstance.defaults.headers = tslib_1.__assign(tslib_1.__assign({}, this.axiosInstance.defaults.headers), options.headers);
        if ((_a = options === null || options === void 0 ? void 0 : options.responseInterceptors) === null || _a === void 0 ? void 0 : _a.length) {
            this.responseInterceptorIds.forEach(function (id) {
                return Client.instance.axiosInstance.interceptors.response.eject(id);
            });
            this.responseInterceptorIds = options.responseInterceptors.map(function (interceptor) {
                return Client.instance.axiosInstance.interceptors.response.use(undefined, interceptor);
            });
        }
        if ((_b = options === null || options === void 0 ? void 0 : options.requestInterceptors) === null || _b === void 0 ? void 0 : _b.length) {
            this.requestInterceptorIds.forEach(function (id) {
                return Client.instance.axiosInstance.interceptors.request.eject(id);
            });
            this.requestInterceptorIds = options.requestInterceptors.map(function (interceptor) {
                return Client.instance.axiosInstance.interceptors.request.use(interceptor);
            });
        }
        return Client.instance;
    };
    Client.prototype.clearDefaults = function () {
        delete Client.instance.axiosInstance.defaults.headers.common.Authorization;
        delete Client.instance.axiosInstance.defaults.headers.Authorization;
        delete Client.instance.axiosInstance.defaults.headers['x-whitelabel'];
        Client.instance.axiosInstance.defaults.headers.common = tslib_1.__assign({}, defaultHeaders);
    };
    return Client;
}());
exports.Client = Client;
//# sourceMappingURL=client.js.map