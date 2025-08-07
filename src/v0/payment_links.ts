import { ThBaseHandler } from '../base'
import { Client } from '../client'
import { UriHelper } from '../uri-helper'
import * as errors from '../errors'

export interface PaymentLinksOptions {
  user?: string
  base?: string
}

export interface PaymentLinksQuery {
  limit?: number
  uri?: string
  query?: Record<string, unknown>
}

export interface PaymentLinksResponse {
  data?: Array<Record<string, unknown>>
  metadata?: Record<string, unknown>
  msg?: string
  next?: () => Promise<PaymentLinksResponse>
}

export interface PaymentLinkResponse {
  data?: Record<string, unknown>
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
      const base = this.uriHelper.generateBaseUri()
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

  async meta (): Promise<PaymentLinksResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri('/meta')
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
