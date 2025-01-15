import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface DevicesOptions {
  user?: string
  base?: string
}

export interface DevicesQuery {
  limit?: number
  uri?: string
  query?: {
    deleted?: boolean
    active?: boolean
  }
}

export interface DevicesResponse {
  data: Device[]
  metadata: Record<string, unknown>
  next?: () => Promise<DevicesResponse>
}

export interface DeviceResponse {
  data?: Device
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}

export type DeviceStatusType = 'bound' | 'pending'
export type DeviceTypeType = 'cfd' | 'printer'

export interface Device {
  id?: string
  status?: DeviceStatusType
  register?: string
  type: DeviceTypeType
  device_configuration: {
    [key: string]: any
  } | null
  client_id?: string
}

export class Devices extends ThBaseHandler {
  public static baseEndpoint = '/api/v1/devices/licenses'
  endpoint: string
  http: Client
  public options: DevicesOptions
  public uriHelper: UriHelper

  constructor (options: DevicesOptions, http: Client) {
    super(http, { endpoint: Devices.baseEndpoint, base: options.base ?? 'https://api.tillhub.com' })
    this.options = options
    this.http = http

    this.endpoint = Devices.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (queryOrOptions?: DevicesQuery | undefined): Promise<DevicesResponse> {
    let next
    const base = this.uriHelper.generateBaseUri()
    const uri = this.uriHelper.generateUriWithQuery(base, queryOrOptions)

    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new DevicesFetchFailed(undefined, { status: response.status })
      }

      if (response.data.cursor?.next) {
        next = (): Promise<DevicesResponse> => this.getAll({ uri: response.data.cursor.next })
      }

      return {
        data: response.data.results,
        metadata: { cursor: response.data.cursor },
        next
      }
    } catch (error: any) {
      throw new DevicesFetchFailed(error.message, { error })
    }
  }

  async get (deviceId: string): Promise<DeviceResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${deviceId}`)
    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new DeviceFetchFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0] as Device,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new DeviceFetchFailed(error.message, { error })
    }
  }

  async put (deviceId: string, device: Device): Promise<DeviceResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${deviceId}`)
    try {
      const response = await this.http.getClient().put(uri, device)

      return {
        data: response.data.results[0] as Device,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new DevicePutFailed(error.message, { error })
    }
  }

  async create (device: Device): Promise<DeviceResponse> {
    const uri = this.uriHelper.generateBaseUri()
    try {
      const response = await this.http.getClient().post(uri, device)

      return {
        data: response.data.results[0] as Device,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new DeviceCreationFailed(error.message, { error })
    }
  }

  async delete (deviceId: string): Promise<DeviceResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${deviceId}`)
    try {
      const response = await this.http.getClient().delete(uri)
      if (response.status !== 200) throw new DeviceDeleteFailed()

      return {
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new DeviceDeleteFailed(error.message, { error })
    }
  }
}

export class DevicesFetchFailed extends BaseError {
  public name = 'DevicesFetchFailed'
  constructor (
    public message: string = 'Could not fetch devices',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, DevicesFetchFailed.prototype)
  }
}

export class DeviceFetchFailed extends BaseError {
  public name = 'DeviceFetchFailed'
  constructor (
    public message: string = 'Could not fetch device',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, DeviceFetchFailed.prototype)
  }
}

export class DevicePutFailed extends BaseError {
  public name = 'DevicePutFailed'
  constructor (
    public message: string = 'Could not alter device',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, DevicePutFailed.prototype)
  }
}

export class DeviceCreationFailed extends BaseError {
  public name = 'DeviceCreationFailed'
  constructor (
    public message: string = 'Could not create device',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, DeviceCreationFailed.prototype)
  }
}

export class DeviceDeleteFailed extends BaseError {
  public name = 'DeviceDeleteFailed'
  constructor (
    public message: string = 'Could not delete device',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, DeviceDeleteFailed.prototype)
  }
}
