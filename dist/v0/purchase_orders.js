"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseOrdersBulkDeleteProductsFailed = exports.PurchaseOrdersBulkAddProductsFailed = exports.PurchaseOrdersUpdateFailed = exports.PurchaseOrdersCreationFailed = exports.PurchaseOrdersGetFailed = exports.PurchaseOrders = void 0;
var tslib_1 = require("tslib");
var errors_1 = require("../errors");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var PurchaseOrders = (function (_super) {
    tslib_1.__extends(PurchaseOrders, _super);
    function PurchaseOrders(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: PurchaseOrders.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = PurchaseOrders.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    PurchaseOrders.prototype.get = function (purchaseOrderId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri("/" + purchaseOrderId);
                        uri = this.uriHelper.generateUriWithQuery(base);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new PurchaseOrdersGetFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg
                            }];
                    case 3:
                        error_1 = _a.sent();
                        throw new PurchaseOrdersGetFailed(error_1.message, { error: error_1 });
                    case 4: return [2];
                }
            });
        });
    };
    PurchaseOrders.prototype.create = function (purchaseOrder) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri('/products');
                        uri = this.uriHelper.generateUriWithQuery(base);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, purchaseOrder)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new PurchaseOrdersCreationFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg
                            }];
                    case 3:
                        error_2 = _a.sent();
                        throw new PurchaseOrdersCreationFailed(error_2.message, { error: error_2 });
                    case 4: return [2];
                }
            });
        });
    };
    PurchaseOrders.prototype.put = function (purchaseOrderId, purchaseOrder) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri("/" + purchaseOrderId + "/products");
                        uri = this.uriHelper.generateUriWithQuery(base);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri, purchaseOrder)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new PurchaseOrdersUpdateFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg
                            }];
                    case 3:
                        error_3 = _a.sent();
                        throw new PurchaseOrdersUpdateFailed(error_3.message, { error: error_3 });
                    case 4: return [2];
                }
            });
        });
    };
    PurchaseOrders.prototype.bulkAddProducts = function (purchaseOrderId, purchaseOrder) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri("/" + purchaseOrderId + "/products");
                        uri = this.uriHelper.generateUriWithQuery(base);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, purchaseOrder)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new PurchaseOrdersBulkAddProductsFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg
                            }];
                    case 3:
                        error_4 = _a.sent();
                        throw new PurchaseOrdersBulkAddProductsFailed(error_4.message, { error: error_4 });
                    case 4: return [2];
                }
            });
        });
    };
    PurchaseOrders.prototype.bulkDeleteProducts = function (purchaseOrderId, purchaseOrder) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri("/" + purchaseOrderId + "/products");
                        uri = this.uriHelper.generateUriWithQuery(base);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().delete(uri, {
                                data: purchaseOrder
                            })];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new PurchaseOrdersBulkDeleteProductsFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg
                            }];
                    case 3:
                        error_5 = _a.sent();
                        throw new PurchaseOrdersBulkDeleteProductsFailed(error_5.message, { error: error_5 });
                    case 4: return [2];
                }
            });
        });
    };
    PurchaseOrders.baseEndpoint = '/api/v0/purchase-orders';
    return PurchaseOrders;
}(base_1.ThBaseHandler));
exports.PurchaseOrders = PurchaseOrders;
var PurchaseOrdersGetFailed = (function (_super) {
    tslib_1.__extends(PurchaseOrdersGetFailed, _super);
    function PurchaseOrdersGetFailed(message, properties) {
        if (message === void 0) { message = 'Could get purchase order'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PurchaseOrdersGetFailed';
        Object.setPrototypeOf(_this, PurchaseOrdersGetFailed.prototype);
        return _this;
    }
    return PurchaseOrdersGetFailed;
}(errors_1.BaseError));
exports.PurchaseOrdersGetFailed = PurchaseOrdersGetFailed;
var PurchaseOrdersCreationFailed = (function (_super) {
    tslib_1.__extends(PurchaseOrdersCreationFailed, _super);
    function PurchaseOrdersCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create purchase order'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PurchaseOrdersCreationFailed';
        Object.setPrototypeOf(_this, PurchaseOrdersCreationFailed.prototype);
        return _this;
    }
    return PurchaseOrdersCreationFailed;
}(errors_1.BaseError));
exports.PurchaseOrdersCreationFailed = PurchaseOrdersCreationFailed;
var PurchaseOrdersUpdateFailed = (function (_super) {
    tslib_1.__extends(PurchaseOrdersUpdateFailed, _super);
    function PurchaseOrdersUpdateFailed(message, properties) {
        if (message === void 0) { message = 'Could not update purchase order'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PurchaseOrdersUpdateFailed';
        Object.setPrototypeOf(_this, PurchaseOrdersUpdateFailed.prototype);
        return _this;
    }
    return PurchaseOrdersUpdateFailed;
}(errors_1.BaseError));
exports.PurchaseOrdersUpdateFailed = PurchaseOrdersUpdateFailed;
var PurchaseOrdersBulkAddProductsFailed = (function (_super) {
    tslib_1.__extends(PurchaseOrdersBulkAddProductsFailed, _super);
    function PurchaseOrdersBulkAddProductsFailed(message, properties) {
        if (message === void 0) { message = 'Could not bulk add products for purchase order'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PurchaseOrdersBulkAddProductsFailed';
        Object.setPrototypeOf(_this, PurchaseOrdersBulkAddProductsFailed.prototype);
        return _this;
    }
    return PurchaseOrdersBulkAddProductsFailed;
}(errors_1.BaseError));
exports.PurchaseOrdersBulkAddProductsFailed = PurchaseOrdersBulkAddProductsFailed;
var PurchaseOrdersBulkDeleteProductsFailed = (function (_super) {
    tslib_1.__extends(PurchaseOrdersBulkDeleteProductsFailed, _super);
    function PurchaseOrdersBulkDeleteProductsFailed(message, properties) {
        if (message === void 0) { message = 'Could not bulk delete products for purchase order'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PurchaseOrdersBulkDeleteProductsFailed';
        Object.setPrototypeOf(_this, PurchaseOrdersBulkDeleteProductsFailed.prototype);
        return _this;
    }
    return PurchaseOrdersBulkDeleteProductsFailed;
}(errors_1.BaseError));
exports.PurchaseOrdersBulkDeleteProductsFailed = PurchaseOrdersBulkDeleteProductsFailed;
//# sourceMappingURL=purchase_orders.js.map