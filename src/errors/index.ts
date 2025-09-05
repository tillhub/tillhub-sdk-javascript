import { BaseError } from './baseError'

export { BaseError }

export class AuthenticationFailed extends BaseError {
  public name = 'AuthenticationFailed'
  constructor (
    public message: string = 'Authentication was not successful',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AuthenticationFailed.prototype)
  }
}

export class PasswordResetRequestFailed extends BaseError {
  public name = 'PasswordResetRequestFailed'
  constructor (
    public message: string = 'Could not reset password',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, PasswordResetRequestFailed.prototype)
  }
}

export class PasswordSetRequestFailed extends BaseError {
  public name = 'PasswordSetRequestFailed'
  constructor (
    public message: string = 'Could not set password',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, PasswordSetRequestFailed.prototype)
  }
}

export class UninstantiatedClient extends BaseError {
  public name = 'UninstantiatedClient'
  constructor (
    public message: string = 'Cannot instantiate API without instantiated HTTP client',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, UninstantiatedClient.prototype)
  }
}

export class TransactionFetchFailed extends BaseError {
  public name = 'TransactionFetchFailed'
  constructor (
    public message: string = 'Could not fetch transaction',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TransactionFetchFailed.prototype)
  }
}

export class TransactionPdfFailed extends BaseError {
  public name = 'TransactionPdfFailed'
  constructor (
    public message: string = 'Could not create pdf',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TransactionPdfFailed.prototype)
  }
}

export class TransactionSigningInitialisationFailed extends BaseError {
  public name = 'TransactionSigningInitialisationFailed'
  constructor (
    public message: string = 'Could not initialise signing system',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TransactionSigningInitialisationFailed.prototype)
  }
}

export class TransactionSigningYearlyReceiptFailed extends BaseError {
  public name = 'TransactionSigningYearlyReceiptFailed'
  constructor (
    public message: string = 'Could not generate yearly receipt',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TransactionSigningYearlyReceiptFailed.prototype)
  }
}

export class TransactionSigningMonthlyReceiptFailed extends BaseError {
  public name = 'TransactionSigningMonthlyReceiptFailed'
  constructor (
    public message: string = 'Could not generate monthly receipt',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TransactionSigningMonthlyReceiptFailed.prototype)
  }
}

export class TransactionSigningZeroReceiptFailed extends BaseError {
  public name = 'TransactionSigningZeroReceiptFailed'
  constructor (
    public message: string = 'Could not generate zero receipt',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TransactionSigningZeroReceiptFailed.prototype)
  }
}

export class TransactionsGetMetaFailed extends BaseError {
  public name = 'TransactionsGetMetaFailed'
  constructor (
    public message: string = 'Could not get transactions meta',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TransactionsGetMetaFailed.prototype)
  }
}

export class TaxesFetchFailed extends BaseError {
  public name = 'TaxesFetchFailed'
  constructor (
    public message: string = 'Could not fetch taxes',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TaxesFetchFailed.prototype)
  }
}

export class TaxesPutFailed extends BaseError {
  public name = 'TaxesPutFailed'
  constructor (
    public message: string = 'Could not alter tax',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TaxesPutFailed.prototype)
  }
}

export class TaxesCreationFailed extends BaseError {
  public name = 'TaxesCreationFailed'
  constructor (
    public message: string = 'Could not create tax',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TaxesCreationFailed.prototype)
  }
}

export class TaxDeleteFailed extends BaseError {
  public name = 'TaxDeleteFailed'
  constructor (
    public message: string = 'Could not delete tax',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TaxDeleteFailed.prototype)
  }
}

export class DeliveriesFetchAllFailed extends BaseError {
  public name = 'DeliveriesFetchAllFailed'
  constructor (
    public message: string = 'Could not fetch deliveries',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, DeliveriesFetchAllFailed.prototype)
  }
}

export class DeliveriesFetchOneFailed extends BaseError {
  public name = 'DeliveriesFetchOneFailed'
  constructor (
    public message: string = 'Could not fetch delivery',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, DeliveriesFetchOneFailed.prototype)
  }
}

export class DeliveriesCreateFailed extends BaseError {
  public name = 'DeliveriesCreateFailed'
  constructor (
    public message: string = 'Could not create delivery',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, DeliveriesCreateFailed.prototype)
  }
}

