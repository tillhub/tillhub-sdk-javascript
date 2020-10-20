"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Warehouses = void 0;
var tslib_1 = require("tslib");
var uri_helper_1 = require("../uri-helper");
var baseError_1 = require("../errors/baseError");
var base_1 = require("../base");
var Warehouses = (function (_super) {
    tslib_1.__extends(Warehouses, _super);
    function Warehouses(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: Warehouses.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Warehouses.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    Warehouses.prototype.getAll = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new WarehousesFetchFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results,
                                metadata: { cursor: response.data.cursor }
                            }];
                    case 2:
                        error_1 = _a.sent();
                        throw new WarehousesFetchFailed(undefined, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    Warehouses.prototype.getOne = function (warehouseId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + warehouseId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new WarehouseFetchOneFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_2 = _a.sent();
                        throw new WarehouseFetchOneFailed(undefined, { error: error_2 });
                    case 4: return [2];
                }
            });
        });
    };
    Warehouses.prototype.create = function (warehouse) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, warehouse)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new WarehouseCreateFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count },
                                errors: response.data.errors || []
                            }];
                    case 3:
                        error_3 = _a.sent();
                        throw new WarehouseCreateFailed(undefined, { error: error_3 });
                    case 4: return [2];
                }
            });
        });
    };
    Warehouses.prototype.put = function (warehouseId, warehouse) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + warehouseId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri, warehouse)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new WarehousePutFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_4 = _a.sent();
                        throw new WarehousePutFailed(undefined, { error: error_4 });
                    case 4: return [2];
                }
            });
        });
    };
    Warehouses.prototype.delete = function (warehouseId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + warehouseId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().delete(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new WarehouseDeleteFailed(undefined, { status: response.status });
                        }
                        return [2, { msg: response.data.msg }];
                    case 3:
                        error_5 = _a.sent();
                        throw new WarehouseDeleteFailed(undefined, { error: error_5 });
                    case 4: return [2];
                }
            });
        });
    };
    Warehouses.baseEndpoint = '/api/v0/warehouses';
    return Warehouses;
}(base_1.ThBaseHandler));
exports.Warehouses = Warehouses;
var WarehousesFetchFailed = (function (_super) {
    tslib_1.__extends(WarehousesFetchFailed, _super);
    function WarehousesFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch warehouses'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'WarehousesFetchFailed';
        Object.setPrototypeOf(_this, WarehousesFetchFailed.prototype);
        return _this;
    }
    return WarehousesFetchFailed;
}(baseError_1.BaseError));
var WarehouseFetchOneFailed = (function (_super) {
    tslib_1.__extends(WarehouseFetchOneFailed, _super);
    function WarehouseFetchOneFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch one warehouse'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'WarehouseFetchOneFailed';
        Object.setPrototypeOf(_this, WarehouseFetchOneFailed.prototype);
        return _this;
    }
    return WarehouseFetchOneFailed;
}(baseError_1.BaseError));
var WarehouseCreateFailed = (function (_super) {
    tslib_1.__extends(WarehouseCreateFailed, _super);
    function WarehouseCreateFailed(message, properties) {
        if (message === void 0) { message = 'Could not create the warehouse'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'WarehouseCreateFailed';
        Object.setPrototypeOf(_this, WarehouseCreateFailed.prototype);
        return _this;
    }
    return WarehouseCreateFailed;
}(baseError_1.BaseError));
var WarehousePutFailed = (function (_super) {
    tslib_1.__extends(WarehousePutFailed, _super);
    function WarehousePutFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter the warehouse'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'WarehousePutFailed';
        Object.setPrototypeOf(_this, WarehousePutFailed.prototype);
        return _this;
    }
    return WarehousePutFailed;
}(baseError_1.BaseError));
var WarehouseDeleteFailed = (function (_super) {
    tslib_1.__extends(WarehouseDeleteFailed, _super);
    function WarehouseDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete the warehouse'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'WarehouseDeleteFailed';
        Object.setPrototypeOf(_this, WarehouseDeleteFailed.prototype);
        return _this;
    }
    return WarehouseDeleteFailed;
}(baseError_1.BaseError));
//# sourceMappingURL=warehouses.js.map