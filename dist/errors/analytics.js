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
var ReportsBalancesFetchAllFailed = /** @class */ (function (_super) {
    __extends(ReportsBalancesFetchAllFailed, _super);
    function ReportsBalancesFetchAllFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch all the balances'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ReportsBalancesFetchAllFailed';
        return _this;
    }
    return ReportsBalancesFetchAllFailed;
}(baseError_1.BaseError));
exports.ReportsBalancesFetchAllFailed = ReportsBalancesFetchAllFailed;
var ReportsBalancesFetchOneFailed = /** @class */ (function (_super) {
    __extends(ReportsBalancesFetchOneFailed, _super);
    function ReportsBalancesFetchOneFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch one balance'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ReportsBalancesFetchOneFailed';
        return _this;
    }
    return ReportsBalancesFetchOneFailed;
}(baseError_1.BaseError));
exports.ReportsBalancesFetchOneFailed = ReportsBalancesFetchOneFailed;
var ReportsBalancesMetaFailed = /** @class */ (function (_super) {
    __extends(ReportsBalancesMetaFailed, _super);
    function ReportsBalancesMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch meta data for balances'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ReportsBalancesMetaFailed';
        return _this;
    }
    return ReportsBalancesMetaFailed;
}(baseError_1.BaseError));
exports.ReportsBalancesMetaFailed = ReportsBalancesMetaFailed;
//# sourceMappingURL=analytics.js.map