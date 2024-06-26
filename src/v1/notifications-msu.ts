import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface Notification {
  active?: boolean
  createdAt?: string
  criteria?: {
    targetEntitiesIds: string[]
  }
  deletedAt?: string
  emails?: string[]
  id?: string
  locations?: string[]
  name?: string
  nextRunAt?: string | null
  period?: string
  schedule?: string[] | null
  startAt?: string | null
  updatedAt?: string
}

export interface NotificationsMsuQuery {
  start?: string
  end?: string
  limit?: number
  offset?: number
  orderFields?: string[]
  q?: string
}

export interface NotificationsMsuOptions {
  base?: string
  limit?: number
  uri?: string
  query?: NotificationsMsuQuery
}

export interface NotificationsMsuResponse {
  data?: Notification[]
  metadata?: Record<string, unknown>
  msg?: string
  next?: () => Promise<NotificationsMsuResponse>
}

export interface NotificationSingleResponse {
  data: Notification
  msg: string
}

export interface ErrorObject {
  id: string
  label: string
  errorDetails: Record<string, unknown>
}

export class NotificationsMsu extends ThBaseHandler {
  public static baseEndpoint = '/api/v1/notifications/msu'
  endpoint: string
  http: Client
  public options: NotificationsMsuOptions
  public uriHelper: UriHelper

  constructor (options: NotificationsMsuOptions, http: Client) {
    super(http, {
      endpoint: NotificationsMsu.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = NotificationsMsu.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (options?: NotificationsMsuOptions | undefined): Promise<NotificationsMsuResponse> {
    let next

    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, options)

      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) {
        throw new NotificationsMsuFetchFailed(undefined, { status: response.status })
      }

      if (response.data.cursor?.next) {
        next = (): Promise<NotificationsMsuResponse> => this.getAll({ uri: response.data.cursor.next })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count, cursor: response.data.cursor },
        next
      }
    } catch (error: any) {
      throw new NotificationsMsuFetchFailed(error.message, { error })
    }
  }

  async get (notificationId: string): Promise<NotificationSingleResponse> {
    const base = this.uriHelper.generateBaseUri(`/${notificationId}`)
    const uri = this.uriHelper.generateUriWithQuery(base)

    try {
      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) {
        throw new NotificationsMsuGetFailed(undefined, { status: response.status })
      }
      return {
        data: response.data.results[0],
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new NotificationsMsuGetFailed(error.message, { error })
    }
  }

  async meta (q?: NotificationsMsuQuery | undefined): Promise<NotificationsMsuResponse> {
    const base = this.uriHelper.generateBaseUri('/meta')
    const uri = this.uriHelper.generateUriWithQuery(base, q)
    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new NotificationsMsuMetaFailed(undefined, { status: response.status })
      }
      if (!response.data.results[0]) {
        throw new NotificationsMsuMetaFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new NotificationsMsuMetaFailed(error.message, { error })
    }
  }

  async create (notification: Notification): Promise<NotificationsMsuResponse> {
    const uri = this.uriHelper.generateBaseUri()

    try {
      const response = await this.http.getClient().post(uri, notification)
      if (response.status !== 200) {
        throw new NotificationsMsuCreateFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new NotificationsMsuCreateFailed(error.message, { error })
    }
  }

  async update (notificationId: string, product: Notification): Promise<NotificationsMsuResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${notificationId}`)

    try {
      const response = await this.http.getClient().put(uri, product)
      if (response.status !== 200) {
        throw new NotificationsMsuUpdateFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new NotificationsMsuUpdateFailed(error.message, { error })
    }
  }

  async delete (notificationId: string): Promise<NotificationsMsuResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri(`/${notificationId}`)

      const response = await this.http.getClient().delete(uri)
      if (response.status !== 200) {
        throw new NotificationsMsuDeleteFailed(undefined, { status: response.status })
      }

      return {
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new NotificationsMsuDeleteFailed(error.message, { error })
    }
  }
}

export class NotificationsMsuFetchFailed extends BaseError {
  public name = 'NotificationsMsuFetchFailed'
  constructor (
    public message: string = 'Could not fetch notifications',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, NotificationsMsuFetchFailed.prototype)
  }
}

export class NotificationsMsuGetFailed extends BaseError {
  public name = 'NotificationsMsuGetFailed'
  constructor (
    public message: string = 'Could not get the notification',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, NotificationsMsuCreateFailed.prototype)
  }
}

export class NotificationsMsuMetaFailed extends BaseError {
  public name = 'NotificationsMsuMetaFailed'
  constructor (
    public message: string = 'Could not fetch the notifications meta',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, NotificationsMsuMetaFailed.prototype)
  }
}

export class NotificationsMsuCreateFailed extends BaseError {
  public name = 'NotificationsMsuCreateFailed'
  constructor (
    public message: string = 'Could not create the notification',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, NotificationsMsuCreateFailed.prototype)
  }
}

export class NotificationsMsuUpdateFailed extends BaseError {
  public name = 'NotificationsMsuUpdateFailed'
  constructor (
    public message: string = 'Could not update the notification',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, NotificationsMsuUpdateFailed.prototype)
  }
}

export class NotificationsMsuDeleteFailed extends BaseError {
  public name = 'NotificationsMsuDeleteFailed'
  constructor (
    public message: string = 'Could not delete the notification',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, NotificationsMsuDeleteFailed.prototype)
  }
}
