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
  format?: string
  legacy?: boolean
}

export class Balances {
  http: Client
  public options: BalancesOptions
  public uriHelper: UriHelper

  constructor(options: BalancesOptions, http: Client, uriHelper: UriHelper) {
    this.options = options
    this.http = http
    this.uriHelper = uriHelper
  }

  getAll(query?: BalancesQuery): Promise<BalancesResponse> {
    return new Promise(async (resolve, reject) => {
      let next
      try {
        const base = this.uriHelper.generateBaseUri('/reports/balances')
        const uri = this.uriHelper.generateUriWithQuery(base, query)
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
        return reject(new errors.ReportsBalancesFetchAllFailed())
      }
    })
  }

  meta(): Promise<BalancesResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uri = this.uriHelper.generateBaseUri('/reports/balances/meta')
        const response = await this.http.getClient().get(uri)

        if (response.status !== 200) return reject(new errors.ReportsBalancesMetaFailed(undefined, { status: response.status }))

        if (!response.data.results[0]) {
          return reject(
            new errors.ReportsBalancesMetaFailed('Could not get balances metadata unexpectedly')
          )
        }

        return resolve({
          data: response.data.results[0],
          metadata: { count: response.data.count }
        } as BalancesResponse)

      } catch (err) {
        return reject(new errors.ReportsBalancesMetaFailed())
      }
    })
  }

  get(requestObject: BalancesGetOneRequestObject): Promise<BalancesResponse> {
    return new Promise(async (resolve, reject) => {
      let next
      try {
        const base = this.uriHelper.generateBaseUri(`/reports/balances/${requestObject.balanceId}`)
        const uri = this.uriHelper.generateUriWithQuery(base, requestObject.query)
        const response = await this.http.getClient().get(uri)

        if (response.data.cursor && response.data.cursor.next) {
          next = (): Promise<BalancesResponse> => this.getAll({ uri: response.data.cursor.next })
        }

        return resolve({
          data: response.data.results[0],
          metadata: { count: response.data.count },
          next
        } as BalancesResponse)

      } catch (err) {
        return reject(new errors.ReportsBalancesFetchOneFailed())
      }
    })
  }
}
