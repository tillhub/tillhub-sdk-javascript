import qs from 'qs'
import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'
import { Balances } from './analytics/reports/balances'
import { PaymentOptions } from './analytics/reports/payment_options'
import { Payments } from './analytics/reports/payments'
import { Vat } from './analytics/reports/vat'
import { Customers } from './analytics/reports/customers'

export type StaffID = string | null

export interface AnalyticsOptions {
  user?: string
  base?: string
}

export interface AnalyticsResponse {
  data: object[]
  metadata: object
  msg?: string
}

export interface RevenuBasicOptions {
  branch_number?: string | null
  start: string
  end: string
}

export type RevenuePeriods = 'hour' | 'day'

export interface RevenuesOptions {
  branch_number?: string | null
  precision?: RevenuePeriods
  start: string
  end: string
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

export interface VoucherOptions {
  [key: string]: any
  voucher_number?: string
  redeemed_id?: string
  redeemed_branch?: string
  redeemed_email?: string
  redeemed_external_custom_id?: string
  redeemed_at_start?: string
  redeemed_at_end?: string
  issuer?: string
  issued_at_start?: string
  issued_at_end?: string
  valid_until_start?: string
  valid_until_end?: string
  comment?: string
  q?: string
  amount_old?: string
  amount_new?: string
  currency?: string
  delta?: string
  type?: 'update:update' | 'update:decrement' | 'update:increment' | 'create'
}

export interface ExportFormatOptions {
  format?: string,
  branch_number?: number
}

export interface CustomersTransactionOptions {
  customer_id: string | null
  currency?: string
}

export interface SimpleSalesCartItemsOptions {
  [key: string]: any
  start?: string
  end?: string
  embed?: string | string[]
  include?: string | string[]
}

export interface PaymentsReportOptions {
  [key: string]: any
}

export interface ProductGoupsOptions {
  description?: string
  product_group_id?: string
  qty?: {
    from: number
    to: number
  }
  revenue?: {
    from: number
    to: number
  }
  net_revenue?: {
    from: number
    to: number
  }
  discount?: {
    from: number
    to: number
  }
  column?: string
  direction?: string
  q?: string
  format?: string
  branch_number?: number
}

export interface ProductGoupsFilters {
  column: string
  type?: string
}

export interface StaffQuery {
  branch_number?: number
}

export interface ReportOptions {
  staff?: StaffID,
  query?: StaffQuery
}

export class Analytics {
  endpoint: string
  http: Client
  public options: AnalyticsOptions
  public uriHelper: UriHelper

