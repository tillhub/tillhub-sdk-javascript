import { Client } from '../../../client'
import { BaseError } from '../../../errors'
import { UriHelper } from '../../../uri-helper'

export interface AnalyticsReportsStocksV3ExportResponseItem {
  correlationId?: string
}
export interface AnalyticsResponse {
  data: AnalyticsReportsStocksV3ExportResponseItem[]
  metadata: Record<string, unknown>
  msg?: string
}

export interface AnalyticsOptions {
  user?: string
  base?: string
}

export interface StocksExportOptions {
  format?: string
  branch_number?: number
}

export class AnalyticsReportsStocks {
  endpoint: string
  http: Client
  public options: AnalyticsOptions
  public uriHelper: UriHelper

  constructor (options: AnalyticsOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v2/analytics'
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (query?: StocksExportOptions | undefined): Promise<AnalyticsResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/reports/stocks')
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new AnalyticsReportsStocksFetchFailed()
      return {
        data: response.data.results,
        metadata: {
          count: response.data.count
        }
      }
    } catch (err) {
      throw new AnalyticsReportsStocksFetchFailed(undefined, { error: err })
    }
  }
}

export class AnalyticsReportsStocksFetchFailed extends BaseError {
  public name = 'AnalyticsReportsStocksFetchFailed'
  constructor (
    public message: string = 'Could not fetch the stocks analytics reports',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AnalyticsReportsStocksFetchFailed.prototype)
  }
}
