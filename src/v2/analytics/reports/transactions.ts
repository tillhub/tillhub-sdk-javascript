import {
  ThAnalyticsBaseHandler,
  ThAnalyticsBaseResultItem,
  ThAnalyticsExportsBaseResponse
} from '../../../base'
import { Client } from '../../../client'
import { BaseError } from '../../../errors'

export interface TransactionsHandlerOptions {
  user?: string
  base?: string
}

export interface AnalyticsReportsTransactionsOverviewResponseItem {
    data: Array<Record<string, unknown>>
  summary: Record<string, unknown>[]
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
  public options: TransactionsHandlerOptions

  constructor(options: TransactionsHandlerOptions, http: Client) {
    super(http, options)
    this.options = options
    this.http = http
  }

  static create(
    options: Record<string, unknown>,
    http: Client
  ): AnalyticsReportsTransactionsOverview {
    return ThAnalyticsBaseHandler.generateAuthenticatedInstance(
      AnalyticsReportsTransactionsOverview,
      options,
      http
    )
  }

  public async getAll(
    query?: Record<string, unknown>
  ): Promise<AnalyticsReportsTransactionsOverviewResponseItem> {
    try {
      let nextFn
      const { results: d, next } = await this.handleGet(
        `${this.options.base}/api/v2/analytics/${this.options.user}/reports/transactions/overview`,
        query
      )
      if (!d) {
        throw new TypeError('Unexpectedly did not return data.')
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const data = d.find(
        (item: ThAnalyticsBaseResultItem) =>
          item.metric.job === 'reports_transactions_v2_overview_data'
      ).values
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const summary = d.find(
        (item: ThAnalyticsBaseResultItem) =>
          item.metric.job === 'reports_transactions_v2_overview_summary'
      ).values
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const count = d.find(
        (item: ThAnalyticsBaseResultItem) =>
          item.metric.job === 'reports_transactions_v2_overview_filtered_meta'
      ).values[0]
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const totalCount = d.find(
        (item: ThAnalyticsBaseResultItem) =>
          item.metric.job === 'reports_transactions_v2_overview_meta'
      ).values[0]

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
      } as AnalyticsReportsTransactionsOverviewResponseItem
    } catch (err) {
      throw new AnalyticsReportsTransactionsOverviewFetchError(undefined, { error: err })
    }
  }

  public async export(
    query?: Record<string, unknown>
  ): Promise<AnalyticsReportsTraansactionsOverviewExportResponseItem> {
    try {
      const result = await this.handleExport(
        `${this.options.base}/api/v2/analytics/${this.options.user}/reports/transactions/overview`,
        query
      )
      return result
    } catch (err) {
      throw new AnalyticsReportsTransactionsOverviewExportFetchError(undefined, { error: err })
    }
  }
}

export class AnalyticsReportsTransactionsDetail extends ThAnalyticsBaseHandler {
  http: Client
  public options: TransactionsHandlerOptions

  constructor(options: TransactionsHandlerOptions, http: Client) {
    super(http, options)
    this.options = options
    this.http = http
  }

  static create(
    options: Record<string, unknown>,
    http: Client
  ): AnalyticsReportsTransactionsDetail {
    return ThAnalyticsBaseHandler.generateAuthenticatedInstance(
      AnalyticsReportsTransactionsDetail,
      options,
      http
    )
  }

  public async get(id?: string): Promise<AnalyticsReportsTransactionDetailResponseItem> {
    try {
      const { results: d } = await this.handleGet(
        `${this.options.base}/api/v2/analytics/${this.options.user}/reports/transactions/${id}/detail`
      )
      // eslint-disable-next-line
      // @ts-ignore
      const data = d.find(
        (item: ThAnalyticsBaseResultItem) =>
          item.metric.job === 'reports_transactions_v2_transaction_detail_data'
      ).values

      return {
        data: data[0],
        metaData: {
          count: 1,
          total_count: 1
        }
      } as AnalyticsReportsTransactionDetailResponseItem
    } catch (err) {
      throw new AnalyticsReportsTransactionDetailFetcshError(undefined, { error: err })
    }
  }
}

export class AnalyticsReportsTransactionsOverviewFetchError extends BaseError {
  public name = 'AnalyticsReportsTransactionsOverviewFetchError'
  constructor(
    public message: string = 'Could not fetch transaction overview. ',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AnalyticsReportsTransactionsOverviewFetchError.prototype)
  }
}

export class AnalyticsReportsTransactionDetailFetcshError extends BaseError {
  public name = 'AnalyticsReportsTransactionDetailFetcshError'
  constructor(
    public message: string = 'Could not fetch transaction detail. ',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AnalyticsReportsTransactionDetailFetcshError.prototype)
  }
}

export class AnalyticsReportsTransactionsOverviewExportFetchError extends BaseError {
  public name = 'AnalyticsReportsTransactionsOverviewExportFetchError'
  constructor(
    public message: string = 'Could not fetch transaction overview export. ',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AnalyticsReportsTransactionsOverviewExportFetchError.prototype)
  }
}
