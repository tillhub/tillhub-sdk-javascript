import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'
import { Balances } from './analytics/reports/balances'
import { PaymentOptions } from './analytics/reports/payment_options'
import { Payments } from './analytics/reports/payments'
import { Vat } from './analytics/reports/vat'
import { CashBook } from './analytics/reports/cash_book'
import { Customers } from './analytics/reports/customers'

export type StaffID = string | null

export interface AnalyticsOptions {
  user?: string
  base?: string
}

export interface AnalyticsResponse {
  data: Array<Record<string, unknown>>
  metadata: Record<string, unknown>
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
  format?: string
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

export interface TopPaymentsReportOptions {
  start?: string
  end?: string
  branch_number?: number
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

export interface ProductGroupsFilters {
  column: string
  type?: string
}

export interface StaffQuery {
  branch_number?: string
  start?: string
  end?: string
}

export interface ReportOptions extends StaffQuery {
  staff?: StaffID
}

export class Analytics {
  endpoint: string
  http: Client
  public options: AnalyticsOptions
  public uriHelper: UriHelper

  constructor (options: AnalyticsOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v0/analytics'
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getRevenuesForDayOfWeek (query: RevenuBasicOptions): Promise<AnalyticsResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/aggregates/revenues/day_of_week')
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new RevenuesFetchFailed()

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (err) {
      throw new RevenuesFetchFailed()
    }
  }

  async getRevenuesSumForTimeRange (query: RevenuBasicOptions): Promise<AnalyticsResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/aggregates/revenues/sum')
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new RevenuesFetchFailed()

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (err) {
      throw new RevenuesFetchFailed()
    }
  }

