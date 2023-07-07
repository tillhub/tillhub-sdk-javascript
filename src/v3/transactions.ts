import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface TransactionsOptions {
  user?: string
  base?: string
}

export interface TransactionsResponse {
  data: Transaction[]
  metadata: Record<string, unknown>
  next?: () => Promise<TransactionsResponse>
}

export interface TransactionResponse {
  data: TransactionDetails
  metadata: Record<string, unknown>
  msg?: string
  errors?: ErrorObject[]
}

export interface ErrorObject {
  id: string
  label: string
  errorDetails: Record<string, unknown>
}

export interface TransactionsQuery {
  limit?: number
  uri?: string
  query?: {
    transactionId?: string
  }
}

declare type CommerceTypes = 'eCommerce' | 'moto' | 'pos' | 'undefined' | 'unknown'
declare type PaymentMethodCodeTypes = 'undefined' | 'alipay' | 'applepay' | 'bancontact' | 'bank_transfer' | 'billpay_installment' | 'billpay_invoice' | 'credit_card' | 'debit_card' | 'easycredit_installment' | 'eps' | 'fleetcard' | 'girocard' | 'giropay' | 'googlepay' | 'ideal' | 'installment' | 'invoice' | 'klarna' | 'klarna_installment' | 'klarna_invoice' | 'loyalty' | 'monthly_invoice' | 'paypal' | 'paypal_express' | 'paysafecard' | 'paysafecash' | 'post_finance_card' | 'post_finance_efinance' | 'prepayment' | 'przelewy24' | 'santander_installment' | 'santander_purchase_on_account' | 'sepa_direct_debit' | 'sofort' | 'wechatpay' | 'unknown'
declare type PaymentMethodBrandCodeTypes = 'undefined' | 'amex' | 'avs'| 'bancontact'| 'bsw'| 'cartasi'| 'cartebancaire'| 'cartebleue'| 'cup'| 'dankort'| 'diners'| 'discover'| 'dkv'| 'euro6000'| 'four_b'| 'girocard'| 'jcb'| 'maestro'| 'mastercard'| 'postepay'| 'servired'| 'uta'| 'visa'| 'visa_debit'| 'visa_electron'| 'vpay'| 'unknown'
declare type TransactionTypeTypes = 'authorization' | 'capture' | 'change_schedule' | 'chargeback' | 'chargeback_notification' | 'chargeback_reversal' | 'confirmation' | 'credit' | 'cutover' | 'dcc_inquiry' | 'debit' | 'debit_reversal' | 'deregistration' | 'diagnosis' | 'end_schedule' | 'file_transfer' | 'finalize' | 'initialize' | 'installment_inquiry' | 'notification' | 'reauthorization' | 'receipt' | 'refund' | 'registration' | 'reversal' | 'risk_check' | 'schedule' | 'taxfree_inquiry' | 'three_ds_authentication' | 'update_registration' | 'undefined' | 'unknown'
declare type StateTypes = 'success' | 'waiting' | 'rejected' | 'failed' | 'unknown'
declare type StatusDetailsErrorTypeTypes = 'invalid_input' | 'configuration_error' | 'business_decline' | 'internal_error' | 'external_error' | 'undefined' | 'unknown'
declare type PaymentNetworkServiceProviderTypes = 'intercard' | 'six' | 'concardis' | 'epay' | 'telecash' | 'lavego' | 'undefined' | 'unknown'
declare type PaymentAuthorizationMethodTypes = 'online' | 'offline' | 'undefined' | 'unknown'
declare type PaymentRecurrenceModeTypes = 'NONE' | 'INITIAL' | 'REPEATED' | 'LAST'
declare type PaymentRecurrenceContractTypes = 'oneclick' | 'recurring' | 'installment' | 'ucof' | 'unknown'
declare type PaymentThreedsVersionTypes = 'v_1_0_2' | 'v_2_0_0' |'v_2_1_0' |'v_2_2_0' |'unknown'
declare type PaymentThreedsStatusTypes = 'Y' | 'N' | 'U' | 'A' | 'R' | 'unknown'
declare type PaymentThreedsChallengeIndicatorTypes = '_01' | '_02' | '_03' | '_04'
declare type PaymentThreedsExemptionTypes = 'mit' | 'tra' | 'recurring' | 'lvp' | 'delegation'
declare type PaymentSepaTypeTypes = 'CORE' | 'COR1' | 'B2B'
declare type PaymentReversalTypeTypes = 'CANCEL' | 'RETURN' | 'CREDIT'
declare type PaymentLiabilityTypes = 'merchant' | 'issuer' | 'unknown'
declare type JobDurationUnitTypes = 'HOUR' | 'DAY' | 'WEEK' | 'MONTH' | 'YEAR'
declare type AuthenticationResultIndicatorTypes = '01' | '02' | '05' | '06' | '07' | '00'
declare type CredentialOnFileInitiationTypes = 'MIT' | 'CIT'
declare type OrderCheckoutStateTypes = 'pending' | 'resumed' | 'completed'

