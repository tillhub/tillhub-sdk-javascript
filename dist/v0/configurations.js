"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Configurations = void 0;
var tslib_1 = require("tslib");
var qs_1 = tslib_1.__importDefault(require("qs"));
var errors = tslib_1.__importStar(require("../errors"));
var users_1 = require("./users");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var ConfigurationReference = (function () {
    function ConfigurationReference(response, http, options) {
        this.data = response.data;
        this.id = response.data.id;
        this.metadata = response.metadata;
        this.response = response;
        this.options = options;
        this.http = http;
    }
    ConfigurationReference.prototype.users = function () {
        return new users_1.Users(this.options, this.http);
    };
    return ConfigurationReference;
}());
var Configurations = (function (_super) {
    tslib_1.__extends(Configurations, _super);
    function Configurations(options, http) {
        var _this = _super.call(this, http, {
            endpoint: Configurations.baseEndpoint,
            base: options.base || 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Configurations.baseEndpoint;
        _this.options.base = _this.options.base || 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    Configurations.prototype.getAll = function (optionsOrQuery) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, queryString, response, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = void 0;
                        if (optionsOrQuery && optionsOrQuery.uri) {
                            uri = optionsOrQuery.uri;
                        }
                        else {
                            queryString = '';
                            if (optionsOrQuery && (optionsOrQuery.query || optionsOrQuery.owner)) {
                                queryString = qs_1.default.stringify(tslib_1.__assign({ owner: optionsOrQuery.owner }, optionsOrQuery.query));
                            }
                            uri = "" + this.options.base + this.endpoint + "/" + this.options.user + (queryString ? "?" + queryString : '');
                        }
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        response.status !== 200 && reject(new errors.ConfigurationsFetchFailed());
                        return [2, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 2:
                        err_1 = _a.sent();
                        return [2, reject(new errors.ConfigurationsFetchFailed())];
                    case 3: return [2];
                }
            });
        }); });
    };
    Configurations.prototype.get = function (configurationId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + configurationId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 &&
                            reject(new errors.ConfigurationFetchFailed(undefined, { status: response.status }));
                        return [2, resolve(new ConfigurationReference({
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }, this.http, this.options))];
                    case 3:
                        error_1 = _a.sent();
                        return [2, reject(new errors.ConfigurationFetchFailed(undefined, { error: error_1 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    Configurations.prototype.put = function (configurationId, configuration) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + configurationId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri, configuration)];
                    case 2:
                        response = _a.sent();
                        return [2, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_2 = _a.sent();
                        return [2, reject(new errors.ConfigurationPutFailed(undefined, { error: error_2 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    Configurations.prototype.patch = function (configurationId, configuration) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + configurationId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().patch(uri, configuration)];
                    case 2:
                        response = _a.sent();
                        return [2, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_3 = _a.sent();
                        return [2, reject(new errors.ConfigurationPatchFailed(undefined, { error: error_3 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    Configurations.prototype.create = function (configuration) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, configuration)];
                    case 2:
                        response = _a.sent();
                        return [2, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_4 = _a.sent();
                        return [2, reject(new errors.ConfigurationCreationFailed(undefined, { error: error_4 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    Configurations.prototype.delete = function (configurationId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri("/" + configurationId);
                        return [4, this.http.getClient().delete(uri)];
                    case 1:
                        response = _a.sent();
                        return [2, resolve({
                                msg: response.data.msg
                            })];
                    case 2:
                        error_5 = _a.sent();
                        return [2, reject(new errors.ConfigurationDeleteFailed(undefined, { error: error_5 }))];
                    case 3: return [2];
                }
            });
        }); });
    };
    Configurations.baseEndpoint = '/api/v0/configurations';
    return Configurations;
}(base_1.ThBaseHandler));
exports.Configurations = Configurations;
//# sourceMappingURL=configurations.js.map