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
  next?: () => Promise<StockTakingsResponse>
}

export interface StockTakingResponse {
  data?: StockTaking
  metadata?: Record<string, unknown>
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

  constructor (options: StockTakingsOptions, http: Client) {
    super(http, {
      endpoint: StockTakings.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = StockTakings.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async create (stockTaking: StockTaking): Promise<StockTakingResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri()

      const response = await this.http.getClient().post(uri, stockTaking)
      if (response.status !== 200) {
        throw new StockTakingsCreationFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new StockTakingsCreationFailed(undefined, { error })
    }
  }

  async getAll (query?: StockTakingsQueryOptions): Promise<StockTakingsResponse> {
    let next

    try {
      const baseUri = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(baseUri, query)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new StockTakingsFetchFailed(undefined, { status: response.status })
      }

      if (response.data.cursor?.next) {
        next = (): Promise<StockTakingsResponse> =>
          this.getAll({ uri: response.data.cursor.next })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count },
        next
      }
    } catch (error: any) {
      throw new StockTakingsFetchFailed(undefined, { error })
    }
  }

  async get (stockTakingId: string, query?: StockTakingsQueryOptions): Promise<StockTakingResponse> {
    try {
      const baseUri = this.uriHelper.generateBaseUri(`/${stockTakingId}`)
      const uri = this.uriHelper.generateUriWithQuery(baseUri, query)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new StockTakingsFetchOneFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0],
        metadata: { count: 1 }
      }
    } catch (error: any) {
      throw new StockTakingsFetchOneFailed(undefined, { error })
    }
  }

  async update (stockTakingId: string, stockTaking: StockTaking): Promise<StockTakingResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri(`/${stockTakingId}`)

      const response = await this.http.getClient().patch(uri, stockTaking)
      if (response.status !== 200) {
        throw new StockTakingsUpdateFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0] as StockTaking,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new StockTakingsUpdateFailed(undefined, { error })
    }
  }

  async delete (stockTakingId: string): Promise<StockTakingResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri(`/${stockTakingId}`)

      const response = await this.http.getClient().delete(uri)
      if (response.status !== 200) {
        throw new StockTakingsDeleteFailed(undefined, { status: response.status })
      }

      return {
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new StockTakingsDeleteFailed(undefined, { error })
    }
  }

  async meta (query?: StockTakingsQueryOptions): Promise<StockTakingsResponse> {
    const base = this.uriHelper.generateBaseUri('/meta')
    const uri = this.uriHelper.generateUriWithQuery(base, query)

    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new StockTakingsMetaFailed(undefined, { status: response.status })
      }
      if (!response.data.results[0]) {
        throw new StockTakingsMetaFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (err: any) {
      throw new StockTakingsMetaFailed(undefined, { error: err })
    }
  }
}

export class StockTakingsFetchFailed extends BaseError {
  public name = 'StockTakingsFetchFailed'
  constructor (
    public message: string = 'Could not fetch stock takings',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, StockTakingsFetchFailed.prototype)
  }
}

export class StockTakingsFetchOneFailed extends BaseError {
  public name = 'StockTakingsFetchOneFailed'
  constructor (
    public message: string = 'Could not fetch one stock taking',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, StockTakingsFetchOneFailed.prototype)
  }
}

export class StockTakingsUpdateFailed extends BaseError {
  public name = 'StockTakingsUpdateFailed'
  constructor (
    public message: string = 'Could not update stock taking',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, StockTakingsUpdateFailed.prototype)
  }
}

export class StockTakingsCreationFailed extends BaseError {
  public name = 'StockTakingsCreationFailed'
  constructor (
    public message: string = 'Could not create stock taking',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, StockTakingsCreationFailed.prototype)
  }
}

export class StockTakingsDeleteFailed extends BaseError {
  public name = 'StockTakingsDeleteFailed'
  constructor (
    public message: string = 'Could not delete stock taking',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, StockTakingsDeleteFailed.prototype)
  }
}

export class StockTakingsMetaFailed extends BaseError {
  public name = 'StockTakingsMetaFailed'
  constructor (
    public message: string = 'Could not get meta of stock takings',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, StockTakingsMetaFailed.prototype)
  }
}
