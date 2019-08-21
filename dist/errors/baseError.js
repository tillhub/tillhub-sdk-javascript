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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var serialize_error_1 = __importDefault(require("serialize-error"));
var BaseError = /** @class */ (function (_super) {
    __extends(BaseError, _super);
    function BaseError(message, properties) {
        var _this = _super.call(this) || this;
        _this.message = message;
        if (properties && properties.error && (properties.error instanceof Error)) {
            properties.error = serialize_error_1.default(properties.error);
        }
        _this.properties = properties;
        Object.setPrototypeOf(_this, BaseError.prototype);
        return _this;
    }
    return BaseError;
}(Error));
exports.BaseError = BaseError;
//# sourceMappingURL=baseError.js.map