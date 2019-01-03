export class BaseError extends Error {
  public properties?: any
  public message: string

  constructor(message: string, properties?: any) {
    super()
    this.message = message
    this.properties = properties

    Object.setPrototypeOf(this, BaseError.prototype)
  }
}

export class AuthenticationFailed extends BaseError {
  public name = 'AuthenticationFailed'
  constructor(public message: string = 'Authentication was not successful', properties?: any) {
    super(message, properties)
  }
}

export class UninstantiatedClient extends BaseError {
  public name = 'UninstantiatedClient'
  constructor(
    public message: string = 'Cannot instantiate API without instantiated HTTP client',
    properties?: any
  ) {
    super(message, properties)
  }
}

export class TransactionFetchFailed extends BaseError {
  public name = 'TransactionFetchFailed'
  constructor(public message: string = 'Could not fetch transaction', properties?: any) {
    super(message, properties)
  }
}

export class TransactionPdfFailed extends BaseError {
  public name = 'TransactionPdfFailed'
  constructor(public message: string = 'Could not create pdf', properties?: any) {
    super(message, properties)
  }
}

export class TransactionSigningInitialisationFailed extends BaseError {
  public name = 'TransactionSigningInitialisationFailed'
  constructor(public message: string = 'Could not initialise signing system', properties?: any) {
    super(message, properties)
  }
}

export class TransactionSigningYearlyReceiptFailed extends BaseError {
  public name = 'TransactionSigningYearlyReceiptFailed'
  constructor(public message: string = 'Could not generate yearly receipt', properties?: any) {
    super(message, properties)
  }
}

export class TransactionSigningMonthlyReceiptFailed extends BaseError {
  public name = 'TransactionSigningMonthlyReceiptFailed'
  constructor(public message: string = 'Could not generate monthly receipt', properties?: any) {
    super(message, properties)
  }
}

export class TransactionSigningZeroReceiptFailed extends BaseError {
  public name = 'TransactionSigningZeroReceiptFailed'
  constructor(public message: string = 'Could not generate zero receipt', properties?: any) {
    super(message, properties)
  }
}

export class TaxesFetchFailed extends BaseError {
  public name = 'TaxesFetchFailed'
  constructor(public message: string = 'Could not fetch taxes', properties?: any) {
    super(message, properties)
  }
}

export class TaxesPutFailed extends BaseError {
  public name = 'TaxesPutFailed'
  constructor(public message: string = 'Could not alter tax', properties?: any) {
    super(message, properties)
  }
}

export class TaxesCreationFailed extends BaseError {
  public name = 'TaxesCreationFailed'
  constructor(public message: string = 'Could not create tax', properties?: any) {
    super(message, properties)
  }
}

export class ProductsCreateFailed extends BaseError {
  public name = 'ProductsCreateFailed'
  constructor(public message: string = 'Could not create the product', properties?: any) {
    super(message, properties)
  }
}

export class ProductsFetchFailed extends BaseError {
  public name = 'ProductsFetchFailed'
  constructor(public message: string = 'Could not fetch the products', properties?: any) {
    super(message, properties)
  }
}

export class ProductFetchFailed extends BaseError {
  public name = 'ProductFetchFailed'
  constructor(public message: string = 'Could not fetch the product', properties?: any) {
    super(message, properties)
  }
}

export class ProductsCountFailed extends BaseError {
  public name = 'ProductsCountFailed'
  constructor(public message: string = 'Could not count the products', properties?: any) {
    super(message, properties)
  }
}

export class ProductsMetaFailed extends BaseError {
  public name = 'ProductsMetaFailed'
  constructor(public message: string = 'Could not get products metadata', properties?: any) {
    super(message, properties)
  }
}

export class ProductsUpdateFailed extends BaseError {
  public name = 'ProductsUpdateFailed'
  constructor(public message: string = 'Could not update the product', properties?: any) {
    super(message, properties)
  }
}

export class ProductsDeleteFailed extends BaseError {
  public name = 'ProductsDeleteFailed'
  constructor(public message: string = 'Could not delete the product', properties?: any) {
    super(message, properties)
  }
}

