import qs from 'qs'
import { Client } from '../client'
import * as errors from '../errors'
import { ThBaseHandler } from '../base'

export interface BalancesOptions {
  user?: string
  base?: string
}

export interface BalancesResponse {
  data: Record<string, unknown>[]
  metadata: Record<string, unknown>
}

export interface BalancesQuery {
  start?: string | null
  end?: string | null
  branches?: boolean | null
  register?: boolean | null
  staff?: string | null
  limit?: number
  uri?: string
  format?: string
}

export interface LatestQuery {
  register_number: string
  branch_number: string
  date_start: string
}

export class Balances extends ThBaseHandler {
  public static baseEndpoint = '/api/v1/balances'
  endpoint: string
  http: Client
  public options: BalancesOptions

  constructor(options: BalancesOptions, http: Client) {
    super(http, {
      endpoint: Balances.baseEndpoint,
      base: options.base || 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = Balances.baseEndpoint
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

  meta(): Promise<BalancesResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/meta`

      try {
        const response = await this.http.getClient().get(uri)
        if (response.status !== 200)
          return reject(new errors.BalancesMetaFailed(undefined, { status: response.status }))

        if (!response.data.results[0]) {
          return reject(
            new errors.BalancesMetaFailed('could not get balances metadata unexpectedly')
          )
        }

        return resolve({
          data: response.data.results[0],
          metadata: { count: response.data.count }
        } as BalancesResponse)
      } catch (err) {
        return reject(new errors.BalancesMetaFailed())
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
