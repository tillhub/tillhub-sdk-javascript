import qs from 'qs'
import { Client } from '../client'
import * as errors from '../errors'
import { UriHelper, HandlerQuery } from '../uri-helper'

export interface CustomersOptions {
  user?: string
  base?: string
}

export interface CustomersQuery {
  limit?: number
  uri?: string
  query?: {
    deleted?: boolean
  }
}

export interface CustomersMetaQuery {
  deleted?: boolean
}

export interface CustomersResponse {
  data: Customer[]
  metadata: object
  next?: () => Promise<CustomersResponse>
}

export interface CustomerResponse {
  data: Customer
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
  errors?: ErrorObject
}

export interface CustomerQuery {
  customer_number_template?: string
  generate_customer_number?: boolean
}

export interface HandlerCustomerQuery extends HandlerQuery {
  query?: CustomerQuery
}

export interface Customer {
  id?: string
}

export interface CustomerPhonenumbers {
  main?: string
  home?: string
  mobile?: string
  work?: string
}

export interface CustomerContacts {
  email?: {
    enabled: boolean
  }
  newsletter?: {
    enabled: boolean
  }
  phone?: {
    enabled: boolean
  }
  post?: {
    enabled: boolean
  }
}

export interface ErrorObject {
  message: string
  code: number
  errorDetails: object
}

export type CustomerAddressType = 'delivery' | 'billing'

export interface CustomerAddress {
  lines: string[] | null
  street: string | null
  street_number: string | null
  locality: string | null
  region: string | null
  postal_code: string | null
  country: string | null
  type: CustomerAddressType | null
}

export interface CustomerCompany {
  name: string
}

export interface CustomerImage {
  '1x': string
  avatar: string
}

export interface CustomerInternalDiscount {
  id: string
  amount: number
  type: 'percentage' | 'value'
  account: string
  name: string
  group: 'cart' | 'customer'
}

export interface CustomerDiscount {
  amount: number
  type: 'percent' | 'value'
  group: 'cart' | 'customer'
}

export interface Customer {
  gender?: string | null
  firstname?: string
  lastname?: string
  middlename?: string | null
  displayname?: string | null
  phonenumbers?: string | null
  email?: string | null
  customer_number?: string | null
  company?: CustomerCompany | null
  description?: string | null
  is_b2b?: boolean
  date_of_birth?: string | null
  image?: CustomerImage | null
  active?: boolean
  contacts?: CustomerContacts | null
  metadata?: object | null
  addresses?: CustomerAddress[] | null
  comment?: string | null
  discounts?: Array<CustomerInternalDiscount | CustomerDiscount> | null
  client_id?: string | null
  external_reference?: string | null
}

export class Customers {
  endpoint: string
  http: Client
  public options: CustomersOptions
  public uriHelper: UriHelper

  constructor(options: CustomersOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v0/customers'
    this.options.base = this.options.base || 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  getAll(queryOrOptions?: CustomersQuery | undefined): Promise<CustomersResponse> {
    return new Promise(async (resolve, reject) => {
      let next

      try {
        let uri
        if (queryOrOptions && queryOrOptions.uri) {
          uri = queryOrOptions.uri
        } else {
          let queryString = ''
          if (queryOrOptions && (queryOrOptions.query || queryOrOptions.limit)) {
            queryString = qs.stringify({ limit: queryOrOptions.limit, ...queryOrOptions.query })
          }

          uri = `${this.options.base}${this.endpoint}/${this.options.user}${
            queryString ? `?${queryString}` : ''
          }`
        }

        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) {
          reject(new errors.CustomersFetchFailed(undefined, { status: response.status }))
        }

        if (response.data.cursor && response.data.cursor.next) {
          next = (): Promise<CustomersResponse> => this.getAll({ uri: response.data.cursor.next })
        }

        return resolve({
          data: response.data.results,
          metadata: { cursor: response.data.cursor },
          next
        } as CustomersResponse)
      } catch (err) {
        return reject(new errors.CustomersFetchFailed(undefined, { error: err }))
      }
    })
  }

  get(customerId: string): Promise<CustomerResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${customerId}`
      try {
        const response = await this.http.getClient().get(uri)

        if (response.status !== 200) {
          return reject(new errors.CustomerFetchFailed(undefined, { status: response.status }))
        }
        return resolve({
          data: response.data.results[0] as Customer,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        } as CustomerResponse)
      } catch (error) {
        return reject(new errors.CustomerFetchFailed(undefined, { error }))
      }
    })
  }

  put(customerId: string, customer: Customer): Promise<CustomerResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${customerId}`
      try {
        const response = await this.http.getClient().put(uri, customer)

        if (response.status !== 200) {
          return reject(new errors.CustomerPutFailed(undefined, { status: response.status }))
        }
        return resolve({
          data: response.data.results[0] as Customer,
          metadata: { count: response.data.count }
        } as CustomerResponse)
      } catch (error) {
        return reject(new errors.CustomerPutFailed(undefined, { error }))
      }
    })
  }

  create(customer: Customer, query?: HandlerCustomerQuery): Promise<CustomerResponse> {
    return new Promise(async (resolve, reject) => {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, query)
      try {
        const response = await this.http.getClient().post(uri, customer)

        if (response.status !== 200) {
          return reject(new errors.CustomerCreationFailed(undefined, { status: response.status }))
        }
        return resolve({
          data: response.data.results[0] as Customer,
          metadata: { count: response.data.count },
          errors: response.data.errors || []
        } as CustomerResponse)
      } catch (error) {
        return reject(new errors.CustomerCreationFailed(undefined, { error }))
      }
    })
  }

  meta(q?: CustomersMetaQuery | undefined): Promise<CustomersResponse> {
    return new Promise(async (resolve, reject) => {
      let uri = `${this.options.base}${this.endpoint}/${this.options.user}/meta`

      try {
        const queryString = qs.stringify(q)
        if (queryString) {
          uri = `${uri}?${queryString}`
        }

        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) {
          return reject(new errors.CustomersMetaFailed(undefined, { status: response.status }))
        }
        if (!response.data.results[0]) {
          return reject(new errors.CustomersMetaFailed(undefined, { status: response.status }))
        }

        return resolve({
          data: response.data.results[0],
          metadata: { count: response.data.count }
        } as CustomersResponse)
      } catch (err) {
        return reject(new errors.CustomersMetaFailed(undefined, { error: err }))
      }
    })
  }

  delete(customerId: string): Promise<CustomerResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${customerId}`
      try {
        const response = await this.http.getClient().delete(uri)
        if (response.status !== 200) {
          reject(new errors.CustomerDeleteFailed(undefined, { status: response.status }))
        }
        return resolve({
          msg: response.data.msg
        } as CustomerResponse)
      } catch (err) {
        return reject(new errors.CustomerDeleteFailed(undefined, { error: err }))
      }
    })
  }

  count(): Promise<CustomersResponse> {
    return new Promise(async (resolve, reject) => {
      let uri = `${this.options.base}${this.endpoint}/${this.options.user}/meta`

      try {
        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) {
          reject(new errors.CustomersCountFailed(undefined, { status: response.status }))
        }
        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as CustomersResponse)
      } catch (err) {
        return reject(new errors.CustomersCountFailed(undefined, { error: err }))
      }
    })
  }

  search(searchTerm: string): Promise<CustomersResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/search?q=${searchTerm}`
      try {
        const response = await this.http.getClient().get(uri)
        response.status !== 200 && reject(new errors.CustomersSearchFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as CustomersResponse)
      } catch (error) {
        return reject(new errors.CustomersSearchFailed(undefined, { error }))
      }
    })
  }
}
