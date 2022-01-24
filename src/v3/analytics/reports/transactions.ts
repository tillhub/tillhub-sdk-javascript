import {
  ThAnalyticsBaseHandler,
  ThAnalyticsBaseResultItem,
  AnalyticsSocketsExportResponseItem
} from '../../../base'
import { Client } from '../../../client'
import { BaseError } from '../../../errors'
import { UriHelper } from '../../../uri-helper'
import { AnalyticsOptions } from '../../../v0/analytics'

export interface AnalyticsReportsTransactionsOverviewResponseItem {
  data: Array<Record<string, unknown>>
  summary: Array<Record<string, unknown>>
  metaData: {
    count: number
    total_count: number
  }
  next?: () => Promise<AnalyticsReportsTransactionsOverviewResponseItem>
}

export class AnalyticsReportsTransactions extends ThAnalyticsBaseHandler {
  http: Client
  public options: AnalyticsOptions
  public timeout: AnalyticsOptions['timeout']

  constructor (options: AnalyticsOptions, http: Client) {
    super(http, options)
    this.options = options
    this.http = http
    this.timeout = options.timeout ?? this.http.getClient().defaults.timeout
  }

  static create (options: Record<string, unknown>, http: Client): AnalyticsReportsTransactions {
    return ThAnalyticsBaseHandler.generateAuthenticatedInstance(
      AnalyticsReportsTransactions,
      options,
      http
    )
  }

  public async getAll (
    query?: Record<string, unknown>
  ): Promise<AnalyticsReportsTransactionsOverviewResponseItem> {
    try {
      let nextFn
      const localUriHelper = new UriHelper('/api/v3/analytics', this.options)
      const uri = localUriHelper.generateBaseUri('/reports/transactions/overview')
      const { results: d, next } = await this.handleGet(uri, query, { timeout: this.timeout })

      if (!d) {
        throw new TypeError('Unexpectedly did not return data.')
      }

      const data = d?.find(
        (item: ThAnalyticsBaseResultItem) =>
          item.metric.job === 'reports_transactions_v2_overview_data'
      )?.values ?? []

      const summary = d?.find(
        (item: ThAnalyticsBaseResultItem) =>
          item.metric.job === 'reports_transactions_v2_overview_summary'
      )?.values ?? []

      const count = d?.find(
        (item: ThAnalyticsBaseResultItem) =>
          item.metric.job === 'reports_transactions_v2_overview_filtered_meta'
      )?.values[0] ?? {}

      const totalCount = d?.find(
        (item: ThAnalyticsBaseResultItem) =>
          item.metric.job === 'reports_transactions_v2_overview_meta'
      )?.values[0] ?? {}

      if (next) {
        nextFn = (): Promise<AnalyticsReportsTransactionsOverviewResponseItem> =>
          this.getAll({ uri: next })
      }

      return {
        data: data,
        summary: summary,
        metaData: {
          count: count.count,
          total_count: totalCount.count
        },
        next: nextFn
      }
    } catch (error: any) {
      throw new AnalyticsReportsTransactionsOverviewFetchError(error.message, { error })
    }
  }

  public async export (
    query?: Record<string, unknown>
  ): Promise<AnalyticsSocketsExportResponseItem> {
    try {
      const localUriHelper = new UriHelper('/api/v3/analytics', this.options)
      const uri = localUriHelper.generateBaseUri('/reports/transactions/overview')
      const result = await this.handleSocketsExport(uri, query)

      return result
    } catch (error: any) {
      throw new AnalyticsReportsV3TransactionsExportFetchError(error.message, { error })
    }
  }
}

export class AnalyticsReportsTransactionsOverviewFetchError extends BaseError {
  public name = 'AnalyticsReportsTransactionsOverviewFetchError'
  constructor (
    public message: string = 'Could not fetch transaction overview. ',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AnalyticsReportsTransactionsOverviewFetchError.prototype)
  }
}

export class AnalyticsReportsV3TransactionsExportFetchError extends BaseError {
  public name = 'AnalyticsReportsV3TransactionsExportFetchError'
  constructor (
    public message: string = 'Could not fetch transactions report export.',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AnalyticsReportsV3TransactionsExportFetchError.prototype)
  }
}
