import { Client } from '../client'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'
import {
  Customer,
  CustomerCreationFailed,
  CustomerPutFailed,
  CustomerResponse,
  CustomersOptions,
  HandlerCustomerQuery
} from '../v0/customers'

export class Customers extends ThBaseHandler {
  public static baseEndpoint = '/api/v2/customers'
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

  async create (customer: Customer, query?: HandlerCustomerQuery): Promise<CustomerResponse> {
    const base = this.uriHelper.generateBaseUri()
    const uri = this.uriHelper.generateUriWithQuery(base, query)
    try {
      const response = await this.http.getClient().post(uri, customer)

      if (![200, 201].includes(response.status)) {
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
}
