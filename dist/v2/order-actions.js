"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChargeTransactionFailed = exports.AuthorizeTransactionFailed = exports.CreateBasketFailed = exports.OrderCaptureFailed = exports.OrderCancelFailed = exports.OrderRefundFailed = exports.OrderActions = void 0;
var tslib_1 = require("tslib");
var errors_1 = require("../errors");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var OrderActions = (function (_super) {
    tslib_1.__extends(OrderActions, _super);
    function OrderActions(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: OrderActions.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = OrderActions.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    OrderActions.prototype.orderRefund = function (orderId, payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + orderId + "/charge/cancel");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, payload)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new OrderRefundFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg,
                                status: response.status
                            }];
                    case 3:
                        error_1 = _a.sent();
                        throw new OrderRefundFailed(error_1.message, { error: error_1 });
                    case 4: return [2];
                }
            });
        });
    };
    OrderActions.prototype.orderCancel = function (orderId, payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + orderId + "/authorize/cancel");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, payload)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new OrderCancelFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg,
                                status: response.status
                            }];
                    case 3:
                        error_2 = _a.sent();
                        throw new OrderCancelFailed(error_2.message, { error: error_2 });
                    case 4: return [2];
                }
            });
        });
    };
    OrderActions.prototype.orderCapture = function (orderId, payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + orderId + "/authorize/charge");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, payload)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new OrderCaptureFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg,
                                status: response.status
                            }];
                    case 3:
                        error_3 = _a.sent();
                        throw new OrderCaptureFailed(error_3.message, { error: error_3 });
                    case 4: return [2];
                }
            });
        });
    };
    OrderActions.prototype.createBasket = function (keypairId, basket) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base + "/baskets");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, { keypairId: keypairId, payload: basket })];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results[0]
                            }];
                    case 3:
                        error_4 = _a.sent();
                        throw new CreateBasketFailed(error_4.message, { error: error_4 });
                    case 4: return [2];
                }
            });
        });
    };
    OrderActions.prototype.authorize = function (keypairId, transaction) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base + "/authorize");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, { keypairId: keypairId, payload: transaction })];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results[0]
                            }];
                    case 3:
                        error_5 = _a.sent();
                        throw new AuthorizeTransactionFailed(error_5.message, { error: error_5 });
                    case 4: return [2];
                }
            });
        });
    };
    OrderActions.prototype.charge = function (keypairId, transaction) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_6;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base + "/charge");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, { keypairId: keypairId, payload: transaction })];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results[0]
                            }];
                    case 3:
                        error_6 = _a.sent();
                        throw new ChargeTransactionFailed(error_6.message, { error: error_6 });
                    case 4: return [2];
                }
            });
        });
    };
    OrderActions.baseEndpoint = '/api/v2/orders';
    return OrderActions;
}(base_1.ThBaseHandler));
exports.OrderActions = OrderActions;
var OrderRefundFailed = (function (_super) {
    tslib_1.__extends(OrderRefundFailed, _super);
    function OrderRefundFailed(message, properties) {
        if (message === void 0) { message = 'Could not refund order'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'OrderRefundFailed';
        Object.setPrototypeOf(_this, OrderRefundFailed.prototype);
        return _this;
    }
    return OrderRefundFailed;
}(errors_1.BaseError));
exports.OrderRefundFailed = OrderRefundFailed;
var OrderCancelFailed = (function (_super) {
    tslib_1.__extends(OrderCancelFailed, _super);
    function OrderCancelFailed(message, properties) {
        if (message === void 0) { message = 'Could not cancel authorize for order'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'OrderCancelFailed';
        Object.setPrototypeOf(_this, OrderCancelFailed.prototype);
        return _this;
    }
    return OrderCancelFailed;
}(errors_1.BaseError));
exports.OrderCancelFailed = OrderCancelFailed;
var OrderCaptureFailed = (function (_super) {
    tslib_1.__extends(OrderCaptureFailed, _super);
    function OrderCaptureFailed(message, properties) {
        if (message === void 0) { message = 'Could not authorize charge for order'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'OrderCaptureFailed';
        Object.setPrototypeOf(_this, OrderCaptureFailed.prototype);
        return _this;
    }
    return OrderCaptureFailed;
}(errors_1.BaseError));
exports.OrderCaptureFailed = OrderCaptureFailed;
var CreateBasketFailed = (function (_super) {
    tslib_1.__extends(CreateBasketFailed, _super);
    function CreateBasketFailed(message, properties) {
        if (message === void 0) { message = 'Could not create basket'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CreateBasketFailed';
        Object.setPrototypeOf(_this, CreateBasketFailed.prototype);
        return _this;
    }
    return CreateBasketFailed;
}(errors_1.BaseError));
exports.CreateBasketFailed = CreateBasketFailed;
var AuthorizeTransactionFailed = (function (_super) {
    tslib_1.__extends(AuthorizeTransactionFailed, _super);
    function AuthorizeTransactionFailed(message, properties) {
        if (message === void 0) { message = 'Could not authorize transaction'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AuthorizeTransactionFailed';
        Object.setPrototypeOf(_this, AuthorizeTransactionFailed.prototype);
        return _this;
    }
    return AuthorizeTransactionFailed;
}(errors_1.BaseError));
exports.AuthorizeTransactionFailed = AuthorizeTransactionFailed;
var ChargeTransactionFailed = (function (_super) {
    tslib_1.__extends(ChargeTransactionFailed, _super);
    function ChargeTransactionFailed(message, properties) {
        if (message === void 0) { message = 'Could not charge transaction'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ChargeTransactionFailed';
        Object.setPrototypeOf(_this, ChargeTransactionFailed.prototype);
        return _this;
    }
    return ChargeTransactionFailed;
}(errors_1.BaseError));
exports.ChargeTransactionFailed = ChargeTransactionFailed;
//# sourceMappingURL=order-actions.js.map