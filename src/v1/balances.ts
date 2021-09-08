import { Client } from '../client'
import * as errors from '../errors'
import { ThBaseHandler } from '../base'
import { UriHelper } from '../uri-helper'

export interface BalancesOptions {
  user?: string
  base?: string
}

export interface BalancesResponse {
  data: Array<Record<string, unknown>>
  metadata?: Record<string, unknown>
  next?: () => Promise<BalancesResponse>
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
  public uriHelper: UriHelper

  constructor (options: BalancesOptions, http: Client) {
    super(http, {
      endpoint: Balances.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = Balances.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (query?: BalancesQuery): Promise<BalancesResponse> {
    let next

    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)

      if (response.data.cursor?.next) {
        next = (): Promise<BalancesResponse> => this.getAll({ uri: response.data.cursor.next })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count },
        next
      }
    } catch (err) {
      throw new errors.BalancesFetchFailed()
    }
  }

  async meta (): Promise<BalancesResponse> {
    const uri = this.uriHelper.generateBaseUri('/meta')

    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new errors.BalancesMetaFailed(undefined, { status: response.status })
      }

      if (!response.data.results[0]) {
        throw new errors.BalancesMetaFailed('could not get balances metadata unexpectedly')
      }

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (err) {
      throw new errors.BalancesMetaFailed()
    }
  }

  async get (transactionId: string): Promise<BalancesResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${transactionId}`)

    try {
      const response = await this.http.getClient().get(uri)
      return {
        data: response.data.results[0]
      }
    } catch (error: any) {
      throw new errors.BalancesFetchOneFailed(undefined, { error })
    }
  }
}
