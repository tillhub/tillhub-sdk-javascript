import qs from 'qs'
import { Client } from '../client'
import * as errors from '../errors'

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
    alert: string | object
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
}

export interface RegistersResponse {
  data: Register[]
  metadata: object
  next?: () => Promise<RegistersResponse>
}
export interface Register {
  id: string
}

export interface Register {
  name?: string | null
  description?: string | null
  register_number: number
}

export class Registers {
  endpoint: string
  http: Client
  public options: RegistersOptions

  constructor(options: RegistersOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v1/registers'
    this.options.base = this.options.base || 'https://api.tillhub.com'
  }

  getAll(q?: RegistersQuery): Promise<RegistersResponse> {
    return new Promise(async (resolve, reject) => {
      const query = q ? JSON.parse(JSON.stringify(q)) : {}
      let uri
      let next

      try {
        if (query && query.uri) {
          uri = query.uri
        } else {
          uri = `${this.options.base}${this.endpoint}/${this.options.user}`
        }

        const queryString = qs.stringify(query)
        if (queryString) {
          uri = `${uri}?${queryString}`
        }

        const response = await this.http.getClient().get(uri)

        if (response.data.cursor && response.data.cursor.next) {
          next = (): Promise<RegistersResponse> => this.getAll({ uri: response.data.cursor.next })
        }

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count },
          next
        } as RegistersResponse)
      } catch (err) {
        return reject(new errors.RegistersFetchFailed())
      }
    })
  }

  async get(registerId: string): Promise<RegisterResponse> {
    const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${registerId}`

    try {
      const response = await this.http.getClient().get(uri)
      return {
        data: response.data.results[0]
      } as RegisterResponse
    } catch (error) {
      throw new errors.RegisterFetchFailed(undefined, { error })
    }
  }

  async notify(registerId: string, notification: Notification): Promise<NotificationResponse> {
    try {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${registerId}/notification`
      const response = await this.http.getClient().post(uri, notification)
      return {
        data: response.data.msg
      } as NotificationResponse
    } catch (error) {
      throw new errors.RegisterNotificationCreateFailed(undefined, { error })
    }
  }

  async updateDeviceConfiguration(registerId: string, deviceConfiguration: DeviceConfigurationObject): Promise<RegisterResponse> {
    try {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${registerId}/device_configuration`

      const response = await this.http.getClient().put(uri, deviceConfiguration)
      return {
        data: response.data.results[0]
      } as RegisterResponse
    } catch (error) {
      console.warn(error)
      throw new errors.RegisterDeviceConfigurationPutFailed(undefined, { error })
    }
  }

  put(registerId: string, register: Register): Promise<RegisterResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${registerId}`
      try {
        const response = await this.http.getClient().put(uri, register)

        return resolve({
          data: response.data.results[0] as Register,
          metadata: { count: response.data.count }
        } as RegisterResponse)
      } catch (error) {
        return reject(new errors.RegisterPutFailed(undefined, { error }))
      }
    })
  }
}
