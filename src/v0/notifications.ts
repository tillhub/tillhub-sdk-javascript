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

export interface NotificationsResponse {
  msg?: string
}

export class Notifications {
  endpoint: string
  http: Client
  public options: NotificationsOpions
  public uriHelper: UriHelper

  constructor(options: NotificationsOpions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v0/notifications'
    this.options.base = this.options.base || 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  email(requestObject: EmailOptions): Promise<NotificationsResponse> {
    return new Promise(async (resolve, reject) => {
      const { body = {}, type } = requestObject

      try {
        const base = this.uriHelper.generateBaseUri(`/emails/${type}`)
        const uri = this.uriHelper.generateUriWithQuery(base)

        const response = await this.http.getClient().post(uri, body)

        return resolve({
          msg: response.data.msg
        } as NotificationsResponse)
      } catch (err) {
        return reject(new errors.NotificationsEmailError())
      }
    })
  }
}