export class DeliveriesPDFFailed extends BaseError {
  public name = 'DeliveriesPDFFailed'
  constructor (
    public message: string = 'Could not create PDF for delivery',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, DeliveriesPDFFailed.prototype)
  }
}

export class DeliveriesUpdateFailed extends BaseError {
  public name = 'DeliveriesUpdateFailed'
  constructor (
    public message: string = 'Could not update delivery',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, DeliveriesUpdateFailed.prototype)
  }
}

export class DeliveriesInProgressFailed extends BaseError {
  public name = 'DeliveriesInProgressFailed'
  constructor (
    public message: string = 'Could not change delivery status to "in_progress',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, DeliveriesInProgressFailed.prototype)
  }
}

export class DeliveriesDispatchFailed extends BaseError {
  public name = 'DeliveriesDispatchFailed'
  constructor (
    public message: string = 'Could not change delivery status to "in_progress',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, DeliveriesDispatchFailed.prototype)
  }
}

export class DeliveriesDeleteFailed extends BaseError {
  public name = 'DeliveriesDeleteFailed'
  constructor (
    public message: string = 'Could not delete delivery',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, DeliveriesDeleteFailed.prototype)
  }
}

export class DeliveryItemsCreateFailed extends BaseError {
  public name = 'DeliveryItemsCreateFailed'
  constructor (
    public message: string = 'Could not create delivery items',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, DeliveryItemsCreateFailed.prototype)
  }
}

export class DeliveryItemsFetchAllFailed extends BaseError {
  public name = 'DeliveryItemsFetchAllFailed'
  constructor (
    public message: string = 'Could not fetch delivery items',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, DeliveryItemsFetchAllFailed.prototype)
  }
}

export class DeliveryItemUpdateFailed extends BaseError {
  public name = 'DeliveryItemUpdateFailed'
  constructor (
    public message: string = 'Could not update delivery',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, DeliveryItemUpdateFailed.prototype)
  }
}

export class ProductGroupsFetchFailed extends BaseError {
  public name = 'ProductGroupsFetchFailed'
  constructor (
    public message: string = 'Could not fetch product groups',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductGroupsFetchFailed.prototype)
  }
}

export class ProductGroupFetchFailed extends BaseError {
  public name = 'ProductGroupFetchFailed'
  constructor (
    public message: string = 'Could not fetch product group',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductGroupFetchFailed.prototype)
  }
}

export class ProductGroupPutFailed extends BaseError {
  public name = 'ProductGroupPutFailed'
  constructor (
    public message: string = 'Could not alter product group',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductGroupPutFailed.prototype)
  }
}

export class ProductGroupCreationFailed extends BaseError {
  public name = 'ProductGroupCreationFailed'
  constructor (
    public message: string = 'Could not create product group',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductGroupCreationFailed.prototype)
  }
}

export class ProductGroupsSearchFailed extends BaseError {
  public name = 'ProductGroupsSearchFailed'
  constructor (
    public message: string = 'Could not search product group',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductGroupsSearchFailed.prototype)
  }
}

export class ProuctGroupsCountFailed extends BaseError {
  public name = 'ProuctGroupsCountFailed'
  constructor (
    public message: string = 'Could not get count of product groups',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProuctGroupsCountFailed.prototype)
  }
}

export class ProductGroupDeleteFailed extends BaseError {
  public name = 'ProductGroupDeleteFailed'
  constructor (
    public message: string = 'Could not delete product group',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductGroupDeleteFailed.prototype)
  }
}

export class AccountsFetchFailed extends BaseError {
  public name = 'AccountsFetchFailed'
  constructor (
    public message: string = 'Could not fetch accounts',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AccountsFetchFailed.prototype)
  }
}

export class AccountFetchFailed extends BaseError {
  public name = 'AccountFetchFailed'
  constructor (
    public message: string = 'Could not fetch account',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AccountFetchFailed.prototype)
  }
}

export class AccountPutFailed extends BaseError {
  public name = 'AccountPutFailed'
  constructor (
    public message: string = 'Could not alter account',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AccountPutFailed.prototype)
  }
}

export class AccountCreationFailed extends BaseError {
  public name = 'AccountCreationFailed'
  constructor (
    public message: string = 'Could not create account',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AccountCreationFailed.prototype)
  }
}

