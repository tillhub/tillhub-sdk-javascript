import { Client } from '../../../client'
import { UriHelper } from '../../../uri-helper'
import * as errors from '../../../errors/analytics'

export interface PaymentsOptions {
  user?: string
  base?: string
}

export interface PaymentsResponse {
  data: Record<string, unknown>[]
  metadata: Record<string, unknown>
}

export interface PaymentsQuery {
  uri?: string
  format?: string
  start?: string
  end?: string
  payment_option?: string
  payment_type?: string
  transaction_number?: number
  balance_number?: number
  customer_number?: string
  cashier_number?: string
  legacy?: boolean
  limit?: number
  cursor_field?: string
  q?: string
  change?: {
    from: number
    to: number
  }
  amount?: {
    from: number
    to: number
  }
}

export interface MetaQuery {
  legacy?: boolean
}

export class Payments {
  http: Client
  public options: PaymentsOptions
  public uriHelper: UriHelper

  constructor(options: PaymentsOptions, http: Client, uriHelper: UriHelper) {
    this.options = options
    this.http = http
    this.uriHelper = uriHelper
  }

  getAll(query?: PaymentsQuery): Promise<PaymentsResponse> {
    return new Promise(async (resolve, reject) => {
      let next
      try {
        const base = this.uriHelper.generateBaseUri('/reports/payments')
        const uri = this.uriHelper.generateUriWithQuery(base, query)
        const response = await this.http.getClient().get(uri)

        if (response.data.cursor && response.data.cursor.next) {
          next = (): Promise<PaymentsResponse> => this.getAll({ uri: response.data.cursor.next })
        }

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count },
          next
        } as PaymentsResponse)
      } catch (err) {
        return reject(new errors.ReportsPaymentsFetchAllFailed())
      }
    })
  }

  meta(query?: MetaQuery): Promise<PaymentsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const base = this.uriHelper.generateBaseUri('/reports/payments/meta')
        const uri = this.uriHelper.generateUriWithQuery(base, query)
        const response = await this.http.getClient().get(uri)

        if (response.status !== 200) {
          return reject(
            new errors.ReportsPaymentsMetaFailed(undefined, { status: response.status })
          )
        }

        if (!response.data.results[0]) {
          return reject(
            new errors.ReportsPaymentsMetaFailed('Could not get payments metadata unexpectedly')
          )
        }

        return resolve({
          data: response.data.results[0],
          metadata: { count: response.data.count }
        } as PaymentsResponse)
      } catch (err) {
        return reject(new errors.ReportsPaymentsMetaFailed())
      }
    })
  }
}
