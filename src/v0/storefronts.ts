import qs from 'qs'
import { Client } from '../client'
import { BaseError } from '../errors'
import { ThBaseHandler } from '../base'

export interface StorefrontsOptions {
  user?: string
  base?: string
}

export interface StorefrontsQuery {
  limit?: number
  uri?: string
  query?: {
    deleted?: boolean
    active?: boolean
  }
}

export interface StorefrontsResponse {
  data: Storefront[]
  metadata: Record<string, unknown>
}

export interface StorefrontResponse {
  data: Storefront
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}

export interface StorefrontProfile {
  currency?: string
  language?: string
  tax?: number
}

export interface Storefront {
  id?: string
  name?: string
  description?: string
  type?: string
  external_system_type?: string
  resource_syncs_outbound?: string[]
  resource_syncs_inbound?: string[]
  link?: string
  external_reference_id?: string
  external_api_base?: string
  auth?: Record<string, unknown>
  metadata?: Record<string, unknown>
  profile?: StorefrontProfile
}

export class Storefronts extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/storefronts'
  endpoint: string
  http: Client
  public options: StorefrontsOptions

  constructor (options: StorefrontsOptions, http: Client) {
    super(http, {
      endpoint: Storefronts.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = Storefronts.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
  }

  getAll (queryOrOptions?: StorefrontsQuery | undefined): Promise<StorefrontsResponse> {
    return new Promise(async (resolve, reject) => {
      let next

      try {
        let uri
        if (queryOrOptions?.uri) {
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
          return reject(new StorefrontsFetchFailed(undefined, { status: response.status }))
        }

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count },
          next
        } as StorefrontsResponse)
      } catch (error) {
        return reject(new StorefrontsFetchFailed(undefined, { error }))
      }
    })
  }

  get (storefrontId: string): Promise<StorefrontResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${storefrontId}`
      try {
        const response = await this.http.getClient().get(uri)
        response.status !== 200 &&
          reject(new StorefrontsFetchOneFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results[0] as Storefront,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        } as StorefrontResponse)
      } catch (error) {
        return reject(new StorefrontsFetchOneFailed(undefined, { error }))
      }
    })
  }

  put (storefrontId: string, storefront: Storefront): Promise<StorefrontResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${storefrontId}`
      try {
        const response = await this.http.getClient().put(uri, storefront)

        return resolve({
          data: response.data.results[0] as Storefront,
          metadata: { count: response.data.count }
        } as StorefrontResponse)
      } catch (error) {
        return reject(new StorefrontsPutFailed(undefined, { error }))
      }
    })
  }

  create (storefront: Storefront): Promise<StorefrontResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}`
      try {
        const response = await this.http.getClient().post(uri, storefront)

        return resolve({
          data: response.data.results[0] as Storefront,
          metadata: { count: response.data.count }
        } as StorefrontResponse)
      } catch (error) {
        return reject(new StorefrontsCreationFailed(undefined, { error }))
      }
    })
  }

  delete (storefrontId: string): Promise<StorefrontResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${storefrontId}`
      try {
        const response = await this.http.getClient().delete(uri)
        response.status !== 200 && reject(new StorefrontsDeleteFailed())

        return resolve({
          msg: response.data.msg
        } as StorefrontResponse)
      } catch (err) {
        return reject(new StorefrontsDeleteFailed())
      }
    })
  }
}

export class StorefrontsFetchFailed extends BaseError {
  public name = 'StorefrontsFetchFailed'
  constructor (
    public message: string = 'Could not fetch storefronts',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, StorefrontsFetchFailed.prototype)
  }
}

export class StorefrontsFetchOneFailed extends BaseError {
  public name = 'StorefrontsFetchOneFailed'
  constructor (
    public message: string = 'Could not fetch one storefront',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, StorefrontsFetchOneFailed.prototype)
  }
}

export class StorefrontsPutFailed extends BaseError {
  public name = 'StorefrontsPutFailed'
  constructor (
    public message: string = 'Could not update storefront',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, StorefrontsPutFailed.prototype)
  }
}

export class StorefrontsCreationFailed extends BaseError {
  public name = 'StorefrontsCreationFailed'
  constructor (
    public message: string = 'Could not create storefronts',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, StorefrontsCreationFailed.prototype)
  }
}

export class StorefrontsDeleteFailed extends BaseError {
  public name = 'StorefrontsDeleteFailed'
  constructor (
    public message: string = 'Could not delete storefronts',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, StorefrontsDeleteFailed.prototype)
  }
}
