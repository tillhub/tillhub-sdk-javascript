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

export interface DeviceBindRequest {
  token: string
  register: string
  client_account: string
}

export interface DevicesResponse {
  data: Array<Record<string, unknown>>
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

export interface DeviceContentResponse {
  data: DeviceContent
  msg?: string
}
export interface DeviceContent {
  idle?: Record<string, unknown>
  welcome?: Record<string, unknown>
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
  public static baseEndpoint = '/api/v0/devices'
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
      // let uri
      // if (queryOrOptions?.uri) {
      //   uri = queryOrOptions.uri
      // } else {
      //   let queryString = ''
      //   if (queryOrOptions && (queryOrOptions.query || queryOrOptions.limit)) {
      //     queryString = qs.stringify({ limit: queryOrOptions.limit, ...queryOrOptions.query })
      //   }

      //   uri = `${this.options.base}${this.endpoint}/${this.options.user}${
      //       queryString ? `?${queryString}` : ''
      //     }`
      // }

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

  async search (searchTerm: string): Promise<DevicesResponse> {
    const base = this.uriHelper.generateBaseUri('/search')
    const uri = this.uriHelper.generateUriWithQuery(base, { q: searchTerm })
    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new DeviceFetchFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new DeviceFetchFailed(error.message, { error })
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

  async contents (deviceId: string): Promise<DeviceContentResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${deviceId}/contents`)
    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) { throw new DeviceContentFetchFailed(undefined, { status: response.status }) }

      return {
        data: response.data.results[0] as DeviceContent,
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new DeviceContentFetchFailed(error.message, { error })
    }
  }

  async patch (deviceId: string, device: Device): Promise<DeviceResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${deviceId}`)
    try {
      const response = await this.http.getClient().patch(uri, device)

      return {
        data: response.data.results[0] as Device,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new DevicePatchFailed(error.message, { error })
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

  async bind (deviceOrShortId: string, bindRequest: DeviceBindRequest): Promise<DeviceResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${deviceOrShortId}/bind`)
    try {
      const response = await this.http.getClient().post(uri, bindRequest)

      return {
        data: response.data.results[0] as Device,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new DeviceBindingFailed(error.message, { error })
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

export class DeviceContentFetchFailed extends BaseError {
  public name = 'DeviceContentFetchFailed'
  constructor (
    public message: string = 'Could not fetch device content',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, DeviceContentFetchFailed.prototype)
  }
}

export class DevicePatchFailed extends BaseError {
  public name = 'DevicePatchFailed'
  constructor (
    public message: string = 'Could not alter device',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, DevicePatchFailed.prototype)
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

export class DevicesCountFailed extends BaseError {
  public name = 'DevicesCountFailed'
  constructor (
    public message: string = 'Could not count the devices',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, DevicesCountFailed.prototype)
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
export class DeviceBindingFailed extends BaseError {
  public name = 'DeviceBindingFailed'
  constructor (
    public message: string = 'Could not bind device',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, DeviceBindingFailed.prototype)
  }
}
