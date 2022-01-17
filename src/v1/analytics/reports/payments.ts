import { ThAnalyticsBaseHandler } from '../../../base'
import { PaymentsQuery } from '../../../v0/analytics/reports/payments'
import { Client, Timeout } from '../../../client'
import { BaseError } from '../../../errors'
import { UriHelper } from '../../../uri-helper'

export interface PaymentsHandlerOptions {
  user?: string
  base?: string
  timeout?: Timeout
}

export interface AnalyticsReportsPaymentsV1ExportResponseItem {
  correlationId?: string
}

export interface AnalyticsResponse {
  data: AnalyticsReportsPaymentsV1ExportResponseItem[]
  metadata: Record<string, unknown>
  msg?: string
}

export class AnalyticsReportsPayments extends ThAnalyticsBaseHandler {
  http: Client
  public options: PaymentsHandlerOptions
  public timeout: Timeout

  constructor (options: PaymentsHandlerOptions, http: Client) {
    super(http, options)
    this.options = options
    this.http = http
    this.timeout = options.timeout ?? this.http.getClient().defaults.timeout
  }

  static create (options: Record<string, unknown>, http: Client): AnalyticsReportsPayments {
    return ThAnalyticsBaseHandler.generateAuthenticatedInstance(
      AnalyticsReportsPayments,
      options,
      http
    )
  }

  public async getAll (
    query?: PaymentsQuery
  ): Promise<AnalyticsResponse> {
    try {
      const localUriHelper = new UriHelper('/api/v1/analytics', this.options)
      const base = localUriHelper.generateBaseUri('/reports/payments')
      const uri = localUriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri, { timeout: this.timeout })
      if (response.status !== 200 || !response?.data?.results.length) throw new AnalyticsReportsV1PaymentsFetchError()
      return {
        data: response.data.results[0].values,
        metadata: {
          count: response.data.results[0].count
        }
      }
    } catch (error: any) {
      throw new AnalyticsReportsV1PaymentsFetchError(error.message, { error })
    }
  }
}

export class AnalyticsReportsV1PaymentsFetchError extends BaseError {
  public name = 'AnalyticsReportsV1PaymentsFetchError'
  constructor (
    public message: string = 'Could not fetch payments report export',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AnalyticsReportsV1PaymentsFetchError.prototype)
  }
}
