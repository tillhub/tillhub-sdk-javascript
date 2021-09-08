import { ThAnalyticsBaseHandler, ThAnalyticsExportsBaseResponse } from '../../../base'
import { Client } from '../../../client'
import { BaseError } from '../../../errors'
import { UriHelper } from '../../../uri-helper'

export interface DatevHandlerOptions {
  user?: string
  base?: string
}

export type AnalyticsReportsDatevExportResponseItem = ThAnalyticsExportsBaseResponse

export class AnalyticsReportsDatev extends ThAnalyticsBaseHandler {
  http: Client
  public options: DatevHandlerOptions

  constructor (options: DatevHandlerOptions, http: Client) {
    super(http, options)
    this.options = options
    this.http = http
  }

  static create (options: Record<string, unknown>, http: Client): AnalyticsReportsDatev {
    return ThAnalyticsBaseHandler.generateAuthenticatedInstance(
      AnalyticsReportsDatev,
      options,
      http
    )
  }

  public async export (
    query?: Record<string, unknown>
  ): Promise<AnalyticsReportsDatevExportResponseItem> {
    try {
      const localUriHelper = new UriHelper('/api/v2/analytics', this.options)
      const uri = localUriHelper.generateBaseUri('/reports/datev')
      const result = await this.handleExport(uri, query)

      return result
    } catch (err: any) {
      throw new AnalyticsReportsDatevExportFetchError(undefined, { error: err })
    }
  }
}

export class AnalyticsReportsDatevExportFetchError extends BaseError {
  public name = 'AnalyticsReportsDatevExportFetchError'
  constructor (
    public message: string = 'Could not fetch datev report. ',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AnalyticsReportsDatevExportFetchError.prototype)
  }
}
