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
  data: SafesResponse
  metadata?: {
    count?: number
  }
  msg?: string
}

export interface SafesResponse {
  data: object[]
  metadata: object
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
  items?: Array<AmountItem> | null
  metadata?: object
  deleted?: boolean
  active?: boolean
}

export interface BookRequestBody {
  to: string,
  from: string,
  issuer: string
  items: Array<Object>,
  comment?: string,
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
}

export interface SafesLogBookResponse {
  data: object[]
  next?: () => Promise<SafesLogBookResponse>
}

export class Safes extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/safes'
  endpoint: string
  http: Client
  public options: SafesOptions
  public uriHelper: UriHelper

  constructor(options: SafesOptions, http: Client) {
    super(http, { endpoint: Safes.baseEndpoint, base: options.base || 'https://api.tillhub.com' })
    this.options = options
    this.http = http

    this.endpoint = Safes.baseEndpoint
    this.options.base = this.options.base || 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  getAll(query?: SafesQuery | undefined): Promise<SafesResponse> {
    return new Promise(async (resolve, reject) => {
      let next

      try {
        const base = this.uriHelper.generateBaseUri()
        const uri = this.uriHelper.generateUriWithQuery(base, query)

        const response = await this.http.getClient().get(uri)

        if (response.data.cursor && response.data.cursor.next) {
          next = (): Promise<SafesResponse> => this.getAll({ uri: response.data.cursor.next })
        }

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count, cursor: response.data.cursor },
          next
        } as SafesResponse)
      } catch (error) {
        return reject(new errors.SafesFetchAllFailed(undefined, { error }))
      }
    })
  }

  get(safeId: string): Promise<SafeResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uri = this.uriHelper.generateBaseUri(`/${safeId}`)
        const response = await this.http.getClient().get(uri)
        response.status !== 200 &&
          reject(new errors.SafesFetchOneFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results[0] as Safe,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        } as SafeResponse)
      } catch (error) {
        return reject(new errors.SafesFetchOneFailed(undefined, { error }))
      }
    })
  }

  meta(): Promise<SafesResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uri = this.uriHelper.generateBaseUri(`/meta`)
        const response = await this.http.getClient().get(uri)

        if (response.status !== 200) reject(new errors.SafesGetMetaFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as SafesResponse)
      } catch (error) {
        return reject(new errors.SafesGetMetaFailed(undefined, { error }))
      }
    })
  }

  create(safe: Safe): Promise<SafeResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uri = this.uriHelper.generateBaseUri()
        const response = await this.http.getClient().post(uri, safe)

        return resolve({
          data: response.data.results[0] as Safe,
          metadata: { count: response.data.count }
        } as SafeResponse)
      } catch (error) {
        return reject(new errors.SafesCreationFailed(undefined, { error }))
      }
    })
  }

  put(safeId: string, safe: Safe): Promise<SafeResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uri = this.uriHelper.generateBaseUri(`/${safeId}`)
        const response = await this.http.getClient().put(uri, safe)
        response.status !== 200 &&
          reject(new errors.SafesPutFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results[0] as Safe,
          metadata: { count: response.data.count }
        } as SafeResponse)
      } catch (error) {
        return reject(new errors.SafesPutFailed(undefined, { error }))
      }
    })
  }

  book(body: BookRequestBody): Promise<SafeResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uri = this.uriHelper.generateBaseUri(`/book`)
        const response = await this.http.getClient().post(uri, body)

        return resolve({
          data: response.data,
          msg: response.data.msg
        } as SafeResponse)
      } catch (error) {
        return reject(new errors.SafesBookFailed(error.msg, { error }))
      }
    })
  }
}

export class SafesLogBook extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/safes'
  endpoint: string
  http: Client
  public options: SafesLogBookOptions
  public uriHelper: UriHelper

  constructor(options: SafesLogBookOptions, http: Client) {
    super(http, { endpoint: SafesLogBook.baseEndpoint, base: options.base || 'https://api.tillhub.com' })
    this.options = options
    this.http = http

    this.endpoint = SafesLogBook.baseEndpoint
    this.options.base = this.options.base || 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  getAll(query?: SafesLogBookQuery | undefined): Promise<SafesLogBookResponse> {
    return new Promise(async (resolve, reject) => {
      let next

      try {
        const base = this.uriHelper.generateBaseUri('/logs')
        const uri = this.uriHelper.generateUriWithQuery(base, query)

        const response = await this.http.getClient().get(uri)

        if (response.data.cursor && response.data.cursor.next) {
          next = (): Promise<SafesLogBookResponse> => this.getAll({ uri: response.data.cursor.next })
        }

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count, cursor: response.data.cursor },
          next
        } as SafesLogBookResponse)
      } catch (error) {
        return reject(new errors.SafesLogBookFetchAllFailed(undefined, { error }))
      }
    })
  }

  meta(query?: SafesLogBookQuery | undefined): Promise<SafesLogBookResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const base = this.uriHelper.generateBaseUri('/logs/meta')
        const uri = this.uriHelper.generateUriWithQuery(base, query)

        const response = await this.http.getClient().get(uri)

        if (response.status !== 200) reject(new errors.SafesLogBookGetMetaFailed())

        return resolve({
          data: response.data.results[0],
          metadata: { count: response.data.results[0].count }
        } as SafesLogBookResponse)
      } catch (error) {
        return reject(new errors.SafesLogBookGetMetaFailed(undefined, { error }))
      }
    })
  }
}