  async getRevenues (query: RevenuesOptions): Promise<AnalyticsResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/aggregates/revenues')
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) throw new RevenuesFetchFailed()

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (err) {
      throw new RevenuesFetchFailed()
    }
  }

  async getRevenuesForHourOfDay (query: RevenuBasicOptions): Promise<AnalyticsResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/aggregates/revenues/hour_of_day')
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new RevenuesFetchFailed()

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (err) {
      throw new RevenuesFetchFailed()
    }
  }

  async getReportsProducts (query?: ProductsOptions | undefined): Promise<AnalyticsResponse> {
    try {
      // TODO: move this to proper v1. We cut a corner here not to require consumers refactoring for the report
      const localUriHelper = new UriHelper('/api/v1/analytics', this.options)
      const base = localUriHelper.generateBaseUri('/reports/products')
      const uri = localUriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new StatisticsProductFetchFailed()
      return {
        data: response.data.results,
        metadata: {
          count: response.data.count
        }
      }
    } catch (err) {
      throw new StatisticsProductFetchFailed()
    }
  }

  async getProductsChildren (
    productNumber: string,
    query?: ProductsOptions | undefined
  ): Promise<AnalyticsResponse> {
    try {
      const base = this.uriHelper.generateBaseUri(`/reports/products/${productNumber}`)
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new StatisticsProductChildrenFetchFailed()
      return {
        data: response.data.results,
        metadata: {
          count: response.data.count
        }
      }
    } catch (err) {
      throw new StatisticsProductChildrenFetchFailed()
    }
  }

  async getStaffOverviewReport (query?: StaffQuery | undefined): Promise<AnalyticsResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/reports/staff/overview')
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new StaffOverviewFetchFailed()

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (err) {
      throw new StaffOverviewFetchFailed()
    }
  }

  async getProductGroupsStaffReport (options?: ReportOptions | undefined): Promise<AnalyticsResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/reports/staff/product_groups')
      const uri = this.uriHelper.generateUriWithQuery(base, options)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new ProductGroupsStaffReportFetchFailed()

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (err) {
      throw new ProductGroupsStaffReportFetchFailed()
    }
  }

  async getProductGroupsReport (query?: RevenuBasicOptions | undefined): Promise<AnalyticsResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/aggregates/product_groups')
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new ProductGroupsReportFetchFailed()

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (err) {
      throw new ProductGroupsReportFetchFailed()
    }
  }

  async getRefundsReport (options?: ReportOptions | undefined): Promise<AnalyticsResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/reports/staff/refunds')
      const uri = this.uriHelper.generateUriWithQuery(base, options)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new RefundsReportFetchFailed()

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (err) {
      throw new RefundsReportFetchFailed()
    }
  }

  async getVouchersReports (query?: VoucherOptions | undefined): Promise<AnalyticsResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/reports/vouchers')
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new VouchersReportFetchFailed()

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (err) {
      throw new VouchersReportFetchFailed()
    }
  }

  async getProductsReport (options?: ReportOptions | undefined): Promise<AnalyticsResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/reports/staff/products')
      const uri = this.uriHelper.generateUriWithQuery(base, options)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new ProductsReportFetchFailed()

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (err) {
      throw new ProductsReportFetchFailed()
    }
  }

  async getPaymentsReport (query?: PaymentsReportOptions): Promise<AnalyticsResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/reports/staff/payments')
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new PaymentsReportFetchFailed()

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (err) {
      throw new PaymentsReportFetchFailed()
    }
  }

  async getTopPaymentsReport (query?: TopPaymentsReportOptions): Promise<AnalyticsResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/reports/payments/top')
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new TopPaymentsReportFetchFailed()

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (err) {
      throw new TopPaymentsReportFetchFailed()
    }
  }

  async getSimpleSalesCartItems (
    query?: SimpleSalesCartItemsOptions | undefined
  ): Promise<AnalyticsResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/reports/transactions/simple')
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new SimpleSalesCartItemsReportFetchFailed()

      return {
        data: response.data.results[0].results,
        metadata: {
          count: response.data.results[0].count,
          metric: response.data.results[0].metric
        }
      }
    } catch (err) {
      throw new SimpleSalesCartItemsReportFetchFailed()
    }
  }

  // TODO: Remove when customers() is implemented
  async getCustomersReport (query?: ExportFormatOptions | undefined): Promise<AnalyticsResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/reports/customers')
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new ReportsCustomerCustomersFailed()

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (err) {
      throw new ReportsCustomerCustomersFailed()
    }
  }

  // TODO: Remove when customers() is implemented
  async getCustomersTransaction (query: CustomersTransactionOptions): Promise<AnalyticsResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/reports/customers/transactions')
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new ReportsCustomerTransactionsFailed()

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (err) {
      throw new ReportsCustomerTransactionsFailed()
    }
  }

  // TODO: Remove when customers() is implemented
  async getCustomersOverview (query: CustomersTransactionOptions): Promise<AnalyticsResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/reports/customers/overview')
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new ReportsCustomerOverviewFailed()

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (err) {
      throw new ReportsCustomerOverviewFailed()
    }
  }

  async getStocksReport (query?: ExportFormatOptions | undefined): Promise<AnalyticsResponse> {
    try {
      // TODO: move this to proper v1. We cut a corner here not to require consumers refactoring for the report
      const localUriHelper = new UriHelper('/api/v1/analytics', this.options)
      const base = localUriHelper.generateBaseUri('/reports/stocks')
      const uri = localUriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) throw new ReportsStocksFetchFailed()
      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (err) {
      throw new ReportsStocksFetchFailed()
    }
  }

  async getProductGroups (query?: ProductGoupsOptions | undefined): Promise<AnalyticsResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/reports/product_groups')
      const uri = this.uriHelper.generateUriWithQuery(base, query)
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new ReportsProductGroupsFetchFailed()
      return {
        data: response.data.results,
        metadata: {
          count: response.data.count
        }
      }
    } catch (err) {
      throw new ReportsProductGroupsFetchFailed()
    }
  }

  async getProductGroupsFilters (query: ProductGroupsFilters): Promise<AnalyticsResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/reports/product_groups/filters')
      const uri = this.uriHelper.generateUriWithQuery(base, query)
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new ReportsProductGroupsFiltersFetchFailed()
      return {
        data: response.data.results,
        metadata: {
          count: response.data.count
        }
      }
    } catch (err) {
      throw new ReportsProductGroupsFiltersFetchFailed()
    }
  }

  balances (): Balances {
    return new Balances(this.options, this.http, this.uriHelper)
  }

  paymentOptions (): PaymentOptions {
    return new PaymentOptions(this.options, this.http, this.uriHelper)
  }

  payments (): Payments {
    return new Payments(this.options, this.http, this.uriHelper)
  }

  vat (): Vat {
    return new Vat(this.options, this.http, this.uriHelper)
  }

  cashBook (): CashBook {
    return new CashBook(this.options, this.http, this.uriHelper)
  }

  customers (): Customers {
    return new Customers(this.options, this.http, this.uriHelper)
  }
}

