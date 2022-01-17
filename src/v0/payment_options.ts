import { Client } from '../client'
import * as errors from '../errors'
import { ThBaseHandler } from '../base'
import { UriHelper } from '../uri-helper'

export interface PaymentOptionsOptions {
  user?: string
  base?: string
}

export interface PaymentOptionsQuery {
  limit?: number
  uri?: string
  query?: {
    deleted?: boolean
    active?: boolean
  }
}

export interface PaymentOptionsResponse {
  data: PaymentOption[]
  metadata: Record<string, unknown>
}

export interface PaymentOptionResponse {
  data?: PaymentOption
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}

export type PaymentOptionType = 'expense' | 'deposit' | 'bank'

export interface PaymentOption {
  id?: string
  active?: boolean
  type: PaymentOptionType
  name: string
  cost_center?: string
  currency: string
  accounts: string[]
  discrepancy_account: string
  order_index: number
  summable: boolean
}

export class PaymentOptions extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/payment_options'
  endpoint: string
  http: Client
  public options: PaymentOptionsOptions
  public uriHelper: UriHelper

  constructor (options: PaymentOptionsOptions, http: Client) {
    super(http, {
      endpoint: PaymentOptions.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = PaymentOptions.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (queryOrOptions?: PaymentOptionsQuery | undefined): Promise<PaymentOptionsResponse> {
    try {
      // let uri
      // if (queryOrOptions?.uri) {
      //   uri = queryOrOptions.uri
      // } else {
      //   let queryString = ''
      //   if (queryOrOptions && (queryOrOptions.query || queryOrOptions.limit)) {
      //     queryString = qs.stringify({ limit: queryOrOptions.limit, ...queryOrOptions.query })
      //   }

      //   uri = `${this.options.base}${this.endpoint}/${this.options.user}${
      //       queryString ? `?${queryString}` : ''
      //     }`
      // }
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, queryOrOptions)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new errors.PaymentOptionsFetchFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.PaymentOptionsFetchFailed(error.message, { error })
    }
  }

  async get (paymentOptionId: string): Promise<PaymentOptionResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${paymentOptionId}`)

    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) { throw new errors.PaymentOptionFetchFailed(undefined, { status: response.status }) }

      return {
        data: response.data.results[0] as PaymentOption,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.PaymentOptionFetchFailed(error.message, { error })
    }
  }

  async put (paymentOptionId: string, paymentOption: PaymentOption): Promise<PaymentOptionResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${paymentOptionId}`)
    try {
      const response = await this.http.getClient().put(uri, paymentOption)
      if (response.status !== 200) throw new errors.PaymentOptionPutFailed(undefined, { status: response.status })

      return {
        data: response.data.results[0] as PaymentOption,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.PaymentOptionPutFailed(error.message, { error })
    }
  }

  async create (paymentOption: PaymentOption): Promise<PaymentOptionResponse> {
    const uri = this.uriHelper.generateBaseUri()
    try {
      const response = await this.http.getClient().post(uri, paymentOption)
      if (response.status !== 200) throw new errors.PaymentOptionCreationFailed(undefined, { status: response.status })

      return {
        data: response.data.results[0] as PaymentOption,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.PaymentOptionCreationFailed(error.message, { error })
    }
  }

  async delete (paymentOptionId: string): Promise<PaymentOptionResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${paymentOptionId}`)
    try {
      const response = await this.http.getClient().delete(uri)
      if (response.status !== 200) throw new errors.PaymentOptionDeleteFailed()

      return {
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new errors.PaymentOptionDeleteFailed()
    }
  }
}