  constructor(options: AnalyticsOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v0/analytics'
    this.options.base = this.options.base || 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  getRevenuesForDayOfWeek(query: RevenuBasicOptions): Promise<AnalyticsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const base = this.uriHelper.generateBaseUri('/aggregates/revenues/day_of_week')
        const uri = this.uriHelper.generateUriWithQuery(base, query)

        const response = await this.http.getClient().get(uri)
        response.status !== 200 && reject(new RevenuesFetchFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as AnalyticsResponse)
      } catch (err) {
        return reject(new RevenuesFetchFailed())
      }
    })
  }

  getRevenuesSumForTimeRange(query: RevenuBasicOptions): Promise<AnalyticsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const base = this.uriHelper.generateBaseUri('/aggregates/revenues/sum')
        const uri = this.uriHelper.generateUriWithQuery(base, query)

        const response = await this.http.getClient().get(uri)
        response.status !== 200 && reject(new RevenuesFetchFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as AnalyticsResponse)
      } catch (err) {
        return reject(new RevenuesFetchFailed())
      }
    })
  }

  getRevenues(query: RevenuesOptions): Promise<AnalyticsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const base = this.uriHelper.generateBaseUri('/aggregates/revenues')
        const uri = this.uriHelper.generateUriWithQuery(base, query)

        const response = await this.http.getClient().get(uri)

        response.status !== 200 && reject(new RevenuesFetchFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as AnalyticsResponse)
      } catch (err) {
        return reject(new RevenuesFetchFailed())
      }
    })
  }

  getRevenuesForHourOfDay(query: RevenuBasicOptions): Promise<AnalyticsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const base = this.uriHelper.generateBaseUri('/aggregates/revenues/hour_of_day')
        const uri = this.uriHelper.generateUriWithQuery(base, query)

        const response = await this.http.getClient().get(uri)
        response.status !== 200 && reject(new RevenuesFetchFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as AnalyticsResponse)
      } catch (err) {
        return reject(new RevenuesFetchFailed())
      }
    })
  }

  getReportsProducts(query?: ProductsOptions | undefined): Promise<AnalyticsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const base = this.uriHelper.generateBaseUri('/reports/products')
        const uri = this.uriHelper.generateUriWithQuery(base, query)

        const response = await this.http.getClient().get(uri)
        response.status !== 200 && reject(new StatisticsProductFetchFailed())
        return resolve({
          data: response.data.results,
          metadata: {
            count: response.data.count
          }
        } as AnalyticsResponse)
      } catch (err) {
        return reject(new StatisticsProductFetchFailed())
      }
    })
  }

  getProductsChildren(
    productNumber: String,
    query?: ProductsOptions | undefined
  ): Promise<AnalyticsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const base = this.uriHelper.generateBaseUri(`/reports/products/${productNumber}`)
        const uri = this.uriHelper.generateUriWithQuery(base, query)

        const response = await this.http.getClient().get(uri)
        response.status !== 200 && reject(new StatisticsProductChildrenFetchFailed())
        return resolve({
          data: response.data.results,
          metadata: {
            count: response.data.count
          }
        } as AnalyticsResponse)
      } catch (err) {
        return reject(new StatisticsProductChildrenFetchFailed())
      }
    })
  }

  getStaffOverviewReport(query?: StaffQuery | undefined): Promise<AnalyticsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const base = this.uriHelper.generateBaseUri('/reports/staff/overview')
        const uri = this.uriHelper.generateUriWithQuery(base, query)

        const response = await this.http.getClient().get(uri)
        response.status !== 200 && reject(new StaffOverviewFetchFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as AnalyticsResponse)
      } catch (err) {
        return reject(new StaffOverviewFetchFailed())
      }
    })
  }

  getProductGroupsReport(options?: ReportOptions | undefined): Promise<AnalyticsResponse> {
    return new Promise(async (resolve, reject) => {
      const staff = options && options.staff

      try {
        const base = this.uriHelper.generateBaseUri(`/reports/staff/product_groups${staff ? `/${staff}` : ''}`)
        const uri = this.uriHelper.generateUriWithQuery(base, options && options.query)

        const response = await this.http.getClient().get(uri)
        response.status !== 200 && reject(new ProductGroupsReportFetchFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as AnalyticsResponse)
      } catch (err) {
        return reject(new ProductGroupsReportFetchFailed())
      }
    })
  }

  getRefundsReport(options?: ReportOptions | undefined): Promise<AnalyticsResponse> {
    return new Promise(async (resolve, reject) => {
      const staff = options && options.staff

      try {
        const base = this.uriHelper.generateBaseUri(`/reports/staff/refunds${staff ? `/${staff}` : ''}`)
        const uri = this.uriHelper.generateUriWithQuery(base, options && options.query)

        const response = await this.http.getClient().get(uri)
        response.status !== 200 && reject(new RefundsReportFetchFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as AnalyticsResponse)
      } catch (err) {
        return reject(new RefundsReportFetchFailed())
      }
    })
  }

  getVouchersReports(query?: VoucherOptions | undefined): Promise<AnalyticsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        let uri = `${this.options.base}${this.endpoint}/${this.options.user}/reports/vouchers`

        const queryString = qs.stringify(query)

        if (queryString) {
          uri = `${uri}?${queryString}`
        }

        const response = await this.http.getClient().get(uri)
        response.status !== 200 && reject(new VouchersReportFetchFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as AnalyticsResponse)
      } catch (err) {
        return reject(new VouchersReportFetchFailed())
      }
    })
  }

  getProductsReport(options?: ReportOptions | undefined): Promise<AnalyticsResponse> {
    return new Promise(async (resolve, reject) => {
      const staff = options && options.staff

      try {
        const base = this.uriHelper.generateBaseUri(`/reports/staff/products${staff ? `/${staff}` : ''}`)
        const uri = this.uriHelper.generateUriWithQuery(base, options && options.query)

        const response = await this.http.getClient().get(uri)
        response.status !== 200 && reject(new ProductsReportFetchFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as AnalyticsResponse)
      } catch (err) {
        return reject(new ProductsReportFetchFailed())
      }
    })
  }

  getPaymentsReport(query?: PaymentsReportOptions): Promise<AnalyticsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const base = `${this.options.base}${this.endpoint}/${
          this.options.user
          }/reports/staff/payments`

        const uri = this.uriHelper.generateUriWithQuery(base, query)

        const response = await this.http.getClient().get(uri)
        response.status !== 200 && reject(new PaymentsReportFetchFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as AnalyticsResponse)
      } catch (err) {
        return reject(new PaymentsReportFetchFailed())
      }
    })
  }

  getSimpleSalesCartItems(
    query?: SimpleSalesCartItemsOptions | undefined
  ): Promise<AnalyticsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        let uri = `${this.options.base}${this.endpoint}/${
          this.options.user
          }/reports/transactions/simple`

        const queryString = qs.stringify(query)

        if (queryString) {
          uri = `${uri}?${queryString}`
        }

        const response = await this.http.getClient().get(uri)
        response.status !== 200 && reject(new SimpleSalesCartItemsReportFetchFailed())

        return resolve({
          data: response.data.results[0].results,
          metadata: {
            count: response.data.results[0].count,
            metric: response.data.results[0].metric
          }
        } as AnalyticsResponse)
      } catch (err) {
        return reject(new SimpleSalesCartItemsReportFetchFailed())
      }
    })
  }
  // TODO: Remove when customers() is implemented
  getCustomersReport(query?: ExportFormatOptions | undefined): Promise<AnalyticsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const base = this.uriHelper.generateBaseUri('/reports/customers')
        const uri = this.uriHelper.generateUriWithQuery(base, query)

        const response = await this.http.getClient().get(uri)
        response.status !== 200 && reject(new ReportsCustomerCustomersFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as AnalyticsResponse)
      } catch (err) {
        return reject(new ReportsCustomerCustomersFailed())
      }
    })
  }
  // TODO: Remove when customers() is implemented
  getCustomersTransaction(query: CustomersTransactionOptions): Promise<AnalyticsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const base = this.uriHelper.generateBaseUri('/reports/customers/transactions')
        const uri = this.uriHelper.generateUriWithQuery(base, query)

        const response = await this.http.getClient().get(uri)
        response.status !== 200 && reject(new ReportsCustomerTransactionsFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as AnalyticsResponse)
      } catch (err) {
        return reject(new ReportsCustomerTransactionsFailed())
      }
    })
  }
  // TODO: Remove when customers() is implemented
  getCustomersOverview(query: CustomersTransactionOptions): Promise<AnalyticsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const base = this.uriHelper.generateBaseUri('/reports/customers/overview')
        const uri = this.uriHelper.generateUriWithQuery(base, query)

        const response = await this.http.getClient().get(uri)
        response.status !== 200 && reject(new ReportsCustomerOverviewFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as AnalyticsResponse)
      } catch (err) {
        return reject(new ReportsCustomerOverviewFailed())
      }
    })
  }

  getStocksReport(query?: ExportFormatOptions | undefined): Promise<AnalyticsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const queryString = qs.stringify(query, { addQueryPrefix: true })
        const uri = `${this.options.base}${this.endpoint}/${
          this.options.user
          }/reports/stocks${queryString}`
        const response = await this.http.getClient().get(uri)
        response.status !== 200 && reject(new ReportsStocksFetchFailed())
        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as AnalyticsResponse)
      } catch (err) {
        return reject(new ReportsStocksFetchFailed())
      }
    })
  }

  getProductGroups(query?: ProductGoupsOptions | undefined): Promise<AnalyticsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const base = this.uriHelper.generateBaseUri('/reports/product_groups')
        const uri = this.uriHelper.generateUriWithQuery(base, query)
        const response = await this.http.getClient().get(uri)
        response.status !== 200 && reject(new ReportsProductGroupsFetchFailed())
        return resolve({
          data: response.data.results,
          metadata: {
            count: response.data.count
          }
        } as AnalyticsResponse)
      } catch (err) {
        return reject(new ReportsProductGroupsFetchFailed())
      }
    })
  }

  getProductGroupsFilters(query: ProductGoupsFilters): Promise<AnalyticsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const base = this.uriHelper.generateBaseUri('/reports/product_groups/filters')
        const uri = this.uriHelper.generateUriWithQuery(base, query)
        const response = await this.http.getClient().get(uri)
        response.status !== 200 && reject(new ReportsProductGroupsFiltersFetchFailed())
        return resolve({
          data: response.data.results,
          metadata: {
            count: response.data.count
          }
        } as AnalyticsResponse)
      } catch (err) {
        return reject(new ReportsProductGroupsFiltersFetchFailed())
      }
    })
  }

  balances(): Balances {
    return new Balances(this.options, this.http, this.uriHelper)
  }

  paymentOptions(): PaymentOptions {
    return new PaymentOptions(this.options, this.http, this.uriHelper)
  }

  payments(): Payments {
    return new Payments(this.options, this.http, this.uriHelper)
  }

  vat(): Vat {
    return new Vat(this.options, this.http, this.uriHelper)
  }

  customers(): Customers {
    return new Customers(this.options, this.http, this.uriHelper)
  }
}

