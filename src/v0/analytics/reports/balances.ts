import { Client } from '../../../client'
import { UriHelper } from '../../../uri-helper'
import * as errors from '../../../errors/analytics'

export interface BalancesOptions {
  user?: string
  base?: string
}

export interface BalanceGetOneQuery {
  legacy?: boolean
  currency: string
}

export interface BalancesGetOneRequestObject {
  balanceId: string
  query: BalanceGetOneQuery
}

export interface BalancesResponse {
  data: Array<Record<string, unknown>>
  metadata: Record<string, unknown>
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
  legacy?: boolean
}

export class Balances {
  http: Client
  public options: BalancesOptions
  public uriHelper: UriHelper

  constructor (options: BalancesOptions, http: Client, uriHelper: UriHelper) {
    this.options = options
    this.http = http
    this.uriHelper = uriHelper
  }

  async getAll (query?: BalancesQuery): Promise<BalancesResponse> {
    let next
    try {
      const base = this.uriHelper.generateBaseUri('/reports/balances')
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
      throw new errors.ReportsBalancesFetchAllFailed()
    }
  }

  async meta (query?: BalancesQuery): Promise<BalancesResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/reports/balances/meta')
      const uri = this.uriHelper.generateUriWithQuery(base, query)
      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) {
        throw new errors.ReportsBalancesMetaFailed(undefined, { status: response.status })
      }

      if (!response.data.results[0]) {
        throw new errors.ReportsBalancesMetaFailed('Could not get balances metadata unexpectedly')
      }

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (err) {
      throw new errors.ReportsBalancesMetaFailed()
    }
  }

  async get (requestObject: BalancesGetOneRequestObject): Promise<BalancesResponse> {
    let next
    try {
      const base = this.uriHelper.generateBaseUri(`/reports/balances/${requestObject.balanceId}`)
      const uri = this.uriHelper.generateUriWithQuery(base, requestObject.query)
      const response = await this.http.getClient().get(uri)

      if (response.data.cursor?.next) {
        next = (): Promise<BalancesResponse> => this.getAll({ uri: response.data.cursor.next })
      }

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count },
        next
      }
    } catch (err) {
      throw new errors.ReportsBalancesFetchOneFailed()
    }
  }
}
