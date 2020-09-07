"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Registers = void 0;
var tslib_1 = require("tslib");
var qs_1 = tslib_1.__importDefault(require("qs"));
var errors = tslib_1.__importStar(require("../errors"));
var base_1 = require("../base");
var Registers = (function (_super) {
    tslib_1.__extends(Registers, _super);
    function Registers(options, http) {
        var _this = _super.call(this, http, {
            endpoint: Registers.baseEndpoint,
            base: options.base || 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Registers.baseEndpoint;
        _this.options.base = _this.options.base || 'https://api.tillhub.com';
        return _this;
    }
    Registers.prototype.getAll = function (q) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var query, uri, next, queryString, response_1, err_1;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = q ? JSON.parse(JSON.stringify(q)) : {};
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (query && query.uri) {
                            uri = query.uri;
                        }
                        else {
                            uri = "" + this.options.base + this.endpoint + "/" + this.options.user;
                        }
                        queryString = qs_1.default.stringify(query);
                        if (queryString) {
                            uri = uri + "?" + queryString;
                        }
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response_1 = _a.sent();
                        if (response_1.data.cursor && response_1.data.cursor.next) {
                            next = function () { return _this.getAll({ uri: response_1.data.cursor.next }); };
                        }
                        return [2, resolve({
                                data: response_1.data.results,
                                metadata: { count: response_1.data.count },
                                next: next
                            })];
                    case 3:
                        err_1 = _a.sent();
                        return [2, reject(new errors.RegistersFetchFailed())];
                    case 4: return [2];
                }
            });
        }); });
    };
    Registers.prototype.get = function (registerId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + registerId;
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
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + registerId + "/notification";
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
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + registerId + "/device_configuration";
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
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + registerId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri, register)];
                    case 2:
                        response = _a.sent();
                        return [2, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_4 = _a.sent();
                        return [2, reject(new errors.RegisterPutFailed(undefined, { error: error_4 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    Registers.baseEndpoint = '/api/v1/registers';
    return Registers;
}(base_1.ThBaseHandler));
exports.Registers = Registers;
//# sourceMappingURL=registers.js.map