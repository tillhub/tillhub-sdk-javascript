export class BaseError {
  constructor(message: string) {
    Error.apply(this, arguments)
  }
}

BaseError.prototype = new Error()

export class AuthenticationFailed extends BaseError {
  public name = 'AuthenticationFailed'
  constructor(public message: string = 'Authentication was not successful') {
    super(message)
  }
}

export class UninstantiatedClient extends BaseError {
  public name = 'UninstantiatedClient'
  constructor(public message: string = 'Cannot instantiate API without instantiated HTTP client') {
    super(message)
  }
}

export class TransactionFetchFailed extends BaseError {
  public name = 'TransactionFetchFailed'
  constructor(public message: string = 'Could not fetch transaction') {
    super(message)
  }
}

export class TransactionPdfFailed extends BaseError {
  public name = 'TransactionPdfFailed'
  constructor(public message: string = 'Could not create pdf') {
    super(message)
  }
}

export class TaxesFetchFailed extends BaseError {
  public name = 'TaxesFetchFailed'
  constructor(public message: string = 'Could not fetch taxes') {
    super(message)
  }
}

export class ProductsCreateFailed extends BaseError {
  public name = 'ProductsCreateFailed'
  constructor(public message: string = 'Could not create the product') {
    super(message)
  }
}

export class ProductsFetchFailed extends BaseError {
  public name = 'ProductsFetchFailed'
  constructor(public message: string = 'Could not fetch the products') {
    super(message)
  }
}

export class ProductFetchFailed extends BaseError {
  public name = 'ProductFetchFailed'
  constructor(public message: string = 'Could not fetch the product') {
    super(message)
  }
}

export class ProductsCountFailed extends BaseError {
  public name = 'ProductsCountFailed'
  constructor(public message: string = 'Could not count the products') {
    super(message)
  }
}

export class ProductsMetaFailed extends BaseError {
  public name = 'ProductsMetaFailed'
  constructor(public message: string = 'Could not get products metadata') {
    super(message)
  }
}

export class ProductsUpdateFailed extends BaseError {
  public name = 'ProductsUpdateFailed'
  constructor(public message: string = 'Could not update the product') {
    super(message)
  }
}

export class ProductsDeleteFailed extends BaseError {
  public name = 'ProductsDeleteFailed'
  constructor(public message: string = 'Could not delete the product') {
    super(message)
  }
}

export class ProductsSearchFailed extends BaseError {
  public name = 'ProductsSearchFailed'
  constructor(public message: string = 'Could not search for the product') {
    super(message)
  }
}

export class DeliveriesFetchAllFailed extends BaseError {
  public name = 'DeliveriesFetchAllFailed'
  constructor(public message: string = 'Could not fetch deliveries') {
    super(message)
  }
}

export class DeliveriesFetchOneFailed extends BaseError {
  public name = 'DeliveriesFetchOneFailed'
  constructor(public message: string = 'Could not fetch delivery') {
    super(message)
  }
}

export class DeliveriesCreateFailed extends BaseError {
  public name = 'DeliveriesCreateFailed'
  constructor(public message: string = 'Could not create delivery') {
    super(message)
  }
}

export class DeliveriesPDFFailed extends BaseError {
  public name = 'DeliveriesPDFFailed'
  constructor(public message: string = 'Could not create PDF for delivery') {
    super(message)
  }
}

export class DeliveriesUpdateFailed extends BaseError {
  public name = 'DeliveriesUpdateFailed'
  constructor(public message: string = 'Could not update delivery') {
    super(message)
  }
}

export class DeliveriesInProgressFailed extends BaseError {
  public name = 'DeliveriesInProgressFailed'
  constructor(public message: string = 'Could not change delivery status to "in_progress') {
    super(message)
  }
}

export class DeliveriesDispatchFailed extends BaseError {
  public name = 'DeliveriesDispatchFailed'
  constructor(public message: string = 'Could not change delivery status to "in_progress') {
    super(message)
  }
}

export class DeliveriesDeleteFailed extends BaseError {
  public name = 'DeliveriesDeleteFailed'
  constructor(public message: string = 'Could not delete delivery') {
    super(message)
  }
}

