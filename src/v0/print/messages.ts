import { Client } from '../../client'
import { UriHelper } from '../../uri-helper'
import * as errors from '../../errors'
import { PrintOptions } from '../print'

export interface PrintMessage {
  id?: string
  printer?: string
  message?: {
    type: string
    body?: string | object
  }
  response?: {
    status: number
    msg?: string | object
  }
}

export interface PrintMessagesResponse {
  data: PrintMessage[]
  metadata: object
  msg?: string
}

export interface PrintMessageResponse {
  data: PrintMessage
  metadata: object
  msg?: string
}

export class Messages {
  http: Client
  public options: PrintOptions
  public uriHelper: UriHelper

  constructor(options: PrintOptions, http: Client, uriHelper: UriHelper) {
    this.options = options
    this.http = http
    this.uriHelper = uriHelper
  }

  async getAll(query?: Object): Promise<PrintMessagesResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/messages')
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new errors.PrintMessagesFetchFailed()

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      } as PrintMessagesResponse
    } catch (e) {
      throw new errors.PrintMessagesFetchFailed()
    }
  }

  async get(messageId: string): Promise<PrintMessageResponse> {
    try {
      const base = this.uriHelper.generateBaseUri(`/messages/${messageId}`)
      const uri = this.uriHelper.generateUriWithQuery(base)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new errors.PrintMessageFetchFailed()

      return {
        data: response.data.results[0] as PrintMessage,
        metadata: { count: response.data.count },
        msg: response.data.msg
      } as PrintMessageResponse
    } catch (e) {
      throw new errors.PrintMessageFetchFailed()
    }
  }

  async create(message: Object): Promise<PrintMessageResponse> {
    try {
      const base = this.uriHelper.generateBaseUri(`/messages`)
      const uri = this.uriHelper.generateUriWithQuery(base)

      const response = await this.http.getClient().post(uri, message)
      if (response.status !== 200) throw new errors.PrintMessageCreateFailed()

      return {
        data: response.data.results[0] as PrintMessage,
        metadata: { count: response.data.count }
      } as PrintMessageResponse
    } catch (e) {
      throw new errors.PrintMessageCreateFailed()
    }
  }

  async update(messageId: string, message: Object): Promise<PrintMessageResponse> {
    try {
      const base = this.uriHelper.generateBaseUri(`/messages/${messageId}`)
      const uri = this.uriHelper.generateUriWithQuery(base)

      const response = await this.http.getClient().patch(uri, message)
      if (response.status !== 200) throw new errors.PrintMessageUpdateFailed()

      return {
        data: response.data.results[0] as PrintMessage,
        metadata: { count: response.data.count }
      } as PrintMessageResponse
    } catch (e) {
      throw new errors.PrintMessageUpdateFailed()
    }
  }

  async delete(messageId: string): Promise<PrintMessageResponse> {
    try {
      const base = this.uriHelper.generateBaseUri(`/messages/${messageId}`)
      const uri = this.uriHelper.generateUriWithQuery(base)

      const response = await this.http.getClient().delete(uri)
      if (response.status !== 200) throw new errors.PrintMessageDeleteFailed()

      return {
        msg: response.data.msg
      } as PrintMessageResponse
    } catch (e) {
      throw new errors.PrintMessageDeleteFailed()
    }
  }
}
