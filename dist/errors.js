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
var BaseError = /** @class */ (function (_super) {
    __extends(BaseError, _super);
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
var AuthenticationFailed = /** @class */ (function (_super) {
    __extends(AuthenticationFailed, _super);
    function AuthenticationFailed(message, properties) {
        if (message === void 0) { message = 'Authentication was not successful'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AuthenticationFailed';
        return _this;
    }
    return AuthenticationFailed;
}(BaseError));
exports.AuthenticationFailed = AuthenticationFailed;
var PasswordResetRequestFailed = /** @class */ (function (_super) {
    __extends(PasswordResetRequestFailed, _super);
    function PasswordResetRequestFailed(message, properties) {
        if (message === void 0) { message = 'Could not reset password'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PasswordResetRequestFailed';
        return _this;
    }
    return PasswordResetRequestFailed;
}(BaseError));
exports.PasswordResetRequestFailed = PasswordResetRequestFailed;
var PasswordSetRequestFailed = /** @class */ (function (_super) {
    __extends(PasswordSetRequestFailed, _super);
    function PasswordSetRequestFailed(message, properties) {
        if (message === void 0) { message = 'Could not set password'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PasswordSetRequestFailed';
        return _this;
    }
    return PasswordSetRequestFailed;
}(BaseError));
exports.PasswordSetRequestFailed = PasswordSetRequestFailed;
var UninstantiatedClient = /** @class */ (function (_super) {
    __extends(UninstantiatedClient, _super);
    function UninstantiatedClient(message, properties) {
        if (message === void 0) { message = 'Cannot instantiate API without instantiated HTTP client'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'UninstantiatedClient';
        return _this;
    }
    return UninstantiatedClient;
}(BaseError));
exports.UninstantiatedClient = UninstantiatedClient;
var TransactionFetchFailed = /** @class */ (function (_super) {
    __extends(TransactionFetchFailed, _super);
    function TransactionFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch transaction'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TransactionFetchFailed';
        return _this;
    }
    return TransactionFetchFailed;
}(BaseError));
exports.TransactionFetchFailed = TransactionFetchFailed;
var TransactionPdfFailed = /** @class */ (function (_super) {
    __extends(TransactionPdfFailed, _super);
    function TransactionPdfFailed(message, properties) {
        if (message === void 0) { message = 'Could not create pdf'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TransactionPdfFailed';
        return _this;
    }
    return TransactionPdfFailed;
}(BaseError));
exports.TransactionPdfFailed = TransactionPdfFailed;
var TransactionSigningInitialisationFailed = /** @class */ (function (_super) {
    __extends(TransactionSigningInitialisationFailed, _super);
    function TransactionSigningInitialisationFailed(message, properties) {
        if (message === void 0) { message = 'Could not initialise signing system'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TransactionSigningInitialisationFailed';
        return _this;
    }
    return TransactionSigningInitialisationFailed;
}(BaseError));
exports.TransactionSigningInitialisationFailed = TransactionSigningInitialisationFailed;
var TransactionSigningYearlyReceiptFailed = /** @class */ (function (_super) {
    __extends(TransactionSigningYearlyReceiptFailed, _super);
    function TransactionSigningYearlyReceiptFailed(message, properties) {
        if (message === void 0) { message = 'Could not generate yearly receipt'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TransactionSigningYearlyReceiptFailed';
        return _this;
    }
    return TransactionSigningYearlyReceiptFailed;
}(BaseError));
exports.TransactionSigningYearlyReceiptFailed = TransactionSigningYearlyReceiptFailed;
var TransactionSigningMonthlyReceiptFailed = /** @class */ (function (_super) {
    __extends(TransactionSigningMonthlyReceiptFailed, _super);
    function TransactionSigningMonthlyReceiptFailed(message, properties) {
        if (message === void 0) { message = 'Could not generate monthly receipt'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TransactionSigningMonthlyReceiptFailed';
        return _this;
    }
    return TransactionSigningMonthlyReceiptFailed;
}(BaseError));
exports.TransactionSigningMonthlyReceiptFailed = TransactionSigningMonthlyReceiptFailed;
var TransactionSigningZeroReceiptFailed = /** @class */ (function (_super) {
    __extends(TransactionSigningZeroReceiptFailed, _super);
    function TransactionSigningZeroReceiptFailed(message, properties) {
        if (message === void 0) { message = 'Could not generate zero receipt'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TransactionSigningZeroReceiptFailed';
        return _this;
    }
    return TransactionSigningZeroReceiptFailed;
}(BaseError));
exports.TransactionSigningZeroReceiptFailed = TransactionSigningZeroReceiptFailed;
var TransactionsGetMetaFailed = /** @class */ (function (_super) {
    __extends(TransactionsGetMetaFailed, _super);
    function TransactionsGetMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not get transactions meta'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TransactionsGetMetaFailed';
        return _this;
    }
    return TransactionsGetMetaFailed;
}(BaseError));
exports.TransactionsGetMetaFailed = TransactionsGetMetaFailed;
var TaxesFetchFailed = /** @class */ (function (_super) {
    __extends(TaxesFetchFailed, _super);
    function TaxesFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch taxes'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TaxesFetchFailed';
        return _this;
    }
    return TaxesFetchFailed;
}(BaseError));
exports.TaxesFetchFailed = TaxesFetchFailed;
var TaxesPutFailed = /** @class */ (function (_super) {
    __extends(TaxesPutFailed, _super);
    function TaxesPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter tax'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TaxesPutFailed';
        return _this;
    }
    return TaxesPutFailed;
}(BaseError));
exports.TaxesPutFailed = TaxesPutFailed;
var TaxesCreationFailed = /** @class */ (function (_super) {
    __extends(TaxesCreationFailed, _super);
    function TaxesCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create tax'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TaxesCreationFailed';
        return _this;
    }
    return TaxesCreationFailed;
}(BaseError));
exports.TaxesCreationFailed = TaxesCreationFailed;
var TaxDeleteFailed = /** @class */ (function (_super) {
    __extends(TaxDeleteFailed, _super);
    function TaxDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete tax'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TaxDeleteFailed';
        return _this;
    }
    return TaxDeleteFailed;
}(BaseError));
exports.TaxDeleteFailed = TaxDeleteFailed;
var ProductsCreateFailed = /** @class */ (function (_super) {
    __extends(ProductsCreateFailed, _super);
    function ProductsCreateFailed(message, properties) {
        if (message === void 0) { message = 'Could not create the product'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductsCreateFailed';
        return _this;
    }
    return ProductsCreateFailed;
}(BaseError));
exports.ProductsCreateFailed = ProductsCreateFailed;
var ProductsFetchFailed = /** @class */ (function (_super) {
    __extends(ProductsFetchFailed, _super);
    function ProductsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the products'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductsFetchFailed';
        return _this;
    }
    return ProductsFetchFailed;
}(BaseError));
exports.ProductsFetchFailed = ProductsFetchFailed;
var ProductFetchFailed = /** @class */ (function (_super) {
    __extends(ProductFetchFailed, _super);
    function ProductFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the product'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductFetchFailed';
        return _this;
    }
    return ProductFetchFailed;
}(BaseError));
exports.ProductFetchFailed = ProductFetchFailed;
var ProductsCountFailed = /** @class */ (function (_super) {
    __extends(ProductsCountFailed, _super);
    function ProductsCountFailed(message, properties) {
        if (message === void 0) { message = 'Could not count the products'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductsCountFailed';
        return _this;
    }
    return ProductsCountFailed;
}(BaseError));
exports.ProductsCountFailed = ProductsCountFailed;
var ProductsMetaFailed = /** @class */ (function (_super) {
    __extends(ProductsMetaFailed, _super);
    function ProductsMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not get products metadata'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductsMetaFailed';
        return _this;
    }
    return ProductsMetaFailed;
}(BaseError));
exports.ProductsMetaFailed = ProductsMetaFailed;
var ProductsUpdateFailed = /** @class */ (function (_super) {
    __extends(ProductsUpdateFailed, _super);
    function ProductsUpdateFailed(message, properties) {
        if (message === void 0) { message = 'Could not update the product'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductsUpdateFailed';
        return _this;
    }
    return ProductsUpdateFailed;
}(BaseError));
exports.ProductsUpdateFailed = ProductsUpdateFailed;
var ProductsDeleteFailed = /** @class */ (function (_super) {
    __extends(ProductsDeleteFailed, _super);
    function ProductsDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete the product'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductsDeleteFailed';
        return _this;
    }
    return ProductsDeleteFailed;
}(BaseError));
exports.ProductsDeleteFailed = ProductsDeleteFailed;
var ProductsSearchFailed = /** @class */ (function (_super) {
    __extends(ProductsSearchFailed, _super);
    function ProductsSearchFailed(message, properties) {
        if (message === void 0) { message = 'Could not search for the product'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductsSearchFailed';
        return _this;
    }
    return ProductsSearchFailed;
}(BaseError));
exports.ProductsSearchFailed = ProductsSearchFailed;
var DeliveriesFetchAllFailed = /** @class */ (function (_super) {
    __extends(DeliveriesFetchAllFailed, _super);
    function DeliveriesFetchAllFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch deliveries'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DeliveriesFetchAllFailed';
        return _this;
    }
    return DeliveriesFetchAllFailed;
}(BaseError));
exports.DeliveriesFetchAllFailed = DeliveriesFetchAllFailed;
var DeliveriesFetchOneFailed = /** @class */ (function (_super) {
    __extends(DeliveriesFetchOneFailed, _super);
    function DeliveriesFetchOneFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch delivery'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DeliveriesFetchOneFailed';
        return _this;
    }
    return DeliveriesFetchOneFailed;
}(BaseError));
exports.DeliveriesFetchOneFailed = DeliveriesFetchOneFailed;
var DeliveriesCreateFailed = /** @class */ (function (_super) {
    __extends(DeliveriesCreateFailed, _super);
    function DeliveriesCreateFailed(message, properties) {
        if (message === void 0) { message = 'Could not create delivery'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DeliveriesCreateFailed';
        return _this;
    }
    return DeliveriesCreateFailed;
}(BaseError));
exports.DeliveriesCreateFailed = DeliveriesCreateFailed;
var DeliveriesPDFFailed = /** @class */ (function (_super) {
    __extends(DeliveriesPDFFailed, _super);
    function DeliveriesPDFFailed(message, properties) {
        if (message === void 0) { message = 'Could not create PDF for delivery'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DeliveriesPDFFailed';
        return _this;
    }
    return DeliveriesPDFFailed;
}(BaseError));
exports.DeliveriesPDFFailed = DeliveriesPDFFailed;
var DeliveriesUpdateFailed = /** @class */ (function (_super) {
    __extends(DeliveriesUpdateFailed, _super);
    function DeliveriesUpdateFailed(message, properties) {
        if (message === void 0) { message = 'Could not update delivery'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DeliveriesUpdateFailed';
        return _this;
    }
    return DeliveriesUpdateFailed;
}(BaseError));
exports.DeliveriesUpdateFailed = DeliveriesUpdateFailed;
var DeliveriesInProgressFailed = /** @class */ (function (_super) {
    __extends(DeliveriesInProgressFailed, _super);
    function DeliveriesInProgressFailed(message, properties) {
        if (message === void 0) { message = 'Could not change delivery status to "in_progress'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DeliveriesInProgressFailed';
        return _this;
    }
    return DeliveriesInProgressFailed;
}(BaseError));
exports.DeliveriesInProgressFailed = DeliveriesInProgressFailed;
var DeliveriesDispatchFailed = /** @class */ (function (_super) {
    __extends(DeliveriesDispatchFailed, _super);
    function DeliveriesDispatchFailed(message, properties) {
        if (message === void 0) { message = 'Could not change delivery status to "in_progress'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DeliveriesDispatchFailed';
        return _this;
    }
    return DeliveriesDispatchFailed;
}(BaseError));
exports.DeliveriesDispatchFailed = DeliveriesDispatchFailed;
var DeliveriesDeleteFailed = /** @class */ (function (_super) {
    __extends(DeliveriesDeleteFailed, _super);
    function DeliveriesDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete delivery'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DeliveriesDeleteFailed';
        return _this;
    }
    return DeliveriesDeleteFailed;
}(BaseError));
exports.DeliveriesDeleteFailed = DeliveriesDeleteFailed;
var DeliveryItemsCreateFailed = /** @class */ (function (_super) {
    __extends(DeliveryItemsCreateFailed, _super);
    function DeliveryItemsCreateFailed(message, properties) {
        if (message === void 0) { message = 'Could not create delivery items'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DeliveryItemsCreateFailed';
        return _this;
    }
    return DeliveryItemsCreateFailed;
}(BaseError));
exports.DeliveryItemsCreateFailed = DeliveryItemsCreateFailed;
var DeliveryItemsFetchAllFailed = /** @class */ (function (_super) {
    __extends(DeliveryItemsFetchAllFailed, _super);
    function DeliveryItemsFetchAllFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch delivery items'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DeliveryItemsFetchAllFailed';
        return _this;
    }
    return DeliveryItemsFetchAllFailed;
}(BaseError));
exports.DeliveryItemsFetchAllFailed = DeliveryItemsFetchAllFailed;
var DeliveryItemUpdateFailed = /** @class */ (function (_super) {
    __extends(DeliveryItemUpdateFailed, _super);
    function DeliveryItemUpdateFailed(message, properties) {
        if (message === void 0) { message = 'Could not update delivery'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DeliveryItemUpdateFailed';
        return _this;
    }
    return DeliveryItemUpdateFailed;
}(BaseError));
exports.DeliveryItemUpdateFailed = DeliveryItemUpdateFailed;
var ProductGroupsFetchFailed = /** @class */ (function (_super) {
    __extends(ProductGroupsFetchFailed, _super);
    function ProductGroupsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch product groups'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductGroupsFetchFailed';
        return _this;
    }
    return ProductGroupsFetchFailed;
}(BaseError));
exports.ProductGroupsFetchFailed = ProductGroupsFetchFailed;
var ProductGroupFetchFailed = /** @class */ (function (_super) {
    __extends(ProductGroupFetchFailed, _super);
    function ProductGroupFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch product group'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductGroupFetchFailed';
        return _this;
    }
    return ProductGroupFetchFailed;
}(BaseError));
exports.ProductGroupFetchFailed = ProductGroupFetchFailed;
var ProductGroupPutFailed = /** @class */ (function (_super) {
    __extends(ProductGroupPutFailed, _super);
    function ProductGroupPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter product group'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductGroupPutFailed';
        return _this;
    }
    return ProductGroupPutFailed;
}(BaseError));
exports.ProductGroupPutFailed = ProductGroupPutFailed;
var ProductGroupCreationFailed = /** @class */ (function (_super) {
    __extends(ProductGroupCreationFailed, _super);
    function ProductGroupCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could create product group'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductGroupCreationFailed';
        return _this;
    }
    return ProductGroupCreationFailed;
}(BaseError));
exports.ProductGroupCreationFailed = ProductGroupCreationFailed;
var ProuctGroupsCountFailed = /** @class */ (function (_super) {
    __extends(ProuctGroupsCountFailed, _super);
    function ProuctGroupsCountFailed(message, properties) {
        if (message === void 0) { message = 'Could not get count of product groups'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProuctGroupsCountFailed';
        return _this;
    }
    return ProuctGroupsCountFailed;
}(BaseError));
exports.ProuctGroupsCountFailed = ProuctGroupsCountFailed;
var ProductGroupDeleteFailed = /** @class */ (function (_super) {
    __extends(ProductGroupDeleteFailed, _super);
    function ProductGroupDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete product group'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductGroupDeleteFailed';
        return _this;
    }
    return ProductGroupDeleteFailed;
}(BaseError));
exports.ProductGroupDeleteFailed = ProductGroupDeleteFailed;
var AccountsFetchFailed = /** @class */ (function (_super) {
    __extends(AccountsFetchFailed, _super);
    function AccountsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch accounts'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AccountsFetchFailed';
        return _this;
    }
    return AccountsFetchFailed;
}(BaseError));
exports.AccountsFetchFailed = AccountsFetchFailed;
var AccountFetchFailed = /** @class */ (function (_super) {
    __extends(AccountFetchFailed, _super);
    function AccountFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch account'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AccountFetchFailed';
        return _this;
    }
    return AccountFetchFailed;
}(BaseError));
exports.AccountFetchFailed = AccountFetchFailed;
var AccountPutFailed = /** @class */ (function (_super) {
    __extends(AccountPutFailed, _super);
    function AccountPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter account'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AccountPutFailed';
        return _this;
    }
    return AccountPutFailed;
}(BaseError));
exports.AccountPutFailed = AccountPutFailed;
var AccountCreationFailed = /** @class */ (function (_super) {
    __extends(AccountCreationFailed, _super);
    function AccountCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create account'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AccountCreationFailed';
        return _this;
    }
    return AccountCreationFailed;
}(BaseError));
exports.AccountCreationFailed = AccountCreationFailed;
var AccountDeleteFailed = /** @class */ (function (_super) {
    __extends(AccountDeleteFailed, _super);
    function AccountDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete account'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AccountDeleteFailed';
        return _this;
    }
    return AccountDeleteFailed;
}(BaseError));
exports.AccountDeleteFailed = AccountDeleteFailed;
var ExpenseAccountsFetchFailed = /** @class */ (function (_super) {
    __extends(ExpenseAccountsFetchFailed, _super);
    function ExpenseAccountsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch expense accounts'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ExpenseAccountsFetchFailed';
        return _this;
    }
    return ExpenseAccountsFetchFailed;
}(BaseError));
exports.ExpenseAccountsFetchFailed = ExpenseAccountsFetchFailed;
var ExpenseAccountFetchFailed = /** @class */ (function (_super) {
    __extends(ExpenseAccountFetchFailed, _super);
    function ExpenseAccountFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch expense account'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ExpenseAccountFetchFailed';
        return _this;
    }
    return ExpenseAccountFetchFailed;
}(BaseError));
exports.ExpenseAccountFetchFailed = ExpenseAccountFetchFailed;
var ExpenseAccountPutFailed = /** @class */ (function (_super) {
    __extends(ExpenseAccountPutFailed, _super);
    function ExpenseAccountPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter expense account'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ExpenseAccountPutFailed';
        return _this;
    }
    return ExpenseAccountPutFailed;
}(BaseError));
exports.ExpenseAccountPutFailed = ExpenseAccountPutFailed;
var ExpenseAccountCreationFailed = /** @class */ (function (_super) {
    __extends(ExpenseAccountCreationFailed, _super);
    function ExpenseAccountCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create expense account'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ExpenseAccountCreationFailed';
        return _this;
    }
    return ExpenseAccountCreationFailed;
}(BaseError));
exports.ExpenseAccountCreationFailed = ExpenseAccountCreationFailed;
var PaymentOptionsFetchFailed = /** @class */ (function (_super) {
    __extends(PaymentOptionsFetchFailed, _super);
    function PaymentOptionsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch payment option'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PaymentOptionsFetchFailed';
        return _this;
    }
    return PaymentOptionsFetchFailed;
}(BaseError));
exports.PaymentOptionsFetchFailed = PaymentOptionsFetchFailed;
var ExpenseAccountDeleteFailed = /** @class */ (function (_super) {
    __extends(ExpenseAccountDeleteFailed, _super);
    function ExpenseAccountDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete expense account'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ExpenseAccountDeleteFailed';
        return _this;
    }
    return ExpenseAccountDeleteFailed;
}(BaseError));
exports.ExpenseAccountDeleteFailed = ExpenseAccountDeleteFailed;
var PaymentOptionFetchFailed = /** @class */ (function (_super) {
    __extends(PaymentOptionFetchFailed, _super);
    function PaymentOptionFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch payment option'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PaymentOptionFetchFailed';
        return _this;
    }
    return PaymentOptionFetchFailed;
}(BaseError));
exports.PaymentOptionFetchFailed = PaymentOptionFetchFailed;
var PaymentOptionPutFailed = /** @class */ (function (_super) {
    __extends(PaymentOptionPutFailed, _super);
    function PaymentOptionPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter payment option'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PaymentOptionPutFailed';
        return _this;
    }
    return PaymentOptionPutFailed;
}(BaseError));
exports.PaymentOptionPutFailed = PaymentOptionPutFailed;
var PaymentOptionCreationFailed = /** @class */ (function (_super) {
    __extends(PaymentOptionCreationFailed, _super);
    function PaymentOptionCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create payment option'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PaymentOptionCreationFailed';
        return _this;
    }
    return PaymentOptionCreationFailed;
}(BaseError));
exports.PaymentOptionCreationFailed = PaymentOptionCreationFailed;
var PaymentOptionDeleteFailed = /** @class */ (function (_super) {
    __extends(PaymentOptionDeleteFailed, _super);
    function PaymentOptionDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete payment option'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PaymentOptionDeleteFailed';
        return _this;
    }
    return PaymentOptionDeleteFailed;
}(BaseError));
exports.PaymentOptionDeleteFailed = PaymentOptionDeleteFailed;
var TemplatesCreationFailed = /** @class */ (function (_super) {
    __extends(TemplatesCreationFailed, _super);
    function TemplatesCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create template'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TemplatesCreationFailed';
        return _this;
    }
    return TemplatesCreationFailed;
}(BaseError));
exports.TemplatesCreationFailed = TemplatesCreationFailed;
var TemplatesPutFailed = /** @class */ (function (_super) {
    __extends(TemplatesPutFailed, _super);
    function TemplatesPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not replace template'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TemplatesPutFailed';
        return _this;
    }
    return TemplatesPutFailed;
}(BaseError));
exports.TemplatesPutFailed = TemplatesPutFailed;
var TemplatesFetchFailed = /** @class */ (function (_super) {
    __extends(TemplatesFetchFailed, _super);
    function TemplatesFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch templates'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TemplatesFetchFailed';
        return _this;
    }
    return TemplatesFetchFailed;
}(BaseError));
exports.TemplatesFetchFailed = TemplatesFetchFailed;
var TemplatesPreviewFailed = /** @class */ (function (_super) {
    __extends(TemplatesPreviewFailed, _super);
    function TemplatesPreviewFailed(message, properties) {
        if (message === void 0) { message = 'Could not preview template'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TemplatesPreviewFailed';
        return _this;
    }
    return TemplatesPreviewFailed;
}(BaseError));
exports.TemplatesPreviewFailed = TemplatesPreviewFailed;
var ConfigurationsFetchFailed = /** @class */ (function (_super) {
    __extends(ConfigurationsFetchFailed, _super);
    function ConfigurationsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch configurations'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ConfigurationsFetchFailed';
        return _this;
    }
    return ConfigurationsFetchFailed;
}(BaseError));
exports.ConfigurationsFetchFailed = ConfigurationsFetchFailed;
var ConfigurationFetchFailed = /** @class */ (function (_super) {
    __extends(ConfigurationFetchFailed, _super);
    function ConfigurationFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch configuration'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ConfigurationFetchFailed';
        return _this;
    }
    return ConfigurationFetchFailed;
}(BaseError));
exports.ConfigurationFetchFailed = ConfigurationFetchFailed;
var ConfigurationPutFailed = /** @class */ (function (_super) {
    __extends(ConfigurationPutFailed, _super);
    function ConfigurationPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter configuration'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ConfigurationPutFailed';
        return _this;
    }
    return ConfigurationPutFailed;
}(BaseError));
exports.ConfigurationPutFailed = ConfigurationPutFailed;
var ConfigurationPatchFailed = /** @class */ (function (_super) {
    __extends(ConfigurationPatchFailed, _super);
    function ConfigurationPatchFailed(message, properties) {
        if (message === void 0) { message = 'Could not patch configuration'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ConfigurationPatchFailed';
        return _this;
    }
    return ConfigurationPatchFailed;
}(BaseError));
exports.ConfigurationPatchFailed = ConfigurationPatchFailed;
var ConfigurationCreationFailed = /** @class */ (function (_super) {
    __extends(ConfigurationCreationFailed, _super);
    function ConfigurationCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create configuration'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ConfigurationCreationFailed';
        return _this;
    }
    return ConfigurationCreationFailed;
}(BaseError));
exports.ConfigurationCreationFailed = ConfigurationCreationFailed;
var UsersFetchFailed = /** @class */ (function (_super) {
    __extends(UsersFetchFailed, _super);
    function UsersFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch user'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'UsersFetchFailed';
        return _this;
    }
    return UsersFetchFailed;
}(BaseError));
exports.UsersFetchFailed = UsersFetchFailed;
var UserFetchFailed = /** @class */ (function (_super) {
    __extends(UserFetchFailed, _super);
    function UserFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch user'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'UserFetchFailed';
        return _this;
    }
    return UserFetchFailed;
}(BaseError));
exports.UserFetchFailed = UserFetchFailed;
var UserPutFailed = /** @class */ (function (_super) {
    __extends(UserPutFailed, _super);
    function UserPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter user'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'UserPutFailed';
        return _this;
    }
    return UserPutFailed;
}(BaseError));
exports.UserPutFailed = UserPutFailed;
var UserCreationFailed = /** @class */ (function (_super) {
    __extends(UserCreationFailed, _super);
    function UserCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create user'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'UserCreationFailed';
        return _this;
    }
    return UserCreationFailed;
}(BaseError));
exports.UserCreationFailed = UserCreationFailed;
var UserDeleteFailed = /** @class */ (function (_super) {
    __extends(UserDeleteFailed, _super);
    function UserDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete user'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'UserDeleteFailed';
        return _this;
    }
    return UserDeleteFailed;
}(BaseError));
exports.UserDeleteFailed = UserDeleteFailed;
var BranchesFetchFailed = /** @class */ (function (_super) {
    __extends(BranchesFetchFailed, _super);
    function BranchesFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch branches'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'BranchesFetchFailed';
        return _this;
    }
    return BranchesFetchFailed;
}(BaseError));
exports.BranchesFetchFailed = BranchesFetchFailed;
var BranchFetchFailed = /** @class */ (function (_super) {
    __extends(BranchFetchFailed, _super);
    function BranchFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch branch'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'BrancheFetchFailed';
        return _this;
    }
    return BranchFetchFailed;
}(BaseError));
exports.BranchFetchFailed = BranchFetchFailed;
var BranchPutFailed = /** @class */ (function (_super) {
    __extends(BranchPutFailed, _super);
    function BranchPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter branch'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'BranchPutFailed';
        return _this;
    }
    return BranchPutFailed;
}(BaseError));
exports.BranchPutFailed = BranchPutFailed;
var BranchCreationFailed = /** @class */ (function (_super) {
    __extends(BranchCreationFailed, _super);
    function BranchCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create branch'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'VoucherPostFailed';
        return _this;
    }
    return BranchCreationFailed;
}(BaseError));
exports.BranchCreationFailed = BranchCreationFailed;
var BranchesCountFailed = /** @class */ (function (_super) {
    __extends(BranchesCountFailed, _super);
    function BranchesCountFailed(message, properties) {
        if (message === void 0) { message = 'Could not count the branches'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'BranchesCountFailed';
        return _this;
    }
    return BranchesCountFailed;
}(BaseError));
exports.BranchesCountFailed = BranchesCountFailed;
var BranchDeleteFailed = /** @class */ (function (_super) {
    __extends(BranchDeleteFailed, _super);
    function BranchDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete branch'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'BranchDeleteFailed';
        return _this;
    }
    return BranchDeleteFailed;
}(BaseError));
exports.BranchDeleteFailed = BranchDeleteFailed;
var CustomersFetchFailed = /** @class */ (function (_super) {
    __extends(CustomersFetchFailed, _super);
    function CustomersFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch customers'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CustomersFetchFailed';
        return _this;
    }
    return CustomersFetchFailed;
}(BaseError));
exports.CustomersFetchFailed = CustomersFetchFailed;
var CustomerFetchFailed = /** @class */ (function (_super) {
    __extends(CustomerFetchFailed, _super);
    function CustomerFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch customer'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CustomerFetchFailed';
        return _this;
    }
    return CustomerFetchFailed;
}(BaseError));
exports.CustomerFetchFailed = CustomerFetchFailed;
var CustomerPutFailed = /** @class */ (function (_super) {
    __extends(CustomerPutFailed, _super);
    function CustomerPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter customer'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CustomerPutFailed';
        return _this;
    }
    return CustomerPutFailed;
}(BaseError));
exports.CustomerPutFailed = CustomerPutFailed;
var CustomerCreationFailed = /** @class */ (function (_super) {
    __extends(CustomerCreationFailed, _super);
    function CustomerCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create customer'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CustomerCreationFailed';
        return _this;
    }
    return CustomerCreationFailed;
}(BaseError));
exports.CustomerCreationFailed = CustomerCreationFailed;
var CustomersMetaFailed = /** @class */ (function (_super) {
    __extends(CustomersMetaFailed, _super);
    function CustomersMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not get customers metadata'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CustomersMetaFailed';
        return _this;
    }
    return CustomersMetaFailed;
}(BaseError));
exports.CustomersMetaFailed = CustomersMetaFailed;
var CustomersCountFailed = /** @class */ (function (_super) {
    __extends(CustomersCountFailed, _super);
    function CustomersCountFailed(message, properties) {
        if (message === void 0) { message = 'Could not count the customers'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CustomersCountFailed';
        return _this;
    }
    return CustomersCountFailed;
}(BaseError));
exports.CustomersCountFailed = CustomersCountFailed;
var CustomerDeleteFailed = /** @class */ (function (_super) {
    __extends(CustomerDeleteFailed, _super);
    function CustomerDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete the customer'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CustomerDeleteFailed';
        return _this;
    }
    return CustomerDeleteFailed;
}(BaseError));
exports.CustomerDeleteFailed = CustomerDeleteFailed;
var VoucherTypeError = /** @class */ (function (_super) {
    __extends(VoucherTypeError, _super);
    function VoucherTypeError(message, properties) {
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'VouchersFetchFailed';
        return _this;
    }
    return VoucherTypeError;
}(BaseError));
exports.VoucherTypeError = VoucherTypeError;
var VouchersFetchFailed = /** @class */ (function (_super) {
    __extends(VouchersFetchFailed, _super);
    function VouchersFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the vouchers'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'VouchersFetchFailed';
        return _this;
    }
    return VouchersFetchFailed;
}(BaseError));
exports.VouchersFetchFailed = VouchersFetchFailed;
var VoucherLogsFetchFailed = /** @class */ (function (_super) {
    __extends(VoucherLogsFetchFailed, _super);
    function VoucherLogsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the voucher logs'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'VoucherLogsFetchFailed';
        return _this;
    }
    return VoucherLogsFetchFailed;
}(BaseError));
exports.VoucherLogsFetchFailed = VoucherLogsFetchFailed;
var VoucherFetchFailed = /** @class */ (function (_super) {
    __extends(VoucherFetchFailed, _super);
    function VoucherFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch voucher'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'VoucherFetchFailed';
        return _this;
    }
    return VoucherFetchFailed;
}(BaseError));
exports.VoucherFetchFailed = VoucherFetchFailed;
var VoucherPutFailed = /** @class */ (function (_super) {
    __extends(VoucherPutFailed, _super);
    function VoucherPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter voucher'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'VoucherPutFailed';
        return _this;
    }
    return VoucherPutFailed;
}(BaseError));
exports.VoucherPutFailed = VoucherPutFailed;
var VoucherPatchFailed = /** @class */ (function (_super) {
    __extends(VoucherPatchFailed, _super);
    function VoucherPatchFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter voucher'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'VoucherPatchFailed';
        return _this;
    }
    return VoucherPatchFailed;
}(BaseError));
exports.VoucherPatchFailed = VoucherPatchFailed;
var VoucherCreationFailed = /** @class */ (function (_super) {
    __extends(VoucherCreationFailed, _super);
    function VoucherCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create voucher'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'VoucherPostFailed';
        return _this;
    }
    return VoucherCreationFailed;
}(BaseError));
exports.VoucherCreationFailed = VoucherCreationFailed;
var VouchersCountFailed = /** @class */ (function (_super) {
    __extends(VouchersCountFailed, _super);
    function VouchersCountFailed(message, properties) {
        if (message === void 0) { message = 'Could not count the vouchers'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'VouchersCountFailed';
        return _this;
    }
    return VouchersCountFailed;
}(BaseError));
exports.VouchersCountFailed = VouchersCountFailed;
var VouchersMetaFailed = /** @class */ (function (_super) {
    __extends(VouchersMetaFailed, _super);
    function VouchersMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not get voucher metadata'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'VouchersMetaFailed';
        return _this;
    }
    return VouchersMetaFailed;
}(BaseError));
exports.VouchersMetaFailed = VouchersMetaFailed;
var VoucherLogsMetaFailed = /** @class */ (function (_super) {
    __extends(VoucherLogsMetaFailed, _super);
    function VoucherLogsMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not get voucher logs metadata'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'VoucherLogsMetaFailed';
        return _this;
    }
    return VoucherLogsMetaFailed;
}(BaseError));
exports.VoucherLogsMetaFailed = VoucherLogsMetaFailed;
var VoucherDeleteFailed = /** @class */ (function (_super) {
    __extends(VoucherDeleteFailed, _super);
    function VoucherDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete the voucher'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'VoucherDeleteFailed';
        return _this;
    }
    return VoucherDeleteFailed;
}(BaseError));
exports.VoucherDeleteFailed = VoucherDeleteFailed;
var VouchersLogsFetchFailed = /** @class */ (function (_super) {
    __extends(VouchersLogsFetchFailed, _super);
    function VouchersLogsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the vouchers logs'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'VouchersLogsFetchFailed';
        return _this;
    }
    return VouchersLogsFetchFailed;
}(BaseError));
exports.VouchersLogsFetchFailed = VouchersLogsFetchFailed;
var VouchersLogsCountFailed = /** @class */ (function (_super) {
    __extends(VouchersLogsCountFailed, _super);
    function VouchersLogsCountFailed(message, properties) {
        if (message === void 0) { message = 'Could not count the vouchers logs'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'VouchersLogsCountFailed';
        return _this;
    }
    return VouchersLogsCountFailed;
}(BaseError));
exports.VouchersLogsCountFailed = VouchersLogsCountFailed;
var InvoicesFetchAllFailed = /** @class */ (function (_super) {
    __extends(InvoicesFetchAllFailed, _super);
    function InvoicesFetchAllFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch invoices'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'InvoicesFetchAllFailed';
        return _this;
    }
    return InvoicesFetchAllFailed;
}(BaseError));
exports.InvoicesFetchAllFailed = InvoicesFetchAllFailed;
var InvoicesFetchOneFailed = /** @class */ (function (_super) {
    __extends(InvoicesFetchOneFailed, _super);
    function InvoicesFetchOneFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the invoice'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'InvoicesFetchOneFailed';
        return _this;
    }
    return InvoicesFetchOneFailed;
}(BaseError));
exports.InvoicesFetchOneFailed = InvoicesFetchOneFailed;
var InvoicesCreateFailed = /** @class */ (function (_super) {
    __extends(InvoicesCreateFailed, _super);
    function InvoicesCreateFailed(message, properties) {
        if (message === void 0) { message = 'Could not create invoice'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'InvoicesCreateFailed';
        return _this;
    }
    return InvoicesCreateFailed;
}(BaseError));
exports.InvoicesCreateFailed = InvoicesCreateFailed;
var InvoicesUpdateFailed = /** @class */ (function (_super) {
    __extends(InvoicesUpdateFailed, _super);
    function InvoicesUpdateFailed(message, properties) {
        if (message === void 0) { message = 'Could not update invoice'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'InvoicesUpdateFailed';
        return _this;
    }
    return InvoicesUpdateFailed;
}(BaseError));
exports.InvoicesUpdateFailed = InvoicesUpdateFailed;
var InvoicesDeleteFailed = /** @class */ (function (_super) {
    __extends(InvoicesDeleteFailed, _super);
    function InvoicesDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete invoice'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'InvoicesDeleteFailed';
        return _this;
    }
    return InvoicesDeleteFailed;
}(BaseError));
exports.InvoicesDeleteFailed = InvoicesDeleteFailed;
var InvoicesGetMetaFailed = /** @class */ (function (_super) {
    __extends(InvoicesGetMetaFailed, _super);
    function InvoicesGetMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not get invoice meta'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'InvoicesGetMetaFailed';
        return _this;
    }
    return InvoicesGetMetaFailed;
}(BaseError));
exports.InvoicesGetMetaFailed = InvoicesGetMetaFailed;
var StocksFetchFailed = /** @class */ (function (_super) {
    __extends(StocksFetchFailed, _super);
    function StocksFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the stocks'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StocksFetchFailed';
        return _this;
    }
    return StocksFetchFailed;
}(BaseError));
exports.StocksFetchFailed = StocksFetchFailed;
var StocksCreateFailed = /** @class */ (function (_super) {
    __extends(StocksCreateFailed, _super);
    function StocksCreateFailed(message, properties) {
        if (message === void 0) { message = 'Could not create the stock'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StocksCreateFailed';
        return _this;
    }
    return StocksCreateFailed;
}(BaseError));
exports.StocksCreateFailed = StocksCreateFailed;
var StocksUpdateFailed = /** @class */ (function (_super) {
    __extends(StocksUpdateFailed, _super);
    function StocksUpdateFailed(message, properties) {
        if (message === void 0) { message = 'Could not update the stock'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StocksUpdateFailed';
        return _this;
    }
    return StocksUpdateFailed;
}(BaseError));
exports.StocksUpdateFailed = StocksUpdateFailed;
var StocksLocationsFetchFailed = /** @class */ (function (_super) {
    __extends(StocksLocationsFetchFailed, _super);
    function StocksLocationsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the stocks locations'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StocksLocationsFetchFailed';
        return _this;
    }
    return StocksLocationsFetchFailed;
}(BaseError));
exports.StocksLocationsFetchFailed = StocksLocationsFetchFailed;
var StocksBookFetchFailed = /** @class */ (function (_super) {
    __extends(StocksBookFetchFailed, _super);
    function StocksBookFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the stocks book'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StocksBookFetchFailed';
        return _this;
    }
    return StocksBookFetchFailed;
}(BaseError));
exports.StocksBookFetchFailed = StocksBookFetchFailed;
var StocksBookGetMetaFailed = /** @class */ (function (_super) {
    __extends(StocksBookGetMetaFailed, _super);
    function StocksBookGetMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch stocks book meta'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StocksBookGetMetaFailed';
        return _this;
    }
    return StocksBookGetMetaFailed;
}(BaseError));
exports.StocksBookGetMetaFailed = StocksBookGetMetaFailed;
var OrdersFetchFailed = /** @class */ (function (_super) {
    __extends(OrdersFetchFailed, _super);
    function OrdersFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the orders'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'OrdersFetchFailed';
        return _this;
    }
    return OrdersFetchFailed;
}(BaseError));
exports.OrdersFetchFailed = OrdersFetchFailed;
var OrdersCreateFailed = /** @class */ (function (_super) {
    __extends(OrdersCreateFailed, _super);
    function OrdersCreateFailed(message, properties) {
        if (message === void 0) { message = 'Could not create the orders'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'OrdersCreateFailed';
        return _this;
    }
    return OrdersCreateFailed;
}(BaseError));
exports.OrdersCreateFailed = OrdersCreateFailed;
var OrdersUpdateFailed = /** @class */ (function (_super) {
    __extends(OrdersUpdateFailed, _super);
    function OrdersUpdateFailed(message, properties) {
        if (message === void 0) { message = 'Could not update the orders'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'OrdersUpdateFailed';
        return _this;
    }
    return OrdersUpdateFailed;
}(BaseError));
exports.OrdersUpdateFailed = OrdersUpdateFailed;
var IncomingOrdersFetchFailed = /** @class */ (function (_super) {
    __extends(IncomingOrdersFetchFailed, _super);
    function IncomingOrdersFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch incoming orders'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'IncomingOrdersFetchFailed';
        return _this;
    }
    return IncomingOrdersFetchFailed;
}(BaseError));
exports.IncomingOrdersFetchFailed = IncomingOrdersFetchFailed;
var OutgoingOrdersFetchFailed = /** @class */ (function (_super) {
    __extends(OutgoingOrdersFetchFailed, _super);
    function OutgoingOrdersFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch outgoing orders'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'OutgoingOrdersFetchFailed';
        return _this;
    }
    return OutgoingOrdersFetchFailed;
}(BaseError));
exports.OutgoingOrdersFetchFailed = OutgoingOrdersFetchFailed;
var OrderItemsFetchFailed = /** @class */ (function (_super) {
    __extends(OrderItemsFetchFailed, _super);
    function OrderItemsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the order items'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'OrderItemsFetchFailed';
        return _this;
    }
    return OrderItemsFetchFailed;
}(BaseError));
exports.OrderItemsFetchFailed = OrderItemsFetchFailed;
var OrderItemsCreateFailed = /** @class */ (function (_super) {
    __extends(OrderItemsCreateFailed, _super);
    function OrderItemsCreateFailed(message, properties) {
        if (message === void 0) { message = 'Could not create the order items'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'OrderItemsCreateFailed';
        return _this;
    }
    return OrderItemsCreateFailed;
}(BaseError));
exports.OrderItemsCreateFailed = OrderItemsCreateFailed;
var OrderItemUpdateFailed = /** @class */ (function (_super) {
    __extends(OrderItemUpdateFailed, _super);
    function OrderItemUpdateFailed(message, properties) {
        if (message === void 0) { message = 'Could not update the order item'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'OrderItemUpdateFailed';
        return _this;
    }
    return OrderItemUpdateFailed;
}(BaseError));
exports.OrderItemUpdateFailed = OrderItemUpdateFailed;
var OrderItemsUpdateFailed = /** @class */ (function (_super) {
    __extends(OrderItemsUpdateFailed, _super);
    function OrderItemsUpdateFailed(message, properties) {
        if (message === void 0) { message = 'Could not update the order items'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'OrderItemsUpdateFailed';
        return _this;
    }
    return OrderItemsUpdateFailed;
}(BaseError));
exports.OrderItemsUpdateFailed = OrderItemsUpdateFailed;
var OrderItemsDeleteFailed = /** @class */ (function (_super) {
    __extends(OrderItemsDeleteFailed, _super);
    function OrderItemsDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete the order items'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'OrderItemsDeleteFailed';
        return _this;
    }
    return OrderItemsDeleteFailed;
}(BaseError));
exports.OrderItemsDeleteFailed = OrderItemsDeleteFailed;
var OrderSuggestionsFetchFailed = /** @class */ (function (_super) {
    __extends(OrderSuggestionsFetchFailed, _super);
    function OrderSuggestionsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the orders suggestions'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'OrderSuggestionsFetchFailed';
        return _this;
    }
    return OrderSuggestionsFetchFailed;
}(BaseError));
exports.OrderSuggestionsFetchFailed = OrderSuggestionsFetchFailed;
var HistoricOrderItemsFetchFailed = /** @class */ (function (_super) {
    __extends(HistoricOrderItemsFetchFailed, _super);
    function HistoricOrderItemsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the historic order items'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'HistoricOrderItemsFetchFailed';
        return _this;
    }
    return HistoricOrderItemsFetchFailed;
}(BaseError));
exports.HistoricOrderItemsFetchFailed = HistoricOrderItemsFetchFailed;
var BookStockFailed = /** @class */ (function (_super) {
    __extends(BookStockFailed, _super);
    function BookStockFailed(message, properties) {
        if (message === void 0) { message = 'Could not book the stocks'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'BookStockFailed';
        return _this;
    }
    return BookStockFailed;
}(BaseError));
exports.BookStockFailed = BookStockFailed;
var OpenOrderFetchFailed = /** @class */ (function (_super) {
    __extends(OpenOrderFetchFailed, _super);
    function OpenOrderFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch open order'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'OpenOrderFetchFailed';
        return _this;
    }
    return OpenOrderFetchFailed;
}(BaseError));
exports.OpenOrderFetchFailed = OpenOrderFetchFailed;
var RevenuesFetchFailed = /** @class */ (function (_super) {
    __extends(RevenuesFetchFailed, _super);
    function RevenuesFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the Revenues'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'RevenuesFetchFailed';
        return _this;
    }
    return RevenuesFetchFailed;
}(BaseError));
exports.RevenuesFetchFailed = RevenuesFetchFailed;
var StaffFetchFailed = /** @class */ (function (_super) {
    __extends(StaffFetchFailed, _super);
    function StaffFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch all the Staff members'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StaffFetchFailed';
        return _this;
    }
    return StaffFetchFailed;
}(BaseError));
exports.StaffFetchFailed = StaffFetchFailed;
var StaffFetchOneFailed = /** @class */ (function (_super) {
    __extends(StaffFetchOneFailed, _super);
    function StaffFetchOneFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the Staff member'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StaffFetchOneFailed';
        return _this;
    }
    return StaffFetchOneFailed;
}(BaseError));
exports.StaffFetchOneFailed = StaffFetchOneFailed;
var StaffPutFailed = /** @class */ (function (_super) {
    __extends(StaffPutFailed, _super);
    function StaffPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter the Staff member'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StaffPutFailed';
        return _this;
    }
    return StaffPutFailed;
}(BaseError));
exports.StaffPutFailed = StaffPutFailed;
var StaffDeleteFailed = /** @class */ (function (_super) {
    __extends(StaffDeleteFailed, _super);
    function StaffDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete the Staff member'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StaffDeleteFailed';
        return _this;
    }
    return StaffDeleteFailed;
}(BaseError));
exports.StaffDeleteFailed = StaffDeleteFailed;
var StaffMemberCreateFailed = /** @class */ (function (_super) {
    __extends(StaffMemberCreateFailed, _super);
    function StaffMemberCreateFailed(message, properties) {
        if (message === void 0) { message = 'Could not create the Staff member'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StaffMemberCreateFailed';
        return _this;
    }
    return StaffMemberCreateFailed;
}(BaseError));
exports.StaffMemberCreateFailed = StaffMemberCreateFailed;
var StaffPinGetFailed = /** @class */ (function (_super) {
    __extends(StaffPinGetFailed, _super);
    function StaffPinGetFailed(message, properties) {
        if (message === void 0) { message = 'Could not get a unique Staff pin number'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StaffPinGetFailed';
        return _this;
    }
    return StaffPinGetFailed;
}(BaseError));
exports.StaffPinGetFailed = StaffPinGetFailed;
var RegistersFetchFailed = /** @class */ (function (_super) {
    __extends(RegistersFetchFailed, _super);
    function RegistersFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the Registers'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'RegistersFetchFailed';
        return _this;
    }
    return RegistersFetchFailed;
}(BaseError));
exports.RegistersFetchFailed = RegistersFetchFailed;
var RegisterFetchFailed = /** @class */ (function (_super) {
    __extends(RegisterFetchFailed, _super);
    function RegisterFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the Register'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'RegisterFetchFailed';
        return _this;
    }
    return RegisterFetchFailed;
}(BaseError));
exports.RegisterFetchFailed = RegisterFetchFailed;
var RegisterPutFailed = /** @class */ (function (_super) {
    __extends(RegisterPutFailed, _super);
    function RegisterPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter register'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'RegisterPutFailed';
        return _this;
    }
    return RegisterPutFailed;
}(BaseError));
exports.RegisterPutFailed = RegisterPutFailed;
var RegisterNotificationCreateFailed = /** @class */ (function (_super) {
    __extends(RegisterNotificationCreateFailed, _super);
    function RegisterNotificationCreateFailed(message, properties) {
        if (message === void 0) { message = 'Could not create the Notification'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'RegisterNotificationCreateFailed';
        return _this;
    }
    return RegisterNotificationCreateFailed;
}(BaseError));
exports.RegisterNotificationCreateFailed = RegisterNotificationCreateFailed;
var RegisterDeviceConfigurationPutFailed = /** @class */ (function (_super) {
    __extends(RegisterDeviceConfigurationPutFailed, _super);
    function RegisterDeviceConfigurationPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not update the Device Configuration'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'RegisterDeviceConfigurationPutFailed';
        return _this;
    }
    return RegisterDeviceConfigurationPutFailed;
}(BaseError));
exports.RegisterDeviceConfigurationPutFailed = RegisterDeviceConfigurationPutFailed;
var StatisticsProductFetchFailed = /** @class */ (function (_super) {
    __extends(StatisticsProductFetchFailed, _super);
    function StatisticsProductFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the Statistics Products'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StatisticsProductFetchFailed';
        return _this;
    }
    return StatisticsProductFetchFailed;
}(BaseError));
exports.StatisticsProductFetchFailed = StatisticsProductFetchFailed;
var StaffOverviewFetchFailed = /** @class */ (function (_super) {
    __extends(StaffOverviewFetchFailed, _super);
    function StaffOverviewFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the staff overview report'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StaffOverviewFetchFailed';
        return _this;
    }
    return StaffOverviewFetchFailed;
}(BaseError));
exports.StaffOverviewFetchFailed = StaffOverviewFetchFailed;
var ProductGroupsReportFetchFailed = /** @class */ (function (_super) {
    __extends(ProductGroupsReportFetchFailed, _super);
    function ProductGroupsReportFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the product groups report'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductGroupsReportFetchFailed';
        return _this;
    }
    return ProductGroupsReportFetchFailed;
}(BaseError));
exports.ProductGroupsReportFetchFailed = ProductGroupsReportFetchFailed;
var RefundsReportFetchFailed = /** @class */ (function (_super) {
    __extends(RefundsReportFetchFailed, _super);
    function RefundsReportFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the refunds report'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'RefundsReportFetchFailed';
        return _this;
    }
    return RefundsReportFetchFailed;
}(BaseError));
exports.RefundsReportFetchFailed = RefundsReportFetchFailed;
var VouchersReportFetchFailed = /** @class */ (function (_super) {
    __extends(VouchersReportFetchFailed, _super);
    function VouchersReportFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the vouchers report'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'VouchersReportFetchFailed';
        return _this;
    }
    return VouchersReportFetchFailed;
}(BaseError));
exports.VouchersReportFetchFailed = VouchersReportFetchFailed;
var ProductsReportFetchFailed = /** @class */ (function (_super) {
    __extends(ProductsReportFetchFailed, _super);
    function ProductsReportFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the products report'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductsReportFetchFailed';
        return _this;
    }
    return ProductsReportFetchFailed;
}(BaseError));
exports.ProductsReportFetchFailed = ProductsReportFetchFailed;
var PaymentsReportFetchFailed = /** @class */ (function (_super) {
    __extends(PaymentsReportFetchFailed, _super);
    function PaymentsReportFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the payments report'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PaymentsReportFetchFailed';
        return _this;
    }
    return PaymentsReportFetchFailed;
}(BaseError));
exports.PaymentsReportFetchFailed = PaymentsReportFetchFailed;
var SimpleSalesCartItemsReportFetchFailed = /** @class */ (function (_super) {
    __extends(SimpleSalesCartItemsReportFetchFailed, _super);
    function SimpleSalesCartItemsReportFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the sales cart items report'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'SimpleSalesCartItemsReportFetchFailed';
        return _this;
    }
    return SimpleSalesCartItemsReportFetchFailed;
}(BaseError));
exports.SimpleSalesCartItemsReportFetchFailed = SimpleSalesCartItemsReportFetchFailed;
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
}(BaseError));
exports.VatReportFetchFailed = VatReportFetchFailed;
var StocksReportFetchFailed = /** @class */ (function (_super) {
    __extends(StocksReportFetchFailed, _super);
    function StocksReportFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the stocks report'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StocksReportFetchFailed';
        return _this;
    }
    return StocksReportFetchFailed;
}(BaseError));
exports.StocksReportFetchFailed = StocksReportFetchFailed;
var AuditActionsFetchAllFailed = /** @class */ (function (_super) {
    __extends(AuditActionsFetchAllFailed, _super);
    function AuditActionsFetchAllFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch audit actions'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AuditActionsFetchAllFailed';
        return _this;
    }
    return AuditActionsFetchAllFailed;
}(BaseError));
exports.AuditActionsFetchAllFailed = AuditActionsFetchAllFailed;
var AuditActionsFetchOneFailed = /** @class */ (function (_super) {
    __extends(AuditActionsFetchOneFailed, _super);
    function AuditActionsFetchOneFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch audit action'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AuditActionsFetchOneFailed';
        return _this;
    }
    return AuditActionsFetchOneFailed;
}(BaseError));
exports.AuditActionsFetchOneFailed = AuditActionsFetchOneFailed;
var AuditActionsGetMetaFailed = /** @class */ (function (_super) {
    __extends(AuditActionsGetMetaFailed, _super);
    function AuditActionsGetMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch audit actions meta'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AuditActionsGetMetaFailed';
        return _this;
    }
    return AuditActionsGetMetaFailed;
}(BaseError));
exports.AuditActionsGetMetaFailed = AuditActionsGetMetaFailed;
var AuditActionsCreateFailed = /** @class */ (function (_super) {
    __extends(AuditActionsCreateFailed, _super);
    function AuditActionsCreateFailed(message, properties) {
        if (message === void 0) { message = 'Could not create audit action'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AuditActionsCreateFailed';
        return _this;
    }
    return AuditActionsCreateFailed;
}(BaseError));
exports.AuditActionsCreateFailed = AuditActionsCreateFailed;
var ImageCreationFailed = /** @class */ (function (_super) {
    __extends(ImageCreationFailed, _super);
    function ImageCreationFailed(message) {
        if (message === void 0) { message = 'Could not create new image'; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = 'ImageCreationFailed';
        return _this;
    }
    return ImageCreationFailed;
}(BaseError));
exports.ImageCreationFailed = ImageCreationFailed;
var ImagePutFailed = /** @class */ (function (_super) {
    __extends(ImagePutFailed, _super);
    function ImagePutFailed(message) {
        if (message === void 0) { message = 'Could not update new image'; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = 'ImagePutFailed';
        return _this;
    }
    return ImagePutFailed;
}(BaseError));
exports.ImagePutFailed = ImagePutFailed;
var StaffCountFailed = /** @class */ (function (_super) {
    __extends(StaffCountFailed, _super);
    function StaffCountFailed(message, properties) {
        if (message === void 0) { message = 'Could not count the staff'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StaffCountFailed';
        return _this;
    }
    return StaffCountFailed;
}(BaseError));
exports.StaffCountFailed = StaffCountFailed;
var NotificationsEmailError = /** @class */ (function (_super) {
    __extends(NotificationsEmailError, _super);
    function NotificationsEmailError(message, properties) {
        if (message === void 0) { message = 'Could not send email'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'NotificationsEmailError';
        return _this;
    }
    return NotificationsEmailError;
}(BaseError));
exports.NotificationsEmailError = NotificationsEmailError;
var ProductGroupsFiltersFetchFailed = /** @class */ (function (_super) {
    __extends(ProductGroupsFiltersFetchFailed, _super);
    function ProductGroupsFiltersFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not get products group filters'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductGroupsFiltersFetchFailed';
        return _this;
    }
    return ProductGroupsFiltersFetchFailed;
}(BaseError));
exports.ProductGroupsFiltersFetchFailed = ProductGroupsFiltersFetchFailed;
//# sourceMappingURL=errors.js.map