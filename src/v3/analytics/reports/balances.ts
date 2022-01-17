import { ThAnalyticsBaseHandler } from '../../../base'
import { Client } from '../../../client'
import { BaseError } from '../../../errors'
import { UriHelper } from '../../../uri-helper'

export interface BalancesHandlerOptions {
  user?: string
  base?: string
}

export interface AnalyticsReportsBalancesV3ExportResponseItem {
  correlationId?: string
}

export interface AnalyticsResponse {
  data: AnalyticsReportsBalancesV3ExportResponseItem[]
  metadata: Record<string, unknown>
  msg?: string
}

export class AnalyticsReportsBalances extends ThAnalyticsBaseHandler {
  http: Client
  public options: BalancesHandlerOptions

  constructor (options: BalancesHandlerOptions, http: Client) {
    super(http, options)
    this.options = options
    this.http = http
  }

  static create (options: Record<string, unknown>, http: Client): AnalyticsReportsBalances {
    return ThAnalyticsBaseHandler.generateAuthenticatedInstance(
      AnalyticsReportsBalances,
      options,
      http
    )
  }

  public async export (
    query?: Record<string, unknown>
  ): Promise<AnalyticsResponse> {
    try {
      const localUriHelper = new UriHelper('/api/v3/analytics', this.options)
      const base = localUriHelper.generateBaseUri('/reports/balances/overview')
      const uri = localUriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new AnalyticsReportsV3BalancesExportFetchError()
      return {
        data: response.data.results,
        metadata: {
          count: response.data.count
        }
      }
    } catch (error: any) {
      throw new AnalyticsReportsV3BalancesExportFetchError(error.message, { error })
    }
  }
}

export class AnalyticsReportsV3BalancesExportFetchError extends BaseError {
  public name = 'AnalyticsReportsV3BalancesExportFetchError'
  constructor (
    public message: string = 'Could not fetch balances report export.',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AnalyticsReportsV3BalancesExportFetchError.prototype)
  }
}
