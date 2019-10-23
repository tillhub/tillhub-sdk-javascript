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
exports.BaseError = baseError_1.BaseError;
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
exports.ProductsCreateFailed = ProductsCreateFailed;
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
}(baseError_1.BaseError));
exports.ProductFetchFailed = ProductFetchFailed;
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
}(baseError_1.BaseError));
exports.ProductsFetchFailed = ProductsFetchFailed;
var ProductsImportFailed = /** @class */ (function (_super) {
    __extends(ProductsImportFailed, _super);
    function ProductsImportFailed(message, properties) {
        if (message === void 0) { message = 'Could not import the products'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductsImportFailed';
        return _this;
    }
    return ProductsImportFailed;
}(baseError_1.BaseError));
exports.ProductsImportFailed = ProductsImportFailed;
var ProductDetailsFetchFailed = /** @class */ (function (_super) {
    __extends(ProductDetailsFetchFailed, _super);
    function ProductDetailsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the details of the product'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductDetailsFetchFailed';
        return _this;
    }
    return ProductDetailsFetchFailed;
}(baseError_1.BaseError));
exports.ProductDetailsFetchFailed = ProductDetailsFetchFailed;
var ProductChildrenDetailsFetchFailed = /** @class */ (function (_super) {
    __extends(ProductChildrenDetailsFetchFailed, _super);
    function ProductChildrenDetailsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the details of the children products'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductChildrenDetailsFetchFailed';
        return _this;
    }
    return ProductChildrenDetailsFetchFailed;
}(baseError_1.BaseError));
exports.ProductChildrenDetailsFetchFailed = ProductChildrenDetailsFetchFailed;
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
exports.ProductsSearchFailed = ProductsSearchFailed;
var ProductsBookStockFailed = /** @class */ (function (_super) {
    __extends(ProductsBookStockFailed, _super);
    function ProductsBookStockFailed(message, properties) {
        if (message === void 0) { message = 'Could not book stock for the product'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductsBookStockFailed';
        return _this;
    }
    return ProductsBookStockFailed;
}(baseError_1.BaseError));
exports.ProductsBookStockFailed = ProductsBookStockFailed;
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
exports.ConfigurationCreationFailed = ConfigurationCreationFailed;
var ConfigurationDeleteFailed = /** @class */ (function (_super) {
    __extends(ConfigurationDeleteFailed, _super);
    function ConfigurationDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete configuration'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ConfigurationDeleteFailed';
        return _this;
    }
    return ConfigurationDeleteFailed;
}(baseError_1.BaseError));
exports.ConfigurationDeleteFailed = ConfigurationDeleteFailed;
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
exports.UserDeleteFailed = UserDeleteFailed;
var DiscountsFetchFailed = /** @class */ (function (_super) {
    __extends(DiscountsFetchFailed, _super);
    function DiscountsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch discounts'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DiscountsFetchFailed';
        return _this;
    }
    return DiscountsFetchFailed;
}(baseError_1.BaseError));
exports.DiscountsFetchFailed = DiscountsFetchFailed;
var DiscountFetchFailed = /** @class */ (function (_super) {
    __extends(DiscountFetchFailed, _super);
    function DiscountFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch discount'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DiscounteFetchFailed';
        return _this;
    }
    return DiscountFetchFailed;
}(baseError_1.BaseError));
exports.DiscountFetchFailed = DiscountFetchFailed;
var DiscountPutFailed = /** @class */ (function (_super) {
    __extends(DiscountPutFailed, _super);
    function DiscountPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter discount'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DiscountPutFailed';
        return _this;
    }
    return DiscountPutFailed;
}(baseError_1.BaseError));
exports.DiscountPutFailed = DiscountPutFailed;
var DiscountCreationFailed = /** @class */ (function (_super) {
    __extends(DiscountCreationFailed, _super);
    function DiscountCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create discount'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DiscountCreationFailed';
        return _this;
    }
    return DiscountCreationFailed;
}(baseError_1.BaseError));
exports.DiscountCreationFailed = DiscountCreationFailed;
var DiscountsCountFailed = /** @class */ (function (_super) {
    __extends(DiscountsCountFailed, _super);
    function DiscountsCountFailed(message, properties) {
        if (message === void 0) { message = 'Could not count discounts'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DiscountsCountFailed';
        return _this;
    }
    return DiscountsCountFailed;
}(baseError_1.BaseError));
exports.DiscountsCountFailed = DiscountsCountFailed;
var DiscountDeleteFailed = /** @class */ (function (_super) {
    __extends(DiscountDeleteFailed, _super);
    function DiscountDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete discount'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DiscountDeleteFailed';
        return _this;
    }
    return DiscountDeleteFailed;
}(baseError_1.BaseError));
exports.DiscountDeleteFailed = DiscountDeleteFailed;
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
exports.InvoicesGetMetaFailed = InvoicesGetMetaFailed;
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
exports.OpenOrderFetchFailed = OpenOrderFetchFailed;
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
exports.RegisterDeviceConfigurationPutFailed = RegisterDeviceConfigurationPutFailed;
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
exports.AuditActionsCreateFailed = AuditActionsCreateFailed;
var AuditActionsTypesFetchFailed = /** @class */ (function (_super) {
    __extends(AuditActionsTypesFetchFailed, _super);
    function AuditActionsTypesFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch audit action types'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AuditActionsTypesFetchFailed';
        return _this;
    }
    return AuditActionsTypesFetchFailed;
}(baseError_1.BaseError));
exports.AuditActionsTypesFetchFailed = AuditActionsTypesFetchFailed;
var AuditLogsFetchAllFailed = /** @class */ (function (_super) {
    __extends(AuditLogsFetchAllFailed, _super);
    function AuditLogsFetchAllFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch audit logs'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AuditLogsFetchAllFailed';
        return _this;
    }
    return AuditLogsFetchAllFailed;
}(baseError_1.BaseError));
exports.AuditLogsFetchAllFailed = AuditLogsFetchAllFailed;
var AuditLogsFetchOneFailed = /** @class */ (function (_super) {
    __extends(AuditLogsFetchOneFailed, _super);
    function AuditLogsFetchOneFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch audit log'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AuditLogsFetchOneFailed';
        return _this;
    }
    return AuditLogsFetchOneFailed;
}(baseError_1.BaseError));
exports.AuditLogsFetchOneFailed = AuditLogsFetchOneFailed;
var AuditLogsGetMetaFailed = /** @class */ (function (_super) {
    __extends(AuditLogsGetMetaFailed, _super);
    function AuditLogsGetMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch audit logs meta'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AuditLogsGetMetaFailed';
        return _this;
    }
    return AuditLogsGetMetaFailed;
}(baseError_1.BaseError));
exports.AuditLogsGetMetaFailed = AuditLogsGetMetaFailed;
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
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
}(baseError_1.BaseError));
exports.ProductGroupsFiltersFetchFailed = ProductGroupsFiltersFetchFailed;
/**
 * PRINT API
 */
