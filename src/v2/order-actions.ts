import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface OrderActionsOptions {
  user?: string
  base?: string
}

export interface ChargeCancelRequest {
  keypairId: string
  paymentId?: string
  paymentReference?: string
  amount?: number
}

export interface ChargeCancelResponse {
  data?: ChargeCancelResult
  msg?: string
  status?: any
}

export interface ChargeCancelResult {
  id: string
  amount: string
  currency: string
}

export interface AuthorizeCancelRequest {
  keypairId: string
  paymentId?: string
  paymentReference?: string
  amount?: number
}

export interface AuthorizeCancelResponse {
  data?: AuthorizeCancelResult
  msg?: string
  status?: any
}

export interface AuthorizeCancelResult {
  id: string
  amount: string
  currency: string
}

export interface AuthorizeChargeRequest {
  keypairId: string
  paymentId?: string
  paymentReference?: string
  amount?: number
}

export interface AuthorizeChargeResponse {
  data?: AuthorizeChargeResult
  msg?: string
  status?: any
}

export interface AuthorizeChargeResult {
  id: string
  amount: string
  currency: string
}

export interface BasketItem {
  basketItemReferenceId?: string
  quantity?: number
  vat?: number
  amountDiscountPerUnitGross?: number
  amountPerUnitGross?: number
  title?: string
  type?: string
  unit?: string
  subTitle?: string
  imageUrl?: string
}

export interface Basket {
  id?: string
  totalValueGross?: number
  currencyCode?: string
  orderId?: string
  basketItems?: BasketItem[]
}

export interface TransactionResources {
  customerId?: string
  typeId?: string
  metadataId?: string
  basketId?: string
}

export interface TransactionCardAuthentication {
  verificationId?: string
  resultIndicator?: string
  dsTransactionId?: string
  protocolVersion?: string
  authenticationStatus?: string
  messageType?: string
  xId?: string
}

export interface TransactionCard {
  recurrenceType?: string
  brandTransactionId?: string
  settlementDay?: string
  exemptionType?: string
  liability?: string
  authentication?: TransactionCardAuthentication
}

export interface TransactionRiskData {
  threatMetrixId?: string
  customerGroup?: string
  customerId?: string
  confirmedAmount?: number
  confirmedOrders?: number
  internalScore?: number
  registrationLevel?: number
  registrationDate?: number
}

export interface TransactionShipping {
  deliveryTrackingId?: string
  deliveryService?: string
  returnTrackingId?: string
}

export interface TransactionPaypal {
  checkoutType?: string
}

export interface TransactionPaylater {
  targetDueDate?: string
  merchantComment?: string
  merchantOrderId?: string
}

export interface TransactionOnlineTransfer {
  targetDueDate?: string
}

export interface TransactionAdditionalData {
  card?: TransactionCard
  riskData?: TransactionRiskData
  shipping?: TransactionShipping
  paypal?: TransactionPaypal
  paylater?: TransactionPaylater
  onlineTransfer?: TransactionOnlineTransfer
  termsAndConditionUrl?: string
  privacyPolicyUrl?: string
}

export interface Transaction {
  amount?: number
  currency?: string
  returnUrl?: string
  card3ds?: boolean
  paymentReference?: string
  orderId?: string
  invoiceId?: string
  effectiveInterestRate?: string
  resources?: TransactionResources
  linkpayId?: string
  additionalTransactionData?: TransactionAdditionalData
}

export interface TransactionAuthorize extends Transaction {
  // AuthorizeTransaction extends the base Transaction interface
}

export interface TransactionCharge extends Transaction {
  // TransactionCharge extends the base Transaction interface
}

export interface ErrorObject {
  id: string
  label: string
  errorDetails: Record<string, unknown>
}

export interface TransactionBasketResponse {
  data: Basket
  msg?: string
  errors?: ErrorObject[]
}

export interface TransactionAuthorizeResponse {
  data: TransactionAuthorize
  msg?: string
  errors?: ErrorObject[]
}

export interface TransactionChargeResponse {
  data: TransactionCharge
  msg?: string
  errors?: ErrorObject[]
}

export class OrderActions extends ThBaseHandler {
  public static baseEndpoint = '/api/v2/orders'
  endpoint: string
  http: Client
  public options: OrderActionsOptions
  public uriHelper: UriHelper

