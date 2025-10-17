"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Configurations = void 0;
var tslib_1 = require("tslib");
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
            var base, uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, optionsOrQuery);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new errors.ConfigurationsFetchFailed();
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_1 = _a.sent();
                        throw new errors.ConfigurationsFetchFailed(error_1.message, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    Configurations.prototype.get = function (configurationId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + configurationId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new errors.ConfigurationFetchFailed(undefined, { status: response.status });
                        }
                        return [2, new ConfigurationReference({
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }, this.http, this.options)];
                    case 3:
                        error_2 = _a.sent();
                        throw new errors.ConfigurationFetchFailed(error_2.message, { error: error_2 });
                    case 4: return [2];
                }
            });
        });
    };
    Configurations.prototype.put = function (configurationId, configuration) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + configurationId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri, configuration)];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_3 = _a.sent();
                        throw new errors.ConfigurationPutFailed(error_3.message, { error: error_3 });
                    case 4: return [2];
                }
            });
        });
    };
    Configurations.prototype.patch = function (configurationId, configuration) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + configurationId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().patch(uri, configuration)];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_4 = _a.sent();
                        throw new errors.ConfigurationPatchFailed(error_4.message, { error: error_4 });
                    case 4: return [2];
                }
            });
        });
    };
    Configurations.prototype.create = function (configuration) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, configuration)];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_5 = _a.sent();
                        throw new errors.ConfigurationCreationFailed(error_5.message, { error: error_5 });
                    case 4: return [2];
                }
            });
        });
    };
    Configurations.prototype.delete = function (configurationId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_6;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri("/" + configurationId);
                        return [4, this.http.getClient().delete(uri)];
                    case 1:
                        response = _a.sent();
                        return [2, {
                                data: {},
                                msg: response.data.msg
                            }];
                    case 2:
                        error_6 = _a.sent();
                        throw new errors.ConfigurationDeleteFailed(error_6.message, { error: error_6 });
                    case 3: return [2];
                }
            });
        });
    };
    Configurations.prototype.bulkFetch = function (body) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_7;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri('/bulk-fetch');
                        return [4, this.http.getClient().post(uri, body)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new errors.ConfigurationBulkFetchFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results,
                                metadata: response.data.metadata
                            }];
                    case 2:
                        error_7 = _a.sent();
                        throw new errors.ConfigurationBulkFetchFailed(error_7.message, { error: error_7 });
                    case 3: return [2];
                }
            });
        });
    };
    Configurations.prototype.bulkUpdate = function (body) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_8;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri('/bulk-update');
                        return [4, this.http.getClient().patch(uri, body)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new errors.ConfigurationBulkUpdateFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results,
                                metadata: response.data.metadata
                            }];
                    case 2:
                        error_8 = _a.sent();
                        throw new errors.ConfigurationBulkUpdateFailed(error_8.message, { error: error_8 });
                    case 3: return [2];
                }
            });
        });
    };
    Configurations.baseEndpoint = '/api/v0/configurations';
    return Configurations;
}(base_1.ThBaseHandler));
exports.Configurations = Configurations;
//# sourceMappingURL=configurations.js.map