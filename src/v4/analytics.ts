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

export interface AnalyticsOptions {
  user?: string
  base?: string
}

export interface AnalyticsQuery {
  compare?: boolean
  branch?: string
  currency: string
  end: Date
  start: Date
}

export interface AnalyticsRevenueTopProductsQuery extends AnalyticsQuery {
  orderBy?: string
  orderDirection?: string
}

export interface AnalyticsResponse {
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

  async getRevenue (query?: AnalyticsQuery): Promise<AnalyticsResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/revenue')
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)

      return {
        data: response.data.results[0]
      }
    } catch (error: any) {
      throw new AnalyticsGetRevenueFailed(error.message)
    }
  }

  async getRevenueAverage (query?: AnalyticsQuery): Promise<AnalyticsResponse> {
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

  async getRevenueTopProducts (query?: AnalyticsRevenueTopProductsQuery): Promise<AnalyticsResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/revenue/top-products')
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)

      return {
        data: response.data.results[0]
      }
    } catch (error: any) {
      throw new AnalyticsGetRevenueTopProductsFailed(error.message)
    }
  }

  async getRevenuePaymentTypes (query?: AnalyticsQuery): Promise<AnalyticsResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/payment-options')
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)

      return {
        data: response.data.results[0]
      }
    } catch (error: any) {
      throw new AnalyticsGetRevenuePaymentTypesFailed(error.message)
    }
  }

  async getOpenPurchaseOrdersCount (query?: AnalyticsQuery): Promise<AnalyticsResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/open-purchase-orders/count')
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)

      return {
        data: response.data.results[0]
      }
    } catch (error: any) {
      throw new AnalyticsGetOpenPurchaseOrdersCountFailed(error.message)
    }
  }

  async getOpenPurchaseOrdersExpense (query?: AnalyticsQuery): Promise<AnalyticsResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/open-purchase-orders/expense')
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)

      return {
        data: response.data.results[0]
      }
    } catch (error: any) {
      throw new AnalyticsGetOpenPurchaseOrdersExpenseFailed(error.message)
    }
  }

  async getProductsReturnRate (query?: AnalyticsQuery): Promise<AnalyticsResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/products-return-rate')
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)

      return {
        data: response.data.results[0]
      }
    } catch (error: any) {
      throw new AnalyticsGetProductsReturnRateFailed(error.message)
    }
  }

  async getProductsTopGroups (query?: AnalyticsQuery): Promise<AnalyticsResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/revenue/top-product-groups')
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)

      return {
        data: response.data.results[0]
      }
    } catch (error: any) {
      throw new AnalyticsGetProductsTopGroupsFailed(error.message)
    }
  }

  async getCartItemsAverage (query?: AnalyticsQuery): Promise<AnalyticsResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/cartitems/average')
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)

      return {
        data: response.data.results[0]
      }
    } catch (error: any) {
      throw new AnalyticsGetCartItemsAverageFailed(error.message)
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

export class AnalyticsGetRevenueTopProductsFailed extends BaseError {
  public name = 'AnalyticsGetRevenueTopProductsFailed'
  constructor (
    public message: string = 'Could not get revenue top products',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AnalyticsGetRevenueTopProductsFailed.prototype)
  }
}

export class AnalyticsGetRevenuePaymentTypesFailed extends BaseError {
  public name = 'AnalyticsGetRevenuePaymentTypesFailed'
  constructor (
    public message: string = 'Could not get revenue payment types',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AnalyticsGetRevenuePaymentTypesFailed.prototype)
  }
}

export class AnalyticsGetOpenPurchaseOrdersCountFailed extends BaseError {
  public name = 'AnalyticsGetOpenPurchaseOrdersCountFailed'
  constructor (
    public message: string = 'Could not get open purchase orders count',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AnalyticsGetOpenPurchaseOrdersCountFailed.prototype)
  }
}

export class AnalyticsGetOpenPurchaseOrdersExpenseFailed extends BaseError {
  public name = 'AnalyticsGetOpenPurchaseOrdersExpenseFailed'
  constructor (
    public message: string = 'Could not get open purchase orders expense',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AnalyticsGetOpenPurchaseOrdersExpenseFailed.prototype)
  }
}

export class AnalyticsGetProductsReturnRateFailed extends BaseError {
  public name = 'AnalyticsGetProductsReturnRateFailed'
  constructor (
    public message: string = 'Could not get products return rate',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AnalyticsGetProductsReturnRateFailed.prototype)
  }
}

export class AnalyticsGetProductsTopGroupsFailed extends BaseError {
  public name = 'AnalyticsGetProductsTopGroupsFailed'
  constructor (
    public message: string = 'Could not get products top groups',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AnalyticsGetProductsTopGroupsFailed.prototype)
  }
}

export class AnalyticsGetCartItemsAverageFailed extends BaseError {
  public name = 'AnalyticsGetCartItemsAverageFailed'
  constructor (
    public message: string = 'Could not get cart items average',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AnalyticsGetCartItemsAverageFailed.prototype)
  }
}
