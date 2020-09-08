import qs from 'qs'
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
  data: Device
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

export interface Device {
  id?: string
}

export type DeviceStatusType = 'bound' | 'pending'
export type DeviceTypeType = 'cfd' | 'printer'

export interface Device {
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

  getAll (queryOrOptions?: DevicesQuery | undefined): Promise<DevicesResponse> {
    return new Promise(async (resolve, reject) => {
      let next

      try {
        let uri
        if (queryOrOptions?.uri) {
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
          return reject(new DevicesFetchFailed(undefined, { status: response.status }))
        }

        if (response.data.cursor && response.data.cursor.next) {
          next = (): Promise<DevicesResponse> => this.getAll({ uri: response.data.cursor.next })
        }

        return resolve({
          data: response.data.results,
          metadata: { cursor: response.data.cursor },
          next
        } as DevicesResponse)
      } catch (error) {
        return reject(new DevicesFetchFailed(undefined, { error }))
      }
    })
  }

  get (deviceId: string): Promise<DeviceResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${deviceId}`
      try {
        const response = await this.http.getClient().get(uri)
        response.status !== 200 &&
          reject(new DeviceFetchFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results[0] as Device,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        } as DeviceResponse)
      } catch (error) {
        return reject(new DeviceFetchFailed(undefined, { error }))
      }
    })
  }

  contents (deviceId: string): Promise<DeviceContentResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${deviceId}/contents`
      try {
        const response = await this.http.getClient().get(uri)
        response.status !== 200 &&
          reject(new DeviceContentFetchFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results[0] as DeviceContent,
          msg: response.data.msg
        } as DeviceContentResponse)
      } catch (error) {
        return reject(new DeviceContentFetchFailed(undefined, { error }))
      }
    })
  }

  patch (deviceId: string, device: Device): Promise<DeviceResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${deviceId}`
      try {
        const response = await this.http.getClient().patch(uri, device)

        return resolve({
          data: response.data.results[0] as Device,
          metadata: { count: response.data.count }
        } as DeviceResponse)
      } catch (error) {
        return reject(new DevicePatchFailed(undefined, { error }))
      }
    })
  }

  create (device: Device): Promise<DeviceResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}`
      try {
        const response = await this.http.getClient().post(uri, device)

        return resolve({
          data: response.data.results[0] as Device,
          metadata: { count: response.data.count }
        } as DeviceResponse)
      } catch (error) {
        return reject(new DeviceCreationFailed(undefined, { error }))
      }
    })
  }

  bind (deviceOrShortId: string, bindRequest: DeviceBindRequest): Promise<DeviceResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${deviceOrShortId}/bind`
      try {
        const response = await this.http.getClient().post(uri, bindRequest)

        return resolve({
          data: response.data.results[0] as Device,
          metadata: { count: response.data.count }
        } as DeviceResponse)
      } catch (error) {
        return reject(new DeviceBindingFailed(undefined, { error }))
      }
    })
  }

  delete (deviceId: string): Promise<DeviceResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${deviceId}`
      try {
        const response = await this.http.getClient().delete(uri)
        response.status !== 200 && reject(new DeviceDeleteFailed())

        return resolve({
          msg: response.data.msg
        } as DeviceResponse)
      } catch (err) {
        return reject(new DeviceDeleteFailed())
      }
    })
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
