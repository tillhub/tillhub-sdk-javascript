import { ThAnalyticsBaseHandler } from '../../../base'
import { ProductGroupsOptions } from '../../../v0/analytics'
import { Client, Timeout } from '../../../client'
import { BaseError } from '../../../errors'
import { UriHelper } from '../../../uri-helper'

export interface ProductGroupsHandlerOptions {
  user?: string
  base?: string
  timeout?: Timeout
}

export interface AnalyticsReportsProductGroupsV1ExportResponseItem {
  correlationId?: string
}

export interface AnalyticsResponse {
  data: AnalyticsReportsProductGroupsV1ExportResponseItem[]
  metadata: Record<string, unknown>
  msg?: string
}

export class AnalyticsReportsProductGroups extends ThAnalyticsBaseHandler {
  http: Client
  public options: ProductGroupsHandlerOptions
  public timeout: Timeout

  constructor (options: ProductGroupsHandlerOptions, http: Client) {
    super(http, options)
    this.options = options
    this.http = http
    this.timeout = options.timeout ?? this.http.getClient().defaults.timeout
  }

  static create (options: Record<string, unknown>, http: Client): AnalyticsReportsProductGroups {
    return ThAnalyticsBaseHandler.generateAuthenticatedInstance(
      AnalyticsReportsProductGroups,
      options,
      http
    )
  }

  public async getAll (
    query?: ProductGroupsOptions
  ): Promise<AnalyticsResponse> {
    try {
      const localUriHelper = new UriHelper('/api/v1/analytics', this.options)
      const base = localUriHelper.generateBaseUri('/reports/product_groups')
      const uri = localUriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri, { timeout: this.timeout })
      if (response.status !== 200) throw new AnalyticsReportsV1ProductGroupsFetchError()
      return {
        data: response.data.results,
        metadata: {
          count: response.data.count
        }
      }
    } catch (error: any) {
      throw new AnalyticsReportsV1ProductGroupsFetchError(error.message, { error })
    }
  }
}

export class AnalyticsReportsV1ProductGroupsFetchError extends BaseError {
  public name = 'AnalyticsReportsV1ProductGroupsFetchError'
  constructor (
    public message: string = 'Could not fetch product groups report',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AnalyticsReportsV1ProductGroupsFetchError.prototype)
  }
}
