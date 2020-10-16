import { ThAnalyticsBaseHandler, ThAnalyticsBaseResultItem } from '../../../base'
import { Client } from '../../../client'
import { BaseError } from '../../../errors'

export interface TransactionsItemsHandlerOptions {
  user?: string
  base?: string
}

export interface AnalyticsReportsTransactionsItemsResponse {
    data: Array<Record<string, unknown>>
  summary: Record<string, unknown>[]
  metaData: {
    count: number
    total_count: number
  }
  next?: () => Promise<AnalyticsReportsTransactionsItemsResponse>
}

export class AnalyticsReportsTransactionsItems extends ThAnalyticsBaseHandler {
  http: Client
  public options: TransactionsItemsHandlerOptions

  constructor(options: TransactionsItemsHandlerOptions, http: Client) {
    super(http, options)
    this.options = options
    this.http = http
  }

  static create(options: Record<string, unknown>, http: Client): AnalyticsReportsTransactionsItems {
    return ThAnalyticsBaseHandler.generateAuthenticatedInstance(
      AnalyticsReportsTransactionsItems,
      options,
      http
    )
  }

  public async getAll(
    query?: Record<string, unknown>
  ): Promise<AnalyticsReportsTransactionsItemsResponse> {
    try {
      let nextFn
      const { results: d, next, status } = await this.handleGet(
        `${this.options.base}/api/v2/analytics/${this.options.user}/reports/transactions/items`,
        query
      )

      if (status !== 200)
        throw new AnalyticsReportsTransactionsItemsFetchError(undefined, { status: status })
      // eslint-disable-next-line
      // @ts-ignore
      const data = d.find(
        (item: ThAnalyticsBaseResultItem) =>
          item.metric.job === 'reports_transactions_items_v2_overview_data'
      ).values
      // eslint-disable-next-line
      // @ts-ignore
      const summary = d.find(
        (item: ThAnalyticsBaseResultItem) =>
          item.metric.job === 'reports_transactions_items_v2_overview_summary'
      ).values
      // eslint-disable-next-line
      // @ts-ignore
      const count = d.find(
        (item: ThAnalyticsBaseResultItem) =>
          item.metric.job === 'reports_transactions_items_v2_overview_filtered_meta'
      ).values[0]
      // eslint-disable-next-line
      // @ts-ignore
      const totalCount = d.find(
        (item: ThAnalyticsBaseResultItem) =>
          item.metric.job === 'reports_transactions_items_v2_overview_meta'
      ).values[0]

      if (next) {
        nextFn = (): Promise<AnalyticsReportsTransactionsItemsResponse> =>
          this.getAll({ uri: next })
      }

      return {
        data: data,
        summary: summary,
        metaData: {
          // eslint-disable-next-line
          // @ts-ignore
          count: count.count,
          // eslint-disable-next-line
          // @ts-ignore
          total_count: totalCount.count
        },
        next: nextFn
      }
    } catch (err) {
      throw new AnalyticsReportsTransactionsItemsFetchError(undefined, { error: err })
    }
  }
}

export class AnalyticsReportsTransactionsItemsFetchError extends BaseError {
  public name = 'AnalyticsReportsTransactionsItemsFetchError'
  constructor(
    public message: string = 'Could not fetch transactions items. ',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AnalyticsReportsTransactionsItemsFetchError.prototype)
  }
}
