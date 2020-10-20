"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceGroupDeleteFailed = exports.DeviceGroupCreationFailed = exports.DeviceGroupPutFailed = exports.DeviceGroupFetchFailed = exports.DeviceGroupsFetchFailed = exports.DeviceGroups = void 0;
var tslib_1 = require("tslib");
var errors_1 = require("../errors");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var DeviceGroups = /** @class */ (function (_super) {
    tslib_1.__extends(DeviceGroups, _super);
    function DeviceGroups(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: DeviceGroups.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = DeviceGroups.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    DeviceGroups.prototype.getAll = function (query) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var next, base, uri, response_1, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response_1 = _b.sent();
                        if ((_a = response_1.data.cursor) === null || _a === void 0 ? void 0 : _a.next) {
                            next = function () {
                                return _this.getAll({ uri: response_1.data.cursor.next });
                            };
                        }
                        return [2 /*return*/, {
                                data: response_1.data.results,
                                metadata: { count: response_1.data.count, cursor: response_1.data.cursor },
                                next: next
                            }];
                    case 2:
                        error_1 = _b.sent();
                        throw new DeviceGroupsFetchFailed(undefined, { error: error_1 });
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DeviceGroups.prototype.get = function (deviceGroupId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + deviceGroupId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new DeviceGroupFetchFailed(undefined, { status: response.status });
                        }
                        return [2 /*return*/, {
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_2 = _a.sent();
                        throw new DeviceGroupFetchFailed(undefined, { error: error_2 });
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DeviceGroups.prototype.put = function (deviceGroupId, deviceGroup) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + deviceGroupId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().put(uri, deviceGroup)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_3 = _a.sent();
                        throw new DeviceGroupPutFailed(undefined, { error: error_3 });
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DeviceGroups.prototype.create = function (deviceGroup) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().post(uri, deviceGroup)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_4 = _a.sent();
                        throw new DeviceGroupCreationFailed(undefined, { error: error_4 });
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DeviceGroups.prototype.delete = function (deviceGroupId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + deviceGroupId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().delete(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new DeviceGroupDeleteFailed();
                        return [2 /*return*/, {
                                msg: response.data.msg
                            }];
                    case 3:
                        err_1 = _a.sent();
                        throw new DeviceGroupDeleteFailed();
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DeviceGroups.baseEndpoint = '/api/v0/device_groups';
    return DeviceGroups;
}(base_1.ThBaseHandler));
exports.DeviceGroups = DeviceGroups;
var DeviceGroupsFetchFailed = /** @class */ (function (_super) {
    tslib_1.__extends(DeviceGroupsFetchFailed, _super);
    function DeviceGroupsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch device groups'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DeviceGroupsFetchFailed';
        Object.setPrototypeOf(_this, DeviceGroupsFetchFailed.prototype);
        return _this;
    }
    return DeviceGroupsFetchFailed;
}(errors_1.BaseError));
exports.DeviceGroupsFetchFailed = DeviceGroupsFetchFailed;
var DeviceGroupFetchFailed = /** @class */ (function (_super) {
    tslib_1.__extends(DeviceGroupFetchFailed, _super);
    function DeviceGroupFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch device group'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DeviceGroupFetchFailed';
        Object.setPrototypeOf(_this, DeviceGroupFetchFailed.prototype);
        return _this;
    }
    return DeviceGroupFetchFailed;
}(errors_1.BaseError));
exports.DeviceGroupFetchFailed = DeviceGroupFetchFailed;
var DeviceGroupPutFailed = /** @class */ (function (_super) {
    tslib_1.__extends(DeviceGroupPutFailed, _super);
    function DeviceGroupPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter device group'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DeviceGroupPutFailed';
        Object.setPrototypeOf(_this, DeviceGroupPutFailed.prototype);
        return _this;
    }
    return DeviceGroupPutFailed;
}(errors_1.BaseError));
exports.DeviceGroupPutFailed = DeviceGroupPutFailed;
var DeviceGroupCreationFailed = /** @class */ (function (_super) {
    tslib_1.__extends(DeviceGroupCreationFailed, _super);
    function DeviceGroupCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create device group'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DeviceGroupCreationFailed';
        Object.setPrototypeOf(_this, DeviceGroupCreationFailed.prototype);
        return _this;
    }
    return DeviceGroupCreationFailed;
}(errors_1.BaseError));
exports.DeviceGroupCreationFailed = DeviceGroupCreationFailed;
var DeviceGroupDeleteFailed = /** @class */ (function (_super) {
    tslib_1.__extends(DeviceGroupDeleteFailed, _super);
    function DeviceGroupDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete device group'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DeviceGroupDeleteFailed';
        Object.setPrototypeOf(_this, DeviceGroupDeleteFailed.prototype);
        return _this;
    }
    return DeviceGroupDeleteFailed;
}(errors_1.BaseError));
exports.DeviceGroupDeleteFailed = DeviceGroupDeleteFailed;
//# sourceMappingURL=device_groups.js.map