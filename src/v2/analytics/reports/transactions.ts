import {
  ThAnalyticsBaseHandler,
  ThAnalyticsBaseResultItem,
  ThAnalyticsExportsBaseResponse
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

export interface AnalyticsReportsTransactionDetailResponseItem {
  data: Record<string, unknown>
  metaData: {
    count: number
    total_count: number
  }
}

export type AnalyticsReportsTraansactionsOverviewExportResponseItem = ThAnalyticsExportsBaseResponse

export class AnalyticsReportsTransactionsOverview extends ThAnalyticsBaseHandler {
  http: Client
  public options: AnalyticsOptions
  public timeout: AnalyticsOptions['timeout']

  constructor (options: AnalyticsOptions, http: Client) {
    super(http, options)
    this.options = options
    this.http = http
    this.timeout = options.timeout ?? this.http.getClient().defaults.timeout
  }

  static create (
    options: Record<string, unknown>,
    http: Client
  ): AnalyticsReportsTransactionsOverview {
    return ThAnalyticsBaseHandler.generateAuthenticatedInstance(
      AnalyticsReportsTransactionsOverview,
      options,
      http
    )
  }

  public async getAll (
    query?: Record<string, unknown>
  ): Promise<AnalyticsReportsTransactionsOverviewResponseItem> {
    try {
      let nextFn
      const localUriHelper = new UriHelper('/api/v2/analytics', this.options)
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
  ): Promise<AnalyticsReportsTraansactionsOverviewExportResponseItem> {
    try {
      const localUriHelper = new UriHelper('/api/v2/analytics', this.options)
      const uri = localUriHelper.generateBaseUri('/reports/transactions/overview')
      const result = await this.handleExport(uri, query)

      return result
    } catch (error: any) {
      throw new AnalyticsReportsTransactionsOverviewExportFetchError(error.message, { error })
    }
  }
}

export class AnalyticsReportsTransactionsDetail extends ThAnalyticsBaseHandler {
  http: Client
  public options: AnalyticsOptions
  public timeout: AnalyticsOptions['timeout']

  constructor (options: AnalyticsOptions, http: Client) {
    super(http, options)
    this.options = options
    this.http = http
    this.timeout = options.timeout ?? this.http.getClient().defaults.timeout
  }

  static create (
    options: Record<string, unknown>,
    http: Client
  ): AnalyticsReportsTransactionsDetail {
    return ThAnalyticsBaseHandler.generateAuthenticatedInstance(
      AnalyticsReportsTransactionsDetail,
      options,
      http
    )
  }

  public async get (id: string): Promise<AnalyticsReportsTransactionDetailResponseItem> {
    try {
      const localUriHelper = new UriHelper('/api/v2/analytics', this.options)
      const uri = localUriHelper.generateBaseUri(`/reports/transactions/${id}/detail`)
      const { results: d } = await this.handleGet(uri, { timeout: this.timeout })

      const data = d?.find(
        (item: ThAnalyticsBaseResultItem) =>
          item.metric.job === 'reports_transactions_v2_transaction_detail_data'
      )?.values ?? []

      return {
        data: data[0],
        metaData: {
          count: 1,
          total_count: 1
        }
      }
    } catch (error: any) {
      throw new AnalyticsReportsTransactionDetailFetcshError(error.message, { error })
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

export class AnalyticsReportsTransactionDetailFetcshError extends BaseError {
  public name = 'AnalyticsReportsTransactionDetailFetcshError'
  constructor (
    public message: string = 'Could not fetch transaction detail. ',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AnalyticsReportsTransactionDetailFetcshError.prototype)
  }
}

export class AnalyticsReportsTransactionsOverviewExportFetchError extends BaseError {
  public name = 'AnalyticsReportsTransactionsOverviewExportFetchError'
  constructor (
    public message: string = 'Could not fetch transaction overview export. ',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AnalyticsReportsTransactionsOverviewExportFetchError.prototype)
  }
}
