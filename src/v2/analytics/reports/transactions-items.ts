import { ThAnalyticsBaseHandler, ThAnalyticsBaseResultItem, AnalyticsSocketsExportResponseItem } from '../../../base'
import { Client } from '../../../client'
import { BaseError } from '../../../errors'
import { UriHelper } from '../../../uri-helper'
import { AnalyticsOptions } from '../../../v0/analytics'

export interface TransactionsItemsExportOptions {
  format?: string
  uri?: string
  register_custom_id?: string
  register?: string
  product?: string
  branch?: string
  limit?: number
  dates?: {
    start?: string
    end?: string
  }
}

export interface AnalyticsReportsTransactionsItemsResponse {
  data: Array<Record<string, unknown>>
  summary: Array<Record<string, unknown>>
  metaData: {
    count: number
    total_count: number
  }
  next?: () => Promise<AnalyticsReportsTransactionsItemsResponse>
}

export class AnalyticsReportsTransactionsItems extends ThAnalyticsBaseHandler {
  http: Client
  public options: AnalyticsOptions
  public timeout: AnalyticsOptions['timeout']

  constructor (options: AnalyticsOptions, http: Client) {
    super(http, options)
    this.options = options
    this.http = http
    this.timeout = options.timeout ?? this.http.getClient().defaults.timeout
  }

  static create (options: Record<string, unknown>, http: Client): AnalyticsReportsTransactionsItems {
    return ThAnalyticsBaseHandler.generateAuthenticatedInstance(
      AnalyticsReportsTransactionsItems,
      options,
      http
    )
  }

  public async getAll (
    query?: Record<string, unknown>
  ): Promise<AnalyticsReportsTransactionsItemsResponse> {
    try {
      let nextFn
      const localUriHelper = new UriHelper('/api/v2/analytics', this.options)
      const uri = localUriHelper.generateBaseUri('/reports/transactions/items')
      const { results: d, next, status } = await this.handleGet(uri, query, { timeout: this.timeout })

      if (status !== 200) { throw new AnalyticsReportsTransactionsItemsFetchError(undefined, { status: status }) }

      const data = d?.find(
        (item: ThAnalyticsBaseResultItem) =>
          item.metric.job === 'reports_transactions_items_v2_overview_data'
      )?.values ?? []

      const summary = d?.find(
        (item: ThAnalyticsBaseResultItem) =>
          item.metric.job === 'reports_transactions_items_v2_overview_summary'
      )?.values ?? []

      const count = d?.find(
        (item: ThAnalyticsBaseResultItem) =>
          item.metric.job === 'reports_transactions_items_v2_overview_filtered_meta'
      )?.values[0] ?? {}

      const totalCount = d?.find(
        (item: ThAnalyticsBaseResultItem) =>
          item.metric.job === 'reports_transactions_items_v2_overview_meta'
      )?.values[0] ?? {}

      if (next) {
        nextFn = (): Promise<AnalyticsReportsTransactionsItemsResponse> =>
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
    } catch (err: any) {
      throw new AnalyticsReportsTransactionsItemsFetchError(undefined, { error: err })
    }
  }

  public async export (
    query?: TransactionsItemsExportOptions
  ): Promise<AnalyticsSocketsExportResponseItem> {
    try {
      const localUriHelper = new UriHelper('/api/v2/analytics', this.options)
      const base = localUriHelper.generateBaseUri('/reports/transactions/items')
      const uri = localUriHelper.generateUriWithQuery(base, { format: 'csv', ...query })
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new AnalyticsReportsTransactionsItemsExportError(undefined, { status: response.status })
      }

      return {
        data: response.data.results,
        metadata: {}
      }
    } catch (err: any) {
      throw new AnalyticsReportsTransactionsItemsExportError(undefined, { error: err })
    }
  }
}

export class AnalyticsReportsTransactionsItemsFetchError extends BaseError {
  public name = 'AnalyticsReportsTransactionsItemsFetchError'
  constructor (
    public message: string = 'Could not fetch transactions items. ',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AnalyticsReportsTransactionsItemsFetchError.prototype)
  }
}

export class AnalyticsReportsTransactionsItemsExportError extends BaseError {
  public name = 'AnalyticsReportsTransactionsItemsExportError'
  constructor (
    public message: string = 'Could not export transactions items. ',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AnalyticsReportsTransactionsItemsExportError.prototype)
  }
}