export class DeliveryItemsCreateFailed extends BaseError {
  public name = 'DeliveryItemsCreateFailed'
  constructor(public message: string = 'Could not create delivery items') {
    super(message)
  }
}

export class DeliveryItemsFetchAllFailed extends BaseError {
  public name = 'DeliveryItemsFetchAllFailed'
  constructor(public message: string = 'Could not fetch delivery items') {
    super(message)
  }
}

export class DeliveryItemUpdateFailed extends BaseError {
  public name = 'DeliveryItemUpdateFailed'
  constructor(public message: string = 'Could not update delivery') {
    super(message)
  }
}

export class ProductGroupsFetchFailed extends BaseError {
  public name = 'ProductGroupsFetchFailed'
  constructor(public message: string = 'Could not fetch product groups') {
    super(message)
  }
}

export class AccountsFetchFailed extends BaseError {
  public name = 'AccountsFetchFailed'
  constructor(public message: string = 'Could not fetch accounts') {
    super(message)
  }
}

export class TemplatesCreationFailed extends BaseError {
  public name = 'TemplatesCreationFailed'
  constructor(public message: string = 'Could not create template') {
    super(message)
  }
}

export class TemplatesPutFailed extends BaseError {
  public name = 'TemplatesPutFailed'
  constructor(public message: string = 'Could not replace template') {
    super(message)
  }
}

export class TemplatesFetchFailed extends BaseError {
  public name = 'TemplatesFetchFailed'
  constructor(public message: string = 'Could not fetch templates') {
    super(message)
  }
}

export class TemplatesPreviewFailed extends BaseError {
  public name = 'TemplatesPreviewFailed'
  constructor(public message: string = 'Could not preview template') {
    super(message)
  }
}

export class ConfigurationsFetchFailed extends BaseError {
  public name = 'ConfigurationsFetchFailed'
  constructor(public message: string = 'Could not fetch configs') {
    super(message)
  }
}

export class BranchesFetchFailed extends BaseError {
  public name = 'BranchesFetchFailed'
  constructor(public message: string = 'Could not fetch branches') {
    super(message)
  }
}

export class BranchFetchFailed extends BaseError {
  public name = 'BrancheFetchFailed'
  constructor(public message: string = 'Could not fetch branch') {
    super(message)
  }
}

export class BranchPutFailed extends BaseError {
  public name = 'BranchPutFailed'
  constructor(public message: string = 'Could not alter branch') {
    super(message)
  }
}

export class BranchCreationFailed extends BaseError {
  public name = 'VoucherPostFailed'
  constructor(public message: string = 'Could not create branch') {
    super(message)
  }
}

export class BranchesCountFailed extends BaseError {
  public name = 'BranchesCountFailed'
  constructor(public message: string = 'Could not count the branches') {
    super(message)
  }
}

export class CustomersFetchFailed extends BaseError {
  public name = 'CustomersFetchFailed'
  constructor(public message: string = 'Could not fetch customers') {
    super(message)
  }
}

export class CustomersCountFailed extends BaseError {
  public name = 'CustomersCountFailed'
  constructor(public message: string = 'Could not count the customers') {
    super(message)
  }
}

export class CustomerDeleteFailed extends BaseError {
  public name = 'CustomerDeleteFailed'
  constructor(public message: string = 'Could not delete the customer') {
    super(message)
  }
}

export class VoucherTypeError extends BaseError {
  public name = 'VouchersFetchFailed'
  constructor(public message: string) {
    super(message)
  }
}

export class VouchersFetchFailed extends BaseError {
  public name = 'VouchersFetchFailed'
  constructor(public message: string = 'Could not fetch the vouchers') {
    super(message)
  }
}

export class VoucherLogsFetchFailed extends BaseError {
  public name = 'VoucherLogsFetchFailed'
  constructor(public message: string = 'Could not fetch the voucher logs') {
    super(message)
  }
}

export class VoucherFetchFailed extends BaseError {
  public name = 'VoucherFetchFailed'
  constructor(public message: string = 'Could not fetch voucher') {
    super(message)
  }
}

