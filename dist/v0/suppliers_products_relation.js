"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuppliersProductsRelationBulkDeleteFailed = exports.SuppliersProductsRelationDeleteFailed = exports.SuppliersProductsRelationBulkCreationFailed = exports.SuppliersProductsRelationCreationFailed = exports.SuppliersProductsRelationMapFailed = exports.SuppliersProductsRelationSuppliersFailed = exports.SuppliersProductsRelationProductIdsFailed = exports.SuppliersProductsRelation = void 0;
var tslib_1 = require("tslib");
var errors_1 = require("../errors");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var SuppliersProductsRelation = (function (_super) {
    tslib_1.__extends(SuppliersProductsRelation, _super);
    function SuppliersProductsRelation(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: SuppliersProductsRelation.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = SuppliersProductsRelation.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    SuppliersProductsRelation.prototype.getProductIds = function (supplierId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + supplierId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new SuppliersProductsRelationProductIdsFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg
                            }];
                    case 3:
                        error_1 = _a.sent();
                        throw new SuppliersProductsRelationProductIdsFailed(error_1.message, { error: error_1 });
                    case 4: return [2];
                }
            });
        });
    };
    SuppliersProductsRelation.prototype.getSuppliers = function (productId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/lookup/" + productId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new SuppliersProductsRelationSuppliersFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg
                            }];
                    case 3:
                        error_2 = _a.sent();
                        throw new SuppliersProductsRelationSuppliersFailed(error_2.message, { error: error_2 });
                    case 4: return [2];
                }
            });
        });
    };
    SuppliersProductsRelation.prototype.getMap = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri('/map');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, {
                                productId: query.productId
                            })];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new SuppliersProductsRelationMapFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg
                            }];
                    case 3:
                        error_3 = _a.sent();
                        throw new SuppliersProductsRelationMapFailed(error_3.message, { error: error_3 });
                    case 4: return [2];
                }
            });
        });
    };
    SuppliersProductsRelation.prototype.create = function (supplierId, productId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + supplierId + "/" + productId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new SuppliersProductsRelationCreationFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg
                            }];
                    case 3:
                        error_4 = _a.sent();
                        throw new SuppliersProductsRelationCreationFailed(error_4.message, { error: error_4 });
                    case 4: return [2];
                }
            });
        });
    };
    SuppliersProductsRelation.prototype.bulkCreate = function (supplierId, query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + supplierId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, {
                                productId: query.productId
                            })];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new SuppliersProductsRelationBulkCreationFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg
                            }];
                    case 3:
                        error_5 = _a.sent();
                        throw new SuppliersProductsRelationBulkCreationFailed(error_5.message, { error: error_5 });
                    case 4: return [2];
                }
            });
        });
    };
    SuppliersProductsRelation.prototype.delete = function (supplierId, productId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_6;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + supplierId + "/" + productId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().delete(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new SuppliersProductsRelationDeleteFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg
                            }];
                    case 3:
                        error_6 = _a.sent();
                        throw new SuppliersProductsRelationDeleteFailed(error_6.message, { error: error_6 });
                    case 4: return [2];
                }
            });
        });
    };
    SuppliersProductsRelation.prototype.bulkDelete = function (supplierId, query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_7;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + supplierId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().delete(uri, {
                                data: {
                                    productId: query.productId
                                }
                            })];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new SuppliersProductsRelationBulkDeleteFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg
                            }];
                    case 3:
                        error_7 = _a.sent();
                        throw new SuppliersProductsRelationBulkDeleteFailed(error_7.message, { error: error_7 });
                    case 4: return [2];
                }
            });
        });
    };
    SuppliersProductsRelation.baseEndpoint = '/api/v0/business-partner-products';
    return SuppliersProductsRelation;
}(base_1.ThBaseHandler));
exports.SuppliersProductsRelation = SuppliersProductsRelation;
var SuppliersProductsRelationProductIdsFailed = (function (_super) {
    tslib_1.__extends(SuppliersProductsRelationProductIdsFailed, _super);
    function SuppliersProductsRelationProductIdsFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch supplier and product relation'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'SuppliersProductsRelationProductIdsFailed';
        Object.setPrototypeOf(_this, SuppliersProductsRelationProductIdsFailed.prototype);
        return _this;
    }
    return SuppliersProductsRelationProductIdsFailed;
}(errors_1.BaseError));
exports.SuppliersProductsRelationProductIdsFailed = SuppliersProductsRelationProductIdsFailed;
var SuppliersProductsRelationSuppliersFailed = (function (_super) {
    tslib_1.__extends(SuppliersProductsRelationSuppliersFailed, _super);
    function SuppliersProductsRelationSuppliersFailed(message, properties) {
        if (message === void 0) { message = 'Could not make a lookup for supplier and product relation'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'SuppliersProductsRelationSuppliersFailed';
        Object.setPrototypeOf(_this, SuppliersProductsRelationSuppliersFailed.prototype);
        return _this;
    }
    return SuppliersProductsRelationSuppliersFailed;
}(errors_1.BaseError));
exports.SuppliersProductsRelationSuppliersFailed = SuppliersProductsRelationSuppliersFailed;
var SuppliersProductsRelationMapFailed = (function (_super) {
    tslib_1.__extends(SuppliersProductsRelationMapFailed, _super);
    function SuppliersProductsRelationMapFailed(message, properties) {
        if (message === void 0) { message = 'Could not make a map for supplier and product relation'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'SuppliersProductsRelationMapFailed';
        Object.setPrototypeOf(_this, SuppliersProductsRelationMapFailed.prototype);
        return _this;
    }
    return SuppliersProductsRelationMapFailed;
}(errors_1.BaseError));
exports.SuppliersProductsRelationMapFailed = SuppliersProductsRelationMapFailed;
var SuppliersProductsRelationCreationFailed = (function (_super) {
    tslib_1.__extends(SuppliersProductsRelationCreationFailed, _super);
    function SuppliersProductsRelationCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create supplier and product relation'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'SuppliersProductsRelationCreationFailed';
        Object.setPrototypeOf(_this, SuppliersProductsRelationCreationFailed.prototype);
        return _this;
    }
    return SuppliersProductsRelationCreationFailed;
}(errors_1.BaseError));
exports.SuppliersProductsRelationCreationFailed = SuppliersProductsRelationCreationFailed;
var SuppliersProductsRelationBulkCreationFailed = (function (_super) {
    tslib_1.__extends(SuppliersProductsRelationBulkCreationFailed, _super);
    function SuppliersProductsRelationBulkCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not bulk create supplier and product relation'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'SuppliersProductsRelationBulkCreationFailed';
        Object.setPrototypeOf(_this, SuppliersProductsRelationBulkCreationFailed.prototype);
        return _this;
    }
    return SuppliersProductsRelationBulkCreationFailed;
}(errors_1.BaseError));
exports.SuppliersProductsRelationBulkCreationFailed = SuppliersProductsRelationBulkCreationFailed;
var SuppliersProductsRelationDeleteFailed = (function (_super) {
    tslib_1.__extends(SuppliersProductsRelationDeleteFailed, _super);
    function SuppliersProductsRelationDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete the supplier and product relation'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'SuppliersProductsRelationDeleteFailed';
        Object.setPrototypeOf(_this, SuppliersProductsRelationDeleteFailed.prototype);
        return _this;
    }
    return SuppliersProductsRelationDeleteFailed;
}(errors_1.BaseError));
exports.SuppliersProductsRelationDeleteFailed = SuppliersProductsRelationDeleteFailed;
var SuppliersProductsRelationBulkDeleteFailed = (function (_super) {
    tslib_1.__extends(SuppliersProductsRelationBulkDeleteFailed, _super);
    function SuppliersProductsRelationBulkDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not bulk delete the supplier and product relation'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'SuppliersProductsRelationBulkDeleteFailed';
        Object.setPrototypeOf(_this, SuppliersProductsRelationBulkDeleteFailed.prototype);
        return _this;
    }
    return SuppliersProductsRelationBulkDeleteFailed;
}(errors_1.BaseError));
exports.SuppliersProductsRelationBulkDeleteFailed = SuppliersProductsRelationBulkDeleteFailed;
//# sourceMappingURL=suppliers_products_relation.js.map