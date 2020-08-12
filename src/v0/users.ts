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
  data: User
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}
export interface User {
  id?: string
}

export type UserRoles =
  | 'admin'
  | 'manager'
  | 'serviceaccount'
  | 'franchisee'
  | 'franchise'
  | 'staff'

export interface User {
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
  public static baseEndpoint = `/api/v0/configurations`
  endpoint: string
  http: Client
  public options: UsersOptions
  public configurationId?: string
  public uriHelper: UriHelper

  constructor(options: UsersOptions, http: Client) {
    super(http, { endpoint: Users.baseEndpoint, base: options.base || 'https://api.tillhub.com' })
    this.options = options
    this.http = http

    if (options.configurationId) {
      this.configurationId = options.configurationId
    }

    this.endpoint = Users.baseEndpoint

    this.options.base = this.options.base || 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  getAll(query?: HandleUsersQuery): Promise<UsersResponse> {
    if (!this.configurationId)
      throw new TypeError('fetching users requires configuration ID to be set.')
    return new Promise(async (resolve, reject) => {
      let next

      try {
        const base = this.uriHelper.generateBaseUri(`/${this.configurationId}/users`)
        const uri = this.uriHelper.generateUriWithQuery(base, query)

        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) {
          return reject(new UsersFetchFailed(undefined, { status: response.status }))
        }

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count },
          next
        } as UsersResponse)
      } catch (error) {
        return reject(new UsersFetchFailed(undefined, { error }))
      }
    })
  }

  get(userId: string): Promise<UserResponse> {
    if (!this.configurationId)
      throw new TypeError('fetching users requires configuration ID to be set.')
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${this.configurationId}/users/${userId}`
      try {
        const response = await this.http.getClient().get(uri)
        response.status !== 200 &&
          reject(new UsersFetchFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results[0] as User,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        } as UserResponse)
      } catch (error) {
        return reject(new UserFetchFailed(undefined, { error }))
      }
    })
  }

  put(userId: string, user: User): Promise<UserResponse> {
    if (!this.configurationId)
      throw new TypeError('fetching users requires configuration ID to be set.')
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${this.configurationId}/users/${userId}`
      try {
        const response = await this.http.getClient().put(uri, user)

        return resolve({
          data: response.data.results[0] as User,
          metadata: { count: response.data.count }
        } as UserResponse)
      } catch (error) {
        return reject(new UserPutFailed(undefined, { error }))
      }
    })
  }

  create(user: User): Promise<UserResponse> {
    if (!this.configurationId)
      throw new TypeError('fetching users requires configuration ID to be set.')
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${this.configurationId}/users`
      try {
        const response = await this.http.getClient().post(uri, user)

        return resolve({
          data: response.data.results[0] as User,
          metadata: { count: response.data.count }
        } as UserResponse)
      } catch (error) {
        return reject(new UserCreationFailed(undefined, { error }))
      }
    })
  }

  delete(userId: string): Promise<UserResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${this.configurationId}/users/${userId}`
      try {
        const response = await this.http.getClient().delete(uri)
        if (response.status !== 200) {
          return reject(new UserDeleteFailed(undefined, { status: response.status }))
        }

        return resolve({
          msg: response.data.msg
        } as UserResponse)
      } catch (error) {
        return reject(new UserDeleteFailed(undefined, { error }))
      }
    })
  }

  createToken(userId: string): Promise<UserResponse> {
    if (!this.configurationId)
      throw new TypeError('fetching users requires configuration ID to be set.')
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${this.configurationId}/users/${userId}/api/key`

      try {
        const response = await this.http.getClient().post(uri)

        return resolve({
          data: response.data.results[0] as User,
          metadata: { count: response.data.count }
        } as UserResponse)
      } catch (error) {
        return reject(new UserTokenCreationFailed(undefined, { error }))
      }
    })
  }
}

export class UsersFetchFailed extends BaseError {
  public name = 'UsersFetchFailed'
  constructor(
    public message: string = 'Could not fetch user',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, UsersFetchFailed.prototype)
  }
}

export class UserFetchFailed extends BaseError {
  public name = 'UserFetchFailed'
  constructor(
    public message: string = 'Could not fetch user',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, UserFetchFailed.prototype)
  }
}

export class UserPutFailed extends BaseError {
  public name = 'UserPutFailed'
  constructor(
    public message: string = 'Could not alter user',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, UserPutFailed.prototype)
  }
}

export class UserCreationFailed extends BaseError {
  public name = 'UserCreationFailed'
  constructor(
    public message: string = 'Could not create user',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, UserCreationFailed.prototype)
  }
}

export class UserDeleteFailed extends BaseError {
  public name = 'UserDeleteFailed'
  constructor(
    public message: string = 'Could not delete user',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, UserDeleteFailed.prototype)
  }
}

export class UserTokenCreationFailed extends BaseError {
  public name = 'UserTokenCreationFailed'
  constructor(
    public message: string = 'Could not create token',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, UserTokenCreationFailed.prototype)
  }
}
