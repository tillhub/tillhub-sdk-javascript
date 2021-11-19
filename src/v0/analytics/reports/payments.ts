import { Client, Timeout } from '../../../client'
import { UriHelper } from '../../../uri-helper'
import * as errors from '../../../errors/analytics'
import { AnalyticsOptions } from '../../analytics'

export interface PaymentsResponse {
  data: Array<Record<string, unknown>>
  metadata: Record<string, unknown>
  next?: () => Promise<PaymentsResponse>
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
  public options: AnalyticsOptions
  public uriHelper: UriHelper
  public timeout: Timeout

  constructor (options: AnalyticsOptions, http: Client, uriHelper: UriHelper) {
    this.options = options
    this.http = http
    this.uriHelper = uriHelper
    this.timeout = options.timeout ?? this.http.getClient().defaults.timeout
  }

  async getAll (query?: PaymentsQuery): Promise<PaymentsResponse> {
    let next
    try {
      const base = this.uriHelper.generateBaseUri('/reports/payments')
      const uri = this.uriHelper.generateUriWithQuery(base, query)
      const response = await this.http.getClient().get(uri, { timeout: this.timeout })

      if (response.data.cursor?.next) {
        next = (): Promise<PaymentsResponse> => this.getAll({ uri: response.data.cursor.next })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count },
        next
      }
    } catch (err: any) {
      throw new errors.ReportsPaymentsFetchAllFailed()
    }
  }

  async meta (query?: MetaQuery): Promise<PaymentsResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/reports/payments/meta')
      const uri = this.uriHelper.generateUriWithQuery(base, query)
      const response = await this.http.getClient().get(uri, { timeout: this.timeout })

      if (response.status !== 200) {
        throw new errors.ReportsPaymentsMetaFailed(undefined, { status: response.status })
      }

      if (!response.data.results[0]) {
        throw new errors.ReportsPaymentsMetaFailed('Could not get payments metadata unexpectedly')
      }

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (err: any) {
      throw new errors.ReportsPaymentsMetaFailed()
    }
  }
}
