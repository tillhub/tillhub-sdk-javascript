import { ThAnalyticsBaseHandler } from '../../../base'
import { Client } from '../../../client'
import {
  AnalyticsReportsCountingProtocolsExportResponseItem,
  AnalyticsReportsCountingProtocolsExportFetchError
} from '../../../v2/analytics/reports/counting-protocols'
import { AnalyticsOptions } from '../../../v0/analytics'

import { UriHelper } from '../../../uri-helper'

export interface AnalyticsResponse {
  data: AnalyticsReportsCountingProtocolsExportResponseItem[]
  metadata: Record<string, unknown>
  msg?: string
}

export class AnalyticsReportsCountingProtocols extends ThAnalyticsBaseHandler {
  http: Client
  public options: AnalyticsOptions

  constructor (options: AnalyticsOptions, http: Client) {
    super(http, options)
    this.options = options
    this.http = http
  }

  static create (options: Record<string, unknown>, http: Client): AnalyticsReportsCountingProtocols {
    return ThAnalyticsBaseHandler.generateAuthenticatedInstance(
      AnalyticsReportsCountingProtocols,
      options,
      http
    )
  }

  public async export (
    query?: Record<string, unknown>
  ): Promise<AnalyticsResponse> {
    try {
      const localUriHelper = new UriHelper('/api/v3/analytics', this.options)
      const base = localUriHelper.generateBaseUri('/reports/cashier_counting_protocols/overview')
      const uri = localUriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new AnalyticsReportsCountingProtocolsExportFetchError()
      return {
        data: response.data.results,
        metadata: {
          count: response.data.count
        }
      }
    } catch (error: any) {
      throw new AnalyticsReportsCountingProtocolsExportFetchError(error.message, { error })
    }
  }
}
