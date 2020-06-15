import qs from 'qs'
import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper, HandlerQuery } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface CustomersOptions {
  user?: string
  base?: string
}

export interface CustomersQuery {
  limit?: number
  uri?: string
  query?: {
    deleted?: boolean
    active?: boolean
    extended?: boolean
    location?: string
  }
}

export interface CustomersMetaQuery {
  deleted?: boolean
  location?: string
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
  errors?: ErrorObject[]
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

export interface CustomerNoteItem {
  type: 'text',
  payload: any
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
  id: string
  label: string
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

export class Customers extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/customers'
  endpoint: string
  http: Client
  public options: CustomersOptions
  public uriHelper: UriHelper

  constructor(options: CustomersOptions, http: Client) {
    super(http, { endpoint: Customers.baseEndpoint, base: options.base || 'https://api.tillhub.com' })
    this.options = options
    this.http = http

    this.endpoint = Customers.baseEndpoint
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
          reject(new CustomersFetchFailed(undefined, { status: response.status }))
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
        return reject(new CustomersFetchFailed(undefined, { error: err }))
      }
    })
  }

  get(customerId: string, queryOrOptions: CustomersQuery): Promise<CustomerResponse> {
    return new Promise(async (resolve, reject) => {
      let uri
      if (queryOrOptions && queryOrOptions.uri) {
        uri = queryOrOptions.uri
      } else {
        let queryString = ''
        if (queryOrOptions && (queryOrOptions.query || queryOrOptions.limit)) {
          queryString = qs.stringify({ limit: queryOrOptions.limit, ...queryOrOptions.query })
        }

        uri = `${this.options.base}${this.endpoint}/${this.options.user}/${customerId}${
          queryString ? `?${queryString}` : ''
          }`
      }

      try {
        const response = await this.http.getClient().get(uri)

        if (response.status !== 200) {
          return reject(new CustomerFetchFailed(undefined, { status: response.status }))
        }
        return resolve({
          data: response.data.results[0] as Customer,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        } as CustomerResponse)
      } catch (error) {
        return reject(new CustomerFetchFailed(undefined, { error }))
      }
    })
  }

  createNote(customerId: string, note: CustomerNoteItem): Promise<CustomerResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${customerId}/notes`
      try {
        const response = await this.http.getClient().post(uri, note)

        if (response.status !== 200) {
          return reject(new CustomerNoteCreationFailed(undefined, { status: response.status }))
        }
        return resolve({
          data: response.data.results[0] as Customer,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        } as CustomerResponse)
      } catch (error) {
        return reject(new CustomerNoteCreationFailed(undefined, { error }))
      }
    })
  }

  put(customerId: string, customer: Customer): Promise<CustomerResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${customerId}`
      try {
        const response = await this.http.getClient().put(uri, customer)

        if (response.status !== 200) {
          return reject(new CustomerPutFailed(undefined, { status: response.status }))
        }
        return resolve({
          data: response.data.results[0] as Customer,
          metadata: { count: response.data.count }
        } as CustomerResponse)
      } catch (error) {
        return reject(new CustomerPutFailed(undefined, { error }))
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
          return reject(new CustomerCreationFailed(undefined, { status: response.status }))
        }
        return resolve({
          data: response.data.results[0] as Customer,
          metadata: { count: response.data.count },
          errors: response.data.errors || []
        } as CustomerResponse)
      } catch (error) {
        return reject(new CustomerCreationFailed(undefined, { error }))
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
          return reject(new CustomersMetaFailed(undefined, { status: response.status }))
        }
        if (!response.data.results[0]) {
          return reject(new CustomersMetaFailed(undefined, { status: response.status }))
        }

        return resolve({
          data: response.data.results[0],
          metadata: { count: response.data.count }
        } as CustomersResponse)
      } catch (err) {
        return reject(new CustomersMetaFailed(undefined, { error: err }))
      }
    })
  }

  delete(customerId: string): Promise<CustomerResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${customerId}`
      try {
        const response = await this.http.getClient().delete(uri)
        if (response.status !== 200) {
          reject(new CustomerDeleteFailed(undefined, { status: response.status }))
        }
        return resolve({
          msg: response.data.msg
        } as CustomerResponse)
      } catch (err) {
        return reject(new CustomerDeleteFailed(undefined, { error: err }))
      }
    })
  }

  count(): Promise<CustomersResponse> {
    return new Promise(async (resolve, reject) => {
      let uri = `${this.options.base}${this.endpoint}/${this.options.user}/meta`

      try {
        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) {
          reject(new CustomersCountFailed(undefined, { status: response.status }))
        }
        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as CustomersResponse)
      } catch (err) {
        return reject(new CustomersCountFailed(undefined, { error: err }))
      }
    })
  }

  search(searchTerm: string): Promise<CustomersResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}/api/v2/customers/${this.options.user}/search?q=${searchTerm}`
      try {
        const response = await this.http.getClient().get(uri)
        response.status !== 200 && reject(new CustomersSearchFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as CustomersResponse)
      } catch (error) {
        return reject(new CustomersSearchFailed(undefined, { error }))
      }
    })
  }
}

export class CustomersFetchFailed extends BaseError {
  public name = 'CustomersFetchFailed'
  constructor(public message: string = 'Could not fetch customers', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, CustomersFetchFailed.prototype)
  }
}

export class CustomerFetchFailed extends BaseError {
  public name = 'CustomerFetchFailed'
  constructor(public message: string = 'Could not fetch customer', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, CustomerFetchFailed.prototype)
  }
}

export class CustomerPutFailed extends BaseError {
  public name = 'CustomerPutFailed'
  constructor(public message: string = 'Could not alter customer', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, CustomerPutFailed.prototype)
  }
}

export class CustomerNoteCreationFailed extends BaseError {
  public name = 'CustomerNoteCreationFailed'
  constructor(public message: string = 'Could not create customer note', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, CustomerNoteCreationFailed.prototype)
  }
}

export class CustomerCreationFailed extends BaseError {
  public name = 'CustomerCreationFailed'
  constructor(public message: string = 'Could not create customer', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, CustomerCreationFailed.prototype)
  }
}

export class CustomersMetaFailed extends BaseError {
  public name = 'CustomersMetaFailed'
  constructor(public message: string = 'Could not get customers metadata', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, CustomersMetaFailed.prototype)
  }
}

export class CustomersCountFailed extends BaseError {
  public name = 'CustomersCountFailed'
  constructor(public message: string = 'Could not count customers', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, CustomersCountFailed.prototype)
  }
}

export class CustomersSearchFailed extends BaseError {
  public name = 'CustomersSearchFailed'
  constructor(public message: string = 'Could not search for customer', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, CustomersSearchFailed.prototype)
  }
}

export class CustomerDeleteFailed extends BaseError {
  public name = 'CustomerDeleteFailed'
  constructor(public message: string = 'Could not delete the customer', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, CustomerDeleteFailed.prototype)
  }
}