export class ReportsStocksFetchFailed extends BaseError {
  public name = 'ReportsStocksFetchFailed'
  constructor(public message: string = 'Could not fetch the stocks report', properties?: any) {
    super(message, properties)
  }
}

export class RefundsReportFetchFailed extends BaseError {
  public name = 'RefundsReportFetchFailed'
  constructor(public message: string = 'Could not fetch the refunds report', properties?: any) {
    super(message, properties)
  }
}

export class VouchersReportFetchFailed extends BaseError {
  public name = 'VouchersReportFetchFailed'
  constructor(public message: string = 'Could not fetch the vouchers report', properties?: any) {
    super(message, properties)
  }
}

export class ProductsReportFetchFailed extends BaseError {
  public name = 'ProductsReportFetchFailed'
  constructor(public message: string = 'Could not fetch the products report', properties?: any) {
    super(message, properties)
  }
}

export class PaymentsReportFetchFailed extends BaseError {
  public name = 'PaymentsReportFetchFailed'
  constructor(public message: string = 'Could not fetch the payments report', properties?: any) {
    super(message, properties)
  }
}

export class RevenuesFetchFailed extends BaseError {
  public name = 'RevenuesFetchFailed'
  constructor(public message: string = 'Could not fetch the Revenues', properties?: any) {
    super(message, properties)
  }
}

