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
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
exports.StockTakingsMetaFailed = exports.StockTakingsDeleteFailed = exports.StockTakingsCreationFailed = exports.StockTakingsUpdateFailed = exports.StockTakingsFetchOneFailed = exports.StockTakingsFetchFailed = exports.StockTakings = void 0;
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var errors_1 = require("../errors");
var StockTakings = /** @class */ (function (_super) {
    __extends(StockTakings, _super);
    function StockTakings(options, http) {
        var _this = _super.call(this, http, {
            endpoint: StockTakings.baseEndpoint,
            base: options.base || 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = StockTakings.baseEndpoint;
        _this.options.base = _this.options.base || 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    StockTakings.prototype.create = function (stockTaking) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri();
                        return [4 /*yield*/, this.http.getClient().post(uri, stockTaking)];
                    case 1:
                        response = _a.sent();
                        response.status !== 200 &&
                            reject(new StockTakingsCreationFailed(undefined, { status: response.status }));
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, reject(new StockTakingsCreationFailed(undefined, { error: error_1 }))];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    StockTakings.prototype.getAll = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var next, baseUri, uri, response_1, error_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        baseUri = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(baseUri, query);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response_1 = _a.sent();
                        if (response_1.status !== 200) {
                            return [2 /*return*/, reject(new StockTakingsFetchFailed(undefined, { status: response_1.status }))];
                        }
                        if (response_1.data.cursor && response_1.data.cursor.next) {
                            next = function () {
                                return _this.getAll({ uri: response_1.data.cursor.next });
                            };
                        }
                        return [2 /*return*/, resolve({
                                data: response_1.data.results,
                                metadata: { count: response_1.data.count },
                                next: next
                            })];
                    case 2:
                        error_2 = _a.sent();
                        return [2 /*return*/, reject(new StockTakingsFetchFailed(undefined, { error: error_2 }))];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    StockTakings.prototype.get = function (stockTakingId, query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var baseUri, uri, response, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        baseUri = this.uriHelper.generateBaseUri("/" + stockTakingId);
                        uri = this.uriHelper.generateUriWithQuery(baseUri, query);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        response.status !== 200 &&
                            reject(new StockTakingsFetchOneFailed(undefined, { status: response.status }));
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                metadata: { count: 1 }
                            })];
                    case 2:
                        error_3 = _a.sent();
                        return [2 /*return*/, reject(new StockTakingsFetchOneFailed(undefined, { error: error_3 }))];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    StockTakings.prototype.update = function (stockTakingId, stockTaking) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri("/" + stockTakingId);
                        return [4 /*yield*/, this.http.getClient().patch(uri, stockTaking)];
                    case 1:
                        response = _a.sent();
                        response.status !== 200 &&
                            reject(new StockTakingsUpdateFailed(undefined, { status: response.status }));
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 2:
                        error_4 = _a.sent();
                        return [2 /*return*/, reject(new StockTakingsUpdateFailed(undefined, { error: error_4 }))];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    StockTakings.prototype.delete = function (stockTakingId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri("/" + stockTakingId);
                        return [4 /*yield*/, this.http.getClient().delete(uri)];
                    case 1:
                        response = _a.sent();
                        response.status !== 200 &&
                            reject(new StockTakingsDeleteFailed(undefined, { status: response.status }));
                        return [2 /*return*/, resolve({
                                msg: response.data.msg
                            })];
                    case 2:
                        error_5 = _a.sent();
                        return [2 /*return*/, reject(new StockTakingsDeleteFailed(undefined, { error: error_5 }))];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    StockTakings.prototype.meta = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var base, uri, response, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri('/meta');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2 /*return*/, reject(new StockTakingsMetaFailed(undefined, { status: response.status }))];
                        }
                        if (!response.data.results[0]) {
                            return [2 /*return*/, reject(new StockTakingsMetaFailed(undefined, { status: response.status }))];
                        }
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        err_1 = _a.sent();
                        return [2 /*return*/, reject(new StockTakingsMetaFailed(undefined, { error: err_1 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    StockTakings.baseEndpoint = '/api/v0/stock_takings';
    return StockTakings;
}(base_1.ThBaseHandler));
exports.StockTakings = StockTakings;
var StockTakingsFetchFailed = /** @class */ (function (_super) {
    __extends(StockTakingsFetchFailed, _super);
    function StockTakingsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch stock takings'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StockTakingsFetchFailed';
        Object.setPrototypeOf(_this, StockTakingsFetchFailed.prototype);
        return _this;
    }
    return StockTakingsFetchFailed;
}(errors_1.BaseError));
exports.StockTakingsFetchFailed = StockTakingsFetchFailed;
var StockTakingsFetchOneFailed = /** @class */ (function (_super) {
    __extends(StockTakingsFetchOneFailed, _super);
    function StockTakingsFetchOneFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch one stock taking'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StockTakingsFetchOneFailed';
        Object.setPrototypeOf(_this, StockTakingsFetchOneFailed.prototype);
        return _this;
    }
    return StockTakingsFetchOneFailed;
}(errors_1.BaseError));
exports.StockTakingsFetchOneFailed = StockTakingsFetchOneFailed;
var StockTakingsUpdateFailed = /** @class */ (function (_super) {
    __extends(StockTakingsUpdateFailed, _super);
    function StockTakingsUpdateFailed(message, properties) {
        if (message === void 0) { message = 'Could not update stock taking'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StockTakingsUpdateFailed';
        Object.setPrototypeOf(_this, StockTakingsUpdateFailed.prototype);
        return _this;
    }
    return StockTakingsUpdateFailed;
}(errors_1.BaseError));
exports.StockTakingsUpdateFailed = StockTakingsUpdateFailed;
var StockTakingsCreationFailed = /** @class */ (function (_super) {
    __extends(StockTakingsCreationFailed, _super);
    function StockTakingsCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create stock taking'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StockTakingsCreationFailed';
        Object.setPrototypeOf(_this, StockTakingsCreationFailed.prototype);
        return _this;
    }
    return StockTakingsCreationFailed;
}(errors_1.BaseError));
exports.StockTakingsCreationFailed = StockTakingsCreationFailed;
var StockTakingsDeleteFailed = /** @class */ (function (_super) {
    __extends(StockTakingsDeleteFailed, _super);
    function StockTakingsDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete stock taking'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StockTakingsDeleteFailed';
        Object.setPrototypeOf(_this, StockTakingsDeleteFailed.prototype);
        return _this;
    }
    return StockTakingsDeleteFailed;
}(errors_1.BaseError));
exports.StockTakingsDeleteFailed = StockTakingsDeleteFailed;
var StockTakingsMetaFailed = /** @class */ (function (_super) {
    __extends(StockTakingsMetaFailed, _super);
    function StockTakingsMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not get meta of stock takings'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StockTakingsMetaFailed';
        Object.setPrototypeOf(_this, StockTakingsMetaFailed.prototype);
        return _this;
    }
    return StockTakingsMetaFailed;
}(errors_1.BaseError));
exports.StockTakingsMetaFailed = StockTakingsMetaFailed;
//# sourceMappingURL=stock_takings.js.map