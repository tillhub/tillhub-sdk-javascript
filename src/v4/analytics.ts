import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface AnalyticsOptions {
  user?: string
  base?: string
}

export interface AnalyticsGetRevenueAverageQuery {
  compare?: boolean
  branch?: string
  end: Date
  start: Date
}

export interface AnalyticsGetRevenueAverageResponse {
  data: {
    series: Array<{
      period: 'current' | 'previous'
      data: number[]
      total: number
      unit: string
    }>
  }
}

export class Analytics extends ThBaseHandler {
  public static baseEndpoint = '/api/v4/analytics'
  endpoint: string
  http: Client
  public options: AnalyticsOptions
  public uriHelper: UriHelper

  constructor (options: AnalyticsOptions, http: Client) {
    super(http, {
      endpoint: Analytics.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = Analytics.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getRevenueAverage (
    query?: AnalyticsGetRevenueAverageQuery
  ): Promise<AnalyticsGetRevenueAverageResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/revenue/average')
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)

      return {
        data: response.data.results[0]
      }
    } catch (error: any) {
      throw new AnalyticsGetRevenueAverageFailed(error.message)
    }
  }
}

export class AnalyticsGetRevenueAverageFailed extends BaseError {
  public name = 'AnalyticsGetRevenueAverageFailed'
  constructor (
    public message: string = 'Could not get revenue average',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AnalyticsGetRevenueAverageFailed.prototype)
  }
}
