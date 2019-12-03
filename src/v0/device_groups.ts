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
  metadata: object
  next?: () => Promise<DeviceGroupsResponse>
}

export interface DeviceGroupResponse {
  data: DeviceGroup
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
  deletec?: boolean
}

export class DeviceGroups extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/device_groups'
  endpoint: string
  http: Client
  public options: DeviceGroupsOptions
  public uriHelper: UriHelper

  constructor(options: DeviceGroupsOptions, http: Client) {
    super(http, { endpoint: DeviceGroups.baseEndpoint, base: options.base || 'https://api.tillhub.com' })
    this.options = options
    this.http = http

    this.endpoint = DeviceGroups.baseEndpoint
    this.options.base = this.options.base || 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  getAll(query?: DeviceGroupsQuery | undefined): Promise<DeviceGroupsResponse> {
    return new Promise(async (resolve, reject) => {
      let next

      try {
        const base = this.uriHelper.generateBaseUri()
        const uri = this.uriHelper.generateUriWithQuery(base, query)

        const response = await this.http.getClient().get(uri)

        if (response.data.cursor && response.data.cursor.next) {
          next = (): Promise<DeviceGroupsResponse> => this.getAll({ uri: response.data.cursor.next })
        }

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count, cursor: response.data.cursor },
          next
        } as DeviceGroupsResponse)
      } catch (error) {
        return reject(new DeviceGroupsFetchFailed(undefined, { error }))
      }
    })
  }

  get(deviceGroupId: string): Promise<DeviceGroupResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = this.uriHelper.generateBaseUri(`/${deviceGroupId}`)
      try {
        const response = await this.http.getClient().get(uri)
        response.status !== 200 &&
        reject(new DeviceGroupFetchFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results[0] as DeviceGroup,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        } as DeviceGroupResponse)
      } catch (error) {
        return reject(new DeviceGroupFetchFailed(undefined, { error }))
      }
    })
  }

  put(deviceGroupId: string, deviceGroup: DeviceGroup): Promise<DeviceGroupResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = this.uriHelper.generateBaseUri(`/${deviceGroupId}`)
      try {
        const response = await this.http.getClient().put(uri, deviceGroup)

        return resolve({
          data: response.data.results[0] as DeviceGroup,
          metadata: { count: response.data.count }
        } as DeviceGroupResponse)
      } catch (error) {
        return reject(new DeviceGroupPutFailed(undefined, { error }))
      }
    })
  }

  create(deviceGroup: DeviceGroup): Promise<DeviceGroupResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = this.uriHelper.generateBaseUri()
      try {
        const response = await this.http.getClient().post(uri, deviceGroup)

        return resolve({
          data: response.data.results[0] as DeviceGroup,
          metadata: { count: response.data.count }
        } as DeviceGroupResponse)
      } catch (error) {
        return reject(new DeviceGroupCreationFailed(undefined, { error }))
      }
    })
  }

  delete(deviceGroupId: string): Promise<DeviceGroupResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = this.uriHelper.generateBaseUri(`/${deviceGroupId}`)
      try {
        const response = await this.http.getClient().delete(uri)
        response.status !== 200 && reject(new DeviceGroupDeleteFailed())

        return resolve({
          msg: response.data.msg
        } as DeviceGroupResponse)
      } catch (err) {
        return reject(new DeviceGroupDeleteFailed())
      }
    })
  }
}

export class DeviceGroupsFetchFailed extends BaseError {
  public name = 'DeviceGroupsFetchFailed'
  constructor(public message: string = 'Could not fetch device groups', properties?: any) {
    super(message, properties)
  }
}

export class DeviceGroupFetchFailed extends BaseError {
  public name = 'DeviceGroupFetchFailed'
  constructor(public message: string = 'Could not fetch device group', properties?: any) {
    super(message, properties)
  }
}

export class DeviceGroupPutFailed extends BaseError {
  public name = 'DeviceGroupPutFailed'
  constructor(public message: string = 'Could not alter device group', properties?: any) {
    super(message, properties)
  }
}

export class DeviceGroupCreationFailed extends BaseError {
  public name = 'DeviceGroupCreationFailed'
  constructor(public message: string = 'Could not create device group', properties?: any) {
    super(message, properties)
  }
}

export class DeviceGroupDeleteFailed extends BaseError {
  public name = 'DeviceGroupDeleteFailed'
  constructor(public message: string = 'Could not delete device group', properties?: any) {
    super(message, properties)
  }
}
