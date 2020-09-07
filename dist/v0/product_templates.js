"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductTemplatesSearchFailed = exports.ProductTemplateDeleteFailed = exports.ProuctTemplatesCountFailed = exports.ProductTemplateCreationFailed = exports.ProductTemplatePutFailed = exports.ProductTemplateFetchFailed = exports.ProductTemplatesFetchFailed = exports.ProductTemplates = void 0;
var tslib_1 = require("tslib");
var qs_1 = tslib_1.__importDefault(require("qs"));
var errors_1 = require("../errors");
var ProductTemplates = (function () {
    function ProductTemplates(options, http) {
        this.options = options;
        this.http = http;
        this.endpoint = '/api/v0/product_templates';
        this.options.base = this.options.base || 'https://api.tillhub.com';
    }
    ProductTemplates.prototype.getAll = function (queryOrOptions) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var next, uri, queryString, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = void 0;
                        if (queryOrOptions && queryOrOptions.uri) {
                            uri = queryOrOptions.uri;
                        }
                        else {
                            queryString = '';
                            if (queryOrOptions && (queryOrOptions.query || queryOrOptions.limit)) {
                                queryString = qs_1.default.stringify(tslib_1.__assign({ limit: queryOrOptions.limit }, queryOrOptions.query));
                            }
                            uri = "" + this.options.base + this.endpoint + "/" + this.options.user + (queryString ? "?" + queryString : '');
                        }
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2, reject(new ProductTemplatesFetchFailed(undefined, { status: response.status }))];
                        }
                        return [2, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count },
                                next: next
                            })];
                    case 2:
                        error_1 = _a.sent();
                        return [2, reject(new ProductTemplatesFetchFailed(undefined, { error: error_1 }))];
                    case 3: return [2];
                }
            });
        }); });
    };
    ProductTemplates.prototype.get = function (productTemplateId, queryOrOptions) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, queryString, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (queryOrOptions && queryOrOptions.uri) {
                            uri = queryOrOptions.uri;
                        }
                        else {
                            queryString = '';
                            if (queryOrOptions && (queryOrOptions.query || queryOrOptions.limit)) {
                                queryString = qs_1.default.stringify(tslib_1.__assign({ limit: queryOrOptions.limit }, queryOrOptions.query));
                            }
                            uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + productTemplateId + (queryString ? "?" + queryString : '');
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 &&
                            reject(new ProductTemplateFetchFailed(undefined, { status: response.status }));
                        return [2, resolve({
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_2 = _a.sent();
                        return [2, reject(new ProductTemplateFetchFailed(undefined, { error: error_2 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    ProductTemplates.prototype.search = function (searchTerm) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "?q=" + searchTerm;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2, reject(new ProductTemplatesSearchFailed(undefined, { status: response.status }))];
                        }
                        return [2, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_3 = _a.sent();
                        return [2, reject(new ProductTemplatesSearchFailed(undefined, { error: error_3 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    ProductTemplates.prototype.put = function (productTemplateId, productTemplate) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + productTemplateId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri, productTemplate)];
                    case 2:
                        response = _a.sent();
                        return [2, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_4 = _a.sent();
                        return [2, reject(new ProductTemplatePutFailed(undefined, { error: error_4 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    ProductTemplates.prototype.create = function (productTemplate) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, productTemplate)];
                    case 2:
                        response = _a.sent();
                        return [2, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_5 = _a.sent();
                        return [2, reject(new ProductTemplateCreationFailed(undefined, { error: error_5 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    ProductTemplates.prototype.delete = function (taxId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + taxId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().delete(uri)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 && reject(new ProductTemplateDeleteFailed());
                        return [2, resolve({
                                msg: response.data.msg
                            })];
                    case 3:
                        err_1 = _a.sent();
                        return [2, reject(new ProductTemplateDeleteFailed())];
                    case 4: return [2];
                }
            });
        }); });
    };
    return ProductTemplates;
}());
exports.ProductTemplates = ProductTemplates;
var ProductTemplatesFetchFailed = (function (_super) {
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
var ProductTemplateFetchFailed = (function (_super) {
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
var ProductTemplatePutFailed = (function (_super) {
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
var ProductTemplateCreationFailed = (function (_super) {
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
var ProuctTemplatesCountFailed = (function (_super) {
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
var ProductTemplateDeleteFailed = (function (_super) {
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
var ProductTemplatesSearchFailed = (function (_super) {
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