"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServiceQuestionsBookFailed = exports.ProductServiceQuestionDeleteFailed = exports.ProductServiceQuestionsPutFailed = exports.ProductServiceQuestionsCreationFailed = exports.ProductServiceQuestionsGetMetaFailed = exports.ProductServiceQuestionsFetchOneFailed = exports.ProductServiceQuestionsFetchAllFailed = void 0;
var baseError_1 = require("./baseError");
var ProductServiceQuestionsFetchAllFailed = /** @class */ (function (_super) {
    __extends(ProductServiceQuestionsFetchAllFailed, _super);
    function ProductServiceQuestionsFetchAllFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch all product service question'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductServiceQuestionsFetchAllFailed';
        Object.setPrototypeOf(_this, ProductServiceQuestionsFetchAllFailed.prototype);
        return _this;
    }
    return ProductServiceQuestionsFetchAllFailed;
}(baseError_1.BaseError));
exports.ProductServiceQuestionsFetchAllFailed = ProductServiceQuestionsFetchAllFailed;
var ProductServiceQuestionsFetchOneFailed = /** @class */ (function (_super) {
    __extends(ProductServiceQuestionsFetchOneFailed, _super);
    function ProductServiceQuestionsFetchOneFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch single product service question'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductServiceQuestionsFetchOneFailed';
        Object.setPrototypeOf(_this, ProductServiceQuestionsFetchOneFailed.prototype);
        return _this;
    }
    return ProductServiceQuestionsFetchOneFailed;
}(baseError_1.BaseError));
exports.ProductServiceQuestionsFetchOneFailed = ProductServiceQuestionsFetchOneFailed;
var ProductServiceQuestionsGetMetaFailed = /** @class */ (function (_super) {
    __extends(ProductServiceQuestionsGetMetaFailed, _super);
    function ProductServiceQuestionsGetMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch meta data for product service question'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductServiceQuestionsGetMetaFailed';
        Object.setPrototypeOf(_this, ProductServiceQuestionsGetMetaFailed.prototype);
        return _this;
    }
    return ProductServiceQuestionsGetMetaFailed;
}(baseError_1.BaseError));
exports.ProductServiceQuestionsGetMetaFailed = ProductServiceQuestionsGetMetaFailed;
var ProductServiceQuestionsCreationFailed = /** @class */ (function (_super) {
    __extends(ProductServiceQuestionsCreationFailed, _super);
    function ProductServiceQuestionsCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create product service question'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductServiceQuestionsCreationFailed';
        Object.setPrototypeOf(_this, ProductServiceQuestionsCreationFailed.prototype);
        return _this;
    }
    return ProductServiceQuestionsCreationFailed;
}(baseError_1.BaseError));
exports.ProductServiceQuestionsCreationFailed = ProductServiceQuestionsCreationFailed;
var ProductServiceQuestionsPutFailed = /** @class */ (function (_super) {
    __extends(ProductServiceQuestionsPutFailed, _super);
    function ProductServiceQuestionsPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not update product service question'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductServiceQuestionsPutFailed';
        Object.setPrototypeOf(_this, ProductServiceQuestionsPutFailed.prototype);
        return _this;
    }
    return ProductServiceQuestionsPutFailed;
}(baseError_1.BaseError));
exports.ProductServiceQuestionsPutFailed = ProductServiceQuestionsPutFailed;
var ProductServiceQuestionDeleteFailed = /** @class */ (function (_super) {
    __extends(ProductServiceQuestionDeleteFailed, _super);
    function ProductServiceQuestionDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete product service question'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductServiceQuestionDeleteFailed';
        Object.setPrototypeOf(_this, ProductServiceQuestionDeleteFailed.prototype);
        return _this;
    }
    return ProductServiceQuestionDeleteFailed;
}(baseError_1.BaseError));
exports.ProductServiceQuestionDeleteFailed = ProductServiceQuestionDeleteFailed;
var ProductServiceQuestionsBookFailed = /** @class */ (function (_super) {
    __extends(ProductServiceQuestionsBookFailed, _super);
    function ProductServiceQuestionsBookFailed(message, properties) {
        if (message === void 0) { message = 'Could not book transfer in product service questions'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductServiceQuestionsBookFailed';
        Object.setPrototypeOf(_this, ProductServiceQuestionsBookFailed.prototype);
        return _this;
    }
    return ProductServiceQuestionsBookFailed;
}(baseError_1.BaseError));
exports.ProductServiceQuestionsBookFailed = ProductServiceQuestionsBookFailed;
//# sourceMappingURL=productServiceQuestions.js.map