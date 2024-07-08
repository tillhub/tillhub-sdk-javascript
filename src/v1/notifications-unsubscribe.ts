import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface NotificationsUnsubscribeOptions {
  base?: string
  uri?: string
  user: undefined
}

export interface NotificationsUnsubscribeResponse {
  msg: string
}

export class NotificationsUnsubscribe extends ThBaseHandler {
  public static baseEndpoint = '/api/v1/notifications/unsubscribe'
  endpoint: string
  http: Client
  public options: NotificationsUnsubscribeOptions
  public uriHelper: UriHelper

  constructor (options: NotificationsUnsubscribeOptions, http: Client) {
    super(http, {
      endpoint: NotificationsUnsubscribe.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = NotificationsUnsubscribe.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async unsubscribe (tenantId: string, notificationId: string): Promise<NotificationsUnsubscribeResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri(`/${tenantId}/${notificationId}`)

      const response = await this.http.getClient().delete(uri)
      if (response.status !== 200) {
        throw new NotificationsUnsubscribeFailed(undefined, { status: response.status })
      }

      return {
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new NotificationsUnsubscribeFailed(error.message, { error })
    }
  }
}

export class NotificationsUnsubscribeFailed extends BaseError {
  public name = 'NotificationsUnsubscribeFailed'
  constructor (
    public message: string = 'Could not unsubscribe from the notification',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, NotificationsUnsubscribeFailed.prototype)
  }
}
