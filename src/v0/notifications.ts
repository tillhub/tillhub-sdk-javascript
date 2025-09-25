import { Client } from '../client'
import * as errors from '../errors'
import { UriHelper } from '../uri-helper'

export interface NotificationsOpions {
  user?: string
  base?: string
}

export interface EmailOptions {
  type: string
  body?: Record<string, unknown>
}

export interface SmsOptions {
  to: string
  body?: Record<string, unknown>
}

export interface NotificationsResponse {
  msg?: string
}

export class Notifications {
  endpoint: string
  http: Client
  public options: NotificationsOpions
  public uriHelper: UriHelper

  constructor (options: NotificationsOpions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v0/notifications'
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async email (requestObject: EmailOptions): Promise<NotificationsResponse> {
    const { body = {}, type } = requestObject

    try {
      const base = this.uriHelper.generateBaseUri(`/emails/${type}`)
      const uri = this.uriHelper.generateUriWithQuery(base)

      const response = await this.http.getClient().post(uri, body)

      return {
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new errors.NotificationsEmailError()
    }
  }

  async sms (requestObject: SmsOptions): Promise<NotificationsResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/sms/send')
      const uri = this.uriHelper.generateUriWithQuery(base)

      const response = await this.http.getClient().post(uri, requestObject)

      return {
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new errors.NotificationsEmailError()
    }
  }
}
