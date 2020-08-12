import qs from 'qs'
import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface VoucherSystemsOptions {
  user?: string
  base?: string
}

export interface VoucherSystemsQuery {
  limit?: number
  uri?: string
  query?: {
    deleted?: boolean
    active?: boolean
  }
}

export interface VoucherSystemsResponse {
  data: Record<string, unknown>[]
  metadata: Record<string, unknown>
  next?: () => Promise<VoucherSystemsResponse>
}

export interface VoucherSystemResponse {
  data: VoucherSystem
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}

export interface VoucherSystem {
  id?: string
}

export interface VoucherSystem {
  name: string
  country?: string
  region?: string
  branches?: string[]
  hooks?: Record<string, unknown>
  active?: boolean
  deleted?: boolean
  increments?: Record<string, unknown>[]
}

export class VoucherSystems extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/loyalty/voucher_systems'
  endpoint: string
  http: Client
  public options: VoucherSystemsOptions
  public uriHelper: UriHelper

  constructor(options: VoucherSystemsOptions, http: Client) {
    super(http, {
      endpoint: VoucherSystems.baseEndpoint,
      base: options.base || 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = VoucherSystems.baseEndpoint
    this.options.base = this.options.base || 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  getAll(queryOrOptions?: VoucherSystemsQuery | undefined): Promise<VoucherSystemsResponse> {
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
          return reject(new VoucherSystemsFetchFailed(undefined, { status: response.status }))
        }

        if (response.data.cursor && response.data.cursor.next) {
          next = (): Promise<VoucherSystemsResponse> =>
            this.getAll({ uri: response.data.cursor.next })
        }

        return resolve({
          data: response.data.results,
          metadata: { cursor: response.data.cursor },
          next
        } as VoucherSystemsResponse)
      } catch (error) {
        return reject(new VoucherSystemsFetchFailed(undefined, { error }))
      }
    })
  }

  get(voucherSystemId: string): Promise<VoucherSystemResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${voucherSystemId}`
      try {
        const response = await this.http.getClient().get(uri)
        response.status !== 200 &&
          reject(new VoucherSystemFetchFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results[0] as VoucherSystem,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        } as VoucherSystemResponse)
      } catch (error) {
        return reject(new VoucherSystemFetchFailed(undefined, { error }))
      }
    })
  }

  put(voucherSystemId: string, voucherSystemGroup: VoucherSystem): Promise<VoucherSystemResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${voucherSystemId}`
      try {
        const response = await this.http.getClient().put(uri, voucherSystemGroup)

        return resolve({
          data: response.data.results[0] as VoucherSystem,
          metadata: { count: response.data.count }
        } as VoucherSystemResponse)
      } catch (error) {
        return reject(new VoucherSystemPutFailed(undefined, { error }))
      }
    })
  }

  create(voucherSystemGroup: VoucherSystem): Promise<VoucherSystemResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}`
      try {
        const response = await this.http.getClient().post(uri, voucherSystemGroup)

        return resolve({
          data: response.data.results[0] as VoucherSystem,
          metadata: { count: response.data.count }
        } as VoucherSystemResponse)
      } catch (error) {
        return reject(new VoucherSystemCreationFailed(undefined, { error }))
      }
    })
  }

  delete(voucherSystemId: string): Promise<VoucherSystemResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${voucherSystemId}`
      try {
        const response = await this.http.getClient().delete(uri)
        response.status !== 200 && reject(new VoucherSystemDeleteFailed())

        return resolve({
          msg: response.data.msg
        } as VoucherSystemResponse)
      } catch (err) {
        return reject(new VoucherSystemDeleteFailed())
      }
    })
  }
}

export class VoucherSystemsFetchFailed extends BaseError {
  public name = 'VoucherSystemsFetchFailed'
  constructor(
    public message: string = 'Could not fetch voucher systems',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, VoucherSystemsFetchFailed.prototype)
  }
}

export class VoucherSystemFetchFailed extends BaseError {
  public name = 'VoucherSystemFetchFailed'
  constructor(
    public message: string = 'Could not fetch voucher system',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, VoucherSystemFetchFailed.prototype)
  }
}

export class VoucherSystemPutFailed extends BaseError {
  public name = 'VoucherSystemhPutFailed'
  constructor(
    public message: string = 'Could not alter voucher system',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, VoucherSystemPutFailed.prototype)
  }
}

export class VoucherSystemCreationFailed extends BaseError {
  public name = 'VoucherSystemCreationFailed'
  constructor(
    public message: string = 'Could not create voucher system',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, VoucherSystemCreationFailed.prototype)
  }
}

export class VoucherSystemDeleteFailed extends BaseError {
  public name = 'VoucherSystemDeleteFailed'
  constructor(
    public message: string = 'Could not delete voucher system',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, VoucherSystemDeleteFailed.prototype)
  }
}
