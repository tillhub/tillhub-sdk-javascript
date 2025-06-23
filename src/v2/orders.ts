import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'
import { TransactionEntity } from '../v3/transactions'

declare type RecurringFormatType = 'scheduled' | 'unscheduled' | 'oneclick'
declare type PaymentType = 'unzer' | 'external'
declare type OrderType = 'refundable' | 'capturable' | 'cancelable'
declare type OrderStatus = 'completed'
declare type Currency = 'EUR'
declare type PaymentMethod = 'card'
declare type BasketItemStatus = 'collected'

export interface OrdersOptions {
  user?: string
  base?: string
}

export interface OrdersResponse {
  data: OrderEntity[]
  metadata: Record<string, unknown>
  next?: () => Promise<OrdersResponse>
}

export interface OrderResponse {
  data: OrderEntity
  metadata: Record<string, unknown>
  msg?: string
  errors?: ErrorObject[]
}

export interface OrdersMetaResponse {
  data: Record<string, unknown>
  metadata: Record<string, unknown>
  msg: string
}

export interface ErrorObject {
  id: string
  label: string
  errorDetails: Record<string, unknown>
}

export interface OrdersQuery {
  limit?: number
  uri?: string
  query?: {
    orderId?: string
    amount?: string
    currency?: Currency
    paymentMethod?: PaymentMethod
    brand?: string
    status?: string
    txnNumber?: string
    customerName?: string
    email?: string
    customerId?: string
    customerBirthdate?: Date
    receiptNumber?: string
    staffId?: string
    location?: string
    recurring?: RecurringFormatType
    paymentId?: string
    cardNumber?: number
    bankName?: string
    bic?: string
    insuranceName?: string
    insuranceId?: string
    cashierNumber?: number
    balanceNumber?: number
    basketId?: string
    basketItemId?: string
    basketItemStatus?: string
    basketItemName?: string
    basketItemType?: string
    transactionShortId?: string
    transactionId?: string
    terminalId?: string
    cutoverId?: string
    cutoverDate?: Date
    disputeId?: string
    disputeType?: string
    disputeStatus?: string
    invoiceId?: string
    q?: string
  }
}

export interface OrderEntity {
  status?: OrderStatus | null
  orderId?: string | null
  totalAmount?: number | null
  currency?: Currency | null
  salesChannel?: string | null
  origin?: string | null
  recurring?: RecurringFormatType | null
  type?: OrderType | null
  transactions?: TransactionEntity[] | null
  payments?: PaymentEntity[] | null
  customer?: CustomerEntity | null
  instores?: InStoreEntity[] | null
  basket?: BasketEntity | null
  disputes?: DisputeEntity[] | null
  createdAt?: Date | null
  updatedAt?: Date | null
}

export interface PaymentEntity {
  paymentId?: string
  paymentMethod?: PaymentMethod | null
  brand?: string | null
  description?: string | null
  card?: CardEntity | null
  insurance?: InsuranceEntity | null
  cashierNumber?: string | null
  balanceNumber?: number | null
  location?: string | null
  type?: PaymentType | null
  order?: OrderEntity | null
}

export interface CardEntity {
  cardNumber?: string | null
  expiryDate?: Date | null
  cardHolder?: string | null
  clearingDate?: Date | null
  descriptor?: string | null
  bankName?: string | null
  bic?: string | null
}

export interface InsuranceEntity {
  provider?: string | null
  insuranceId?: string
  finalizeDate?: Date | null
  effectiveInterestRate?: number | null
  numberInstallments?: number | null
}

export interface BasketEntity {
  basketId?: string
  totalGrossValue?: number | null
  currency?: string | null
  items?: BasketItemEntity[] | null
  order?: OrderEntity | null
}

export interface BasketItemEntity {
  itemId?: string
  status?: BasketItemStatus | null
  quantity?: number | null
  vatPercentage?: number | null
  name?: string | null
  type?: string | null
  descriptor?: string | null
  unit?: string | null
  imageUrl?: string | null
  amountPerUnit?: number | null
  unitNumber?: number | null
  totalAmount?: number | null
  discount?: number | null
  shippingAddress?: AddressEntity | null
  basket?: BasketEntity | null
}

export interface CustomerEntity {
  address: AddressEntity | null
  birthDate?: Date | null
  businessCompany?: BusinessCompanyEntity | null
  company?: string | null
  country?: string | null
  customerId?: string
  displayName?: string | null
  email?: string | null
  firstName?: string | null
  ip?: string | null
  ipCountry?: string | null
  language?: string | null
  lastName?: string | null
  mobile?: string | null
  optIn?: boolean | null
  optIn2?: boolean | null
  phone?: string | null
  salutation?: string | null // Mr/Mrs/Ms/Dr...
  shippingAddress: AddressEntity[] | null
  shippingNameFirstName?: string | null
  shippingNameLastName?: string | null
  shippingNameTitle?: string | null
  shippingNameCompany?: string | null
  shippingNameSalutation?: string | null
  shippingNameBirthDate?: Date | null
  timezone?: string | null
  title?: string | null
  transactions?: TransactionEntity[] | null
  type?: string | null
  userName?: string | null
}

