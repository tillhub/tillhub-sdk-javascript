import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'

export interface PricebookEntriesOptions {
  user?: string
  base?: string
}

export interface PricebookEntriesQuery {
  limit?: number
  uri?: string
  query?: {
    deleted?: boolean
    active?: boolean
    name?: string
    price_book?: string
  }
}

export interface PricebookEntriesResponse {
  data: PricebookEntry[]
  metadata: Record<string, unknown>
  next?: () => Promise<PricebookEntriesResponse>
}

export interface PricebookEntryResponse {
  data?: PricebookEntry
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}

export interface PricebookEntry {
  price_book: string
  product: string
  name?: string
  summary?: string
  locations?: string[]
  clients?: string[]
  external_reference_id?: string
  constraints?: Record<string, unknown>
  value_type?: string
  amount_net?: number
  amount_gross?: number
  rate?: number
  discounted_by?: number
  metadata?: Record<string, unknown>
  active?: boolean
  deleted?: boolean
  updated_at?: string
  created_at?: string
}

export class PricebookEntries {
  http: Client
  public options: PricebookEntriesOptions
  public uriHelper: UriHelper

  constructor (options: PricebookEntriesOptions, http: Client, uriHelper: UriHelper) {
    this.options = options
    this.http = http
    this.uriHelper = uriHelper
  }

  async getAll (query?: PricebookEntriesQuery | undefined): Promise<PricebookEntriesResponse> {
    let next

    try {
      const base = this.uriHelper.generateBaseUri('/prices/book/entry')
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)

      if (response.data.cursor?.next) {
        next = (): Promise<PricebookEntriesResponse> =>
          this.getAll({ uri: response.data.cursor.next })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count, cursor: response.data.cursor },
        next
      }
    } catch (error: any) {
      throw new PricebookEntriesFetchFailed(undefined, { error })
    }
  }

  async meta (): Promise<PricebookEntriesResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri('/prices/book/entry/meta')
      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) throw new PricebookEntriesMetaFailed()

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new PricebookEntriesMetaFailed(undefined, { error })
    }
  }

  async get (pricebookEntryId: string): Promise<PricebookEntryResponse> {
    const uri = this.uriHelper.generateBaseUri(`/prices/book/entry/${pricebookEntryId}`)
    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new PricebookEntryFetchFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0],
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new PricebookEntryFetchFailed(undefined, { error })
    }
  }

  async put (pricebookEntryId: string, pricebookEntry: PricebookEntry): Promise<PricebookEntryResponse> {
    const uri = this.uriHelper.generateBaseUri(`/prices/book/entry/${pricebookEntryId}`)
    try {
      const response = await this.http.getClient().put(uri, pricebookEntry)

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new PricebookEntryPutFailed(undefined, { error })
    }
  }

  async create (pricebookEntry: PricebookEntry): Promise<PricebookEntryResponse> {
    const uri = this.uriHelper.generateBaseUri('/prices/book/entry')
    try {
      const response = await this.http.getClient().post(uri, pricebookEntry)

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new PricebookEntryCreationFailed(undefined, { error })
    }
  }

  async delete (pricebookEntryId: string): Promise<PricebookEntryResponse> {
    const uri = this.uriHelper.generateBaseUri(`/prices/book/entry/${pricebookEntryId}`)
    try {
      const response = await this.http.getClient().delete(uri)
      if (response.status !== 200) throw new PricebookEntryDeleteFailed()

      return {
        msg: response.data.msg
      }
    } catch (err) {
      throw new PricebookEntryDeleteFailed()
    }
  }
}

export class PricebookEntriesFetchFailed extends BaseError {
  public name = 'PricebookEntriesFetchFailed'
  constructor (
    public message: string = 'Could not fetch pricebook entries',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, PricebookEntriesFetchFailed.prototype)
  }
}

class PricebookEntriesMetaFailed extends BaseError {
  public name = 'PricebookEntriesMetaFailed'
  constructor (
    public message: string = 'Could not fetch pricebook entries meta call',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, PricebookEntriesMetaFailed.prototype)
  }
}

export class PricebookEntryFetchFailed extends BaseError {
  public name = 'PricebookEntryFetchFailed'
  constructor (
    public message: string = 'Could not fetch pricebook entry',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, PricebookEntryFetchFailed.prototype)
  }
}

export class PricebookEntryPutFailed extends BaseError {
  public name = 'PricebookEntryPutFailed'
  constructor (
    public message: string = 'Could not alter pricebook entry',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, PricebookEntryPutFailed.prototype)
  }
}

export class PricebookEntryCreationFailed extends BaseError {
  public name = 'PricebookEntryCreationFailed'
  constructor (
    public message: string = 'Could not create pricebook entry',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, PricebookEntryCreationFailed.prototype)
  }
}

export class PricebookEntryDeleteFailed extends BaseError {
  public name = 'PricebookEntryDeleteFailed'
  constructor (
    public message: string = 'Could not delete pricebook entry',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, PricebookEntryDeleteFailed.prototype)
  }
}
