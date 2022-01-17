import { ThAnalyticsBaseHandler } from '../../../base'
import { Client } from '../../../client'
import { BaseError } from '../../../errors'
import { UriHelper } from '../../../uri-helper'

export interface RevenuesHandlerOptions {
  user?: string
  base?: string
}

export interface AnalyticsReportsRevenuesV3ExportResponseItem {
  correlationId?: string
}

export interface AnalyticsResponse {
  data: AnalyticsReportsRevenuesV3ExportResponseItem[]
  metadata: Record<string, unknown>
  msg?: string
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
  ): Promise<AnalyticsResponse> {
    try {
      const localUriHelper = new UriHelper('/api/v3/analytics', this.options)
      const base = localUriHelper.generateBaseUri('/reports/revenues/grouped')
      const uri = localUriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new AnalyticsReportsV3RevenuesExportFetchError()
      return {
        data: response.data.results,
        metadata: {
          count: response.data.count
        }
      }
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