export class AccountDeleteFailed extends BaseError {
  public name = 'AccountDeleteFailed'
  constructor (
    public message: string = 'Could not delete account',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AccountDeleteFailed.prototype)
  }
}

export class ExpenseAccountsFetchFailed extends BaseError {
  public name = 'ExpenseAccountsFetchFailed'
  constructor (
    public message: string = 'Could not fetch expense accounts',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ExpenseAccountsFetchFailed.prototype)
  }
}

export class ExpenseAccountFetchFailed extends BaseError {
  public name = 'ExpenseAccountFetchFailed'
  constructor (
    public message: string = 'Could not fetch expense account',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ExpenseAccountFetchFailed.prototype)
  }
}

export class ExpenseAccountPutFailed extends BaseError {
  public name = 'ExpenseAccountPutFailed'
  constructor (
    public message: string = 'Could not alter expense account',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ExpenseAccountPutFailed.prototype)
  }
}

export class ExpenseAccountCreationFailed extends BaseError {
  public name = 'ExpenseAccountCreationFailed'
  constructor (
    public message: string = 'Could not create expense account',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ExpenseAccountCreationFailed.prototype)
  }
}

export class PaymentOptionsFetchFailed extends BaseError {
  public name = 'PaymentOptionsFetchFailed'
  constructor (
    public message: string = 'Could not fetch payment option',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, PaymentOptionsFetchFailed.prototype)
  }
}

export class ExpenseAccountDeleteFailed extends BaseError {
  public name = 'ExpenseAccountDeleteFailed'
  constructor (
    public message: string = 'Could not delete expense account',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ExpenseAccountDeleteFailed.prototype)
  }
}

export class PaymentOptionFetchFailed extends BaseError {
  public name = 'PaymentOptionFetchFailed'
  constructor (
    public message: string = 'Could not fetch payment option',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, PaymentOptionFetchFailed.prototype)
  }
}

export class PaymentOptionPutFailed extends BaseError {
  public name = 'PaymentOptionPutFailed'
  constructor (
    public message: string = 'Could not alter payment option',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, PaymentOptionPutFailed.prototype)
  }
}

export class PaymentOptionCreationFailed extends BaseError {
  public name = 'PaymentOptionCreationFailed'
  constructor (
    public message: string = 'Could not create payment option',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, PaymentOptionCreationFailed.prototype)
  }
}

export class PaymentOptionDeleteFailed extends BaseError {
  public name = 'PaymentOptionDeleteFailed'
  constructor (
    public message: string = 'Could not delete payment option',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, PaymentOptionDeleteFailed.prototype)
  }
}

export class TemplatesCreationFailed extends BaseError {
  public name = 'TemplatesCreationFailed'
  constructor (
    public message: string = 'Could not create template',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TemplatesCreationFailed.prototype)
  }
}

export class TemplatesPutFailed extends BaseError {
  public name = 'TemplatesPutFailed'
  constructor (
    public message: string = 'Could not replace template',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TemplatesPutFailed.prototype)
  }
}

export class TemplatesFetchFailed extends BaseError {
  public name = 'TemplatesFetchFailed'
  constructor (
    public message: string = 'Could not fetch templates',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TemplatesFetchFailed.prototype)
  }
}

export class TemplatesPreviewFailed extends BaseError {
  public name = 'TemplatesPreviewFailed'
  constructor (
    public message: string = 'Could not preview template',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TemplatesPreviewFailed.prototype)
  }
}

export class ConfigurationsFetchFailed extends BaseError {
  public name = 'ConfigurationsFetchFailed'
  constructor (
    public message: string = 'Could not fetch configurations',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ConfigurationsFetchFailed.prototype)
  }
}

export class ConfigurationFetchFailed extends BaseError {
  public name = 'ConfigurationFetchFailed'
  constructor (
    public message: string = 'Could not fetch configuration',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ConfigurationFetchFailed.prototype)
  }
}

export class InventoryConfigurationFetchFailed extends BaseError {
  public name = 'InventoryConfigurationFetchFailed'
  constructor (
    public message: string = 'Could not fetch inventory configuration',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, InventoryConfigurationFetchFailed.prototype)
  }
}

export class ConfigurationPutFailed extends BaseError {
  public name = 'ConfigurationPutFailed'
  constructor (
    public message: string = 'Could not alter configuration',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ConfigurationPutFailed.prototype)
  }
}