export interface BusinessCompanyEntity {
  clientCustomerId: string | null
  commercialRegisterNumber?: string | null
  commercialSector?: string | null
  companyName?: string | null
  companyURL?: string | null
  districtCourt?: string | null
  duns?: string | null
  easyNumber?: string | null
  executive?: string | null
  locationCountry?: string | null
  locationHouseNumber?: string | null
  locationPoBox?: string | null
  locationStreet?: string | null
  locationZip?: string | null
  registrationType?: string | null
  taxNumber?: string | null
  vatId?: string | null
}

export interface AddressEntity {
  country?: string | null
  city?: string | null
  houseExtension?: string | null
  state?: string | null
  street?: string | null
  street2?: string | null
  zip?: string | null
}

export interface InStoreEntity {
  branchNumber?: number | null
  registerId?: string | null
  staffId?: string | null
  cutOverId?: string | null
  cutOverDate?: Date | null
  receiptNumber?: number | null
  balance?: number | null
  order?: OrderEntity | null
}

export interface AttachmentEntity {
  fileName?: string | null
  fileType?: string | null
  size?: string | null
  type?: string | null
  dispute?: DisputeEntity | null
}

export interface DisputeEntity {
  disputeId?: string
  reason?: string | null
  type?: string | null
  status?: string | null
  amount?: number | null
  currency?: string | null
  openedOn?: Date | null // todo: can be timestamp
  dueOn?: Date | null // todo: can be timestamp
  transactionId?: string | null
  messages?: MessageEntity[] | null
  events?: EventEntity[] | null
  attachments?: AttachmentEntity[] | null
  order?: OrderEntity | null
}

export interface MessageEntity {
  dispute?: DisputeEntity | null
  sender?: string | null
  message?: string | null
}

export interface EventEntity {
  dispute?: DisputeEntity | null
  eventType?: string | null
  description?: string | null
  amount?: number | null
}

export class Orders extends ThBaseHandler {
  public static baseEndpoint = '/api/v2/orders'
  endpoint: string
  http: Client
  public options: OrdersOptions
  public uriHelper: UriHelper

  constructor (options: OrdersOptions, http: Client) {
    super(http, {
      endpoint: Orders.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = Orders.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (query?: OrdersQuery | undefined): Promise<OrdersResponse> {
    let next
    const base = this.uriHelper.generateBaseUri()
    const uri = this.uriHelper.generateUriWithQuery(base, query)

    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new OrdersFetchFailed(undefined, { status: response.status })
      }

      if (response.data.cursors?.after) {
        next = (): Promise<OrdersResponse> => this.getAll({ uri: response.data.cursors.after })
      }

      return {
        data: response.data.results as OrderEntity[],
        metadata: { cursor: response.data.cursors },
        next
      }
    } catch (error: any) {
      throw new OrdersFetchFailed(error.message, { error })
    }
  }

  async meta (query?: OrdersQuery | undefined): Promise<OrdersMetaResponse> {
    const base = this.uriHelper.generateBaseUri()
    const uri = this.uriHelper.generateUriWithQuery(`${base}/meta`, query)

    try {
      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) throw new OrdersFetchMetaFailed()

      return {
        data: response.data.results[0],
        msg: response.data.msg,
        metadata: { count: response.data.results[0]?.count || 0 }
      }
    } catch (error: any) {
      throw new OrdersFetchMetaFailed(error.message, { error })
    }
  }

  async get (orderId: string): Promise<OrderResponse> {
    const base = this.uriHelper.generateBaseUri(`/${orderId}`)
    const uri = this.uriHelper.generateUriWithQuery(base)

    try {
      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) {
        throw new OrderFetchFailed(undefined, { status: response.status })
      }
      return {
        data: response.data.results[0] as OrderEntity,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new OrderFetchFailed(error.message, { error })
    }
  }
}

export class OrdersFetchFailed extends BaseError {
  public name = 'OrdersFetchFailed'
  constructor (
    public message: string = 'Could not fetch orders',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, OrdersFetchFailed.prototype)
  }
}

export class OrdersFetchMetaFailed extends BaseError {
  public name = 'OrdersFetchMetaFailed'
  constructor (
    public message: string = 'Could not fetch meta data for orders',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, OrdersFetchMetaFailed.prototype)
  }
}

export class OrderFetchFailed extends BaseError {
  public name = 'OrderFetchFailed'
  constructor (
    public message: string = 'Could not fetch order',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, OrderFetchFailed.prototype)
  }
}
