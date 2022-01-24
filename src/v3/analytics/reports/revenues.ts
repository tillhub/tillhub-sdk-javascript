import {
  ThAnalyticsBaseHandler,
  AnalyticsSocketsExportResponseItem
} from '../../../base'
import { Client } from '../../../client'
import { BaseError } from '../../../errors'
import { UriHelper } from '../../../uri-helper'

export interface RevenuesHandlerOptions {
  user?: string
  base?: string
}

export class AnalyticsReportsRevenues extends ThAnalyticsBaseHandler {
  http: Client
  public options: RevenuesHandlerOptions

  constructor (options: RevenuesHandlerOptions, http: Client) {
    super(http, options)
    this.options = options
    this.http = http
  }

  static create (options: Record<string, unknown>, http: Client): AnalyticsReportsRevenues {
    return ThAnalyticsBaseHandler.generateAuthenticatedInstance(
      AnalyticsReportsRevenues,
      options,
      http
    )
  }

  public async export (
    query?: Record<string, unknown>
  ): Promise< AnalyticsSocketsExportResponseItem
    > {
    try {
      const localUriHelper = new UriHelper('/api/v3/analytics', this.options)
      const uri = localUriHelper.generateBaseUri('/reports/revenues/grouped')
      const result = await this.handleSocketsExport(uri, query)

      return result
    } catch (error: any) {
      throw new AnalyticsReportsV3RevenuesExportFetchError(error.message, { error })
    }
  }
}

export class AnalyticsReportsV3RevenuesExportFetchError extends BaseError {
  public name = 'AnalyticsReportsV3RevenuesExportFetchError'
  constructor (
    public message: string = 'Could not fetch revenues report export.',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AnalyticsReportsV3RevenuesExportFetchError.prototype)
  }
}
