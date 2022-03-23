import { ThAnalyticsBaseHandler } from '../../../base'
import { DiscountOptions } from '../../../v0/analytics'
import { Client, Timeout } from '../../../client'
import { BaseError } from '../../../errors'
import { UriHelper } from '../../../uri-helper'

export interface DiscountsHandlerOptions {
  user?: string
  base?: string
  timeout?: Timeout
}

export interface AnalyticsReportsDiscountsV1ExportResponseItem {
  correlationId?: string
}

export interface AnalyticsResponse {
  data: AnalyticsReportsDiscountsV1ExportResponseItem[]
  metadata: Record<string, unknown>
  msg?: string
}

export class AnalyticsReportsDiscounts extends ThAnalyticsBaseHandler {
  http: Client
  public options: DiscountsHandlerOptions
  public timeout: Timeout

  constructor (options: DiscountsHandlerOptions, http: Client) {
    super(http, options)
    this.options = options
    this.http = http
    this.timeout = options.timeout ?? this.http.getClient().defaults.timeout
  }

  static create (options: Record<string, unknown>, http: Client): AnalyticsReportsDiscounts {
    return ThAnalyticsBaseHandler.generateAuthenticatedInstance(
      AnalyticsReportsDiscounts,
      options,
      http
    )
  }

  public async getAll (
    query?: DiscountOptions
  ): Promise<AnalyticsResponse> {
    try {
      const localUriHelper = new UriHelper('/api/v1/analytics', this.options)
      const base = localUriHelper.generateBaseUri('/reports/discounts')
      const uri = localUriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri, { timeout: this.timeout })
      if (response.status !== 200) throw new AnalyticsReportsV1DiscountsFetchError()
      return {
        data: response.data.results,
        metadata: {
          count: response.data.count
        }
      }
    } catch (error: any) {
      throw new AnalyticsReportsV1DiscountsFetchError(error.message, { error })
    }
  }
}

export class AnalyticsReportsV1DiscountsFetchError extends BaseError {
  public name = 'AnalyticsReportsV1DiscountsFetchError'
  constructor (
    public message: string = 'Could not fetch discounts report',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AnalyticsReportsV1DiscountsFetchError.prototype)
  }
}
