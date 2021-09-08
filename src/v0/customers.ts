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
  metadata: Record<string, unknown>
  next?: () => Promise<CustomersResponse>
}

export interface CustomerResponse {
  data?: Customer
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

export interface CustomerPhonenumbers {
  main?: string
  home?: string
  mobile?: string
  work?: string
}

export interface CustomerNoteItem {
  type: 'text'
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
  errorDetails: Record<string, unknown>
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
  id?: string
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
  metadata?: Record<string, unknown> | null
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
    } catch (error: any) {
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
    } catch (error: any) {
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
    } catch (error: any) {
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
    } catch (error: any) {
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
    } catch (error: any) {
      throw new CustomersSearchFailed(undefined, { error })
    }
  }
}

export class CustomersFetchFailed extends BaseError {
  public name = 'CustomersFetchFailed'
  constructor (
    public message: string = 'Could not fetch customers',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, CustomersFetchFailed.prototype)
  }
}

export class CustomerFetchFailed extends BaseError {
  public name = 'CustomerFetchFailed'
  constructor (
    public message: string = 'Could not fetch customer',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, CustomerFetchFailed.prototype)
  }
}

export class CustomerPutFailed extends BaseError {
  public name = 'CustomerPutFailed'
  constructor (
    public message: string = 'Could not alter customer',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, CustomerPutFailed.prototype)
  }
}

export class CustomerNoteCreationFailed extends BaseError {
  public name = 'CustomerNoteCreationFailed'
  constructor (
    public message: string = 'Could not create customer note',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, CustomerNoteCreationFailed.prototype)
  }
}

export class CustomerCreationFailed extends BaseError {
  public name = 'CustomerCreationFailed'
  constructor (
    public message: string = 'Could not create customer',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, CustomerCreationFailed.prototype)
  }
}

export class CustomersMetaFailed extends BaseError {
  public name = 'CustomersMetaFailed'
  constructor (
    public message: string = 'Could not get customers metadata',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, CustomersMetaFailed.prototype)
  }
}

export class CustomersCountFailed extends BaseError {
  public name = 'CustomersCountFailed'
  constructor (
    public message: string = 'Could not count customers',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, CustomersCountFailed.prototype)
  }
}

export class CustomersSearchFailed extends BaseError {
  public name = 'CustomersSearchFailed'
  constructor (
    public message: string = 'Could not search for customer',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, CustomersSearchFailed.prototype)
  }
}

export class CustomerDeleteFailed extends BaseError {
  public name = 'CustomerDeleteFailed'
  constructor (
    public message: string = 'Could not delete the customer',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, CustomerDeleteFailed.prototype)
  }
}
