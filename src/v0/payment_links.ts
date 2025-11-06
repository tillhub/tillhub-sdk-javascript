import { ThBaseHandler } from '../base'
import { Client } from '../client'
import { UriHelper } from '../uri-helper'
import * as errors from '../errors'
import {
  PaymentLinksCreateFailed,
  PaymentLinksFetchFailed,
  PaymentLinksMetaFailed,
  PaymentLinksSendEmailFailed,
  PaymentLinksGetUrlFailed,
  PaymentLinksGetQrCodeFailed,
  PaymentLinksGetByIdFailed
} from '../errors'

declare type PaymentLinkType = 'items_sale' | 'quick_charge'
declare type PaymentLinkStatus = 'open' | 'expired' | 'closed'
declare type BasketItemType = 'goods' | 'shipment' | 'voucher' | 'digital'

export interface PaymentLinkDto {
  id?: string | null
  usage?: string | null
  paymentLinkType: PaymentLinkType
  linkedOrderId?: string | null
  branch?: string | null
  branchId?: string | null
  businessUnitUnzerId: string
  externalInvoiceId?: string
  externalOrderId?: string
  externalCustomerId?: string
  status?: PaymentLinkStatus | null
  createdBy: string | null
  total?: number | null
  currency?: string | null
  customer?: PaymentLinkCustomer | null
  items?: PaymentLinkItem[] | null
  paymentPageUrl?: string | null
  createdAt: string | {
    start: Date
    end: Date
  } | null
  updatedAt?: string | null
}

export interface PaymentLinksOptions {
  user?: string
  base?: string
}

export interface PaymentLinkAddress {
  salutation?: string | null
  firstName?: string | null
  lastName?: string | null
  country?: string | null
  address?: string | null
  postalCode?: string |null
  city?: string | null
}

export interface PaymentLinkCustomer {
  salutation?: string | null
  firstName?: string | null
  lastName?: string | null
  dateOfBirth?: string | null
  email?: string | null
  mobileNo?: string | null
  phoneNo?: string | null
  language?: string | null
  billing?: PaymentLinkAddress | null
  shipping?: PaymentLinkAddress | null
  sameAsShipping?: boolean | false
}

export interface PaymentLinkItem {
  type: BasketItemType
  name?: string | null
  quantity?: number | null
  unitPrice?: string | null
  vat?: string | null
}

export interface CreatePaymentLinkRequest {
  paymentLinkDescription?: string
  paymentLinkType?: PaymentLinkType
  linkedOrderId?: string
  branch: string
  branchId: string
  createdBy: string
  totalAmount?: string
  currency: string
  invoiceId?: string
  externalOrderId?: string
  externalCustomerId?: string
  customer?: PaymentLinkCustomer | null
  items?: PaymentLinkItem[] | null
}

export interface PaymentLinkQuery {
  branch?: string | null
  customerEmail?: string | null
  createdBy?: string | null
  createdAt?: string | {
    start: Date
    end: Date
  } | null
  status?: string | null
  amount?: number | null
}

export interface SendSmsRequest {
  to: string
  paymentLinkId: string
}

export interface NotificationResponse {
  success: boolean
}

export interface PaymentLinkQueryHandler {
  limit?: number
  uri?: string
  query?: PaymentLinkQuery
  orderFields?: string[] | string
}

export interface PaymentLinksResponse {
  data?: PaymentLinkDto[]
  metadata?: Record<string, unknown>
  msg?: string
  next?: () => Promise<PaymentLinksResponse>
}

export interface PaymentPageResponse {
  paymentPageUrl: string
  id: string
  customerEmail?: string
  customerMobileNo?: string
}

export interface SendPaymentLinkEmailDto {
  paymentLinkId: string
  customerEmail: string
}

export interface CreatePaymentLinkResponse {
  data?: PaymentPageResponse
  msg?: string
}

export interface PaymentPageUrlResponse {
  paymentPageUrl: string
}

export interface PaymentLinkQrCodeResponse {
  qrCodeSvg: string
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