export class ProductsSearchFailed extends BaseError {
  public name = 'ProductsSearchFailed'
  constructor(public message: string = 'Could not search for the product', properties?: any) {
    super(message, properties)
  }
}

export class DeliveriesFetchAllFailed extends BaseError {
  public name = 'DeliveriesFetchAllFailed'
  constructor(public message: string = 'Could not fetch deliveries', properties?: any) {
    super(message, properties)
  }
}

export class DeliveriesFetchOneFailed extends BaseError {
  public name = 'DeliveriesFetchOneFailed'
  constructor(public message: string = 'Could not fetch delivery', properties?: any) {
    super(message, properties)
  }
}

export class DeliveriesCreateFailed extends BaseError {
  public name = 'DeliveriesCreateFailed'
  constructor(public message: string = 'Could not create delivery', properties?: any) {
    super(message, properties)
  }
}

export class DeliveriesPDFFailed extends BaseError {
  public name = 'DeliveriesPDFFailed'
  constructor(public message: string = 'Could not create PDF for delivery', properties?: any) {
    super(message, properties)
  }
}

export class DeliveriesUpdateFailed extends BaseError {
  public name = 'DeliveriesUpdateFailed'
  constructor(public message: string = 'Could not update delivery', properties?: any) {
    super(message, properties)
  }
}

export class DeliveriesInProgressFailed extends BaseError {
  public name = 'DeliveriesInProgressFailed'
  constructor(
    public message: string = 'Could not change delivery status to "in_progress',
    properties?: any
  ) {
    super(message, properties)
  }
}

export class DeliveriesDispatchFailed extends BaseError {
  public name = 'DeliveriesDispatchFailed'
  constructor(
    public message: string = 'Could not change delivery status to "in_progress',
    properties?: any
  ) {
    super(message, properties)
  }
}

export class DeliveriesDeleteFailed extends BaseError {
  public name = 'DeliveriesDeleteFailed'
  constructor(public message: string = 'Could not delete delivery', properties?: any) {
    super(message, properties)
  }
}

export class DeliveryItemsCreateFailed extends BaseError {
  public name = 'DeliveryItemsCreateFailed'
  constructor(public message: string = 'Could not create delivery items', properties?: any) {
    super(message, properties)
  }
}

export class DeliveryItemsFetchAllFailed extends BaseError {
  public name = 'DeliveryItemsFetchAllFailed'
  constructor(public message: string = 'Could not fetch delivery items', properties?: any) {
    super(message, properties)
  }
}

export class DeliveryItemUpdateFailed extends BaseError {
  public name = 'DeliveryItemUpdateFailed'
  constructor(public message: string = 'Could not update delivery', properties?: any) {
    super(message, properties)
  }
}

export class ProductGroupsFetchFailed extends BaseError {
  public name = 'ProductGroupsFetchFailed'
  constructor(public message: string = 'Could not fetch product groups', properties?: any) {
    super(message, properties)
  }
}

export class ProductGroupFetchFailed extends BaseError {
  public name = 'ProductGroupFetchFailed'
  constructor(public message: string = 'Could not fetch product group', properties?: any) {
    super(message, properties)
  }
}

export class ProductGroupPutFailed extends BaseError {
  public name = 'ProductGroupPutFailed'
  constructor(public message: string = 'Could not alter product group', properties?: any) {
    super(message, properties)
  }
}

export class ProductGroupCreationFailed extends BaseError {
  public name = 'ProductGroupCreationFailed'
  constructor(public message: string = 'Could create product group', properties?: any) {
    super(message, properties)
  }
}

export class ProuctGroupsCountFailed extends BaseError {
  public name = 'ProuctGroupsCountFailed'
  constructor(public message: string = 'Could not get count of product groups', properties?: any) {
    super(message, properties)
  }
}

export class AccountsFetchFailed extends BaseError {
  public name = 'AccountsFetchFailed'
  constructor(public message: string = 'Could not fetch accounts', properties?: any) {
    super(message, properties)
  }
}

export class AccountFetchFailed extends BaseError {
  public name = 'AccountFetchFailed'
  constructor(public message: string = 'Could not fetch account', properties?: any) {
    super(message, properties)
  }
}

