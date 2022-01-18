"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders = void 0;
var tslib_1 = require("tslib");
var errors = tslib_1.__importStar(require("../errors"));
var base_1 = require("../base");
var uri_helper_1 = require("../uri-helper");
var allowedStatuses = [200, 204];
var Orders = (function (_super) {
    tslib_1.__extends(Orders, _super);
    function Orders(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, { endpoint: Orders.baseEndpoint, base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com' }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Orders.baseEndpoint;
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        return _this;
    }
    Orders.prototype.getAll = function (query) {
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
                        if (response.status !== 200)
                            throw new errors.OrdersFetchFailed();
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_1 = _a.sent();
                        throw new errors.OrdersFetchFailed();
                    case 3: return [2];
                }
            });
        });
    };
    Orders.prototype.create = function (options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var orderId, values, uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orderId = options.orderId, values = options.values;
                        uri = this.uriHelper.generateBaseUri("/" + orderId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, values)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new errors.OrdersCreateFailed();
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_2 = _a.sent();
                        throw new errors.OrdersCreateFailed();
                    case 4: return [2];
                }
            });
        });
    };
    Orders.prototype.update = function (options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var orderId, values, uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orderId = options.orderId, values = options.values;
                        uri = this.uriHelper.generateBaseUri("/" + orderId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri, values)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new errors.OrdersUpdateFailed();
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_3 = _a.sent();
                        throw new errors.OrdersUpdateFailed();
                    case 4: return [2];
                }
            });
        });
    };
    Orders.prototype.getOrderItems = function (orderId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + orderId + "/order_items");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new errors.OrderItemsFetchFailed();
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_4 = _a.sent();
                        throw new errors.OrderItemsFetchFailed();
                    case 4: return [2];
                }
            });
        });
    };
    Orders.prototype.deleteOrderItems = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, base, response, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (query.itemId) {
                            uri = this.uriHelper.generateBaseUri("/order_items/" + query.itemId);
                        }
                        else {
                            base = this.uriHelper.generateBaseUri('/order_items');
                            uri = this.uriHelper.generateUriWithQuery(base, query);
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().delete(uri)];
                    case 2:
                        response = _a.sent();
                        if (!allowedStatuses.includes(response.status)) {
                            throw new errors.OrderItemsDeleteFailed();
                        }
                        return [2, { msg: response.data.msg }];
                    case 3:
                        error_5 = _a.sent();
                        throw new errors.OrderItemsDeleteFailed();
                    case 4: return [2];
                }
            });
        });
    };
    Orders.prototype.createOrderItems = function (body) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_6;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri('/order_items');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, body)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new errors.OrderItemsCreateFailed();
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_6 = _a.sent();
                        throw new errors.OrderItemsCreateFailed();
                    case 4: return [2];
                }
            });
        });
    };
    Orders.prototype.updateOrderItems = function (body) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_7;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri('/order_items');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri, body)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new errors.OrderItemsUpdateFailed();
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_7 = _a.sent();
                        throw new errors.OrderItemsUpdateFailed();
                    case 4: return [2];
                }
            });
        });
    };
    Orders.prototype.updateOrderItem = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var item, itemId, uri, response, error_8;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        item = query.item, itemId = query.itemId;
                        uri = this.uriHelper.generateBaseUri("/order_items/" + itemId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri, item)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new errors.OrderItemUpdateFailed();
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_8 = _a.sent();
                        throw new errors.OrderItemUpdateFailed();
                    case 4: return [2];
                }
            });
        });
    };
    Orders.prototype.getIncomingOrders = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var extendedQuery, base, uri, response, error_9;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        extendedQuery = tslib_1.__assign(tslib_1.__assign({}, query), { embed: 'location', direction: 'incoming' });
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, extendedQuery);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new errors.IncomingOrdersFetchFailed();
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_9 = _a.sent();
                        throw new errors.IncomingOrdersFetchFailed();
                    case 3: return [2];
                }
            });
        });
    };
    Orders.prototype.getOutgoingOrders = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var extendedQuery, base, uri, response, error_10;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        extendedQuery = tslib_1.__assign(tslib_1.__assign({}, query), { embed: 'location', direction: 'outgoing' });
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, extendedQuery);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new errors.OutgoingOrdersFetchFailed();
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_10 = _a.sent();
                        throw new errors.OutgoingOrdersFetchFailed();
                    case 3: return [2];
                }
            });
        });
    };
    Orders.prototype.getOrderSuggestions = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_11;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/suggestions');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new errors.OrderSuggestionsFetchFailed();
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_11 = _a.sent();
                        throw new errors.OrderSuggestionsFetchFailed();
                    case 3: return [2];
                }
            });
        });
    };
    Orders.prototype.getHistoricOrderItems = function (orderId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_12;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri("/" + orderId + "/order_items");
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new errors.HistoricOrderItemsFetchFailed();
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_12 = _a.sent();
                        throw new errors.HistoricOrderItemsFetchFailed();
                    case 3: return [2];
                }
            });
        });
    };
    Orders.prototype.bookStock = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var orderId, body, base, uri, response, error_13;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orderId = query.orderId, body = query.body;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        base = this.uriHelper.generateBaseUri("/order_items/" + orderId + "/book_stock");
                        uri = this.uriHelper.generateUriWithQuery(base, { uri: query === null || query === void 0 ? void 0 : query.uri });
                        return [4, this.http.getClient().post(uri, body)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new errors.BookStockFailed();
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_13 = _a.sent();
                        throw new errors.BookStockFailed();
                    case 4: return [2];
                }
            });
        });
    };
    Orders.prototype.getOpenOrder = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_14;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/open');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new errors.OpenOrderFetchFailed();
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_14 = _a.sent();
                        throw new errors.OpenOrderFetchFailed();
                    case 3: return [2];
                }
            });
        });
    };
    Orders.baseEndpoint = '/api/v0/orders';
    return Orders;
}(base_1.ThBaseHandler));
exports.Orders = Orders;
//# sourceMappingURL=orders.js.map