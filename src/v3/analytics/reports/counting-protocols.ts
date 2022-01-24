import { ThAnalyticsBaseHandler, AnalyticsSocketsExportResponseItem } from '../../../base'
import { Client } from '../../../client'
import {
  AnalyticsReportsCountingProtocolsExportFetchError
} from '../../../v2/analytics/reports/counting-protocols'
import { AnalyticsOptions } from '../../../v0/analytics'

import { UriHelper } from '../../../uri-helper'

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
  ): Promise<AnalyticsSocketsExportResponseItem> {
    try {
      const localUriHelper = new UriHelper('/api/v3/analytics', this.options)
      const uri = localUriHelper.generateBaseUri('/reports/cashier_counting_protocols/overview')
      const result = await this.handleSocketsExport(uri, query)

      return result
    } catch (error: any) {
      throw new AnalyticsReportsCountingProtocolsExportFetchError(error.message, { error })
    }
  }
}
