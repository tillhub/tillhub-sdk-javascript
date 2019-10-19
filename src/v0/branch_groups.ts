import qs from 'qs'
import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface BranchGroupsOptions {
  user?: string
  base?: string
}

export interface BranchGroupsQuery {
  limit?: number
  uri?: string
  query?: {
    deleted?: boolean
    active?: boolean
  }
}

export interface BranchGroupsResponse {
  data: object[]
  metadata: object
  next?: () => Promise<BranchGroupsResponse>
}

export interface BranchGroupResponse {
  data: BranchGroup
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}
export interface BranchGroup {
  id?: string
}

export interface BranchGroup {
  name: string
  color?: string
  brannches?: string[]
  custom_id?: string
  client_id?: string
  active?: boolean
  deleted?: boolean
}

export class BranchGroups extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/branches'
  endpoint: string
  http: Client
  public options: BranchGroupsOptions
  public uriHelper: UriHelper

  constructor(options: BranchGroupsOptions, http: Client) {
    super(http, { endpoint: BranchGroups.baseEndpoint, base: options.base || 'https://api.tillhub.com' })
    this.options = options
    this.http = http

    this.endpoint = BranchGroups.baseEndpoint
    this.options.base = this.options.base || 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  getAll(queryOrOptions?: BranchGroupsQuery | undefined): Promise<BranchGroupsResponse> {
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
          return reject(new BranchGroupsFetchFailed(undefined, { status: response.status }))
        }

        if (response.data.cursor && response.data.cursor.next) {
          next = (): Promise<BranchGroupsResponse> => this.getAll({ uri: response.data.cursor.next })
        }

        return resolve({
          data: response.data.results,
          metadata: { cursor: response.data.cursor },
          next
        } as BranchGroupsResponse)
      } catch (error) {
        return reject(new BranchGroupsFetchFailed(undefined, { error }))
      }
    })
  }

  get(branchId: string): Promise<BranchGroupResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${branchId}`
      try {
        const response = await this.http.getClient().get(uri)
        response.status !== 200 &&
          reject(new BranchGroupFetchFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results[0] as BranchGroup,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        } as BranchGroupResponse)
      } catch (error) {
        return reject(new BranchGroupFetchFailed(undefined, { error }))
      }
    })
  }

  put(branchId: string, branchGroup: BranchGroup): Promise<BranchGroupResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${branchId}`
      try {
        const response = await this.http.getClient().put(uri, branchGroup)

        return resolve({
          data: response.data.results[0] as BranchGroup,
          metadata: { count: response.data.count }
        } as BranchGroupResponse)
      } catch (error) {
        return reject(new BranchGroupPutFailed(undefined, { error }))
      }
    })
  }

  create(branchGroup: BranchGroup): Promise<BranchGroupResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}`
      try {
        const response = await this.http.getClient().post(uri, branchGroup)

        return resolve({
          data: response.data.results[0] as BranchGroup,
          metadata: { count: response.data.count }
        } as BranchGroupResponse)
      } catch (error) {
        return reject(new BranchGroupCreationFailed(undefined, { error }))
      }
    })
  }

  delete(branchId: string): Promise<BranchGroupResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${branchId}`
      try {
        const response = await this.http.getClient().delete(uri)
        response.status !== 200 && reject(new BranchGroupDeleteFailed())

        return resolve({
          msg: response.data.msg
        } as BranchGroupResponse)
      } catch (err) {
        return reject(new BranchGroupDeleteFailed())
      }
    })
  }
}

export class BranchGroupsFetchFailed extends BaseError {
  public name = 'BranchGroupsFetchFailed'
  constructor(public message: string = 'Could not fetch branches groups', properties?: any) {
    super(message, properties)
  }
}

export class BranchGroupFetchFailed extends BaseError {
  public name = 'BranchehGroupFetchFailed'
  constructor(public message: string = 'Could not fetch branch group', properties?: any) {
    super(message, properties)
  }
}

export class BranchGroupPutFailed extends BaseError {
  public name = 'BranchPutFailed'
  constructor(public message: string = 'Could not alter branch group', properties?: any) {
    super(message, properties)
  }
}

export class BranchGroupCreationFailed extends BaseError {
  public name = 'BranchGroupCreationFailed'
  constructor(public message: string = 'Could not create branc group', properties?: any) {
    super(message, properties)
  }
}

export class BranchGroupDeleteFailed extends BaseError {
  public name = 'BranchGroupDeleteFailed'
  constructor(public message: string = 'Could not delete branch group', properties?: any) {
    super(message, properties)
  }
}
