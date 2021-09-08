import { ThAnalyticsBaseHandler } from '../../../base'
import { VatQuery } from '../../../v0/analytics/reports/vat'
import { Client } from '../../../client'
import { BaseError } from '../../../errors'
import { UriHelper } from '../../../uri-helper'

export interface VatHandlerOptions {
  user?: string
  base?: string
}

export interface AnalyticsReportsVatV1ExportResponseItem {
  correlationId?: string
}

export interface AnalyticsResponse {
  data: AnalyticsReportsVatV1ExportResponseItem[]
  metadata: Record<string, unknown>
  msg?: string
}

export class AnalyticsReportsVat extends ThAnalyticsBaseHandler {
  http: Client
  public options: VatHandlerOptions

  constructor (options: VatHandlerOptions, http: Client) {
    super(http, options)
    this.options = options
    this.http = http
  }

  static create (options: Record<string, unknown>, http: Client): AnalyticsReportsVat {
    return ThAnalyticsBaseHandler.generateAuthenticatedInstance(
      AnalyticsReportsVat,
      options,
      http
    )
  }

  public async getAll (
    query?: VatQuery
  ): Promise<AnalyticsResponse> {
    try {
      const localUriHelper = new UriHelper('/api/v1/analytics', this.options)
      const base = localUriHelper.generateBaseUri('/reports/vat')
      const uri = localUriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new AnalyticsReportsV1VatFetchError()
      return {
        data: response.data.results,
        metadata: {
          count: response.data.count
        }
      }
    } catch (err: any) {
      throw new AnalyticsReportsV1VatFetchError(undefined, { error: err })
    }
  }
}

export class AnalyticsReportsV1VatFetchError extends BaseError {
  public name = 'AnalyticsReportsV1VatFetchError'
  constructor (
    public message: string = 'Could not fetch vat report',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AnalyticsReportsV1VatFetchError.prototype)
  }
}
