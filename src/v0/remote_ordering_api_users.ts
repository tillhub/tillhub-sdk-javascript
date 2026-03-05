import { Client } from '../client'
import { BaseError } from '../errors/baseError'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface RemoteOrderingApiUsersOptions {
  user?: string
  base?: string
}

export interface RemoteOrderingApiUserResponse {
  data: RemoteOrderingApiUser
  metadata: Record<string, unknown>
  msg?: string
  errors?: ErrorObject[]
}

export interface ErrorObject {
  id: string
  label: string
  errorDetails: Record<string, unknown>
}

export interface RemoteOrderingApiUser {
  id: string
  username: string
  exists: boolean
}

export interface RemoteOrderingApiUserCreatePayload {
  password: string
}

export class RemoteOrderingApiUsers extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/remote-ordering-api-users'
  endpoint: string
  http: Client
  public options: RemoteOrderingApiUsersOptions
  public uriHelper: UriHelper

  constructor (options: RemoteOrderingApiUsersOptions, http: Client) {
    super(http, {
      endpoint: RemoteOrderingApiUsers.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = RemoteOrderingApiUsers.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async get (): Promise<RemoteOrderingApiUserResponse> {
    const base = this.uriHelper.generateBaseUri()
    const uri = this.uriHelper.generateUriWithQuery(base)

    try {
      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) {
        throw new RemoteOrderingApiUserFetchFailed(undefined, {
          status: response.status
        })
      }
      return {
        data: response.data.results?.[0] ?? response.data,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new RemoteOrderingApiUserFetchFailed(error.message, { error })
    }
  }

  async create (
    payload: RemoteOrderingApiUserCreatePayload
  ): Promise<RemoteOrderingApiUserResponse> {
    const base = this.uriHelper.generateBaseUri()
    const uri = this.uriHelper.generateUriWithQuery(base)

    try {
      const response = await this.http.getClient().post(uri, payload)

      if (response.status !== 200 && response.status !== 201) {
        throw new RemoteOrderingApiUserCreateFailed(undefined, {
          status: response.status
        })
      }
      return {
        data: response.data.results?.[0] ?? response.data,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new RemoteOrderingApiUserCreateFailed(error.message, { error })
    }
  }

  async updatePassword (
    payload: RemoteOrderingApiUserCreatePayload
  ): Promise<RemoteOrderingApiUserResponse> {
    const base = this.uriHelper.generateBaseUri()
    const uri = this.uriHelper.generateUriWithQuery(base)

    try {
      const response = await this.http.getClient().post(uri, payload)

      if (response.status !== 200) {
        throw new RemoteOrderingApiUserUpdateFailed(undefined, {
          status: response.status
        })
      }
      return {
        data: response.data.results?.[0] ?? response.data,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new RemoteOrderingApiUserUpdateFailed(error.message, { error })
    }
  }

  async delete (): Promise<RemoteOrderingApiUserResponse> {
    const base = this.uriHelper.generateBaseUri()
    const uri = this.uriHelper.generateUriWithQuery(base)

    try {
      const response = await this.http.getClient().delete(uri)

      if (response.status !== 200 && response.status !== 204) {
        throw new RemoteOrderingApiUserDeleteFailed(undefined, {
          status: response.status
        })
      }
      return {
        data: response.data?.results?.[0] ?? response.data ?? {},
        msg: response.data?.msg,
        metadata: { count: response.data?.count }
      }
    } catch (error: any) {
      throw new RemoteOrderingApiUserDeleteFailed(error.message, { error })
    }
  }
}

export class RemoteOrderingApiUserFetchFailed extends BaseError {
  public name = 'RemoteOrderingApiUserFetchFailed'
  constructor (
    public message: string = 'Could not fetch remote ordering API user',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, RemoteOrderingApiUserFetchFailed.prototype)
  }
}

export class RemoteOrderingApiUserCreateFailed extends BaseError {
  public name = 'RemoteOrderingApiUserCreateFailed'
  constructor (
    public message: string = 'Could not create remote ordering API user',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, RemoteOrderingApiUserCreateFailed.prototype)
  }
}

export class RemoteOrderingApiUserUpdateFailed extends BaseError {
  public name = 'RemoteOrderingApiUserUpdateFailed'
  constructor (
    public message: string = 'Could not update remote ordering API user',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, RemoteOrderingApiUserUpdateFailed.prototype)
  }
}

export class RemoteOrderingApiUserDeleteFailed extends BaseError {
  public name = 'RemoteOrderingApiUserDeleteFailed'
  constructor (
    public message: string = 'Could not delete remote ordering API user',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, RemoteOrderingApiUserDeleteFailed.prototype)
  }
}
