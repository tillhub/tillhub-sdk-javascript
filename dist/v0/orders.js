"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders = void 0;
var tslib_1 = require("tslib");
var qs_1 = tslib_1.__importDefault(require("qs"));
var errors = tslib_1.__importStar(require("../errors"));
var base_1 = require("../base");
var allowedStatuses = [200, 204];
var Orders = (function (_super) {
    tslib_1.__extends(Orders, _super);
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
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, err_1;
            return tslib_1.__generator(this, function (_a) {
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
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        response.status !== 200 && reject(new errors.OrdersFetchFailed());
                        return [2, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 2:
                        err_1 = _a.sent();
                        return [2, reject(new errors.OrdersFetchFailed())];
                    case 3: return [2];
                }
            });
        }); });
    };
    Orders.prototype.create = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var orderId, values, uri, response, err_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orderId = options.orderId, values = options.values;
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + orderId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, values)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 && reject(new errors.OrdersCreateFailed());
                        return [2, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        err_2 = _a.sent();
                        return [2, reject(new errors.OrdersCreateFailed())];
                    case 4: return [2];
                }
            });
        }); });
    };
    Orders.prototype.update = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var orderId, values, uri, response, err_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orderId = options.orderId, values = options.values;
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + orderId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri, values)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 && reject(new errors.OrdersUpdateFailed());
                        return [2, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        err_3 = _a.sent();
                        return [2, reject(new errors.OrdersUpdateFailed())];
                    case 4: return [2];
                }
            });
        }); });
    };
    Orders.prototype.getOrderItems = function (orderId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, err_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + orderId + "/order_items";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 && reject(new errors.OrderItemsFetchFailed());
                        return [2, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        err_4 = _a.sent();
                        return [2, reject(new errors.OrderItemsFetchFailed())];
                    case 4: return [2];
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
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, err_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/order_items" + route;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().delete(uri)];
                    case 2:
                        response = _a.sent();
                        allowedStatuses.includes(response.status) === false &&
                            reject(new errors.OrderItemsDeleteFailed());
                        return [2, resolve({ msg: response.data.msg })];
                    case 3:
                        err_5 = _a.sent();
                        return [2, reject(new errors.OrderItemsDeleteFailed())];
                    case 4: return [2];
                }
            });
        }); });
    };
    Orders.prototype.createOrderItems = function (body) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, err_6;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/order_items";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, body)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 && reject(new errors.OrderItemsCreateFailed());
                        return [2, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        err_6 = _a.sent();
                        return [2, reject(new errors.OrderItemsCreateFailed())];
                    case 4: return [2];
                }
            });
        }); });
    };
    Orders.prototype.updateOrderItems = function (body) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, err_7;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/order_items";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri, body)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 && reject(new errors.OrderItemsUpdateFailed());
                        return [2, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        err_7 = _a.sent();
                        return [2, reject(new errors.OrderItemsUpdateFailed())];
                    case 4: return [2];
                }
            });
        }); });
    };
    Orders.prototype.updateOrderItem = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var item, itemId, uri, response, err_8;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        item = query.item, itemId = query.itemId;
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/order_items/" + itemId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri, item)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 && reject(new errors.OrderItemUpdateFailed());
                        return [2, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        err_8 = _a.sent();
                        return [2, reject(new errors.OrderItemUpdateFailed())];
                    case 4: return [2];
                }
            });
        }); });
    };
    Orders.prototype.getIncomingOrders = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, err_9;
            return tslib_1.__generator(this, function (_a) {
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
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        response.status !== 200 && reject(new errors.IncomingOrdersFetchFailed());
                        return [2, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 2:
                        err_9 = _a.sent();
                        return [2, reject(new errors.IncomingOrdersFetchFailed())];
                    case 3: return [2];
                }
            });
        }); });
    };
    Orders.prototype.getOutgoingOrders = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, err_10;
            return tslib_1.__generator(this, function (_a) {
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
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        response.status !== 200 && reject(new errors.OutgoingOrdersFetchFailed());
                        return [2, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 2:
                        err_10 = _a.sent();
                        return [2, reject(new errors.OutgoingOrdersFetchFailed())];
                    case 3: return [2];
                }
            });
        }); });
    };
    Orders.prototype.getOrderSuggestions = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, err_11;
            return tslib_1.__generator(this, function (_a) {
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
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        response.status !== 200 && reject(new errors.OrderSuggestionsFetchFailed());
                        return [2, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 2:
                        err_11 = _a.sent();
                        return [2, reject(new errors.OrderSuggestionsFetchFailed())];
                    case 3: return [2];
                }
            });
        }); });
    };
    Orders.prototype.getHistoricOrderItems = function (orderId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, err_12;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + orderId + "/order_items";
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        response.status !== 200 && reject(new errors.HistoricOrderItemsFetchFailed());
                        return [2, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 2:
                        err_12 = _a.sent();
                        return [2, reject(new errors.HistoricOrderItemsFetchFailed())];
                    case 3: return [2];
                }
            });
        }); });
    };
    Orders.prototype.bookStock = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var orderId, body, uri, response, err_13;
            return tslib_1.__generator(this, function (_a) {
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
                        return [4, this.http.getClient().post(uri, body)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 && reject(new errors.BookStockFailed());
                        return [2, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        err_13 = _a.sent();
                        return [2, reject(new errors.BookStockFailed())];
                    case 4: return [2];
                }
            });
        }); });
    };
    Orders.prototype.getOpenOrder = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, err_14;
            return tslib_1.__generator(this, function (_a) {
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
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        response.status !== 200 && reject(new errors.OpenOrderFetchFailed());
                        return [2, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 2:
                        err_14 = _a.sent();
                        return [2, reject(new errors.OpenOrderFetchFailed())];
                    case 3: return [2];
                }
            });
        }); });
    };
    Orders.baseEndpoint = '/api/v0/orders';
    return Orders;
}(base_1.ThBaseHandler));
exports.Orders = Orders;
//# sourceMappingURL=orders.js.map