export class AccountPutFailed extends BaseError {
  public name = 'AccountPutFailed'
  constructor(public message: string = 'Could not alter account', properties?: any) {
    super(message, properties)
  }
}

export class AccountCreationFailed extends BaseError {
  public name = 'AccountCreationFailed'
  constructor(public message: string = 'Could not create account', properties?: any) {
    super(message, properties)
  }
}

export class ExpenseAccountsFetchFailed extends BaseError {
  public name = 'ExpenseAccountsFetchFailed'
  constructor(public message: string = 'Could not fetch expense accounts', properties?: any) {
    super(message, properties)
  }
}

export class ExpenseAccountFetchFailed extends BaseError {
  public name = 'ExpenseAccountFetchFailed'
  constructor(public message: string = 'Could not fetch expense account', properties?: any) {
    super(message, properties)
  }
}

export class ExpenseAccountPutFailed extends BaseError {
  public name = 'ExpenseAccountPutFailed'
  constructor(public message: string = 'Could not alter expense account', properties?: any) {
    super(message, properties)
  }
}

export class ExpenseAccountCreationFailed extends BaseError {
  public name = 'ExpenseAccountCreationFailed'
  constructor(public message: string = 'Could not create expense account', properties?: any) {
    super(message, properties)
  }
}

export class PaymentOptionsFetchFailed extends BaseError {
  public name = 'PaymentOptionsFetchFailed'
  constructor(public message: string = 'Could not fetch payment option', properties?: any) {
    super(message, properties)
  }
}

export class PaymentOptionFetchFailed extends BaseError {
  public name = 'PaymentOptionFetchFailed'
  constructor(public message: string = 'Could not fetch payment option', properties?: any) {
    super(message, properties)
  }
}

export class PaymentOptionPutFailed extends BaseError {
  public name = 'PaymentOptionPutFailed'
  constructor(public message: string = 'Could not alter payment option', properties?: any) {
    super(message, properties)
  }
}

export class PaymentOptionCreationFailed extends BaseError {
  public name = 'PaymentOptionCreationFailed'
  constructor(public message: string = 'Could not create payment option', properties?: any) {
    super(message, properties)
  }
}

export class TemplatesCreationFailed extends BaseError {
  public name = 'TemplatesCreationFailed'
  constructor(public message: string = 'Could not create template', properties?: any) {
    super(message, properties)
  }
}

export class TemplatesPutFailed extends BaseError {
  public name = 'TemplatesPutFailed'
  constructor(public message: string = 'Could not replace template', properties?: any) {
    super(message, properties)
  }
}

export class TemplatesFetchFailed extends BaseError {
  public name = 'TemplatesFetchFailed'
  constructor(public message: string = 'Could not fetch templates', properties?: any) {
    super(message, properties)
  }
}

export class TemplatesPreviewFailed extends BaseError {
  public name = 'TemplatesPreviewFailed'
  constructor(public message: string = 'Could not preview template', properties?: any) {
    super(message, properties)
  }
}

export class ConfigurationsFetchFailed extends BaseError {
  public name = 'ConfigurationsFetchFailed'
  constructor(public message: string = 'Could not fetch configs', properties?: any) {
    super(message, properties)
  }
}

export class BranchesFetchFailed extends BaseError {
  public name = 'BranchesFetchFailed'
  constructor(public message: string = 'Could not fetch branches', properties?: any) {
    super(message, properties)
  }
}

export class BranchFetchFailed extends BaseError {
  public name = 'BrancheFetchFailed'
  constructor(public message: string = 'Could not fetch branch', properties?: any) {
    super(message, properties)
  }
}

export class BranchPutFailed extends BaseError {
  public name = 'BranchPutFailed'
  constructor(public message: string = 'Could not alter branch', properties?: any) {
    super(message, properties)
  }
}

export class BranchCreationFailed extends BaseError {
  public name = 'VoucherPostFailed'
  constructor(public message: string = 'Could not create branch', properties?: any) {
    super(message, properties)
  }
}

