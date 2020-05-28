import { ThAnalyticsBaseHandler, ThAnalyticsBaseResultItem } from '../../../base'
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
    time?: string
    amount?: string
    discrepancy?: boolean
  }
}

export interface AnalyticsReportsCountingProtocolsResponse {
  data: CountingProtocol[]
  summary: object[]
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
  cash_units?: object[]
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

export class AnalyticsReportsCountingProtocols extends ThAnalyticsBaseHandler {
  http: Client
  public options: CountingProtocolsHandlerOptions

  constructor(options: CountingProtocolsHandlerOptions, http: Client) {
    super(http, options)
    this.options = options
    this.http = http
  }

  static create(options: object, http: Client): AnalyticsReportsCountingProtocols {
    return ThAnalyticsBaseHandler.generateAuthenticatedInstance(AnalyticsReportsCountingProtocols, options, http)
  }

  public async getAll(query?: CountingProtocolsQuery): Promise<AnalyticsReportsCountingProtocolsResponse> {
    try {
      let nextFn
      const { results: d, next, status } = await this.handleGet(`${this.options.base}/api/v2/analytics/${this.options.user}/reports/cashier_counting_protocols/overview`, query)

      if (status !== 200) throw new AnalyticsReportsCountingProtocolsFetchFailed(undefined, { status: status })

      // @ts-ignore
      const data = d.find((item: ThAnalyticsBaseResultItem) => (item.metric.job === 'reports_counting_protocols_v2_overview_data')).values
      // @ts-ignore
      const summary = d.find((item: ThAnalyticsBaseResultItem) => (item.metric.job === 'reports_counting_protocols_v2_overview_summary')).values
      // @ts-ignore
      const count = d.find((item: ThAnalyticsBaseResultItem) => (item.metric.job === 'reports_counting_protocols_v2_overview_filtered_meta')).values[0]
      // @ts-ignore
      const totalCount = d.find((item: ThAnalyticsBaseResultItem) => (item.metric.job === 'reports_counting_protocols_v2_overview_meta')).values[0]

      if (next) {
        nextFn = (): Promise<AnalyticsReportsCountingProtocolsResponse> => this.getAll({ uri: next })
      }

      return {
        data,
        summary,
        metaData: {
          // @ts-ignore
          count: count.count,
          // @ts-ignore
          total_count: totalCount.count
        },
        next: nextFn
      } as AnalyticsReportsCountingProtocolsResponse
    } catch (err) {
      throw new AnalyticsReportsCountingProtocolsFetchFailed(undefined, { error: err })
    }
  }
}

export class AnalyticsReportsCountingProtocolsFetchFailed extends BaseError {
  public name = 'AnalyticsReportsCountingProtocolsFetchFailed'
  constructor(public message: string = 'Could not fetch the counting protocols report', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, AnalyticsReportsCountingProtocolsFetchFailed.prototype)
  }
}
