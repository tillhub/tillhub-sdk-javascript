import qs from 'qs'
import { Client } from '../client'
import * as errors from '../errors'
import { ThBaseHandler } from '../base'

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
  metadata: object
}

export interface PaymentOptionResponse {
  data: PaymentOption
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}
export interface PaymentOption {
  id?: string
}

export type PaymentOptionType = 'expense' | 'deposit' | 'bank'

export interface PaymentOption {
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

  constructor(options: PaymentOptionsOptions, http: Client) {
    super(http, { endpoint: PaymentOptions.baseEndpoint, base: options.base || 'https://api.tillhub.com' })
    this.options = options
    this.http = http

    this.endpoint = PaymentOptions.baseEndpoint
    this.options.base = this.options.base || 'https://api.tillhub.com'
  }

  getAll(queryOrOptions?: PaymentOptionsQuery | undefined): Promise<PaymentOptionsResponse> {
    return new Promise(async (resolve, reject) => {
      let next

      try {
        let uri
        if (queryOrOptions && queryOrOptions.uri) {
          uri = queryOrOptions.uri
        } else {
          let queryString = ''
          if (queryOrOptions && (queryOrOptions.query || queryOrOptions.limit)) {
            queryString = qs.stringify({ limit: queryOrOptions.limit, ...queryOrOptions.query })
          }

          uri = `${this.options.base}${this.endpoint}/${this.options.user}${queryString ? `?${queryString}` : ''}`
        }

        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) {
          return reject(new errors.PaymentOptionsFetchFailed(undefined, { status: response.status }))
        }

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count },
          next
        } as PaymentOptionsResponse)
      } catch (error) {
        return reject(new errors.PaymentOptionsFetchFailed(undefined, { error }))
      }
    })
  }

  get(paymentOptionId: string): Promise<PaymentOptionResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${paymentOptionId}`
      try {
        const response = await this.http.getClient().get(uri)
        response.status !== 200 &&
          reject(new errors.PaymentOptionFetchFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results[0] as PaymentOption,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        } as PaymentOptionResponse)
      } catch (error) {
        return reject(new errors.PaymentOptionFetchFailed(undefined, { error }))
      }
    })
  }

  put(paymentOptionId: string, paymentOption: PaymentOption): Promise<PaymentOptionResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${paymentOptionId}`
      try {
        const response = await this.http.getClient().put(uri, paymentOption)

        return resolve({
          data: response.data.results[0] as PaymentOption,
          metadata: { count: response.data.count }
        } as PaymentOptionResponse)
      } catch (error) {
        return reject(new errors.PaymentOptionPutFailed(undefined, { error }))
      }
    })
  }

  create(paymentOption: PaymentOption): Promise<PaymentOptionResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}`
      try {
        const response = await this.http.getClient().post(uri, paymentOption)

        return resolve({
          data: response.data.results[0] as PaymentOption,
          metadata: { count: response.data.count }
        } as PaymentOptionResponse)
      } catch (error) {
        return reject(new errors.PaymentOptionCreationFailed(undefined, { error }))
      }
    })
  }

  delete(paymentOptionId: string): Promise<PaymentOptionResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${paymentOptionId}`
      try {
        const response = await this.http.getClient().delete(uri)
        response.status !== 200 && reject(new errors.PaymentOptionDeleteFailed())

        return resolve({
          msg: response.data.msg
        } as PaymentOptionResponse)
      } catch (err) {
        return reject(new errors.PaymentOptionDeleteFailed())
      }
    })
  }
}
