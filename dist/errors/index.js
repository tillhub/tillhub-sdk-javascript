"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplatesCreationFailed = exports.PaymentOptionDeleteFailed = exports.PaymentOptionCreationFailed = exports.PaymentOptionPutFailed = exports.PaymentOptionFetchFailed = exports.ExpenseAccountDeleteFailed = exports.PaymentOptionsFetchFailed = exports.ExpenseAccountCreationFailed = exports.ExpenseAccountPutFailed = exports.ExpenseAccountFetchFailed = exports.ExpenseAccountsFetchFailed = exports.AccountDeleteFailed = exports.AccountCreationFailed = exports.AccountPutFailed = exports.AccountFetchFailed = exports.AccountsFetchFailed = exports.ProductGroupDeleteFailed = exports.ProuctGroupsCountFailed = exports.ProductGroupsSearchFailed = exports.ProductGroupCreationFailed = exports.ProductGroupPutFailed = exports.ProductGroupFetchFailed = exports.ProductGroupsFetchFailed = exports.DeliveryItemUpdateFailed = exports.DeliveryItemsFetchAllFailed = exports.DeliveryItemsCreateFailed = exports.DeliveriesDeleteFailed = exports.DeliveriesDispatchFailed = exports.DeliveriesInProgressFailed = exports.DeliveriesUpdateFailed = exports.DeliveriesPDFFailed = exports.DeliveriesCreateFailed = exports.DeliveriesFetchOneFailed = exports.DeliveriesFetchAllFailed = exports.TaxDeleteFailed = exports.TaxesCreationFailed = exports.TaxesPutFailed = exports.TaxesFetchFailed = exports.TransactionsGetMetaFailed = exports.TransactionSigningZeroReceiptFailed = exports.TransactionSigningMonthlyReceiptFailed = exports.TransactionSigningYearlyReceiptFailed = exports.TransactionSigningInitialisationFailed = exports.TransactionPdfFailed = exports.TransactionFetchFailed = exports.UninstantiatedClient = exports.PasswordSetRequestFailed = exports.PasswordResetRequestFailed = exports.AuthenticationFailed = exports.BaseError = void 0;
exports.StaffCountFailed = exports.ImagePutFailed = exports.ImageCreationFailed = exports.AuditActionsTypesFetchFailed = exports.AuditActionsCreateFailed = exports.AuditActionsGetMetaFailed = exports.AuditActionsFetchOneFailed = exports.AuditActionsFetchAllFailed = exports.RegistersSearchFailed = exports.RegisterDeviceConfigurationPutFailed = exports.RegisterNotificationCreateFailed = exports.RegisterPutFailed = exports.RegisterFetchFailed = exports.RegistersFetchFailed = exports.OpenOrderFetchFailed = exports.BookStockFailed = exports.HistoricOrderItemsFetchFailed = exports.OrderSuggestionsFetchFailed = exports.OrderItemsDeleteFailed = exports.OrderItemsUpdateFailed = exports.OrderItemUpdateFailed = exports.OrderItemsCreateFailed = exports.OrderItemsFetchFailed = exports.OutgoingOrdersFetchFailed = exports.IncomingOrdersFetchFailed = exports.OrdersUpdateFailed = exports.OrdersCreateFailed = exports.OrdersFetchFailed = exports.InvoicesGetMetaFailed = exports.InvoicesDeleteFailed = exports.InvoicesUpdateFailed = exports.InvoicesCreateFailed = exports.InvoicesFetchOneFailed = exports.InvoicesFetchAllFailed = exports.DiscountDeleteFailed = exports.DiscountsCountFailed = exports.DiscountCreationFailed = exports.DiscountPutFailed = exports.DiscountFetchFailed = exports.DiscountsFetchFailed = exports.ConfigurationDeleteFailed = exports.ConfigurationCreationFailed = exports.ConfigurationPatchFailed = exports.ConfigurationPutFailed = exports.InventoryConfigurationFetchFailed = exports.ConfigurationFetchFailed = exports.ConfigurationsFetchFailed = exports.TemplatesPreviewFailed = exports.TemplatesFetchFailed = exports.TemplatesPutFailed = void 0;
exports.LegacySettingUpdateFailed = exports.LegacySettingFetchFailed = exports.LegacySettingsFetchFailed = exports.BalancesMetaFailed = exports.BalancesFetchOneFailed = exports.BalancesFetchFailed = exports.MessagesUpdateFailed = exports.MessagesFetchFailed = exports.PrinterUpdateFailed = exports.PrinterDeleteFailed = exports.PrinterCreateFailed = exports.PrinterFetchFailed = exports.PrintersFetchFailed = exports.PrintMessageUpdateFailed = exports.PrintMessageDeleteFailed = exports.PrintMessageCreateFailed = exports.PrintMessageFetchFailed = exports.PrintMessagesFetchFailed = exports.PrintJobDataFetchFailed = exports.PrintJobUpdateFailed = exports.PrintJobDeleteFailed = exports.PrintJobCreateFailed = exports.PrintJobFetchFailed = exports.PrintJobsFetchFailed = exports.ProductGroupsFiltersFetchFailed = exports.NotificationsEmailError = void 0;
var tslib_1 = require("tslib");
var baseError_1 = require("./baseError");
Object.defineProperty(exports, "BaseError", { enumerable: true, get: function () { return baseError_1.BaseError; } });
var AuthenticationFailed = (function (_super) {
    tslib_1.__extends(AuthenticationFailed, _super);
    function AuthenticationFailed(message, properties) {
        if (message === void 0) { message = 'Authentication was not successful'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AuthenticationFailed';
        Object.setPrototypeOf(_this, AuthenticationFailed.prototype);
        return _this;
    }
    return AuthenticationFailed;
}(baseError_1.BaseError));
exports.AuthenticationFailed = AuthenticationFailed;
var PasswordResetRequestFailed = (function (_super) {
    tslib_1.__extends(PasswordResetRequestFailed, _super);
    function PasswordResetRequestFailed(message, properties) {
        if (message === void 0) { message = 'Could not reset password'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PasswordResetRequestFailed';
        Object.setPrototypeOf(_this, PasswordResetRequestFailed.prototype);
        return _this;
    }
    return PasswordResetRequestFailed;
}(baseError_1.BaseError));
exports.PasswordResetRequestFailed = PasswordResetRequestFailed;
var PasswordSetRequestFailed = (function (_super) {
    tslib_1.__extends(PasswordSetRequestFailed, _super);
    function PasswordSetRequestFailed(message, properties) {
        if (message === void 0) { message = 'Could not set password'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PasswordSetRequestFailed';
        Object.setPrototypeOf(_this, PasswordSetRequestFailed.prototype);
        return _this;
    }
    return PasswordSetRequestFailed;
}(baseError_1.BaseError));
exports.PasswordSetRequestFailed = PasswordSetRequestFailed;
var UninstantiatedClient = (function (_super) {
    tslib_1.__extends(UninstantiatedClient, _super);
    function UninstantiatedClient(message, properties) {
        if (message === void 0) { message = 'Cannot instantiate API without instantiated HTTP client'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'UninstantiatedClient';
        Object.setPrototypeOf(_this, UninstantiatedClient.prototype);
        return _this;
    }
    return UninstantiatedClient;
}(baseError_1.BaseError));
exports.UninstantiatedClient = UninstantiatedClient;
var TransactionFetchFailed = (function (_super) {
    tslib_1.__extends(TransactionFetchFailed, _super);
    function TransactionFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch transaction'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TransactionFetchFailed';
        Object.setPrototypeOf(_this, TransactionFetchFailed.prototype);
        return _this;
    }
    return TransactionFetchFailed;
}(baseError_1.BaseError));
exports.TransactionFetchFailed = TransactionFetchFailed;
var TransactionPdfFailed = (function (_super) {
    tslib_1.__extends(TransactionPdfFailed, _super);
    function TransactionPdfFailed(message, properties) {
        if (message === void 0) { message = 'Could not create pdf'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TransactionPdfFailed';
        Object.setPrototypeOf(_this, TransactionPdfFailed.prototype);
        return _this;
    }
    return TransactionPdfFailed;
}(baseError_1.BaseError));
exports.TransactionPdfFailed = TransactionPdfFailed;
var TransactionSigningInitialisationFailed = (function (_super) {
    tslib_1.__extends(TransactionSigningInitialisationFailed, _super);
    function TransactionSigningInitialisationFailed(message, properties) {
        if (message === void 0) { message = 'Could not initialise signing system'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TransactionSigningInitialisationFailed';
        Object.setPrototypeOf(_this, TransactionSigningInitialisationFailed.prototype);
        return _this;
    }
    return TransactionSigningInitialisationFailed;
}(baseError_1.BaseError));
exports.TransactionSigningInitialisationFailed = TransactionSigningInitialisationFailed;
var TransactionSigningYearlyReceiptFailed = (function (_super) {
    tslib_1.__extends(TransactionSigningYearlyReceiptFailed, _super);
    function TransactionSigningYearlyReceiptFailed(message, properties) {
        if (message === void 0) { message = 'Could not generate yearly receipt'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TransactionSigningYearlyReceiptFailed';
        Object.setPrototypeOf(_this, TransactionSigningYearlyReceiptFailed.prototype);
        return _this;
    }
    return TransactionSigningYearlyReceiptFailed;
}(baseError_1.BaseError));
exports.TransactionSigningYearlyReceiptFailed = TransactionSigningYearlyReceiptFailed;
var TransactionSigningMonthlyReceiptFailed = (function (_super) {
    tslib_1.__extends(TransactionSigningMonthlyReceiptFailed, _super);
    function TransactionSigningMonthlyReceiptFailed(message, properties) {
        if (message === void 0) { message = 'Could not generate monthly receipt'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TransactionSigningMonthlyReceiptFailed';
        Object.setPrototypeOf(_this, TransactionSigningMonthlyReceiptFailed.prototype);
        return _this;
    }
    return TransactionSigningMonthlyReceiptFailed;
}(baseError_1.BaseError));
exports.TransactionSigningMonthlyReceiptFailed = TransactionSigningMonthlyReceiptFailed;
var TransactionSigningZeroReceiptFailed = (function (_super) {
    tslib_1.__extends(TransactionSigningZeroReceiptFailed, _super);
    function TransactionSigningZeroReceiptFailed(message, properties) {
        if (message === void 0) { message = 'Could not generate zero receipt'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TransactionSigningZeroReceiptFailed';
        Object.setPrototypeOf(_this, TransactionSigningZeroReceiptFailed.prototype);
        return _this;
    }
    return TransactionSigningZeroReceiptFailed;
}(baseError_1.BaseError));
exports.TransactionSigningZeroReceiptFailed = TransactionSigningZeroReceiptFailed;
var TransactionsGetMetaFailed = (function (_super) {
    tslib_1.__extends(TransactionsGetMetaFailed, _super);
    function TransactionsGetMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not get transactions meta'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TransactionsGetMetaFailed';
        Object.setPrototypeOf(_this, TransactionsGetMetaFailed.prototype);
        return _this;
    }
    return TransactionsGetMetaFailed;
}(baseError_1.BaseError));
exports.TransactionsGetMetaFailed = TransactionsGetMetaFailed;
var TaxesFetchFailed = (function (_super) {
    tslib_1.__extends(TaxesFetchFailed, _super);
    function TaxesFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch taxes'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TaxesFetchFailed';
        Object.setPrototypeOf(_this, TaxesFetchFailed.prototype);
        return _this;
    }
    return TaxesFetchFailed;
}(baseError_1.BaseError));
exports.TaxesFetchFailed = TaxesFetchFailed;
var TaxesPutFailed = (function (_super) {
    tslib_1.__extends(TaxesPutFailed, _super);
    function TaxesPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter tax'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TaxesPutFailed';
        Object.setPrototypeOf(_this, TaxesPutFailed.prototype);
        return _this;
    }
    return TaxesPutFailed;
}(baseError_1.BaseError));
exports.TaxesPutFailed = TaxesPutFailed;
var TaxesCreationFailed = (function (_super) {
    tslib_1.__extends(TaxesCreationFailed, _super);
    function TaxesCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create tax'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TaxesCreationFailed';
        Object.setPrototypeOf(_this, TaxesCreationFailed.prototype);
        return _this;
    }
    return TaxesCreationFailed;
}(baseError_1.BaseError));
exports.TaxesCreationFailed = TaxesCreationFailed;
var TaxDeleteFailed = (function (_super) {
    tslib_1.__extends(TaxDeleteFailed, _super);
    function TaxDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete tax'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TaxDeleteFailed';
        Object.setPrototypeOf(_this, TaxDeleteFailed.prototype);
        return _this;
    }
    return TaxDeleteFailed;
}(baseError_1.BaseError));
exports.TaxDeleteFailed = TaxDeleteFailed;
var DeliveriesFetchAllFailed = (function (_super) {
    tslib_1.__extends(DeliveriesFetchAllFailed, _super);
    function DeliveriesFetchAllFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch deliveries'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DeliveriesFetchAllFailed';
        Object.setPrototypeOf(_this, DeliveriesFetchAllFailed.prototype);
        return _this;
    }
    return DeliveriesFetchAllFailed;
}(baseError_1.BaseError));
exports.DeliveriesFetchAllFailed = DeliveriesFetchAllFailed;
var DeliveriesFetchOneFailed = (function (_super) {
    tslib_1.__extends(DeliveriesFetchOneFailed, _super);
    function DeliveriesFetchOneFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch delivery'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DeliveriesFetchOneFailed';
        Object.setPrototypeOf(_this, DeliveriesFetchOneFailed.prototype);
        return _this;
    }
    return DeliveriesFetchOneFailed;
}(baseError_1.BaseError));
exports.DeliveriesFetchOneFailed = DeliveriesFetchOneFailed;
var DeliveriesCreateFailed = (function (_super) {
    tslib_1.__extends(DeliveriesCreateFailed, _super);
    function DeliveriesCreateFailed(message, properties) {
        if (message === void 0) { message = 'Could not create delivery'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DeliveriesCreateFailed';
        Object.setPrototypeOf(_this, DeliveriesCreateFailed.prototype);
        return _this;
    }
    return DeliveriesCreateFailed;
}(baseError_1.BaseError));
exports.DeliveriesCreateFailed = DeliveriesCreateFailed;
var DeliveriesPDFFailed = (function (_super) {
    tslib_1.__extends(DeliveriesPDFFailed, _super);
    function DeliveriesPDFFailed(message, properties) {
        if (message === void 0) { message = 'Could not create PDF for delivery'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DeliveriesPDFFailed';
        Object.setPrototypeOf(_this, DeliveriesPDFFailed.prototype);
        return _this;
    }
    return DeliveriesPDFFailed;
}(baseError_1.BaseError));
exports.DeliveriesPDFFailed = DeliveriesPDFFailed;
var DeliveriesUpdateFailed = (function (_super) {
    tslib_1.__extends(DeliveriesUpdateFailed, _super);
    function DeliveriesUpdateFailed(message, properties) {
        if (message === void 0) { message = 'Could not update delivery'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DeliveriesUpdateFailed';
        Object.setPrototypeOf(_this, DeliveriesUpdateFailed.prototype);
        return _this;
    }
    return DeliveriesUpdateFailed;
}(baseError_1.BaseError));
exports.DeliveriesUpdateFailed = DeliveriesUpdateFailed;
var DeliveriesInProgressFailed = (function (_super) {
    tslib_1.__extends(DeliveriesInProgressFailed, _super);
    function DeliveriesInProgressFailed(message, properties) {
        if (message === void 0) { message = 'Could not change delivery status to "in_progress'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DeliveriesInProgressFailed';
        Object.setPrototypeOf(_this, DeliveriesInProgressFailed.prototype);
        return _this;
    }
    return DeliveriesInProgressFailed;
}(baseError_1.BaseError));
exports.DeliveriesInProgressFailed = DeliveriesInProgressFailed;
var DeliveriesDispatchFailed = (function (_super) {
    tslib_1.__extends(DeliveriesDispatchFailed, _super);
    function DeliveriesDispatchFailed(message, properties) {
        if (message === void 0) { message = 'Could not change delivery status to "in_progress'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DeliveriesDispatchFailed';
        Object.setPrototypeOf(_this, DeliveriesDispatchFailed.prototype);
        return _this;
    }
    return DeliveriesDispatchFailed;
}(baseError_1.BaseError));
exports.DeliveriesDispatchFailed = DeliveriesDispatchFailed;
var DeliveriesDeleteFailed = (function (_super) {
    tslib_1.__extends(DeliveriesDeleteFailed, _super);
    function DeliveriesDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete delivery'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DeliveriesDeleteFailed';
        Object.setPrototypeOf(_this, DeliveriesDeleteFailed.prototype);
        return _this;
    }
    return DeliveriesDeleteFailed;
}(baseError_1.BaseError));
exports.DeliveriesDeleteFailed = DeliveriesDeleteFailed;
var DeliveryItemsCreateFailed = (function (_super) {
    tslib_1.__extends(DeliveryItemsCreateFailed, _super);
    function DeliveryItemsCreateFailed(message, properties) {
        if (message === void 0) { message = 'Could not create delivery items'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DeliveryItemsCreateFailed';
        Object.setPrototypeOf(_this, DeliveryItemsCreateFailed.prototype);
        return _this;
    }
    return DeliveryItemsCreateFailed;
}(baseError_1.BaseError));
exports.DeliveryItemsCreateFailed = DeliveryItemsCreateFailed;
var DeliveryItemsFetchAllFailed = (function (_super) {
    tslib_1.__extends(DeliveryItemsFetchAllFailed, _super);
    function DeliveryItemsFetchAllFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch delivery items'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DeliveryItemsFetchAllFailed';
        Object.setPrototypeOf(_this, DeliveryItemsFetchAllFailed.prototype);
        return _this;
    }
    return DeliveryItemsFetchAllFailed;
}(baseError_1.BaseError));
exports.DeliveryItemsFetchAllFailed = DeliveryItemsFetchAllFailed;
var DeliveryItemUpdateFailed = (function (_super) {
    tslib_1.__extends(DeliveryItemUpdateFailed, _super);
    function DeliveryItemUpdateFailed(message, properties) {
        if (message === void 0) { message = 'Could not update delivery'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DeliveryItemUpdateFailed';
        Object.setPrototypeOf(_this, DeliveryItemUpdateFailed.prototype);
        return _this;
    }
    return DeliveryItemUpdateFailed;
}(baseError_1.BaseError));
exports.DeliveryItemUpdateFailed = DeliveryItemUpdateFailed;
var ProductGroupsFetchFailed = (function (_super) {
    tslib_1.__extends(ProductGroupsFetchFailed, _super);
    function ProductGroupsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch product groups'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductGroupsFetchFailed';
        Object.setPrototypeOf(_this, ProductGroupsFetchFailed.prototype);
        return _this;
    }
    return ProductGroupsFetchFailed;
}(baseError_1.BaseError));
exports.ProductGroupsFetchFailed = ProductGroupsFetchFailed;
var ProductGroupFetchFailed = (function (_super) {
    tslib_1.__extends(ProductGroupFetchFailed, _super);
    function ProductGroupFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch product group'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductGroupFetchFailed';
        Object.setPrototypeOf(_this, ProductGroupFetchFailed.prototype);
        return _this;
    }
    return ProductGroupFetchFailed;
}(baseError_1.BaseError));
exports.ProductGroupFetchFailed = ProductGroupFetchFailed;
var ProductGroupPutFailed = (function (_super) {
    tslib_1.__extends(ProductGroupPutFailed, _super);
    function ProductGroupPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter product group'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductGroupPutFailed';
        Object.setPrototypeOf(_this, ProductGroupPutFailed.prototype);
        return _this;
    }
    return ProductGroupPutFailed;
}(baseError_1.BaseError));
exports.ProductGroupPutFailed = ProductGroupPutFailed;
var ProductGroupCreationFailed = (function (_super) {
    tslib_1.__extends(ProductGroupCreationFailed, _super);
    function ProductGroupCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create product group'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductGroupCreationFailed';
        Object.setPrototypeOf(_this, ProductGroupCreationFailed.prototype);
        return _this;
    }
    return ProductGroupCreationFailed;
}(baseError_1.BaseError));
exports.ProductGroupCreationFailed = ProductGroupCreationFailed;
var ProductGroupsSearchFailed = (function (_super) {
    tslib_1.__extends(ProductGroupsSearchFailed, _super);
    function ProductGroupsSearchFailed(message, properties) {
        if (message === void 0) { message = 'Could not search product group'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductGroupsSearchFailed';
        Object.setPrototypeOf(_this, ProductGroupsSearchFailed.prototype);
        return _this;
    }
    return ProductGroupsSearchFailed;
}(baseError_1.BaseError));
exports.ProductGroupsSearchFailed = ProductGroupsSearchFailed;
var ProuctGroupsCountFailed = (function (_super) {
    tslib_1.__extends(ProuctGroupsCountFailed, _super);
    function ProuctGroupsCountFailed(message, properties) {
        if (message === void 0) { message = 'Could not get count of product groups'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProuctGroupsCountFailed';
        Object.setPrototypeOf(_this, ProuctGroupsCountFailed.prototype);
        return _this;
    }
    return ProuctGroupsCountFailed;
}(baseError_1.BaseError));
exports.ProuctGroupsCountFailed = ProuctGroupsCountFailed;
var ProductGroupDeleteFailed = (function (_super) {
    tslib_1.__extends(ProductGroupDeleteFailed, _super);
    function ProductGroupDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete product group'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductGroupDeleteFailed';
        Object.setPrototypeOf(_this, ProductGroupDeleteFailed.prototype);
        return _this;
    }
    return ProductGroupDeleteFailed;
}(baseError_1.BaseError));
exports.ProductGroupDeleteFailed = ProductGroupDeleteFailed;
var AccountsFetchFailed = (function (_super) {
    tslib_1.__extends(AccountsFetchFailed, _super);
    function AccountsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch accounts'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AccountsFetchFailed';
        Object.setPrototypeOf(_this, AccountsFetchFailed.prototype);
        return _this;
    }
    return AccountsFetchFailed;
}(baseError_1.BaseError));
exports.AccountsFetchFailed = AccountsFetchFailed;
var AccountFetchFailed = (function (_super) {
    tslib_1.__extends(AccountFetchFailed, _super);
    function AccountFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch account'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AccountFetchFailed';
        Object.setPrototypeOf(_this, AccountFetchFailed.prototype);
        return _this;
    }
    return AccountFetchFailed;
}(baseError_1.BaseError));
exports.AccountFetchFailed = AccountFetchFailed;
var AccountPutFailed = (function (_super) {
    tslib_1.__extends(AccountPutFailed, _super);
    function AccountPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter account'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AccountPutFailed';
        Object.setPrototypeOf(_this, AccountPutFailed.prototype);
        return _this;
    }
    return AccountPutFailed;
}(baseError_1.BaseError));
exports.AccountPutFailed = AccountPutFailed;
var AccountCreationFailed = (function (_super) {
    tslib_1.__extends(AccountCreationFailed, _super);
    function AccountCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create account'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AccountCreationFailed';
        Object.setPrototypeOf(_this, AccountCreationFailed.prototype);
        return _this;
    }
    return AccountCreationFailed;
}(baseError_1.BaseError));
exports.AccountCreationFailed = AccountCreationFailed;
var AccountDeleteFailed = (function (_super) {
    tslib_1.__extends(AccountDeleteFailed, _super);
    function AccountDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete account'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AccountDeleteFailed';
        Object.setPrototypeOf(_this, AccountDeleteFailed.prototype);
        return _this;
    }
    return AccountDeleteFailed;
}(baseError_1.BaseError));
exports.AccountDeleteFailed = AccountDeleteFailed;
var ExpenseAccountsFetchFailed = (function (_super) {
    tslib_1.__extends(ExpenseAccountsFetchFailed, _super);
    function ExpenseAccountsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch expense accounts'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ExpenseAccountsFetchFailed';
        Object.setPrototypeOf(_this, ExpenseAccountsFetchFailed.prototype);
        return _this;
    }
    return ExpenseAccountsFetchFailed;
}(baseError_1.BaseError));
exports.ExpenseAccountsFetchFailed = ExpenseAccountsFetchFailed;
var ExpenseAccountFetchFailed = (function (_super) {
    tslib_1.__extends(ExpenseAccountFetchFailed, _super);
    function ExpenseAccountFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch expense account'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ExpenseAccountFetchFailed';
        Object.setPrototypeOf(_this, ExpenseAccountFetchFailed.prototype);
        return _this;
    }
    return ExpenseAccountFetchFailed;
}(baseError_1.BaseError));
exports.ExpenseAccountFetchFailed = ExpenseAccountFetchFailed;
var ExpenseAccountPutFailed = (function (_super) {
    tslib_1.__extends(ExpenseAccountPutFailed, _super);
    function ExpenseAccountPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter expense account'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ExpenseAccountPutFailed';
        Object.setPrototypeOf(_this, ExpenseAccountPutFailed.prototype);
        return _this;
    }
    return ExpenseAccountPutFailed;
}(baseError_1.BaseError));
exports.ExpenseAccountPutFailed = ExpenseAccountPutFailed;
var ExpenseAccountCreationFailed = (function (_super) {
    tslib_1.__extends(ExpenseAccountCreationFailed, _super);
    function ExpenseAccountCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create expense account'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ExpenseAccountCreationFailed';
        Object.setPrototypeOf(_this, ExpenseAccountCreationFailed.prototype);
        return _this;
    }
    return ExpenseAccountCreationFailed;
}(baseError_1.BaseError));
exports.ExpenseAccountCreationFailed = ExpenseAccountCreationFailed;
var PaymentOptionsFetchFailed = (function (_super) {
    tslib_1.__extends(PaymentOptionsFetchFailed, _super);
    function PaymentOptionsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch payment option'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PaymentOptionsFetchFailed';
        Object.setPrototypeOf(_this, PaymentOptionsFetchFailed.prototype);
        return _this;
    }
    return PaymentOptionsFetchFailed;
}(baseError_1.BaseError));
exports.PaymentOptionsFetchFailed = PaymentOptionsFetchFailed;
var ExpenseAccountDeleteFailed = (function (_super) {
    tslib_1.__extends(ExpenseAccountDeleteFailed, _super);
    function ExpenseAccountDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete expense account'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ExpenseAccountDeleteFailed';
        Object.setPrototypeOf(_this, ExpenseAccountDeleteFailed.prototype);
        return _this;
    }
    return ExpenseAccountDeleteFailed;
}(baseError_1.BaseError));
exports.ExpenseAccountDeleteFailed = ExpenseAccountDeleteFailed;
var PaymentOptionFetchFailed = (function (_super) {
    tslib_1.__extends(PaymentOptionFetchFailed, _super);
    function PaymentOptionFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch payment option'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PaymentOptionFetchFailed';
        Object.setPrototypeOf(_this, PaymentOptionFetchFailed.prototype);
        return _this;
    }
    return PaymentOptionFetchFailed;
}(baseError_1.BaseError));
exports.PaymentOptionFetchFailed = PaymentOptionFetchFailed;
var PaymentOptionPutFailed = (function (_super) {
    tslib_1.__extends(PaymentOptionPutFailed, _super);
    function PaymentOptionPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter payment option'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PaymentOptionPutFailed';
        Object.setPrototypeOf(_this, PaymentOptionPutFailed.prototype);
        return _this;
    }
    return PaymentOptionPutFailed;
}(baseError_1.BaseError));
exports.PaymentOptionPutFailed = PaymentOptionPutFailed;
var PaymentOptionCreationFailed = (function (_super) {
    tslib_1.__extends(PaymentOptionCreationFailed, _super);
    function PaymentOptionCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create payment option'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PaymentOptionCreationFailed';
        Object.setPrototypeOf(_this, PaymentOptionCreationFailed.prototype);
        return _this;
    }
    return PaymentOptionCreationFailed;
}(baseError_1.BaseError));
exports.PaymentOptionCreationFailed = PaymentOptionCreationFailed;
var PaymentOptionDeleteFailed = (function (_super) {
    tslib_1.__extends(PaymentOptionDeleteFailed, _super);
    function PaymentOptionDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete payment option'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PaymentOptionDeleteFailed';
        Object.setPrototypeOf(_this, PaymentOptionDeleteFailed.prototype);
        return _this;
    }
    return PaymentOptionDeleteFailed;
}(baseError_1.BaseError));
exports.PaymentOptionDeleteFailed = PaymentOptionDeleteFailed;
var TemplatesCreationFailed = (function (_super) {
    tslib_1.__extends(TemplatesCreationFailed, _super);
    function TemplatesCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create template'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TemplatesCreationFailed';
        Object.setPrototypeOf(_this, TemplatesCreationFailed.prototype);
        return _this;
    }
    return TemplatesCreationFailed;
}(baseError_1.BaseError));
exports.TemplatesCreationFailed = TemplatesCreationFailed;
var TemplatesPutFailed = (function (_super) {
    tslib_1.__extends(TemplatesPutFailed, _super);
    function TemplatesPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not replace template'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TemplatesPutFailed';
        Object.setPrototypeOf(_this, TemplatesPutFailed.prototype);
        return _this;
    }
    return TemplatesPutFailed;
}(baseError_1.BaseError));
exports.TemplatesPutFailed = TemplatesPutFailed;
var TemplatesFetchFailed = (function (_super) {
    tslib_1.__extends(TemplatesFetchFailed, _super);
    function TemplatesFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch templates'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TemplatesFetchFailed';
        Object.setPrototypeOf(_this, TemplatesFetchFailed.prototype);
        return _this;
    }
    return TemplatesFetchFailed;
}(baseError_1.BaseError));
exports.TemplatesFetchFailed = TemplatesFetchFailed;
var TemplatesPreviewFailed = (function (_super) {
    tslib_1.__extends(TemplatesPreviewFailed, _super);
    function TemplatesPreviewFailed(message, properties) {
        if (message === void 0) { message = 'Could not preview template'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TemplatesPreviewFailed';
        Object.setPrototypeOf(_this, TemplatesPreviewFailed.prototype);
        return _this;
    }
    return TemplatesPreviewFailed;
}(baseError_1.BaseError));
exports.TemplatesPreviewFailed = TemplatesPreviewFailed;
var ConfigurationsFetchFailed = (function (_super) {
    tslib_1.__extends(ConfigurationsFetchFailed, _super);
    function ConfigurationsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch configurations'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ConfigurationsFetchFailed';
        Object.setPrototypeOf(_this, ConfigurationsFetchFailed.prototype);
        return _this;
    }
    return ConfigurationsFetchFailed;
}(baseError_1.BaseError));
exports.ConfigurationsFetchFailed = ConfigurationsFetchFailed;
var ConfigurationFetchFailed = (function (_super) {
    tslib_1.__extends(ConfigurationFetchFailed, _super);
    function ConfigurationFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch configuration'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ConfigurationFetchFailed';
        Object.setPrototypeOf(_this, ConfigurationFetchFailed.prototype);
        return _this;
    }
    return ConfigurationFetchFailed;
}(baseError_1.BaseError));
exports.ConfigurationFetchFailed = ConfigurationFetchFailed;
var InventoryConfigurationFetchFailed = (function (_super) {
    tslib_1.__extends(InventoryConfigurationFetchFailed, _super);
    function InventoryConfigurationFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch inventory configuration'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'InventoryConfigurationFetchFailed';
        Object.setPrototypeOf(_this, InventoryConfigurationFetchFailed.prototype);
        return _this;
    }
    return InventoryConfigurationFetchFailed;
}(baseError_1.BaseError));
exports.InventoryConfigurationFetchFailed = InventoryConfigurationFetchFailed;
var ConfigurationPutFailed = (function (_super) {
    tslib_1.__extends(ConfigurationPutFailed, _super);
    function ConfigurationPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter configuration'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ConfigurationPutFailed';
        Object.setPrototypeOf(_this, ConfigurationPutFailed.prototype);
        return _this;
    }
    return ConfigurationPutFailed;
}(baseError_1.BaseError));
exports.ConfigurationPutFailed = ConfigurationPutFailed;
var ConfigurationPatchFailed = (function (_super) {
    tslib_1.__extends(ConfigurationPatchFailed, _super);
    function ConfigurationPatchFailed(message, properties) {
        if (message === void 0) { message = 'Could not patch configuration'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ConfigurationPatchFailed';
        Object.setPrototypeOf(_this, ConfigurationPatchFailed.prototype);
        return _this;
    }
    return ConfigurationPatchFailed;
}(baseError_1.BaseError));
exports.ConfigurationPatchFailed = ConfigurationPatchFailed;
var ConfigurationCreationFailed = (function (_super) {
    tslib_1.__extends(ConfigurationCreationFailed, _super);
    function ConfigurationCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create configuration'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ConfigurationCreationFailed';
        Object.setPrototypeOf(_this, ConfigurationCreationFailed.prototype);
        return _this;
    }
    return ConfigurationCreationFailed;
}(baseError_1.BaseError));
exports.ConfigurationCreationFailed = ConfigurationCreationFailed;
var ConfigurationDeleteFailed = (function (_super) {
    tslib_1.__extends(ConfigurationDeleteFailed, _super);
    function ConfigurationDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete configuration'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ConfigurationDeleteFailed';
        Object.setPrototypeOf(_this, ConfigurationDeleteFailed.prototype);
        return _this;
    }
    return ConfigurationDeleteFailed;
}(baseError_1.BaseError));
exports.ConfigurationDeleteFailed = ConfigurationDeleteFailed;
var DiscountsFetchFailed = (function (_super) {
    tslib_1.__extends(DiscountsFetchFailed, _super);
    function DiscountsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch discounts'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DiscountsFetchFailed';
        Object.setPrototypeOf(_this, DiscountsFetchFailed.prototype);
        return _this;
    }
    return DiscountsFetchFailed;
}(baseError_1.BaseError));
exports.DiscountsFetchFailed = DiscountsFetchFailed;
var DiscountFetchFailed = (function (_super) {
    tslib_1.__extends(DiscountFetchFailed, _super);
    function DiscountFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch discount'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DiscountFetchFailed';
        Object.setPrototypeOf(_this, DiscountFetchFailed.prototype);
        return _this;
    }
    return DiscountFetchFailed;
}(baseError_1.BaseError));
exports.DiscountFetchFailed = DiscountFetchFailed;
var DiscountPutFailed = (function (_super) {
    tslib_1.__extends(DiscountPutFailed, _super);
    function DiscountPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter discount'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DiscountPutFailed';
        Object.setPrototypeOf(_this, DiscountPutFailed.prototype);
        return _this;
    }
    return DiscountPutFailed;
}(baseError_1.BaseError));
exports.DiscountPutFailed = DiscountPutFailed;
var DiscountCreationFailed = (function (_super) {
    tslib_1.__extends(DiscountCreationFailed, _super);
    function DiscountCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create discount'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DiscountCreationFailed';
        Object.setPrototypeOf(_this, DiscountCreationFailed.prototype);
        return _this;
    }
    return DiscountCreationFailed;
}(baseError_1.BaseError));
exports.DiscountCreationFailed = DiscountCreationFailed;
var DiscountsCountFailed = (function (_super) {
    tslib_1.__extends(DiscountsCountFailed, _super);
    function DiscountsCountFailed(message, properties) {
        if (message === void 0) { message = 'Could not count discounts'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DiscountsCountFailed';
        Object.setPrototypeOf(_this, DiscountsCountFailed.prototype);
        return _this;
    }
    return DiscountsCountFailed;
}(baseError_1.BaseError));
exports.DiscountsCountFailed = DiscountsCountFailed;
var DiscountDeleteFailed = (function (_super) {
    tslib_1.__extends(DiscountDeleteFailed, _super);
    function DiscountDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete discount'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DiscountDeleteFailed';
        Object.setPrototypeOf(_this, DiscountDeleteFailed.prototype);
        return _this;
    }
    return DiscountDeleteFailed;
}(baseError_1.BaseError));
exports.DiscountDeleteFailed = DiscountDeleteFailed;
var InvoicesFetchAllFailed = (function (_super) {
    tslib_1.__extends(InvoicesFetchAllFailed, _super);
    function InvoicesFetchAllFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch invoices'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'InvoicesFetchAllFailed';
        Object.setPrototypeOf(_this, InvoicesFetchAllFailed.prototype);
        return _this;
    }
    return InvoicesFetchAllFailed;
}(baseError_1.BaseError));
exports.InvoicesFetchAllFailed = InvoicesFetchAllFailed;
var InvoicesFetchOneFailed = (function (_super) {
    tslib_1.__extends(InvoicesFetchOneFailed, _super);
    function InvoicesFetchOneFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the invoice'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'InvoicesFetchOneFailed';
        Object.setPrototypeOf(_this, InvoicesFetchOneFailed.prototype);
        return _this;
    }
    return InvoicesFetchOneFailed;
}(baseError_1.BaseError));
exports.InvoicesFetchOneFailed = InvoicesFetchOneFailed;
var InvoicesCreateFailed = (function (_super) {
    tslib_1.__extends(InvoicesCreateFailed, _super);
    function InvoicesCreateFailed(message, properties) {
        if (message === void 0) { message = 'Could not create invoice'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'InvoicesCreateFailed';
        Object.setPrototypeOf(_this, InvoicesCreateFailed.prototype);
        return _this;
    }
    return InvoicesCreateFailed;
}(baseError_1.BaseError));
exports.InvoicesCreateFailed = InvoicesCreateFailed;
var InvoicesUpdateFailed = (function (_super) {
    tslib_1.__extends(InvoicesUpdateFailed, _super);
    function InvoicesUpdateFailed(message, properties) {
        if (message === void 0) { message = 'Could not update invoice'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'InvoicesUpdateFailed';
        Object.setPrototypeOf(_this, InvoicesUpdateFailed.prototype);
        return _this;
    }
    return InvoicesUpdateFailed;
}(baseError_1.BaseError));
exports.InvoicesUpdateFailed = InvoicesUpdateFailed;
var InvoicesDeleteFailed = (function (_super) {
    tslib_1.__extends(InvoicesDeleteFailed, _super);
    function InvoicesDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete invoice'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'InvoicesDeleteFailed';
        Object.setPrototypeOf(_this, InvoicesDeleteFailed.prototype);
        return _this;
    }
    return InvoicesDeleteFailed;
}(baseError_1.BaseError));
exports.InvoicesDeleteFailed = InvoicesDeleteFailed;
var InvoicesGetMetaFailed = (function (_super) {
    tslib_1.__extends(InvoicesGetMetaFailed, _super);
    function InvoicesGetMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not get invoice meta'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'InvoicesGetMetaFailed';
        Object.setPrototypeOf(_this, InvoicesGetMetaFailed.prototype);
        return _this;
    }
    return InvoicesGetMetaFailed;
}(baseError_1.BaseError));
exports.InvoicesGetMetaFailed = InvoicesGetMetaFailed;
var OrdersFetchFailed = (function (_super) {
    tslib_1.__extends(OrdersFetchFailed, _super);
    function OrdersFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the orders'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'OrdersFetchFailed';
        Object.setPrototypeOf(_this, OrdersFetchFailed.prototype);
        return _this;
    }
    return OrdersFetchFailed;
}(baseError_1.BaseError));
exports.OrdersFetchFailed = OrdersFetchFailed;
var OrdersCreateFailed = (function (_super) {
    tslib_1.__extends(OrdersCreateFailed, _super);
    function OrdersCreateFailed(message, properties) {
        if (message === void 0) { message = 'Could not create the orders'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'OrdersCreateFailed';
        Object.setPrototypeOf(_this, OrdersCreateFailed.prototype);
        return _this;
    }
    return OrdersCreateFailed;
}(baseError_1.BaseError));
exports.OrdersCreateFailed = OrdersCreateFailed;
var OrdersUpdateFailed = (function (_super) {
    tslib_1.__extends(OrdersUpdateFailed, _super);
    function OrdersUpdateFailed(message, properties) {
        if (message === void 0) { message = 'Could not update the orders'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'OrdersUpdateFailed';
        Object.setPrototypeOf(_this, OrdersUpdateFailed.prototype);
        return _this;
    }
    return OrdersUpdateFailed;
}(baseError_1.BaseError));
exports.OrdersUpdateFailed = OrdersUpdateFailed;
var IncomingOrdersFetchFailed = (function (_super) {
    tslib_1.__extends(IncomingOrdersFetchFailed, _super);
    function IncomingOrdersFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch incoming orders'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'IncomingOrdersFetchFailed';
        Object.setPrototypeOf(_this, IncomingOrdersFetchFailed.prototype);
        return _this;
    }
    return IncomingOrdersFetchFailed;
}(baseError_1.BaseError));
exports.IncomingOrdersFetchFailed = IncomingOrdersFetchFailed;
var OutgoingOrdersFetchFailed = (function (_super) {
    tslib_1.__extends(OutgoingOrdersFetchFailed, _super);
    function OutgoingOrdersFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch outgoing orders'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'OutgoingOrdersFetchFailed';
        Object.setPrototypeOf(_this, OutgoingOrdersFetchFailed.prototype);
        return _this;
    }
    return OutgoingOrdersFetchFailed;
}(baseError_1.BaseError));
exports.OutgoingOrdersFetchFailed = OutgoingOrdersFetchFailed;
var OrderItemsFetchFailed = (function (_super) {
    tslib_1.__extends(OrderItemsFetchFailed, _super);
    function OrderItemsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the order items'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'OrderItemsFetchFailed';
        Object.setPrototypeOf(_this, OrderItemsFetchFailed.prototype);
        return _this;
    }
    return OrderItemsFetchFailed;
}(baseError_1.BaseError));
exports.OrderItemsFetchFailed = OrderItemsFetchFailed;
var OrderItemsCreateFailed = (function (_super) {
    tslib_1.__extends(OrderItemsCreateFailed, _super);
    function OrderItemsCreateFailed(message, properties) {
        if (message === void 0) { message = 'Could not create the order items'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'OrderItemsCreateFailed';
        Object.setPrototypeOf(_this, OrderItemsCreateFailed.prototype);
        return _this;
    }
    return OrderItemsCreateFailed;
}(baseError_1.BaseError));
exports.OrderItemsCreateFailed = OrderItemsCreateFailed;
var OrderItemUpdateFailed = (function (_super) {
    tslib_1.__extends(OrderItemUpdateFailed, _super);
    function OrderItemUpdateFailed(message, properties) {
        if (message === void 0) { message = 'Could not update the order item'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'OrderItemUpdateFailed';
        Object.setPrototypeOf(_this, OrderItemUpdateFailed.prototype);
        return _this;
    }
    return OrderItemUpdateFailed;
}(baseError_1.BaseError));
exports.OrderItemUpdateFailed = OrderItemUpdateFailed;
var OrderItemsUpdateFailed = (function (_super) {
    tslib_1.__extends(OrderItemsUpdateFailed, _super);
    function OrderItemsUpdateFailed(message, properties) {
        if (message === void 0) { message = 'Could not update the order items'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'OrderItemsUpdateFailed';
        Object.setPrototypeOf(_this, OrderItemsUpdateFailed.prototype);
        return _this;
    }
    return OrderItemsUpdateFailed;
}(baseError_1.BaseError));
exports.OrderItemsUpdateFailed = OrderItemsUpdateFailed;
var OrderItemsDeleteFailed = (function (_super) {
    tslib_1.__extends(OrderItemsDeleteFailed, _super);
    function OrderItemsDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete the order items'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'OrderItemsDeleteFailed';
        Object.setPrototypeOf(_this, OrderItemsDeleteFailed.prototype);
        return _this;
    }
    return OrderItemsDeleteFailed;
}(baseError_1.BaseError));
exports.OrderItemsDeleteFailed = OrderItemsDeleteFailed;
var OrderSuggestionsFetchFailed = (function (_super) {
    tslib_1.__extends(OrderSuggestionsFetchFailed, _super);
    function OrderSuggestionsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the orders suggestions'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'OrderSuggestionsFetchFailed';
        Object.setPrototypeOf(_this, OrderSuggestionsFetchFailed.prototype);
        return _this;
    }
    return OrderSuggestionsFetchFailed;
}(baseError_1.BaseError));
exports.OrderSuggestionsFetchFailed = OrderSuggestionsFetchFailed;
var HistoricOrderItemsFetchFailed = (function (_super) {
    tslib_1.__extends(HistoricOrderItemsFetchFailed, _super);
    function HistoricOrderItemsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the historic order items'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'HistoricOrderItemsFetchFailed';
        Object.setPrototypeOf(_this, HistoricOrderItemsFetchFailed.prototype);
        return _this;
    }
    return HistoricOrderItemsFetchFailed;
}(baseError_1.BaseError));
exports.HistoricOrderItemsFetchFailed = HistoricOrderItemsFetchFailed;
var BookStockFailed = (function (_super) {
    tslib_1.__extends(BookStockFailed, _super);
    function BookStockFailed(message, properties) {
        if (message === void 0) { message = 'Could not book the stocks'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'BookStockFailed';
        Object.setPrototypeOf(_this, BookStockFailed.prototype);
        return _this;
    }
    return BookStockFailed;
}(baseError_1.BaseError));
exports.BookStockFailed = BookStockFailed;
var OpenOrderFetchFailed = (function (_super) {
    tslib_1.__extends(OpenOrderFetchFailed, _super);
    function OpenOrderFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch open order'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'OpenOrderFetchFailed';
        Object.setPrototypeOf(_this, OpenOrderFetchFailed.prototype);
        return _this;
    }
    return OpenOrderFetchFailed;
}(baseError_1.BaseError));
exports.OpenOrderFetchFailed = OpenOrderFetchFailed;
var RegistersFetchFailed = (function (_super) {
    tslib_1.__extends(RegistersFetchFailed, _super);
    function RegistersFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the Registers'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'RegistersFetchFailed';
        Object.setPrototypeOf(_this, RegistersFetchFailed.prototype);
        return _this;
    }
    return RegistersFetchFailed;
}(baseError_1.BaseError));
exports.RegistersFetchFailed = RegistersFetchFailed;
var RegisterFetchFailed = (function (_super) {
    tslib_1.__extends(RegisterFetchFailed, _super);
    function RegisterFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the Register'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'RegisterFetchFailed';
        Object.setPrototypeOf(_this, RegisterFetchFailed.prototype);
        return _this;
    }
    return RegisterFetchFailed;
}(baseError_1.BaseError));
exports.RegisterFetchFailed = RegisterFetchFailed;
var RegisterPutFailed = (function (_super) {
    tslib_1.__extends(RegisterPutFailed, _super);
    function RegisterPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter register'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'RegisterPutFailed';
        Object.setPrototypeOf(_this, RegisterPutFailed.prototype);
        return _this;
    }
    return RegisterPutFailed;
}(baseError_1.BaseError));
exports.RegisterPutFailed = RegisterPutFailed;
var RegisterNotificationCreateFailed = (function (_super) {
    tslib_1.__extends(RegisterNotificationCreateFailed, _super);
    function RegisterNotificationCreateFailed(message, properties) {
        if (message === void 0) { message = 'Could not create the Notification'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'RegisterNotificationCreateFailed';
        Object.setPrototypeOf(_this, RegisterNotificationCreateFailed.prototype);
        return _this;
    }
    return RegisterNotificationCreateFailed;
}(baseError_1.BaseError));
exports.RegisterNotificationCreateFailed = RegisterNotificationCreateFailed;
var RegisterDeviceConfigurationPutFailed = (function (_super) {
    tslib_1.__extends(RegisterDeviceConfigurationPutFailed, _super);
    function RegisterDeviceConfigurationPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not update the Device Configuration'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'RegisterDeviceConfigurationPutFailed';
        Object.setPrototypeOf(_this, RegisterDeviceConfigurationPutFailed.prototype);
        return _this;
    }
    return RegisterDeviceConfigurationPutFailed;
}(baseError_1.BaseError));
exports.RegisterDeviceConfigurationPutFailed = RegisterDeviceConfigurationPutFailed;
var RegistersSearchFailed = (function (_super) {
    tslib_1.__extends(RegistersSearchFailed, _super);
    function RegistersSearchFailed(message, properties) {
        if (message === void 0) { message = 'Could not search for register'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'RegistersSearchFailed';
        Object.setPrototypeOf(_this, RegistersSearchFailed.prototype);
        return _this;
    }
    return RegistersSearchFailed;
}(baseError_1.BaseError));
exports.RegistersSearchFailed = RegistersSearchFailed;
var AuditActionsFetchAllFailed = (function (_super) {
    tslib_1.__extends(AuditActionsFetchAllFailed, _super);
    function AuditActionsFetchAllFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch audit actions'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AuditActionsFetchAllFailed';
        Object.setPrototypeOf(_this, AuditActionsFetchAllFailed.prototype);
        return _this;
    }
    return AuditActionsFetchAllFailed;
}(baseError_1.BaseError));
exports.AuditActionsFetchAllFailed = AuditActionsFetchAllFailed;
var AuditActionsFetchOneFailed = (function (_super) {
    tslib_1.__extends(AuditActionsFetchOneFailed, _super);
    function AuditActionsFetchOneFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch audit action'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AuditActionsFetchOneFailed';
        Object.setPrototypeOf(_this, AuditActionsFetchOneFailed.prototype);
        return _this;
    }
    return AuditActionsFetchOneFailed;
}(baseError_1.BaseError));
exports.AuditActionsFetchOneFailed = AuditActionsFetchOneFailed;
var AuditActionsGetMetaFailed = (function (_super) {
    tslib_1.__extends(AuditActionsGetMetaFailed, _super);
    function AuditActionsGetMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch audit actions meta'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AuditActionsGetMetaFailed';
        Object.setPrototypeOf(_this, AuditActionsGetMetaFailed.prototype);
        return _this;
    }
    return AuditActionsGetMetaFailed;
}(baseError_1.BaseError));
exports.AuditActionsGetMetaFailed = AuditActionsGetMetaFailed;
var AuditActionsCreateFailed = (function (_super) {
    tslib_1.__extends(AuditActionsCreateFailed, _super);
    function AuditActionsCreateFailed(message, properties) {
        if (message === void 0) { message = 'Could not create audit action'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AuditActionsCreateFailed';
        Object.setPrototypeOf(_this, AuditActionsCreateFailed.prototype);
        return _this;
    }
    return AuditActionsCreateFailed;
}(baseError_1.BaseError));
exports.AuditActionsCreateFailed = AuditActionsCreateFailed;
var AuditActionsTypesFetchFailed = (function (_super) {
    tslib_1.__extends(AuditActionsTypesFetchFailed, _super);
    function AuditActionsTypesFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch audit action types'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AuditActionsTypesFetchFailed';
        Object.setPrototypeOf(_this, AuditActionsTypesFetchFailed.prototype);
        return _this;
    }
    return AuditActionsTypesFetchFailed;
}(baseError_1.BaseError));
exports.AuditActionsTypesFetchFailed = AuditActionsTypesFetchFailed;
var ImageCreationFailed = (function (_super) {
    tslib_1.__extends(ImageCreationFailed, _super);
    function ImageCreationFailed(message) {
        if (message === void 0) { message = 'Could not create new image'; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = 'ImageCreationFailed';
        return _this;
    }
    return ImageCreationFailed;
}(baseError_1.BaseError));
exports.ImageCreationFailed = ImageCreationFailed;
var ImagePutFailed = (function (_super) {
    tslib_1.__extends(ImagePutFailed, _super);
    function ImagePutFailed(message) {
        if (message === void 0) { message = 'Could not update new image'; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = 'ImagePutFailed';
        return _this;
    }
    return ImagePutFailed;
}(baseError_1.BaseError));
exports.ImagePutFailed = ImagePutFailed;
var StaffCountFailed = (function (_super) {
    tslib_1.__extends(StaffCountFailed, _super);
    function StaffCountFailed(message, properties) {
        if (message === void 0) { message = 'Could not count the staff'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StaffCountFailed';
        Object.setPrototypeOf(_this, StaffCountFailed.prototype);
        return _this;
    }
    return StaffCountFailed;
}(baseError_1.BaseError));
exports.StaffCountFailed = StaffCountFailed;
var NotificationsEmailError = (function (_super) {
    tslib_1.__extends(NotificationsEmailError, _super);
    function NotificationsEmailError(message, properties) {
        if (message === void 0) { message = 'Could not send email'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'NotificationsEmailError';
        Object.setPrototypeOf(_this, NotificationsEmailError.prototype);
        return _this;
    }
    return NotificationsEmailError;
}(baseError_1.BaseError));
exports.NotificationsEmailError = NotificationsEmailError;
var ProductGroupsFiltersFetchFailed = (function (_super) {
    tslib_1.__extends(ProductGroupsFiltersFetchFailed, _super);
    function ProductGroupsFiltersFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not get products group filters'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductGroupsFiltersFetchFailed';
        Object.setPrototypeOf(_this, ProductGroupsFiltersFetchFailed.prototype);
        return _this;
    }
    return ProductGroupsFiltersFetchFailed;
}(baseError_1.BaseError));
exports.ProductGroupsFiltersFetchFailed = ProductGroupsFiltersFetchFailed;
var PrintJobsFetchFailed = (function (_super) {
    tslib_1.__extends(PrintJobsFetchFailed, _super);
    function PrintJobsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch print jobs'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PrintJobsFetchFailed';
        Object.setPrototypeOf(_this, PrintJobsFetchFailed.prototype);
        return _this;
    }
    return PrintJobsFetchFailed;
}(baseError_1.BaseError));
exports.PrintJobsFetchFailed = PrintJobsFetchFailed;
var PrintJobFetchFailed = (function (_super) {
    tslib_1.__extends(PrintJobFetchFailed, _super);
    function PrintJobFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch print job'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PrintJobFetchFailed';
        Object.setPrototypeOf(_this, PrintJobFetchFailed.prototype);
        return _this;
    }
    return PrintJobFetchFailed;
}(baseError_1.BaseError));
exports.PrintJobFetchFailed = PrintJobFetchFailed;
var PrintJobCreateFailed = (function (_super) {
    tslib_1.__extends(PrintJobCreateFailed, _super);
    function PrintJobCreateFailed(message, properties) {
        if (message === void 0) { message = 'Could not create print job'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PrintJobCreateFailed';
        Object.setPrototypeOf(_this, PrintJobCreateFailed.prototype);
        return _this;
    }
    return PrintJobCreateFailed;
}(baseError_1.BaseError));
exports.PrintJobCreateFailed = PrintJobCreateFailed;
var PrintJobDeleteFailed = (function (_super) {
    tslib_1.__extends(PrintJobDeleteFailed, _super);
    function PrintJobDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete print job'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PrintJobDeleteFailed';
        Object.setPrototypeOf(_this, PrintJobDeleteFailed.prototype);
        return _this;
    }
    return PrintJobDeleteFailed;
}(baseError_1.BaseError));
exports.PrintJobDeleteFailed = PrintJobDeleteFailed;
var PrintJobUpdateFailed = (function (_super) {
    tslib_1.__extends(PrintJobUpdateFailed, _super);
    function PrintJobUpdateFailed(message, properties) {
        if (message === void 0) { message = 'Could not update print job'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PrintJobUpdateFailed';
        Object.setPrototypeOf(_this, PrintJobUpdateFailed.prototype);
        return _this;
    }
    return PrintJobUpdateFailed;
}(baseError_1.BaseError));
exports.PrintJobUpdateFailed = PrintJobUpdateFailed;
var PrintJobDataFetchFailed = (function (_super) {
    tslib_1.__extends(PrintJobDataFetchFailed, _super);
    function PrintJobDataFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch print job data'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PrintJobDataFetchFailed';
        Object.setPrototypeOf(_this, PrintJobDataFetchFailed.prototype);
        return _this;
    }
    return PrintJobDataFetchFailed;
}(baseError_1.BaseError));
exports.PrintJobDataFetchFailed = PrintJobDataFetchFailed;
var PrintMessagesFetchFailed = (function (_super) {
    tslib_1.__extends(PrintMessagesFetchFailed, _super);
    function PrintMessagesFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch print messages'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PrintMessagesFetchFailed';
        Object.setPrototypeOf(_this, PrintMessagesFetchFailed.prototype);
        return _this;
    }
    return PrintMessagesFetchFailed;
}(baseError_1.BaseError));
exports.PrintMessagesFetchFailed = PrintMessagesFetchFailed;
var PrintMessageFetchFailed = (function (_super) {
    tslib_1.__extends(PrintMessageFetchFailed, _super);
    function PrintMessageFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch print message'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PrintMessageFetchFailed';
        Object.setPrototypeOf(_this, PrintMessageFetchFailed.prototype);
        return _this;
    }
    return PrintMessageFetchFailed;
}(baseError_1.BaseError));
exports.PrintMessageFetchFailed = PrintMessageFetchFailed;
var PrintMessageCreateFailed = (function (_super) {
    tslib_1.__extends(PrintMessageCreateFailed, _super);
    function PrintMessageCreateFailed(message, properties) {
        if (message === void 0) { message = 'Could not create print message'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PrintMessageCreateFailed';
        Object.setPrototypeOf(_this, PrintMessageCreateFailed.prototype);
        return _this;
    }
    return PrintMessageCreateFailed;
}(baseError_1.BaseError));
exports.PrintMessageCreateFailed = PrintMessageCreateFailed;
var PrintMessageDeleteFailed = (function (_super) {
    tslib_1.__extends(PrintMessageDeleteFailed, _super);
    function PrintMessageDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete print message'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PrintMessageDeleteFailed';
        Object.setPrototypeOf(_this, PrintMessageDeleteFailed.prototype);
        return _this;
    }
    return PrintMessageDeleteFailed;
}(baseError_1.BaseError));
exports.PrintMessageDeleteFailed = PrintMessageDeleteFailed;
var PrintMessageUpdateFailed = (function (_super) {
    tslib_1.__extends(PrintMessageUpdateFailed, _super);
    function PrintMessageUpdateFailed(message, properties) {
        if (message === void 0) { message = 'Could not update print message'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PrintMessageUpdateFailed';
        Object.setPrototypeOf(_this, PrintMessageUpdateFailed.prototype);
        return _this;
    }
    return PrintMessageUpdateFailed;
}(baseError_1.BaseError));
exports.PrintMessageUpdateFailed = PrintMessageUpdateFailed;
var PrintersFetchFailed = (function (_super) {
    tslib_1.__extends(PrintersFetchFailed, _super);
    function PrintersFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch printers'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PrintersFetchFailed';
        Object.setPrototypeOf(_this, PrintersFetchFailed.prototype);
        return _this;
    }
    return PrintersFetchFailed;
}(baseError_1.BaseError));
exports.PrintersFetchFailed = PrintersFetchFailed;
var PrinterFetchFailed = (function (_super) {
    tslib_1.__extends(PrinterFetchFailed, _super);
    function PrinterFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch printer'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PrinterFetchFailed';
        Object.setPrototypeOf(_this, PrinterFetchFailed.prototype);
        return _this;
    }
    return PrinterFetchFailed;
}(baseError_1.BaseError));
exports.PrinterFetchFailed = PrinterFetchFailed;
var PrinterCreateFailed = (function (_super) {
    tslib_1.__extends(PrinterCreateFailed, _super);
    function PrinterCreateFailed(message, properties) {
        if (message === void 0) { message = 'Could not create printer'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PrinterCreateFailed';
        Object.setPrototypeOf(_this, PrinterCreateFailed.prototype);
        return _this;
    }
    return PrinterCreateFailed;
}(baseError_1.BaseError));
exports.PrinterCreateFailed = PrinterCreateFailed;
var PrinterDeleteFailed = (function (_super) {
    tslib_1.__extends(PrinterDeleteFailed, _super);
    function PrinterDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete printer'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PrinterDeleteFailed';
        Object.setPrototypeOf(_this, PrinterDeleteFailed.prototype);
        return _this;
    }
    return PrinterDeleteFailed;
}(baseError_1.BaseError));
exports.PrinterDeleteFailed = PrinterDeleteFailed;
var PrinterUpdateFailed = (function (_super) {
    tslib_1.__extends(PrinterUpdateFailed, _super);
    function PrinterUpdateFailed(message, properties) {
        if (message === void 0) { message = 'Could not update printer'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PrinterUpdateFailed';
        Object.setPrototypeOf(_this, PrinterUpdateFailed.prototype);
        return _this;
    }
    return PrinterUpdateFailed;
}(baseError_1.BaseError));
exports.PrinterUpdateFailed = PrinterUpdateFailed;
var MessagesFetchFailed = (function (_super) {
    tslib_1.__extends(MessagesFetchFailed, _super);
    function MessagesFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the messages'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'MessagesFetchFailed';
        Object.setPrototypeOf(_this, MessagesFetchFailed.prototype);
        return _this;
    }
    return MessagesFetchFailed;
}(baseError_1.BaseError));
exports.MessagesFetchFailed = MessagesFetchFailed;
var MessagesUpdateFailed = (function (_super) {
    tslib_1.__extends(MessagesUpdateFailed, _super);
    function MessagesUpdateFailed(message, properties) {
        if (message === void 0) { message = 'Could not update the message'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'MessagesUpdateFailed';
        Object.setPrototypeOf(_this, MessagesUpdateFailed.prototype);
        return _this;
    }
    return MessagesUpdateFailed;
}(baseError_1.BaseError));
exports.MessagesUpdateFailed = MessagesUpdateFailed;
var BalancesFetchFailed = (function (_super) {
    tslib_1.__extends(BalancesFetchFailed, _super);
    function BalancesFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the balances'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'BalancesFetchFailed';
        Object.setPrototypeOf(_this, BalancesFetchFailed.prototype);
        return _this;
    }
    return BalancesFetchFailed;
}(baseError_1.BaseError));
exports.BalancesFetchFailed = BalancesFetchFailed;
var BalancesFetchOneFailed = (function (_super) {
    tslib_1.__extends(BalancesFetchOneFailed, _super);
    function BalancesFetchOneFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the balance'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'BalancesFetchOneFailed';
        Object.setPrototypeOf(_this, BalancesFetchOneFailed.prototype);
        return _this;
    }
    return BalancesFetchOneFailed;
}(baseError_1.BaseError));
exports.BalancesFetchOneFailed = BalancesFetchOneFailed;
var BalancesMetaFailed = (function (_super) {
    tslib_1.__extends(BalancesMetaFailed, _super);
    function BalancesMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch meta data for balances'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'BalancesMetaFailed';
        Object.setPrototypeOf(_this, BalancesMetaFailed.prototype);
        return _this;
    }
    return BalancesMetaFailed;
}(baseError_1.BaseError));
exports.BalancesMetaFailed = BalancesMetaFailed;
var LegacySettingsFetchFailed = (function (_super) {
    tslib_1.__extends(LegacySettingsFetchFailed, _super);
    function LegacySettingsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch legacy settings'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'LegacySettingsFetchFailed';
        Object.setPrototypeOf(_this, LegacySettingsFetchFailed.prototype);
        return _this;
    }
    return LegacySettingsFetchFailed;
}(baseError_1.BaseError));
exports.LegacySettingsFetchFailed = LegacySettingsFetchFailed;
var LegacySettingFetchFailed = (function (_super) {
    tslib_1.__extends(LegacySettingFetchFailed, _super);
    function LegacySettingFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch one legacy settings object'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'LegacySettingFetchFailed';
        Object.setPrototypeOf(_this, LegacySettingFetchFailed.prototype);
        return _this;
    }
    return LegacySettingFetchFailed;
}(baseError_1.BaseError));
exports.LegacySettingFetchFailed = LegacySettingFetchFailed;
var LegacySettingUpdateFailed = (function (_super) {
    tslib_1.__extends(LegacySettingUpdateFailed, _super);
    function LegacySettingUpdateFailed(message, properties) {
        if (message === void 0) { message = 'Could not update one legacy settings object'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'LegacySettingUpdateFailed';
        Object.setPrototypeOf(_this, LegacySettingUpdateFailed.prototype);
        return _this;
    }
    return LegacySettingUpdateFailed;
}(baseError_1.BaseError));
exports.LegacySettingUpdateFailed = LegacySettingUpdateFailed;
//# sourceMappingURL=index.js.map