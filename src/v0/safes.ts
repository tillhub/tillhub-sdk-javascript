import { Client } from '../client'
import * as errors from '../errors/safes'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface SafesOptions {
  user?: string
  base?: string
}

export interface SafesQuery {
  limit?: number
  uri?: string
  location?: string
}

export interface SafeResponse {
  data: Safe
  metadata?: {
    count?: number
  }
  msg?: string
}

export interface SafesResponse {
  data: Safe[]
  metadata: Record<string, unknown>
  next?: () => Promise<SafesResponse>
}

export interface AmountItem {
  currency: string
  amount: number
}

export interface Safe {
  type?: string
  account_number?: string
  name?: string
  custom_id?: string
  cost_center?: string
  location?: string
  state?: string
  limit_upper?: number
  limit_lower?: number
  items?: AmountItem[] | null
  metadata?: Record<string, unknown>
  deleted?: boolean
  active?: boolean
}

export interface BookRequestBody {
  to: string
  from: string
  issuer: string
  items: Array<Record<string, unknown>>
  initiated_at?: string
}

export interface SafesLogBookOptions {
  user?: string
  base?: string
}

export interface SafesLogBookQuery {
  limit?: number
  uri?: string
  embed?: string | string[]
  operation?: string | string[]
  exclude_errors?: boolean
  start?: string
  end?: string
  transaction_id?: string
  transfer_party?: string
  cursor_field?: string
  format?: string
  source_or_destination?: string
  source?: string
  destination?: string
  transfer_type?: string | string[]
  transfer_value_range_start?: number
  transfer_value_range_end?: number
  currency?: string
}

export interface SafesLogBookResponse {
  data: Array<Record<string, unknown>>
  metadata?: {
    count?: number
    cursor?: number
  }
  next?: () => Promise<SafesLogBookResponse>
}

export class Safes extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/safes'
  endpoint: string
  http: Client
  public options: SafesOptions
  public uriHelper: UriHelper

  constructor (options: SafesOptions, http: Client) {
    super(http, { endpoint: Safes.baseEndpoint, base: options.base ?? 'https://api.tillhub.com' })
    this.options = options
    this.http = http

    this.endpoint = Safes.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (query?: SafesQuery | undefined): Promise<SafesResponse> {
    let next

    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)

      if (response.data.cursor?.next) {
        next = (): Promise<SafesResponse> => this.getAll({ uri: response.data.cursor.next })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count, cursor: response.data.cursor },
        next
      }
    } catch (error) {
      throw new errors.SafesFetchAllFailed(undefined, { error })
    }
  }

  async get (safeId: string): Promise<SafeResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri(`/${safeId}`)
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new errors.SafesFetchOneFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0] as Safe,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error) {
      throw new errors.SafesFetchOneFailed(undefined, { error })
    }
  }

  async meta (): Promise<SafesResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri('/meta')
      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) throw new errors.SafesGetMetaFailed()

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (error) {
      throw new errors.SafesGetMetaFailed(undefined, { error })
    }
  }

  async create (safe: Safe): Promise<SafeResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri()
      const response = await this.http.getClient().post(uri, safe)

      return {
        data: response.data.results[0] as Safe,
        metadata: { count: response.data.count }
      }
    } catch (error) {
      throw new errors.SafesCreationFailed(undefined, { error })
    }
  }

  async put (safeId: string, safe: Safe): Promise<SafeResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri(`/${safeId}`)
      const response = await this.http.getClient().put(uri, safe)
      if (response.status !== 200) { throw new errors.SafesPutFailed(undefined, { status: response.status }) }

      return {
        data: response.data.results[0] as Safe,
        metadata: { count: response.data.count }
      }
    } catch (error) {
      throw new errors.SafesPutFailed(undefined, { error })
    }
  }

  async book (body: BookRequestBody): Promise<SafeResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri('/book')
      const response = await this.http.getClient().post(uri, body)

      return {
        data: response.data,
        msg: response.data.msg
      }
    } catch (error) {
      throw new errors.SafesBookFailed(error.msg, { error })
    }
  }
}

export class SafesLogBook extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/safes'
  endpoint: string
  http: Client
  public options: SafesLogBookOptions
  public uriHelper: UriHelper

  constructor (options: SafesLogBookOptions, http: Client) {
    super(http, {
      endpoint: SafesLogBook.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = SafesLogBook.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (query?: SafesLogBookQuery | undefined): Promise<SafesLogBookResponse> {
    let next

    try {
      const base = this.uriHelper.generateBaseUri('/logs')
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)

      if (response.data.cursor?.next) {
        next = (): Promise<SafesLogBookResponse> =>
          this.getAll({ uri: response.data.cursor.next })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count, cursor: response.data.cursor },
        next
      }
    } catch (error) {
      throw new errors.SafesLogBookFetchAllFailed(undefined, { error })
    }
  }

  async meta (query?: SafesLogBookQuery | undefined): Promise<SafesLogBookResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/logs/meta')
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) throw new errors.SafesLogBookGetMetaFailed()

      return {
        data: response.data.results[0],
        metadata: { count: response.data.results[0].count }
      }
    } catch (error) {
      throw new errors.SafesLogBookGetMetaFailed(undefined, { error })
    }
  }
}
