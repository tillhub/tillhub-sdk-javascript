import {
  ThAnalyticsBaseHandler,
  ThAnalyticsBaseResultItem,
  ThAnalyticsExportsBaseResponse
} from '../../../base'
import { Client } from '../../../client'
import { BaseError } from '../../../errors'
import { UriHelper } from '../../../uri-helper'
import { AnalyticsOptions } from '../../../v0/analytics'

export interface AnalyticsReportsBalancesOverviewResponseItem {
  data: Array<Record<string, unknown>>
  summary: Array<Record<string, unknown>>
  metaData: {
    count: number
    total_count: number
  }
  next?: () => Promise<AnalyticsReportsBalancesOverviewResponseItem>
}

export interface AnalyticsReportsBalancesDetailResponseItem {
  data: Record<string, unknown>
  metaData: {
    count: number
    total_count: number
  }
}

export type AnalyticsReportsBalancesOverviewExportResponseItem = ThAnalyticsExportsBaseResponse

export class AnalyticsReportsBalancesOverview extends ThAnalyticsBaseHandler {
  http: Client
  public options: AnalyticsOptions
  public timeout: AnalyticsOptions['timeout']

  constructor (options: AnalyticsOptions, http: Client) {
    super(http, options)
    this.options = options
    this.http = http
    this.timeout = options.timeout ?? this.http.getClient().defaults.timeout
  }

  static create (options: Record<string, unknown>, http: Client): AnalyticsReportsBalancesOverview {
    return ThAnalyticsBaseHandler.generateAuthenticatedInstance(
      AnalyticsReportsBalancesOverview,
      options,
      http
    )
  }

  public async getAll (
    query?: Record<string, unknown>
  ): Promise<AnalyticsReportsBalancesOverviewResponseItem> {
    try {
      let nextFn
      const localUriHelper = new UriHelper('/api/v2/analytics', this.options)
      const uri = localUriHelper.generateBaseUri('/reports/balances/overview')
      const { results: d, next } = await this.handleGet(uri, query, { timeout: this.timeout })

      const data = d?.find(
        (item: ThAnalyticsBaseResultItem) => item.metric.job === 'reports_balances_v2_overview_data'
      )?.values ?? []

      const summary = d?.find(
        (item: ThAnalyticsBaseResultItem) =>
          item.metric.job === 'reports_balances_v2_overview_summary'
      )?.values ?? []

      const count = d?.find(
        (item: ThAnalyticsBaseResultItem) =>
          item.metric.job === 'reports_balances_v2_overview_filtered_meta'
      )?.values[0] ?? {}

      const totalCount = d?.find(
        (item: ThAnalyticsBaseResultItem) => item.metric.job === 'reports_balances_v2_overview_meta'
      )?.values[0] ?? {}

      if (next) {
        nextFn = (): Promise<AnalyticsReportsBalancesOverviewResponseItem> =>
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
      throw new AnalyticsReportsBalancesOverviewFetchError(undefined, { error: err })
    }
  }

  public async export (
    query?: Record<string, unknown>
  ): Promise<AnalyticsReportsBalancesOverviewExportResponseItem> {
    try {
      const localUriHelper = new UriHelper('/api/v2/analytics', this.options)
      const uri = localUriHelper.generateBaseUri('/reports/balances/overview')
      const result = await this.handleExport(uri, query)
      return result
    } catch (err: any) {
      throw new AnalyticsReportsBalancesOverviewExportFetchError(undefined, { error: err })
    }
  }
}

export class AnalyticsReportsBalancesDetail extends ThAnalyticsBaseHandler {
  http: Client
  public options: AnalyticsOptions
  public timeout: AnalyticsOptions['timeout']

  constructor (options: AnalyticsOptions, http: Client) {
    super(http, options)
    this.options = options
    this.http = http
    this.timeout = options.timeout ?? this.http.getClient().defaults.timeout
  }

  static create (options: Record<string, unknown>, http: Client): AnalyticsReportsBalancesDetail {
    return ThAnalyticsBaseHandler.generateAuthenticatedInstance(
      AnalyticsReportsBalancesDetail,
      options,
      http
    )
  }

  public async get (id: string): Promise<AnalyticsReportsBalancesDetailResponseItem> {
    try {
      const localUriHelper = new UriHelper('/api/v2/analytics', this.options)
      const uri = localUriHelper.generateBaseUri(`/reports/balances/${id}/detail`)
      const { results: d } = await this.handleGet(uri, { timeout: this.timeout })

      const data = d?.find(
        (item: ThAnalyticsBaseResultItem) =>
          item.metric.job === 'reports_balances_v2_balance_detail_data'
      )?.values ?? []

      return {
        data: data[0],
        metaData: {
          count: 1,
          total_count: 1
        }
      }
    } catch (err: any) {
      throw new AnalyticsReportsTransactionDetailFetcshError(undefined, { error: err })
    }
  }
}

export class AnalyticsReportsBalancesOverviewFetchError extends BaseError {
  public name = 'AnalyticsReportsBalancesOverviewFetchError'
  constructor (
    public message: string = 'Could not fetch balance overview. ',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AnalyticsReportsBalancesOverviewFetchError.prototype)
  }
}

export class AnalyticsReportsTransactionDetailFetcshError extends BaseError {
  public name = 'AnalyticsReportsTransactionDetailFetcshError'
  constructor (
    public message: string = 'Could not fetch balance detail. ',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AnalyticsReportsTransactionDetailFetcshError.prototype)
  }
}

export class AnalyticsReportsBalancesOverviewExportFetchError extends BaseError {
  public name = 'AnalyticsReportsBalancesOverviewExportFetchError'
  constructor (
    public message: string = 'Could not fetch balance overview export. ',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AnalyticsReportsBalancesOverviewExportFetchError.prototype)
  }
}
