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
  data: Record<string, unknown>[]
  metadata: Record<string, unknown>
}

export interface StaffGroupResponse {
  data: StaffGroup
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

  constructor(options: StaffGroupsOptions, http: Client) {
    super(http, {
      endpoint: StaffGroups.baseEndpoint,
      base: options.base || 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = StaffGroups.baseEndpoint
    this.options.base = this.options.base || 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  getAll(query?: StaffGroupsQuery | undefined): Promise<StaffGroupsResponse> {
    return new Promise(async (resolve, reject) => {
      let next

      try {
        const base = this.uriHelper.generateBaseUri()
        const uri = this.uriHelper.generateUriWithQuery(base, query)

        const response = await this.http.getClient().get(uri)

        if (response.data.cursor && response.data.cursor.next) {
          next = (): Promise<StaffGroupsResponse> => this.getAll({ uri: response.data.cursor.next })
        }

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count, cursor: response.data.cursor },
          next
        } as StaffGroupsResponse)
      } catch (error) {
        return reject(new StaffGroupsFetchAllFailed(undefined, { error }))
      }
    })
  }

  meta(): Promise<StaffGroupsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uri = this.uriHelper.generateBaseUri(`/meta`)
        const response = await this.http.getClient().get(uri)

        if (response.status !== 200) reject(new StaffGroupsMetaFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as StaffGroupsResponse)
      } catch (error) {
        return reject(new StaffGroupsMetaFailed(undefined, { error }))
      }
    })
  }

  get(staffGroupId: string): Promise<StaffGroupResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = this.uriHelper.generateBaseUri(`/${staffGroupId}`)
      try {
        const response = await this.http.getClient().get(uri)
        response.status !== 200 &&
          reject(new StaffGroupFetchFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results[0] as StaffGroup,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        } as StaffGroupResponse)
      } catch (error) {
        return reject(new StaffGroupFetchFailed(undefined, { error }))
      }
    })
  }

  put(staffGroupId: string, staffGroup: StaffGroup): Promise<StaffGroupResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = this.uriHelper.generateBaseUri(`/${staffGroupId}`)
      try {
        const response = await this.http.getClient().put(uri, staffGroup)

        return resolve({
          data: response.data.results[0] as StaffGroup,
          metadata: { count: response.data.count }
        } as StaffGroupResponse)
      } catch (error) {
        return reject(new StaffGroupPutFailed(undefined, { error }))
      }
    })
  }

  create(staffGroup: StaffGroup): Promise<StaffGroupResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = this.uriHelper.generateBaseUri()
      try {
        const response = await this.http.getClient().post(uri, staffGroup)

        return resolve({
          data: response.data.results[0] as StaffGroup,
          metadata: { count: response.data.count }
        } as StaffGroupResponse)
      } catch (error) {
        return reject(new StaffGroupCreationFailed(undefined, { error }))
      }
    })
  }

  delete(staffGroupId: string): Promise<StaffGroupResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = this.uriHelper.generateBaseUri(`/${staffGroupId}`)
      try {
        const response = await this.http.getClient().delete(uri)
        response.status !== 200 && reject(new StaffGroupDeleteFailed())

        return resolve({
          msg: response.data.msg
        } as StaffGroupResponse)
      } catch (err) {
        return reject(new StaffGroupDeleteFailed())
      }
    })
  }
}

class StaffGroupsFetchAllFailed extends BaseError {
  public name = 'StaffGroupsFetchAllFailed'
  constructor(public message: string = 'Could not fetch all staff groups', properties?: any) {
    super(message, properties)
  }
}

class StaffGroupsMetaFailed extends BaseError {
  public name = 'StaffGroupsMetaFailed'
  constructor(public message: string = 'Could not fetch staff groups meta call', properties?: any) {
    super(message, properties)
  }
}

export class StaffGroupFetchFailed extends BaseError {
  public name = 'StaffGroupFetchFailed'
  constructor(public message: string = 'Could not fetch the staff group', properties?: any) {
    super(message, properties)
  }
}

export class StaffGroupPutFailed extends BaseError {
  public name = 'StaffGroupPutFailed'
  constructor(public message: string = 'Could not alter the staff group', properties?: any) {
    super(message, properties)
  }
}

export class StaffGroupCreationFailed extends BaseError {
  public name = 'StaffGroupCreationFailed'
  constructor(public message: string = 'Could not create the staff group', properties?: any) {
    super(message, properties)
  }
}

export class StaffGroupDeleteFailed extends BaseError {
  public name = 'StaffGroupDeleteFailed'
  constructor(public message: string = 'Could not delete the staff group', properties?: any) {
    super(message, properties)
  }
}