export class ConfigurationPatchFailed extends BaseError {
  public name = 'ConfigurationPatchFailed'
  constructor (
    public message: string = 'Could not patch configuration',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ConfigurationPatchFailed.prototype)
  }
}

export class ConfigurationCreationFailed extends BaseError {
  public name = 'ConfigurationCreationFailed'
  constructor (
    public message: string = 'Could not create configuration',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ConfigurationCreationFailed.prototype)
  }
}

export class ConfigurationDeleteFailed extends BaseError {
  public name = 'ConfigurationDeleteFailed'
  constructor (
    public message: string = 'Could not delete configuration',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ConfigurationDeleteFailed.prototype)
  }
}

export class DiscountsFetchFailed extends BaseError {
  public name = 'DiscountsFetchFailed'
  constructor (
    public message: string = 'Could not fetch discounts',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, DiscountsFetchFailed.prototype)
  }
}

export class DiscountFetchFailed extends BaseError {
  public name = 'DiscountFetchFailed'
  constructor (
    public message: string = 'Could not fetch discount',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, DiscountFetchFailed.prototype)
  }
}

export class DiscountPutFailed extends BaseError {
  public name = 'DiscountPutFailed'
  constructor (
    public message: string = 'Could not alter discount',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, DiscountPutFailed.prototype)
  }
}

export class DiscountCreationFailed extends BaseError {
  public name = 'DiscountCreationFailed'
  constructor (
    public message: string = 'Could not create discount',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, DiscountCreationFailed.prototype)
  }
}

export class DiscountsCountFailed extends BaseError {
  public name = 'DiscountsCountFailed'
  constructor (
    public message: string = 'Could not count discounts',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, DiscountsCountFailed.prototype)
  }
}

export class DiscountDeleteFailed extends BaseError {
  public name = 'DiscountDeleteFailed'
  constructor (
    public message: string = 'Could not delete discount',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, DiscountDeleteFailed.prototype)
  }
}

export class InvoicesFetchAllFailed extends BaseError {
  public name = 'InvoicesFetchAllFailed'
  constructor (
    public message: string = 'Could not fetch invoices',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, InvoicesFetchAllFailed.prototype)
  }
}

export class InvoicesFetchOneFailed extends BaseError {
  public name = 'InvoicesFetchOneFailed'
  constructor (
    public message: string = 'Could not fetch the invoice',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, InvoicesFetchOneFailed.prototype)
  }
}

export class InvoicesCreateFailed extends BaseError {
  public name = 'InvoicesCreateFailed'
  constructor (
    public message: string = 'Could not create invoice',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, InvoicesCreateFailed.prototype)
  }
}

export class InvoicesUpdateFailed extends BaseError {
  public name = 'InvoicesUpdateFailed'
  constructor (
    public message: string = 'Could not update invoice',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, InvoicesUpdateFailed.prototype)
  }
}

export class InvoicesDeleteFailed extends BaseError {
  public name = 'InvoicesDeleteFailed'
  constructor (
    public message: string = 'Could not delete invoice',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, InvoicesDeleteFailed.prototype)
  }
}

export class InvoicesGetMetaFailed extends BaseError {
  public name = 'InvoicesGetMetaFailed'
  constructor (
    public message: string = 'Could not get invoice meta',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, InvoicesGetMetaFailed.prototype)
  }
}

export class OrdersFetchFailed extends BaseError {
  public name = 'OrdersFetchFailed'
  constructor (
    public message: string = 'Could not fetch the orders',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, OrdersFetchFailed.prototype)
  }
}

export class OrdersCreateFailed extends BaseError {
  public name = 'OrdersCreateFailed'
  constructor (
    public message: string = 'Could not create the orders',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, OrdersCreateFailed.prototype)
  }
}

export class OrdersUpdateFailed extends BaseError {
  public name = 'OrdersUpdateFailed'
  constructor (
    public message: string = 'Could not update the orders',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, OrdersUpdateFailed.prototype)
  }
}

export class IncomingOrdersFetchFailed extends BaseError {
  public name = 'IncomingOrdersFetchFailed'
  constructor (
    public message: string = 'Could not fetch incoming orders',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, IncomingOrdersFetchFailed.prototype)
  }
}

