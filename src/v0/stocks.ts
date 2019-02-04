import { Client } from '../client'
import * as errors from '../errors'
import { UriHelper } from '../uri-helper'

export interface StocksOptions {
  user?: string
  base?: string
}

export interface StocksQuery {
  limit?: number
  uri?: string
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
}

export interface StocksResponse {
  data: object[]
  metadata: object
}

export interface Stock {
  product: string
  location: string
  location_type: string | null
  qty: number
}

export interface StocksUpdateRequestObject {
  stockId: string
  body: Stock
}

export class Stocks {
  endpoint: string
  http: Client
  public options: StocksOptions

  constructor(options: StocksOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v0/stock'
    this.options.base = this.options.base || 'https://api.tillhub.com'
  }

  getAll(query?: StocksQuery | undefined): Promise<StocksResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        let uri
        if (query && query.uri) {
          uri = query.uri
        } else {
          uri = `${this.options.base}${this.endpoint}/${this.options.user}`
        }

        const response = await this.http.getClient().get(uri)
        response.status !== 200 && reject(new errors.StocksFetchFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as StocksResponse)
      } catch (err) {
        return reject(new errors.StocksFetchFailed())
      }
    })
  }

  create(stock: Stock): Promise<StocksResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}`
      try {
        const response = await this.http.getClient().post(uri, stock)
        response.status !== 200 && reject(new errors.StocksCreateFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as StocksResponse)
      } catch (err) {
        return reject(new errors.StocksCreateFailed())
      }
    })
  }

  update(requestObject: StocksUpdateRequestObject): Promise<StocksResponse> {
    return new Promise(async (resolve, reject) => {
      const { body, stockId } = requestObject

      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${stockId}`

      try {
        const response = await this.http.getClient().put(uri, body)
        response.status !== 200 && reject(new errors.StocksUpdateFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as StocksResponse)
      } catch (err) {
        return reject(new errors.StocksUpdateFailed())
      }
    })
  }

  getLocations(query?: StocksQuery | undefined): Promise<StocksResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        let uri
        if (query && query.uri) {
          uri = query.uri
        } else {
          uri = `${this.options.base}${this.endpoint}/${this.options.user}/locations`
        }

        const response = await this.http.getClient().get(uri)
        response.status !== 200 && reject(new errors.StocksLocationsFetchFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as StocksResponse)
      } catch (err) {
        return reject(new errors.StocksLocationsFetchFailed())
      }
    })
  }
}

export class StocksBook {
  endpoint: string
  http: Client
  public options: StocksOptions
  public uriHelper: UriHelper

  constructor(options: StocksOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v0/stock'
    this.options.base = this.options.base || 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  getAll(query?: StocksBookQuery | undefined): Promise<StocksResponse> {
    return new Promise(async (resolve, reject) => {
      let next

      try {
        const base = this.uriHelper.generateBaseUri(`/book`)
        const uri = this.uriHelper.generateUriWithQuery(base, query)

        const response = await this.http.getClient().get(uri)

        if (response.data.cursor && response.data.cursor.next) {
          next = (): Promise<StocksResponse> => this.getAll({ uri: response.data.cursor.next })
        }

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count, cursor: response.data.cursor },
          next
        } as StocksResponse)
      } catch (error) {
        return reject(new errors.StocksBookFetchFailed(undefined, { error }))
      }
    })
  }

  meta(): Promise<StocksResponse> {
    return new Promise(async (resolve, reject) => {
      let uri = `${this.options.base}${this.endpoint}/${this.options.user}/meta`

      try {
        const base = this.uriHelper.generateBaseUri(`/book/meta`)
        const uri = this.uriHelper.generateUriWithQuery(base)

        const response = await this.http.getClient().get(uri)

        if (response.status !== 200) reject(new errors.StocksBookGetMetaFailed())

        return resolve({
          data: response.data.results[0],
          metadata: { count: response.data.count }
        } as StocksResponse)
      } catch (error) {
        return reject(new errors.StocksBookGetMetaFailed(undefined, { error }))
      }
    })
  }
}
