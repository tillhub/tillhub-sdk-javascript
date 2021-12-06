"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductAddonGroupDeleteFailed = exports.ProductAddonGroupPutFailed = exports.ProductAddonGroupCreationFailed = exports.ProductAddonGroupsGetMetaFailed = exports.ProductAddonGroupFetchOneFailed = exports.ProductAddonGroupsFetchAllFailed = void 0;
var tslib_1 = require("tslib");
var baseError_1 = require("./baseError");
var ProductAddonGroupsFetchAllFailed = (function (_super) {
    tslib_1.__extends(ProductAddonGroupsFetchAllFailed, _super);
    function ProductAddonGroupsFetchAllFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch all product addon groups'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductAddonGroupsFetchAllFailed';
        Object.setPrototypeOf(_this, ProductAddonGroupsFetchAllFailed.prototype);
        return _this;
    }
    return ProductAddonGroupsFetchAllFailed;
}(baseError_1.BaseError));
exports.ProductAddonGroupsFetchAllFailed = ProductAddonGroupsFetchAllFailed;
var ProductAddonGroupFetchOneFailed = (function (_super) {
    tslib_1.__extends(ProductAddonGroupFetchOneFailed, _super);
    function ProductAddonGroupFetchOneFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch single product addon group'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductAddonGroupFetchOneFailed';
        Object.setPrototypeOf(_this, ProductAddonGroupFetchOneFailed.prototype);
        return _this;
    }
    return ProductAddonGroupFetchOneFailed;
}(baseError_1.BaseError));
exports.ProductAddonGroupFetchOneFailed = ProductAddonGroupFetchOneFailed;
var ProductAddonGroupsGetMetaFailed = (function (_super) {
    tslib_1.__extends(ProductAddonGroupsGetMetaFailed, _super);
    function ProductAddonGroupsGetMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch meta data for product addon group'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductAddonGroupsGetMetaFailed';
        Object.setPrototypeOf(_this, ProductAddonGroupsGetMetaFailed.prototype);
        return _this;
    }
    return ProductAddonGroupsGetMetaFailed;
}(baseError_1.BaseError));
exports.ProductAddonGroupsGetMetaFailed = ProductAddonGroupsGetMetaFailed;
var ProductAddonGroupCreationFailed = (function (_super) {
    tslib_1.__extends(ProductAddonGroupCreationFailed, _super);
    function ProductAddonGroupCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create product addon group'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductAddonGroupCreationFailed';
        Object.setPrototypeOf(_this, ProductAddonGroupCreationFailed.prototype);
        return _this;
    }
    return ProductAddonGroupCreationFailed;
}(baseError_1.BaseError));
exports.ProductAddonGroupCreationFailed = ProductAddonGroupCreationFailed;
var ProductAddonGroupPutFailed = (function (_super) {
    tslib_1.__extends(ProductAddonGroupPutFailed, _super);
    function ProductAddonGroupPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not update product addon group'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductAddonGroupPutFailed';
        Object.setPrototypeOf(_this, ProductAddonGroupPutFailed.prototype);
        return _this;
    }
    return ProductAddonGroupPutFailed;
}(baseError_1.BaseError));
exports.ProductAddonGroupPutFailed = ProductAddonGroupPutFailed;
var ProductAddonGroupDeleteFailed = (function (_super) {
    tslib_1.__extends(ProductAddonGroupDeleteFailed, _super);
    function ProductAddonGroupDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete product addon group'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductAddonGroupDeleteFailed';
        Object.setPrototypeOf(_this, ProductAddonGroupDeleteFailed.prototype);
        return _this;
    }
    return ProductAddonGroupDeleteFailed;
}(baseError_1.BaseError));
exports.ProductAddonGroupDeleteFailed = ProductAddonGroupDeleteFailed;
//# sourceMappingURL=productAddonGroups.js.map