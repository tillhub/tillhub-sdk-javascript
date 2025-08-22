import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'
import { OrderEntity, CustomerEntity } from '../v2/orders'
import { exportJobQuery } from '../shared_interfaces'

export interface TransactionsOptions {
  user?: string
  base?: string
}

export interface TransactionsResponse {
  data: TransactionEntity[]
  metadata: Record<string, unknown>
  next?: () => Promise<TransactionsResponse>
}

export interface TransactionsMetaResponse {
  data: Record<string, unknown>
  metadata: Record<string, unknown>
  msg: string
}

export interface TransactionResponse {
  data: TransactionEntity
  metadata: Record<string, unknown>
  msg?: string
  errors?: ErrorObject[]
}

export interface TransactionExportCorrelation {
  correlationId: string
}

export interface TransactionExportResponse {
  data: TransactionExportCorrelation
  msg?: string
  errors?: ErrorObject[]
}

export interface ErrorObject {
  id: string
  label: string
  errorDetails: Record<string, unknown>
}

export interface TransactionsQueryHandler {
  limit?: number
  uri?: string
  query?: TransactionsQuery
  orderFields?: string[] | string
}

export interface TransactionsQuery extends TransactionEntity {
  deleted?: boolean
  active?: boolean
  businessUnitId?: string
}

export interface TransactionsExportQueryHandler extends TransactionsQuery {
  exportMetaData: exportJobQuery
}

declare type CommerceTypes = 'eCommerce' | 'moto' | 'pos' | 'undefined' | 'unknown'
declare type PaymentMethodCodeTypes = 'undefined' | 'alipay' | 'applepay' | 'bancontact' | 'bank_transfer' | 'billpay_installment' | 'billpay_invoice' | 'credit_card' | 'debit_card' | 'easycredit_installment' | 'eps' | 'fleetcard' | 'girocard' | 'giropay' | 'googlepay' | 'ideal' | 'installment' | 'invoice' | 'klarna' | 'klarna_installment' | 'klarna_invoice' | 'loyalty' | 'monthly_invoice' | 'paypal' | 'paypal_express' | 'paysafecard' | 'paysafecash' | 'post_finance_card' | 'post_finance_efinance' | 'prepayment' | 'przelewy24' | 'santander_installment' | 'santander_purchase_on_account' | 'sepa_direct_debit' | 'sofort' | 'wechatpay' | 'unknown'
declare type PaymentMethodBrandCodeTypes = 'undefined' | 'amex' | 'avs'| 'bancontact'| 'bsw'| 'cartasi'| 'cartebancaire'| 'cartebleue'| 'cup'| 'dankort'| 'diners'| 'discover'| 'dkv'| 'euro6000'| 'four_b'| 'girocard'| 'jcb'| 'maestro'| 'mastercard'| 'postepay'| 'servired'| 'uta'| 'visa'| 'visa_debit'| 'visa_electron'| 'vpay'| 'unknown'
declare type TransactionTypeTypes = 'authorization' | 'capture' | 'change_schedule' | 'chargeback' | 'chargeback_notification' | 'chargeback_reversal' | 'confirmation' | 'credit' | 'cutover' | 'dcc_inquiry' | 'debit' | 'debit_reversal' | 'deregistration' | 'diagnosis' | 'end_schedule' | 'file_transfer' | 'finalize' | 'initialize' | 'installment_inquiry' | 'notification' | 'reauthorization' | 'receipt' | 'refund' | 'registration' | 'reversal' | 'risk_check' | 'schedule' | 'taxfree_inquiry' | 'three_ds_authentication' | 'update_registration' | 'undefined' | 'unknown'
declare type TransactionState = 'success' | 'waiting' | 'rejected' | 'failed' | 'unknown'
declare type StatusDetailsErrorTypeTypes = 'invalid_input' | 'configuration_error' | 'business_decline' | 'internal_error' | 'external_error' | 'undefined' | 'unknown'
declare type TransactionPaymentProvider = 'intercard' | 'six' | 'concardis' | 'epay' | 'telecash' | 'lavego' | 'undefined' | 'unknown'
declare type TransactionPaymentAuthorizationMethod = 'online' | 'offline' | 'undefined' | 'unknown'
declare type PaymentRecurrenceModeTypes = 'NONE' | 'INITIAL' | 'REPEATED' | 'LAST'
declare type PaymentRecurrenceContractTypes = 'oneclick' | 'recurring' | 'installment' | 'ucof' | 'unknown'
declare type PaymentThreedsVersionTypes = 'v_1_0_2' | 'v_2_0_0' |'v_2_1_0' |'v_2_2_0' |'unknown'
declare type PaymentThreedsStatusTypes = 'Y' | 'N' | 'U' | 'A' | 'R' | 'unknown'
declare type PaymentThreedsChallengeIndicatorTypes = '_01' | '_02' | '_03' | '_04'
declare type TransactionThreedsExemption = 'mit' | 'tra' | 'recurring' | 'lvp' | 'delegation'
declare type PaymentSepaTypeTypes = 'CORE' | 'COR1' | 'B2B'
declare type PaymentReversalTypeTypes = 'CANCEL' | 'RETURN' | 'CREDIT'
declare type TransactionPaymentLiability = 'merchant' | 'issuer' | 'unknown'
declare type JobDurationUnitTypes = 'HOUR' | 'DAY' | 'WEEK' | 'MONTH' | 'YEAR'
declare type AuthenticationResultIndicatorTypes = '01' | '02' | '05' | '06' | '07' | '00'
declare type CredentialOnFileInitiationTypes = 'MIT' | 'CIT'
declare type TransactionOrderCheckoutState = 'pending' | 'resumed' | 'completed'
declare type TransactionMode = 'INTEGRATOR_TEST' | 'CONNECTOR_TEST' | 'LIVE'
declare type TransactionResponseType = 'SYNC' | 'ASYNC'

