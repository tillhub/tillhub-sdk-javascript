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
  data: PricebookEntry
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

  constructor(options: PricebookEntriesOptions, http: Client, uriHelper: UriHelper) {
    this.options = options
    this.http = http
    this.uriHelper = uriHelper
  }

  getAll(query?: PricebookEntriesQuery | undefined): Promise<PricebookEntriesResponse> {
    return new Promise(async (resolve, reject) => {
      let next

      try {
        const base = this.uriHelper.generateBaseUri('/prices/book/entry')
        const uri = this.uriHelper.generateUriWithQuery(base, query)

        const response = await this.http.getClient().get(uri)

        if (response.data.cursor && response.data.cursor.next) {
          next = (): Promise<PricebookEntriesResponse> =>
            this.getAll({ uri: response.data.cursor.next })
        }

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count, cursor: response.data.cursor },
          next
        } as PricebookEntriesResponse)
      } catch (error) {
        return reject(new PricebookEntriesFetchFailed(undefined, { error }))
      }
    })
  }

  meta(): Promise<PricebookEntriesResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uri = this.uriHelper.generateBaseUri('/prices/book/entry/meta')
        const response = await this.http.getClient().get(uri)

        if (response.status !== 200) reject(new PricebookEntriesMetaFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as PricebookEntriesResponse)
      } catch (error) {
        return reject(new PricebookEntriesMetaFailed(undefined, { error }))
      }
    })
  }

  get(pricebookEntryId: string): Promise<PricebookEntryResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = this.uriHelper.generateBaseUri(`/prices/book/entry/${pricebookEntryId}`)
      try {
        const response = await this.http.getClient().get(uri)
        response.status !== 200 &&
          reject(new PricebookEntryFetchFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results[0] as PricebookEntry,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        } as PricebookEntryResponse)
      } catch (error) {
        return reject(new PricebookEntryFetchFailed(undefined, { error }))
      }
    })
  }

  put(pricebookEntryId: string, pricebookEntry: PricebookEntry): Promise<PricebookEntryResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = this.uriHelper.generateBaseUri(`/prices/book/entry/${pricebookEntryId}`)
      try {
        const response = await this.http.getClient().put(uri, pricebookEntry)

        return resolve({
          data: response.data.results[0] as PricebookEntry,
          metadata: { count: response.data.count }
        } as PricebookEntryResponse)
      } catch (error) {
        return reject(new PricebookEntryPutFailed(undefined, { error }))
      }
    })
  }

  create(pricebookEntry: PricebookEntry): Promise<PricebookEntryResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = this.uriHelper.generateBaseUri('/prices/book/entry')
      try {
        const response = await this.http.getClient().post(uri, pricebookEntry)

        return resolve({
          data: response.data.results[0] as PricebookEntry,
          metadata: { count: response.data.count }
        } as PricebookEntryResponse)
      } catch (error) {
        return reject(new PricebookEntryCreationFailed(undefined, { error }))
      }
    })
  }

  delete(pricebookEntryId: string): Promise<PricebookEntryResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = this.uriHelper.generateBaseUri(`/prices/book/entry/${pricebookEntryId}`)
      try {
        const response = await this.http.getClient().delete(uri)
        response.status !== 200 && reject(new PricebookEntryDeleteFailed())

        return resolve({
          msg: response.data.msg
        } as PricebookEntryResponse)
      } catch (err) {
        return reject(new PricebookEntryDeleteFailed())
      }
    })
  }
}

export class PricebookEntriesFetchFailed extends BaseError {
  public name = 'PricebookEntriesFetchFailed'
  constructor(public message: string = 'Could not fetch pricebook entries', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, PricebookEntriesFetchFailed.prototype)
  }
}

class PricebookEntriesMetaFailed extends BaseError {
  public name = 'PricebookEntriesMetaFailed'
  constructor(
    public message: string = 'Could not fetch pricebook entries meta call',
    properties?: any
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, PricebookEntriesMetaFailed.prototype)
  }
}

export class PricebookEntryFetchFailed extends BaseError {
  public name = 'PricebookEntryFetchFailed'
  constructor(public message: string = 'Could not fetch pricebook entry', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, PricebookEntryFetchFailed.prototype)
  }
}

export class PricebookEntryPutFailed extends BaseError {
  public name = 'PricebookEntryPutFailed'
  constructor(public message: string = 'Could not alter pricebook entry', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, PricebookEntryPutFailed.prototype)
  }
}

export class PricebookEntryCreationFailed extends BaseError {
  public name = 'PricebookEntryCreationFailed'
  constructor(public message: string = 'Could not create pricebook entry', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, PricebookEntryCreationFailed.prototype)
  }
}

export class PricebookEntryDeleteFailed extends BaseError {
  public name = 'PricebookEntryDeleteFailed'
  constructor(public message: string = 'Could not delete pricebook entry', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, PricebookEntryDeleteFailed.prototype)
  }
}
