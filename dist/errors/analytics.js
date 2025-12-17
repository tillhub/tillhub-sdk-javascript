"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsGastroReservationsMetaFailed = exports.ReportsGastroReservationsFetchAllFailed = exports.CustomersMetaFailed = exports.CustomerOverviewFetchFailed = exports.CustomerTransactionFetchFailed = exports.CustomerFilterFetchFailed = exports.CustomerFetchFailed = exports.VatReportFetchMetaFailed = exports.VatReportFetchFailed = exports.ReportsPaymentsMetaFailed = exports.ReportsPaymentsFetchAllFailed = exports.ReportsPaymentOptionsMetaFailed = exports.ReportsPaymentOptionsFetchAllFailed = exports.ReportsBalancesMetaFailed = exports.ReportsBalancesFetchOneFailed = exports.ReportsBalancesFetchAllFailed = void 0;
var tslib_1 = require("tslib");
var baseError_1 = require("./baseError");
var ReportsBalancesFetchAllFailed = (function (_super) {
    tslib_1.__extends(ReportsBalancesFetchAllFailed, _super);
    function ReportsBalancesFetchAllFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch all the balances'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ReportsBalancesFetchAllFailed';
        Object.setPrototypeOf(_this, ReportsBalancesFetchAllFailed.prototype);
        return _this;
    }
    return ReportsBalancesFetchAllFailed;
}(baseError_1.BaseError));
exports.ReportsBalancesFetchAllFailed = ReportsBalancesFetchAllFailed;
var ReportsBalancesFetchOneFailed = (function (_super) {
    tslib_1.__extends(ReportsBalancesFetchOneFailed, _super);
    function ReportsBalancesFetchOneFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch one balance'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ReportsBalancesFetchOneFailed';
        Object.setPrototypeOf(_this, ReportsBalancesFetchOneFailed.prototype);
        return _this;
    }
    return ReportsBalancesFetchOneFailed;
}(baseError_1.BaseError));
exports.ReportsBalancesFetchOneFailed = ReportsBalancesFetchOneFailed;
var ReportsBalancesMetaFailed = (function (_super) {
    tslib_1.__extends(ReportsBalancesMetaFailed, _super);
    function ReportsBalancesMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch meta data for balances'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ReportsBalancesMetaFailed';
        Object.setPrototypeOf(_this, ReportsBalancesMetaFailed.prototype);
        return _this;
    }
    return ReportsBalancesMetaFailed;
}(baseError_1.BaseError));
exports.ReportsBalancesMetaFailed = ReportsBalancesMetaFailed;
var ReportsPaymentOptionsFetchAllFailed = (function (_super) {
    tslib_1.__extends(ReportsPaymentOptionsFetchAllFailed, _super);
    function ReportsPaymentOptionsFetchAllFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch all the payment options'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ReportsPaymentOptionsFetchAllFailed';
        Object.setPrototypeOf(_this, ReportsPaymentOptionsFetchAllFailed.prototype);
        return _this;
    }
    return ReportsPaymentOptionsFetchAllFailed;
}(baseError_1.BaseError));
exports.ReportsPaymentOptionsFetchAllFailed = ReportsPaymentOptionsFetchAllFailed;
var ReportsPaymentOptionsMetaFailed = (function (_super) {
    tslib_1.__extends(ReportsPaymentOptionsMetaFailed, _super);
    function ReportsPaymentOptionsMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch meta the payment options'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ReportsPaymentOptionsMetaFailed';
        Object.setPrototypeOf(_this, ReportsPaymentOptionsMetaFailed.prototype);
        return _this;
    }
    return ReportsPaymentOptionsMetaFailed;
}(baseError_1.BaseError));
exports.ReportsPaymentOptionsMetaFailed = ReportsPaymentOptionsMetaFailed;
var ReportsPaymentsFetchAllFailed = (function (_super) {
    tslib_1.__extends(ReportsPaymentsFetchAllFailed, _super);
    function ReportsPaymentsFetchAllFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch all the payments'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ReportsPaymentsFetchAllFailed';
        Object.setPrototypeOf(_this, ReportsPaymentsFetchAllFailed.prototype);
        return _this;
    }
    return ReportsPaymentsFetchAllFailed;
}(baseError_1.BaseError));
exports.ReportsPaymentsFetchAllFailed = ReportsPaymentsFetchAllFailed;
var ReportsPaymentsMetaFailed = (function (_super) {
    tslib_1.__extends(ReportsPaymentsMetaFailed, _super);
    function ReportsPaymentsMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch meta data for payments'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ReportsPaymentsMetaFailed';
        Object.setPrototypeOf(_this, ReportsPaymentsMetaFailed.prototype);
        return _this;
    }
    return ReportsPaymentsMetaFailed;
}(baseError_1.BaseError));
exports.ReportsPaymentsMetaFailed = ReportsPaymentsMetaFailed;
var VatReportFetchFailed = (function (_super) {
    tslib_1.__extends(VatReportFetchFailed, _super);
    function VatReportFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the vat report'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'VatReportFetchFailed';
        Object.setPrototypeOf(_this, VatReportFetchFailed.prototype);
        return _this;
    }
    return VatReportFetchFailed;
}(baseError_1.BaseError));
exports.VatReportFetchFailed = VatReportFetchFailed;
var VatReportFetchMetaFailed = (function (_super) {
    tslib_1.__extends(VatReportFetchMetaFailed, _super);
    function VatReportFetchMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch meta data for vat report'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'VatReportFetchMetaFailed';
        Object.setPrototypeOf(_this, VatReportFetchMetaFailed.prototype);
        return _this;
    }
    return VatReportFetchMetaFailed;
}(baseError_1.BaseError));
exports.VatReportFetchMetaFailed = VatReportFetchMetaFailed;
var CustomerFetchFailed = (function (_super) {
    tslib_1.__extends(CustomerFetchFailed, _super);
    function CustomerFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch customer report'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CustomerFetchFailed';
        Object.setPrototypeOf(_this, CustomerFetchFailed.prototype);
        return _this;
    }
    return CustomerFetchFailed;
}(baseError_1.BaseError));
exports.CustomerFetchFailed = CustomerFetchFailed;
var CustomerFilterFetchFailed = (function (_super) {
    tslib_1.__extends(CustomerFilterFetchFailed, _super);
    function CustomerFilterFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch customer filters'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CustomerFilterFetchFailed';
        Object.setPrototypeOf(_this, CustomerFilterFetchFailed.prototype);
        return _this;
    }
    return CustomerFilterFetchFailed;
}(baseError_1.BaseError));
exports.CustomerFilterFetchFailed = CustomerFilterFetchFailed;
var CustomerTransactionFetchFailed = (function (_super) {
    tslib_1.__extends(CustomerTransactionFetchFailed, _super);
    function CustomerTransactionFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch customer report transactions'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CustomerTransactionFetchFailed';
        Object.setPrototypeOf(_this, CustomerTransactionFetchFailed.prototype);
        return _this;
    }
    return CustomerTransactionFetchFailed;
}(baseError_1.BaseError));
exports.CustomerTransactionFetchFailed = CustomerTransactionFetchFailed;
var CustomerOverviewFetchFailed = (function (_super) {
    tslib_1.__extends(CustomerOverviewFetchFailed, _super);
    function CustomerOverviewFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch customer report overview'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CustomerOverviewFetchFailed';
        Object.setPrototypeOf(_this, CustomerOverviewFetchFailed.prototype);
        return _this;
    }
    return CustomerOverviewFetchFailed;
}(baseError_1.BaseError));
exports.CustomerOverviewFetchFailed = CustomerOverviewFetchFailed;
var CustomersMetaFailed = (function (_super) {
    tslib_1.__extends(CustomersMetaFailed, _super);
    function CustomersMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch customer report metadata'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CustomersMetaFailed';
        Object.setPrototypeOf(_this, CustomersMetaFailed.prototype);
        return _this;
    }
    return CustomersMetaFailed;
}(baseError_1.BaseError));
exports.CustomersMetaFailed = CustomersMetaFailed;
var ReportsGastroReservationsFetchAllFailed = (function (_super) {
    tslib_1.__extends(ReportsGastroReservationsFetchAllFailed, _super);
    function ReportsGastroReservationsFetchAllFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch all the gastro reservations'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ReportsGastroReservationsFetchAllFailed';
        Object.setPrototypeOf(_this, ReportsGastroReservationsFetchAllFailed.prototype);
        return _this;
    }
    return ReportsGastroReservationsFetchAllFailed;
}(baseError_1.BaseError));
exports.ReportsGastroReservationsFetchAllFailed = ReportsGastroReservationsFetchAllFailed;
var ReportsGastroReservationsMetaFailed = (function (_super) {
    tslib_1.__extends(ReportsGastroReservationsMetaFailed, _super);
    function ReportsGastroReservationsMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch gastro reservations report metadata'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ReportsGastroReservationsMetaFailed';
        Object.setPrototypeOf(_this, ReportsGastroReservationsMetaFailed.prototype);
        return _this;
    }
    return ReportsGastroReservationsMetaFailed;
}(baseError_1.BaseError));
exports.ReportsGastroReservationsMetaFailed = ReportsGastroReservationsMetaFailed;
//# sourceMappingURL=analytics.js.map