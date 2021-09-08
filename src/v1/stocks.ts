import { Client } from '../client'
import { ThBaseHandler } from '../base'
import { UriHelper } from '../uri-helper'
import { StocksOptions, StocksBookFetchFailed, StocksBookQuery, StocksResponse } from '../v0/stocks'

export class StocksBook extends ThBaseHandler {
  public static baseEndpoint = '/api/v1/stock'
  endpoint: string
  http: Client
  public options: StocksOptions
  public uriHelper: UriHelper

  constructor (options: StocksOptions, http: Client) {
    super(http, {
      endpoint: StocksBook.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = StocksBook.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (query?: StocksBookQuery | undefined): Promise<StocksResponse> {
    let next

    try {
      const base = this.uriHelper.generateBaseUri('/book')
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new StocksBookFetchFailed(undefined, { status: response.status })
      }
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
}
