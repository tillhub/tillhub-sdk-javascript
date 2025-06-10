import { Client } from '../client'
import { UriHelper } from '../uri-helper'
import { BaseError } from '../errors/baseError'
import { ThBaseHandler } from '../base'

export interface WebhooksOptions {
  user?: string
  base?: string
}

export interface WebhookQuery {
  limit?: number
  offset?: number
  uri?: string
}

export interface WebhookResponse {
  msg?: string
  data?: Webhook[]
  metadata?: Record<string, unknown>
  next?: () => Promise<WebhookResponse>
}

export interface WebhookRegenerateSecretResponse {
  msg?: string
  data: {
    secret: string
  }
}

export interface Webhook {
  id?: string
  createdBy?: string
  description?: string
  eventList?: string[]
  secret?: string
  updatedBy?: string
  url?: string
  active?: boolean
  deletedAt?: Date
}

export class Webhooks extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/webhooks'
  endpoint: string
  http: Client
  public options: WebhooksOptions
  public uriHelper: UriHelper

  constructor (options: WebhooksOptions, http: Client) {
    super(http, {
      endpoint: Webhooks.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = Webhooks.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (query?: WebhookQuery | undefined): Promise<WebhookResponse> {
    try {
      let next
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new WebhookFetchFailed(undefined, { status: response.status })
      }

      if (response.data.cursors?.after) {
        next = (): Promise<WebhookResponse> => this.getAll({ uri: response.data.cursors.after })
      }

      return {
        msg: response.data.msg,
        data: response.data.results,
        metadata: { count: response.data.count },
        next
      }
    } catch (error: any) {
      throw new WebhookFetchFailed(error.message, { error })
    }
  }

  async get (webhookId: string): Promise<WebhookResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${webhookId}`)
    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new WebhookFetchOneFailed(undefined, { status: response.status })
      }

      return {
        msg: response.data.msg,
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new WebhookFetchOneFailed(error.message, { error })
    }
  }

  async create (webhook: Webhook): Promise<WebhookResponse> {
    const uri = this.uriHelper.generateBaseUri()

    try {
      const response = await this.http.getClient().post(uri, webhook)
      if (response.status !== 200) {
        throw new WebhookCreateFailed(undefined, { status: response.status })
      }

      return {
        msg: response.data.msg,
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new WebhookCreateFailed(error.message, { error })
    }
  }

  async put (webhookId: string, webhook: Webhook): Promise<WebhookResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${webhookId}`)

    try {
      const response = await this.http.getClient().put(uri, webhook)

      if (response.status !== 200) {
        throw new WebhookPutFailed(undefined, { status: response.status })
      }

      return {
        msg: response.data.msg,
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new WebhookPutFailed(error.message, { error })
    }
  }

  async delete (webhookId: string): Promise<WebhookResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${webhookId}`)
    try {
      const response = await this.http.getClient().delete(uri)

      if (response.status !== 200) {
        throw new WebhookDeleteFailed(undefined, { status: response.status })
      }

      return { msg: response.data.msg }
    } catch (error: any) {
      throw new WebhookDeleteFailed(error.message, { error })
    }
  }

  async regenerateSecret (webhookId: string): Promise<WebhookRegenerateSecretResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${webhookId}/regenerate-secret`)

    try {
      const response = await this.http.getClient().post(uri)
      if (response.status !== 200) {
        throw new WebhookRegenerateSecretFailed(undefined, { status: response.status })
      }

      return {
        msg: response.data.msg,
        data: response.data.results[0]
      }
    } catch (error: any) {
      throw new WebhookRegenerateSecretFailed(error.message, { error })
    }
  }
}

class WebhookFetchFailed extends BaseError {
  public name = 'WebhookFetchFailed'
  constructor (
    public message: string = 'Could not fetch webhooks',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, WebhookFetchFailed.prototype)
  }
}

class WebhookFetchOneFailed extends BaseError {
  public name = 'WebhookFetchOneFailed'
  constructor (
    public message: string = 'Could not fetch one webhook',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, WebhookFetchOneFailed.prototype)
  }
}

class WebhookCreateFailed extends BaseError {
  public name = 'WebhookCreateFailed'
  constructor (
    public message: string = 'Could not create the webhook',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, WebhookCreateFailed.prototype)
  }
}

class WebhookPutFailed extends BaseError {
  public name = 'WebhookPutFailed'
  constructor (
    public message: string = 'Could not alter the webhook',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, WebhookPutFailed.prototype)
  }
}

class WebhookDeleteFailed extends BaseError {
  public name = 'WebhookDeleteFailed'
  constructor (
    public message: string = 'Could not delete the webhook',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, WebhookDeleteFailed.prototype)
  }
}

class WebhookRegenerateSecretFailed extends BaseError {
  public name = 'WebhookRegenerateSecretFailed'
  constructor (
    public message: string = 'Could not regenerate the secret of the webhook',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, WebhookRegenerateSecretFailed.prototype)
  }
}
