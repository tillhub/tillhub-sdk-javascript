
import { Client } from '../client'
import { BaseError } from '../errors/baseError'
import { UriHelper, HandlerQuery } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface UsersOptions {
  user?: string
  base?: string
  configurationId?: string
}

export interface UsersQuery {
  limit?: number
  uri?: string
}

export interface HandleUsersQuery extends HandlerQuery {
  query?: UsersQuery
}

export interface UsersResponse {
  data: User[]
  metadata: Record<string, unknown>
}

export interface UserResponse {
  data?: User
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}

export type UserRoles =
| 'admin'
| 'manager'
| 'serviceaccount'
| 'franchisee'
| 'franchise'
| 'staff'

export interface User {
  id?: string
  user: {
    id?: string
    email?: string
  }
  description?: string | null
  blocked?: boolean
  deleted?: boolean
  active?: boolean
  metadata?: Record<string, unknown>
  role: UserRoles
  user_id?: string
  configuration_id: string
  groups?: Record<string, unknown> | null
  scopes?: string[] | null
  user_permission_template_id?: string | null
  attributes?: Record<string, unknown> | null
  parents?: string[] | null
  children?: string[] | null
  api_key?: string | null
  key?: Record<string, unknown> | null
  secret?: string
  username?: string
  firstname?: string
  lastname?: string
  locations?: string[] | null
}

export class Users extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/configurations'
  endpoint: string
  http: Client
  public options: UsersOptions
  public configurationId?: string
  public uriHelper: UriHelper

  constructor (options: UsersOptions, http: Client) {
    super(http, { endpoint: Users.baseEndpoint, base: options.base ?? 'https://api.tillhub.com' })
    this.options = options
    this.http = http

    if (options.configurationId) {
      this.configurationId = options.configurationId
    }

    this.endpoint = Users.baseEndpoint

    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (query?: HandleUsersQuery): Promise<UsersResponse> {
    if (!this.configurationId) { throw new TypeError('fetching users requires configuration ID to be set.') }
    try {
      const base = this.uriHelper.generateBaseUri(`/${this.configurationId}/users`)
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new UsersFetchFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new UsersFetchFailed(error.message, { error })
    }
  }

  async get (userId: string): Promise<UserResponse> {
    if (!this.configurationId) { throw new TypeError('fetching users requires configuration ID to be set.') }
    const uri = this.uriHelper.generateBaseUri(`/${this.configurationId}/users/${userId}`)
    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new UsersFetchFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0],
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new UserFetchFailed(error.message, { error })
    }
  }

  async put (userId: string, user: User): Promise<UserResponse> {
    if (!this.configurationId) { throw new TypeError('fetching users requires configuration ID to be set.') }
    const uri = this.uriHelper.generateBaseUri(`/${this.configurationId}/users/${userId}`)
    try {
      const response = await this.http.getClient().put(uri, user)

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new UserPutFailed(error.message, { error })
    }
  }

  async create (user: User): Promise<UserResponse> {
    if (!this.configurationId) { throw new TypeError('fetching users requires configuration ID to be set.') }
    const uri = this.uriHelper.generateBaseUri(`/${this.configurationId}/users`)
    try {
      const response = await this.http.getClient().post(uri, user)

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new UserCreationFailed(error.message, { error })
    }
  }

  async delete (userId: string): Promise<UserResponse> {
    if (!this.configurationId) { throw new TypeError('deleting user requires configuration ID to be set.') }
    const uri = this.uriHelper.generateBaseUri(`/${this.configurationId}/users/${userId}`)
    try {
      const response = await this.http.getClient().delete(uri)
      if (response.status !== 200) {
        throw new UserDeleteFailed(undefined, { status: response.status })
      }

      return {
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new UserDeleteFailed(error.message, { error })
    }
  }

  async createToken (userId: string): Promise<UserResponse> {
    if (!this.configurationId) { throw new TypeError('fetching users requires configuration ID to be set.') }
    const uri = this.uriHelper.generateBaseUri(`/${this.configurationId}/users/${userId}/api/key`)
    try {
      const response = await this.http.getClient().post(uri)

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new UserTokenCreationFailed(error.message, { error })
    }
  }
}

export class UsersFetchFailed extends BaseError {
  public name = 'UsersFetchFailed'
  constructor (
    public message: string = 'Could not fetch user',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, UsersFetchFailed.prototype)
  }
}

export class UserFetchFailed extends BaseError {
  public name = 'UserFetchFailed'
  constructor (
    public message: string = 'Could not fetch user',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, UserFetchFailed.prototype)
  }
}

export class UserPutFailed extends BaseError {
  public name = 'UserPutFailed'
  constructor (
    public message: string = 'Could not alter user',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, UserPutFailed.prototype)
  }
}

export class UserCreationFailed extends BaseError {
  public name = 'UserCreationFailed'
  constructor (
    public message: string = 'Could not create user',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, UserCreationFailed.prototype)
  }
}

export class UserDeleteFailed extends BaseError {
  public name = 'UserDeleteFailed'
  constructor (
    public message: string = 'Could not delete user',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, UserDeleteFailed.prototype)
  }
}

export class UserTokenCreationFailed extends BaseError {
  public name = 'UserTokenCreationFailed'
  constructor (
    public message: string = 'Could not create token',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, UserTokenCreationFailed.prototype)
  }
}
