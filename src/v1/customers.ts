import { Client } from '../client'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'
import {
  Customer,
  CustomerCreationFailed,
  CustomerDeleteFailed,
  CustomerFetchFailed,
  CustomerPutFailed,
  CustomerResponse,
  CustomersCountFailed,
  CustomersFetchFailed,
  CustomersMetaFailed,
  CustomersMetaQuery,
  CustomersOptions,
  CustomersQuery,
  CustomersResponse,
  HandlerCustomerQuery
} from '../v0/customers'

export class Customers extends ThBaseHandler {
  public static baseEndpoint = '/api/v1/customers'
  endpoint: string
  http: Client
  public options: CustomersOptions
  public uriHelper: UriHelper

  constructor (options: CustomersOptions, http: Client) {
    super(http, {
      endpoint: Customers.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = Customers.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (query?: CustomersQuery | undefined): Promise<CustomersResponse> {
    let next
    const base = this.uriHelper.generateBaseUri()
    const uri = this.uriHelper.generateUriWithQuery(base, query)

    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new CustomersFetchFailed(undefined, { status: response.status })
      }

      if (response.data.cursor?.next) {
        next = (): Promise<CustomersResponse> => this.getAll({ uri: response.data.cursor.next })
      }

      return {
        data: response.data.results,
        metadata: { cursor: response.data.cursor },
        next
      }
    } catch (error: any) {
      throw new CustomersFetchFailed(error.message, { error })
    }
  }

  async get (customerId: string, query: CustomersQuery): Promise<CustomerResponse> {
    const base = this.uriHelper.generateBaseUri(`/${customerId}`)
    const uri = this.uriHelper.generateUriWithQuery(base, query)

    try {
      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) {
        throw new CustomerFetchFailed(undefined, { status: response.status })
      }
      return {
        data: response.data.results[0] as Customer,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new CustomerFetchFailed(error.message, { error })
    }
  }

  async create (customer: Customer, query?: HandlerCustomerQuery): Promise<CustomerResponse> {
    const base = this.uriHelper.generateBaseUri()
    const uri = this.uriHelper.generateUriWithQuery(base, query)
    try {
      const response = await this.http.getClient().post(uri, customer)

      if (response.status !== 200) {
        throw new CustomerCreationFailed(undefined, { status: response.status })
      }
      return {
        data: response.data.results[0] as Customer,
        metadata: { count: response.data.count },
        errors: response.data.errors || []
      }
    } catch (error: any) {
      throw new CustomerCreationFailed(error.message, { error })
    }
  }

  async put (customerId: string, customer: Customer): Promise<CustomerResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${customerId}`)
    try {
      const response = await this.http.getClient().put(uri, customer)

      if (response.status !== 200) {
        throw new CustomerPutFailed(undefined, { status: response.status })
      }
      return {
        data: response.data.results[0] as Customer,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new CustomerPutFailed(error.message, { error })
    }
  }

  async meta (q?: CustomersMetaQuery | undefined): Promise<CustomersResponse> {
    const base = this.uriHelper.generateBaseUri('/meta')
    const uri = this.uriHelper.generateUriWithQuery(base, q)
    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new CustomersMetaFailed(undefined, { status: response.status })
      }
      if (!response.data.results[0]) {
        throw new CustomersMetaFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new CustomersMetaFailed(error.message, { error })
    }
  }

  async delete (customerId: string): Promise<CustomerResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${customerId}`)
    try {
      const response = await this.http.getClient().delete(uri)
      if (response.status !== 200) {
        throw new CustomerDeleteFailed(undefined, { status: response.status })
      }
      return {
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new CustomerDeleteFailed(error.message, { error })
    }
  }

  async count (): Promise<CustomersResponse> {
    const uri = this.uriHelper.generateBaseUri('/meta')

    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new CustomersCountFailed(undefined, { status: response.status })
      }
      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new CustomersCountFailed(error.message, { error })
    }
  }
}
