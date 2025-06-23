"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderFetchFailed = exports.OrdersFetchMetaFailed = exports.OrdersFetchFailed = exports.Orders = void 0;
var tslib_1 = require("tslib");
var errors_1 = require("../errors");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var Orders = (function (_super) {
    tslib_1.__extends(Orders, _super);
    function Orders(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: Orders.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Orders.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    Orders.prototype.getAll = function (query) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var next, base, uri, response_1, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response_1 = _b.sent();
                        if (response_1.status !== 200) {
                            throw new OrdersFetchFailed(undefined, { status: response_1.status });
                        }
                        if ((_a = response_1.data.cursors) === null || _a === void 0 ? void 0 : _a.after) {
                            next = function () { return _this.getAll({ uri: response_1.data.cursors.after }); };
                        }
                        return [2, {
                                data: response_1.data.results,
                                metadata: { cursor: response_1.data.cursors },
                                next: next
                            }];
                    case 3:
                        error_1 = _b.sent();
                        throw new OrdersFetchFailed(error_1.message, { error: error_1 });
                    case 4: return [2];
                }
            });
        });
    };
    Orders.prototype.meta = function (query) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_2;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base + "/meta", query);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _b.sent();
                        if (response.status !== 200)
                            throw new OrdersFetchMetaFailed();
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: ((_a = response.data.results[0]) === null || _a === void 0 ? void 0 : _a.count) || 0 }
                            }];
                    case 3:
                        error_2 = _b.sent();
                        throw new OrdersFetchMetaFailed(error_2.message, { error: error_2 });
                    case 4: return [2];
                }
            });
        });
    };
    Orders.prototype.get = function (orderId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri("/" + orderId);
                        uri = this.uriHelper.generateUriWithQuery(base);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new OrderFetchFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_3 = _a.sent();
                        throw new OrderFetchFailed(error_3.message, { error: error_3 });
                    case 4: return [2];
                }
            });
        });
    };
    Orders.baseEndpoint = '/api/v2/orders';
    return Orders;
}(base_1.ThBaseHandler));
exports.Orders = Orders;
var OrdersFetchFailed = (function (_super) {
    tslib_1.__extends(OrdersFetchFailed, _super);
    function OrdersFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch orders'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'OrdersFetchFailed';
        Object.setPrototypeOf(_this, OrdersFetchFailed.prototype);
        return _this;
    }
    return OrdersFetchFailed;
}(errors_1.BaseError));
exports.OrdersFetchFailed = OrdersFetchFailed;
var OrdersFetchMetaFailed = (function (_super) {
    tslib_1.__extends(OrdersFetchMetaFailed, _super);
    function OrdersFetchMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch meta data for orders'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'OrdersFetchMetaFailed';
        Object.setPrototypeOf(_this, OrdersFetchMetaFailed.prototype);
        return _this;
    }
    return OrdersFetchMetaFailed;
}(errors_1.BaseError));
exports.OrdersFetchMetaFailed = OrdersFetchMetaFailed;
var OrderFetchFailed = (function (_super) {
    tslib_1.__extends(OrderFetchFailed, _super);
    function OrderFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch order'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'OrderFetchFailed';
        Object.setPrototypeOf(_this, OrderFetchFailed.prototype);
        return _this;
    }
    return OrderFetchFailed;
}(errors_1.BaseError));
exports.OrderFetchFailed = OrderFetchFailed;
//# sourceMappingURL=orders.js.map