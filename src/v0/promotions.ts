import qs from 'qs'
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
  data: Record<string, unknown>[]
  metadata: Record<string, unknown>
  next?: () => Promise<PromotionsResponse>
}

export interface PromotionResponse {
  data: Promotion
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}

export interface Promotion {
  id?: string
}

export interface Promotion {}

export class Promotions extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/promotions'
  endpoint: string
  http: Client
  public options: PromotionsOptions
  public uriHelper: UriHelper

  constructor(options: PromotionsOptions, http: Client) {
    super(http, {
      endpoint: Promotions.baseEndpoint,
      base: options.base || 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = Promotions.baseEndpoint
    this.options.base = this.options.base || 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  getAll(queryOrOptions?: PromotionsQuery | undefined): Promise<PromotionsResponse> {
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
          return reject(new PromotionsFetchFailed(undefined, { status: response.status }))
        }

        if (response.data.cursor && response.data.cursor.next) {
          next = (): Promise<PromotionsResponse> => this.getAll({ uri: response.data.cursor.next })
        }

        return resolve({
          data: response.data.results,
          metadata: { cursor: response.data.cursor },
          next
        } as PromotionsResponse)
      } catch (error) {
        return reject(new PromotionsFetchFailed(undefined, { error }))
      }
    })
  }

  get(promotionId: string): Promise<PromotionResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${promotionId}`
      try {
        const response = await this.http.getClient().get(uri)
        response.status !== 200 &&
          reject(new PromotionFetchFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results[0] as Promotion,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        } as PromotionResponse)
      } catch (error) {
        return reject(new PromotionFetchFailed(undefined, { error }))
      }
    })
  }

  put(promotionId: string, promotion: Promotion): Promise<PromotionResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${promotionId}`
      try {
        const response = await this.http.getClient().put(uri, promotion)

        return resolve({
          data: response.data.results[0] as Promotion,
          metadata: { count: response.data.count }
        } as PromotionResponse)
      } catch (error) {
        return reject(new PromotionPutFailed(undefined, { error }))
      }
    })
  }

  create(promotion: Promotion): Promise<PromotionResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}`
      try {
        const response = await this.http.getClient().post(uri, promotion)

        return resolve({
          data: response.data.results[0] as Promotion,
          metadata: { count: response.data.count }
        } as PromotionResponse)
      } catch (error) {
        return reject(new PromotionCreationFailed(undefined, { error }))
      }
    })
  }

  delete(promotionId: string): Promise<PromotionResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${promotionId}`
      try {
        const response = await this.http.getClient().delete(uri)
        response.status !== 200 && reject(new PromotionDeleteFailed())

        return resolve({
          msg: response.data.msg
        } as PromotionResponse)
      } catch (err) {
        return reject(new PromotionDeleteFailed())
      }
    })
  }
}

export class PromotionsFetchFailed extends BaseError {
  public name = 'PromotionsFetchFailed'
  constructor(public message: string = 'Could not fetch promotions', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, PromotionsFetchFailed.prototype)
  }
}

export class PromotionFetchFailed extends BaseError {
  public name = 'PromotionFetchFailed'
  constructor(public message: string = 'Could not fetch promotion', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, PromotionFetchFailed.prototype)
  }
}

export class PromotionPutFailed extends BaseError {
  public name = 'PromotionPutFailed'
  constructor(public message: string = 'Could not alter promotion', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, PromotionPutFailed.prototype)
  }
}

export class PromotionCreationFailed extends BaseError {
  public name = 'PromotionCreationFailed'
  constructor(public message: string = 'Could not create promotion', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, PromotionCreationFailed.prototype)
  }
}

export class PromotionDeleteFailed extends BaseError {
  public name = 'PromotionDeleteFailed'
  constructor(public message: string = 'Could not delete promotion', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, PromotionDeleteFailed.prototype)
  }
}
