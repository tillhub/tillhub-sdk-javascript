import { Client } from '../client'
import * as errors from '../errors/safes'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'
import { SafesLogBookOptions, SafesLogBookQuery, SafesLogBookResponse } from '../v0/safes'

export class SafesLogBook extends ThBaseHandler {
  public static baseEndpoint = '/api/v1/safes'
  endpoint: string
  http: Client
  public options: SafesLogBookOptions
  public uriHelper: UriHelper

  constructor (options: SafesLogBookOptions, http: Client) {
    super(http, {
      endpoint: SafesLogBook.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = SafesLogBook.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (query?: SafesLogBookQuery | undefined): Promise<SafesLogBookResponse> {
    let next

    try {
      const base = this.uriHelper.generateBaseUri('/logs')
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)

      if (response.data.cursor?.next) {
        next = (): Promise<SafesLogBookResponse> =>
          this.getAll({ uri: response.data.cursor.next })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count, cursor: response.data.cursor },
        next
      }
    } catch (error) {
      throw new errors.SafesLogBookFetchAllFailed(undefined, { error })
    }
  }
}