/* Jobs */
var PrintJobsFetchFailed = /** @class */ (function (_super) {
    __extends(PrintJobsFetchFailed, _super);
    function PrintJobsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch print jobs'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PrintJobsFetchFailed';
        return _this;
    }
    return PrintJobsFetchFailed;
}(baseError_1.BaseError));
exports.PrintJobsFetchFailed = PrintJobsFetchFailed;
var PrintJobFetchFailed = /** @class */ (function (_super) {
    __extends(PrintJobFetchFailed, _super);
    function PrintJobFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch print job'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PrintJobFetchFailed';
        return _this;
    }
    return PrintJobFetchFailed;
}(baseError_1.BaseError));
exports.PrintJobFetchFailed = PrintJobFetchFailed;
var PrintJobCreateFailed = /** @class */ (function (_super) {
    __extends(PrintJobCreateFailed, _super);
    function PrintJobCreateFailed(message, properties) {
        if (message === void 0) { message = 'Could not create print job'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PrintJobCreateFailed';
        return _this;
    }
    return PrintJobCreateFailed;
}(baseError_1.BaseError));
exports.PrintJobCreateFailed = PrintJobCreateFailed;
var PrintJobDeleteFailed = /** @class */ (function (_super) {
    __extends(PrintJobDeleteFailed, _super);
    function PrintJobDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete print job'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PrintJobDeleteFailed';
        return _this;
    }
    return PrintJobDeleteFailed;
}(baseError_1.BaseError));
exports.PrintJobDeleteFailed = PrintJobDeleteFailed;
var PrintJobUpdateFailed = /** @class */ (function (_super) {
    __extends(PrintJobUpdateFailed, _super);
    function PrintJobUpdateFailed(message, properties) {
        if (message === void 0) { message = 'Could not update print job'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PrintJobUpdateFailed';
        return _this;
    }
    return PrintJobUpdateFailed;
}(baseError_1.BaseError));
exports.PrintJobUpdateFailed = PrintJobUpdateFailed;
var PrintJobDataFetchFailed = /** @class */ (function (_super) {
    __extends(PrintJobDataFetchFailed, _super);
    function PrintJobDataFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch print job data'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PrintJobDataFetchFailed';
        return _this;
    }
    return PrintJobDataFetchFailed;
}(baseError_1.BaseError));
exports.PrintJobDataFetchFailed = PrintJobDataFetchFailed;
/* Messages */
var PrintMessagesFetchFailed = /** @class */ (function (_super) {
    __extends(PrintMessagesFetchFailed, _super);
    function PrintMessagesFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch print messages'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PrintMessagesFetchFailed';
        return _this;
    }
    return PrintMessagesFetchFailed;
}(baseError_1.BaseError));
exports.PrintMessagesFetchFailed = PrintMessagesFetchFailed;
var PrintMessageFetchFailed = /** @class */ (function (_super) {
    __extends(PrintMessageFetchFailed, _super);
    function PrintMessageFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch print message'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PrintMessageFetchFailed';
        return _this;
    }
    return PrintMessageFetchFailed;
}(baseError_1.BaseError));
exports.PrintMessageFetchFailed = PrintMessageFetchFailed;
var PrintMessageCreateFailed = /** @class */ (function (_super) {
    __extends(PrintMessageCreateFailed, _super);
    function PrintMessageCreateFailed(message, properties) {
        if (message === void 0) { message = 'Could not create print message'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PrintMessageCreateFailed';
        return _this;
    }
    return PrintMessageCreateFailed;
}(baseError_1.BaseError));
exports.PrintMessageCreateFailed = PrintMessageCreateFailed;
var PrintMessageDeleteFailed = /** @class */ (function (_super) {
    __extends(PrintMessageDeleteFailed, _super);
    function PrintMessageDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete print message'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PrintMessageDeleteFailed';
        return _this;
    }
    return PrintMessageDeleteFailed;
}(baseError_1.BaseError));
exports.PrintMessageDeleteFailed = PrintMessageDeleteFailed;
var PrintMessageUpdateFailed = /** @class */ (function (_super) {
    __extends(PrintMessageUpdateFailed, _super);
    function PrintMessageUpdateFailed(message, properties) {
        if (message === void 0) { message = 'Could not update print message'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PrintMessageUpdateFailed';
        return _this;
    }
    return PrintMessageUpdateFailed;
}(baseError_1.BaseError));
exports.PrintMessageUpdateFailed = PrintMessageUpdateFailed;
/* Printers */
var PrintersFetchFailed = /** @class */ (function (_super) {
    __extends(PrintersFetchFailed, _super);
    function PrintersFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch printers'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PrintersFetchFailed';
        return _this;
    }
    return PrintersFetchFailed;
}(baseError_1.BaseError));
exports.PrintersFetchFailed = PrintersFetchFailed;
var PrinterFetchFailed = /** @class */ (function (_super) {
    __extends(PrinterFetchFailed, _super);
    function PrinterFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch printer'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PrinterFetchFailed';
        return _this;
    }
    return PrinterFetchFailed;
}(baseError_1.BaseError));
exports.PrinterFetchFailed = PrinterFetchFailed;
var PrinterCreateFailed = /** @class */ (function (_super) {
    __extends(PrinterCreateFailed, _super);
    function PrinterCreateFailed(message, properties) {
        if (message === void 0) { message = 'Could not create printer'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PrinterCreateFailed';
        return _this;
    }
    return PrinterCreateFailed;
}(baseError_1.BaseError));
exports.PrinterCreateFailed = PrinterCreateFailed;
var PrinterDeleteFailed = /** @class */ (function (_super) {
    __extends(PrinterDeleteFailed, _super);
    function PrinterDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete printer'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PrinterDeleteFailed';
        return _this;
    }
    return PrinterDeleteFailed;
}(baseError_1.BaseError));
exports.PrinterDeleteFailed = PrinterDeleteFailed;
var PrinterUpdateFailed = /** @class */ (function (_super) {
    __extends(PrinterUpdateFailed, _super);
    function PrinterUpdateFailed(message, properties) {
        if (message === void 0) { message = 'Could not update printer'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PrinterUpdateFailed';
        return _this;
    }
    return PrinterUpdateFailed;
}(baseError_1.BaseError));
exports.PrinterUpdateFailed = PrinterUpdateFailed;
var MessagesFetchFailed = /** @class */ (function (_super) {
    __extends(MessagesFetchFailed, _super);
    function MessagesFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the messages'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'MessagesFetchFailed';
        return _this;
    }
    return MessagesFetchFailed;
}(baseError_1.BaseError));
exports.MessagesFetchFailed = MessagesFetchFailed;
/**
 * FAVOURITES
 */
