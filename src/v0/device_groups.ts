import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface DeviceGroupsOptions {
  user?: string
  base?: string
}

export interface DeviceGroupsQuery {
  limit?: number
  uri?: string
  query?: {
    deleted?: boolean
    active?: boolean
    name?: string
  }
}

export interface DeviceGroupsResponse {
  data: DeviceGroup[]
  metadata: Record<string, unknown>
  next?: () => Promise<DeviceGroupsResponse>
}

export interface DeviceGroupResponse {
  data?: DeviceGroup
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}

export interface DeviceGroup {
  name?: string
  description?: string
  devices?: string[]
  active?: boolean
  deleted?: boolean
}

export class DeviceGroups extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/device_groups'
  endpoint: string
  http: Client
  public options: DeviceGroupsOptions
  public uriHelper: UriHelper

  constructor (options: DeviceGroupsOptions, http: Client) {
    super(http, {
      endpoint: DeviceGroups.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = DeviceGroups.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (query?: DeviceGroupsQuery | undefined): Promise<DeviceGroupsResponse> {
    let next

    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)

      if (response.data.cursor?.next) {
        next = (): Promise<DeviceGroupsResponse> =>
          this.getAll({ uri: response.data.cursor.next })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count, cursor: response.data.cursor },
        next
      }
    } catch (error) {
      throw new DeviceGroupsFetchFailed(undefined, { error })
    }
  }

  async get (deviceGroupId: string): Promise<DeviceGroupResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${deviceGroupId}`)
    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new DeviceGroupFetchFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0] as DeviceGroup,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error) {
      throw new DeviceGroupFetchFailed(undefined, { error })
    }
  }

  async put (deviceGroupId: string, deviceGroup: DeviceGroup): Promise<DeviceGroupResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${deviceGroupId}`)
    try {
      const response = await this.http.getClient().put(uri, deviceGroup)

      return {
        data: response.data.results[0] as DeviceGroup,
        metadata: { count: response.data.count }
      }
    } catch (error) {
      throw new DeviceGroupPutFailed(undefined, { error })
    }
  }

  async create (deviceGroup: DeviceGroup): Promise<DeviceGroupResponse> {
    const uri = this.uriHelper.generateBaseUri()
    try {
      const response = await this.http.getClient().post(uri, deviceGroup)

      return {
        data: response.data.results[0] as DeviceGroup,
        metadata: { count: response.data.count }
      }
    } catch (error) {
      throw new DeviceGroupCreationFailed(undefined, { error })
    }
  }

  async delete (deviceGroupId: string): Promise<DeviceGroupResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${deviceGroupId}`)
    try {
      const response = await this.http.getClient().delete(uri)
      if (response.status !== 200) throw new DeviceGroupDeleteFailed()

      return {
        msg: response.data.msg
      }
    } catch (err) {
      throw new DeviceGroupDeleteFailed()
    }
  }
}

export class DeviceGroupsFetchFailed extends BaseError {
  public name = 'DeviceGroupsFetchFailed'
  constructor (
    public message: string = 'Could not fetch device groups',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, DeviceGroupsFetchFailed.prototype)
  }
}

export class DeviceGroupFetchFailed extends BaseError {
  public name = 'DeviceGroupFetchFailed'
  constructor (
    public message: string = 'Could not fetch device group',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, DeviceGroupFetchFailed.prototype)
  }
}

export class DeviceGroupPutFailed extends BaseError {
  public name = 'DeviceGroupPutFailed'
  constructor (
    public message: string = 'Could not alter device group',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, DeviceGroupPutFailed.prototype)
  }
}

export class DeviceGroupCreationFailed extends BaseError {
  public name = 'DeviceGroupCreationFailed'
  constructor (
    public message: string = 'Could not create device group',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, DeviceGroupCreationFailed.prototype)
  }
}

export class DeviceGroupDeleteFailed extends BaseError {
  public name = 'DeviceGroupDeleteFailed'
  constructor (
    public message: string = 'Could not delete device group',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, DeviceGroupDeleteFailed.prototype)
  }
}
