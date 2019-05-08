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
var baseError_1 = require("./baseError");
var SafesFetchAllFailed = /** @class */ (function (_super) {
    __extends(SafesFetchAllFailed, _super);
    function SafesFetchAllFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch all safes'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'SafesFetchAllFailed';
        return _this;
    }
    return SafesFetchAllFailed;
}(baseError_1.BaseError));
exports.SafesFetchAllFailed = SafesFetchAllFailed;
var SafesFetchOneFailed = /** @class */ (function (_super) {
    __extends(SafesFetchOneFailed, _super);
    function SafesFetchOneFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch single safe'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'SafesFetchOneFailed';
        return _this;
    }
    return SafesFetchOneFailed;
}(baseError_1.BaseError));
exports.SafesFetchOneFailed = SafesFetchOneFailed;
var SafesGetMetaFailed = /** @class */ (function (_super) {
    __extends(SafesGetMetaFailed, _super);
    function SafesGetMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch meta data for safes'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'SafesGetMetaFailed';
        return _this;
    }
    return SafesGetMetaFailed;
}(baseError_1.BaseError));
exports.SafesGetMetaFailed = SafesGetMetaFailed;
var SafesCreationFailed = /** @class */ (function (_super) {
    __extends(SafesCreationFailed, _super);
    function SafesCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create safes'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'SafesCreationFailed';
        return _this;
    }
    return SafesCreationFailed;
}(baseError_1.BaseError));
exports.SafesCreationFailed = SafesCreationFailed;
var SafesPutFailed = /** @class */ (function (_super) {
    __extends(SafesPutFailed, _super);
    function SafesPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not update safes'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'SafesPutFailed';
        return _this;
    }
    return SafesPutFailed;
}(baseError_1.BaseError));
exports.SafesPutFailed = SafesPutFailed;
//# sourceMappingURL=safes.js.map