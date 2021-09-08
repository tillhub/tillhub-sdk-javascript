import { Client } from '../client'
import { BaseError } from '../errors'
import { ThBaseHandler } from '../base'
import { UriHelper } from '../uri-helper'

export interface ReasonsOptions {
  user?: string
  base?: string
}

export interface ReasonsQuery {
  limit?: number
  uri?: string
  query?: {
    deleted?: boolean
    active?: boolean
  }
}

export interface ReasonsResponse {
  data: Reason[]
  metadata: Record<string, unknown>
}

export interface ReasonResponse {
  data?: Reason
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}

export interface Reason {
  id?: string
  name?: string
  description?: string
  type?: string
  behavior?: Behavior
}

export interface Behavior {
  stock?: string
  stock_location?: string
  navigation?: string
}

export class Reasons extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/reasons'
  endpoint: string
  http: Client
  public options: ReasonsOptions
  public uriHelper: UriHelper

  constructor (options: ReasonsOptions, http: Client) {
    super(http, { endpoint: Reasons.baseEndpoint, base: options.base ?? 'https://api.tillhub.com' })
    this.options = options
    this.http = http

    this.endpoint = Reasons.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (queryOrOptions?: ReasonsQuery | undefined): Promise<ReasonsResponse> {
    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, queryOrOptions)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new ReasonsFetchFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new ReasonsFetchFailed(undefined, { error })
    }
  }

  async get (reasonId: string): Promise<ReasonResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${reasonId}`)
    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new ReasonsFetchOneFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0] as Reason,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new ReasonsFetchOneFailed(undefined, { error })
    }
  }

  async put (reasonId: string, reason: Reason): Promise<ReasonResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${reasonId}`)
    try {
      const response = await this.http.getClient().put(uri, reason)

      return {
        data: response.data.results[0] as Reason,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new ReasonsPutFailed(undefined, { error })
    }
  }

  async create (reason: Reason): Promise<ReasonResponse> {
    const uri = this.uriHelper.generateBaseUri()
    try {
      const response = await this.http.getClient().post(uri, reason)

      return {
        data: response.data.results[0] as Reason,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new ReasonsCreationFailed(undefined, { error })
    }
  }

  async delete (reasonId: string): Promise<ReasonResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${reasonId}`)
    try {
      const response = await this.http.getClient().delete(uri)
      if (response.status !== 200) throw new ReasonsDeleteFailed()

      return {
        msg: response.data.msg
      }
    } catch (err) {
      throw new ReasonsDeleteFailed()
    }
  }
}

export class ReasonsFetchFailed extends BaseError {
  public name = 'ReasonsFetchFailed'
  constructor (
    public message: string = 'Could not fetch reasons',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ReasonsFetchFailed.prototype)
  }
}

export class ReasonsFetchOneFailed extends BaseError {
  public name = 'ReasonsFetchOneFailed'
  constructor (
    public message: string = 'Could not fetch one reason',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ReasonsFetchOneFailed.prototype)
  }
}

export class ReasonsPutFailed extends BaseError {
  public name = 'ReasonsPutFailed'
  constructor (
    public message: string = 'Could not update reason',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ReasonsPutFailed.prototype)
  }
}

export class ReasonsCreationFailed extends BaseError {
  public name = 'ReasonsCreationFailed'
  constructor (
    public message: string = 'Could not create reasons',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ReasonsCreationFailed.prototype)
  }
}

export class ReasonsDeleteFailed extends BaseError {
  public name = 'ReasonsDeleteFailed'
  constructor (
    public message: string = 'Could not delete reasons',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ReasonsDeleteFailed.prototype)
  }
}
