import { Client } from '../client'
import * as errors from '../errors'
import { UriHelper } from '../uri-helper'
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
  metadata: Record<string, unknown>
  next?: () => Promise<DiscountsResponse>
}

export interface DiscountResponse {
  data?: Discount
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
  amount?: number
  type: DiscountType
  account?: string
  name?: string
  group: DiscountGroupType
  active?: boolean
  deleted?: boolean
  constraints?: Record<string, unknown> | null
}

export class Discounts extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/discounts'
  endpoint: string
  http: Client
  public options: DiscountsOptions
  public uriHelper: UriHelper

  constructor (options: DiscountsOptions, http: Client) {
    super(http, {
      endpoint: Discounts.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = Discounts.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (queryOrOptions?: DiscountsQuery | undefined): Promise<DiscountsResponse> {
    let next

    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, queryOrOptions)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new errors.DiscountsFetchFailed(undefined, { status: response.status })
      }

      if (response.data.cursor?.next) {
        next = (): Promise<DiscountsResponse> => this.getAll({ uri: response.data.cursor.next })
      }

      return {
        data: response.data.results,
        metadata: { cursor: response.data.cursor },
        next
      }
    } catch (error: any) {
      throw new errors.DiscountsFetchFailed(error.message, { error })
    }
  }

  async get (discountId: string): Promise<DiscountResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${discountId}`)
    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new errors.DiscountFetchFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0] as Discount,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.DiscountFetchFailed(error.message, { error })
    }
  }

  async put (discountId: string, discount: Discount): Promise<DiscountResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${discountId}`)
    try {
      const response = await this.http.getClient().put(uri, discount)

      return {
        data: response.data.results[0] as Discount,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.DiscountPutFailed(error.message, { error })
    }
  }

  async create (discount: Discount): Promise<DiscountResponse> {
    const uri = this.uriHelper.generateBaseUri()
    try {
      const response = await this.http.getClient().post(uri, discount)

      return {
        data: response.data.results[0] as Discount,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.DiscountCreationFailed(error.message, { error })
    }
  }

  async count (): Promise<DiscountsResponse> {
    const uri = this.uriHelper.generateBaseUri('/meta')

    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new errors.DiscountsCountFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.DiscountsCountFailed(error.message, { error })
    }
  }

  async delete (discountId: string): Promise<DiscountResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${discountId}`)
    try {
      const response = await this.http.getClient().delete(uri)
      if (response.status !== 200) throw new errors.DiscountDeleteFailed()

      return {
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new errors.DiscountDeleteFailed()
    }
  }
}
