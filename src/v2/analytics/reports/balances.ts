import { ThAnalyticsBaseHandler, ThAnalyticsBaseResultItem } from '../../../base'
import { Client } from '../../../client'
import { BaseError } from '../../../errors'

export interface BalancesHandlerOptions {
  user?: string
  base?: string
}

export interface AnalyticsReportsBalancesOverviewResponseItem {
  data: object[]
  summary: object[]
  metaData: {
    count: number
    total_count: number
  }
}

export interface AnalyticsReportsBalancesDetailResponseItem {
  data: object
  metaData: {
    count: number
    total_count: number
  }
}

export class AnalyticsReportsBalancesOverview extends ThAnalyticsBaseHandler {
  http: Client
  public options: BalancesHandlerOptions

  constructor(options: BalancesHandlerOptions, http: Client) {
    super(http, options)
    this.options = options
    this.http = http
  }

  static create(options: object, http: Client): AnalyticsReportsBalancesOverview {
    return ThAnalyticsBaseHandler.generateAuthenticatedInstance(AnalyticsReportsBalancesOverview, options, http)
  }

  public async getAll(query?: object): Promise<AnalyticsReportsBalancesOverviewResponseItem> {
    try {
      const d = await this.handleGet(`${this.options.base}/api/v2/analytics/${this.options.user}/reports/balances/overview`, query)

      // @ts-ignore
      const data = d.find((item: ThAnalyticsBaseResultItem) => (item.metric.job === 'reports_balances_v2_overview_data')).values
      // @ts-ignore
      const summary = d.find((item: ThAnalyticsBaseResultItem) => (item.metric.job === 'reports_balances_v2_overview_summary')).values
      // @ts-ignore
      const count = d.find((item: ThAnalyticsBaseResultItem) => (item.metric.job === 'reports_balances_v2_overview_filtered_meta')).values[0]
      // @ts-ignore
      const totalCount = d.find((item: ThAnalyticsBaseResultItem) => (item.metric.job === 'reports_balances_v2_overview_meta')).values[0]

      return {
        data: data,
        summary: summary,
        metaData: {
          // @ts-ignore
          count: count.count,
          // @ts-ignore
          total_count: totalCount.count
        }
      }
    } catch (err) {
      throw new AnalyticsReportsBalancesOverviewFetchError(undefined, { error: err })
    }
  }
}

export class AnalyticsReportsBalancesDetail extends ThAnalyticsBaseHandler {
  http: Client
  public options: BalancesHandlerOptions

  constructor(options: BalancesHandlerOptions, http: Client) {
    super(http, options)
    this.options = options
    this.http = http
  }

  static create(options: object, http: Client): AnalyticsReportsBalancesDetail {
    return ThAnalyticsBaseHandler.generateAuthenticatedInstance(AnalyticsReportsBalancesDetail, options, http)
  }

  public async get(id?: string): Promise<AnalyticsReportsBalancesDetailResponseItem> {
    try {
      const d = await this.handleGet(`${this.options.base}/api/v2/analytics/${this.options.user}/reports/balances/${id}/detail`)

      // @ts-ignore
      const data = d.find((item: ThAnalyticsBaseResultItem) => (item.metric.job === 'reports_balances_v2_balance_detail_data')).values

      return {
        data: data[0],
        metaData: {
          count: 1,
          total_count: 1
        }
      } as AnalyticsReportsBalancesDetailResponseItem
    } catch (err) {
      throw new AnalyticsReportsTransactionDetailFetcshError(undefined, { error: err })
    }
  }
}

export class AnalyticsReportsBalancesOverviewFetchError extends BaseError {
  public name = 'AnalyticsReportsBalancesOverviewFetchError'
  constructor(public message: string = 'Could not fetch balance overview. ', properties?: any) {
    super(message, properties)
  }
}

export class AnalyticsReportsTransactionDetailFetcshError extends BaseError {
  public name = 'AnalyticsReportsTransactionDetailFetcshError'
  constructor(public message: string = 'Could not fetch balance detail. ', properties?: any) {
    super(message, properties)
  }
}
