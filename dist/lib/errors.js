"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
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
var ProductsCreateFailed = /** @class */ (function (_super) {
    __extends(ProductsCreateFailed, _super);
    function ProductsCreateFailed(message) {
        if (message === void 0) { message = 'Could not create the product'; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = 'ProductsCreateFailed';
        return _this;
    }
    return ProductsCreateFailed;
}(BaseError));
exports.ProductsCreateFailed = ProductsCreateFailed;
var ProductsFetchFailed = /** @class */ (function (_super) {
    __extends(ProductsFetchFailed, _super);
    function ProductsFetchFailed(message) {
        if (message === void 0) { message = 'Could not fetch the products'; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = 'ProductsFetchFailed';
        return _this;
    }
    return ProductsFetchFailed;
}(BaseError));
exports.ProductsFetchFailed = ProductsFetchFailed;
var ProductFetchFailed = /** @class */ (function (_super) {
    __extends(ProductFetchFailed, _super);
    function ProductFetchFailed(message) {
        if (message === void 0) { message = 'Could not fetch the product'; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = 'ProductFetchFailed';
        return _this;
    }
    return ProductFetchFailed;
}(BaseError));
exports.ProductFetchFailed = ProductFetchFailed;
var ProductsCountFailed = /** @class */ (function (_super) {
    __extends(ProductsCountFailed, _super);
    function ProductsCountFailed(message) {
        if (message === void 0) { message = 'Could not count the products'; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = 'ProductsCountFailed';
        return _this;
    }
    return ProductsCountFailed;
}(BaseError));
exports.ProductsCountFailed = ProductsCountFailed;
var ProductsUpdateFailed = /** @class */ (function (_super) {
    __extends(ProductsUpdateFailed, _super);
    function ProductsUpdateFailed(message) {
        if (message === void 0) { message = 'Could not update the product'; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = 'ProductsUpdateFailed';
        return _this;
    }
    return ProductsUpdateFailed;
}(BaseError));
exports.ProductsUpdateFailed = ProductsUpdateFailed;
var ProductsDeleteFailed = /** @class */ (function (_super) {
    __extends(ProductsDeleteFailed, _super);
    function ProductsDeleteFailed(message) {
        if (message === void 0) { message = 'Could not delete the product'; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = 'ProductsDeleteFailed';
        return _this;
    }
    return ProductsDeleteFailed;
}(BaseError));
exports.ProductsDeleteFailed = ProductsDeleteFailed;
var ProductsSearchFailed = /** @class */ (function (_super) {
    __extends(ProductsSearchFailed, _super);
    function ProductsSearchFailed(message) {
        if (message === void 0) { message = 'Could not search for the product'; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = 'ProductsSearchFailed';
        return _this;
    }
    return ProductsSearchFailed;
}(BaseError));
exports.ProductsSearchFailed = ProductsSearchFailed;
var DeliveriesFetchAllFailed = /** @class */ (function (_super) {
    __extends(DeliveriesFetchAllFailed, _super);
    function DeliveriesFetchAllFailed(message) {
        if (message === void 0) { message = 'Could not fetch deliveries'; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = 'DeliveriesFetchAllFailed';
        return _this;
    }
    return DeliveriesFetchAllFailed;
}(BaseError));
exports.DeliveriesFetchAllFailed = DeliveriesFetchAllFailed;
var DeliveriesFetchOneFailed = /** @class */ (function (_super) {
    __extends(DeliveriesFetchOneFailed, _super);
    function DeliveriesFetchOneFailed(message) {
        if (message === void 0) { message = 'Could not fetch delivery'; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = 'DeliveriesFetchOneFailed';
        return _this;
    }
    return DeliveriesFetchOneFailed;
}(BaseError));
exports.DeliveriesFetchOneFailed = DeliveriesFetchOneFailed;
var DeliveriesCreateFailed = /** @class */ (function (_super) {
    __extends(DeliveriesCreateFailed, _super);
    function DeliveriesCreateFailed(message) {
        if (message === void 0) { message = 'Could not create delivery'; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = 'DeliveriesCreateFailed';
        return _this;
    }
    return DeliveriesCreateFailed;
}(BaseError));
exports.DeliveriesCreateFailed = DeliveriesCreateFailed;
var DeliveriesPDFFailed = /** @class */ (function (_super) {
    __extends(DeliveriesPDFFailed, _super);
    function DeliveriesPDFFailed(message) {
        if (message === void 0) { message = 'Could not create PDF for delivery'; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = 'DeliveriesPDFFailed';
        return _this;
    }
    return DeliveriesPDFFailed;
}(BaseError));
exports.DeliveriesPDFFailed = DeliveriesPDFFailed;
var DeliveriesUpdateFailed = /** @class */ (function (_super) {
    __extends(DeliveriesUpdateFailed, _super);
    function DeliveriesUpdateFailed(message) {
        if (message === void 0) { message = 'Could not update delivery'; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = 'DeliveriesUpdateFailed';
        return _this;
    }
    return DeliveriesUpdateFailed;
}(BaseError));
exports.DeliveriesUpdateFailed = DeliveriesUpdateFailed;
var DeliveriesInProgressFailed = /** @class */ (function (_super) {
    __extends(DeliveriesInProgressFailed, _super);
    function DeliveriesInProgressFailed(message) {
        if (message === void 0) { message = 'Could not change delivery status to "in_progress'; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = 'DeliveriesInProgressFailed';
        return _this;
    }
    return DeliveriesInProgressFailed;
}(BaseError));
exports.DeliveriesInProgressFailed = DeliveriesInProgressFailed;
var DeliveriesDispatchFailed = /** @class */ (function (_super) {
    __extends(DeliveriesDispatchFailed, _super);
    function DeliveriesDispatchFailed(message) {
        if (message === void 0) { message = 'Could not change delivery status to "in_progress'; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = 'DeliveriesDispatchFailed';
        return _this;
    }
    return DeliveriesDispatchFailed;
}(BaseError));
exports.DeliveriesDispatchFailed = DeliveriesDispatchFailed;
var DeliveriesDeleteFailed = /** @class */ (function (_super) {
    __extends(DeliveriesDeleteFailed, _super);
    function DeliveriesDeleteFailed(message) {
        if (message === void 0) { message = 'Could not delete delivery'; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = 'DeliveriesDeleteFailed';
        return _this;
    }
    return DeliveriesDeleteFailed;
}(BaseError));
exports.DeliveriesDeleteFailed = DeliveriesDeleteFailed;
var DeliveryItemsCreateFailed = /** @class */ (function (_super) {
    __extends(DeliveryItemsCreateFailed, _super);
    function DeliveryItemsCreateFailed(message) {
        if (message === void 0) { message = 'Could not create delivery items'; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = 'DeliveryItemsCreateFailed';
        return _this;
    }
    return DeliveryItemsCreateFailed;
}(BaseError));
exports.DeliveryItemsCreateFailed = DeliveryItemsCreateFailed;
var DeliveryItemsFetchAllFailed = /** @class */ (function (_super) {
    __extends(DeliveryItemsFetchAllFailed, _super);
    function DeliveryItemsFetchAllFailed(message) {
        if (message === void 0) { message = 'Could not fetch delivery items'; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = 'DeliveryItemsFetchAllFailed';
        return _this;
    }
    return DeliveryItemsFetchAllFailed;
}(BaseError));
exports.DeliveryItemsFetchAllFailed = DeliveryItemsFetchAllFailed;
var DeliveryItemUpdateFailed = /** @class */ (function (_super) {
    __extends(DeliveryItemUpdateFailed, _super);
    function DeliveryItemUpdateFailed(message) {
        if (message === void 0) { message = 'Could not update delivery'; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = 'DeliveryItemUpdateFailed';
        return _this;
    }
    return DeliveryItemUpdateFailed;
}(BaseError));
exports.DeliveryItemUpdateFailed = DeliveryItemUpdateFailed;
var ProductGroupsFetchFailed = /** @class */ (function (_super) {
    __extends(ProductGroupsFetchFailed, _super);
    function ProductGroupsFetchFailed(message) {
        if (message === void 0) { message = 'Could not fetch product groups'; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = 'ProductGroupsFetchFailed';
        return _this;
    }
    return ProductGroupsFetchFailed;
}(BaseError));
exports.ProductGroupsFetchFailed = ProductGroupsFetchFailed;
var AccountsFetchFailed = /** @class */ (function (_super) {
    __extends(AccountsFetchFailed, _super);
    function AccountsFetchFailed(message) {
        if (message === void 0) { message = 'Could not fetch accounts'; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = 'AccountsFetchFailed';
        return _this;
    }
    return AccountsFetchFailed;
}(BaseError));
exports.AccountsFetchFailed = AccountsFetchFailed;
var TemplatesCreationFailed = /** @class */ (function (_super) {
    __extends(TemplatesCreationFailed, _super);
    function TemplatesCreationFailed(message) {
        if (message === void 0) { message = 'Could not create template'; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = 'TemplatesCreationFailed';
        return _this;
    }
    return TemplatesCreationFailed;
}(BaseError));
exports.TemplatesCreationFailed = TemplatesCreationFailed;
var TemplatesPutFailed = /** @class */ (function (_super) {
    __extends(TemplatesPutFailed, _super);
    function TemplatesPutFailed(message) {
        if (message === void 0) { message = 'Could not replace template'; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = 'TemplatesPutFailed';
        return _this;
    }
    return TemplatesPutFailed;
}(BaseError));
exports.TemplatesPutFailed = TemplatesPutFailed;
var TemplatesFetchFailed = /** @class */ (function (_super) {
    __extends(TemplatesFetchFailed, _super);
    function TemplatesFetchFailed(message) {
        if (message === void 0) { message = 'Could not fetch templates'; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = 'TemplatesFetchFailed';
        return _this;
    }
    return TemplatesFetchFailed;
}(BaseError));
exports.TemplatesFetchFailed = TemplatesFetchFailed;
var TemplatesPreviewFailed = /** @class */ (function (_super) {
    __extends(TemplatesPreviewFailed, _super);
    function TemplatesPreviewFailed(message) {
        if (message === void 0) { message = 'Could not preview template'; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = 'TemplatesPreviewFailed';
        return _this;
    }
    return TemplatesPreviewFailed;
}(BaseError));
exports.TemplatesPreviewFailed = TemplatesPreviewFailed;
var ConfigurationsFetchFailed = /** @class */ (function (_super) {
    __extends(ConfigurationsFetchFailed, _super);
    function ConfigurationsFetchFailed(message) {
        if (message === void 0) { message = 'Could not fetch configs'; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = 'ConfigurationsFetchFailed';
        return _this;
    }
    return ConfigurationsFetchFailed;
}(BaseError));
exports.ConfigurationsFetchFailed = ConfigurationsFetchFailed;
var BranchesFetchFailed = /** @class */ (function (_super) {
    __extends(BranchesFetchFailed, _super);
    function BranchesFetchFailed(message) {
        if (message === void 0) { message = 'Could not fetch branches'; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = 'BranchesFetchFailed';
        return _this;
    }
    return BranchesFetchFailed;
}(BaseError));
exports.BranchesFetchFailed = BranchesFetchFailed;
var BranchesCountFailed = /** @class */ (function (_super) {
    __extends(BranchesCountFailed, _super);
    function BranchesCountFailed(message) {
        if (message === void 0) { message = 'Could not count the branches'; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = 'BranchesCountFailed';
        return _this;
    }
    return BranchesCountFailed;
}(BaseError));
exports.BranchesCountFailed = BranchesCountFailed;
var CustomersFetchFailed = /** @class */ (function (_super) {
    __extends(CustomersFetchFailed, _super);
    function CustomersFetchFailed(message) {
        if (message === void 0) { message = 'Could not fetch customers'; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = 'CustomersFetchFailed';
        return _this;
    }
    return CustomersFetchFailed;
}(BaseError));
exports.CustomersFetchFailed = CustomersFetchFailed;
var CustomersCountFailed = /** @class */ (function (_super) {
    __extends(CustomersCountFailed, _super);
    function CustomersCountFailed(message) {
        if (message === void 0) { message = 'Could not count the customers'; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = 'CustomersCountFailed';
        return _this;
    }
    return CustomersCountFailed;
}(BaseError));
exports.CustomersCountFailed = CustomersCountFailed;
var CustomerDeleteFailed = /** @class */ (function (_super) {
    __extends(CustomerDeleteFailed, _super);
    function CustomerDeleteFailed(message) {
        if (message === void 0) { message = 'Could not delete the customer'; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = 'CustomerDeleteFailed';
        return _this;
    }
    return CustomerDeleteFailed;
}(BaseError));
exports.CustomerDeleteFailed = CustomerDeleteFailed;
var VouchersFetchFailed = /** @class */ (function (_super) {
    __extends(VouchersFetchFailed, _super);
    function VouchersFetchFailed(message) {
        if (message === void 0) { message = 'Could not fetch the vouchers'; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = 'VouchersFetchFailed';
        return _this;
    }
    return VouchersFetchFailed;
}(BaseError));
exports.VouchersFetchFailed = VouchersFetchFailed;
var VouchersCountFailed = /** @class */ (function (_super) {
    __extends(VouchersCountFailed, _super);
    function VouchersCountFailed(message) {
        if (message === void 0) { message = 'Could not count the vouchers'; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = 'VouchersCountFailed';
        return _this;
    }
    return VouchersCountFailed;
}(BaseError));
exports.VouchersCountFailed = VouchersCountFailed;
var VoucherDeleteFailed = /** @class */ (function (_super) {
    __extends(VoucherDeleteFailed, _super);
    function VoucherDeleteFailed(message) {
        if (message === void 0) { message = 'Could not delete the voucher'; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = 'VoucherDeleteFailed';
        return _this;
    }
    return VoucherDeleteFailed;
}(BaseError));
exports.VoucherDeleteFailed = VoucherDeleteFailed;
var VouchersLogsFetchFailed = /** @class */ (function (_super) {
    __extends(VouchersLogsFetchFailed, _super);
    function VouchersLogsFetchFailed(message) {
        if (message === void 0) { message = 'Could not fetch the vouchers logs'; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = 'VouchersLogsFetchFailed';
        return _this;
    }
    return VouchersLogsFetchFailed;
}(BaseError));
exports.VouchersLogsFetchFailed = VouchersLogsFetchFailed;
var VouchersLogsCountFailed = /** @class */ (function (_super) {
    __extends(VouchersLogsCountFailed, _super);
    function VouchersLogsCountFailed(message) {
        if (message === void 0) { message = 'Could not count the vouchers logs'; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = 'VouchersLogsCountFailed';
        return _this;
    }
    return VouchersLogsCountFailed;
}(BaseError));
exports.VouchersLogsCountFailed = VouchersLogsCountFailed;
var InvoicesFetchAllFailed = /** @class */ (function (_super) {
    __extends(InvoicesFetchAllFailed, _super);
    function InvoicesFetchAllFailed(message) {
        if (message === void 0) { message = 'Could not fetch invoices'; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = 'InvoicesFetchAllFailed';
        return _this;
    }
    return InvoicesFetchAllFailed;
}(BaseError));
exports.InvoicesFetchAllFailed = InvoicesFetchAllFailed;
var InvoicesFetchOneFailed = /** @class */ (function (_super) {
    __extends(InvoicesFetchOneFailed, _super);
    function InvoicesFetchOneFailed(message) {
        if (message === void 0) { message = 'Could not fetch the invoice'; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = 'InvoicesFetchOneFailed';
        return _this;
    }
    return InvoicesFetchOneFailed;
}(BaseError));
exports.InvoicesFetchOneFailed = InvoicesFetchOneFailed;
var InvoicesCreateFailed = /** @class */ (function (_super) {
    __extends(InvoicesCreateFailed, _super);
    function InvoicesCreateFailed(message) {
        if (message === void 0) { message = 'Could not create invoice'; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = 'InvoicesCreateFailed';
        return _this;
    }
    return InvoicesCreateFailed;
}(BaseError));
exports.InvoicesCreateFailed = InvoicesCreateFailed;
var InvoicesUpdateFailed = /** @class */ (function (_super) {
    __extends(InvoicesUpdateFailed, _super);
    function InvoicesUpdateFailed(message) {
        if (message === void 0) { message = 'Could not update invoice'; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = 'InvoicesUpdateFailed';
        return _this;
    }
    return InvoicesUpdateFailed;
}(BaseError));
exports.InvoicesUpdateFailed = InvoicesUpdateFailed;
var InvoicesDeleteFailed = /** @class */ (function (_super) {
    __extends(InvoicesDeleteFailed, _super);
    function InvoicesDeleteFailed(message) {
        if (message === void 0) { message = 'Could not delete invoice'; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = 'InvoicesDeleteFailed';
        return _this;
    }
    return InvoicesDeleteFailed;
}(BaseError));
exports.InvoicesDeleteFailed = InvoicesDeleteFailed;
//# sourceMappingURL=errors.js.map