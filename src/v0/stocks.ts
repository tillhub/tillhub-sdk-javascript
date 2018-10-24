import { Client } from '../client'
import * as errors from '../errors'

export interface StocksOptions {
  user?: string
  base?: string
}

export interface StocksQuery {
  limit?: number
  uri?: string
}

export interface StocksResponse {
  data: object[]
  metadata: object
}

export class Stocks {
  endpoint: string
  http: Client
  public options: StocksOptions

  constructor(options: StocksOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v0/stocks'
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