export class OutgoingOrdersFetchFailed extends BaseError {
  public name = 'OutgoingOrdersFetchFailed'
  constructor (
    public message: string = 'Could not fetch outgoing orders',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, OutgoingOrdersFetchFailed.prototype)
  }
}

export class OrderItemsFetchFailed extends BaseError {
  public name = 'OrderItemsFetchFailed'
  constructor (
    public message: string = 'Could not fetch the order items',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, OrderItemsFetchFailed.prototype)
  }
}

export class OrderItemsCreateFailed extends BaseError {
  public name = 'OrderItemsCreateFailed'
  constructor (
    public message: string = 'Could not create the order items',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, OrderItemsCreateFailed.prototype)
  }
}

export class OrderItemUpdateFailed extends BaseError {
  public name = 'OrderItemUpdateFailed'
  constructor (
    public message: string = 'Could not update the order item',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, OrderItemUpdateFailed.prototype)
  }
}

export class OrderItemsUpdateFailed extends BaseError {
  public name = 'OrderItemsUpdateFailed'
  constructor (
    public message: string = 'Could not update the order items',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, OrderItemsUpdateFailed.prototype)
  }
}

export class OrderItemsDeleteFailed extends BaseError {
  public name = 'OrderItemsDeleteFailed'
  constructor (
    public message: string = 'Could not delete the order items',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, OrderItemsDeleteFailed.prototype)
  }
}

export class OrderSuggestionsFetchFailed extends BaseError {
  public name = 'OrderSuggestionsFetchFailed'
  constructor (
    public message: string = 'Could not fetch the orders suggestions',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, OrderSuggestionsFetchFailed.prototype)
  }
}

export class HistoricOrderItemsFetchFailed extends BaseError {
  public name = 'HistoricOrderItemsFetchFailed'
  constructor (
    public message: string = 'Could not fetch the historic order items',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, HistoricOrderItemsFetchFailed.prototype)
  }
}

export class BookStockFailed extends BaseError {
  public name = 'BookStockFailed'
  constructor (
    public message: string = 'Could not book the stocks',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, BookStockFailed.prototype)
  }
}

export class OpenOrderFetchFailed extends BaseError {
  public name = 'OpenOrderFetchFailed'
  constructor (
    public message: string = 'Could not fetch open order',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, OpenOrderFetchFailed.prototype)
  }
}

export class RegistersFetchFailed extends BaseError {
  public name = 'RegistersFetchFailed'
  constructor (
    public message: string = 'Could not fetch the Registers',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, RegistersFetchFailed.prototype)
  }
}

export class RegisterFetchFailed extends BaseError {
  public name = 'RegisterFetchFailed'
  constructor (
    public message: string = 'Could not fetch the Register',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, RegisterFetchFailed.prototype)
  }
}

export class RegisterPutFailed extends BaseError {
  public name = 'RegisterPutFailed'
  constructor (
    public message: string = 'Could not alter register',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, RegisterPutFailed.prototype)
  }
}

export class RegisterNotificationCreateFailed extends BaseError {
  public name = 'RegisterNotificationCreateFailed'
  constructor (
    public message: string = 'Could not create the Notification',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, RegisterNotificationCreateFailed.prototype)
  }
}

export class RegisterDeviceConfigurationPutFailed extends BaseError {
  public name = 'RegisterDeviceConfigurationPutFailed'
  constructor (
    public message: string = 'Could not update the Device Configuration',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, RegisterDeviceConfigurationPutFailed.prototype)
  }
}

export class RegistersSearchFailed extends BaseError {
  public name = 'RegistersSearchFailed'
  constructor (
    public message: string = 'Could not search for register',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, RegistersSearchFailed.prototype)
  }
}

export class AuditActionsFetchAllFailed extends BaseError {
  public name = 'AuditActionsFetchAllFailed'
  constructor (
    public message: string = 'Could not fetch audit actions',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AuditActionsFetchAllFailed.prototype)
  }
}

export class AuditActionsFetchOneFailed extends BaseError {
  public name = 'AuditActionsFetchOneFailed'
  constructor (
    public message: string = 'Could not fetch audit action',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AuditActionsFetchOneFailed.prototype)
  }
}

export class AuditActionsGetMetaFailed extends BaseError {
  public name = 'AuditActionsGetMetaFailed'
  constructor (
    public message: string = 'Could not fetch audit actions meta',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AuditActionsGetMetaFailed.prototype)
  }
}

