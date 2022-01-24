import {
  ThAnalyticsBaseHandler,
  AnalyticsSocketsExportResponseItem
} from '../../../base'
import { Client } from '../../../client'
import { BaseError } from '../../../errors'
import { UriHelper } from '../../../uri-helper'

export interface DatevHandlerOptions {
  user?: string
  base?: string
}

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
  ): Promise<AnalyticsSocketsExportResponseItem> {
    try {
      const localUriHelper = new UriHelper('/api/v3/analytics', this.options)
      const uri = localUriHelper.generateBaseUri('/reports/datev')
      const result = await this.handleSocketsExport(uri, query)

      return result
    } catch (error: any) {
      throw new AnalyticsReportsV3DatevExportFetchError(error.message, { error })
    }
  }
}

export class AnalyticsReportsV3DatevExportFetchError extends BaseError {
  public name = 'AnalyticsReportsV3DatevExportFetchError'
  constructor (
    public message: string = 'Could not fetch datev report. ',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AnalyticsReportsV3DatevExportFetchError.prototype)
  }
}
