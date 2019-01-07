import { Client } from '../client'
import * as errors from '../errors'

export interface UsersOptions {
  user?: string
  base?: string
  configurationId?: string
}

export interface UsersQuery {
  limit?: number
  uri?: string
}

export interface UsersResponse {
  data: User[]
  metadata: object
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

export type UserRoles = 'admin' | 'manager' | 'serviceaccount' | 'franchisee' | 'franchise'

export interface User {
  user: {
    id?: string
    email?: string
  }
  description?: string | null
  blocked?: boolean
  deleted?: boolean
  active?: boolean
  metadata?: object
  role: UserRoles
  user_id?: string
  configuration_id: string
  groups?: object | null
  scopes?: string[] | null
  attributes?: object | null
  parents?: string[] | null
  children?: string[] | null
  api_key?: string | null
  key?: object | null
  secret?: string
  username?: string
}

export class Users {
  endpoint: string
  http: Client
  public options: UsersOptions
  public configurationId?: string

  constructor(options: UsersOptions, http: Client) {
    this.options = options
    this.http = http

    if (options.configurationId) {
      this.configurationId = options.configurationId
    }

    this.endpoint = `/api/v0/configurations/users`

    this.options.base = this.options.base || 'https://api.tillhub.com'
  }

  getAll(query?: UsersQuery | undefined): Promise<UsersResponse> {
    if (!this.configurationId) throw new TypeError('fetching users requires configuration ID to be set.')
    return new Promise(async (resolve, reject) => {
      let next

      try {
        let uri
        if (query && query.uri) {
          uri = query.uri
        } else {
          uri = `${this.options.base}${this.endpoint}/${this.options.user}/${this.configurationId}`
        }

        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) {
          return reject(new errors.UsersFetchFailed(undefined, { status: response.status }))
        }

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count },
          next
        } as UsersResponse)
      } catch (error) {
        return reject(new errors.UsersFetchFailed(undefined, { error }))
      }
    })
  }

  get(userId: string): Promise<UserResponse> {
    if (!this.configurationId) throw new TypeError('fetching users requires configuration ID to be set.')
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${this.configurationId}/${userId}`
      try {
        const response = await this.http.getClient().get(uri)
        response.status !== 200 &&
          reject(new errors.UsersFetchFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results[0] as User,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        } as UserResponse)
      } catch (error) {
        return reject(new errors.UserFetchFailed(undefined, { error }))
      }
    })
  }

  put(userId: string, user: User): Promise<UserResponse> {
    if (!this.configurationId) throw new TypeError('fetching users requires configuration ID to be set.')
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${userId}/${this.configurationId}`
      try {
        const response = await this.http.getClient().put(uri, user)

        return resolve({
          data: response.data.results[0] as User,
          metadata: { count: response.data.count }
        } as UserResponse)
      } catch (error) {
        return reject(new errors.UserPutFailed(undefined, { error }))
      }
    })
  }

  create(user: User): Promise<UserResponse> {
    if (!this.configurationId) throw new TypeError('fetching users requires configuration ID to be set.')
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.configurationId}/${this.options.user}`
      try {
        const response = await this.http.getClient().post(uri, user)

        return resolve({
          data: response.data.results[0] as User,
          metadata: { count: response.data.count }
        } as UserResponse)
      } catch (error) {
        return reject(new errors.UserCreationFailed(undefined, { error }))
      }
    })
  }
}
