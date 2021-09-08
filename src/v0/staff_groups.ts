import { Client } from '../client'
import { UriHelper } from '../uri-helper'
import { BaseError } from '../errors/baseError'
import { ThBaseHandler } from '../base'

export interface StaffGroupsOptions {
  user?: string
  base?: string
}

export interface StaffGroupsQuery {
  limit?: number
  uri?: string
  name?: string
  deleted?: boolean
  count?: number
  q?: string
}

export interface StaffGroupsResponse {
  data: Array<Record<string, unknown>>
  metadata: Record<string, unknown>
  next?: () => Promise<StaffGroupsResponse>
}

export interface StaffGroupResponse {
  data?: StaffGroup
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}

export interface StaffGroup {
  name: string
  id?: string
  color?: string
  staffs?: string[]
  custom_id?: string
  client_id?: string
  active?: boolean
  deleted?: boolean
}

export class StaffGroups extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/staff_groups'
  endpoint: string
  http: Client
  public options: StaffGroupsOptions
  public uriHelper: UriHelper

  constructor (options: StaffGroupsOptions, http: Client) {
    super(http, {
      endpoint: StaffGroups.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = StaffGroups.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (query?: StaffGroupsQuery | undefined): Promise<StaffGroupsResponse> {
    let next

    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)

      if (response.data.cursor?.next) {
        next = (): Promise<StaffGroupsResponse> => this.getAll({ uri: response.data.cursor.next })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count, cursor: response.data.cursor },
        next
      }
    } catch (error: any) {
      throw new StaffGroupsFetchAllFailed(undefined, { error })
    }
  }

  async meta (): Promise<StaffGroupsResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri('/meta')
      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) throw new StaffGroupsMetaFailed()

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new StaffGroupsMetaFailed(undefined, { error })
    }
  }

  async get (staffGroupId: string): Promise<StaffGroupResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${staffGroupId}`)
    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new StaffGroupFetchFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0] as StaffGroup,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new StaffGroupFetchFailed(undefined, { error })
    }
  }

  async put (staffGroupId: string, staffGroup: StaffGroup): Promise<StaffGroupResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${staffGroupId}`)
    try {
      const response = await this.http.getClient().put(uri, staffGroup)

      return {
        data: response.data.results[0] as StaffGroup,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new StaffGroupPutFailed(undefined, { error })
    }
  }

  async create (staffGroup: StaffGroup): Promise<StaffGroupResponse> {
    const uri = this.uriHelper.generateBaseUri()
    try {
      const response = await this.http.getClient().post(uri, staffGroup)

      return {
        data: response.data.results[0] as StaffGroup,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new StaffGroupCreationFailed(undefined, { error })
    }
  }

  async delete (staffGroupId: string): Promise<StaffGroupResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${staffGroupId}`)
    try {
      const response = await this.http.getClient().delete(uri)
      if (response.status !== 200) throw new StaffGroupDeleteFailed()

      return {
        msg: response.data.msg
      }
    } catch (err) {
      throw new StaffGroupDeleteFailed()
    }
  }
}

class StaffGroupsFetchAllFailed extends BaseError {
  public name = 'StaffGroupsFetchAllFailed'
  constructor (
    public message: string = 'Could not fetch all staff groups',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, StaffGroupsFetchAllFailed.prototype)
  }
}

class StaffGroupsMetaFailed extends BaseError {
  public name = 'StaffGroupsMetaFailed'
  constructor (
    public message: string = 'Could not fetch staff groups meta call',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, StaffGroupsMetaFailed.prototype)
  }
}

export class StaffGroupFetchFailed extends BaseError {
  public name = 'StaffGroupFetchFailed'
  constructor (
    public message: string = 'Could not fetch the staff group',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, StaffGroupFetchFailed.prototype)
  }
}

export class StaffGroupPutFailed extends BaseError {
  public name = 'StaffGroupPutFailed'
  constructor (
    public message: string = 'Could not alter the staff group',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, StaffGroupPutFailed.prototype)
  }
}

export class StaffGroupCreationFailed extends BaseError {
  public name = 'StaffGroupCreationFailed'
  constructor (
    public message: string = 'Could not create the staff group',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, StaffGroupCreationFailed.prototype)
  }
}

export class StaffGroupDeleteFailed extends BaseError {
  public name = 'StaffGroupDeleteFailed'
  constructor (
    public message: string = 'Could not delete the staff group',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, StaffGroupDeleteFailed.prototype)
  }
}
