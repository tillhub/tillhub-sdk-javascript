"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsBulkBookStockFailed = exports.Products = void 0;
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
    Products.prototype.bulkBookStock = function (requestOptions) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri('/stock/book/bulk');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, requestOptions.body)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new ProductsBulkBookStockFailed();
                        return [2, {
                                data: response.data.results,
                                msg: response.data.msg,
                                status: response.data.status
                            }];
                    case 3:
                        error_1 = _a.sent();
                        throw new ProductsBulkBookStockFailed(error_1.message, { error: error_1 });
                    case 4: return [2];
                }
            });
        });
    };
    Products.baseEndpoint = '/api/v4/products';
    return Products;
}(base_1.ThBaseHandler));
exports.Products = Products;
var ProductsBulkBookStockFailed = (function (_super) {
    tslib_1.__extends(ProductsBulkBookStockFailed, _super);
    function ProductsBulkBookStockFailed(message, properties) {
        if (message === void 0) { message = 'Could not bulk book stock for the products'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductsBulkBookStockFailed';
        Object.setPrototypeOf(_this, ProductsBulkBookStockFailed.prototype);
        return _this;
    }
    return ProductsBulkBookStockFailed;
}(baseError_1.BaseError));
exports.ProductsBulkBookStockFailed = ProductsBulkBookStockFailed;
//# sourceMappingURL=products.js.map