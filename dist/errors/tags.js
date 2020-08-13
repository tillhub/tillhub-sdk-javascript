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
exports.TagsPutFailed = exports.TagsCreationFailed = exports.TagsGetMetaFailed = exports.TagsFetchOneFailed = exports.TagsFetchAllFailed = void 0;
var baseError_1 = require("./baseError");
var TagsFetchAllFailed = /** @class */ (function (_super) {
    __extends(TagsFetchAllFailed, _super);
    function TagsFetchAllFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch all tags'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TagsFetchAllFailed';
        Object.setPrototypeOf(_this, TagsFetchAllFailed.prototype);
        return _this;
    }
    return TagsFetchAllFailed;
}(baseError_1.BaseError));
exports.TagsFetchAllFailed = TagsFetchAllFailed;
var TagsFetchOneFailed = /** @class */ (function (_super) {
    __extends(TagsFetchOneFailed, _super);
    function TagsFetchOneFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch single tag'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TagsFetchOneFailed';
        Object.setPrototypeOf(_this, TagsFetchOneFailed.prototype);
        return _this;
    }
    return TagsFetchOneFailed;
}(baseError_1.BaseError));
exports.TagsFetchOneFailed = TagsFetchOneFailed;
var TagsGetMetaFailed = /** @class */ (function (_super) {
    __extends(TagsGetMetaFailed, _super);
    function TagsGetMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch meta data for tags'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TagsGetMetaFailed';
        Object.setPrototypeOf(_this, TagsGetMetaFailed.prototype);
        return _this;
    }
    return TagsGetMetaFailed;
}(baseError_1.BaseError));
exports.TagsGetMetaFailed = TagsGetMetaFailed;
var TagsCreationFailed = /** @class */ (function (_super) {
    __extends(TagsCreationFailed, _super);
    function TagsCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create tags'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TagsCreationFailed';
        Object.setPrototypeOf(_this, TagsCreationFailed.prototype);
        return _this;
    }
    return TagsCreationFailed;
}(baseError_1.BaseError));
exports.TagsCreationFailed = TagsCreationFailed;
var TagsPutFailed = /** @class */ (function (_super) {
    __extends(TagsPutFailed, _super);
    function TagsPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not update tags'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TagsPutFailed';
        Object.setPrototypeOf(_this, TagsPutFailed.prototype);
        return _this;
    }
    return TagsPutFailed;
}(baseError_1.BaseError));
exports.TagsPutFailed = TagsPutFailed;
//# sourceMappingURL=tags.js.map