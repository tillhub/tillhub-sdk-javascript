"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseError = /** @class */ (function () {
    function BaseError(message) {
        Error.apply(this, arguments);
    }
    return BaseError;
}());
exports.BaseError = BaseError;
BaseError.prototype = new Error();
var AuthenticationFailed = /** @class */ (function (_super) {
    __extends(AuthenticationFailed, _super);
    function AuthenticationFailed(message) {
        if (message === void 0) { message = 'Authentication was not successful'; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = 'AuthenticationFailed';
        return _this;
    }
    return AuthenticationFailed;
}(BaseError));
exports.AuthenticationFailed = AuthenticationFailed;
var UninstantiatedClient = /** @class */ (function (_super) {
    __extends(UninstantiatedClient, _super);
    function UninstantiatedClient(message) {
        if (message === void 0) { message = 'Cannot instantiate API without instantiated HTTP client'; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = 'UninstantiatedClient';
        return _this;
    }
    return UninstantiatedClient;
}(BaseError));
exports.UninstantiatedClient = UninstantiatedClient;
var TransactionFetchFailed = /** @class */ (function (_super) {
    __extends(TransactionFetchFailed, _super);
    function TransactionFetchFailed(message) {
        if (message === void 0) { message = 'Could not fetch transaction'; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = 'TransactionFetchFailed';
        return _this;
    }
    return TransactionFetchFailed;
}(BaseError));
exports.TransactionFetchFailed = TransactionFetchFailed;
var TaxesFetchFailed = /** @class */ (function (_super) {
    __extends(TaxesFetchFailed, _super);
    function TaxesFetchFailed(message) {
        if (message === void 0) { message = 'Could not fetch taxes'; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = 'TaxesFetchFailed';
        return _this;
    }
    return TaxesFetchFailed;
}(BaseError));
exports.TaxesFetchFailed = TaxesFetchFailed;
//# sourceMappingURL=Errors.js.map