import { ThAnalyticsBaseHandler, ThAnalyticsBaseResultItem, ThAnalyticsExportsBaseResponse } from '../../../base'
import { Client } from '../../../client'
import { BaseError } from '../../../errors'

export interface RevenueHandlerOptions {
  user?: string
  base?: string
}

export interface AnalyticsReportsRevenuesGroupedResponseItem {
  data: object[]
  summary: object[]
  metaData: {
    count: number
    total_count: number
  }
  next?: () => Promise<AnalyticsReportsRevenuesGroupedResponseItem>
}

export interface AnalyticsReportsRevenuesGroupedExportResponseItem extends ThAnalyticsExportsBaseResponse {

}

export class AnalyticsReportsRevenuesGrouped extends ThAnalyticsBaseHandler {
  http: Client
  public options: RevenueHandlerOptions

  constructor(options: RevenueHandlerOptions, http: Client) {
    super(http, options)
    this.options = options
    this.http = http
  }

  static create(options: object, http: Client): AnalyticsReportsRevenuesGrouped {
    return ThAnalyticsBaseHandler.generateAuthenticatedInstance(AnalyticsReportsRevenuesGrouped, options, http)
  }

  public async getAll(query?: object): Promise<AnalyticsReportsRevenuesGroupedResponseItem> {
    try {
      let nextFn
      const { results: d, next } = await this.handleGet(`${this.options.base}/api/v2/analytics/${this.options.user}/reports/revenues/grouped`, query)
      if (!d) {
        throw new TypeError('Unexpectedly did not return data.')
      }

      // @ts-ignore
      const data = (d.find((item: ThAnalyticsBaseResultItem) => (item.metric.job === 'reports_revenues_items_v2_data')) || {}).values
      // @ts-ignore
      const summary = d.find((item: ThAnalyticsBaseResultItem) => (item.metric.job === 'reports_revenues_items_v2_summary')).values

      if (next) {
        nextFn = (): Promise<AnalyticsReportsRevenuesGroupedResponseItem> => this.getAll({ uri: next })
      }

      return {
        data: data,
        summary: summary,
        metaData: {

        },
        next: nextFn
      } as AnalyticsReportsRevenuesGroupedResponseItem
    } catch (err) {
      throw new AnalyticsReportsRevenuesGroupedFetchError(undefined, { error: err })
    }
  }

  public async export(query?: object): Promise<AnalyticsReportsRevenuesGroupedExportResponseItem> {
    try {
      const result = await this.handleExport(`${this.options.base}/api/v2/analytics/${this.options.user}/reports/revenues/grouped`, query)
      return result
    } catch (err) {
      throw new AnalyticsReportsRevenuesGroupedExportFetchError(undefined, { error: err })
    }
  }
}

export class AnalyticsReportsRevenuesGroupedFetchError extends BaseError {
  public name = 'AnalyticsReportsRevenuesGroupedFetchError'
  constructor(public message: string = 'Could not fetch revenue items. ', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, AnalyticsReportsRevenuesGroupedFetchError.prototype)
  }
}

export class AnalyticsReportsRevenuesGroupedExportFetchError extends BaseError {
  public name = 'AnalyticsReportsRevenuesGroupedExportFetchError'
  constructor(public message: string = 'Could not fetch revenue grouped export. ', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, AnalyticsReportsRevenuesGroupedExportFetchError.prototype)
  }
}