export class VoucherPutFailed extends BaseError {
  public name = 'VoucherPutFailed'
  constructor(public message: string = 'Could not alter voucher') {
    super(message)
  }
}

export class VoucherPatchFailed extends BaseError {
  public name = 'VoucherPatchFailed'
  constructor(public message: string = 'Could not alter voucher') {
    super(message)
  }
}

export class VoucherCreationFailed extends BaseError {
  public name = 'VoucherPostFailed'
  constructor(public message: string = 'Could not create voucher') {
    super(message)
  }
}

export class VouchersCountFailed extends BaseError {
  public name = 'VouchersCountFailed'
  constructor(public message: string = 'Could not count the vouchers') {
    super(message)
  }
}

export class VouchersMetaFailed extends BaseError {
  public name = 'VouchersMetaFailed'
  constructor(public message: string = 'Could not get voucher metadata') {
    super(message)
  }
}

export class VoucherLogsMetaFailed extends BaseError {
  public name = 'VoucherLogsMetaFailed'
  constructor(public message: string = 'Could not get voucher logs metadata') {
    super(message)
  }
}

export class VoucherDeleteFailed extends BaseError {
  public name = 'VoucherDeleteFailed'
  constructor(public message: string = 'Could not delete the voucher') {
    super(message)
  }
}

export class VouchersLogsFetchFailed extends BaseError {
  public name = 'VouchersLogsFetchFailed'
  constructor(public message: string = 'Could not fetch the vouchers logs') {
    super(message)
  }
}

export class VouchersLogsCountFailed extends BaseError {
  public name = 'VouchersLogsCountFailed'
  constructor(public message: string = 'Could not count the vouchers logs') {
    super(message)
  }
}

export class InvoicesFetchAllFailed extends BaseError {
  public name = 'InvoicesFetchAllFailed'
  constructor(public message: string = 'Could not fetch invoices') {
    super(message)
  }
}

export class InvoicesFetchOneFailed extends BaseError {
  public name = 'InvoicesFetchOneFailed'
  constructor(public message: string = 'Could not fetch the invoice') {
    super(message)
  }
}

export class InvoicesCreateFailed extends BaseError {
  public name = 'InvoicesCreateFailed'
  constructor(public message: string = 'Could not create invoice') {
    super(message)
  }
}

export class InvoicesUpdateFailed extends BaseError {
  public name = 'InvoicesUpdateFailed'
  constructor(public message: string = 'Could not update invoice') {
    super(message)
  }
}

export class InvoicesDeleteFailed extends BaseError {
  public name = 'InvoicesDeleteFailed'
  constructor(public message: string = 'Could not delete invoice') {
    super(message)
  }
}

export class InvoicesGetMetaFailed extends BaseError {
  public name = 'InvoicesGetMetaFailed'
  constructor(public message: string = 'Could not get invoice meta') {
    super(message)
  }
}

export class StocksFetchFailed extends BaseError {
  public name = 'StocksFetchFailed'
  constructor(public message: string = 'Could not fetch the stocks') {
    super(message)
  }
}

export class StocksCreateFailed extends BaseError {
  public name = 'StocksCreateFailed'
  constructor(public message: string = 'Could not create the stock') {
    super(message)
  }
}

export class StocksUpdateFailed extends BaseError {
  public name = 'StocksUpdateFailed'
  constructor(public message: string = 'Could not update the stock') {
    super(message)
  }
}

export class StocksLocationsFetchFailed extends BaseError {
  public name = 'StocksLocationsFetchFailed'
  constructor(public message: string = 'Could not fetch the stocks locations') {
    super(message)
  }
}

export class OrdersFetchFailed extends BaseError {
  public name = 'OrdersFetchFailed'
  constructor(public message: string = 'Could not fetch the orders') {
    super(message)
  }
}

export class OrdersCreateFailed extends BaseError {
  public name = 'OrdersCreateFailed'
  constructor(public message: string = 'Could not create the orders') {
    super(message)
  }
}

