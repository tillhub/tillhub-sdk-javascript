import qs from 'qs'
import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'

export interface DevicesOptions {
  user?: string
  base?: string
}

export interface DevicesQuery {
  limit?: number
  uri?: string
  query?: {
    deleted?: boolean
  }
}

export interface DevicesResponse {
  data: object[]
  metadata: object
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
export interface Device {
  id?: string
}

export type DeviceStatusType = 'bound' | 'pending'
export type DeviceTypeType = 'cfd' | 'printer'

export interface Device {
  status?: DeviceStatusType
  register?: string
  type: DeviceTypeType,
  device_configuration: {
    [key: string]: any
  } | null,
  client_id?: string
}

export class Devices {
  endpoint: string
  http: Client
  public options: DevicesOptions
  public uriHelper: UriHelper

  constructor(options: DevicesOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v0/devices'
    this.options.base = this.options.base || 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  getAll(queryOrOptions?: DevicesQuery | undefined): Promise<DevicesResponse> {
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

  get(deviceId: string): Promise<DeviceResponse> {
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

  put(deviceId: string, device: Device): Promise<DeviceResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${deviceId}`
      try {
        const response = await this.http.getClient().put(uri, device)

        return resolve({
          data: response.data.results[0] as Device,
          metadata: { count: response.data.count }
        } as DeviceResponse)
      } catch (error) {
        return reject(new DevicePutFailed(undefined, { error }))
      }
    })
  }

  create(device: Device): Promise<DeviceResponse> {
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

  delete(deviceId: string): Promise<DeviceResponse> {
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
  constructor(public message: string = 'Could not fetch devices', properties?: any) {
    super(message, properties)
  }
}

export class DeviceFetchFailed extends BaseError {
  public name = 'DeviceFetchFailed'
  constructor(public message: string = 'Could not fetch device', properties?: any) {
    super(message, properties)
  }
}

export class DevicePutFailed extends BaseError {
  public name = 'DevicePutFailed'
  constructor(public message: string = 'Could not alter device', properties?: any) {
    super(message, properties)
  }
}

export class DeviceCreationFailed extends BaseError {
  public name = 'DeviceCreationFailed'
  constructor(public message: string = 'Could not create device', properties?: any) {
    super(message, properties)
  }
}

export class DevicesCountFailed extends BaseError {
  public name = 'DevicesCountFailed'
  constructor(public message: string = 'Could not count the devices', properties?: any) {
    super(message, properties)
  }
}

export class DeviceDeleteFailed extends BaseError {
  public name = 'DeviceDeleteFailed'
  constructor(public message: string = 'Could not delete device', properties?: any) {
    super(message, properties)
  }
}
