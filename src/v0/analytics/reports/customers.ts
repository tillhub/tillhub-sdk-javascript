import { Client } from '../../../client'
import { UriHelper } from '../../../uri-helper'
import * as errors from '../../../errors/analytics'

export interface AnalyticsOptions {
  user?: string
  base?: string
}

export interface AnalyticsResponse {
  data: Array<Record<string, unknown>>
  metadata: Record<string, unknown>
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
  branch_number?: number
}

export interface FiltersQuery {
  branch_number?: number
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
  branch_number?: number
}

export class Customers {
  http: Client
  public options: AnalyticsOptions
  public uriHelper: UriHelper

  constructor (options: AnalyticsOptions, http: Client, uriHelper: UriHelper) {
    this.options = options
    this.http = http
    this.uriHelper = uriHelper
  }

  async getAll (query?: CustomersQuery | undefined): Promise<AnalyticsResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/reports/customers')
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new errors.CustomerFetchFailed()

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (err) {
      throw new errors.CustomerFetchFailed()
    }
  }

  async getFilters (query?: FiltersQuery | undefined): Promise<AnalyticsResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/reports/customers')
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new errors.CustomerFilterFetchFailed()
      const { values } = response.data.results[0]
      const data = {
        customer_number: values.map((item: CustomersItem) => item.customer_number),
        firstname: values.map((item: CustomersItem) => item.firstname),
        lastname: values.map((item: CustomersItem) => item.lastname),
        company: values.map((item: CustomersItem) => item.company)
      }

      return {
        data: [data],
        metadata: { count: response.data.count }
      }
    } catch (err) {
      throw new errors.CustomerFilterFetchFailed()
    }
  }

  async getTransaction (query: CustomersOneQuery): Promise<AnalyticsResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/reports/customers/transactions')
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new errors.CustomerTransactionFetchFailed()

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (err) {
      throw new errors.CustomerTransactionFetchFailed()
    }
  }

  async getOverview (query: CustomersOneQuery): Promise<AnalyticsResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/reports/customers/overview')
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new errors.CustomerOverviewFetchFailed()

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (err) {
      throw new errors.CustomerOverviewFetchFailed()
    }
  }

  async meta (query?: CustomersQuery | undefined): Promise<AnalyticsResponse> {
    const base = this.uriHelper.generateBaseUri('/reports/customers/meta')
    const uri = this.uriHelper.generateUriWithQuery(base, query)

    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new errors.CustomersMetaFailed(undefined, { status: response.status })
      }
      if (!response.data.results[0]) {
        throw new errors.CustomersMetaFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (err) {
      throw new errors.CustomersMetaFailed(undefined, { error: err })
    }
  }
}
