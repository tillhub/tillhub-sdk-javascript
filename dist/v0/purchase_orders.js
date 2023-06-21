"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseOrdersExportFailed = exports.PurchaseOrdersMetaFailed = exports.PurchaseOrdersBulkDeleteProductsFailed = exports.PurchaseOrdersBulkAddProductsFailed = exports.PurchaseOrdersUpdateFailed = exports.PurchaseOrdersCreationFailed = exports.PurchaseOrdersGetFailed = exports.PurchaseOrders = void 0;
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
    PurchaseOrders.prototype.getAll = function (query) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var next, base, uri, response_1, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response_1 = _b.sent();
                        if (response_1.status !== 200) {
                            throw new PurchaseOrdersGetFailed(undefined, { status: response_1.status });
                        }
                        if ((_a = response_1.data.cursor) === null || _a === void 0 ? void 0 : _a.next) {
                            next = function () { return _this.getAll({ uri: response_1.data.cursor.next }); };
                        }
                        return [2, {
                                data: response_1.data.results,
                                metadata: { cursor: response_1.data.cursor },
                                next: next
                            }];
                    case 2:
                        error_1 = _b.sent();
                        throw new PurchaseOrdersGetFailed(error_1.message, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    PurchaseOrders.prototype.get = function (purchaseOrderId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_2;
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
                        error_2 = _a.sent();
                        throw new PurchaseOrdersGetFailed(error_2.message, { error: error_2 });
                    case 4: return [2];
                }
            });
        });
    };
    PurchaseOrders.prototype.create = function (purchaseOrder) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri();
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
                        error_3 = _a.sent();
                        throw new PurchaseOrdersCreationFailed(error_3.message, { error: error_3 });
                    case 4: return [2];
                }
            });
        });
    };
    PurchaseOrders.prototype.put = function (purchaseOrderId, purchaseOrder) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri("/" + purchaseOrderId);
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
                        error_4 = _a.sent();
                        throw new PurchaseOrdersUpdateFailed(error_4.message, { error: error_4 });
                    case 4: return [2];
                }
            });
        });
    };
    PurchaseOrders.prototype.pdfUri = function (purchaseOrderId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri("/" + purchaseOrderId + "/pdf");
                        uri = this.uriHelper.generateUriWithQuery(base);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        return [2, {
                                data: response.data
                            }];
                    case 2:
                        error_5 = _a.sent();
                        throw new PurchaseOrdersPdfFailed(error_5.message);
                    case 3: return [2];
                }
            });
        });
    };
    PurchaseOrders.prototype.meta = function (q) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_6;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri('/meta');
                        uri = this.uriHelper.generateUriWithQuery(base, q);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new PurchaseOrdersMetaFailed(undefined, { status: response.status });
                        }
                        if (!response.data.results[0]) {
                            throw new PurchaseOrdersMetaFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_6 = _a.sent();
                        throw new PurchaseOrdersMetaFailed(error_6.message, { error: error_6 });
                    case 4: return [2];
                }
            });
        });
    };
    PurchaseOrders.prototype.bulkAddProducts = function (purchaseOrderId, purchaseOrder) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_7;
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
                        error_7 = _a.sent();
                        throw new PurchaseOrdersBulkAddProductsFailed(error_7.message, { error: error_7 });
                    case 4: return [2];
                }
            });
        });
    };
    PurchaseOrders.prototype.bulkDeleteProducts = function (purchaseOrderId, purchaseOrder) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_8;
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
                        error_8 = _a.sent();
                        throw new PurchaseOrdersBulkDeleteProductsFailed(error_8.message, { error: error_8 });
                    case 4: return [2];
                }
            });
        });
    };
    PurchaseOrders.prototype.export = function (q) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_9;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri('/export');
                        uri = this.uriHelper.generateUriWithQuery(base, q);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new PurchaseOrdersExportFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg
                            }];
                    case 3:
                        error_9 = _a.sent();
                        throw new PurchaseOrdersExportFailed(error_9.message, { error: error_9 });
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
var PurchaseOrdersPdfFailed = (function (_super) {
    tslib_1.__extends(PurchaseOrdersPdfFailed, _super);
    function PurchaseOrdersPdfFailed(message, properties) {
        if (message === void 0) { message = 'Could not create pdf'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PurchaseOrdersPdfFailed';
        Object.setPrototypeOf(_this, PurchaseOrdersPdfFailed.prototype);
        return _this;
    }
    return PurchaseOrdersPdfFailed;
}(errors_1.BaseError));
var PurchaseOrdersMetaFailed = (function (_super) {
    tslib_1.__extends(PurchaseOrdersMetaFailed, _super);
    function PurchaseOrdersMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not get PurchaseOrder metadata'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PurchaseOrdersMetaFailed';
        Object.setPrototypeOf(_this, PurchaseOrdersMetaFailed.prototype);
        return _this;
    }
    return PurchaseOrdersMetaFailed;
}(errors_1.BaseError));
exports.PurchaseOrdersMetaFailed = PurchaseOrdersMetaFailed;
var PurchaseOrdersExportFailed = (function (_super) {
    tslib_1.__extends(PurchaseOrdersExportFailed, _super);
    function PurchaseOrdersExportFailed(message, properties) {
        if (message === void 0) { message = 'Could not export purchase orders'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PurchaseOrdersExportFailed';
        Object.setPrototypeOf(_this, PurchaseOrdersExportFailed.prototype);
        return _this;
    }
    return PurchaseOrdersExportFailed;
}(errors_1.BaseError));
exports.PurchaseOrdersExportFailed = PurchaseOrdersExportFailed;
//# sourceMappingURL=purchase_orders.js.map