  constructor (options: OrderActionsOptions, http: Client) {
    super(http, {
      endpoint: OrderActions.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = OrderActions.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async orderRefund (orderId: string, payload: ChargeCancelRequest): Promise<ChargeCancelResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${orderId}/charge/cancel`)

    try {
      const response = await this.http.getClient().post(uri, payload)
      if (response.status !== 200) {
        throw new OrderRefundFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0] as ChargeCancelResult,
        msg: response.data.msg,
        status: response.status
      }
    } catch (error: any) {
      throw new OrderRefundFailed(error.message, { error })
    }
  }

  async orderCancel (orderId: string, payload: AuthorizeCancelRequest): Promise<AuthorizeCancelResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${orderId}/authorize/cancel`)

    try {
      const response = await this.http.getClient().post(uri, payload)
      if (response.status !== 200) {
        throw new OrderCancelFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0] as AuthorizeCancelResult,
        msg: response.data.msg,
        status: response.status
      }
    } catch (error: any) {
      throw new OrderCancelFailed(error.message, { error })
    }
  }

  async orderCapture (orderId: string, payload: AuthorizeChargeRequest): Promise<AuthorizeChargeResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${orderId}/authorize/charge`)
    try {
      const response = await this.http.getClient().post(uri, payload)
      if (response.status !== 200) {
        throw new OrderCaptureFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0] as AuthorizeChargeResult,
        msg: response.data.msg,
        status: response.status
      }
    } catch (error: any) {
      throw new OrderCaptureFailed(error.message, { error })
    }
  }

  async createBasket (keypairId: string, basket: Basket): Promise<TransactionBasketResponse> {
    const base = this.uriHelper.generateBaseUri()
    const uri = this.uriHelper.generateUriWithQuery(`${base}/baskets`)
    try {
      const response = await this.http.getClient().post(uri, { keypairId, payload: basket })

      return {
        data: response.data.results[0] as Basket
      }
    } catch (error: any) {
      throw new CreateBasketFailed(error.message, { error })
    }
  }

  async authorize (keypairId: string, transaction: TransactionAuthorize): Promise<TransactionAuthorizeResponse> {
    const base = this.uriHelper.generateBaseUri()
    const uri = this.uriHelper.generateUriWithQuery(`${base}/authorize`)
    try {
      const response = await this.http.getClient().post(uri, { keypairId, payload: transaction })

      return {
        data: response.data.results[0] as TransactionAuthorize
      }
    } catch (error: any) {
      throw new AuthorizeTransactionFailed(error.message, { error })
    }
  }

  async charge (keypairId: string, transaction: TransactionCharge): Promise<TransactionChargeResponse> {
    const base = this.uriHelper.generateBaseUri()
    const uri = this.uriHelper.generateUriWithQuery(`${base}/charge`)
    try {
      const response = await this.http.getClient().post(uri, { keypairId, payload: transaction })

      return {
        data: response.data.results[0] as TransactionCharge
      }
    } catch (error: any) {
      throw new ChargeTransactionFailed(error.message, { error })
    }
  }
}

export class OrderRefundFailed extends BaseError {
  public name = 'OrderRefundFailed'
  constructor (
    public message: string = 'Could not refund order',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, OrderRefundFailed.prototype)
  }
}

export class OrderCancelFailed extends BaseError {
  public name = 'OrderCancelFailed'
  constructor (
    public message: string = 'Could not cancel authorize for order',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, OrderCancelFailed.prototype)
  }
}

export class OrderCaptureFailed extends BaseError {
  public name = 'OrderCaptureFailed'
  constructor (
    public message: string = 'Could not authorize charge for order',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, OrderCaptureFailed.prototype)
  }
}

export class CreateBasketFailed extends BaseError {
  public name = 'CreateBasketFailed'
  constructor (
    public message: string = 'Could not create basket',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, CreateBasketFailed.prototype)
  }
}

export class AuthorizeTransactionFailed extends BaseError {
  public name = 'AuthorizeTransactionFailed'
  constructor (
    public message: string = 'Could not authorize transaction',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AuthorizeTransactionFailed.prototype)
  }
}

export class ChargeTransactionFailed extends BaseError {
  public name = 'ChargeTransactionFailed'
  constructor (
    public message: string = 'Could not charge transaction',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ChargeTransactionFailed.prototype)
  }
}
