import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper, HandlerQuery } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface SuppliersOptions {
  user?: string
  base?: string
}

export interface SuppliersQuery {
  limit?: number
  uri?: string
  query?: {
    deleted?: boolean
    active?: boolean
    extended?: boolean
    location?: string
  }
}

export interface SuppliersMetaQuery {
  deleted?: boolean
  location?: string
}

export interface SuppliersResponse {
  data: Supplier[]
  metadata: Record<string, unknown>
  next?: () => Promise<SuppliersResponse>
}

export interface SuppliersBulkResponse {
  data: {
    updated_suppliers?: Supplier[]
    invalid_suppliers?: Supplier[]
    created_suppliers?: Supplier[]
  }
  metadata?: {
    count?: number
  }
  msg?: string
}

export interface SupplierResponse {
  data?: Supplier
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
  errors?: ErrorObject[]
}

export interface SuppliersExportResponse {
  data?: {
    url?: string
    filename?: string
    expiresAt?: string
  }
  msg?: string
}

export interface SupplierQuery {
  supplier_number_template?: string
  generate_supplier_number?: boolean
}

export interface HandlerSupplierQuery extends HandlerQuery {
  query?: SupplierQuery
}

export declare type SupplierPhonenumberTypes = 'main' | 'home' | 'mobile' | 'work'

export interface SupplierPhonenumbers {
  type?: SupplierPhonenumberTypes | null
  number?: String | null
}

export interface SupplierNoteItem {
  type: 'text'
  payload: any
}

export interface SupplierContacts {
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

export type SupplierAddressType = 'billing' | 'returns'

export interface SupplierAddress {
  lines?: string[] | null
  street?: string | null
  street_number?: string | null
  locality?: string | null
  region?: string | null
  postal_code?: string | null
  country?: string | null
  type?: SupplierAddressType | null
}

export interface SupplierBankAccount {
  name?: string | null
  iban?: string | null
  swift?: string | null
}

export interface Supplier {
  id?: string
  companyName?: string | null
  description?: string | null
  number?: string | null
  email?: string | null
  phonenumbers?: SupplierPhonenumbers[] | null
  paymentTerms?: number | null
  taxNumber?: string | null
  glnNumber?: string | null
  taxSubject?: boolean
  accountsReceivable?: any[] | null
  accountsPayable?: any[] | null
  addresses?: SupplierAddress[] | null
  bankAccounts?: SupplierBankAccount[] | null
  firstname?: string
  lastname?: string
}

export class Suppliers extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/business-partners'
  endpoint: string
  http: Client
  public options: SuppliersOptions
  public uriHelper: UriHelper

  constructor (options: SuppliersOptions, http: Client) {
    super(http, {
      endpoint: Suppliers.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = Suppliers.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (query?: SuppliersQuery | undefined): Promise<SuppliersResponse> {
    let next
    const base = this.uriHelper.generateBaseUri()
    const uri = this.uriHelper.generateUriWithQuery(base, query)

    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new SuppliersFetchFailed(undefined, { status: response.status })
      }

      if (response.data.cursors?.next) {
        next = (): Promise<SuppliersResponse> => this.getAll({ uri: response.data.cursors.next })
      }

      return {
        data: response.data.results,
        metadata: { cursor: response.data.cursors },
        next
      }
    } catch (error: any) {
      throw new SuppliersFetchFailed(error.message, { error })
    }
  }

  async get (supplierId: string, query: SuppliersQuery): Promise<SupplierResponse> {
    const base = this.uriHelper.generateBaseUri(`/${supplierId}`)
    const uri = this.uriHelper.generateUriWithQuery(base, query)

    try {
      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) {
        throw new SupplierFetchFailed(undefined, { status: response.status })
      }
      return {
        data: response.data.results[0] as Supplier,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new SupplierFetchFailed(error.message, { error })
    }
  }

  async put (supplierId: string, supplier: Supplier): Promise<SupplierResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${supplierId}`)
    try {
      const response = await this.http.getClient().put(uri, supplier)

      if (response.status !== 200) {
        throw new SupplierPutFailed(undefined, { status: response.status })
      }
      return {
        data: response.data.results[0] as Supplier,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new SupplierPutFailed(error.message, { error })
    }
  }

  async create (supplier: Supplier, query?: HandlerSupplierQuery): Promise<SupplierResponse> {
    const base = this.uriHelper.generateBaseUri()
    const uri = this.uriHelper.generateUriWithQuery(base, query)
    try {
      const response = await this.http.getClient().post(uri, supplier)

      if (response.status !== 200) {
        throw new SupplierCreationFailed(undefined, { status: response.status })
      }
      return {
        data: response.data.results[0] as Supplier,
        metadata: { count: response.data.count },
        errors: response.data.errors || []
      }
    } catch (error: any) {
      throw new SupplierCreationFailed(error.message, { error })
    }
  }

  async bulkCreate (suppliers: Supplier[], query?: HandlerSupplierQuery): Promise<SuppliersBulkResponse> {
    const base = this.uriHelper.generateBaseUri('/import')
    const uri = this.uriHelper.generateUriWithQuery(base, query)

    try {
      const response = await this.http.getClient().post(uri, suppliers)
      if (![200, 409].includes(response.status)) {
        throw new SuppliersBulkCreateFailed(undefined, { status: response.status })
      }

      return {
        data: {
          created_suppliers: response.data.created_suppliers,
          invalid_suppliers: response.data.invalid_suppliers,
          updated_suppliers: response.data.updated_suppliers
        },
        metadata: {
          count: response.data.count
        },
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new SuppliersBulkCreateFailed(error.message, { error })
    }
  }

  async meta (q?: SuppliersMetaQuery | undefined): Promise<SuppliersResponse> {
    const base = this.uriHelper.generateBaseUri('/meta')
    const uri = this.uriHelper.generateUriWithQuery(base, q)
    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new SuppliersMetaFailed(undefined, { status: response.status })
      }
      if (!response.data.results[0]) {
        throw new SuppliersMetaFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new SuppliersMetaFailed(error.message, { error })
    }
  }

  async delete (supplierId: string): Promise<SupplierResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${supplierId}`)
    try {
      const response = await this.http.getClient().delete(uri)
      if (response.status !== 200) {
        throw new SupplierDeleteFailed(undefined, { status: response.status })
      }
      return {
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new SupplierDeleteFailed(error.message, { error })
    }
  }

