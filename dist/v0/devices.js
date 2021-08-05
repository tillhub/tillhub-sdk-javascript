"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceBindingFailed = exports.DeviceDeleteFailed = exports.DevicesCountFailed = exports.DeviceCreationFailed = exports.DevicePatchFailed = exports.DeviceContentFetchFailed = exports.DeviceFetchFailed = exports.DevicesFetchFailed = exports.Devices = void 0;
var tslib_1 = require("tslib");
var errors_1 = require("../errors");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var Devices = (function (_super) {
    tslib_1.__extends(Devices, _super);
    function Devices(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, { endpoint: Devices.baseEndpoint, base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com' }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Devices.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    Devices.prototype.getAll = function (queryOrOptions) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var next, base, uri, response_1, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, queryOrOptions);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response_1 = _b.sent();
                        if (response_1.status !== 200) {
                            throw new DevicesFetchFailed(undefined, { status: response_1.status });
                        }
                        if ((_a = response_1.data.cursor) === null || _a === void 0 ? void 0 : _a.next) {
                            next = function () { return _this.getAll({ uri: response_1.data.cursor.next }); };
                        }
                        return [2, {
                                data: response_1.data.results,
                                metadata: { cursor: response_1.data.cursor },
                                next: next
                            }];
                    case 3:
                        error_1 = _b.sent();
                        throw new DevicesFetchFailed(undefined, { error: error_1 });
                    case 4: return [2];
                }
            });
        });
    };
    Devices.prototype.search = function (searchTerm) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri('/search');
                        uri = this.uriHelper.generateUriWithQuery(base, { q: searchTerm });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new DeviceFetchFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_2 = _a.sent();
                        throw new DeviceFetchFailed(undefined, { error: error_2 });
                    case 4: return [2];
                }
            });
        });
    };
    Devices.prototype.get = function (deviceId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + deviceId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new DeviceFetchFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_3 = _a.sent();
                        throw new DeviceFetchFailed(undefined, { error: error_3 });
                    case 4: return [2];
                }
            });
        });
    };
    Devices.prototype.contents = function (deviceId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + deviceId + "/contents");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new DeviceContentFetchFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg
                            }];
                    case 3:
                        error_4 = _a.sent();
                        throw new DeviceContentFetchFailed(undefined, { error: error_4 });
                    case 4: return [2];
                }
            });
        });
    };
    Devices.prototype.patch = function (deviceId, device) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + deviceId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().patch(uri, device)];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_5 = _a.sent();
                        throw new DevicePatchFailed(undefined, { error: error_5 });
                    case 4: return [2];
                }
            });
        });
    };
    Devices.prototype.create = function (device) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_6;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, device)];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_6 = _a.sent();
                        throw new DeviceCreationFailed(undefined, { error: error_6 });
                    case 4: return [2];
                }
            });
        });
    };
    Devices.prototype.bind = function (deviceOrShortId, bindRequest) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_7;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + deviceOrShortId + "/bind");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, bindRequest)];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_7 = _a.sent();
                        throw new DeviceBindingFailed(undefined, { error: error_7 });
                    case 4: return [2];
                }
            });
        });
    };
    Devices.prototype.delete = function (deviceId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + deviceId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().delete(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new DeviceDeleteFailed();
                        return [2, {
                                msg: response.data.msg
                            }];
                    case 3:
                        err_1 = _a.sent();
                        throw new DeviceDeleteFailed();
                    case 4: return [2];
                }
            });
        });
    };
    Devices.baseEndpoint = '/api/v0/devices';
    return Devices;
}(base_1.ThBaseHandler));
exports.Devices = Devices;
var DevicesFetchFailed = (function (_super) {
    tslib_1.__extends(DevicesFetchFailed, _super);
    function DevicesFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch devices'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DevicesFetchFailed';
        Object.setPrototypeOf(_this, DevicesFetchFailed.prototype);
        return _this;
    }
    return DevicesFetchFailed;
}(errors_1.BaseError));
exports.DevicesFetchFailed = DevicesFetchFailed;
var DeviceFetchFailed = (function (_super) {
    tslib_1.__extends(DeviceFetchFailed, _super);
    function DeviceFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch device'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DeviceFetchFailed';
        Object.setPrototypeOf(_this, DeviceFetchFailed.prototype);
        return _this;
    }
    return DeviceFetchFailed;
}(errors_1.BaseError));
exports.DeviceFetchFailed = DeviceFetchFailed;
var DeviceContentFetchFailed = (function (_super) {
    tslib_1.__extends(DeviceContentFetchFailed, _super);
    function DeviceContentFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch device content'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DeviceContentFetchFailed';
        Object.setPrototypeOf(_this, DeviceContentFetchFailed.prototype);
        return _this;
    }
    return DeviceContentFetchFailed;
}(errors_1.BaseError));
exports.DeviceContentFetchFailed = DeviceContentFetchFailed;
var DevicePatchFailed = (function (_super) {
    tslib_1.__extends(DevicePatchFailed, _super);
    function DevicePatchFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter device'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DevicePatchFailed';
        Object.setPrototypeOf(_this, DevicePatchFailed.prototype);
        return _this;
    }
    return DevicePatchFailed;
}(errors_1.BaseError));
exports.DevicePatchFailed = DevicePatchFailed;
var DeviceCreationFailed = (function (_super) {
    tslib_1.__extends(DeviceCreationFailed, _super);
    function DeviceCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create device'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DeviceCreationFailed';
        Object.setPrototypeOf(_this, DeviceCreationFailed.prototype);
        return _this;
    }
    return DeviceCreationFailed;
}(errors_1.BaseError));
exports.DeviceCreationFailed = DeviceCreationFailed;
var DevicesCountFailed = (function (_super) {
    tslib_1.__extends(DevicesCountFailed, _super);
    function DevicesCountFailed(message, properties) {
        if (message === void 0) { message = 'Could not count the devices'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DevicesCountFailed';
        Object.setPrototypeOf(_this, DevicesCountFailed.prototype);
        return _this;
    }
    return DevicesCountFailed;
}(errors_1.BaseError));
exports.DevicesCountFailed = DevicesCountFailed;
var DeviceDeleteFailed = (function (_super) {
    tslib_1.__extends(DeviceDeleteFailed, _super);
    function DeviceDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete device'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DeviceDeleteFailed';
        Object.setPrototypeOf(_this, DeviceDeleteFailed.prototype);
        return _this;
    }
    return DeviceDeleteFailed;
}(errors_1.BaseError));
exports.DeviceDeleteFailed = DeviceDeleteFailed;
var DeviceBindingFailed = (function (_super) {
    tslib_1.__extends(DeviceBindingFailed, _super);
    function DeviceBindingFailed(message, properties) {
        if (message === void 0) { message = 'Could not bind device'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DeviceBindingFailed';
        Object.setPrototypeOf(_this, DeviceBindingFailed.prototype);
        return _this;
    }
    return DeviceBindingFailed;
}(errors_1.BaseError));
exports.DeviceBindingFailed = DeviceBindingFailed;
//# sourceMappingURL=devices.js.map