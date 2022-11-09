import { Client } from '../client'
import { UriHelper } from '../uri-helper'
import { BaseError } from '../errors/baseError'
import { ThBaseHandler } from '../base'

export interface WebhooksOptions {
  user?: string
  base?: string
}

export interface SupportedEventResponse {
  msg?: string
  data: SupportedEvent[]
  metadata: Record<string, unknown>
}

export type EventType = 'create' | 'update' | 'delete'

export interface SupportedEvent {
  event?: string
  entity?: string
  eventType?: EventType
  version?: number
  payloadExample?: JSON
}

export class SupportedEvents extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/supported-events'
  public static baseUrl = 'https://api.tillhub.com'
  endpoint: string
  http: Client
  public options: WebhooksOptions
  public uriHelper: UriHelper

  constructor (options: WebhooksOptions, http: Client) {
    super(http, {
      endpoint: SupportedEvents.baseEndpoint,
      base: options.base ?? SupportedEvents.baseUrl
    })
    this.options = options
    this.http = http

    this.endpoint = SupportedEvents.baseEndpoint
    this.options.base = this.options.base ?? SupportedEvents.baseUrl
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (): Promise<SupportedEventResponse> {
    try {
      const base = `${this.options.base ?? ''}${this.endpoint}`
      const response = await this.http.getClient().get(base)
      if (response.status !== 200) {
        throw new SupportedEventFetchFailed(undefined, { status: response.status })
      }

      return {
        msg: response.data.msg,
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new SupportedEventFetchFailed(error.message, { error })
    }
  }
}

class SupportedEventFetchFailed extends BaseError {
  public name = 'SupportedEventFetchFailed'
  constructor (
    public message: string = 'Could not fetch supported events',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, SupportedEventFetchFailed.prototype)
  }
}