  async export (query?: SuppliersQuery | undefined): Promise<SuppliersExportResponse> {
    const base = this.uriHelper.generateBaseUri('/export')
    const uri = this.uriHelper.generateUriWithQuery(base, query)

    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new SuppliersExportFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results,
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new SuppliersExportFailed(error.message, { error })
    }
  }
}

export class SuppliersFetchFailed extends BaseError {
  public name = 'SuppliersFetchFailed'
  constructor (
    public message: string = 'Could not fetch suppliers',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, SuppliersFetchFailed.prototype)
  }
}

export class SupplierFetchFailed extends BaseError {
  public name = 'SupplierFetchFailed'
  constructor (
    public message: string = 'Could not fetch supplier',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, SupplierFetchFailed.prototype)
  }
}

export class SupplierPutFailed extends BaseError {
  public name = 'SupplierPutFailed'
  constructor (
    public message: string = 'Could not alter supplier',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, SupplierPutFailed.prototype)
  }
}

export class SupplierNoteCreationFailed extends BaseError {
  public name = 'SupplierNoteCreationFailed'
  constructor (
    public message: string = 'Could not create supplier note',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, SupplierNoteCreationFailed.prototype)
  }
}

export class SupplierCreationFailed extends BaseError {
  public name = 'SupplierCreationFailed'
  constructor (
    public message: string = 'Could not create supplier',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, SupplierCreationFailed.prototype)
  }
}

export class SuppliersBulkCreateFailed extends BaseError {
  public name = 'SuppliersBulkCreateFailed'
  constructor (
    public message: string = 'Could not bulk create the suppliers',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, SuppliersBulkCreateFailed.prototype)
  }
}

export class SuppliersMetaFailed extends BaseError {
  public name = 'SuppliersMetaFailed'
  constructor (
    public message: string = 'Could not get suppliers metadata',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, SuppliersMetaFailed.prototype)
  }
}

export class SuppliersCountFailed extends BaseError {
  public name = 'SuppliersCountFailed'
  constructor (
    public message: string = 'Could not count suppliers',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, SuppliersCountFailed.prototype)
  }
}

export class SuppliersSearchFailed extends BaseError {
  public name = 'SuppliersSearchFailed'
  constructor (
    public message: string = 'Could not search for supplier',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, SuppliersSearchFailed.prototype)
  }
}

export class SupplierDeleteFailed extends BaseError {
  public name = 'SupplierDeleteFailed'
  constructor (
    public message: string = 'Could not delete the supplier',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, SupplierDeleteFailed.prototype)
  }
}

export class SuppliersExportFailed extends BaseError {
  public name = 'SuppliersExportFailed'
  constructor (
    public message: string = 'Could not export suppliers',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, SuppliersExportFailed.prototype)
  }
}