export interface TransactionMetaData {
  id: string
  dataschema: string
  time: Date
  origin: string
  traceId: string
  attributes: object | null
}

export interface TransactionEntity {
  accountBank?: string | null
  accountBankName?: string | null
  accountBic?: string | null
  accountBrand?: string | null
  accountCardHash?: string | null
  accountCountry?: string | null
  accountExpiry?: string | null
  accountHolder?: string | null
  accountIban?: string | null
  accountIdentification?: string | null
  accountIssuerCountry?: string | null
  accountNumber?: string | null
  accountRegistrationId?: string | null
  accountTokenProvider?: string | null
  analysisCriteria?: JSON | null
  authenticationParameters?: string | null
  authenticationResultIndicator?: AuthenticationResultIndicatorTypes | null
  authenticationType?: string | null
  basketId?: string | null
  channel?: string | null
  channelId?: string | null
  channelName?: string | null
  commerceType?: CommerceTypes | null
  credentialOnFileBrandTransactionId?: string | null
  credentialOnFileInitiation?: CredentialOnFileInitiationTypes | null
  customer?: CustomerEntity | null
  customerOrigin?: CustomerEntity | null
  divisionId?: string | null
  divisionName?: string | null
  frontendLanguageId?: string | null
  frontendResponseUrl?: string | null
  frontendSessionId?: string | null
  identificationContractId?: string | null
  identificationContractOwner?: string | null
  identificationCreditorId?: string | null
  identificationCutoverId?: string | null
  identificationExtMerchantId?: string | null
  identificationExtShortId?: string | null
  identificationExtUniqueId?: string | null
  identificationJobReferenceId?: string | null
  identificationInvoiceId?: string | null
  identificationMerchantCategoryCode?: string | null
  identificationPnpId?: string | null
  identificationPnpName?: string | null
  identificationPnpTxnId?: string | null
  identificationPnpTxnId2?: string | null
  identificationReferenceId?: string | null
  identificationRootId?: string | null
  identificationSenderId?: string | null
  identificationScheduledJobName?: string | null
  identificationShopperId?: string | null
  identificationShortId?: string | null
  identificationSource?: string | null
  identificationTransactionId?: string | null
  identificationUniqueId?: string | null
  instalmentInterestRate?: string | null
  instalmentNumberOfInstalments?: number | null
  insuranceActivationDate?: Date | null
  insuranceDueDate?: Date | null
  insuranceErrorCode?: string | null
  insuranceErrorMessage?: string | null
  insuranceFinalizeDate?: Date | null
  insuranceFirstReminderDate?: Date | null
  insuranceFourthReminderDate?: Date | null
  insuranceId?: string | null
  insuranceInquiryId?: string | null
  insurancePaymentTargetDate?: Date | null
  insuranceProvider?: string | null
  insuranceRealizationDeadlineDate?: Date | null
  insuranceReservationDate?: Date | null
  insuranceSecondReminderDate?: Date | null
  insuranceThirdReminderDate?: Date | null
  jobDurationNumber?: string | null
  jobDurationUnit?: JobDurationUnitTypes | null
  jobEndTime?: string | null
  jobExecution?: JSON | null
  jobName?: string | null
  jobNextExecutionTime?: string | null
  jobStartTime?: string | null
  jobType?: string | null
  marketplaceBaseAmount?: number | null
  marketplaceBaseAmountOrigin?: AmountData | null
  marketplaceItems?: MarketPlaceItemEntity[] | null
  merchantId?: string | null
  merchantName?: string | null
  merchantUnzerId?: string | null
  merchantUnzerName?: string | null
  metadata?: TransactionMetaData | null
  mode?: TransactionMode | null
  order?: OrderEntity | null
  orderCheckoutState?: TransactionOrderCheckoutState | null
  paymentAuthorizationCode?: string | null
  paymentAuthorizationMethod?: TransactionPaymentAuthorizationMethod | null
  paymentCardAcceptorId?: string | null
  paymentClearingAccount?: JSON | null
  paymentClearingAmount?: number | null
  paymentClearingAmountOrigin?: AmountData | null
  paymentClearingBankName?: string | null
  paymentClearingCbFeeLocal?: number | null
  paymentClearingCbFeeLocalOrigin?: AmountData | null
  paymentClearingCbFeeRemote?: number | null
  paymentClearingCbFeeRemoteOrigin?: AmountData | null
  paymentClearingCbFeeTotal?: number | null
  paymentClearingCbFeeTotalOrigin?: AmountData | null
  paymentClearingCurrency?: string | null
  paymentClearingDate?: Date | null
  paymentClearingDescriptor?: string | null
  paymentClearingFxSource?: string | null
  paymentClearingFxDate?: Date | null
  paymentClearingFxRate?: string | null
  paymentClearingSupport?: string | null
  paymentCode?: string | null
  paymentCutoverTimestamp?: string | null
  paymentDccAmount?: number | null
  paymentDccAmountOrigin?: AmountData | null
  paymentDccCurrency?: string | null
  paymentLiability?: TransactionPaymentLiability | null
  paymentMethodBrandCode?: PaymentMethodBrandCodeTypes | null
  paymentMethodCode?: PaymentMethodCodeTypes | null
  paymentMethodFactoring?: boolean | null
  paymentMethodSecured?: boolean | null
  paymentNetworkServiceProvider?: TransactionPaymentProvider | null
  paymentPosEntryMode?: string | null
  paymentPresentationAmount?: number | null
  paymentPresentationAmountOrigin?: AmountData | null
  paymentPresentationCurrency?: string | null
  paymentPresentationUsage?: string | null
  paymentRecurrenceContract?: PaymentRecurrenceContractTypes | null
  paymentRecurrenceMode?: PaymentRecurrenceModeTypes | null
  paymentRecurrenceSequence?: string | null
  paymentReferenceSystemTraceAuditNumber?: string | null
  paymentReversalType?: PaymentReversalTypeTypes | null
  paymentSepaType?: PaymentSepaTypeTypes | null
  paymentSystemTraceAuditNumber?: string | null
  paymentTerminalId?: string | null
  paymentThreedsCavv?: string | null
  paymentThreedsChallengeIndicator?: PaymentThreedsChallengeIndicatorTypes | null
  paymentThreedsDsTransactionId?: string | null
  paymentThreedsElectronicCommerceIndicator?: string | null
  paymentThreedsExemption?: TransactionThreedsExemption | null
  paymentThreedsReason?: string | null
  paymentThreedsStatus?: PaymentThreedsStatusTypes | null
  paymentThreedsVersion?: PaymentThreedsVersionTypes | null
  paymentThreedsXid?: string | null
  paymentUploadTimestamp?: string | null
  pnpResponseCode?: string | null
  pnpResponseMessage?: string | null
  processingCode?: string | null
  processingConfirmationStatus?: string | null
  processingChargeBack?: string | null
  processingResult?: string | null
  processingReasonCode?: string | null
  processingReasonDescription?: string | null
  processingRedirectParameters?: JSON | null
  processingRedirectUrl?: string | null
  processingReturnValueCode?: string | null
  processingReturnValueDescription?: string | null
  processingSecured?: string | null
  processingStatusCode?: string | null
  processingStatusDescription?: string | null
  response?: TransactionResponseType | null
  requestTimestamp?: string | {
    start: Date
    end: Date
  } | null
  shippingCarrier?: string | null
  shippingTrackingId?: string | null
  source?: string | null
  state?: TransactionState | null
  statusDetailsErrorType?: StatusDetailsErrorTypeTypes | null
  statusDetailsOriginReturnValue?: string | null
  transactionType?: TransactionTypeTypes | null
}