export class AuditActionsCreateFailed extends BaseError {
  public name = 'AuditActionsCreateFailed'
  constructor (
    public message: string = 'Could not create audit action',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AuditActionsCreateFailed.prototype)
  }
}
export class AuditActionsTypesFetchFailed extends BaseError {
  public name = 'AuditActionsTypesFetchFailed'
  constructor (
    public message: string = 'Could not fetch audit action types',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AuditActionsTypesFetchFailed.prototype)
  }
}

export class ImageCreationFailed extends BaseError {
  public name = 'ImageCreationFailed'
  constructor (public message: string = 'Could not create new image') {
    super(message)
  }
}

export class ImagePutFailed extends BaseError {
  public name = 'ImagePutFailed'
  constructor (public message: string = 'Could not update new image') {
    super(message)
  }
}

export class StaffCountFailed extends BaseError {
  public name = 'StaffCountFailed'
  constructor (
    public message: string = 'Could not count the staff',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, StaffCountFailed.prototype)
  }
}

export class NotificationsEmailError extends BaseError {
  public name = 'NotificationsEmailError'
  constructor (
    public message: string = 'Could not send email',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, NotificationsEmailError.prototype)
  }
}

export class ProductGroupsFiltersFetchFailed extends BaseError {
  public name = 'ProductGroupsFiltersFetchFailed'
  constructor (
    public message: string = 'Could not get products group filters',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductGroupsFiltersFetchFailed.prototype)
  }
}

/**
 * PRINT API
 */

/* Jobs */
export class PrintJobsFetchFailed extends BaseError {
  public name = 'PrintJobsFetchFailed'
  constructor (
    public message: string = 'Could not fetch print jobs',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, PrintJobsFetchFailed.prototype)
  }
}

export class PrintJobFetchFailed extends BaseError {
  public name = 'PrintJobFetchFailed'
  constructor (
    public message: string = 'Could not fetch print job',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, PrintJobFetchFailed.prototype)
  }
}

export class PrintJobCreateFailed extends BaseError {
  public name = 'PrintJobCreateFailed'
  constructor (
    public message: string = 'Could not create print job',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, PrintJobCreateFailed.prototype)
  }
}

export class PrintJobDeleteFailed extends BaseError {
  public name = 'PrintJobDeleteFailed'
  constructor (
    public message: string = 'Could not delete print job',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, PrintJobDeleteFailed.prototype)
  }
}

export class PrintJobUpdateFailed extends BaseError {
  public name = 'PrintJobUpdateFailed'
  constructor (
    public message: string = 'Could not update print job',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, PrintJobUpdateFailed.prototype)
  }
}

export class PrintJobDataFetchFailed extends BaseError {
  public name = 'PrintJobDataFetchFailed'
  constructor (
    public message: string = 'Could not fetch print job data',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, PrintJobDataFetchFailed.prototype)
  }
}

/* Messages */
export class PrintMessagesFetchFailed extends BaseError {
  public name = 'PrintMessagesFetchFailed'
  constructor (
    public message: string = 'Could not fetch print messages',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, PrintMessagesFetchFailed.prototype)
  }
}

export class PrintMessageFetchFailed extends BaseError {
  public name = 'PrintMessageFetchFailed'
  constructor (
    public message: string = 'Could not fetch print message',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, PrintMessageFetchFailed.prototype)
  }
}

export class PrintMessageCreateFailed extends BaseError {
  public name = 'PrintMessageCreateFailed'
  constructor (
    public message: string = 'Could not create print message',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, PrintMessageCreateFailed.prototype)
  }
}

export class PrintMessageDeleteFailed extends BaseError {
  public name = 'PrintMessageDeleteFailed'
  constructor (
    public message: string = 'Could not delete print message',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, PrintMessageDeleteFailed.prototype)
  }
}

export class PrintMessageUpdateFailed extends BaseError {
  public name = 'PrintMessageUpdateFailed'
  constructor (
    public message: string = 'Could not update print message',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, PrintMessageUpdateFailed.prototype)
  }
}

/* Printers */
export class PrintersFetchFailed extends BaseError {
  public name = 'PrintersFetchFailed'
  constructor (
    public message: string = 'Could not fetch printers',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, PrintersFetchFailed.prototype)
  }
}

