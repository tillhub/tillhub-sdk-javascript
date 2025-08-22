
import { Client } from '../client'
import { BaseError } from '../errors/baseError'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface PaymentProductsOptions {
  user?: string
  base?: string
}

export interface PaymentProductsResponse {
  data: PaymentProduct[]
  metadata: Record<string, unknown>
  next?: () => Promise<PaymentProductsResponse>
}

export interface ErrorObject {
  id: string
  label: string
  errorDetails: Record<string, unknown>
}

export interface PaymentProduct {
  state?: string
  type?: string
  processingPlatformIdentifier?: string
  salesStream?: SaleStream[]
}

export interface SaleStream {
  id?: string
  active?: boolean
  name?: string
  type?: string
  businessUnit?: BusinessUnit
}

export interface BusinessUnit {
  unzerId?: string
}

export interface PaymentProductsQueryHandler {
  limit?: number
  uri?: string
  query?: PaymentProductsQuery
  orderFields?: string[] | string
}

export interface PaymentProductsQuery extends PaymentProduct {
  active?: boolean
  type?: string
}

export class PaymentProducts extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/payment-products'
  endpoint: string
  http: Client
  public options: PaymentProductsOptions
  public uriHelper: UriHelper

  constructor (options: PaymentProductsOptions, http: Client) {
    super(http, { endpoint: PaymentProducts.baseEndpoint, base: options.base ?? 'https://api.tillhub.com' })
    this.options = options
    this.http = http

    this.endpoint = PaymentProducts.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (query?: PaymentProductsQueryHandler | undefined): Promise<PaymentProductsResponse> {
    let next
    const base = this.uriHelper.generateBaseUri()
    const uri = this.uriHelper.generateUriWithQuery(base, query)

    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new PaymentProductsFetchFailed(undefined, { status: response.status })
      }

      if (response.data.cursors?.after) {
        next = (): Promise<PaymentProductsResponse> => this.getAll({ uri: response.data.cursors.after })
      }

      return {
        data: response.data.results as PaymentProduct[],
        metadata: { cursor: response.data.cursors },
        next
      }
    } catch (error: any) {
      throw new PaymentProductsFetchFailed(error.message, { error })
    }
  }
}

export class PaymentProductsFetchFailed extends BaseError {
  public name = 'PaymentProductsFetchFailed'
  constructor (
    public message: string = 'Could not fetch payment products',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, PaymentProductsFetchFailed.prototype)
  }
}
