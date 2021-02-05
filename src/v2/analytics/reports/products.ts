import { Client } from '../../../client'
import { BaseError } from '../../../errors'
import { UriHelper } from '../../../uri-helper'

export interface AnalyticsResponse {
  data: Array<Record<string, unknown>>
  metadata: Record<string, unknown>
  msg?: string
}

export interface AnalyticsOptions {
  user?: string
  base?: string
}

export interface ProductsOptions {
  [key: string]: any
  branch_id?: string
  register_id?: string
  staff_id?: string
  limit?: number
  offset?: number
  start?: string
  end?: string
  q?: string
  format?: string
}

export class AnalyticsReportsProducts {
  endpoint: string
  http: Client
  public options: AnalyticsOptions
  public uriHelper: UriHelper

  constructor (options: AnalyticsOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v2/analytics'
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (query?: ProductsOptions | undefined): Promise<AnalyticsResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/reports/products')
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new AnalyticsReportsProductsFetchFailed()
      return {
        data: response.data.results,
        metadata: {
          count: response.data.count
        }
      }
    } catch (err) {
      throw new AnalyticsReportsProductsFetchFailed(undefined, { error: err })
    }
  }
}

export class AnalyticsReportsProductsFetchFailed extends BaseError {
  public name = 'AnalyticsReportsProductsFetchFailed'
  constructor (
    public message: string = 'Could not fetch the products analytics reports',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AnalyticsReportsProductsFetchFailed.prototype)
  }
}
