"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Registers = void 0;
var tslib_1 = require("tslib");
var just_typeof_1 = tslib_1.__importDefault(require("just-typeof"));
var errors = tslib_1.__importStar(require("../errors"));
var base_1 = require("../base");
var uri_helper_1 = require("../uri-helper");
var Registers = (function (_super) {
    tslib_1.__extends(Registers, _super);
    function Registers(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: Registers.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Registers.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    Registers.prototype.getAll = function (q) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var next, base, uri, response_1, err_1;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, q);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response_1 = _b.sent();
                        if ((_a = response_1.data.cursor) === null || _a === void 0 ? void 0 : _a.next) {
                            next = function () { return _this.getAll({ uri: response_1.data.cursor.next }); };
                        }
                        return [2, {
                                data: response_1.data.results,
                                metadata: { count: response_1.data.count },
                                next: next
                            }];
                    case 2:
                        err_1 = _b.sent();
                        throw new errors.RegistersFetchFailed();
                    case 3: return [2];
                }
            });
        });
    };
    Registers.prototype.get = function (registerId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + registerId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results[0]
                            }];
                    case 3:
                        error_1 = _a.sent();
                        throw new errors.RegisterFetchFailed(undefined, { error: error_1 });
                    case 4: return [2];
                }
            });
        });
    };
    Registers.prototype.notify = function (registerId, notification) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri("/" + registerId + "/notification");
                        return [4, this.http.getClient().post(uri, notification)];
                    case 1:
                        response = _a.sent();
                        return [2, {
                                data: response.data.msg
                            }];
                    case 2:
                        error_2 = _a.sent();
                        throw new errors.RegisterNotificationCreateFailed(undefined, { error: error_2 });
                    case 3: return [2];
                }
            });
        });
    };
    Registers.prototype.updateDeviceConfiguration = function (registerId, deviceConfiguration) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri("/" + registerId + "/device_configuration");
                        return [4, this.http.getClient().put(uri, deviceConfiguration)];
                    case 1:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results[0]
                            }];
                    case 2:
                        error_3 = _a.sent();
                        console.warn(error_3);
                        throw new errors.RegisterDeviceConfigurationPutFailed(undefined, { error: error_3 });
                    case 3: return [2];
                }
            });
        });
    };
    Registers.prototype.put = function (registerId, register) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + registerId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri, register)];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_4 = _a.sent();
                        throw new errors.RegisterPutFailed(undefined, { error: error_4 });
                    case 4: return [2];
                }
            });
        });
    };
    Registers.prototype.search = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, base, response, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof query === 'string') {
                            uri = this.uriHelper.generateBaseUri("/search?q=" + query);
                        }
                        else if (just_typeof_1.default(query) === 'object') {
                            base = this.uriHelper.generateBaseUri('/search');
                            uri = this.uriHelper.generateUriWithQuery(base, query);
                        }
                        else {
                            throw new errors.RegistersSearchFailed('Could not search for register - query type is invalid');
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new errors.RegistersSearchFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_5 = _a.sent();
                        throw new errors.RegistersSearchFailed(undefined, { error: error_5 });
                    case 4: return [2];
                }
            });
        });
    };
    Registers.baseEndpoint = '/api/v1/registers';
    return Registers;
}(base_1.ThBaseHandler));
exports.Registers = Registers;
//# sourceMappingURL=registers.js.map