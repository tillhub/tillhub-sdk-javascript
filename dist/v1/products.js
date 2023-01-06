"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BarcodeGetFailed = exports.ProductsBookStockFailed = exports.ProductsSearchFailed = exports.ProductsDeleteFailed = exports.ProductsBulkEditFailed = exports.ProductsBulkCreateFailed = exports.ProductsUpdateFailed = exports.ProductsMetaFailed = exports.ProductsCountFailed = exports.ProductChildrenDetailsFetchFailed = exports.ProductDetailsFetchFailed = exports.ProductsImportFailed = exports.ProductsFetchFailed = exports.ProductFetchFailed = exports.ProductsCreateFailed = exports.Products = void 0;
var tslib_1 = require("tslib");
var baseError_1 = require("../errors/baseError");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var pricebooks_1 = require("./pricebooks");
var pricebook_entries_1 = require("./pricebook-entries");
var Products = (function (_super) {
    tslib_1.__extends(Products, _super);
    function Products(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: Products.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Products.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    Products.prototype.create = function (product, query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, product)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new ProductsCreateFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count },
                                errors: response.data.errors || []
                            }];
                    case 3:
                        error_1 = _a.sent();
                        throw new ProductsCreateFailed(error_1.message, { error: error_1 });
                    case 4: return [2];
                }
            });
        });
    };
    Products.prototype.getAll = function (options) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var next, base, uri, response_1, error_2;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, options);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response_1 = _b.sent();
                        if (response_1.status !== 200) {
                            throw new ProductsFetchFailed(undefined, { status: response_1.status });
                        }
                        if ((_a = response_1.data.cursor) === null || _a === void 0 ? void 0 : _a.next) {
                            next = function () { return _this.getAll({ uri: response_1.data.cursor.next }); };
                        }
                        return [2, {
                                data: response_1.data.results,
                                metadata: { count: response_1.data.count, cursor: response_1.data.cursor },
                                next: next
                            }];
                    case 2:
                        error_2 = _b.sent();
                        throw new ProductsFetchFailed(error_2.message, { error: error_2 });
                    case 3: return [2];
                }
            });
        });
    };
    Products.prototype.import = function (options) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var next, base, uri, response_2, error_3;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/import');
                        uri = this.uriHelper.generateUriWithQuery(base, options);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response_2 = _b.sent();
                        if (response_2.status !== 200) {
                            throw new ProductsImportFailed(undefined, { status: response_2.status });
                        }
                        if ((_a = response_2.data.cursor) === null || _a === void 0 ? void 0 : _a.next) {
                            next = function () { return _this.import({ uri: response_2.data.cursor.next }); };
                        }
                        return [2, {
                                data: response_2.data.results,
                                metadata: { count: response_2.data.count, cursor: response_2.data.cursor },
                                next: next
                            }];
                    case 2:
                        error_3 = _b.sent();
                        throw new ProductsImportFailed(error_3.message, { error: error_3 });
                    case 3: return [2];
                }
            });
        });
    };
    Products.prototype.get = function (productId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + productId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new ProductFetchFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_4 = _a.sent();
                        throw new ProductFetchFailed(error_4.message, { error: error_4 });
                    case 4: return [2];
                }
            });
        });
    };
    Products.prototype.getDetails = function (productId, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri("/" + productId + "/details");
                        uri = this.uriHelper.generateUriWithQuery(base, options);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new ProductDetailsFetchFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_5 = _a.sent();
                        throw new ProductDetailsFetchFailed(error_5.message, { error: error_5 });
                    case 4: return [2];
                }
            });
        });
    };
    Products.prototype.getChildrenDetails = function (productId, hideStock) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_6;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + productId + "/children/details" + (hideStock ? '?stock=false' : ''));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new ProductChildrenDetailsFetchFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results,
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_6 = _a.sent();
                        throw new ProductChildrenDetailsFetchFailed(error_6.message, { error: error_6 });
                    case 4: return [2];
                }
            });
        });
    };
    Products.prototype.meta = function (q) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_7;
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
                            throw new ProductsMetaFailed(undefined, { status: response.status });
                        }
                        if (!response.data.results[0]) {
                            throw new ProductsMetaFailed('could not get product metadata unexpectedly', {
                                status: response.status
                            });
                        }
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_7 = _a.sent();
                        throw new ProductsMetaFailed(error_7.message, { error: error_7 });
                    case 4: return [2];
                }
            });
        });
    };
    Products.prototype.put = function (productId, product) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_8;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + productId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri, product)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new ProductsUpdateFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_8 = _a.sent();
                        throw new ProductsUpdateFailed(error_8.message, { error: error_8 });
                    case 4: return [2];
                }
            });
        });
    };
    Products.prototype.bulkCreate = function (products, query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_9;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri('/bulk_create');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, products)];
                    case 2:
                        response = _a.sent();
                        if (![200, 409].includes(response.status)) {
                            throw new ProductsBulkCreateFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                msg: response.data.msg,
                                results: {
                                    invalid_stock: response.data.invalid_stock,
                                    invalid_products: response.data.invalid_products,
                                    updated_products: response.data.updated_products,
                                    count: response.data.count
                                }
                            }];
                    case 3:
                        error_9 = _a.sent();
                        throw new ProductsBulkCreateFailed(error_9.message, { error: error_9 });
                    case 4: return [2];
                }
            });
        });
    };
    Products.prototype.bulkEdit = function (products) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_10;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri('/bulk');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri, products)];
                    case 2:
                        response = _a.sent();
                        if (![200, 202].includes(response.status)) {
                            throw new ProductsBulkEditFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_10 = _a.sent();
                        throw new ProductsBulkEditFailed(error_10.message, { error: error_10 });
                    case 4: return [2];
                }
            });
        });
    };
    Products.prototype.count = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_11;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri('/meta');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new ProductsCountFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_11 = _a.sent();
                        throw new ProductsCountFailed(error_11.message, { error: error_11 });
                    case 4: return [2];
                }
            });
        });
    };
    Products.prototype.delete = function (productId, deleteOptions) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_12;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri("/" + productId);
                        uri = this.uriHelper.generateUriWithQuery(base, deleteOptions);
                        return [4, this.http.getClient().delete(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new ProductsDeleteFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                msg: response.data.msg
                            }];
                    case 2:
                        error_12 = _a.sent();
                        throw new ProductsDeleteFailed(error_12.message, { error: error_12 });
                    case 3: return [2];
                }
            });
        });
    };
    Products.prototype.search = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _query, base, uri, response, error_13;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _query = typeof query === 'string' ? { q: query } : query;
                        base = this.uriHelper.generateBaseUri('/search');
                        uri = this.uriHelper.generateUriWithQuery(base, _query);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new ProductsSearchFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_13 = _a.sent();
                        throw new ProductsSearchFailed(error_13.message, { error: error_13 });
                    case 4: return [2];
                }
            });
        });
    };
    Products.prototype.bookStock = function (requestOptions) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_14;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + requestOptions.productId + "/stock/book");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, requestOptions.body)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new ProductsBookStockFailed();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_14 = _a.sent();
                        throw new ProductsBookStockFailed(error_14.message, { error: error_14 });
                    case 4: return [2];
                }
            });
        });
    };
    Products.prototype.checkBarcode = function (code) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_15;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri('/barcode');
                        uri = this.uriHelper.generateUriWithQuery(base, { code: code });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new BarcodeGetFailed(undefined, {
                                status: response.status
                            });
                        }
                        return [2, {
                                data: response.data.results,
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_15 = _a.sent();
                        if (error_15.response && error_15.response.status === 409) {
                            throw new BarcodeGetFailed(undefined, {
                                status: error_15.response.status,
                                name: error_15.response.data.name,
                                data: error_15.response.data.results
                            });
                        }
                        throw new BarcodeGetFailed(error_15.message, { error: error_15 });
                    case 4: return [2];
                }
            });
        });
    };
    Products.prototype.pricebooks = function () {
        return new pricebooks_1.Pricebooks(this.options, this.http, this.uriHelper);
    };
    Products.prototype.pricebookEntries = function () {
        return new pricebook_entries_1.PricebookEntries(this.options, this.http, this.uriHelper);
    };
    Products.baseEndpoint = '/api/v1/products';
    return Products;
}(base_1.ThBaseHandler));
exports.Products = Products;
var ProductsCreateFailed = (function (_super) {
    tslib_1.__extends(ProductsCreateFailed, _super);
    function ProductsCreateFailed(message, properties) {
        if (message === void 0) { message = 'Could not create the product'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductsCreateFailed';
        Object.setPrototypeOf(_this, ProductsCreateFailed.prototype);
        return _this;
    }
    return ProductsCreateFailed;
}(baseError_1.BaseError));
exports.ProductsCreateFailed = ProductsCreateFailed;
var ProductFetchFailed = (function (_super) {
    tslib_1.__extends(ProductFetchFailed, _super);
    function ProductFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the product'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductFetchFailed';
        Object.setPrototypeOf(_this, ProductFetchFailed.prototype);
        return _this;
    }
    return ProductFetchFailed;
}(baseError_1.BaseError));
exports.ProductFetchFailed = ProductFetchFailed;
var ProductsFetchFailed = (function (_super) {
    tslib_1.__extends(ProductsFetchFailed, _super);
    function ProductsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the products'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductsFetchFailed';
        Object.setPrototypeOf(_this, ProductsFetchFailed.prototype);
        return _this;
    }
    return ProductsFetchFailed;
}(baseError_1.BaseError));
exports.ProductsFetchFailed = ProductsFetchFailed;
var ProductsImportFailed = (function (_super) {
    tslib_1.__extends(ProductsImportFailed, _super);
    function ProductsImportFailed(message, properties) {
        if (message === void 0) { message = 'Could not import the products'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductsImportFailed';
        Object.setPrototypeOf(_this, ProductsImportFailed.prototype);
        return _this;
    }
    return ProductsImportFailed;
}(baseError_1.BaseError));
exports.ProductsImportFailed = ProductsImportFailed;
var ProductDetailsFetchFailed = (function (_super) {
    tslib_1.__extends(ProductDetailsFetchFailed, _super);
    function ProductDetailsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the details of the product'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductDetailsFetchFailed';
        Object.setPrototypeOf(_this, ProductDetailsFetchFailed.prototype);
        return _this;
    }
    return ProductDetailsFetchFailed;
}(baseError_1.BaseError));
exports.ProductDetailsFetchFailed = ProductDetailsFetchFailed;
var ProductChildrenDetailsFetchFailed = (function (_super) {
    tslib_1.__extends(ProductChildrenDetailsFetchFailed, _super);
    function ProductChildrenDetailsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the details of the children products'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductChildrenDetailsFetchFailed';
        Object.setPrototypeOf(_this, ProductChildrenDetailsFetchFailed.prototype);
        return _this;
    }
    return ProductChildrenDetailsFetchFailed;
}(baseError_1.BaseError));
exports.ProductChildrenDetailsFetchFailed = ProductChildrenDetailsFetchFailed;
var ProductsCountFailed = (function (_super) {
    tslib_1.__extends(ProductsCountFailed, _super);
    function ProductsCountFailed(message, properties) {
        if (message === void 0) { message = 'Could not count the products'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductsCountFailed';
        Object.setPrototypeOf(_this, ProductsCountFailed.prototype);
        return _this;
    }
    return ProductsCountFailed;
}(baseError_1.BaseError));
exports.ProductsCountFailed = ProductsCountFailed;
var ProductsMetaFailed = (function (_super) {
    tslib_1.__extends(ProductsMetaFailed, _super);
    function ProductsMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not get products metadata'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductsMetaFailed';
        Object.setPrototypeOf(_this, ProductsMetaFailed.prototype);
        return _this;
    }
    return ProductsMetaFailed;
}(baseError_1.BaseError));
exports.ProductsMetaFailed = ProductsMetaFailed;
var ProductsUpdateFailed = (function (_super) {
    tslib_1.__extends(ProductsUpdateFailed, _super);
    function ProductsUpdateFailed(message, properties) {
        if (message === void 0) { message = 'Could not update the product'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductsUpdateFailed';
        Object.setPrototypeOf(_this, ProductsUpdateFailed.prototype);
        return _this;
    }
    return ProductsUpdateFailed;
}(baseError_1.BaseError));
exports.ProductsUpdateFailed = ProductsUpdateFailed;
var ProductsBulkCreateFailed = (function (_super) {
    tslib_1.__extends(ProductsBulkCreateFailed, _super);
    function ProductsBulkCreateFailed(message, properties) {
        if (message === void 0) { message = 'Could not bulk create the products'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductsBulkCreateFailed';
        Object.setPrototypeOf(_this, ProductsBulkCreateFailed.prototype);
        return _this;
    }
    return ProductsBulkCreateFailed;
}(baseError_1.BaseError));
exports.ProductsBulkCreateFailed = ProductsBulkCreateFailed;
var ProductsBulkEditFailed = (function (_super) {
    tslib_1.__extends(ProductsBulkEditFailed, _super);
    function ProductsBulkEditFailed(message, properties) {
        if (message === void 0) { message = 'Could not bulk edit the products'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductsBulkEditFailed';
        Object.setPrototypeOf(_this, ProductsBulkEditFailed.prototype);
        return _this;
    }
    return ProductsBulkEditFailed;
}(baseError_1.BaseError));
exports.ProductsBulkEditFailed = ProductsBulkEditFailed;
var ProductsDeleteFailed = (function (_super) {
    tslib_1.__extends(ProductsDeleteFailed, _super);
    function ProductsDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete the product'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductsDeleteFailed';
        Object.setPrototypeOf(_this, ProductsDeleteFailed.prototype);
        return _this;
    }
    return ProductsDeleteFailed;
}(baseError_1.BaseError));
exports.ProductsDeleteFailed = ProductsDeleteFailed;
var ProductsSearchFailed = (function (_super) {
    tslib_1.__extends(ProductsSearchFailed, _super);
    function ProductsSearchFailed(message, properties) {
        if (message === void 0) { message = 'Could not search for the product'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductsSearchFailed';
        Object.setPrototypeOf(_this, ProductsSearchFailed.prototype);
        return _this;
    }
    return ProductsSearchFailed;
}(baseError_1.BaseError));
exports.ProductsSearchFailed = ProductsSearchFailed;
var ProductsBookStockFailed = (function (_super) {
    tslib_1.__extends(ProductsBookStockFailed, _super);
    function ProductsBookStockFailed(message, properties) {
        if (message === void 0) { message = 'Could not book stock for the product'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductsBookStockFailed';
        Object.setPrototypeOf(_this, ProductsBookStockFailed.prototype);
        return _this;
    }
    return ProductsBookStockFailed;
}(baseError_1.BaseError));
exports.ProductsBookStockFailed = ProductsBookStockFailed;
var BarcodeGetFailed = (function (_super) {
    tslib_1.__extends(BarcodeGetFailed, _super);
    function BarcodeGetFailed(message, properties) {
        if (message === void 0) { message = 'Could not check for barcode collision'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'BarcodeGetFailed';
        Object.setPrototypeOf(_this, BarcodeGetFailed.prototype);
        return _this;
    }
    return BarcodeGetFailed;
}(baseError_1.BaseError));
exports.BarcodeGetFailed = BarcodeGetFailed;
//# sourceMappingURL=products.js.map