"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServiceQuestionGroupsBookFailed = exports.ProductServiceQuestionGroupsPutFailed = exports.ProductServiceQuestionGroupsCreationFailed = exports.ProductServiceQuestionGroupsGetMetaFailed = exports.ProductServiceQuestionGroupsFetchOneFailed = exports.ProductServiceQuestionGroupsFetchAllFailed = void 0;
var tslib_1 = require("tslib");
var baseError_1 = require("./baseError");
var ProductServiceQuestionGroupsFetchAllFailed = /** @class */ (function (_super) {
    tslib_1.__extends(ProductServiceQuestionGroupsFetchAllFailed, _super);
    function ProductServiceQuestionGroupsFetchAllFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch all product service question groups'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductServiceQuestionGroupsFetchAllFailed';
        Object.setPrototypeOf(_this, ProductServiceQuestionGroupsFetchAllFailed.prototype);
        return _this;
    }
    return ProductServiceQuestionGroupsFetchAllFailed;
}(baseError_1.BaseError));
exports.ProductServiceQuestionGroupsFetchAllFailed = ProductServiceQuestionGroupsFetchAllFailed;
var ProductServiceQuestionGroupsFetchOneFailed = /** @class */ (function (_super) {
    tslib_1.__extends(ProductServiceQuestionGroupsFetchOneFailed, _super);
    function ProductServiceQuestionGroupsFetchOneFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch single product service question group'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductServiceQuestionGroupsFetchOneFailed';
        Object.setPrototypeOf(_this, ProductServiceQuestionGroupsFetchOneFailed.prototype);
        return _this;
    }
    return ProductServiceQuestionGroupsFetchOneFailed;
}(baseError_1.BaseError));
exports.ProductServiceQuestionGroupsFetchOneFailed = ProductServiceQuestionGroupsFetchOneFailed;
var ProductServiceQuestionGroupsGetMetaFailed = /** @class */ (function (_super) {
    tslib_1.__extends(ProductServiceQuestionGroupsGetMetaFailed, _super);
    function ProductServiceQuestionGroupsGetMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch meta data for product service question groups'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductServiceQuestionGroupsGetMetaFailed';
        Object.setPrototypeOf(_this, ProductServiceQuestionGroupsGetMetaFailed.prototype);
        return _this;
    }
    return ProductServiceQuestionGroupsGetMetaFailed;
}(baseError_1.BaseError));
exports.ProductServiceQuestionGroupsGetMetaFailed = ProductServiceQuestionGroupsGetMetaFailed;
var ProductServiceQuestionGroupsCreationFailed = /** @class */ (function (_super) {
    tslib_1.__extends(ProductServiceQuestionGroupsCreationFailed, _super);
    function ProductServiceQuestionGroupsCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create product service question groups'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductServiceQuestionGroupsCreationFailed';
        Object.setPrototypeOf(_this, ProductServiceQuestionGroupsCreationFailed.prototype);
        return _this;
    }
    return ProductServiceQuestionGroupsCreationFailed;
}(baseError_1.BaseError));
exports.ProductServiceQuestionGroupsCreationFailed = ProductServiceQuestionGroupsCreationFailed;
var ProductServiceQuestionGroupsPutFailed = /** @class */ (function (_super) {
    tslib_1.__extends(ProductServiceQuestionGroupsPutFailed, _super);
    function ProductServiceQuestionGroupsPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not update product service question groups'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductServiceQuestionGroupsPutFailed';
        Object.setPrototypeOf(_this, ProductServiceQuestionGroupsPutFailed.prototype);
        return _this;
    }
    return ProductServiceQuestionGroupsPutFailed;
}(baseError_1.BaseError));
exports.ProductServiceQuestionGroupsPutFailed = ProductServiceQuestionGroupsPutFailed;
var ProductServiceQuestionGroupsBookFailed = /** @class */ (function (_super) {
    tslib_1.__extends(ProductServiceQuestionGroupsBookFailed, _super);
    function ProductServiceQuestionGroupsBookFailed(message, properties) {
        if (message === void 0) { message = 'Could not book transfer in product service question groups'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductServiceQuestionGroupsBookFailed';
        Object.setPrototypeOf(_this, ProductServiceQuestionGroupsBookFailed.prototype);
        return _this;
    }
    return ProductServiceQuestionGroupsBookFailed;
}(baseError_1.BaseError));
exports.ProductServiceQuestionGroupsBookFailed = ProductServiceQuestionGroupsBookFailed;
//# sourceMappingURL=productServiceQuestionGroups.js.map