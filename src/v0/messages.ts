import qs from 'qs'
import { Client } from '../client'
import * as errors from '../errors'
import { UriHelper } from '../uri-helper'

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
  metadata: object
}

export interface Message {
  message?: string
  consumer_type?: string
  channel?: string
  level?: string
  type?: string
  payload?: object
  metadata?: object
  ignorable?: boolean
  ignored?: boolean
  read?: boolean
  read_at?: string
  deleted?: boolean
  progress?: object
  client_account?: string
}

export class Messages {
  endpoint: string
  http: Client
  public options: MessagesOptions
  public uriHelper: UriHelper

  constructor(options: MessagesOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v0/messages'
    this.options.base = this.options.base || 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  getAll(query?: MessagesQueryOptions | undefined): Promise<MessagesResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const queryString = qs.stringify(query, { addQueryPrefix: true })
        const uri = `${this.options.base}${this.endpoint}/${this.options.user}${queryString}`

        const response = await this.http.getClient().get(uri)
        response.status !== 200 && reject(new errors.MessagesFetchFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as MessagesResponse)
      } catch (err) {
        return reject(new errors.MessagesFetchFailed())
      }
    })
  }

  update(messageId: string, messageRequest: Message): Promise<MessagesResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uri = this.uriHelper.generateBaseUri(`/${messageId}`)

        const response = await this.http.getClient().put(uri, messageRequest)
        response.status !== 200 && reject(new errors.MessagesUpdateFailed())

        return resolve({
          data: response.data.results[0] as Message,
          metadata: { count: response.data.count }
        } as MessagesResponse)
      } catch (err) {
        return reject(new errors.MessagesUpdateFailed())
      }
    })
  }
}
