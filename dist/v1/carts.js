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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var qs_1 = __importDefault(require("qs"));
var errors_1 = require("../errors");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var Carts = /** @class */ (function (_super) {
    __extends(Carts, _super);
    function Carts(options, http) {
        var _this = _super.call(this, http, { endpoint: Carts.baseEndpoint, base: options.base || 'https://api.tillhub.com' }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Carts.baseEndpoint;
        _this.options.base = _this.options.base || 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    Carts.prototype.create = function (cart, query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var base, uri, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().post(uri, cart)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2 /*return*/, reject(new CartsCreateFailed(undefined, { status: response.status }))];
                        }
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count },
                                errors: response.data.errors || []
                            })];
                    case 3:
                        error_1 = _a.sent();
                        return [2 /*return*/, reject(new CartsCreateFailed(undefined, { error: error_1 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Carts.prototype.getAll = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var next, uri, response_1, error_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = void 0;
                        if (options && options.uri) {
                            uri = options.uri;
                        }
                        else {
                            uri = "" + this.options.base + this.endpoint + "/" + this.options.user + (options && options.query ? "?" + qs_1.default.stringify(options.query) : '');
                        }
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response_1 = _a.sent();
                        if (response_1.status !== 200) {
                            return [2 /*return*/, reject(new CartsFetchFailed(undefined, { status: response_1.status }))];
                        }
                        if (response_1.data.cursor && response_1.data.cursor.next) {
                            next = function () { return _this.getAll({ uri: response_1.data.cursor.next }); };
                        }
                        return [2 /*return*/, resolve({
                                data: response_1.data.results,
                                metadata: { count: response_1.data.count, cursor: response_1.data.cursor },
                                next: next
                            })];
                    case 2:
                        error_2 = _a.sent();
                        return [2 /*return*/, reject(new CartsFetchFailed(undefined, { error: error_2 }))];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Carts.prototype.get = function (cartId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + cartId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2 /*return*/, reject(new CartFetchFailed(undefined, { status: response.status }))];
                        }
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_3 = _a.sent();
                        return [2 /*return*/, reject(new CartFetchFailed(undefined, { error: error_3 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Carts.prototype.meta = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/meta";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2 /*return*/, reject(new CartsMetaFailed(undefined, { status: response.status }))];
                        }
                        if (!response.data.results[0]) {
                            return [2 /*return*/, reject(new CartsMetaFailed('could not get cart metadata unexpectedly', {
                                    status: response.status
                                }))];
                        }
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_4 = _a.sent();
                        return [2 /*return*/, reject(new CartsMetaFailed(undefined, { error: error_4 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Carts.prototype.put = function (cartId, cart) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + cartId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().put(uri, cart)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2 /*return*/, reject(new CartsUpdateFailed(undefined, { status: response.status }))];
                        }
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_5 = _a.sent();
                        return [2 /*return*/, reject(new CartsUpdateFailed(undefined, { error: error_5 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Carts.prototype.delete = function (cartId, deleteOptions) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = void 0;
                        if (deleteOptions) {
                            uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + cartId + "?" + qs_1.default.stringify(deleteOptions);
                        }
                        else {
                            uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + cartId;
                        }
                        return [4 /*yield*/, this.http.getClient().delete(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2 /*return*/, reject(new CartsDeleteFailed(undefined, { status: response.status }))];
                        }
                        return [2 /*return*/, resolve({
                                msg: response.data.msg
                            })];
                    case 2:
                        error_6 = _a.sent();
                        return [2 /*return*/, reject(new CartsDeleteFailed(undefined, { error: error_6 }))];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Carts.prototype.search = function (searchTerm) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/search?q=" + searchTerm;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2 /*return*/, reject(new CartsSearchFailed(undefined, { status: response.status }))];
                        }
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_7 = _a.sent();
                        return [2 /*return*/, reject(new CartsSearchFailed(undefined, { error: error_7 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Carts.baseEndpoint = '/api/v1/carts';
    return Carts;
}(base_1.ThBaseHandler));
exports.Carts = Carts;
var CartFetchFailed = /** @class */ (function (_super) {
    __extends(CartFetchFailed, _super);
    function CartFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch cart'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CartFetchFailed';
        return _this;
    }
    return CartFetchFailed;
}(errors_1.BaseError));
exports.CartFetchFailed = CartFetchFailed;
var CartsSearchFailed = /** @class */ (function (_super) {
    __extends(CartsSearchFailed, _super);
    function CartsSearchFailed(message, properties) {
        if (message === void 0) { message = 'Could complete carts search'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CartsSearchFailed';
        return _this;
    }
    return CartsSearchFailed;
}(errors_1.BaseError));
exports.CartsSearchFailed = CartsSearchFailed;
var CartsDeleteFailed = /** @class */ (function (_super) {
    __extends(CartsDeleteFailed, _super);
    function CartsDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could delete cart'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CartsDeleteFailed';
        return _this;
    }
    return CartsDeleteFailed;
}(errors_1.BaseError));
exports.CartsDeleteFailed = CartsDeleteFailed;
var CartsUpdateFailed = /** @class */ (function (_super) {
    __extends(CartsUpdateFailed, _super);
    function CartsUpdateFailed(message, properties) {
        if (message === void 0) { message = 'Could update cart'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CartsUpdateFailed';
        return _this;
    }
    return CartsUpdateFailed;
}(errors_1.BaseError));
exports.CartsUpdateFailed = CartsUpdateFailed;
var CartsMetaFailed = /** @class */ (function (_super) {
    __extends(CartsMetaFailed, _super);
    function CartsMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could fetch carts metadata'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CartsMetaFailed';
        return _this;
    }
    return CartsMetaFailed;
}(errors_1.BaseError));
exports.CartsMetaFailed = CartsMetaFailed;
var CartsFetchFailed = /** @class */ (function (_super) {
    __extends(CartsFetchFailed, _super);
    function CartsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could fetch carts'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CartsFetchFailed';
        return _this;
    }
    return CartsFetchFailed;
}(errors_1.BaseError));
exports.CartsFetchFailed = CartsFetchFailed;
var CartsCreateFailed = /** @class */ (function (_super) {
    __extends(CartsCreateFailed, _super);
    function CartsCreateFailed(message, properties) {
        if (message === void 0) { message = 'Could create cart'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CartsCreateFailed';
        return _this;
    }
    return CartsCreateFailed;
}(errors_1.BaseError));
exports.CartsCreateFailed = CartsCreateFailed;
//# sourceMappingURL=carts.js.map