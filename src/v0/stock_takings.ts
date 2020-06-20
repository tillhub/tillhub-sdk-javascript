import { Client } from '../client'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'
import { BaseError } from '../errors'

export interface StockTakingsOptions {
  user?: string
  base?: string
}

export interface StockTakingsQueryOptions {
  limit?: number
  uri?: string
  query?: {
    deleted?: boolean
    start?: string
    q?: string
    cursor_field?: string
  }
  format?: string
}

export interface StockTakingsResponse {
  data: StockTaking[]
  metadata: Record<string, unknown>
}

export interface StockTakingResponse {
  data: StockTaking
  metadata: Record<string, unknown>
  msg?: string
}

export interface StockTaking {
  name?: string
  description?: string
  processes?: string[]
  deleted?: boolean
}

export class StockTakings extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/stock_takings'
  endpoint: string
  http: Client
  public options: StockTakingsOptions
  public uriHelper: UriHelper

  constructor(options: StockTakingsOptions, http: Client) {
    super(http, {
      endpoint: StockTakings.baseEndpoint,
      base: options.base || 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = StockTakings.baseEndpoint
    this.options.base = this.options.base || 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  create(stockTaking: StockTaking): Promise<StockTakingResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uri = this.uriHelper.generateBaseUri()

        const response = await this.http.getClient().post(uri, stockTaking)
        response.status !== 200 &&
          reject(new StockTakingsCreationFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results[0],
          metadata: { count: response.data.count }
        } as StockTakingResponse)
      } catch (error) {
        return reject(new StockTakingsCreationFailed(undefined, { error }))
      }
    })
  }

  getAll(query?: StockTakingsQueryOptions): Promise<StockTakingsResponse> {
    return new Promise(async (resolve, reject) => {
      let next

      try {
        const baseUri = this.uriHelper.generateBaseUri()
        const uri = this.uriHelper.generateUriWithQuery(baseUri, query)

        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) {
          return reject(new StockTakingsFetchFailed(undefined, { status: response.status }))
        }

        if (response.data.cursor && response.data.cursor.next) {
          next = (): Promise<StockTakingsResponse> =>
            this.getAll({ uri: response.data.cursor.next })
        }

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count },
          next
        } as StockTakingsResponse)
      } catch (error) {
        return reject(new StockTakingsFetchFailed(undefined, { error }))
      }
    })
  }

  get(stockTakingId: string, query?: StockTakingsQueryOptions): Promise<StockTakingResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const baseUri = this.uriHelper.generateBaseUri(`/${stockTakingId}`)
        const uri = this.uriHelper.generateUriWithQuery(baseUri, query)

        const response = await this.http.getClient().get(uri)
        response.status !== 200 &&
          reject(new StockTakingsFetchOneFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results[0],
          metadata: { count: 1 }
        } as StockTakingResponse)
      } catch (error) {
        return reject(new StockTakingsFetchOneFailed(undefined, { error }))
      }
    })
  }

  update(stockTakingId: string, stockTaking: StockTaking): Promise<StockTakingResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uri = this.uriHelper.generateBaseUri(`/${stockTakingId}`)

        const response = await this.http.getClient().patch(uri, stockTaking)
        response.status !== 200 &&
          reject(new StockTakingsUpdateFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results[0] as StockTaking,
          metadata: { count: response.data.count }
        } as StockTakingResponse)
      } catch (error) {
        return reject(new StockTakingsUpdateFailed(undefined, { error }))
      }
    })
  }

  delete(stockTakingId: string): Promise<StockTakingResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uri = this.uriHelper.generateBaseUri(`/${stockTakingId}`)

        const response = await this.http.getClient().delete(uri)
        response.status !== 200 &&
          reject(new StockTakingsDeleteFailed(undefined, { status: response.status }))

        return resolve({
          msg: response.data.msg
        } as StockTakingResponse)
      } catch (error) {
        return reject(new StockTakingsDeleteFailed(undefined, { error }))
      }
    })
  }

  meta(query?: StockTakingsQueryOptions): Promise<StockTakingsResponse> {
    return new Promise(async (resolve, reject) => {
      const base = this.uriHelper.generateBaseUri('/meta')
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      try {
        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) {
          return reject(new StockTakingsMetaFailed(undefined, { status: response.status }))
        }
        if (!response.data.results[0]) {
          return reject(new StockTakingsMetaFailed(undefined, { status: response.status }))
        }

        return resolve({
          data: response.data.results[0],
          metadata: { count: response.data.count }
        } as StockTakingsResponse)
      } catch (err) {
        return reject(new StockTakingsMetaFailed(undefined, { error: err }))
      }
    })
  }
}

export class StockTakingsFetchFailed extends BaseError {
  public name = 'StockTakingsFetchFailed'
  constructor(public message: string = 'Could not fetch stock takings', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, StockTakingsFetchFailed.prototype)
  }
}

export class StockTakingsFetchOneFailed extends BaseError {
  public name = 'StockTakingsFetchOneFailed'
  constructor(public message: string = 'Could not fetch one stock taking', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, StockTakingsFetchOneFailed.prototype)
  }
}

export class StockTakingsUpdateFailed extends BaseError {
  public name = 'StockTakingsUpdateFailed'
  constructor(public message: string = 'Could not update stock taking', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, StockTakingsUpdateFailed.prototype)
  }
}

export class StockTakingsCreationFailed extends BaseError {
  public name = 'StockTakingsCreationFailed'
  constructor(public message: string = 'Could not create stock taking', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, StockTakingsCreationFailed.prototype)
  }
}

export class StockTakingsDeleteFailed extends BaseError {
  public name = 'StockTakingsDeleteFailed'
  constructor(public message: string = 'Could not delete stock taking', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, StockTakingsDeleteFailed.prototype)
  }
}

export class StockTakingsMetaFailed extends BaseError {
  public name = 'StockTakingsMetaFailed'
  constructor(public message: string = 'Could not get meta of stock takings', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, StockTakingsMetaFailed.prototype)
  }
}
