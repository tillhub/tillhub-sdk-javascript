import qs from 'qs'
import { Client } from '../client'
import * as errors from '../errors'
import { ThBaseHandler } from '../base'

export interface DiscountsOptions {
  user?: string
  base?: string
}

export interface DiscountsQuery {
  limit?: number
  uri?: string
  query?: {
    deleted?: boolean
    active?: boolean
  }
}

export interface DiscountsResponse {
  data: Discount[]
  metadata: object
  next?: () => Promise<DiscountsResponse>
}

export interface DiscountResponse {
  data: Discount
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}

export type DiscountType = 'percentage' | 'value'
export type DiscountGroupType = 'cart' | 'customer'

export interface Discount {
  id?: string
}

export interface Constraints { }

export interface Discount {
  amount?: number
  type: DiscountType
  account?: string
  name?: string
  group: DiscountGroupType
  active?: boolean
  deleted?: boolean
  constraints?: Constraints | null
}

export class Discounts extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/discounts'
  endpoint: string
  http: Client
  public options: DiscountsOptions

  constructor(options: DiscountsOptions, http: Client) {
    super(http, { endpoint: Discounts.baseEndpoint, base: options.base || 'https://api.tillhub.com' })
    this.options = options
    this.http = http

    this.endpoint = Discounts.baseEndpoint
    this.options.base = this.options.base || 'https://api.tillhub.com'
  }

  getAll(queryOrOptions?: DiscountsQuery | undefined): Promise<DiscountsResponse> {
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

          uri = `${this.options.base}${this.endpoint}/${this.options.user}${
            queryString ? `?${queryString}` : ''
            }`
        }

        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) {
          return reject(new errors.DiscountsFetchFailed(undefined, { status: response.status }))
        }

        if (response.data.cursor && response.data.cursor.next) {
          next = (): Promise<DiscountsResponse> => this.getAll({ uri: response.data.cursor.next })
        }

        return resolve({
          data: response.data.results,
          metadata: { cursor: response.data.cursor },
          next
        } as DiscountsResponse)
      } catch (error) {
        return reject(new errors.DiscountsFetchFailed(undefined, { error }))
      }
    })
  }

  get(discountId: string): Promise<DiscountResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${discountId}`
      try {
        const response = await this.http.getClient().get(uri)
        response.status !== 200 &&
          reject(new errors.DiscountFetchFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results[0] as Discount,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        } as DiscountResponse)
      } catch (error) {
        return reject(new errors.DiscountFetchFailed(undefined, { error }))
      }
    })
  }

  put(discountId: string, discount: Discount): Promise<DiscountResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${discountId}`
      try {
        const response = await this.http.getClient().put(uri, discount)

        return resolve({
          data: response.data.results[0] as Discount,
          metadata: { count: response.data.count }
        } as DiscountResponse)
      } catch (error) {
        return reject(new errors.DiscountPutFailed(undefined, { error }))
      }
    })
  }

  create(discount: Discount): Promise<DiscountResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}`
      try {
        const response = await this.http.getClient().post(uri, discount)

        return resolve({
          data: response.data.results[0] as Discount,
          metadata: { count: response.data.count }
        } as DiscountResponse)
      } catch (error) {
        return reject(new errors.DiscountCreationFailed(undefined, { error }))
      }
    })
  }

  count(): Promise<DiscountsResponse> {
    return new Promise(async (resolve, reject) => {
      let uri = `${this.options.base}${this.endpoint}/${this.options.user}/meta`

      try {
        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) {
          return reject(new errors.DiscountsCountFailed(undefined, { status: response.status }))
        }

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as DiscountsResponse)
      } catch (error) {
        return reject(new errors.DiscountsCountFailed(undefined, { error }))
      }
    })
  }

  delete(discountId: string): Promise<DiscountResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${discountId}`
      try {
        const response = await this.http.getClient().delete(uri)
        response.status !== 200 && reject(new errors.DiscountDeleteFailed())

        return resolve({
          msg: response.data.msg
        } as DiscountResponse)
      } catch (err) {
        return reject(new errors.DiscountDeleteFailed())
      }
    })
  }
}