export class PrinterFetchFailed extends BaseError {
  public name = 'PrinterFetchFailed'
  constructor (
    public message: string = 'Could not fetch printer',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, PrinterFetchFailed.prototype)
  }
}

export class PrinterCreateFailed extends BaseError {
  public name = 'PrinterCreateFailed'
  constructor (
    public message: string = 'Could not create printer',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, PrinterCreateFailed.prototype)
  }
}

export class PrinterDeleteFailed extends BaseError {
  public name = 'PrinterDeleteFailed'
  constructor (
    public message: string = 'Could not delete printer',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, PrinterDeleteFailed.prototype)
  }
}

export class PrinterUpdateFailed extends BaseError {
  public name = 'PrinterUpdateFailed'
  constructor (
    public message: string = 'Could not update printer',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, PrinterUpdateFailed.prototype)
  }
}

export class MessagesFetchFailed extends BaseError {
  public name = 'MessagesFetchFailed'
  constructor (
    public message: string = 'Could not fetch the messages',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, MessagesFetchFailed.prototype)
  }
}

export class MessagesUpdateFailed extends BaseError {
  public name = 'MessagesUpdateFailed'
  constructor (
    public message: string = 'Could not update the message',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, MessagesUpdateFailed.prototype)
  }
}

export class BalancesFetchFailed extends BaseError {
  public name = 'BalancesFetchFailed'
  constructor (
    public message: string = 'Could not fetch the balances',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, BalancesFetchFailed.prototype)
  }
}

export class BalancesFetchOneFailed extends BaseError {
  public name = 'BalancesFetchOneFailed'
  constructor (
    public message: string = 'Could not fetch the balance',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, BalancesFetchOneFailed.prototype)
  }
}

export class BalancesMetaFailed extends BaseError {
  public name = 'BalancesMetaFailed'
  constructor (
    public message: string = 'Could not fetch meta data for balances',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, BalancesMetaFailed.prototype)
  }
}

export class LegacySettingsFetchFailed extends BaseError {
  public name = 'LegacySettingsFetchFailed'
  constructor (
    public message: string = 'Could not fetch legacy settings',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, LegacySettingsFetchFailed.prototype)
  }
}
export class LegacySettingFetchFailed extends BaseError {
  public name = 'LegacySettingFetchFailed'
  constructor (
    public message: string = 'Could not fetch one legacy settings object',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, LegacySettingFetchFailed.prototype)
  }
}
export class LegacySettingUpdateFailed extends BaseError {
  public name = 'LegacySettingUpdateFailed'
  constructor (
    public message: string = 'Could not update one legacy settings object',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, LegacySettingUpdateFailed.prototype)
  }
}

export class EmailCredentialsFetchFailed extends BaseError {
  public name = 'EmailCredentialsFetchFailed'
  constructor (
    public message: string = 'Could not get email credentials',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, EmailCredentialsFetchFailed.prototype)
  }
}

export class EmailCredentialsSetFailed extends BaseError {
  public name = 'EmailCredentialsSetFailed'
  constructor (
    public message: string = 'Could not set email credentials',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, EmailCredentialsSetFailed.prototype)
  }
}

export class EmailCustomMailjetActiveGetFailed extends BaseError {
  public name = 'EmailCustomMailjetActiveGetFailed'
  constructor (
    public message: string = 'Could not get custom mailjet active status',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, EmailCustomMailjetActiveGetFailed.prototype)
  }
}

export class EmailCustomMailjetActiveSetFailed extends BaseError {
  public name = 'EmailCustomMailjetActiveSetFailed'
  constructor (
    public message: string = 'Could not set custom mailjet active status',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, EmailCustomMailjetActiveSetFailed.prototype)
  }
}

export class EmailTestCustomMailjetFailed extends BaseError {
  public name = 'EmailTestCustomMailjetFailed'
  constructor (
    public message: string = 'Could not test custom mailjet',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, EmailTestCustomMailjetFailed.prototype)
  }
}

export class EmailCustomMailjetDefaultSenderSetFailed extends BaseError {
  public name = 'EmailCustomMailjetDefaultSenderSetFailed'
  constructor (
    public message: string = 'Could not set custom mailjet default sender',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, EmailCustomMailjetDefaultSenderSetFailed.prototype)
  }
}
