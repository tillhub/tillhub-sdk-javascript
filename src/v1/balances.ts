import qs from 'qs'
import { Client } from '../client'
import * as errors from '../errors'

export interface BalancesOptions {
  user?: string
  base?: string
}

export interface BalancesResponse {
  data: object[]
  metadata: object
}

export interface BalancesQuery {
  start?: string | null
  end?: string | null
  branches?: boolean | null
  register?: boolean | null
  staff?: string | null
  limit?: number
  uri?: string
}

export interface LatestQuery {
  register_number: string,
  branch_number: string,
  date_start: string
}

export class Balances {
  endpoint: string
  http: Client
  public options: BalancesOptions

  constructor(options: BalancesOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v1/balances'
    this.options.base = this.options.base || 'https://api.tillhub.com'
  }

  getAll(q?: BalancesQuery): Promise<BalancesResponse> {
    return new Promise(async (resolve, reject) => {
      const query = q ? JSON.parse(JSON.stringify(q)) : {}
      let uri
      let next

      try {
        if (query && query.uri) {
          uri = query.uri
        } else {
          uri = `${this.options.base}${this.endpoint}/${this.options.user}`
        }

        const queryString = qs.stringify(query)
        if (queryString) {
          uri = `${uri}?${queryString}`
        }

        const response = await this.http.getClient().get(uri)

        if (response.data.cursor && response.data.cursor.next) {
          next = (): Promise<BalancesResponse> => this.getAll({ uri: response.data.cursor.next })
        }

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count },
          next
        } as BalancesResponse)
      } catch (err) {
        return reject(new errors.BalancesFetchFailed())
      }
    })
  }

  async get(transactionId: string): Promise<BalancesResponse> {
    const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${transactionId}`

    try {
      const response = await this.http.getClient().get(uri)
      return {
        data: response.data.results[0]
      } as BalancesResponse
    } catch (error) {
      throw new errors.BalancesFetchOneFailed(undefined, { error })
    }
  }
}
