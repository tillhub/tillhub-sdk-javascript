import { Client } from '../client'
import * as errors from '../errors'

export interface TaxesOptions {
  user?: string
  base?: string
}

export interface TaxesQuery {
  limit?: number
  uri?: string
}

export interface TaxesResponse {
  data: object[]
  metadata: object
}

export class Taxes {
  endpoint: string
  http: Client
  public options: TaxesOptions

  constructor(options: TaxesOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v0/taxes'
    this.options.base = this.options.base || 'https://api.tillhub.com'
  }

  getAll(query?: TaxesQuery | undefined): Promise<TaxesResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        let uri
        if (query && query.uri) {
          uri = query.uri
        } else {
          uri = `${this.options.base}${this.endpoint}/${this.options.user}`
        }

        const response = await this.http.getClient().get(uri)
        response.status !== 200 && reject(new errors.TaxesFetchFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as TaxesResponse)
      } catch (err) {
        return reject(new errors.TaxesFetchFailed())
      }
    })
  }
}
