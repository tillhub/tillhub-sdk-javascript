import {
  ThAnalyticsBaseHandler,
  ThAnalyticsBaseResultItem,
  AnalyticsSocketsExportResponseItem
} from '../../../base'
import { Client } from '../../../client'
import { BaseError } from '../../../errors'
import { UriHelper } from '../../../uri-helper'
import { AnalyticsOptions } from '../../../v0/analytics'

interface AnalyticsReportsStocksResponseItem {
  data: Array<Record<string, unknown>>
  metaData: {
    count?: number
    total_count?: number
  }
  next?: () => Promise<AnalyticsReportsStocksResponseItem>
}

export interface StocksExportOptions {
  format?: string
  branch_number?: number
  uri?: string
}

export class AnalyticsReportsStocks extends ThAnalyticsBaseHandler {
  http: Client
  public options: AnalyticsOptions
  public timeout: AnalyticsOptions['timeout']

  constructor (options: AnalyticsOptions, http: Client) {
    super(http, options)
    this.options = options
    this.http = http
    this.timeout = options.timeout ?? this.http.getClient().defaults.timeout
  }

  static create (options: Record<string, unknown>, http: Client): AnalyticsReportsStocks {
    return ThAnalyticsBaseHandler.generateAuthenticatedInstance(
      AnalyticsReportsStocks,
      options,
      http
    )
  }

  async getAll (query?: StocksExportOptions | undefined): Promise<AnalyticsReportsStocksResponseItem> {
    try {
      let nextFn
      const localUriHelper = new UriHelper('/api/v2/analytics', this.options)
      const uri = localUriHelper.generateBaseUri('/reports/stocks')
      const { results: d, next } = await this.handleGet(uri, query, { timeout: this.timeout })

      if (!d) {
        throw new TypeError('Unexpectedly did not return data.')
      }

      const data = d?.find(
        (item: ThAnalyticsBaseResultItem) => item.metric.job === 'reports_stocks'
      )?.values ?? []

      const count = d?.find(
        (item: ThAnalyticsBaseResultItem) =>
          item.metric.job === 'reports_stocks_filtered_meta'
      )?.values[0] ?? {}

      const totalCount = d?.find(
        (item: ThAnalyticsBaseResultItem) => item.metric.job === 'reports_stocks_meta'
      )?.values[0] ?? {}

      if (next) {
        nextFn = (): Promise<AnalyticsReportsStocksResponseItem> =>
          this.getAll({ uri: next })
      }

      return {
        data,
        metaData: {
          count: count.count,
          total_count: totalCount.count
        },
        next: nextFn
      }
    } catch (error: any) {
      throw new AnalyticsReportsStocksFetchFailed(error.message, { error })
    }
  }

  public async export (
    query?: StocksExportOptions
  ): Promise<AnalyticsSocketsExportResponseItem> {
    try {
      const localUriHelper = new UriHelper('/api/v2/analytics', this.options)
      const uri = localUriHelper.generateBaseUri('/reports/stocks')
      const result = await this.handleSocketsExport(uri, query)

      return result
    } catch (error: any) {
      throw new AnalyticsReportsStocksExportFetchFailed(error.message, { error })
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

export class AnalyticsReportsStocksExportFetchFailed extends BaseError {
  public name = 'AnalyticsReportsStocksExportFetchFailed'
  constructor (
    public message: string = 'Could not fetch stocks export. ',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AnalyticsReportsStocksExportFetchFailed.prototype)
  }
}
