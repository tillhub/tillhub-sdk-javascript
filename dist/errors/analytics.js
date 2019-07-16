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
var ReportsPaymentOptionsFetchAllFailed = /** @class */ (function (_super) {
    __extends(ReportsPaymentOptionsFetchAllFailed, _super);
    function ReportsPaymentOptionsFetchAllFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch all the payment options'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ReportsPaymentOptionsFetchAllFailed';
        return _this;
    }
    return ReportsPaymentOptionsFetchAllFailed;
}(baseError_1.BaseError));
exports.ReportsPaymentOptionsFetchAllFailed = ReportsPaymentOptionsFetchAllFailed;
var ReportsPaymentOptionsMetaFailed = /** @class */ (function (_super) {
    __extends(ReportsPaymentOptionsMetaFailed, _super);
    function ReportsPaymentOptionsMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch meta the payment options'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ReportsPaymentOptionsMetaFailed';
        return _this;
    }
    return ReportsPaymentOptionsMetaFailed;
}(baseError_1.BaseError));
exports.ReportsPaymentOptionsMetaFailed = ReportsPaymentOptionsMetaFailed;
var ReportsPaymentsFetchAllFailed = /** @class */ (function (_super) {
    __extends(ReportsPaymentsFetchAllFailed, _super);
    function ReportsPaymentsFetchAllFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch all the payments'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ReportsPaymentsFetchAllFailed';
        return _this;
    }
    return ReportsPaymentsFetchAllFailed;
}(baseError_1.BaseError));
exports.ReportsPaymentsFetchAllFailed = ReportsPaymentsFetchAllFailed;
var ReportsPaymentsMetaFailed = /** @class */ (function (_super) {
    __extends(ReportsPaymentsMetaFailed, _super);
    function ReportsPaymentsMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch meta data for payments'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ReportsPaymentsMetaFailed';
        return _this;
    }
    return ReportsPaymentsMetaFailed;
}(baseError_1.BaseError));
exports.ReportsPaymentsMetaFailed = ReportsPaymentsMetaFailed;
var VatReportFetchFailed = /** @class */ (function (_super) {
    __extends(VatReportFetchFailed, _super);
    function VatReportFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the vat report'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'VatReportFetchFailed';
        return _this;
    }
    return VatReportFetchFailed;
}(baseError_1.BaseError));
exports.VatReportFetchFailed = VatReportFetchFailed;
var VatReportFetchMetaFailed = /** @class */ (function (_super) {
    __extends(VatReportFetchMetaFailed, _super);
    function VatReportFetchMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch meta data for vat report'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'VatReportFetchMetaFailed';
        return _this;
    }
    return VatReportFetchMetaFailed;
}(baseError_1.BaseError));
exports.VatReportFetchMetaFailed = VatReportFetchMetaFailed;
var CustomerFetchFailed = /** @class */ (function (_super) {
    __extends(CustomerFetchFailed, _super);
    function CustomerFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch customer report'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CustomerFetchFailed';
        return _this;
    }
    return CustomerFetchFailed;
}(baseError_1.BaseError));
exports.CustomerFetchFailed = CustomerFetchFailed;
var CustomerFilterFetchFailed = /** @class */ (function (_super) {
    __extends(CustomerFilterFetchFailed, _super);
    function CustomerFilterFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch customer filters'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CustomerFilterFetchFailed';
        return _this;
    }
    return CustomerFilterFetchFailed;
}(baseError_1.BaseError));
exports.CustomerFilterFetchFailed = CustomerFilterFetchFailed;
var CustomerTransactionFetchFailed = /** @class */ (function (_super) {
    __extends(CustomerTransactionFetchFailed, _super);
    function CustomerTransactionFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch customer report transactions'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CustomerTransactionFetchFailed';
        return _this;
    }
    return CustomerTransactionFetchFailed;
}(baseError_1.BaseError));
exports.CustomerTransactionFetchFailed = CustomerTransactionFetchFailed;
var CustomerOverviewFetchFailed = /** @class */ (function (_super) {
    __extends(CustomerOverviewFetchFailed, _super);
    function CustomerOverviewFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch customer report overview'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CustomerOverviewFetchFailed';
        return _this;
    }
    return CustomerOverviewFetchFailed;
}(baseError_1.BaseError));
exports.CustomerOverviewFetchFailed = CustomerOverviewFetchFailed;
var CustomersMetaFailed = /** @class */ (function (_super) {
    __extends(CustomersMetaFailed, _super);
    function CustomersMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch customer report metadata'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CustomersMetaFailed';
        return _this;
    }
    return CustomersMetaFailed;
}(baseError_1.BaseError));
exports.CustomersMetaFailed = CustomersMetaFailed;
//# sourceMappingURL=analytics.js.map