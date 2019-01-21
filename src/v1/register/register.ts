import { Client } from '../../client'
import * as errors from '../../errors'
import { DeviceConfiguration } from './device_configuration/device_configuration'

export interface RegisterOptions {
  user?: string
  base?: string
}

export interface RegisterResponse {
  data: object
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

export class Register {
  registerId: string
  endpoint: string
  http: Client
  public options: RegisterOptions

  constructor(registerId: string, options: RegisterOptions, http: Client) {
    this.registerId = registerId
    this.options = options
    this.http = http

    this.endpoint = `/api/v1/Registers`
    this.options.base = this.options.base || 'https://api.tillhub.com'
  }

  async get(): Promise<RegisterResponse> {
    const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${this.registerId}`

    try {
      const response = await this.http.getClient().get(uri)
      return {
        data: response.data.results[0]
      } as RegisterResponse
    } catch (error) {
      throw new errors.RegisterFetchFailed(undefined, { error })
    }
  }

  deviceConfiguration(): DeviceConfiguration {
    return new DeviceConfiguration(this.registerId, this.options, this.http)
  }

  async notify(notification: Notification): Promise<NotificationResponse> {
    try {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${this.registerId}/notification`
      const response = await this.http.getClient().post(uri, notification)
      return {
        data: response.data.msg
      } as NotificationResponse
    } catch (error) {
      throw new errors.RegisterNotificationCreateFailed(undefined, { error })
    }
  }
}