export class BranchesCountFailed extends BaseError {
  public name = 'BranchesCountFailed'
  constructor(public message: string = 'Could not count the branches', properties?: any) {
    super(message, properties)
  }
}

export class CustomersFetchFailed extends BaseError {
  public name = 'CustomersFetchFailed'
  constructor(public message: string = 'Could not fetch customers', properties?: any) {
    super(message, properties)
  }
}

export class CustomerFetchFailed extends BaseError {
  public name = 'CustomerFetchFailed'
  constructor(public message: string = 'Could not fetch customer', properties?: any) {
    super(message, properties)
  }
}

export class CustomerPutFailed extends BaseError {
  public name = 'CustomerPutFailed'
  constructor(public message: string = 'Could not alter customer', properties?: any) {
    super(message, properties)
  }
}

export class CustomerCreationFailed extends BaseError {
  public name = 'CustomerCreationFailed'
  constructor(public message: string = 'Could not create customer', properties?: any) {
    super(message, properties)
  }
}

export class CustomersMetaFailed extends BaseError {
  public name = 'CustomersMetaFailed'
  constructor(public message: string = 'Could not get customers metadata', properties?: any) {
    super(message, properties)
  }
}

export class CustomersCountFailed extends BaseError {
  public name = 'CustomersCountFailed'
  constructor(public message: string = 'Could not count the customers', properties?: any) {
    super(message, properties)
  }
}

export class CustomerDeleteFailed extends BaseError {
  public name = 'CustomerDeleteFailed'
  constructor(public message: string = 'Could not delete the customer', properties?: any) {
    super(message, properties)
  }
}

export class VoucherTypeError extends BaseError {
  public name = 'VouchersFetchFailed'
  constructor(public message: string, properties?: any) {
    super(message, properties)
  }
}

export class VouchersFetchFailed extends BaseError {
  public name = 'VouchersFetchFailed'
  constructor(public message: string = 'Could not fetch the vouchers', properties?: any) {
    super(message, properties)
  }
}

export class VoucherLogsFetchFailed extends BaseError {
  public name = 'VoucherLogsFetchFailed'
  constructor(public message: string = 'Could not fetch the voucher logs', properties?: any) {
    super(message, properties)
  }
}

export class VoucherFetchFailed extends BaseError {
  public name = 'VoucherFetchFailed'
  constructor(public message: string = 'Could not fetch voucher', properties?: any) {
    super(message, properties)
  }
}

export class VoucherPutFailed extends BaseError {
  public name = 'VoucherPutFailed'
  constructor(public message: string = 'Could not alter voucher', properties?: any) {
    super(message, properties)
  }
}

export class VoucherPatchFailed extends BaseError {
  public name = 'VoucherPatchFailed'
  constructor(public message: string = 'Could not alter voucher', properties?: any) {
    super(message, properties)
  }
}

export class VoucherCreationFailed extends BaseError {
  public name = 'VoucherPostFailed'
  constructor(public message: string = 'Could not create voucher', properties?: any) {
    super(message, properties)
  }
}

export class VouchersCountFailed extends BaseError {
  public name = 'VouchersCountFailed'
  constructor(public message: string = 'Could not count the vouchers', properties?: any) {
    super(message, properties)
  }
}

export class VouchersMetaFailed extends BaseError {
  public name = 'VouchersMetaFailed'
  constructor(public message: string = 'Could not get voucher metadata', properties?: any) {
    super(message, properties)
  }
}

export class VoucherLogsMetaFailed extends BaseError {
  public name = 'VoucherLogsMetaFailed'
  constructor(public message: string = 'Could not get voucher logs metadata', properties?: any) {
    super(message, properties)
  }
}

export class VoucherDeleteFailed extends BaseError {
  public name = 'VoucherDeleteFailed'
  constructor(public message: string = 'Could not delete the voucher', properties?: any) {
    super(message, properties)
  }
}

export class VouchersLogsFetchFailed extends BaseError {
  public name = 'VouchersLogsFetchFailed'
  constructor(public message: string = 'Could not fetch the vouchers logs', properties?: any) {
    super(message, properties)
  }
}

