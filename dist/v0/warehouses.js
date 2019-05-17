"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var uri_helper_1 = require("../uri-helper");
var baseError_1 = require("../errors/baseError");
var Warehouses = /** @class */ (function () {
    function Warehouses(options, http) {
        this.options = options;
        this.http = http;
        this.endpoint = '/api/v0/warehouses';
        this.options.base = this.options.base || 'https://api.tillhub.com';
        this.uriHelper = new uri_helper_1.UriHelper(this.endpoint, this.options);
    }
    Warehouses.prototype.getAll = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var base, uri, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2 /*return*/, reject(new WarehousesFetchFailed(undefined, { status: response.status }))];
                        }
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { cursor: response.data.cursor }
                            })];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, reject(new WarehousesFetchFailed(undefined, { error: error_1 }))];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Warehouses.prototype.getOne = function (warehouseId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + warehouseId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2 /*return*/, reject(new WarehouseFetchOneFailed(undefined, { status: response.status }))];
                        }
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_2 = _a.sent();
                        return [2 /*return*/, reject(new WarehouseFetchOneFailed(undefined, { error: error_2 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Warehouses.prototype.create = function (warehouse) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().post(uri, warehouse)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2 /*return*/, reject(new WarehouseCreateFailed(undefined, { status: response.status }))];
                        }
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count },
                                errors: response.data.errors || []
                            })];
                    case 3:
                        error_3 = _a.sent();
                        return [2 /*return*/, reject(new WarehouseCreateFailed(undefined, { error: error_3 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Warehouses.prototype.put = function (warehouseId, warehouse) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + warehouseId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().put(uri, warehouse)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2 /*return*/, reject(new WarehousePutFailed(undefined, { status: response.status }))];
                        }
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_4 = _a.sent();
                        return [2 /*return*/, reject(new WarehousePutFailed(undefined, { error: error_4 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Warehouses.prototype.delete = function (warehouseId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + warehouseId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().delete(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2 /*return*/, reject(new WarehouseDeleteFailed(undefined, { status: response.status }))];
                        }
                        return [2 /*return*/, resolve({ msg: response.data.msg })];
                    case 3:
                        error_5 = _a.sent();
                        return [2 /*return*/, reject(new WarehouseDeleteFailed(undefined, { error: error_5 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    return Warehouses;
}());
exports.Warehouses = Warehouses;
var WarehousesFetchFailed = /** @class */ (function (_super) {
    __extends(WarehousesFetchFailed, _super);
    function WarehousesFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch warehouses'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'WarehousesFetchFailed';
        return _this;
    }
    return WarehousesFetchFailed;
}(baseError_1.BaseError));
var WarehouseFetchOneFailed = /** @class */ (function (_super) {
    __extends(WarehouseFetchOneFailed, _super);
    function WarehouseFetchOneFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch one warehouse'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'WarehouseFetchOneFailed';
        return _this;
    }
    return WarehouseFetchOneFailed;
}(baseError_1.BaseError));
var WarehouseCreateFailed = /** @class */ (function (_super) {
    __extends(WarehouseCreateFailed, _super);
    function WarehouseCreateFailed(message, properties) {
        if (message === void 0) { message = 'Could not create the warehouse'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'WarehouseCreateFailed';
        return _this;
    }
    return WarehouseCreateFailed;
}(baseError_1.BaseError));
var WarehousePutFailed = /** @class */ (function (_super) {
    __extends(WarehousePutFailed, _super);
    function WarehousePutFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter the warehouse'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'WarehousePutFailed';
        return _this;
    }
    return WarehousePutFailed;
}(baseError_1.BaseError));
var WarehouseDeleteFailed = /** @class */ (function (_super) {
    __extends(WarehouseDeleteFailed, _super);
    function WarehouseDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete the warehouse'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'WarehouseDeleteFailed';
        return _this;
    }
    return WarehouseDeleteFailed;
}(baseError_1.BaseError));
//# sourceMappingURL=warehouses.js.map