import { ThAnalyticsBaseHandler } from '../../../base'
import { StockTakingsQueryOptions } from '../../../v0/stock_takings'
import { Client, Timeout } from '../../../client'
import { BaseError } from '../../../errors'
import { UriHelper } from '../../../uri-helper'

export interface StockTakingsHandlerOptions {
  user?: string
  base?: string
  timeout?: Timeout
}

export interface AnalyticsReportsStockTakingsV1ExportResponseItem {
  correlationId?: string
}

export interface AnalyticsResponse {
  data: AnalyticsReportsStockTakingsV1ExportResponseItem[]
  metadata: Record<string, unknown>
  msg?: string
}

export class AnalyticsReportsStockTakings extends ThAnalyticsBaseHandler {
  http: Client
  public options: StockTakingsHandlerOptions
  public timeout: Timeout

  constructor (options: StockTakingsHandlerOptions, http: Client) {
    super(http, options)
    this.options = options
    this.http = http
    this.timeout = options.timeout ?? this.http.getClient().defaults.timeout
  }

  static create (options: Record<string, unknown>, http: Client): AnalyticsReportsStockTakings {
    return ThAnalyticsBaseHandler.generateAuthenticatedInstance(
      AnalyticsReportsStockTakings,
      options,
      http
    )
  }

  public async getAll (
    query?: StockTakingsQueryOptions
  ): Promise<AnalyticsResponse> {
    try {
      const localUriHelper = new UriHelper('/api/v1/analytics', this.options)
      const base = localUriHelper.generateBaseUri('/reports/inventory/stock_takings')
      const uri = localUriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri, { timeout: this.timeout })
      if (response.status !== 200) throw new AnalyticsReportsV1StockTakingsFetchError()
      return {
        data: response.data.results,
        metadata: {
          count: response.data.count
        }
      }
    } catch (error: any) {
      throw new AnalyticsReportsV1StockTakingsFetchError(error.message, { error })
    }
  }
}

export class AnalyticsReportsV1StockTakingsFetchError extends BaseError {
  public name = 'AnalyticsReportsV1StockTakingsFetchError'
  constructor (
    public message: string = 'Could not fetch stock takings report',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AnalyticsReportsV1StockTakingsFetchError.prototype)
  }
}
