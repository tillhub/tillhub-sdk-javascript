"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductTemplatesSearchFailed = exports.ProductTemplateDeleteFailed = exports.ProuctTemplatesCountFailed = exports.ProductTemplateCreationFailed = exports.ProductTemplatePutFailed = exports.ProductTemplateFetchFailed = exports.ProductTemplatesFetchFailed = exports.ProductTemplates = void 0;
var tslib_1 = require("tslib");
var errors_1 = require("../errors");
var uri_helper_1 = require("../uri-helper");
var ProductTemplates = /** @class */ (function () {
    function ProductTemplates(options, http) {
        var _a;
        this.options = options;
        this.http = http;
        this.endpoint = '/api/v0/product_templates';
        this.options.base = (_a = this.options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com';
        this.uriHelper = new uri_helper_1.UriHelper(this.endpoint, this.options);
    }
    ProductTemplates.prototype.getAll = function (queryOrOptions) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, queryOrOptions);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new ProductTemplatesFetchFailed(undefined, { status: response.status });
                        }
                        return [2 /*return*/, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_1 = _a.sent();
                        throw new ProductTemplatesFetchFailed(undefined, { error: error_1 });
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProductTemplates.prototype.get = function (productTemplateId, queryOrOptions) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri("/" + productTemplateId);
                        uri = this.uriHelper.generateUriWithQuery(base, queryOrOptions);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new ProductTemplateFetchFailed(undefined, { status: response.status });
                        }
                        return [2 /*return*/, {
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_2 = _a.sent();
                        throw new ProductTemplateFetchFailed(undefined, { error: error_2 });
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProductTemplates.prototype.search = function (searchTerm) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, { q: searchTerm });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new ProductTemplatesSearchFailed(undefined, { status: response.status });
                        }
                        return [2 /*return*/, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_3 = _a.sent();
                        throw new ProductTemplatesSearchFailed(undefined, { error: error_3 });
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProductTemplates.prototype.put = function (productTemplateId, productTemplate) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + productTemplateId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().put(uri, productTemplate)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_4 = _a.sent();
                        throw new ProductTemplatePutFailed(undefined, { error: error_4 });
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProductTemplates.prototype.create = function (productTemplate) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().post(uri, productTemplate)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_5 = _a.sent();
                        throw new ProductTemplateCreationFailed(undefined, { error: error_5 });
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProductTemplates.prototype.delete = function (taxId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + taxId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().delete(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new ProductTemplateDeleteFailed();
                        return [2 /*return*/, {
                                msg: response.data.msg
                            }];
                    case 3:
                        err_1 = _a.sent();
                        throw new ProductTemplateDeleteFailed();
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return ProductTemplates;
}());
exports.ProductTemplates = ProductTemplates;
var ProductTemplatesFetchFailed = /** @class */ (function (_super) {
    tslib_1.__extends(ProductTemplatesFetchFailed, _super);
    function ProductTemplatesFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch product templates'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductTemplatesFetchFailed';
        Object.setPrototypeOf(_this, ProductTemplatesFetchFailed.prototype);
        return _this;
    }
    return ProductTemplatesFetchFailed;
}(errors_1.BaseError));
exports.ProductTemplatesFetchFailed = ProductTemplatesFetchFailed;
var ProductTemplateFetchFailed = /** @class */ (function (_super) {
    tslib_1.__extends(ProductTemplateFetchFailed, _super);
    function ProductTemplateFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch product template'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductTemplateFetchFailed';
        Object.setPrototypeOf(_this, ProductTemplateFetchFailed.prototype);
        return _this;
    }
    return ProductTemplateFetchFailed;
}(errors_1.BaseError));
exports.ProductTemplateFetchFailed = ProductTemplateFetchFailed;
var ProductTemplatePutFailed = /** @class */ (function (_super) {
    tslib_1.__extends(ProductTemplatePutFailed, _super);
    function ProductTemplatePutFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter product template'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductTemplatePutFailed';
        Object.setPrototypeOf(_this, ProductTemplatePutFailed.prototype);
        return _this;
    }
    return ProductTemplatePutFailed;
}(errors_1.BaseError));
exports.ProductTemplatePutFailed = ProductTemplatePutFailed;
var ProductTemplateCreationFailed = /** @class */ (function (_super) {
    tslib_1.__extends(ProductTemplateCreationFailed, _super);
    function ProductTemplateCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could create product template'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductTemplateCreationFailed';
        Object.setPrototypeOf(_this, ProductTemplateCreationFailed.prototype);
        return _this;
    }
    return ProductTemplateCreationFailed;
}(errors_1.BaseError));
exports.ProductTemplateCreationFailed = ProductTemplateCreationFailed;
var ProuctTemplatesCountFailed = /** @class */ (function (_super) {
    tslib_1.__extends(ProuctTemplatesCountFailed, _super);
    function ProuctTemplatesCountFailed(message, properties) {
        if (message === void 0) { message = 'Could not get count of product templates'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProuctTemplatesCountFailed';
        Object.setPrototypeOf(_this, ProuctTemplatesCountFailed.prototype);
        return _this;
    }
    return ProuctTemplatesCountFailed;
}(errors_1.BaseError));
exports.ProuctTemplatesCountFailed = ProuctTemplatesCountFailed;
var ProductTemplateDeleteFailed = /** @class */ (function (_super) {
    tslib_1.__extends(ProductTemplateDeleteFailed, _super);
    function ProductTemplateDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete product template'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductTemplateDeleteFailed';
        Object.setPrototypeOf(_this, ProductTemplateDeleteFailed.prototype);
        return _this;
    }
    return ProductTemplateDeleteFailed;
}(errors_1.BaseError));
exports.ProductTemplateDeleteFailed = ProductTemplateDeleteFailed;
var ProductTemplatesSearchFailed = /** @class */ (function (_super) {
    tslib_1.__extends(ProductTemplatesSearchFailed, _super);
    function ProductTemplatesSearchFailed(message, properties) {
        if (message === void 0) { message = 'Could not search for product template'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductTemplatesSearchFailed';
        Object.setPrototypeOf(_this, ProductTemplatesSearchFailed.prototype);
        return _this;
    }
    return ProductTemplatesSearchFailed;
}(errors_1.BaseError));
exports.ProductTemplatesSearchFailed = ProductTemplatesSearchFailed;
//# sourceMappingURL=product_templates.js.map