export class ReportsProductGroupsFiltersFetchFailed extends BaseError {
  public name = 'ReportsProductGroupsFiltersFetchFailed'
  constructor(public message: string = 'Could not get products group filters', properties?: any) {
    super(message, properties)
  }
}

export class ReportsProductGroupsFetchFailed extends BaseError {
  public name = 'ReportsProductGroupsFetchFailed'
  constructor(public message: string = 'Could not fetch product groups', properties?: any) {
    super(message, properties)
  }
}

export class ReportsCustomerOverviewFailed extends BaseError {
  public name = 'ReportsProductGroupsFetchFailed'
  constructor(public message: string = 'Could not fetch customer overview', properties?: any) {
    super(message, properties)
  }
}

export class ReportsCustomerTransactionsFailed extends BaseError {
  public name = 'ReportsCustomerTransactionsFailed'
  constructor(public message: string = 'Could not fetch customer transactions', properties?: any) {
    super(message, properties)
  }
}

export class ReportsCustomerCustomersFailed extends BaseError {
  public name = 'ReportsCustomerCustomersFailed'
  constructor(public message: string = 'Could not fetch customer reports', properties?: any) {
    super(message, properties)
  }
}

export class SimpleSalesCartItemsReportFetchFailed extends BaseError {
  public name = 'SimpleSalesCartItemsReportFetchFailed'
  constructor(
    public message: string = 'Could not fetch the sales cart items report',
    properties?: any
  ) {
    super(message, properties)
  }
}

export class ProductGroupsReportFetchFailed extends BaseError {
  public name = 'ProductGroupsReportFetchFailed'
  constructor(
    public message: string = 'Could not fetch the product groups report',
    properties?: any
  ) {
    super(message, properties)
  }
}

export class StatisticsProductChildrenFetchFailed extends BaseError {
  public name = 'StatisticsProductChildrenFetchFailed'
  constructor(
    public message: string = 'Could not fetch the Statistics Products Children',
    properties?: any
  ) {
    super(message, properties)
  }
}

export class StaffOverviewFetchFailed extends BaseError {
  public name = 'StaffOverviewFetchFailed'
  constructor(
    public message: string = 'Could not fetch the staff overview report',
    properties?: any
  ) {
    super(message, properties)
  }
}

export class StatisticsProductFetchFailed extends BaseError {
  public name = 'StatisticsProductFetchFailed'
  constructor(
    public message: string = 'Could not fetch the Statistics Products',
    properties?: any
  ) {
    super(message, properties)
  }
}
