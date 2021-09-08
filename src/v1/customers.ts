import { Client } from '../client'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'
import {
  CustomersOptions,
  CustomersQuery,
  CustomersResponse,
  CustomersFetchFailed
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
    } catch (err: any) {
      throw new CustomersFetchFailed(undefined, { error: err })
    }
  }
}
