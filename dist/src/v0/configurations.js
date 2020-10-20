"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Configurations = void 0;
var tslib_1 = require("tslib");
var errors = tslib_1.__importStar(require("../errors"));
var users_1 = require("./users");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var ConfigurationReference = /** @class */ (function () {
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
var Configurations = /** @class */ (function (_super) {
    tslib_1.__extends(Configurations, _super);
    function Configurations(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: Configurations.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Configurations.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    Configurations.prototype.getAll = function (optionsOrQuery) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, optionsOrQuery);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new errors.ConfigurationsFetchFailed();
                        return [2 /*return*/, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        err_1 = _a.sent();
                        throw new errors.ConfigurationsFetchFailed();
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Configurations.prototype.get = function (configurationId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + configurationId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new errors.ConfigurationFetchFailed(undefined, { status: response.status });
                        }
                        // we are wrapping the response into a class to reference sub APIs more easily
                        return [2 /*return*/, new ConfigurationReference({
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }, this.http, this.options)];
                    case 3:
                        error_1 = _a.sent();
                        throw new errors.ConfigurationFetchFailed(undefined, { error: error_1 });
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Configurations.prototype.put = function (configurationId, configuration) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + configurationId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().put(uri, configuration)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_2 = _a.sent();
                        throw new errors.ConfigurationPutFailed(undefined, { error: error_2 });
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Configurations.prototype.patch = function (configurationId, configuration) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + configurationId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().patch(uri, configuration)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_3 = _a.sent();
                        throw new errors.ConfigurationPatchFailed(undefined, { error: error_3 });
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Configurations.prototype.create = function (configuration) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().post(uri, configuration)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_4 = _a.sent();
                        throw new errors.ConfigurationCreationFailed(undefined, { error: error_4 });
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Configurations.prototype.delete = function (configurationId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri("/" + configurationId);
                        return [4 /*yield*/, this.http.getClient().delete(uri)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, {
                                data: {},
                                msg: response.data.msg
                            }];
                    case 2:
                        error_5 = _a.sent();
                        throw new errors.ConfigurationDeleteFailed(undefined, { error: error_5 });
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Configurations.baseEndpoint = '/api/v0/configurations';
    return Configurations;
}(base_1.ThBaseHandler));
exports.Configurations = Configurations;
//# sourceMappingURL=configurations.js.map