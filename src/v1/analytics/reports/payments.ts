import { ThAnalyticsBaseHandler } from '../../../base'
import { PaymentsQuery } from '../../../v0/analytics/reports/payments'
import { Client } from '../../../client'
import { BaseError } from '../../../errors'
import { UriHelper } from '../../../uri-helper'

export interface PaymentsHandlerOptions {
  user?: string
  base?: string
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

  constructor (options: PaymentsHandlerOptions, http: Client) {
    super(http, options)
    this.options = options
    this.http = http
  }

  static create (options: Record<string, unknown>, http: Client): AnalyticsReportsPayments {
    return ThAnalyticsBaseHandler.generateAuthenticatedInstance(
      AnalyticsReportsPayments,
      options,
      http
    )
  }

  public async export (
    query?: PaymentsQuery
  ): Promise<AnalyticsResponse> {
    try {
      const localUriHelper = new UriHelper('/api/v1/analytics', this.options)
      const base = localUriHelper.generateBaseUri('/reports/payments')
      const uri = localUriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new AnalyticsReportsV1PaymentsExportFetchError()
      return {
        data: response.data.results,
        metadata: {
          count: response.data.count
        }
      }
    } catch (err) {
      throw new AnalyticsReportsV1PaymentsExportFetchError(undefined, { error: err })
    }
  }
}

export class AnalyticsReportsV1PaymentsExportFetchError extends BaseError {
  public name = 'AnalyticsReportsV1PaymentsExportFetchError'
  constructor (
    public message: string = 'Could not fetch payments report export',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AnalyticsReportsV1PaymentsExportFetchError.prototype)
  }
}
