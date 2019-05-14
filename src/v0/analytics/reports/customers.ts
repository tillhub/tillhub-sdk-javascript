import { Client } from '../../../client'
import { UriHelper } from '../../../uri-helper'
import * as errors from '../../../errors/analytics'

export interface AnalyticsOptions {
  user?: string
  base?: string
}

export interface AnalyticsResponse {
  data: object[]
  metadata: object
  msg?: string
}

export interface CustomersQuery {
  customer_number?: string
  firstname?: string
  lastname?: string
  company?: string
  uri?: string
  format?: string
  legacy?: boolean
  cursor_field?: string
}

export interface CustomersItem {
  customer_number?: string
  firstname?: string
  lastname?: string
  company?: string
}

export interface CustomersOneQuery {
  customer_id: string | null
  currency?: string
}

export class Customers {
  http: Client
  public options: AnalyticsOptions
  public uriHelper: UriHelper

  constructor(options: AnalyticsOptions, http: Client, uriHelper: UriHelper) {
    this.options = options
    this.http = http
    this.uriHelper = uriHelper
  }
  getAll(query?: CustomersQuery | undefined): Promise<AnalyticsResponse> {
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

  getFilters(): Promise<AnalyticsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const base = this.uriHelper.generateBaseUri('/reports/customers')
        const uri = this.uriHelper.generateUriWithQuery(base)

        const response = await this.http.getClient().get(uri)
        response.status !== 200 && reject(new errors.CustomerFilterFetchFailed())
        const { values } = response.data.results[0]
        let data = {
          customer_number: values.map((item: CustomersItem) => item.customer_number),
          fistname: values.map((item: CustomersItem) => item.firstname),
          lastname: values.map((item: CustomersItem) => item.lastname),
          company: values.map((item: CustomersItem) => item.company)
        }

        return resolve({
          data: [data],
          metadata: { count: response.data.count }
        } as AnalyticsResponse)
      } catch (err) {
        return reject(new errors.CustomerFilterFetchFailed())
      }
    })
  }

  getTransaction(query: CustomersOneQuery): Promise<AnalyticsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const base = this.uriHelper.generateBaseUri('/reports/customers/transactions')
        const uri = this.uriHelper.generateUriWithQuery(base, query)

        const response = await this.http.getClient().get(uri)
        response.status !== 200 && reject(new errors.CustomerTransactionFetchFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as AnalyticsResponse)
      } catch (err) {
        return reject(new errors.CustomerTransactionFetchFailed())
      }
    })
  }

  getOverview(query: CustomersOneQuery): Promise<AnalyticsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const base = this.uriHelper.generateBaseUri('/reports/customers/overview')
        const uri = this.uriHelper.generateUriWithQuery(base, query)

        const response = await this.http.getClient().get(uri)
        response.status !== 200 && reject(new errors.CustomerOverviewFetchFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as AnalyticsResponse)
      } catch (err) {
        return reject(new errors.CustomerOverviewFetchFailed())
      }
    })
  }
}