  async getAll (query?: PaymentLinkQueryHandler | undefined): Promise<PaymentLinksResponse> {
    let next
    const base = this.uriHelper.generateBaseUri()
    const uri = this.uriHelper.generateUriWithQuery(base, query)

    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new PaymentLinksFetchFailed(undefined, { status: response.status })
      }

      if (response.data.cursors?.after) {
        next = (): Promise<PaymentLinksResponse> => this.getAll({ uri: response.data.cursors.after })
      }

      return {
        data: response.data.results as PaymentLinkDto[],
        metadata: { cursor: response.data.cursors },
        next
      }
    } catch (error: any) {
      throw new errors.PaymentLinksFetchFailed(error.message, { error })
    }
  }

  async create (paymentLinkData: CreatePaymentLinkRequest): Promise<CreatePaymentLinkResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri()
      const response = await this.http.getClient().post(uri, paymentLinkData, { timeout: 30000 })

      if (response.status !== 200 && response.status !== 201) {
        throw new PaymentLinksCreateFailed(undefined, { status: response.status })
      }

      return {
        data: response.data
      }
    } catch (error: any) {
      throw new PaymentLinksCreateFailed(error.message, { error })
    }
  }

  async meta (query?: PaymentLinkQueryHandler | undefined): Promise<PaymentLinksResponse> {
    const base = this.uriHelper.generateBaseUri()
    const uri = this.uriHelper.generateUriWithQuery(`${base}/meta`, query)

    try {
      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) throw new PaymentLinksMetaFailed(undefined, { status: response.status })

      return {
        data: response.data.results[0],
        metadata: { count: response.data.results[0]?.count || 0 }
      }
    } catch (error: any) {
      throw new PaymentLinksMetaFailed(error.message, { error })
    }
  }

  async sendSms (sendSmsRequest: SendSmsRequest): Promise<NotificationResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri() + '/send-sms'
      const response = await this.http.getClient().post(uri, sendSmsRequest)

      if (response.status !== 200 && response.status !== 201) {
        throw new errors.SendSmsFailedFailed(undefined, { status: response.status })
      }

      return response.data.results[0]
    } catch (error: any) {
      throw new errors.SendSmsFailedFailed(error.message, { error })
    }
  }

  async sendEmail (sendPaymentLinkEmailDto: SendPaymentLinkEmailDto): Promise<NotificationResponse> {
    try {
      const base = this.uriHelper.generateBaseUri()
      const response = await this.http.getClient().post(`${base}/send-email`, sendPaymentLinkEmailDto)

      if (response.status !== 200) {
        throw new PaymentLinksSendEmailFailed(undefined, { status: response.status })
      }

      return response.data.results[0]
    } catch (error: any) {
      throw new PaymentLinksSendEmailFailed(error.message, { error })
    }
  }

  async getPaymentPageUrl (paymentLinkId: string): Promise<PaymentPageUrlResponse> {
    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = `${base}/${paymentLinkId}/payment-url`
      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) {
        throw new PaymentLinksGetUrlFailed(undefined, { status: response.status })
      }

      return {
        paymentPageUrl: response.data.results[0]?.paymentPageUrl
      }
    } catch (error: any) {
      throw new PaymentLinksGetUrlFailed(error.message, { error })
    }
  }

  async getQrCodeSvg (paymentLinkId: string): Promise<PaymentLinkQrCodeResponse> {
    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = `${base}/${paymentLinkId}/qr-code`
      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) {
        throw new PaymentLinksGetQrCodeFailed(undefined, { status: response.status })
      }

      return {
        qrCodeSvg: response.data.results[0]?.qrCodeSvg
      }
    } catch (error: any) {
      throw new PaymentLinksGetQrCodeFailed(error.message, { error })
    }
  }

  async getById (id: string): Promise<PaymentLinkDto> {
    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = `${base}/${id}`
      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) {
        throw new PaymentLinksGetByIdFailed(undefined, { status: response.status })
      }

      return response.data as PaymentLinkDto
    } catch (error: any) {
      throw new PaymentLinksGetByIdFailed(error.message, { error })
    }
  }
}