export interface AmountData {
  amount?: number | null
  scale?: number | null
}

export interface MarketPlaceItemEntity {
  amount?: number | null
  amountOrigin?: AmountData | null
  baseAmount?: number | null
  baseAmountOrigin?: AmountData | null
  channel?: string | null
  itemId?: string | null
  transaction?: TransactionEntity | null
  transactionId?: string | null
  usage?: string | null
}

export class Transactions extends ThBaseHandler {
  public static baseEndpoint = '/api/v3/transactions'
  endpoint: string
  http: Client
  public options: TransactionsOptions
  public uriHelper: UriHelper

  constructor (options: TransactionsOptions, http: Client) {
    super(http, {
      endpoint: Transactions.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = Transactions.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (query?: TransactionsQueryHandler | undefined): Promise<TransactionsResponse> {
    let next
    const base = this.uriHelper.generateBaseUri()
    const uri = this.uriHelper.generateUriWithQuery(base, query)

    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new TransactionsFetchFailed(undefined, { status: response.status })
      }

      if (response.data.cursors?.after) {
        next = (): Promise<TransactionsResponse> => this.getAll({ uri: response.data.cursors.after })
      }

      return {
        data: response.data.results as TransactionEntity[],
        metadata: { cursor: response.data.cursors },
        next
      }
    } catch (error: any) {
      throw new TransactionsFetchFailed(error.message, { error })
    }
  }

  async export (query: TransactionsExportQueryHandler): Promise<TransactionExportResponse> {
    const base = this.uriHelper.generateBaseUri()
    const uri = this.uriHelper.generateUriWithQuery(`${base}/export`, query)

    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new TransactionsExportFetchFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0] as TransactionExportCorrelation,
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new TransactionsExportFetchFailed(error.message, { error })
    }
  }

  async meta (query?: TransactionsQueryHandler | undefined): Promise<TransactionsMetaResponse> {
    const base = this.uriHelper.generateBaseUri()
    const uri = this.uriHelper.generateUriWithQuery(`${base}/meta`, query)

    try {
      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) throw new TransactionsGetMetaFailed()

      return {
        data: response.data.results[0],
        msg: response.data.msg,
        metadata: { count: response.data.results[0]?.count || 0 }
      }
    } catch (error: any) {
      throw new TransactionsFetchFailed(error.message, { error })
    }
  }

  async get (transactionId: string): Promise<TransactionResponse> {
    const base = this.uriHelper.generateBaseUri(`/${transactionId}`)
    const uri = this.uriHelper.generateUriWithQuery(base)

    try {
      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) {
        throw new TransactionFetchFailed(undefined, { status: response.status })
      }
      return {
        data: response.data.results[0] as TransactionEntity,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new TransactionFetchFailed(error.message, { error })
    }
  }
}

export class TransactionsGetMetaFailed extends BaseError {
  public name = 'TransactionsGetMetaFailed'
  constructor (
    public message: string = 'Could not fetch meta data for transactions',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TransactionsGetMetaFailed.prototype)
  }
}

export class TransactionsFetchFailed extends BaseError {
  public name = 'TransactionsFetchFailed'
  constructor (
    public message: string = 'Could not fetch transactions',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TransactionsFetchFailed.prototype)
  }
}

export class TransactionsExportFetchFailed extends BaseError {
  public name = 'TransactionsExportFetchFailed'
  constructor (
    public message: string = 'Could not export transactions',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TransactionsExportFetchFailed.prototype)
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
