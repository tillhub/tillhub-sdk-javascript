import qs from 'qs'
import { Client } from '../client'
import * as errors from '../errors'
import { UriHelper } from '../uri-helper'

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
  format?: string
}

export interface CustomersTransactionOptions {
  customer_id: string | null,
  currency?: string
}

export interface SimpleSalesCartItemsOptions {
  [key: string]: any
  start?: string
  end?: string
  embed?: string | string[]
  include?: string | string[]
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
        response.status !== 200 && reject(new errors.RevenuesFetchFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as AnalyticsResponse)
      } catch (err) {
        return reject(new errors.RevenuesFetchFailed())
      }
    })
  }

  getRevenuesSumForTimeRange(query: RevenuBasicOptions): Promise<AnalyticsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const base = this.uriHelper.generateBaseUri('/aggregates/revenues/sum')
        const uri = this.uriHelper.generateUriWithQuery(base, query)

        const response = await this.http.getClient().get(uri)
        response.status !== 200 && reject(new errors.RevenuesFetchFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as AnalyticsResponse)
      } catch (err) {
        return reject(new errors.RevenuesFetchFailed())
      }
    })
  }

  getRevenues(query: RevenuesOptions): Promise<AnalyticsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const base = this.uriHelper.generateBaseUri('/aggregates/revenues')
        const uri = this.uriHelper.generateUriWithQuery(base, query)

        const response = await this.http.getClient().get(uri)

        response.status !== 200 && reject(new errors.RevenuesFetchFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as AnalyticsResponse)
      } catch (err) {
        return reject(new errors.RevenuesFetchFailed())
      }
    })
  }

  getRevenuesForHourOfDay(query: RevenuBasicOptions): Promise<AnalyticsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const base = this.uriHelper.generateBaseUri('/aggregates/revenues/hour_of_day')
        const uri = this.uriHelper.generateUriWithQuery(base, query)

        const response = await this.http.getClient().get(uri)
        response.status !== 200 && reject(new errors.RevenuesFetchFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as AnalyticsResponse)
      } catch (err) {
        return reject(new errors.RevenuesFetchFailed())
      }
    })
  }

  getReportsProducts(query?: ProductsOptions | undefined): Promise<AnalyticsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        let uri = `${this.options.base}${this.endpoint}/${this.options.user}/reports/products`
        const queryString = qs.stringify(query)

        if (queryString) {
          uri = `${uri}?${queryString}`
        }

        const response = await this.http.getClient().get(uri)
        response.status !== 200 && reject(new errors.StatisticsProductFetchFailed())
        return resolve({
          data: response.data.results,
          metadata: {
            count: response.data.count
          }
        } as AnalyticsResponse)
      } catch (err) {
        return reject(new errors.StatisticsProductFetchFailed())
      }
    })
  }

  getStaffOverviewReport(): Promise<AnalyticsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uri = `${this.options.base}${this.endpoint}/${
          this.options.user
        }/reports/staff/overview`

        const response = await this.http.getClient().get(uri)
        response.status !== 200 && reject(new errors.StaffOverviewFetchFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as AnalyticsResponse)
      } catch (err) {
        return reject(new errors.StaffOverviewFetchFailed())
      }
    })
  }

  getProductGroupsReport(staff?: StaffID): Promise<AnalyticsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uri = `${this.options.base}${this.endpoint}/${
          this.options.user
        }/reports/staff/product_groups/${staff || ''}`

        const response = await this.http.getClient().get(uri)
        response.status !== 200 && reject(new errors.ProductGroupsReportFetchFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as AnalyticsResponse)
      } catch (err) {
        return reject(new errors.ProductGroupsReportFetchFailed())
      }
    })
  }

  getRefundsReport(staff?: StaffID): Promise<AnalyticsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uri = `${this.options.base}${this.endpoint}/${
          this.options.user
        }/reports/staff/refunds/${staff || ''}`

        const response = await this.http.getClient().get(uri)
        response.status !== 200 && reject(new errors.RefundsReportFetchFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as AnalyticsResponse)
      } catch (err) {
        return reject(new errors.RefundsReportFetchFailed())
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
        response.status !== 200 && reject(new errors.VouchersReportFetchFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as AnalyticsResponse)
      } catch (err) {
        return reject(new errors.VouchersReportFetchFailed())
      }
    })
  }

  getProductsReport(staff?: StaffID): Promise<AnalyticsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uri = `${this.options.base}${this.endpoint}/${
          this.options.user
        }/reports/staff/products/${staff || ''}`

        const response = await this.http.getClient().get(uri)
        response.status !== 200 && reject(new errors.ProductsReportFetchFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as AnalyticsResponse)
      } catch (err) {
        return reject(new errors.ProductsReportFetchFailed())
      }
    })
  }

  getPaymentsReport(): Promise<AnalyticsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uri = `${this.options.base}${this.endpoint}/${
          this.options.user
        }/reports/staff/payments/`

        const response = await this.http.getClient().get(uri)
        response.status !== 200 && reject(new errors.PaymentsReportFetchFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as AnalyticsResponse)
      } catch (err) {
        return reject(new errors.PaymentsReportFetchFailed())
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
        response.status !== 200 && reject(new errors.SimpleSalesCartItemsReportFetchFailed())

        return resolve({
          data: response.data.results[0].results,
          metadata: {
            count: response.data.results[0].count,
            metric: response.data.results[0].metric
          }
        } as AnalyticsResponse)
      } catch (err) {
        return reject(new errors.SimpleSalesCartItemsReportFetchFailed())
      }
    })
  }

  getVatReport(query?: ExportFormatOptions | undefined): Promise<AnalyticsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        let uri = `${this.options.base}${this.endpoint}/${this.options.user}/reports/vat`

        const queryString = qs.stringify(query)

        if (queryString) {
          uri = `${uri}?${queryString}`
        }

        const response = await this.http.getClient().get(uri)
        response.status !== 200 && reject(new errors.VatReportFetchFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as AnalyticsResponse)
      } catch (err) {
        return reject(new errors.VatReportFetchFailed())
      }
    })
  }

  getCustomersReport(query?: ExportFormatOptions | undefined): Promise<AnalyticsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const base = this.uriHelper.generateBaseUri('/reports/customers')
        const uri = this.uriHelper.generateUriWithQuery(base, query)

        const response = await this.http.getClient().get(uri)
        response.status !== 200 && reject(new errors.CustomerFetchFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as AnalyticsResponse)
      } catch (err) {
        return reject(new errors.CustomerFetchFailed())
      }
    })
  }

  getCustomersTransaction(query: CustomersTransactionOptions): Promise<AnalyticsResponse> {
    return new Promise(async (resolve, reject) => {
      try {

        const base = this.uriHelper.generateBaseUri('/reports/customers/transactions')
        const uri = this.uriHelper.generateUriWithQuery(base, query)

        const response = await this.http.getClient().get(uri)
        response.status !== 200 && reject(new errors.CustomerFetchFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as AnalyticsResponse)
      } catch (err) {
        return reject(new errors.CustomerFetchFailed())
      }
    })
  }

  getCustomersOverview(query: CustomersTransactionOptions): Promise<AnalyticsResponse> {
    return new Promise(async (resolve, reject) => {
      try {

        const base = this.uriHelper.generateBaseUri('/reports/customers/overview')
        const uri = this.uriHelper.generateUriWithQuery(base, query)

        const response = await this.http.getClient().get(uri)
        response.status !== 200 && reject(new errors.CustomerFetchFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as AnalyticsResponse)
      } catch (err) {
        return reject(new errors.CustomerFetchFailed())
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
        response.status !== 200 && reject(new errors.StocksReportFetchFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as AnalyticsResponse)
      } catch (err) {
        return reject(new errors.StocksReportFetchFailed())
      }
    })
  }
}
