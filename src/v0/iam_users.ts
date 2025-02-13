
import { Client } from '../client'
import { BaseError } from '../errors/baseError'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface IamUsersOptions {
  user?: string
  base?: string
}

export interface IamUsersResponse {
  data: IamUser[]
  metadata: Record<string, unknown>
  next?: () => Promise<IamUsersResponse>
}

export interface IamUsersMetaResponse {
  data: Record<string, unknown>
  metadata: Record<string, unknown>
  msg: string
}

export interface IamUserResponse {
  data: IamUser
  metadata: Record<string, unknown>
  msg?: string
  errors?: ErrorObject[]
}

export interface ErrorObject {
  id: string
  label: string
  errorDetails: Record<string, unknown>
}

export interface IamUser {
  id?: string
  email?: string
  username?: string
  firstName?: string
  lastName?: string
  attributes?: Record<string, unknown>
  groups?: string[]
}

export interface IamUsersQueryHandler {
  limit?: number
  uri?: string
  query?: IamUsersQuery
  orderFields?: string[] | string
}

export interface IamUsersQuery extends IamUser {
  deleted?: boolean
  active?: boolean
  q?: string
}

export class IamUsers extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/iam/users'
  endpoint: string
  http: Client
  public options: IamUsersOptions
  public uriHelper: UriHelper

  constructor (options: IamUsersOptions, http: Client) {
    super(http, { endpoint: IamUsers.baseEndpoint, base: options.base ?? 'https://api.tillhub.com' })
    this.options = options
    this.http = http

    this.endpoint = IamUsers.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (query?: IamUsersQueryHandler | undefined): Promise<IamUsersResponse> {
    let next
    const base = this.uriHelper.generateBaseUri()
    const uri = this.uriHelper.generateUriWithQuery(base, query)

    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new IamUsersFetchFailed(undefined, { status: response.status })
      }

      if (response.data.cursors?.after) {
        next = (): Promise<IamUsersResponse> => this.getAll({ uri: response.data.cursors.after })
      }

      return {
        data: response.data.results as IamUser[],
        metadata: { cursor: response.data.cursors },
        next
      }
    } catch (error: any) {
      throw new IamUsersFetchFailed(error.message, { error })
    }
  }

  async meta (query?: IamUsersQueryHandler | undefined): Promise<IamUsersResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/meta')
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) throw new IamUsersMetaFailed()

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new IamUsersMetaFailed(error.message, { error })
    }
  }

  async get (iamUserId: string): Promise<IamUserResponse> {
    const base = this.uriHelper.generateBaseUri(`/${iamUserId}`)
    const uri = this.uriHelper.generateUriWithQuery(base)

    try {
      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) {
        throw new IamUserFetchFailed(undefined, { status: response.status })
      }
      return {
        data: response.data.results[0] as IamUser,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new IamUserFetchFailed(error.message, { error })
    }
  }

  async put (iamUserId: string, iamUser: IamUser): Promise<IamUserResponse> {
    const base = this.uriHelper.generateBaseUri(`/${iamUserId}`)
    const uri = this.uriHelper.generateUriWithQuery(base)

    try {
      const response = await this.http.getClient().put(uri, iamUser)

      if (response.status !== 200) {
        throw new IamUserPutFailed(undefined, { status: response.status })
      }
      return {
        data: response.data.results[0] as IamUser,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new IamUserPutFailed(error.message, { error })
    }
  }

  async create (iamUser: IamUser): Promise<IamUserResponse> {
    const base = this.uriHelper.generateBaseUri()
    const uri = this.uriHelper.generateUriWithQuery(base)

    try {
      const response = await this.http.getClient().post(uri, iamUser)

      if (response.status !== 200) {
        throw new IamUserCreationFailed(undefined, { status: response.status })
      }
      return {
        data: response.data.results[0] as IamUser,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new IamUserCreationFailed(error.message, { error })
    }
  }

  async delete (iamUserId: string): Promise<IamUserResponse> {
    const base = this.uriHelper.generateBaseUri(`/${iamUserId}`)
    const uri = this.uriHelper.generateUriWithQuery(base)

    try {
      const response = await this.http.getClient().delete(uri)

      if (response.status !== 200) {
        throw new IamUserDeleteFailed(undefined, { status: response.status })
      }
      return {
        data: response.data.results[0] as IamUser,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new IamUserDeleteFailed(error.message, { error })
    }
  }
}

export class IamUsersFetchFailed extends BaseError {
  public name = 'IamUsersFetchFailed'
  constructor (
    public message: string = 'Could not fetch iam user',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, IamUsersFetchFailed.prototype)
  }
}

export class IamUsersMetaFailed extends BaseError {
  public name = 'IamUsersMetaFailed'
  constructor (
    public message: string = 'Could not fetch meta iam user',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, IamUsersFetchFailed.prototype)
  }
}

export class IamUserFetchFailed extends BaseError {
  public name = 'IamUserFetchFailed'
  constructor (
    public message: string = 'Could not fetch iam user',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, IamUserFetchFailed.prototype)
  }
}

export class IamUserPutFailed extends BaseError {
  public name = 'IamUserPutFailed'
  constructor (
    public message: string = 'Could not alter iam user',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, IamUserPutFailed.prototype)
  }
}

export class IamUserCreationFailed extends BaseError {
  public name = 'IamUserCreationFailed'
  constructor (
    public message: string = 'Could not create iam user',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, IamUserCreationFailed.prototype)
  }
}

export class IamUserDeleteFailed extends BaseError {
  public name = 'IamUserDeleteFailed'
  constructor (
    public message: string = 'Could not delete user',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, IamUserDeleteFailed.prototype)
  }
}
