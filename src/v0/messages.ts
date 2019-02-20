import qs from 'qs'
import { Client } from '../client'
import * as errors from '../errors'

export interface MessagesOptions {
  user?: string
  base?: string
}

export interface MessagesResponse {
  data: Message[]
  metadata: object
}

export interface Message {
  id: string
  updated_at?: string
  created_at: string
  message?: string
  invoked_at?: string
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

  constructor(options: MessagesOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v0/messages'
    this.options.base = this.options.base || 'https://api.tillhub.com'
  }

  getAll(): Promise<MessagesResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uri = `${this.options.base}${this.endpoint}/${this.options.user}`

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
}