export interface Transaction {
  requestTimestamp?: string | null
  paymentPresentationAmount?: AmountData | null
  paymentPresentationCurrency?: string | null
  paymentMethodCode?: PaymentMethodCodeTypes | null
  paymentMethodBrandCode?: PaymentMethodBrandCodeTypes | null
  customer?: Customer | null
  state?: StateTypes | null
  transactionType?: TransactionTypeTypes | null
  identificationUniqueId?: string | null
  channelName?: string | null
  identificationReferenceId?: string | null
  identificationShortId?: string | null
  channelId?: string | null
  identificationTransactionId?: string | null
  identificationInvoiceId?: string | null
  mode?: string | null
  paymentRecurrenceMode?: PaymentRecurrenceModeTypes | null
  paymentTerminalId?: string | null
  paymentCutoverTimestamp?: string | null
  paymentPresentationUsage?: string | null
  identificationShopperId?: string | null
  source?: string | null
  paymentRecurrenceContract?: PaymentRecurrenceContractTypes | null
  paymentRecurrenceSequence?: string | null
  paymentThreedsVersion?: PaymentThreedsVersionTypes | null
  paymentThreedsStatus?: PaymentThreedsStatusTypes | null
  paymentThreedsReason?: string | null
  paymentThreedsXid?: string | null
  paymentThreedsDsTransactionId?: string | null
  paymentThreedsDsCavv?: string | null
  paymentThreedsChallengeIndicator?: PaymentThreedsChallengeIndicatorTypes | null
  paymentThreedsExemption?: PaymentThreedsExemptionTypes | null
  paymentThreedsElectronicCommerceIndicator?: string | null
  processingStatusDescription: string | null
  processingReturnValueDescription: string | null
  processingCode: string | null
  accountNumber?: string | null
  accountExpiry?: string | null
  accountIban?: string | null
  accountHolder?: string | null
  paymentClearingFxRate?: string | null
  paymentClearingDate?: string | null
  paymentClearingDescriptor?: string | null
  accountBankName?: string | null
  accountBank?: string | null
  accountCountry?: string | null
  insuranceProvider?: string | null
  insuranceId?: string | null
  insuranceFinalizeDate?: string | null
  instalmentNumberOfInstalments?: number | null
  instalmentInterestRate?: string | null
}

export interface TransactionDetails extends Transaction{
  accountTokenProvider?: string | null
  ProcessingStatusCode?: number | null
  processingResult?: string | null
  processingReturnValueCode: string | null
  processingReasonDescription: string | null
  paymentThreedsTransactionId: string | null
  shippingTrackingId?: string | null
  shippingCarrier?: string | null
  metadata?: JSON | null
  pnpResponseMessage?: string | null
  pnpResponseCode?: string | null
  commerceType?: CommerceTypes | null
  paymentMethodSecured?: boolean | null
  paymentMethodFactoring?: boolean | null
  statusDetailsErrorType?: StatusDetailsErrorTypeTypes | null
  statusDetailsOriginReturnValue?: string | null
  response?: string | null
  identificationRootId?: string | null
  identificationSource?: string | null
  identificationExtUniqueId?: string | null
  identificationExtShortId?: string | null
  identificationExtMerchantId?: string | null
  identificationContractId?: string | null
  identificationSenderId?: string | null
  identificationCreditorId?: string | null
  identificationContractOwner?: string | null
  identificationPnpTxnId?: string | null
  identificationPnpTxnId2?: string | null
  identificationPnpId?: string | null
  identificationPnpName?: string | null
  identificationMerchantCategoryCode?: string | null
  identificationScheduledJobName?: string | null
  identificationJobReferenceId?: string | null
  identificationCutoverId?: string | null
  processingSecured: string | null
  processingReasonCode: string | null
  processingConfirmationStatus: string | null
  processingRedirectParameters: string | null
  processingRedirectUrl: string | null
  paymentDccAmount?: AmountData | null
  paymentDccAmountOrigin?: JSON | null
  paymentDccCurrency?: string | null
  paymentPosEntryMode?: string | null
  paymentCardAcceptorId?: string | null
  paymentAuthorizationCode?: string | null
  paymentNetworkServiceProvider?: PaymentNetworkServiceProviderTypes | null
  paymentAuthorizationMethod?: PaymentAuthorizationMethodTypes | null
  paymentUploadTimestamp?: string | null
  paymentSystemTraceAuditNumber?: string | null
  paymentReferenceSystemTraceAuditNumber?: string | null
  paymentCode?: string | null
  paymentClearingAmount?: AmountData | null
  paymentClearingAmountOrigin?: JSON | null
  paymentClearingCurrency?: string | null
  paymentClearingSupport?: string | null
  paymentClearingAccount?: JSON | null
  paymentClearingFxDate?: string | null
  paymentClearingBankName?: string | null
  paymentClearingCbFeeLocal?: AmountData | null
  paymentClearingCbFeeLocalOrigin?: JSON | null
  paymentClearingCbFeeRemote?: AmountData | null
  paymentClearingCbFeeRemoteOrigin?: JSON | null
  paymentClearingCbFeeTotal?: AmountData | null
  paymentClearingCbFeeTotalOrigin?: JSON | null
  paymentPresentationAmountOrigin?: JSON | null
  paymentSepaType?: PaymentSepaTypeTypes | null
  paymentReversalType?: PaymentReversalTypeTypes | null
  paymentLiability: PaymentLiabilityTypes | null
  accountIssuerCountry?: string | null
  accountNumber?: string | null
  accountHolder?: string | null
  accountExpiry?: string | null
  accountBrand?: string | null
  accountCardHash?: string | null
  accountBic?: string | null
  accountIban?: string | null
  accountRegistrationId?: string | null
  accountIdentification?: string | null
  customerOrigin?: JSON | null
  jobExecution?: JSON | null
  jobDurationNumber?: number | null
  jobDurationUnit?: JobDurationUnitTypes | null
  jobName?: string | null
  jobStartTime?: string | null
  jobNextExecutionTime?: string | null
  jobEndTime?: string | null
  jobType?: string | null
  frontendResponseUrl?: string | null
  frontendSessionId?: string | null
  frontendLanguageId?: string | null
  analysisCriteria?: JSON | null
  authenticationResultIndicator?: AuthenticationResultIndicatorTypes | null
  authenticationParameters?: string | null
  authenticationType?: string | null
  marketplaceBaseAmount?: AmountData | null
  marketplaceBaseAmountOrigin?: JSON | null
  marketplaceItems?: MarketplaceItemData[] | null
  basketId?: string | null
  insuranceInquiryId?: string | null
  insuranceFinalizeDate?: string | null
  insuranceDueDate?: string | null
  insuranceActivationDate?: string | null
  insuranceFirstReminderDate?: string | null
  insuranceSecondReminderDate?: string | null
  insuranceThirdReminderDate?: string | null
  insuranceFourthReminderDate?: string | null
  insurancePaymentTargetDate?: string | null
  insuranceRealizationDeadlineDate?: string | null
  insuranceReservationDate?: string | null
  insuranceErrorCode?: string | null
  insuranceErrorMessage?: string | null
  credentialOnFileInitiation?: CredentialOnFileInitiationTypes | null
  credentialOnFileBrandTransactionId?: string | null
  channelId?: string | null
  channel?: string | null
  merchantUnzerId?: string | null
  merchantUnzerName?: string | null
  merchantId?: string | null
  merchantName?: string | null
  divisionId?: string | null
  divisionName?: string | null
  orderCheckoutState?: OrderCheckoutStateTypes | null
}

