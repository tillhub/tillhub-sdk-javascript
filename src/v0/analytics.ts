import { Client } from '../client'
import * as errors from '../errors'

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

export interface RevenuesOptions {
  branch_number?: string | null
  precision?: 'hour' | 'day'
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
}

export class Analytics {
  endpoint: string
  http: Client
  public options: AnalyticsOptions

  constructor(options: AnalyticsOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v0/analytics'
    this.options.base = this.options.base || 'https://api.tillhub.com'
  }

  getRevenuesForDayOfWeek(query: RevenuBasicOptions): Promise<AnalyticsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const startEnd = `start=${query.start}&end=${query.end}`
        const branch = query.branch_number ? `&branch_number=${query.branch_number}` : ''
        const dayOfWeek = `aggregates/revenues/day_of_week?${startEnd}${branch}`
        const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${dayOfWeek}`

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
        const startEnd = `start=${query.start}&end=${query.end}`
        const branch = query.branch_number ? `&branch_number=${query.branch_number}` : ''
        const precision = `&precision=${query.precision}`
        const revenueQuery = `aggregates/revenues?${startEnd}${branch}${precision}`
        let uri = `${this.options.base}${this.endpoint}/${this.options.user}/${revenueQuery}`
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
        const startEnd = `start=${query.start}&end=${query.end}`
        const branch = query.branch_number ? `&branch_number=${query.branch_number}` : ''
        const hourOfDayQuery = `aggregates/revenues/hour_of_day?${startEnd}${branch}`
        const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${hourOfDayQuery}`

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

  getReportsProducts(query: ProductsOptions): Promise<AnalyticsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        let uri = `${this.options.base}${this.endpoint}/${this.options.user}/reports/products`
        const queryKeys = Object.keys(query)
          .map((key: string) => {
            return `${key}=${query[key].toString()}`
          })
          .join('&')

        if (Object.keys(query).length) {
          uri += `?${queryKeys}`
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

  getProductGroupsReport(): Promise<AnalyticsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uri = `${this.options.base}${this.endpoint}/${
          this.options.user
        }/reports/staff/product_groups`

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

  getRefundsReport(): Promise<AnalyticsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uri = `${this.options.base}${this.endpoint}/${
          this.options.user
        }/reports/staff/refunds`

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
}
