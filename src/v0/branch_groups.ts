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
    name?: string
    branch?: string
    start?: string
  }
}

export interface BranchGroupsResponse {
  data: Array<Record<string, unknown>>
  metadata: Record<string, unknown>
  next?: () => Promise<BranchGroupsResponse>
}

export interface BranchGroupResponse {
  data?: BranchGroup
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}

export interface BranchGroup {
  id?: string
  name: string
  color?: string
  branches?: string[]
  custom_id?: string
  client_id?: string
  active?: boolean
  deleted?: boolean
}

export class BranchGroups extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/branch_groups'
  endpoint: string
  http: Client
  public options: BranchGroupsOptions
  public uriHelper: UriHelper

  constructor (options: BranchGroupsOptions, http: Client) {
    super(http, {
      endpoint: BranchGroups.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = BranchGroups.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (queryOrOptions?: BranchGroupsQuery | undefined): Promise<BranchGroupsResponse> {
    let next

    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, queryOrOptions)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new BranchGroupsFetchFailed(undefined, { status: response.status })
      }

      if (response.data.cursor?.next) {
        next = (): Promise<BranchGroupsResponse> =>
          this.getAll({ uri: response.data.cursor.next })
      }

      return {
        data: response.data.results,
        metadata: { cursor: response.data.cursor },
        next
      }
    } catch (error: any) {
      throw new BranchGroupsFetchFailed(undefined, { error })
    }
  }

  async get (branchId: string): Promise<BranchGroupResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${branchId}`)

    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new BranchGroupFetchFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0] as BranchGroup,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new BranchGroupFetchFailed(undefined, { error })
    }
  }

  async put (branchId: string, branchGroup: BranchGroup): Promise<BranchGroupResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${branchId}`)
    try {
      const response = await this.http.getClient().put(uri, branchGroup)

      return {
        data: response.data.results[0] as BranchGroup,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new BranchGroupPutFailed(undefined, { error })
    }
  }

  async create (branchGroup: BranchGroup): Promise<BranchGroupResponse> {
    const uri = this.uriHelper.generateBaseUri()
    try {
      const response = await this.http.getClient().post(uri, branchGroup)

      return {
        data: response.data.results[0] as BranchGroup,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new BranchGroupCreationFailed(undefined, { error })
    }
  }

  async delete (branchId: string): Promise<BranchGroupResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${branchId}`)
    try {
      const response = await this.http.getClient().delete(uri)
      if (response.status !== 200) throw new BranchGroupDeleteFailed()

      return {
        msg: response.data.msg
      }
    } catch (err: any) {
      throw new BranchGroupDeleteFailed()
    }
  }
}

export class BranchGroupsFetchFailed extends BaseError {
  public name = 'BranchGroupsFetchFailed'
  constructor (
    public message: string = 'Could not fetch branch groups',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, BranchGroupsFetchFailed.prototype)
  }
}

export class BranchGroupFetchFailed extends BaseError {
  public name = 'BranchGroupFetchFailed'
  constructor (
    public message: string = 'Could not fetch branch group',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, BranchGroupFetchFailed.prototype)
  }
}

export class BranchGroupPutFailed extends BaseError {
  public name = 'BranchPutFailed'
  constructor (
    public message: string = 'Could not alter branch group',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, BranchGroupPutFailed.prototype)
  }
}

export class BranchGroupCreationFailed extends BaseError {
  public name = 'BranchGroupCreationFailed'
  constructor (
    public message: string = 'Could not create branch group',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, BranchGroupCreationFailed.prototype)
  }
}

export class BranchGroupDeleteFailed extends BaseError {
  public name = 'BranchGroupDeleteFailed'
  constructor (
    public message: string = 'Could not delete branch group',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, BranchGroupDeleteFailed.prototype)
  }
}