export class ReportsStocksFetchFailed extends BaseError {
  public name = 'ReportsStocksFetchFailed'
  constructor (
    public message: string = 'Could not fetch the stocks report',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ReportsStocksFetchFailed.prototype)
  }
}

export class RefundsReportFetchFailed extends BaseError {
  public name = 'RefundsReportFetchFailed'
  constructor (
    public message: string = 'Could not fetch the refunds report',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, RefundsReportFetchFailed.prototype)
  }
}

export class VouchersReportFetchFailed extends BaseError {
  public name = 'VouchersReportFetchFailed'
  constructor (
    public message: string = 'Could not fetch the vouchers report',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, VouchersReportFetchFailed.prototype)
  }
}

export class ProductsReportFetchFailed extends BaseError {
  public name = 'ProductsReportFetchFailed'
  constructor (
    public message: string = 'Could not fetch the products report',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductsReportFetchFailed.prototype)
  }
}

export class PaymentsReportFetchFailed extends BaseError {
  public name = 'PaymentsReportFetchFailed'
  constructor (
    public message: string = 'Could not fetch payments report',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, PaymentsReportFetchFailed.prototype)
  }
}

export class TopPaymentsReportFetchFailed extends BaseError {
  public name = 'TopPaymentsReportFetchFailed'
  constructor (
    public message: string = 'Could not fetch top payments report',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TopPaymentsReportFetchFailed.prototype)
  }
}

export class RevenuesFetchFailed extends BaseError {
  public name = 'RevenuesFetchFailed'
  constructor (
    public message: string = 'Could not fetch the Revenues',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, RevenuesFetchFailed.prototype)
  }
}

export class ReportsProductGroupsFiltersFetchFailed extends BaseError {
  public name = 'ReportsProductGroupsFiltersFetchFailed'
  constructor (
    public message: string = 'Could not get products group filters',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ReportsProductGroupsFiltersFetchFailed.prototype)
  }
}

export class ReportsProductGroupsFetchFailed extends BaseError {
  public name = 'ReportsProductGroupsFetchFailed'
  constructor (
    public message: string = 'Could not fetch product groups',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ReportsProductGroupsFetchFailed.prototype)
  }
}

export class ReportsCustomerOverviewFailed extends BaseError {
  public name = 'ReportsProductGroupsFetchFailed'
  constructor (
    public message: string = 'Could not fetch customer overview',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ReportsProductGroupsFetchFailed.prototype)
  }
}

export class ReportsCustomerTransactionsFailed extends BaseError {
  public name = 'ReportsCustomerTransactionsFailed'
  constructor (
    public message: string = 'Could not fetch customer transactions',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ReportsCustomerTransactionsFailed.prototype)
  }
}

export class ReportsCustomerCustomersFailed extends BaseError {
  public name = 'ReportsCustomerCustomersFailed'
  constructor (
    public message: string = 'Could not fetch customer reports',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ReportsCustomerCustomersFailed.prototype)
  }
}

export class SimpleSalesCartItemsReportFetchFailed extends BaseError {
  public name = 'SimpleSalesCartItemsReportFetchFailed'
  constructor (
    public message: string = 'Could not fetch the sales cart items report',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, SimpleSalesCartItemsReportFetchFailed.prototype)
  }
}

export class ProductGroupsStaffReportFetchFailed extends BaseError {
  public name = 'ProductGroupsStaffReportFetchFailed'
  constructor (
    public message: string = 'Could not fetch the product groups staff report',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductGroupsStaffReportFetchFailed.prototype)
  }
}

export class ProductGroupsReportFetchFailed extends BaseError {
  public name = 'ProductGroupsReportFetchFailed'
  constructor (
    public message: string = 'Could not fetch the product groups report',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductGroupsReportFetchFailed.prototype)
  }
}

export class StatisticsProductChildrenFetchFailed extends BaseError {
  public name = 'StatisticsProductChildrenFetchFailed'
  constructor (
    public message: string = 'Could not fetch the Statistics Products Children',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, StatisticsProductChildrenFetchFailed.prototype)
  }
}

export class StaffOverviewFetchFailed extends BaseError {
  public name = 'StaffOverviewFetchFailed'
  constructor (
    public message: string = 'Could not fetch the staff overview report',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, StaffOverviewFetchFailed.prototype)
  }
}

export class StatisticsProductFetchFailed extends BaseError {
  public name = 'StatisticsProductFetchFailed'
  constructor (
    public message: string = 'Could not fetch the Statistics Products',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, StatisticsProductFetchFailed.prototype)
  }
}
