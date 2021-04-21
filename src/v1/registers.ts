import typeOf from 'just-typeof'
import { Client } from '../client'
import * as errors from '../errors'
import { ThBaseHandler } from '../base'
import { UriHelper } from '../uri-helper'

export interface DeviceConfigurationObject {
  device_token: string
  bundle_id: string
  network?: { ip: string }
}

export interface NotificationResponse {
  data: string
}

export interface Notification {
  aps?: {
    alert: string | Record<string, unknown>
    sound?: string
    badge?: string
  }
  data?: {
    command: string
    args?: string[]
    ui?: boolean
  }
}

export interface RegistersOptions {
  user?: string
  base?: string
}

export interface RegistersQuery {
  start?: string | null
  deleted?: boolean | null
  active?: boolean | null
  branch?: string | null
  limit?: number
  uri?: string
}

export interface RegisterResponse {
  data: Register
  metadata?: Record<string, unknown>
}

export interface RegistersResponse {
  data: Register[]
  metadata: Record<string, unknown>
  next?: () => Promise<RegistersResponse>
}

export interface SearchQuery {
  q: string
  fields?: string[]
}

export interface Register {
  id: string
  name?: string | null
  description?: string | null
  register_number: number
  cost_center: number | null
}

export class Registers extends ThBaseHandler {
  public static baseEndpoint = '/api/v1/registers'
  endpoint: string
  http: Client
  public options: RegistersOptions
  public uriHelper: UriHelper

  constructor (options: RegistersOptions, http: Client) {
    super(http, {
      endpoint: Registers.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = Registers.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (q?: RegistersQuery): Promise<RegistersResponse> {
    let next

    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, q)

      const response = await this.http.getClient().get(uri)

      if (response.data.cursor?.next) {
        next = (): Promise<RegistersResponse> => this.getAll({ uri: response.data.cursor.next })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count },
        next
      }
    } catch (err) {
      throw new errors.RegistersFetchFailed()
    }
  }

  async get (registerId: string): Promise<RegisterResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${registerId}`)

    try {
      const response = await this.http.getClient().get(uri)
      return {
        data: response.data.results[0]
      }
    } catch (error) {
      throw new errors.RegisterFetchFailed(undefined, { error })
    }
  }

  async notify (registerId: string, notification: Notification): Promise<NotificationResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri(`/${registerId}/notification`)

      const response = await this.http.getClient().post(uri, notification)
      return {
        data: response.data.msg
      }
    } catch (error) {
      throw new errors.RegisterNotificationCreateFailed(undefined, { error })
    }
  }

  async updateDeviceConfiguration (
    registerId: string,
    deviceConfiguration: DeviceConfigurationObject
  ): Promise<RegisterResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri(`/${registerId}/device_configuration`)

      const response = await this.http.getClient().put(uri, deviceConfiguration)
      return {
        data: response.data.results[0]
      }
    } catch (error) {
      console.warn(error)
      throw new errors.RegisterDeviceConfigurationPutFailed(undefined, { error })
    }
  }

  async put (registerId: string, register: Register): Promise<RegisterResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${registerId}`)
    try {
      const response = await this.http.getClient().put(uri, register)

      return {
        data: response.data.results[0] as Register,
        metadata: { count: response.data.count }
      }
    } catch (error) {
      throw new errors.RegisterPutFailed(undefined, { error })
    }
  }

  async search (query: string | SearchQuery): Promise<RegisterResponse> {
    let uri
    if (typeof query === 'string') {
      uri = this.uriHelper.generateBaseUri(`/search?q=${query}`)
    } else if (typeOf(query) === 'object') {
      const base = this.uriHelper.generateBaseUri('/search')
      uri = this.uriHelper.generateUriWithQuery(base, query)
    } else {
      throw new errors.RegistersSearchFailed('Could not search for register - query type is invalid')
    }

    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new errors.RegistersSearchFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (error) {
      throw new errors.RegistersSearchFailed(undefined, { error })
    }
  }
}
