import { ThAnalyticsBaseHandler } from '../../../base'
import { PaymentOptionsQuery } from '../../../v0/analytics/reports/payment_options'
import { Client, Timeout } from '../../../client'
import { BaseError } from '../../../errors'
import { UriHelper } from '../../../uri-helper'

export interface PaymentOptionsHandlerOptions {
  user?: string
  base?: string
  timeout?: Timeout
}

export interface AnalyticsReportsPaymentOptionsV1ExportResponseItem {
  correlationId?: string
}

export interface AnalyticsResponse {
  data: AnalyticsReportsPaymentOptionsV1ExportResponseItem[]
  metadata: Record<string, unknown>
  msg?: string
}

export class AnalyticsReportsPaymentOptions extends ThAnalyticsBaseHandler {
  http: Client
  public options: PaymentOptionsHandlerOptions
  public timeout: Timeout

  constructor (options: PaymentOptionsHandlerOptions, http: Client) {
    super(http, options)
    this.options = options
    this.http = http
    this.timeout = options.timeout ?? this.http.getClient().defaults.timeout
  }

  static create (options: Record<string, unknown>, http: Client): AnalyticsReportsPaymentOptions {
    return ThAnalyticsBaseHandler.generateAuthenticatedInstance(
      AnalyticsReportsPaymentOptions,
      options,
      http
    )
  }

  public async getAll (
    query?: PaymentOptionsQuery
  ): Promise<AnalyticsResponse> {
    try {
      const localUriHelper = new UriHelper('/api/v1/analytics', this.options)
      const base = localUriHelper.generateBaseUri('/reports/payment_options')
      const uri = localUriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri, { timeout: this.timeout })
      if (response.status !== 200) throw new AnalyticsReportsV1PaymentOptionsFetchError()
      return {
        data: response.data.results,
        metadata: {
          count: response.data.count
        }
      }
    } catch (error: any) {
      throw new AnalyticsReportsV1PaymentOptionsFetchError(error.message, { error })
    }
  }
}

export class AnalyticsReportsV1PaymentOptionsFetchError extends BaseError {
  public name = 'AnalyticsReportsV1PaymentOptionsFetchError'
  constructor (
    public message: string = 'Could not fetch payment options report',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AnalyticsReportsV1PaymentOptionsFetchError.prototype)
  }
}
