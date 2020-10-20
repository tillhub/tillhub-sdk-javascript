"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseError = void 0;
var tslib_1 = require("tslib");
var BaseError = (function (_super) {
    tslib_1.__extends(BaseError, _super);
    function BaseError(message, properties) {
        var _this = _super.call(this) || this;
        _this.message = message;
        _this.properties = properties;
        Object.setPrototypeOf(_this, BaseError.prototype);
        return _this;
    }
    return BaseError;
}(Error));
exports.BaseError = BaseError;
//# sourceMappingURL=baseError.js.map