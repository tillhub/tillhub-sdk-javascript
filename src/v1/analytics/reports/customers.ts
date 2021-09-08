import { ThAnalyticsBaseHandler } from '../../../base'
import { CustomersQuery } from '../../../v0/analytics/reports/customers'
import { Client } from '../../../client'
import { BaseError } from '../../../errors'
import { UriHelper } from '../../../uri-helper'

export interface CustomersHandlerOptions {
  user?: string
  base?: string
}

export interface AnalyticsReportsCustomersV1ExportResponseItem {
  correlationId?: string
}

export interface AnalyticsResponse {
  data: AnalyticsReportsCustomersV1ExportResponseItem[]
  metadata: Record<string, unknown>
  msg?: string
}

export class AnalyticsReportsCustomers extends ThAnalyticsBaseHandler {
  http: Client
  public options: CustomersHandlerOptions

  constructor (options: CustomersHandlerOptions, http: Client) {
    super(http, options)
    this.options = options
    this.http = http
  }

  static create (options: Record<string, unknown>, http: Client): AnalyticsReportsCustomers {
    return ThAnalyticsBaseHandler.generateAuthenticatedInstance(
      AnalyticsReportsCustomers,
      options,
      http
    )
  }

  public async getAll (
    query?: CustomersQuery
  ): Promise<AnalyticsResponse> {
    try {
      const localUriHelper = new UriHelper('/api/v1/analytics', this.options)
      const base = localUriHelper.generateBaseUri('/reports/customers')
      const uri = localUriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new AnalyticsReportsV1CustomersFetchError()
      return {
        data: response.data.results,
        metadata: {
          count: response.data.count
        }
      }
    } catch (err: any) {
      throw new AnalyticsReportsV1CustomersFetchError(undefined, { error: err })
    }
  }
}

export class AnalyticsReportsV1CustomersFetchError extends BaseError {
  public name = 'AnalyticsReportsV1CustomersFetchError'
  constructor (
    public message: string = 'Could not fetch customers report',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AnalyticsReportsV1CustomersFetchError.prototype)
  }
}
