export declare class BaseError {
    constructor(message: string);
}
export declare class AuthenticationFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class UninstantiatedClient extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class TransactionFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class TransactionPdfFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class TaxesFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class ProductsCreateFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class ProductsFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class ProductFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class ProductsCountFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class ProductsUpdateFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class ProductsDeleteFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class ProductsSearchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class DeliveriesFetchAllFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class DeliveriesFetchOneFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class DeliveriesCreateFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class DeliveriesPDFFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class DeliveriesUpdateFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class DeliveriesInProgressFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class DeliveriesDispatchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class DeliveriesDeleteFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class DeliveryItemsCreateFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class DeliveryItemsFetchAllFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class DeliveryItemUpdateFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class ProductGroupsFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class AccountsFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class TemplatesCreationFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class TemplatesPutFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class TemplatesFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class TemplatesPreviewFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class ConfigurationsFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class BranchesFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class BranchesCountFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class CustomersFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class CustomersCountFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class CustomerDeleteFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class VoucherTypeError extends BaseError {
    message: string;
    name: string;
    constructor(message: string);
}
export declare class VouchersFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class VoucherFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class VoucherPutFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class VoucherPatchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class VoucherCreationFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class VouchersCountFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class VoucherDeleteFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class VouchersLogsFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class VouchersLogsCountFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class InvoicesFetchAllFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class InvoicesFetchOneFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class InvoicesCreateFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class InvoicesUpdateFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class InvoicesDeleteFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class StocksFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class StocksCreateFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class StocksUpdateFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class StocksLocationsFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class OrdersFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class OrdersCreateFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class OrdersUpdateFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class IncomingOrdersFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class OutgoingOrdersFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class OrderItemsFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class OrderItemsCreateFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class OrderItemUpdateFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class OrderItemsUpdateFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class OrderItemsDeleteFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class OrderSuggestionsFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class HistoricOrderItemsFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class BookStockFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class OpenOrderFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class RevenuesFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class StaffFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class RegistersFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class StatisticsProductFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
