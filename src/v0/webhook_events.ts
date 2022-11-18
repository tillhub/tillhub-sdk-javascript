import { Client } from '../client'
import { UriHelper } from '../uri-helper'
import { BaseError } from '../errors/baseError'
import { ThBaseHandler } from '../base'
import { Webhook } from './webhooks'

export interface WebhooksOptions {
  user?: string
  base?: string
}

export interface WebhookEventQuery {
  sentSuccess?: boolean
  returnRetries?: boolean
  start?: string
  end?: string
  event?: string[]
  eventId?: string[]
  entity?: string[]
  eventType?: string[]
  version?: string
  limit?: number
  offset?: number
  deleted?: boolean
  active?: boolean
  uri?: string
}

export interface WebhookEventResponse {
  msg?: string
  data: WebhookEvent[]
  metadata: Record<string, unknown>
  next?: () => Promise<WebhookEventResponse>
}

export type EventType = 'create' | 'update' | 'delete'

export interface WebhookEvent {
  id?: string
  entityInstanceId?: string
  entity?: string
  eventType?: EventType
  nextTryAt?: Date
  requestPayload?: JSON
  triesCount?: number
  sentSuccessfully?: boolean
  url?: string
  version?: string
  webhook?: Webhook
  children?: WebhookEventLog[]
}

export interface WebhookEventLog {
  id?: string
  responsePayload?: JSON
  sentSuccessfully?: boolean
  createdAt?: Date
  updatedAt?: Date
  webhookEvent?: WebhookEvent
}

export class WebhookEvents extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/events'
  endpoint: string
  http: Client
  public options: WebhooksOptions
  public uriHelper: UriHelper

  constructor (options: WebhooksOptions, http: Client) {
    super(http, {
      endpoint: WebhookEvents.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = WebhookEvents.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (webhookId: string, query?: WebhookEventQuery | undefined): Promise<WebhookEventResponse> {
    try {
      let next
      const base = this.uriHelper.generateBaseUri(`/${webhookId}`)
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new WebhookEventFetchFailed(undefined, { status: response.status })
      }

      if (response.data.cursors?.after) {
        next = (): Promise<WebhookEventResponse> => this.getAll(webhookId, { uri: response.data.cursors.after })
      }

      return {
        msg: response.data.msg,
        data: response.data.results,
        metadata: { count: response.data.count },
        next
      }
    } catch (error: any) {
      throw new WebhookEventFetchFailed(error.message, { error })
    }
  }

  async get (webhookId: string, eventId: string): Promise<WebhookEventResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${webhookId}/${eventId}`)
    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new WebhookFetchOneEventFailed(undefined, { status: response.status })
      }

      return {
        msg: response.data.msg,
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new WebhookFetchOneEventFailed(error.message, { error })
    }
  }

  async replay (webhookId: string, query?: WebhookEventQuery | undefined): Promise<WebhookEventResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${webhookId}/replay`)

    try {
      const response = await this.http.getClient().post(uri, query)
      if (response.status !== 200) {
        throw new WebhookEventReplayFailed(undefined, { status: response.status })
      }

      return {
        msg: response.data.msg,
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new WebhookEventReplayFailed(error.message, { error })
    }
  }
}

class WebhookEventFetchFailed extends BaseError {
  public name = 'WebhookEventFetchFailed'
  constructor (
    public message: string = 'Could not fetch events from webhook',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, WebhookEventFetchFailed.prototype)
  }
}

class WebhookFetchOneEventFailed extends BaseError {
  public name = 'WebhookFetchOneEventFailed'
  constructor (
    public message: string = 'Could not fetch one event from one webhook',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, WebhookFetchOneEventFailed.prototype)
  }
}

class WebhookEventReplayFailed extends BaseError {
  public name = 'WebhookEventReplayFailed'
  constructor (
    public message: string = 'Could not replay the events',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, WebhookEventReplayFailed.prototype)
  }
}
