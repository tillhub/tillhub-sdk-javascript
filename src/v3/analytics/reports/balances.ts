import { ThAnalyticsBaseHandler, AnalyticsSocketsExportResponseItem } from '../../../base'
import { Client } from '../../../client'
import { BaseError } from '../../../errors'
import { UriHelper } from '../../../uri-helper'

export interface BalancesHandlerOptions {
  user?: string
  base?: string
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
  ): Promise<AnalyticsSocketsExportResponseItem> {
    try {
      const localUriHelper = new UriHelper('/api/v3/analytics', this.options)
      const uri = localUriHelper.generateBaseUri('/reports/balances/overview')
      const result = await this.handleSocketsExport(uri, query)

      return result
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
