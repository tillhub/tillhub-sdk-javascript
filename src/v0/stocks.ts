import { Client } from '../client'
import { BaseError } from '../errors/baseError'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface StocksOptions {
  user?: string
  base?: string
}

export interface StocksQuery {
  limit?: number
  uri?: string
  deleted?: boolean
}

export interface StocksBookQuery {
  limit?: number
  uri?: string
  embed?: string[]
  start?: string
  end?: string
  product?: string
  location?: string
  to?: string
  from?: string
  branch?: string
  format?: string
  product_group?: string
  q?: string
}

export interface StocksResponse {
  data?: Array<Record<string, unknown>>
  metadata?: Record<string, unknown>
  msg?: string
  next?: () => Promise<StocksResponse>
}

export interface Stock {
  product: string
  location: string
  location_type: string | null
  qty: number
}

export interface Location {
  id?: string
  name?: string
  insert_id?: number
  type?: string
  created_at?: Record<string, unknown>
  location_type?: string | null
  qty?: number
}

export interface StocksUpdateRequestObject {
  stockId: string
  body: Stock
}

export interface TransferRequestObject {
  product: string
  qty: number
  from: TransferLocation
  to: TransferLocation
}

export interface TransferLocation {
  id: string
  location_type?: string
}

export class Stocks extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/stock'
  endpoint: string
  http: Client
  public options: StocksOptions
  public uriHelper: UriHelper

  constructor (options: StocksOptions, http: Client) {
    super(http, { endpoint: Stocks.baseEndpoint, base: options.base ?? 'https://api.tillhub.com' })
    this.options = options
    this.http = http

    this.endpoint = Stocks.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (query?: StocksQuery | undefined): Promise<StocksResponse> {
    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new StocksFetchFailed()

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (err) {
      throw new StocksFetchFailed()
    }
  }

  async create (stock: Stock): Promise<StocksResponse> {
    const uri = this.uriHelper.generateBaseUri()

    try {
      const response = await this.http.getClient().post(uri, stock)
      if (response.status !== 200) throw new StocksCreateFailed()

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (err) {
      throw new StocksCreateFailed()
    }
  }

  async update (requestObject: StocksUpdateRequestObject): Promise<StocksResponse> {
    const { body, stockId } = requestObject
    const uri = this.uriHelper.generateBaseUri(`/${stockId}`)

    try {
      const response = await this.http.getClient().put(uri, body)
      if (response.status !== 200) throw new StocksUpdateFailed()

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (err) {
      throw new StocksUpdateFailed()
    }
  }

  async getLocations (query?: StocksQuery | undefined): Promise<StocksResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/locations')
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new StocksLocationsFetchFailed()

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (err) {
      throw new StocksLocationsFetchFailed()
    }
  }

  async getOneLocation (locationId: string): Promise<StocksResponse> {
    const uri = this.uriHelper.generateBaseUri(`/locations/${locationId}`)
    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) { throw new StocksLocationFetchOneFailed(undefined, { status: response.status }) }

      return {
        data: response.data.results[0],
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new StocksLocationFetchOneFailed(undefined, { error })
    }
  }

  async transfer (body: TransferRequestObject): Promise<StocksResponse> {
    const uri = this.uriHelper.generateBaseUri('/transfer')

    try {
      const response = await this.http.getClient().post(uri, body)
      if (response.status !== 200) { throw new StocksTransferFailed(undefined, { status: response.status }) }

      return {
        data: response.data.results[0],
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new StocksTransferFailed(undefined, { error })
    }
  }
}

export class StocksBook {
  endpoint: string
  http: Client
  public options: StocksOptions
  public uriHelper: UriHelper

  constructor (options: StocksOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v0/stock'
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (query?: StocksBookQuery | undefined): Promise<StocksResponse> {
    let next

    try {
      const base = this.uriHelper.generateBaseUri('/book')
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)

      if (response.data.cursor?.next) {
        next = (): Promise<StocksResponse> => this.getAll({ uri: response.data.cursor.next })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count, cursor: response.data.cursor },
        next
      }
    } catch (error: any) {
      throw new StocksBookFetchFailed(undefined, { error })
    }
  }

  async meta (): Promise<StocksResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/book/meta')
      const uri = this.uriHelper.generateUriWithQuery(base)

      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) throw new StocksBookGetMetaFailed()

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new StocksBookGetMetaFailed(undefined, { error })
    }
  }
}

class StocksFetchFailed extends BaseError {
  public name = 'StocksFetchFailed'
  constructor (
    public message: string = 'Could not fetch the stocks',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, StocksFetchFailed.prototype)
  }
}

class StocksCreateFailed extends BaseError {
  public name = 'StocksCreateFailed'
  constructor (
    public message: string = 'Could not create the stock',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, StocksCreateFailed.prototype)
  }
}

class StocksUpdateFailed extends BaseError {
  public name = 'StocksUpdateFailed'
  constructor (
    public message: string = 'Could not update the stock',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, StocksUpdateFailed.prototype)
  }
}

class StocksLocationsFetchFailed extends BaseError {
  public name = 'StocksLocationsFetchFailed'
  constructor (
    public message: string = 'Could not fetch the stocks locations',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, StocksLocationsFetchFailed.prototype)
  }
}

class StocksLocationFetchOneFailed extends BaseError {
  public name = 'StocksLocationFetchOneFailed'
  constructor (
    public message: string = 'Could not fetch location',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, StocksLocationFetchOneFailed.prototype)
  }
}

export class StocksBookFetchFailed extends BaseError {
  public name = 'StocksBookFetchFailed'
  constructor (
    public message: string = 'Could not fetch the stocks book',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, StocksBookFetchFailed.prototype)
  }
}

class StocksBookGetMetaFailed extends BaseError {
  public name = 'StocksBookGetMetaFailed'
  constructor (
    public message: string = 'Could not fetch stocks book meta',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, StocksBookGetMetaFailed.prototype)
  }
}

class StocksTransferFailed extends BaseError {
  public name = 'StocksTransferFailed'
  constructor (
    public message: string = 'Could not transfer the stock',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, StocksTransferFailed.prototype)
  }
}
