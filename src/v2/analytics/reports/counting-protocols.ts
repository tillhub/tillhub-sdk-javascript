import {
  ThAnalyticsBaseHandler,
  ThAnalyticsBaseResultItem,
  ThAnalyticsExportsBaseResponse
} from '../../../base'
import { Client } from '../../../client'
import { BaseError } from '../../../errors'

export interface CountingProtocolsHandlerOptions {
  user?: string
  base?: string
}

export interface CountingProtocolsQuery {
  limit?: number
  uri?: string
  query?: {
    deleted?: boolean
    active?: boolean
    cashier?: string
    branch?: string
    amount?: string
    only_discrepancies?: boolean
    date_start?: string
    date_end?: string
    format?: string
    branch_custom_id?: string
    register_custom_id?: string
    cashier_staff?: string
    counting_type?: string
  }
}

export interface AnalyticsReportsCountingProtocolsResponse {
  data: CountingProtocol[]
  summary: Record<string, unknown>[]
  metaData: {
    count: number
    total_count: number
  }
  next?: () => Promise<AnalyticsReportsCountingProtocolsResponse>
}

export interface CountingProtocol {
  id: string
  insert_id?: number
  custom_id?: string
  branch?: string
  branch_custom_id?: string
  register?: string
  register_custom_id?: string
  client?: string
  client_custom_id?: string
  staff?: string
  cashier_staff?: string
  device?: string
  context?: string
  comments?: string
  location?: string
  cash_units?: Record<string, unknown>[]
  timezone?: string
  discrepancy?: boolean
  discrepancy_total?: string
  temp_staff?: string
  counting_type?: string
  counting_date?: string
  counting_tips?: string
  balance_number?: string
  balance_last?: string
  balance_custom_id_last?: string
  merchant_receipt?: string
  client_id?: string
  has_discrepancy?: boolean
  total_counted?: string
  total_calculated?: string
}

export type AnalyticsReportsCountingProtocolsExportResponseItem = ThAnalyticsExportsBaseResponse

export class AnalyticsReportsCountingProtocols extends ThAnalyticsBaseHandler {
  http: Client
  public options: CountingProtocolsHandlerOptions

  constructor(options: CountingProtocolsHandlerOptions, http: Client) {
    super(http, options)
    this.options = options
    this.http = http
  }

  static create(options: Record<string, unknown>, http: Client): AnalyticsReportsCountingProtocols {
    return ThAnalyticsBaseHandler.generateAuthenticatedInstance(
      AnalyticsReportsCountingProtocols,
      options,
      http
    )
  }

  public async getAll(
    query?: CountingProtocolsQuery
  ): Promise<AnalyticsReportsCountingProtocolsResponse> {
    try {
      let nextFn
      const { results: d, next, status } = await this.handleGet(
        `${this.options.base}/api/v2/analytics/${this.options.user}/reports/cashier_counting_protocols/overview`,
        query
      )

      if (status !== 200)
        throw new AnalyticsReportsCountingProtocolsFetchFailed(undefined, { status: status })

      // eslint-disable-next-line
      // @ts-ignore
      const data = d.find(
        (item: ThAnalyticsBaseResultItem) =>
          item.metric.job === 'reports_counting_protocols_v2_overview_data'
      ).values
      // eslint-disable-next-line
      // @ts-ignore
      const summary = d.find(
        (item: ThAnalyticsBaseResultItem) =>
          item.metric.job === 'reports_counting_protocols_v2_overview_summary'
      ).values
      // eslint-disable-next-line
      // @ts-ignore
      const count = d.find(
        (item: ThAnalyticsBaseResultItem) =>
          item.metric.job === 'reports_counting_protocols_v2_overview_filtered_meta'
      ).values[0]
      // eslint-disable-next-line
      // @ts-ignore
      const totalCount = d.find(
        (item: ThAnalyticsBaseResultItem) =>
          item.metric.job === 'reports_counting_protocols_v2_overview_meta'
      ).values[0]

      if (next) {
        nextFn = (): Promise<AnalyticsReportsCountingProtocolsResponse> =>
          this.getAll({ uri: next })
      }

      // eslint-disable-next-line
      // @ts-ignore
      return {
        data,
        summary,
        metaData: {
          count: count.count,
          total_count: totalCount.count
        },
        next: nextFn
      } as AnalyticsReportsCountingProtocolsResponse
    } catch (err) {
      throw new AnalyticsReportsCountingProtocolsFetchFailed(undefined, { error: err })
    }
  }

  public async export(
    query?: Record<string, unknown>
  ): Promise<AnalyticsReportsCountingProtocolsExportResponseItem> {
    try {
      const result = await this.handleExport(
        `${this.options.base}/api/v2/analytics/${this.options.user}/reports/cashier_counting_protocols/overview`,
        query
      )
      return result
    } catch (err) {
      throw new AnalyticsReportsCountingProtocolsExportFetchError(undefined, { error: err })
    }
  }
}

export class AnalyticsReportsCountingProtocolsFetchFailed extends BaseError {
  public name = 'AnalyticsReportsCountingProtocolsFetchFailed'
  constructor(
    public message: string = 'Could not fetch the counting protocols report',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AnalyticsReportsCountingProtocolsFetchFailed.prototype)
  }
}

export class AnalyticsReportsCountingProtocolsExportFetchError extends BaseError {
  public name = 'AnalyticsReportsCountingProtocolsExportFetchError'
  constructor(
    public message: string = 'Could not fetch counting protocols export. ',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AnalyticsReportsCountingProtocolsExportFetchError.prototype)
  }
}