var FavouritesFetchFailed = /** @class */ (function (_super) {
    __extends(FavouritesFetchFailed, _super);
    function FavouritesFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch favourites set'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'FavouritesFetchFailed';
        return _this;
    }
    return FavouritesFetchFailed;
}(baseError_1.BaseError));
exports.FavouritesFetchFailed = FavouritesFetchFailed;
var FavouriteFetchFailed = /** @class */ (function (_super) {
    __extends(FavouriteFetchFailed, _super);
    function FavouriteFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch favourite'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'FavouriteFetchFailed';
        return _this;
    }
    return FavouriteFetchFailed;
}(baseError_1.BaseError));
exports.FavouriteFetchFailed = FavouriteFetchFailed;
var FavouriteCreateFailed = /** @class */ (function (_super) {
    __extends(FavouriteCreateFailed, _super);
    function FavouriteCreateFailed(message, properties) {
        if (message === void 0) { message = 'Could not create favourite'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'FavouriteCreateFailed';
        return _this;
    }
    return FavouriteCreateFailed;
}(baseError_1.BaseError));
exports.FavouriteCreateFailed = FavouriteCreateFailed;
var FavouriteDeleteFailed = /** @class */ (function (_super) {
    __extends(FavouriteDeleteFailed, _super);
    function FavouriteDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete favourite'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'FavouriteDeleteFailed';
        return _this;
    }
    return FavouriteDeleteFailed;
}(baseError_1.BaseError));
exports.FavouriteDeleteFailed = FavouriteDeleteFailed;
var FavouriteUpdateFailed = /** @class */ (function (_super) {
    __extends(FavouriteUpdateFailed, _super);
    function FavouriteUpdateFailed(message, properties) {
        if (message === void 0) { message = 'Could not update favourite'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'FavouriteUpdateFailed';
        return _this;
    }
    return FavouriteUpdateFailed;
}(baseError_1.BaseError));
exports.FavouriteUpdateFailed = FavouriteUpdateFailed;
var MessagesUpdateFailed = /** @class */ (function (_super) {
    __extends(MessagesUpdateFailed, _super);
    function MessagesUpdateFailed(message, properties) {
        if (message === void 0) { message = 'Could not update the message'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'MessagesUpdateFailed';
        return _this;
    }
    return MessagesUpdateFailed;
}(baseError_1.BaseError));
exports.MessagesUpdateFailed = MessagesUpdateFailed;
var BalancesFetchFailed = /** @class */ (function (_super) {
    __extends(BalancesFetchFailed, _super);
    function BalancesFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the balances'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'BalancesFetchFailed';
        return _this;
    }
    return BalancesFetchFailed;
}(baseError_1.BaseError));
exports.BalancesFetchFailed = BalancesFetchFailed;
var BalancesFetchOneFailed = /** @class */ (function (_super) {
    __extends(BalancesFetchOneFailed, _super);
    function BalancesFetchOneFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the balance'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'BalancesFetchOneFailed';
        return _this;
    }
    return BalancesFetchOneFailed;
}(baseError_1.BaseError));
exports.BalancesFetchOneFailed = BalancesFetchOneFailed;
var BalancesMetaFailed = /** @class */ (function (_super) {
    __extends(BalancesMetaFailed, _super);
    function BalancesMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch meta data for balances'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'BalancesMetaFailed';
        return _this;
    }
    return BalancesMetaFailed;
}(baseError_1.BaseError));
exports.BalancesMetaFailed = BalancesMetaFailed;
var LegacySettingsFetchFailed = /** @class */ (function (_super) {
    __extends(LegacySettingsFetchFailed, _super);
    function LegacySettingsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch legacy settings'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'LegacySettingsFetchFailed';
        return _this;
    }
    return LegacySettingsFetchFailed;
}(baseError_1.BaseError));
exports.LegacySettingsFetchFailed = LegacySettingsFetchFailed;
var LegacySettingFetchFailed = /** @class */ (function (_super) {
    __extends(LegacySettingFetchFailed, _super);
    function LegacySettingFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch one legacy settings object'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'LegacySettingFetchFailed';
        return _this;
    }
    return LegacySettingFetchFailed;
}(baseError_1.BaseError));
exports.LegacySettingFetchFailed = LegacySettingFetchFailed;
var LegacySettingUpdateFailed = /** @class */ (function (_super) {
    __extends(LegacySettingUpdateFailed, _super);
    function LegacySettingUpdateFailed(message, properties) {
        if (message === void 0) { message = 'Could not update one legacy settings object'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'LegacySettingUpdateFailed';
        return _this;
    }
    return LegacySettingUpdateFailed;
}(baseError_1.BaseError));
exports.LegacySettingUpdateFailed = LegacySettingUpdateFailed;
//# sourceMappingURL=index.js.map