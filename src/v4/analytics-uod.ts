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
  paymentMethodeCode: string
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
interface TopBranchResponse {
  data: {
    branch: string
    currency: string
    window: AggregationWindow
    totalBranch: number
    totalAll: number
  }
}

interface PaymentMethodRevenueResponse {
  data: {
    paymentMethodCode: string
    currency: string
    revenue: number
    totalCount: number
    totalRevenue: number
    rate: number
  }
}

interface PaymentMethodAcceptanceResponse {
  data: {
    paymentMethodCode: string
    currency: string
    successfulCount: number
    totalCount: number
    successRate: number
  }
}

interface PaymentMethodRejectionResponse {
  data: {
    code: string
    currency: string
    totalCount: number
    totalAllCount: number
    rate: number
  }
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

  async getRevenue (query?: AnalyticsUodQuery): Promise<AnalyticsUodResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/oms/revenue')
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)

      return {
        data: response.data.results[0]
      }
    } catch (error: any) {
      throw new AnalyticsGetRevenueFailed(error.message)
    }
  }

  async getRevenueTopBranchRate (): Promise<TopBranchResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/revenue/top-branch-rate')
      const uri = this.uriHelper.generateUriWithQuery(base)

      const response = await this.http.getClient().get(uri)

      return {
        data: response.data.results[0]
      }
    } catch (error: any) {
      throw new GetRevenueTopBranchRateFailed(error.message)
    }
  }

  async getPaymentMethodRevenue (): Promise<PaymentMethodRevenueResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/oms/payment-methods/revenue')
      const uri = this.uriHelper.generateUriWithQuery(base)

      const response = await this.http.getClient().get(uri)

      return {
        data: response.data.results[0]
      }
    } catch (error: any) {
      throw new GetPaymentMethodRevenueFailed(error.message)
    }
  }

  async getPaymentMethodAcceptance (): Promise<PaymentMethodAcceptanceResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/oms/payment-methods/acceptance')
      const uri = this.uriHelper.generateUriWithQuery(base)

      const response = await this.http.getClient().get(uri)

      return {
        data: response.data.results[0]
      }
    } catch (error: any) {
      throw new GetPaymentMethodAcceptanceFailed(error.message)
    }
  }

  async getPaymentMethodRejection (): Promise<PaymentMethodRejectionResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/oms/rejection')
      const uri = this.uriHelper.generateUriWithQuery(base)

      const response = await this.http.getClient().get(uri)

      return {
        data: response.data.results[0]
      }
    } catch (error: any) {
      throw new GetPaymentMethodRejectionFailed(error.message)
    }
  }
}
export class AnalyticsGetRevenueFailed extends BaseError {
  public name = 'AnalyticsGetRevenueFailed'
  constructor (
    public message: string = 'Could not get revenue',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AnalyticsGetRevenueFailed.prototype)
  }
}

export class GetRevenueTopBranchRateFailed extends BaseError {
  public name = 'GetRevenueTopBranchRateFailed'
  constructor (
    public message: string = 'Could not get revenue top branch rate',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, GetRevenueTopBranchRateFailed.prototype)
  }
}

export class GetPaymentMethodRevenueFailed extends BaseError {
  public name = 'GetPaymentMethodRevenueFailed'
  constructor (
    public message: string = 'Could not get payment method revenue',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, GetPaymentMethodRevenueFailed.prototype)
  }
}

export class GetPaymentMethodAcceptanceFailed extends BaseError {
  public name = 'GetPaymentMethodAcceptanceFailed'
  constructor (
    public message: string = 'Could not get payment method acceptance',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, GetPaymentMethodAcceptanceFailed.prototype)
  }
}

export class GetPaymentMethodRejectionFailed extends BaseError {
  public name = 'GetPaymentMethodRejectionFailed'
  constructor (
    public message: string = 'Could not get revenue payment types',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, GetPaymentMethodRejectionFailed.prototype)
  }
}
