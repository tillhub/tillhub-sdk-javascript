import { ThBaseHandler } from '../base'
import { Client } from '../client'
import { UriHelper } from '../uri-helper'
import * as errors from '../errors'

export interface PaymentLinksOptions {
  user?: string
  base?: string
}

export interface PaymentLinkAddress {
  salutation?: string
  firstName: string
  lastName: string
  country: string
  address: string
  postalCode: string
  city: string
}

export interface PaymentLinkCustomer {
  salutation?: string
  firstName: string
  lastName: string
  dateOfBirth?: string
  email: string
  mobileNo?: string
  phoneNo?: string
  language?: string
  billing?: PaymentLinkAddress
  shipping?: PaymentLinkAddress
  sameAsShipping?: boolean
}

export interface PaymentLinkItem {
  name: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

export interface CreatePaymentLinkRequest {
  usage?: string
  paymentLinkType?: 'items_sale' | 'quick_charge'
  linkedOrderId?: string
  branch: string
  branchId: string
  status?: 'READY_TO_ORDER' | 'ORDER_SUCCESSFULL'
  createdBy: string
  total: number
  currency: string
  subtotal?: number
  deliveryMethod?: string
  deliveryCost?: number
  customer: PaymentLinkCustomer
  items?: PaymentLinkItem[]
}

export interface CreatePaymentLinkResponse {
  id: string
  usage?: string
  paymentLinkType: 'items_sale' | 'quick_charge'
  linkedOrderId?: string
  branch: string
  branchId: string
  status: 'READY_TO_ORDER' | 'ORDER_SUCCESSFULL'
  createdBy: string
  total: number
  currency: string
  subtotal?: number
  deliveryMethod?: string
  deliveryCost?: number
  customer: PaymentLinkCustomer & { id: string }
  items?: Array<PaymentLinkItem & { id: string }>
  createdAt: string
  updatedAt: string
}

export interface PaymentLinksQuery {
  limit?: number
  uri?: string
  query?: Record<string, unknown>
  tenantId?: string
}

export interface PaymentLinksResponse {
  data?: Array<Record<string, unknown>>
  metadata?: Record<string, unknown>
  msg?: string
  next?: () => Promise<PaymentLinksResponse>
}

export interface PaymentLinkResponse {
  data?: CreatePaymentLinkResponse
  metadata?: Record<string, unknown>
  msg?: string
}

export class PaymentLinks extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/payment-links'
  endpoint: string
  http: Client
  public options: PaymentLinksOptions
  public uriHelper: UriHelper

  constructor (options: PaymentLinksOptions, http: Client) {
    super(http, {
      endpoint: PaymentLinks.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = PaymentLinks.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (query?: PaymentLinksQuery | undefined): Promise<PaymentLinksResponse> {
    let next

    try {
      // If tenantId is provided in query, use it in the path
      const tenantPath = query?.tenantId ? `/${query.tenantId}` : ''
      const base = this.uriHelper.generateBaseUri(tenantPath)
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new errors.PaymentLinksFetchFailed(undefined, { status: response.status })
      }

      if (response.data.cursor?.next) {
        next = (): Promise<PaymentLinksResponse> => this.getAll({ uri: response.data.cursor.next })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count, cursor: response.data.cursor },
        next
      }
    } catch (error: any) {
      throw new errors.PaymentLinksFetchFailed(error.message, { error })
    }
  }

  async create (paymentLinkData: CreatePaymentLinkRequest): Promise<PaymentLinkResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri()
      const response = await this.http.getClient().post(uri, paymentLinkData)

      if (response.status !== 200 && response.status !== 201) {
        throw new errors.PaymentLinksCreateFailed(undefined, { status: response.status })
      }

      return {
        data: response.data,
        metadata: {}
      }
    } catch (error: any) {
      throw new errors.PaymentLinksCreateFailed(error.message, { error })
    }
  }

  async meta (tenantId?: string): Promise<PaymentLinksResponse> {
    try {
      const tenantPath = tenantId ? `/${tenantId}` : ''
      const uri = this.uriHelper.generateBaseUri(`${tenantPath}/meta`)
      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) throw new errors.PaymentLinksMetaFailed(undefined, { status: response.status })

      if (!response.data.results) throw new errors.PaymentLinksMetaFailed('Could not get payment links metadata unexpectedly')

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.PaymentLinksMetaFailed(error.message, { error })
    }
  }
}
