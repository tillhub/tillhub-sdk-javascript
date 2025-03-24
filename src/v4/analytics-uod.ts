import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

enum AggregationWindow {
  HOURLY = 'hourly',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  YEARLY = 'yearly'
}

export interface AnalyticsUodOptions {
  user?: string
  base?: string
}

export interface AnalyticsUodQuery {
  compare?: boolean
  branch?: string
  currency: string
  end: Date
  start: Date
}

export interface AnalyticsRevenueTopProductsQuery extends AnalyticsUodQuery {
  orderBy?: string
  orderDirection?: string
}

export interface AnalyticsUodResponse {
  data: {
    axisLabels?: string[]
    periods: AnalyticsResponsePeriods
    series: AnalyticsResponseSeries[]
    window: AggregationWindow
  }
}

interface AnalyticsResponsePeriods {
  current: {
    end: Date
    start: Date
  }
  previous: {
    end: Date
    start: Date
  }
}
interface AnalyticsResponseSeries {
  period: 'current' | 'previous'
  data: number[]
  total: number
  unit: string
}

export class AnalyticsUod extends ThBaseHandler {
  public static baseEndpoint = '/api/v4/analytics'
  endpoint: string
  http: Client
  public options: AnalyticsUodOptions
  public uriHelper: UriHelper

  constructor (options: AnalyticsUodOptions, http: Client) {
    super(http, {
      endpoint: AnalyticsUod.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = AnalyticsUod.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getRevenueTopBranchRate (): Promise<AnalyticsUodResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/revenue/top-branch-rate')
      const uri = this.uriHelper.generateUriWithQuery(base)

      const response = await this.http.getClient().get(uri)

      return {
        data: response.data.results[0]
      }
    } catch (error: any) {
      throw new AnalyticsGetRevenueTopBranchRateFailed(error.message)
    }
  }

  async getPaymentMethodRevenue (): Promise<AnalyticsUodResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/oms/payment-methods/revenue')
      const uri = this.uriHelper.generateUriWithQuery(base)

      const response = await this.http.getClient().get(uri)

      return {
        data: response.data.results[0]
      }
    } catch (error: any) {
      throw new AnalyticsGetPaymentMethodRevenueFailed(error.message)
    }
  }

  async getPaymentMethodAcceptance (): Promise<AnalyticsUodResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/oms/payment-methods/acceptance')
      const uri = this.uriHelper.generateUriWithQuery(base)

      const response = await this.http.getClient().get(uri)

      return {
        data: response.data.results[0]
      }
    } catch (error: any) {
      throw new AnalyticsGetPaymentMethodAcceptanceFailed(error.message)
    }
  }

  async getPaymentMethodRejection (): Promise<AnalyticsUodResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/oms/payment-methods/rejection')
      const uri = this.uriHelper.generateUriWithQuery(base)

      const response = await this.http.getClient().get(uri)

      return {
        data: response.data.results[0]
      }
    } catch (error: any) {
      throw new AnalyticsGetPaymentMethodRejectionFailed(error.message)
    }
  }
}

export class AnalyticsGetRevenueTopBranchRateFailed extends BaseError {
  public name = 'AnalyticsGetRevenueTopBranchRateFailed'
  constructor (
    public message: string = 'Could not get revenue top branch rate',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AnalyticsGetRevenueTopBranchRateFailed.prototype)
  }
}

export class AnalyticsGetPaymentMethodRevenueFailed extends BaseError {
  public name = 'AnalyticsGetPaymentMethodRevenueFailed'
  constructor (
    public message: string = 'Could not get payment method revenue',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AnalyticsGetPaymentMethodRevenueFailed.prototype)
  }
}

export class AnalyticsGetPaymentMethodAcceptanceFailed extends BaseError {
  public name = 'AnalyticsGetPaymentMethodAcceptanceFailed'
  constructor (
    public message: string = 'Could not get payment method acceptance',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AnalyticsGetPaymentMethodAcceptanceFailed.prototype)
  }
}

export class AnalyticsGetPaymentMethodRejectionFailed extends BaseError {
  public name = 'AnalyticsGetPaymentMethodRejectionFailed'
  constructor (
    public message: string = 'Could not get revenue payment types',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AnalyticsGetPaymentMethodRejectionFailed.prototype)
  }
}
