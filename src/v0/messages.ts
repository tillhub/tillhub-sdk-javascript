import { Client } from '../client'
import * as errors from '../errors'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface MessagesOptions {
  user?: string
  base?: string
}

export interface MessagesQueryOptions {
  read?: boolean
  ignored?: boolean
  min_updated_at?: string
}

export interface MessagesResponse {
  data: Message[]
  metadata: Record<string, unknown>
}

export interface MessageResponse {
  data: Message
  metadata: Record<string, unknown>
}

export interface Message {
  message?: string
  consumer_type?: string
  channel?: string
  level?: string
  type?: string
  payload?: Record<string, unknown>
  metadata?: Record<string, unknown>
  ignorable?: boolean
  ignored?: boolean
  read?: boolean
  read_at?: string
  deleted?: boolean
  progress?: Record<string, unknown>
  client_account?: string
}

export class Messages extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/messages'
  endpoint: string
  http: Client
  public options: MessagesOptions
  public uriHelper: UriHelper

  constructor (options: MessagesOptions, http: Client) {
    super(http, {
      endpoint: Messages.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = Messages.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (query?: MessagesQueryOptions | undefined): Promise<MessagesResponse> {
    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new errors.MessagesFetchFailed()

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.MessagesFetchFailed()
    }
  }

  async update (messageId: string, messageRequest: Message): Promise<MessageResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri(`/${messageId}`)

      const response = await this.http.getClient().put(uri, messageRequest)
      if (response.status !== 200) throw new errors.MessagesUpdateFailed()

      return {
        data: response.data.results[0] as Message,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.MessagesUpdateFailed()
    }
  }
}