export class VouchersLogsCountFailed extends BaseError {
  public name = 'VouchersLogsCountFailed'
  constructor(public message: string = 'Could not count the vouchers logs', properties?: any) {
    super(message, properties)
  }
}

export class InvoicesFetchAllFailed extends BaseError {
  public name = 'InvoicesFetchAllFailed'
  constructor(public message: string = 'Could not fetch invoices', properties?: any) {
    super(message, properties)
  }
}

export class InvoicesFetchOneFailed extends BaseError {
  public name = 'InvoicesFetchOneFailed'
  constructor(public message: string = 'Could not fetch the invoice', properties?: any) {
    super(message, properties)
  }
}

export class InvoicesCreateFailed extends BaseError {
  public name = 'InvoicesCreateFailed'
  constructor(public message: string = 'Could not create invoice', properties?: any) {
    super(message, properties)
  }
}

export class InvoicesUpdateFailed extends BaseError {
  public name = 'InvoicesUpdateFailed'
  constructor(public message: string = 'Could not update invoice', properties?: any) {
    super(message, properties)
  }
}

export class InvoicesDeleteFailed extends BaseError {
  public name = 'InvoicesDeleteFailed'
  constructor(public message: string = 'Could not delete invoice', properties?: any) {
    super(message, properties)
  }
}

export class InvoicesGetMetaFailed extends BaseError {
  public name = 'InvoicesGetMetaFailed'
  constructor(public message: string = 'Could not get invoice meta', properties?: any) {
    super(message, properties)
  }
}

export class StocksFetchFailed extends BaseError {
  public name = 'StocksFetchFailed'
  constructor(public message: string = 'Could not fetch the stocks', properties?: any) {
    super(message, properties)
  }
}

export class StocksCreateFailed extends BaseError {
  public name = 'StocksCreateFailed'
  constructor(public message: string = 'Could not create the stock', properties?: any) {
    super(message, properties)
  }
}

export class StocksUpdateFailed extends BaseError {
  public name = 'StocksUpdateFailed'
  constructor(public message: string = 'Could not update the stock', properties?: any) {
    super(message, properties)
  }
}

export class StocksLocationsFetchFailed extends BaseError {
  public name = 'StocksLocationsFetchFailed'
  constructor(public message: string = 'Could not fetch the stocks locations', properties?: any) {
    super(message, properties)
  }
}

export class OrdersFetchFailed extends BaseError {
  public name = 'OrdersFetchFailed'
  constructor(public message: string = 'Could not fetch the orders', properties?: any) {
    super(message, properties)
  }
}

export class OrdersCreateFailed extends BaseError {
  public name = 'OrdersCreateFailed'
  constructor(public message: string = 'Could not create the orders', properties?: any) {
    super(message, properties)
  }
}

export class OrdersUpdateFailed extends BaseError {
  public name = 'OrdersUpdateFailed'
  constructor(public message: string = 'Could not update the orders', properties?: any) {
    super(message, properties)
  }
}

export class IncomingOrdersFetchFailed extends BaseError {
  public name = 'IncomingOrdersFetchFailed'
  constructor(public message: string = 'Could not fetch incoming orders', properties?: any) {
    super(message, properties)
  }
}

export class OutgoingOrdersFetchFailed extends BaseError {
  public name = 'OutgoingOrdersFetchFailed'
  constructor(public message: string = 'Could not fetch outgoing orders', properties?: any) {
    super(message, properties)
  }
}

export class OrderItemsFetchFailed extends BaseError {
  public name = 'OrderItemsFetchFailed'
  constructor(public message: string = 'Could not fetch the order items', properties?: any) {
    super(message, properties)
  }
}

export class OrderItemsCreateFailed extends BaseError {
  public name = 'OrderItemsCreateFailed'
  constructor(public message: string = 'Could not create the order items', properties?: any) {
    super(message, properties)
  }
}

export class OrderItemUpdateFailed extends BaseError {
  public name = 'OrderItemUpdateFailed'
  constructor(public message: string = 'Could not update the order item', properties?: any) {
    super(message, properties)
  }
}

export class OrderItemsUpdateFailed extends BaseError {
  public name = 'OrderItemsUpdateFailed'
  constructor(public message: string = 'Could not update the order items', properties?: any) {
    super(message, properties)
  }
}

