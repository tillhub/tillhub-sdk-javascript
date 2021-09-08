import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface FunctionsOptions {
  user?: string
  base?: string
}

export interface FunctionsQuery {
  limit?: number
  uri?: string
  query?: {
    deleted?: boolean
    active?: boolean
  }
}

export interface FunctionsResponse {
  data: Array<Record<string, unknown>>
  metadata: Record<string, unknown>
  next?: () => Promise<FunctionsResponse>
}

export interface FunctionResponse {
  data?: () => any
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}

export type FunctionRuntime = 'pos' | 'nodejs8x' | 'python27'
export type FunctionType = 'local' | 'http' | 'pubsub'
export type FunctionConfigurationClass = 'instant_checkout' | 'add_to_cart'
export type FunctionConfigurationResourceType =
  | 'product'
  | 'discount'
  | 'voucher_action'
  | 'customer'

export interface FunctionConfigurationResource {
  type?: FunctionConfigurationResourceType
  obj?: string
}

export interface FunctionConfigurationImages {
  original?: string
  '1x'?: string
  avatar?: string
}

export interface FunctionConfiguration {
  class: FunctionConfigurationClass
  description?: string
  resources?: FunctionConfigurationResource[]
  images?: FunctionConfigurationImages
  // TODO: not sure what to do with instantCheckoutPayload
}

export interface FunctionInterface {
  name?: string
  runtime?: FunctionRuntime
  type?: FunctionType
  function?: string
  topic?: string
  handler?: string
  deps?: string
  active?: boolean
  deleted?: boolean
  configuration?: FunctionConfiguration
}

export class Functions extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/functions'
  endpoint: string
  http: Client
  public options: FunctionsOptions
  public uriHelper: UriHelper

  constructor (options: FunctionsOptions, http: Client) {
    super(http, {
      endpoint: Functions.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = Functions.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (query?: FunctionsQuery | undefined): Promise<FunctionsResponse> {
    let next

    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)

      if (response.data.cursor?.next) {
        next = (): Promise<FunctionsResponse> => this.getAll({ uri: response.data.cursor.next })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count, cursor: response.data.cursor },
        next
      }
    } catch (error: any) {
      throw new FunctionsFetchFailed(undefined, { error })
    }
  }

  async get (functionId: string): Promise<FunctionResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${functionId}`)
    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new FunctionFetchFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0],
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new FunctionFetchFailed(undefined, { error })
    }
  }

  async put (functionId: string, fn: FunctionInterface): Promise<FunctionResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${functionId}`)
    try {
      const response = await this.http.getClient().put(uri, fn)

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new FunctionPutFailed(undefined, { error })
    }
  }

  async create (fn: FunctionInterface): Promise<FunctionResponse> {
    const uri = this.uriHelper.generateBaseUri()
    try {
      const response = await this.http.getClient().post(uri, fn)

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new FunctionCreationFailed(undefined, { error })
    }
  }

  async delete (functionId: string): Promise<FunctionResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${functionId}`)
    try {
      const response = await this.http.getClient().delete(uri)
      if (response.status !== 200) throw new FunctionDeleteFailed()

      return {
        msg: response.data.msg
      }
    } catch (err) {
      throw new FunctionDeleteFailed()
    }
  }
}

export class FunctionsFetchFailed extends BaseError {
  public name = 'FunctionsFetchFailed'
  constructor (
    public message: string = 'Could not fetch functions',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, FunctionsFetchFailed.prototype)
  }
}

export class FunctionFetchFailed extends BaseError {
  public name = 'FunctionFetchFailed'
  constructor (
    public message: string = 'Could not fetch function',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, FunctionFetchFailed.prototype)
  }
}

export class FunctionPutFailed extends BaseError {
  public name = 'FunctionPutFailed'
  constructor (
    public message: string = 'Could not alter function',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, FunctionPutFailed.prototype)
  }
}

export class FunctionCreationFailed extends BaseError {
  public name = 'FunctionCreationFailed'
  constructor (
    public message: string = 'Could not create function',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, FunctionCreationFailed.prototype)
  }
}

export class FunctionDeleteFailed extends BaseError {
  public name = 'FunctionDeleteFailed'
  constructor (
    public message: string = 'Could not delete function',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, FunctionDeleteFailed.prototype)
  }
}
