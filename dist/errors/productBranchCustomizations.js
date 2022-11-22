"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductBranchCustomizationDeleteFailed = exports.ProductBranchCustomizationPutFailed = exports.ProductBranchCustomizationCreationFailed = exports.ProductBranchCustomizationsFetchAllFailed = void 0;
var tslib_1 = require("tslib");
var baseError_1 = require("./baseError");
var ProductBranchCustomizationsFetchAllFailed = (function (_super) {
    tslib_1.__extends(ProductBranchCustomizationsFetchAllFailed, _super);
    function ProductBranchCustomizationsFetchAllFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch all product branch customizations'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductBranchCustomizationsFetchAllFailed';
        Object.setPrototypeOf(_this, ProductBranchCustomizationsFetchAllFailed.prototype);
        return _this;
    }
    return ProductBranchCustomizationsFetchAllFailed;
}(baseError_1.BaseError));
exports.ProductBranchCustomizationsFetchAllFailed = ProductBranchCustomizationsFetchAllFailed;
var ProductBranchCustomizationCreationFailed = (function (_super) {
    tslib_1.__extends(ProductBranchCustomizationCreationFailed, _super);
    function ProductBranchCustomizationCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create product branch customization'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductBranchCustomizationCreationFailed';
        Object.setPrototypeOf(_this, ProductBranchCustomizationCreationFailed.prototype);
        return _this;
    }
    return ProductBranchCustomizationCreationFailed;
}(baseError_1.BaseError));
exports.ProductBranchCustomizationCreationFailed = ProductBranchCustomizationCreationFailed;
var ProductBranchCustomizationPutFailed = (function (_super) {
    tslib_1.__extends(ProductBranchCustomizationPutFailed, _super);
    function ProductBranchCustomizationPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not update product branch customization'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductBranchCustomizationPutFailed';
        Object.setPrototypeOf(_this, ProductBranchCustomizationPutFailed.prototype);
        return _this;
    }
    return ProductBranchCustomizationPutFailed;
}(baseError_1.BaseError));
exports.ProductBranchCustomizationPutFailed = ProductBranchCustomizationPutFailed;
var ProductBranchCustomizationDeleteFailed = (function (_super) {
    tslib_1.__extends(ProductBranchCustomizationDeleteFailed, _super);
    function ProductBranchCustomizationDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete product branch customization'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductBranchCustomizationDeleteFailed';
        Object.setPrototypeOf(_this, ProductBranchCustomizationDeleteFailed.prototype);
        return _this;
    }
    return ProductBranchCustomizationDeleteFailed;
}(baseError_1.BaseError));
exports.ProductBranchCustomizationDeleteFailed = ProductBranchCustomizationDeleteFailed;
//# sourceMappingURL=productBranchCustomizations.js.map