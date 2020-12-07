import { Client } from '../client'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'
import {
  CustomersOptions,
  CustomersQuery,
  CustomersMetaQuery,
  CustomersResponse,
  CustomerResponse,
  HandlerCustomerQuery,
  CustomerNoteItem,
  Customer,
  CustomersFetchFailed,
  CustomerFetchFailed,
  CustomerPutFailed,
  CustomerNoteCreationFailed,
  CustomerCreationFailed,
  CustomersMetaFailed,
  CustomersCountFailed,
  CustomersSearchFailed,
  CustomerDeleteFailed
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
    } catch (err) {
      throw new CustomersFetchFailed(undefined, { error: err })
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
    } catch (error) {
      throw new CustomerFetchFailed(undefined, { error })
    }
  }

  async createNote (customerId: string, note: CustomerNoteItem): Promise<CustomerResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${customerId}/notes`)

    try {
      const response = await this.http.getClient().post(uri, note)

      if (response.status !== 200) {
        throw new CustomerNoteCreationFailed(undefined, { status: response.status })
      }
      return {
        data: response.data.results[0] as Customer,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error) {
      throw new CustomerNoteCreationFailed(undefined, { error })
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
    } catch (error) {
      throw new CustomerPutFailed(undefined, { error })
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
    } catch (error) {
      throw new CustomerCreationFailed(undefined, { error })
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
    } catch (err) {
      throw new CustomersMetaFailed(undefined, { error: err })
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
    } catch (err) {
      throw new CustomerDeleteFailed(undefined, { error: err })
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
    } catch (err) {
      console.log('TCL: ~ Customers ~ count ~ err', err)
      throw new CustomersCountFailed(undefined, { error: err })
    }
  }

  async search (searchTerm: string): Promise<CustomersResponse> {
    const base = this.options.base ?? 'https://api.tillhub.com'
    const user = this.options.user ?? ''
    const uri = `${base}/api/v2/customers/${user}/search?q=${searchTerm}`
    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new CustomersSearchFailed()

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (error) {
      throw new CustomersSearchFailed(undefined, { error })
    }
  }
}
