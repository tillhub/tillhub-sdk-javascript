import { Client } from '../client'
import * as errors from '../errors'

export interface AccountsOptions {
  user?: string
  base?: string
}

export interface AccountsQuery {
  limit?: number
  uri?: string
}

export interface AccountsResponse {
  data: object[]
  metadata: object
}

export class Accounts {
  endpoint: string
  http: Client
  public options: AccountsOptions

  constructor(options: AccountsOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v0/accounts'
    this.options.base = this.options.base || 'https://api.tillhub.com'
  }

  getAll(query?: AccountsQuery | undefined): Promise<AccountsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        let uri
        if (query && query.uri) {
          uri = query.uri
        } else {
          uri = `${this.options.base}${this.endpoint}/${this.options.user}`
        }

        const response = await this.http.getClient().get(uri)

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as AccountsResponse)
      } catch (err) {
        return reject(new errors.AccountsFetchFailed())
      }
    })
  }
}