export interface AmountData {
  amount?: number | null
  scale?: number | null
}

export interface Customer {
  customerId?: string
  name?: NameData | null
  address?: AddressData[] | null
  shippingName?: NameData | null
  shippingAddress?: AddressData[] | null
  contact?: ContactData | null
  actor?: ActorData | null
  optIn?: boolean | null
  optIn2?: boolean | null
  type?: string
  company?: BusinessCompanyEntity | null
}

export interface BusinessCompanyEntity {
  companyName: string | null
  location: BusinessLocationData | null
  registrationType: string | null
  commercialRegisterNumber: string | null
  districtCourt: string | null
  companyURL: string | null
  clientCustomerId: string | null
  duns: string | null
  easyNumber: string | null
  vatId: string | null
  taxNumber: string | null
  executive: string | null
  commercialSector: string | null
}

export interface BusinessLocationData {
  street: string | null
  houseNumber: string | null
  zip: string | null
  city: string | null
  poBox: string | null
  country: string | null
}

export interface ContactData {
  email?: string | null
  ip?: string | null
  ipCountry?: string | null
  phone?: string | null
  mobile?: string | null
}

export interface ActorData {
  displayName?: string | null
  language?: string | null
  country?: string | null
  timezone?: string | null
  userName?: string | null
}

export interface NameData {
  firstName?: string | null
  lastName?: string | null
  title?: string | null // Mr/Mrs/Ms/Dr...
  company?: string | null
  salutation?: string | null
  birthdate?: string | null
}

export interface AddressData {
  street?: string | null
  zip?: string | null
  city?: string | null
  state?: string | null
  country?: string | null
  houseExtension?: string | null
  street2?: string | null
}

export interface MarketplaceItemData {
  itemId?: string | null
  channel?: string | null
  amount?: AmountData | null
  amountOrigin?: JSON | null
  baseAmount?: AmountData | null
  baseAmountOrigin?: JSON | null
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

  async getAll (query?: TransactionsQuery | undefined): Promise<TransactionsResponse> {
    let next
    const base = this.uriHelper.generateBaseUri('/')
    const uri = this.uriHelper.generateUriWithQuery(base, query)

    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new TransactionsFetchFailed(undefined, { status: response.status })
      }

      if (response.data.cursor?.next) {
        next = (): Promise<TransactionsResponse> => this.getAll({ uri })
      }

      return {
        data: response.data.results as Transaction[],
        metadata: { cursor: response.data.cursor },
        next
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
        data: response.data.results[0] as TransactionDetails,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new TransactionFetchFailed(error.message, { error })
    }
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
