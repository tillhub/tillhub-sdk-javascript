import qs from 'qs'
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
  data: object[]
  metadata: object
  next?: () => Promise<FunctionsResponse>
}

export interface FunctionResponse {
  data: Function
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}

export type FunctionRuntime = 'pos' | 'nodejs8x' | 'python27'
export type FunctionType = 'local' | 'http' | 'pubsub'
export type FunctionConfigurationClass = 'instant_checkout' | 'add_to_cart'
export type FunctionConfigurationResourceType = 'product' | 'discount' | 'voucher_action' | 'customer'

export interface FunctionConfigurationResource {
  type?: FunctionConfigurationResourceType
  object_id?: string
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

export interface Function {
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

  constructor(options: FunctionsOptions, http: Client) {
    super(http, { endpoint: Functions.baseEndpoint, base: options.base || 'https://api.tillhub.com' })
    this.options = options
    this.http = http

    this.endpoint = Functions.baseEndpoint
    this.options.base = this.options.base || 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  getAll(query?: FunctionsQuery | undefined): Promise<FunctionsResponse> {
    return new Promise(async (resolve, reject) => {
      let next

      try {
        const base = this.uriHelper.generateBaseUri()
        const uri = this.uriHelper.generateUriWithQuery(base, query)

        const response = await this.http.getClient().get(uri)

        if (response.data.cursor && response.data.cursor.next) {
          next = (): Promise<FunctionsResponse> => this.getAll({ uri: response.data.cursor.next })
        }

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count, cursor: response.data.cursor },
          next
        } as FunctionsResponse)
      } catch (error) {
        return reject(new FunctionsFetchFailed(undefined, { error }))
      }
    })
  }

  get(functionId: string): Promise<FunctionResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = this.uriHelper.generateBaseUri(`/${functionId}`)
      try {
        const response = await this.http.getClient().get(uri)
        response.status !== 200 &&
        reject(new FunctionFetchFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results[0] as Function,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        } as FunctionResponse)
      } catch (error) {
        return reject(new FunctionFetchFailed(undefined, { error }))
      }
    })
  }

  put(functionId: string, fn: Function): Promise<FunctionResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = this.uriHelper.generateBaseUri(`/${functionId}`)
      try {
        const response = await this.http.getClient().put(uri, fn)

        return resolve({
          data: response.data.results[0] as Function,
          metadata: { count: response.data.count }
        } as FunctionResponse)
      } catch (error) {
        return reject(new FunctionPutFailed(undefined, { error }))
      }
    })
  }

  create(fn: Function): Promise<FunctionResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = this.uriHelper.generateBaseUri()
      try {
        const response = await this.http.getClient().post(uri, fn)

        return resolve({
          data: response.data.results[0] as Function,
          metadata: { count: response.data.count }
        } as FunctionResponse)
      } catch (error) {
        return reject(new FunctionCreationFailed(undefined, { error }))
      }
    })
  }

  delete(functionId: string): Promise<FunctionResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = this.uriHelper.generateBaseUri(`/${functionId}`)
      try {
        const response = await this.http.getClient().delete(uri)
        response.status !== 200 && reject(new FunctionDeleteFailed())

        return resolve({
          msg: response.data.msg
        } as FunctionResponse)
      } catch (err) {
        return reject(new FunctionDeleteFailed())
      }
    })
  }
}

export class FunctionsFetchFailed extends BaseError {
  public name = 'FunctionsFetchFailed'
  constructor(public message: string = 'Could not fetch functions', properties?: any) {
    super(message, properties)
  }
}

export class FunctionFetchFailed extends BaseError {
  public name = 'FunctionFetchFailed'
  constructor(public message: string = 'Could not fetch function', properties?: any) {
    super(message, properties)
  }
}

export class FunctionPutFailed extends BaseError {
  public name = 'FunctionPutFailed'
  constructor(public message: string = 'Could not alter function', properties?: any) {
    super(message, properties)
  }
}

export class FunctionCreationFailed extends BaseError {
  public name = 'FunctionCreationFailed'
  constructor(public message: string = 'Could not create function', properties?: any) {
    super(message, properties)
  }
}

export class FunctionDeleteFailed extends BaseError {
  public name = 'FunctionDeleteFailed'
  constructor(public message: string = 'Could not delete function', properties?: any) {
    super(message, properties)
  }
}
