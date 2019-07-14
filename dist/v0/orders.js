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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var qs_1 = __importDefault(require("qs"));
var errors = __importStar(require("../errors"));
var base_1 = require("../base");
var allowedStatuses = [200, 204];
var Orders = /** @class */ (function (_super) {
    __extends(Orders, _super);
    function Orders(options, http) {
        var _this = _super.call(this, http, { endpoint: Orders.baseEndpoint, base: options.base || 'https://api.tillhub.com' }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Orders.baseEndpoint;
        _this.options.base = _this.options.base || 'https://api.tillhub.com';
        return _this;
    }
    Orders.prototype.getAll = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = void 0;
                        if (query && query.uri) {
                            uri = query.uri;
                        }
                        else {
                            uri = "" + this.options.base + this.endpoint + "/" + this.options.user;
                        }
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        response.status !== 200 && reject(new errors.OrdersFetchFailed());
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 2:
                        err_1 = _a.sent();
                        return [2 /*return*/, reject(new errors.OrdersFetchFailed())];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Orders.prototype.create = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var orderId, values, uri, response, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orderId = options.orderId, values = options.values;
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + orderId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().post(uri, values)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 && reject(new errors.OrdersCreateFailed());
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        err_2 = _a.sent();
                        return [2 /*return*/, reject(new errors.OrdersCreateFailed())];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Orders.prototype.update = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var orderId, values, uri, response, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orderId = options.orderId, values = options.values;
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + orderId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().put(uri, values)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 && reject(new errors.OrdersUpdateFailed());
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        err_3 = _a.sent();
                        return [2 /*return*/, reject(new errors.OrdersUpdateFailed())];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Orders.prototype.getOrderItems = function (orderId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + orderId + "/order_items";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 && reject(new errors.OrderItemsFetchFailed());
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        err_4 = _a.sent();
                        return [2 /*return*/, reject(new errors.OrderItemsFetchFailed())];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Orders.prototype.deleteOrderItems = function (query) {
        var _this = this;
        var route;
        if (query.itemId) {
            route = "/" + query.itemId;
        }
        else {
            route = "?" + qs_1.default.stringify(query);
        }
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/order_items" + route;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().delete(uri)];
                    case 2:
                        response = _a.sent();
                        allowedStatuses.includes(response.status) === false &&
                            reject(new errors.OrderItemsDeleteFailed());
                        return [2 /*return*/, resolve({ msg: response.data.msg })];
                    case 3:
                        err_5 = _a.sent();
                        return [2 /*return*/, reject(new errors.OrderItemsDeleteFailed())];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Orders.prototype.createOrderItems = function (body) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/order_items";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().post(uri, body)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 && reject(new errors.OrderItemsCreateFailed());
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        err_6 = _a.sent();
                        return [2 /*return*/, reject(new errors.OrderItemsCreateFailed())];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Orders.prototype.updateOrderItems = function (body) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/order_items";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().put(uri, body)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 && reject(new errors.OrderItemsUpdateFailed());
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        err_7 = _a.sent();
                        return [2 /*return*/, reject(new errors.OrderItemsUpdateFailed())];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Orders.prototype.updateOrderItem = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var item, itemId, uri, response, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        item = query.item, itemId = query.itemId;
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/order_items/" + itemId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().put(uri, item)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 && reject(new errors.OrderItemUpdateFailed());
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        err_8 = _a.sent();
                        return [2 /*return*/, reject(new errors.OrderItemUpdateFailed())];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Orders.prototype.getIncomingOrders = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, err_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = void 0;
                        if (query && query.uri) {
                            uri = query.uri;
                        }
                        else {
                            uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "?embed=location&direction=incoming" + (query ? "" + qs_1.default.stringify(query) : '');
                        }
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        response.status !== 200 && reject(new errors.IncomingOrdersFetchFailed());
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 2:
                        err_9 = _a.sent();
                        return [2 /*return*/, reject(new errors.IncomingOrdersFetchFailed())];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Orders.prototype.getOutgoingOrders = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, err_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = void 0;
                        if (query && query.uri) {
                            uri = query.uri;
                        }
                        else {
                            uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "?embed=location&direction=outgoing" + (query ? "" + qs_1.default.stringify(query) : '');
                        }
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        response.status !== 200 && reject(new errors.OutgoingOrdersFetchFailed());
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 2:
                        err_10 = _a.sent();
                        return [2 /*return*/, reject(new errors.OutgoingOrdersFetchFailed())];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Orders.prototype.getOrderSuggestions = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, err_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = void 0;
                        if (query && query.uri) {
                            uri = query.uri;
                        }
                        else {
                            uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/suggestions";
                        }
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        response.status !== 200 && reject(new errors.OrderSuggestionsFetchFailed());
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 2:
                        err_11 = _a.sent();
                        return [2 /*return*/, reject(new errors.OrderSuggestionsFetchFailed())];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Orders.prototype.getHistoricOrderItems = function (orderId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, err_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + orderId + "/order_items";
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        response.status !== 200 && reject(new errors.HistoricOrderItemsFetchFailed());
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 2:
                        err_12 = _a.sent();
                        return [2 /*return*/, reject(new errors.HistoricOrderItemsFetchFailed())];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Orders.prototype.bookStock = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var orderId, body, uri, response, err_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orderId = query.orderId, body = query.body;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        uri = void 0;
                        if (query && query.uri) {
                            uri = query.uri;
                        }
                        else {
                            uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/order_items/" + orderId + "/book_stock";
                        }
                        return [4 /*yield*/, this.http.getClient().post(uri, body)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 && reject(new errors.BookStockFailed());
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        err_13 = _a.sent();
                        return [2 /*return*/, reject(new errors.BookStockFailed())];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Orders.prototype.getOpenOrder = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, err_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = void 0;
                        if (query && query.uri) {
                            uri = query.uri;
                        }
                        else {
                            uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/open";
                        }
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        response.status !== 200 && reject(new errors.OpenOrderFetchFailed());
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 2:
                        err_14 = _a.sent();
                        return [2 /*return*/, reject(new errors.OpenOrderFetchFailed())];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Orders.baseEndpoint = '/api/v0/orders';
    return Orders;
}(base_1.ThBaseHandler));
exports.Orders = Orders;
//# sourceMappingURL=orders.js.map