export class OrdersUpdateFailed extends BaseError {
  public name = 'OrdersUpdateFailed'
  constructor(public message: string = 'Could not update the orders') {
    super(message)
  }
}

export class IncomingOrdersFetchFailed extends BaseError {
  public name = 'IncomingOrdersFetchFailed'
  constructor(public message: string = 'Could not fetch incoming orders') {
    super(message)
  }
}

export class OutgoingOrdersFetchFailed extends BaseError {
  public name = 'OutgoingOrdersFetchFailed'
  constructor(public message: string = 'Could not fetch outgoing orders') {
    super(message)
  }
}

export class OrderItemsFetchFailed extends BaseError {
  public name = 'OrderItemsFetchFailed'
  constructor(public message: string = 'Could not fetch the order items') {
    super(message)
  }
}

export class OrderItemsCreateFailed extends BaseError {
  public name = 'OrderItemsCreateFailed'
  constructor(public message: string = 'Could not create the order items') {
    super(message)
  }
}

export class OrderItemUpdateFailed extends BaseError {
  public name = 'OrderItemUpdateFailed'
  constructor(public message: string = 'Could not update the order item') {
    super(message)
  }
}

export class OrderItemsUpdateFailed extends BaseError {
  public name = 'OrderItemsUpdateFailed'
  constructor(public message: string = 'Could not update the order items') {
    super(message)
  }
}

export class OrderItemsDeleteFailed extends BaseError {
  public name = 'OrderItemsDeleteFailed'
  constructor(public message: string = 'Could not delete the order items') {
    super(message)
  }
}

export class OrderSuggestionsFetchFailed extends BaseError {
  public name = 'OrderSuggestionsFetchFailed'
  constructor(public message: string = 'Could not fetch the orders suggestions') {
    super(message)
  }
}

export class HistoricOrderItemsFetchFailed extends BaseError {
  public name = 'HistoricOrderItemsFetchFailed'
  constructor(public message: string = 'Could not fetch the historic order items') {
    super(message)
  }
}

export class BookStockFailed extends BaseError {
  public name = 'BookStockFailed'
  constructor(public message: string = 'Could not book the stocks') {
    super(message)
  }
}

export class OpenOrderFetchFailed extends BaseError {
  public name = 'OpenOrderFetchFailed'
  constructor(public message: string = 'Could not fetch open order') {
    super(message)
  }
}

export class RevenuesFetchFailed extends BaseError {
  public name = 'RevenuesFetchFailed'
  constructor(public message: string = 'Could not fetch the Revenues') {
    super(message)
  }
}

export class StaffFetchFailed extends BaseError {
  public name = 'StaffFetchFailed'
  constructor(public message: string = 'Could not fetch the Staff') {
    super(message)
  }
}

export class RegistersFetchFailed extends BaseError {
  public name = 'RegistersFetchFailed'
  constructor(public message: string = 'Could not fetch the Registers') {
    super(message)
  }
}

export class StatisticsProductFetchFailed extends BaseError {
  public name = 'StatisticsProductFetchFailed'
  constructor(public message: string = 'Could not fetch the Statistics Products') {
    super(message)
  }
}

export class StaffOverviewFetchFailed extends BaseError {
  public name = 'StaffOverviewFetchFailed'
  constructor(public message: string = 'Could not fetch the staff overview report') {
    super(message)
  }
}

export class ProductGroupsReportFetchFailed extends BaseError {
  public name = 'ProductGroupsReportFetchFailed'
  constructor(public message: string = 'Could not fetch the product groups report') {
    super(message)
  }
}

export class RefundsReportFetchFailed extends BaseError {
  public name = 'RefundsReportFetchFailed'
  constructor(public message: string = 'Could not fetch the refunds report') {
    super(message)
  }
}

export class VouchersReportFetchFailed extends BaseError {
  public name = 'VouchersReportFetchFailed'
  constructor(public message: string = 'Could not fetch the vouchers report') {
    super(message)
  }
}

export class ProductsReportFetchFailed extends BaseError {
  public name = 'ProductsReportFetchFailed'
  constructor(public message: string = 'Could not fetch the products report') {
    super(message)
  }
}
