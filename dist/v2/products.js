"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsBulkImportFailed = exports.Products = void 0;
var tslib_1 = require("tslib");
var baseError_1 = require("../errors/baseError");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
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
    Products.prototype.bulkImport = function (payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri('/bulk');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, payload)];
                    case 2:
                        response = _a.sent();
                        if (![200, 202].includes(response.status)) {
                            throw new ProductsBulkImportFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                msg: response.data.msg
                            }];
                    case 3:
                        error_1 = _a.sent();
                        throw new ProductsBulkImportFailed(error_1.message, { error: error_1 });
                    case 4: return [2];
                }
            });
        });
    };
    Products.baseEndpoint = '/api/v2/products';
    return Products;
}(base_1.ThBaseHandler));
exports.Products = Products;
var ProductsBulkImportFailed = (function (_super) {
    tslib_1.__extends(ProductsBulkImportFailed, _super);
    function ProductsBulkImportFailed(message, properties) {
        if (message === void 0) { message = 'Could not bulk import products.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductsBulkImportFailed';
        Object.setPrototypeOf(_this, ProductsBulkImportFailed.prototype);
        return _this;
    }
    return ProductsBulkImportFailed;
}(baseError_1.BaseError));
exports.ProductsBulkImportFailed = ProductsBulkImportFailed;
//# sourceMappingURL=products.js.map