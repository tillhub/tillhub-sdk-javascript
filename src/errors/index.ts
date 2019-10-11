import { BaseError } from './baseError'

export { BaseError }

export class AuthenticationFailed extends BaseError {
  public name = 'AuthenticationFailed'
  constructor(public message: string = 'Authentication was not successful', properties?: any) {
    super(message, properties)
  }
}

export class PasswordResetRequestFailed extends BaseError {
  public name = 'PasswordResetRequestFailed'
  constructor(public message: string = 'Could not reset password', properties?: any) {
    super(message, properties)
  }
}

export class PasswordSetRequestFailed extends BaseError {
  public name = 'PasswordSetRequestFailed'
  constructor(public message: string = 'Could not set password', properties?: any) {
    super(message, properties)
  }
}
export class LogoutFailed extends BaseError {
  public name = 'LogoutFailed'
  constructor(public message: string = 'Could not log out.', properties?: any) {
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

export class TransactionsGetMetaFailed extends BaseError {
  public name = 'TransactionsGetMetaFailed'
  constructor(public message: string = 'Could not get transactions meta', properties?: any) {
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

export class TaxDeleteFailed extends BaseError {
  public name = 'TaxDeleteFailed'
  constructor(public message: string = 'Could not delete tax', properties?: any) {
    super(message, properties)
  }
}

export class ProductsCreateFailed extends BaseError {
  public name = 'ProductsCreateFailed'
  constructor(public message: string = 'Could not create the product', properties?: any) {
    super(message, properties)
  }
}

export class ProductFetchFailed extends BaseError {
  public name = 'ProductFetchFailed'
  constructor(public message: string = 'Could not fetch the product', properties?: any) {
    super(message, properties)
  }
}
export class ProductsFetchFailed extends BaseError {
  public name = 'ProductsFetchFailed'
  constructor(public message: string = 'Could not fetch the products', properties?: any) {
    super(message, properties)
  }
}
export class ProductsImportFailed extends BaseError {
  public name = 'ProductsImportFailed'
  constructor(public message: string = 'Could not import the products', properties?: any) {
    super(message, properties)
  }
}

export class ProductDetailsFetchFailed extends BaseError {
  public name = 'ProductDetailsFetchFailed'
  constructor(
    public message: string = 'Could not fetch the details of the product',
    properties?: any
  ) {
    super(message, properties)
  }
}
export class ProductChildrenDetailsFetchFailed extends BaseError {
  public name = 'ProductChildrenDetailsFetchFailed'
  constructor(
    public message: string = 'Could not fetch the details of the children products',
    properties?: any
  ) {
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

export class ProductsBookStockFailed extends BaseError {
  public name = 'ProductsBookStockFailed'
  constructor(public message: string = 'Could not book stock for the product', properties?: any) {
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

export class ProductGroupDeleteFailed extends BaseError {
  public name = 'ProductGroupDeleteFailed'
  constructor(public message: string = 'Could not delete product group', properties?: any) {
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

export class AccountDeleteFailed extends BaseError {
  public name = 'AccountDeleteFailed'
  constructor(public message: string = 'Could not delete account', properties?: any) {
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

export class ExpenseAccountDeleteFailed extends BaseError {
  public name = 'ExpenseAccountDeleteFailed'
  constructor(public message: string = 'Could not delete expense account', properties?: any) {
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

export class PaymentOptionDeleteFailed extends BaseError {
  public name = 'PaymentOptionDeleteFailed'
  constructor(public message: string = 'Could not delete payment option', properties?: any) {
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
  constructor(public message: string = 'Could not fetch configurations', properties?: any) {
    super(message, properties)
  }
}

export class ConfigurationFetchFailed extends BaseError {
  public name = 'ConfigurationFetchFailed'
  constructor(public message: string = 'Could not fetch configuration', properties?: any) {
    super(message, properties)
  }
}

export class ConfigurationPutFailed extends BaseError {
  public name = 'ConfigurationPutFailed'
  constructor(public message: string = 'Could not alter configuration', properties?: any) {
    super(message, properties)
  }
}

export class ConfigurationPatchFailed extends BaseError {
  public name = 'ConfigurationPatchFailed'
  constructor(public message: string = 'Could not patch configuration', properties?: any) {
    super(message, properties)
  }
}

export class ConfigurationCreationFailed extends BaseError {
  public name = 'ConfigurationCreationFailed'
  constructor(public message: string = 'Could not create configuration', properties?: any) {
    super(message, properties)
  }
}

export class ConfigurationDeleteFailed extends BaseError {
  public name = 'ConfigurationDeleteFailed'
  constructor(public message: string = 'Could not delete configuration', properties?: any) {
    super(message, properties)
  }
}

export class UsersFetchFailed extends BaseError {
  public name = 'UsersFetchFailed'
  constructor(public message: string = 'Could not fetch user', properties?: any) {
    super(message, properties)
  }
}

export class UserFetchFailed extends BaseError {
  public name = 'UserFetchFailed'
  constructor(public message: string = 'Could not fetch user', properties?: any) {
    super(message, properties)
  }
}

export class UserPutFailed extends BaseError {
  public name = 'UserPutFailed'
  constructor(public message: string = 'Could not alter user', properties?: any) {
    super(message, properties)
  }
}

export class UserCreationFailed extends BaseError {
  public name = 'UserCreationFailed'
  constructor(public message: string = 'Could not create user', properties?: any) {
    super(message, properties)
  }
}

export class UserDeleteFailed extends BaseError {
  public name = 'UserDeleteFailed'
  constructor(public message: string = 'Could not delete user', properties?: any) {
    super(message, properties)
  }
}

export class DiscountsFetchFailed extends BaseError {
  public name = 'DiscountsFetchFailed'
  constructor(public message: string = 'Could not fetch discounts', properties?: any) {
    super(message, properties)
  }
}

export class DiscountFetchFailed extends BaseError {
  public name = 'DiscounteFetchFailed'
  constructor(public message: string = 'Could not fetch discount', properties?: any) {
    super(message, properties)
  }
}

export class DiscountPutFailed extends BaseError {
  public name = 'DiscountPutFailed'
  constructor(public message: string = 'Could not alter discount', properties?: any) {
    super(message, properties)
  }
}

export class DiscountCreationFailed extends BaseError {
  public name = 'DiscountCreationFailed'
  constructor(public message: string = 'Could not create discount', properties?: any) {
    super(message, properties)
  }
}

export class DiscountsCountFailed extends BaseError {
  public name = 'DiscountsCountFailed'
  constructor(public message: string = 'Could not count discounts', properties?: any) {
    super(message, properties)
  }
}

export class DiscountDeleteFailed extends BaseError {
  public name = 'DiscountDeleteFailed'
  constructor(public message: string = 'Could not delete discount', properties?: any) {
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

export class RegistersFetchFailed extends BaseError {
  public name = 'RegistersFetchFailed'
  constructor(public message: string = 'Could not fetch the Registers', properties?: any) {
    super(message, properties)
  }
}

export class RegisterFetchFailed extends BaseError {
  public name = 'RegisterFetchFailed'
  constructor(public message: string = 'Could not fetch the Register', properties?: any) {
    super(message, properties)
  }
}

export class RegisterPutFailed extends BaseError {
  public name = 'RegisterPutFailed'
  constructor(public message: string = 'Could not alter register', properties?: any) {
    super(message, properties)
  }
}

export class RegisterNotificationCreateFailed extends BaseError {
  public name = 'RegisterNotificationCreateFailed'
  constructor(public message: string = 'Could not create the Notification', properties?: any) {
    super(message, properties)
  }
}

export class RegisterDeviceConfigurationPutFailed extends BaseError {
  public name = 'RegisterDeviceConfigurationPutFailed'
  constructor(
    public message: string = 'Could not update the Device Configuration',
    properties?: any
  ) {
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
export class AuditActionsTypesFetchFailed extends BaseError {
  public name = 'AuditActionsTypesFetchFailed'
  constructor(public message: string = 'Could not fetch audit action types', properties?: any) {
    super(message, properties)
  }
}

export class AuditLogsFetchAllFailed extends BaseError {
  public name = 'AuditLogsFetchAllFailed'
  constructor(public message: string = 'Could not fetch audit logs', properties?: any) {
    super(message, properties)
  }
}

export class AuditLogsFetchOneFailed extends BaseError {
  public name = 'AuditLogsFetchOneFailed'
  constructor(public message: string = 'Could not fetch audit log', properties?: any) {
    super(message, properties)
  }
}

export class AuditLogsGetMetaFailed extends BaseError {
  public name = 'AuditLogsGetMetaFailed'
  constructor(public message: string = 'Could not fetch audit logs meta', properties?: any) {
    super(message, properties)
  }
}

export class ImageCreationFailed extends BaseError {
  public name = 'ImageCreationFailed'
  constructor(public message: string = 'Could not create new image') {
    super(message)
  }
}

export class ImagePutFailed extends BaseError {
  public name = 'ImagePutFailed'
  constructor(public message: string = 'Could not update new image') {
    super(message)
  }
}

export class StaffCountFailed extends BaseError {
  public name = 'StaffCountFailed'
  constructor(public message: string = 'Could not count the staff', properties?: any) {
    super(message, properties)
  }
}

export class NotificationsEmailError extends BaseError {
  public name = 'NotificationsEmailError'
  constructor(public message: string = 'Could not send email', properties?: any) {
    super(message, properties)
  }
}

export class ProductGroupsFiltersFetchFailed extends BaseError {
  public name = 'ProductGroupsFiltersFetchFailed'
  constructor(public message: string = 'Could not get products group filters', properties?: any) {
    super(message, properties)
  }
}

/**
 * PRINT API
 */

/* Jobs */
export class PrintJobsFetchFailed extends BaseError {
  public name = 'PrintJobsFetchFailed'
  constructor(public message: string = 'Could not fetch print jobs', properties?: any) {
    super(message, properties)
  }
}

export class PrintJobFetchFailed extends BaseError {
  public name = 'PrintJobFetchFailed'
  constructor(public message: string = 'Could not fetch print job', properties?: any) {
    super(message, properties)
  }
}

export class PrintJobCreateFailed extends BaseError {
  public name = 'PrintJobCreateFailed'
  constructor(public message: string = 'Could not create print job', properties?: any) {
    super(message, properties)
  }
}

export class PrintJobDeleteFailed extends BaseError {
  public name = 'PrintJobDeleteFailed'
  constructor(public message: string = 'Could not delete print job', properties?: any) {
    super(message, properties)
  }
}

export class PrintJobUpdateFailed extends BaseError {
  public name = 'PrintJobUpdateFailed'
  constructor(public message: string = 'Could not update print job', properties?: any) {
    super(message, properties)
  }
}

export class PrintJobDataFetchFailed extends BaseError {
  public name = 'PrintJobDataFetchFailed'
  constructor(public message: string = 'Could not fetch print job data', properties?: any) {
    super(message, properties)
  }
}

/* Messages */
export class PrintMessagesFetchFailed extends BaseError {
  public name = 'PrintMessagesFetchFailed'
  constructor(public message: string = 'Could not fetch print messages', properties?: any) {
    super(message, properties)
  }
}

export class PrintMessageFetchFailed extends BaseError {
  public name = 'PrintMessageFetchFailed'
  constructor(public message: string = 'Could not fetch print message', properties?: any) {
    super(message, properties)
  }
}

export class PrintMessageCreateFailed extends BaseError {
  public name = 'PrintMessageCreateFailed'
  constructor(public message: string = 'Could not create print message', properties?: any) {
    super(message, properties)
  }
}

export class PrintMessageDeleteFailed extends BaseError {
  public name = 'PrintMessageDeleteFailed'
  constructor(public message: string = 'Could not delete print message', properties?: any) {
    super(message, properties)
  }
}

export class PrintMessageUpdateFailed extends BaseError {
  public name = 'PrintMessageUpdateFailed'
  constructor(public message: string = 'Could not update print message', properties?: any) {
    super(message, properties)
  }
}

/* Printers */
export class PrintersFetchFailed extends BaseError {
  public name = 'PrintersFetchFailed'
  constructor(public message: string = 'Could not fetch printers', properties?: any) {
    super(message, properties)
  }
}

export class PrinterFetchFailed extends BaseError {
  public name = 'PrinterFetchFailed'
  constructor(public message: string = 'Could not fetch printer', properties?: any) {
    super(message, properties)
  }
}

export class PrinterCreateFailed extends BaseError {
  public name = 'PrinterCreateFailed'
  constructor(public message: string = 'Could not create printer', properties?: any) {
    super(message, properties)
  }
}

export class PrinterDeleteFailed extends BaseError {
  public name = 'PrinterDeleteFailed'
  constructor(public message: string = 'Could not delete printer', properties?: any) {
    super(message, properties)
  }
}

export class PrinterUpdateFailed extends BaseError {
  public name = 'PrinterUpdateFailed'
  constructor(public message: string = 'Could not update printer', properties?: any) {
    super(message, properties)
  }
}

export class MessagesFetchFailed extends BaseError {
  public name = 'MessagesFetchFailed'
  constructor(public message: string = 'Could not fetch the messages', properties?: any) {
    super(message, properties)
  }
}

/**
 * FAVOURITES
 */

export class FavouritesFetchFailed extends BaseError {
  public name = 'FavouritesFetchFailed'
  constructor(public message: string = 'Could not fetch favourites set', properties?: any) {
    super(message, properties)
  }
}

export class FavouriteFetchFailed extends BaseError {
  public name = 'FavouriteFetchFailed'
  constructor(public message: string = 'Could not fetch favourite', properties?: any) {
    super(message, properties)
  }
}

export class FavouriteCreateFailed extends BaseError {
  public name = 'FavouriteCreateFailed'
  constructor(public message: string = 'Could not create favourite', properties?: any) {
    super(message, properties)
  }
}

export class FavouriteDeleteFailed extends BaseError {
  public name = 'FavouriteDeleteFailed'
  constructor(public message: string = 'Could not delete favourite', properties?: any) {
    super(message, properties)
  }
}

export class FavouriteUpdateFailed extends BaseError {
  public name = 'FavouriteUpdateFailed'
  constructor(public message: string = 'Could not update favourite', properties?: any) {
    super(message, properties)
  }
}

export class MessagesUpdateFailed extends BaseError {
  public name = 'MessagesUpdateFailed'
  constructor(public message: string = 'Could not update the message', properties?: any) {
    super(message, properties)
  }
}

export class BalancesFetchFailed extends BaseError {
  public name = 'BalancesFetchFailed'
  constructor(public message: string = 'Could not fetch the balances', properties?: any) {
    super(message, properties)
  }
}

export class BalancesFetchOneFailed extends BaseError {
  public name = 'BalancesFetchOneFailed'
  constructor(public message: string = 'Could not fetch the balance', properties?: any) {
    super(message, properties)
  }
}

export class BalancesMetaFailed extends BaseError {
  public name = 'BalancesMetaFailed'
  constructor(public message: string = 'Could not fetch meta data for balances', properties?: any) {
    super(message, properties)
  }
}

export class LegacySettingsFetchFailed extends BaseError {
  public name = 'LegacySettingsFetchFailed'
  constructor(public message: string = 'Could not fetch legacy settings', properties?: any) {
    super(message, properties)
  }
}
export class LegacySettingFetchFailed extends BaseError {
  public name = 'LegacySettingFetchFailed'
  constructor(public message: string = 'Could not fetch one legacy settings object', properties?: any) {
    super(message, properties)
  }
}
export class LegacySettingUpdateFailed extends BaseError {
  public name = 'LegacySettingUpdateFailed'
  constructor(public message: string = 'Could not update one legacy settings object', properties?: any) {
    super(message, properties)
  }
}
