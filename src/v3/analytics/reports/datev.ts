import { ThAnalyticsBaseHandler } from '../../../base'
import { Client } from '../../../client'
import { BaseError } from '../../../errors'
import { UriHelper } from '../../../uri-helper'

export interface DatevHandlerOptions {
  user?: string
  base?: string
}

export interface AnalyticsReportsDatevV3ExportResponseItem {
  correlationId?: string
}

export interface AnalyticsResponse {
  data: AnalyticsReportsDatevV3ExportResponseItem[]
  metadata: Record<string, unknown>
  msg?: string
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
  ): Promise<AnalyticsResponse> {
    try {
      const localUriHelper = new UriHelper('/api/v3/analytics', this.options)
      const base = localUriHelper.generateBaseUri('/reports/datev')
      const uri = localUriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new AnalyticsReportsV3DatevExportFetchError()
      return {
        data: response.data.results,
        metadata: {
          count: response.data.count
        }
      }
    } catch (err: any) {
      throw new AnalyticsReportsV3DatevExportFetchError(undefined, { error: err })
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
