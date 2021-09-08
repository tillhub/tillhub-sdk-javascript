import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface PromotionsOptions {
  user?: string
  base?: string
}

export interface PromotionsQuery {
  limit?: number
  uri?: string
  query?: {
    deleted?: boolean
    active?: boolean
  }
}

export interface PromotionsResponse {
  data: Promotion[]
  metadata: Record<string, unknown>
  next?: () => Promise<PromotionsResponse>
}

export interface PromotionResponse {
  data?: Promotion
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}

export interface Promotion {
  id?: string
  [key: string]: any
}

export class Promotions extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/promotions'
  endpoint: string
  http: Client
  public options: PromotionsOptions
  public uriHelper: UriHelper

  constructor (options: PromotionsOptions, http: Client) {
    super(http, {
      endpoint: Promotions.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = Promotions.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (queryOrOptions?: PromotionsQuery | undefined): Promise<PromotionsResponse> {
    let next

    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, queryOrOptions)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new PromotionsFetchFailed(undefined, { status: response.status })
      }

      if (response.data.cursor?.next) {
        next = (): Promise<PromotionsResponse> => this.getAll({ uri: response.data.cursor.next })
      }

      return {
        data: response.data.results,
        metadata: { cursor: response.data.cursor },
        next
      }
    } catch (error: any) {
      throw new PromotionsFetchFailed(undefined, { error })
    }
  }

  async get (promotionId: string): Promise<PromotionResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${promotionId}`)

    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) { throw new PromotionFetchFailed(undefined, { status: response.status }) }

      return {
        data: response.data.results[0] as Promotion,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new PromotionFetchFailed(undefined, { error })
    }
  }

  async put (promotionId: string, promotion: Promotion): Promise<PromotionResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${promotionId}`)
    try {
      const response = await this.http.getClient().put(uri, promotion)

      return {
        data: response.data.results[0] as Promotion,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new PromotionPutFailed(undefined, { error })
    }
  }

  async create (promotion: Promotion): Promise<PromotionResponse> {
    const uri = this.uriHelper.generateBaseUri()
    try {
      const response = await this.http.getClient().post(uri, promotion)

      return {
        data: response.data.results[0] as Promotion,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new PromotionCreationFailed(undefined, { error })
    }
  }

  async delete (promotionId: string): Promise<PromotionResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${promotionId}`)
    try {
      const response = await this.http.getClient().delete(uri)
      if (response.status !== 200) throw new PromotionDeleteFailed()

      return {
        msg: response.data.msg
      }
    } catch (err) {
      throw new PromotionDeleteFailed()
    }
  }
}

export class PromotionsFetchFailed extends BaseError {
  public name = 'PromotionsFetchFailed'
  constructor (
    public message: string = 'Could not fetch promotions',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, PromotionsFetchFailed.prototype)
  }
}

export class PromotionFetchFailed extends BaseError {
  public name = 'PromotionFetchFailed'
  constructor (
    public message: string = 'Could not fetch promotion',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, PromotionFetchFailed.prototype)
  }
}

export class PromotionPutFailed extends BaseError {
  public name = 'PromotionPutFailed'
  constructor (
    public message: string = 'Could not alter promotion',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, PromotionPutFailed.prototype)
  }
}

export class PromotionCreationFailed extends BaseError {
  public name = 'PromotionCreationFailed'
  constructor (
    public message: string = 'Could not create promotion',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, PromotionCreationFailed.prototype)
  }
}

export class PromotionDeleteFailed extends BaseError {
  public name = 'PromotionDeleteFailed'
  constructor (
    public message: string = 'Could not delete promotion',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, PromotionDeleteFailed.prototype)
  }
}