export class OrderItemsDeleteFailed extends BaseError {
  public name = 'OrderItemsDeleteFailed'
  constructor(public message: string = 'Could not delete the order items', properties?: any) {
    super(message, properties)
  }
}

export class OrderSuggestionsFetchFailed extends BaseError {
  public name = 'OrderSuggestionsFetchFailed'
  constructor(public message: string = 'Could not fetch the orders suggestions', properties?: any) {
    super(message, properties)
  }
}

export class HistoricOrderItemsFetchFailed extends BaseError {
  public name = 'HistoricOrderItemsFetchFailed'
  constructor(
    public message: string = 'Could not fetch the historic order items',
    properties?: any
  ) {
    super(message, properties)
  }
}

export class BookStockFailed extends BaseError {
  public name = 'BookStockFailed'
  constructor(public message: string = 'Could not book the stocks', properties?: any) {
    super(message, properties)
  }
}

export class OpenOrderFetchFailed extends BaseError {
  public name = 'OpenOrderFetchFailed'
  constructor(public message: string = 'Could not fetch open order', properties?: any) {
    super(message, properties)
  }
}

export class RevenuesFetchFailed extends BaseError {
  public name = 'RevenuesFetchFailed'
  constructor(public message: string = 'Could not fetch the Revenues', properties?: any) {
    super(message, properties)
  }
}

export class StaffFetchFailed extends BaseError {
  public name = 'StaffFetchFailed'
  constructor(public message: string = 'Could not fetch the Staff', properties?: any) {
    super(message, properties)
  }
}

export class RegistersFetchFailed extends BaseError {
  public name = 'RegistersFetchFailed'
  constructor(public message: string = 'Could not fetch the Registers', properties?: any) {
    super(message, properties)
  }
}

export class StatisticsProductFetchFailed extends BaseError {
  public name = 'StatisticsProductFetchFailed'
  constructor(
    public message: string = 'Could not fetch the Statistics Products',
    properties?: any
  ) {
    super(message, properties)
  }
}

export class StaffOverviewFetchFailed extends BaseError {
  public name = 'StaffOverviewFetchFailed'
  constructor(
    public message: string = 'Could not fetch the staff overview report',
    properties?: any
  ) {
    super(message, properties)
  }
}

export class ProductGroupsReportFetchFailed extends BaseError {
  public name = 'ProductGroupsReportFetchFailed'
  constructor(
    public message: string = 'Could not fetch the product groups report',
    properties?: any
  ) {
    super(message, properties)
  }
}

export class RefundsReportFetchFailed extends BaseError {
  public name = 'RefundsReportFetchFailed'
  constructor(public message: string = 'Could not fetch the refunds report', properties?: any) {
    super(message, properties)
  }
}

export class VouchersReportFetchFailed extends BaseError {
  public name = 'VouchersReportFetchFailed'
  constructor(public message: string = 'Could not fetch the vouchers report', properties?: any) {
    super(message, properties)
  }
}

export class ProductsReportFetchFailed extends BaseError {
  public name = 'ProductsReportFetchFailed'
  constructor(public message: string = 'Could not fetch the products report', properties?: any) {
    super(message, properties)
  }
}

export class AuditActionsFetchAllFailed extends BaseError {
  public name = 'AuditActionsFetchAllFailed'
  constructor(public message: string = 'Could not fetch audit actions', properties?: any) {
    super(message, properties)
  }
}

export class AuditActionsFetchOneFailed extends BaseError {
  public name = 'AuditActionsFetchOneFailed'
  constructor(public message: string = 'Could not fetch audit action', properties?: any) {
    super(message, properties)
  }
}

export class AuditActionsGetMetaFailed extends BaseError {
  public name = 'AuditActionsGetMetaFailed'
  constructor(public message: string = 'Could not fetch audit actions meta', properties?: any) {
    super(message, properties)
  }
}

export class AuditActionsCreateFailed extends BaseError {
  public name = 'AuditActionsCreateFailed'
  constructor(public message: string = 'Could not create audit action', properties?: any) {
    super(message, properties)
  }
}
