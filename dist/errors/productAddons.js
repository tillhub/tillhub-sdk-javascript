"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductAddonDeleteFailed = exports.ProductAddonPutFailed = exports.ProductAddonCreationFailed = exports.ProductAddonsGetMetaFailed = exports.ProductAddonFetchOneFailed = exports.ProductAddonsFetchAllFailed = void 0;
var tslib_1 = require("tslib");
var baseError_1 = require("./baseError");
var ProductAddonsFetchAllFailed = (function (_super) {
    tslib_1.__extends(ProductAddonsFetchAllFailed, _super);
    function ProductAddonsFetchAllFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch all product addons'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductAddonsFetchAllFailed';
        Object.setPrototypeOf(_this, ProductAddonsFetchAllFailed.prototype);
        return _this;
    }
    return ProductAddonsFetchAllFailed;
}(baseError_1.BaseError));
exports.ProductAddonsFetchAllFailed = ProductAddonsFetchAllFailed;
var ProductAddonFetchOneFailed = (function (_super) {
    tslib_1.__extends(ProductAddonFetchOneFailed, _super);
    function ProductAddonFetchOneFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch single product addon'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductAddonFetchOneFailed';
        Object.setPrototypeOf(_this, ProductAddonFetchOneFailed.prototype);
        return _this;
    }
    return ProductAddonFetchOneFailed;
}(baseError_1.BaseError));
exports.ProductAddonFetchOneFailed = ProductAddonFetchOneFailed;
var ProductAddonsGetMetaFailed = (function (_super) {
    tslib_1.__extends(ProductAddonsGetMetaFailed, _super);
    function ProductAddonsGetMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch meta data for product addon'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductAddonGetMetaFailed';
        Object.setPrototypeOf(_this, ProductAddonsGetMetaFailed.prototype);
        return _this;
    }
    return ProductAddonsGetMetaFailed;
}(baseError_1.BaseError));
exports.ProductAddonsGetMetaFailed = ProductAddonsGetMetaFailed;
var ProductAddonCreationFailed = (function (_super) {
    tslib_1.__extends(ProductAddonCreationFailed, _super);
    function ProductAddonCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create product addon'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductAddonCreationFailed';
        Object.setPrototypeOf(_this, ProductAddonCreationFailed.prototype);
        return _this;
    }
    return ProductAddonCreationFailed;
}(baseError_1.BaseError));
exports.ProductAddonCreationFailed = ProductAddonCreationFailed;
var ProductAddonPutFailed = (function (_super) {
    tslib_1.__extends(ProductAddonPutFailed, _super);
    function ProductAddonPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not update product addon'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductAddonPutFailed';
        Object.setPrototypeOf(_this, ProductAddonPutFailed.prototype);
        return _this;
    }
    return ProductAddonPutFailed;
}(baseError_1.BaseError));
exports.ProductAddonPutFailed = ProductAddonPutFailed;
var ProductAddonDeleteFailed = (function (_super) {
    tslib_1.__extends(ProductAddonDeleteFailed, _super);
    function ProductAddonDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete product addon'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductAddonDeleteFailed';
        Object.setPrototypeOf(_this, ProductAddonDeleteFailed.prototype);
        return _this;
    }
    return ProductAddonDeleteFailed;
}(baseError_1.BaseError));
exports.ProductAddonDeleteFailed = ProductAddonDeleteFailed;
//# sourceMappingURL=productAddons.js.map