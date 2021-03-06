"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SafesLogBookGetMetaFailed = exports.SafesLogBookFetchAllFailed = exports.SafesBookFailed = exports.SafesPutFailed = exports.SafesCreationFailed = exports.SafesGetMetaFailed = exports.SafesFetchOneFailed = exports.SafesFetchAllFailed = void 0;
var tslib_1 = require("tslib");
var baseError_1 = require("./baseError");
var SafesFetchAllFailed = (function (_super) {
    tslib_1.__extends(SafesFetchAllFailed, _super);
    function SafesFetchAllFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch all safes'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'SafesFetchAllFailed';
        Object.setPrototypeOf(_this, SafesFetchAllFailed.prototype);
        return _this;
    }
    return SafesFetchAllFailed;
}(baseError_1.BaseError));
exports.SafesFetchAllFailed = SafesFetchAllFailed;
var SafesFetchOneFailed = (function (_super) {
    tslib_1.__extends(SafesFetchOneFailed, _super);
    function SafesFetchOneFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch single safe'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'SafesFetchOneFailed';
        Object.setPrototypeOf(_this, SafesFetchOneFailed.prototype);
        return _this;
    }
    return SafesFetchOneFailed;
}(baseError_1.BaseError));
exports.SafesFetchOneFailed = SafesFetchOneFailed;
var SafesGetMetaFailed = (function (_super) {
    tslib_1.__extends(SafesGetMetaFailed, _super);
    function SafesGetMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch meta data for safes'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'SafesGetMetaFailed';
        Object.setPrototypeOf(_this, SafesGetMetaFailed.prototype);
        return _this;
    }
    return SafesGetMetaFailed;
}(baseError_1.BaseError));
exports.SafesGetMetaFailed = SafesGetMetaFailed;
var SafesCreationFailed = (function (_super) {
    tslib_1.__extends(SafesCreationFailed, _super);
    function SafesCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create safes'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'SafesCreationFailed';
        Object.setPrototypeOf(_this, SafesCreationFailed.prototype);
        return _this;
    }
    return SafesCreationFailed;
}(baseError_1.BaseError));
exports.SafesCreationFailed = SafesCreationFailed;
var SafesPutFailed = (function (_super) {
    tslib_1.__extends(SafesPutFailed, _super);
    function SafesPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not update safes'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'SafesPutFailed';
        Object.setPrototypeOf(_this, SafesPutFailed.prototype);
        return _this;
    }
    return SafesPutFailed;
}(baseError_1.BaseError));
exports.SafesPutFailed = SafesPutFailed;
var SafesBookFailed = (function (_super) {
    tslib_1.__extends(SafesBookFailed, _super);
    function SafesBookFailed(message, properties) {
        if (message === void 0) { message = 'Could not book transfer in safes'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'SafesBookFailed';
        Object.setPrototypeOf(_this, SafesBookFailed.prototype);
        return _this;
    }
    return SafesBookFailed;
}(baseError_1.BaseError));
exports.SafesBookFailed = SafesBookFailed;
var SafesLogBookFetchAllFailed = (function (_super) {
    tslib_1.__extends(SafesLogBookFetchAllFailed, _super);
    function SafesLogBookFetchAllFailed(message, properties) {
        if (message === void 0) { message = 'Could not get safes logs'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'SafesLogBookFetchAllFailed';
        Object.setPrototypeOf(_this, SafesLogBookFetchAllFailed.prototype);
        return _this;
    }
    return SafesLogBookFetchAllFailed;
}(baseError_1.BaseError));
exports.SafesLogBookFetchAllFailed = SafesLogBookFetchAllFailed;
var SafesLogBookGetMetaFailed = (function (_super) {
    tslib_1.__extends(SafesLogBookGetMetaFailed, _super);
    function SafesLogBookGetMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not get meta of safes logs'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'SafesLogBookGetMetaFailed';
        Object.setPrototypeOf(_this, SafesLogBookGetMetaFailed.prototype);
        return _this;
    }
    return SafesLogBookGetMetaFailed;
}(baseError_1.BaseError));
exports.SafesLogBookGetMetaFailed = SafesLogBookGetMetaFailed;
//# sourceMappingURL=safes.js.map