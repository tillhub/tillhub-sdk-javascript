import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface Notification {
  active: boolean
  createdAt: string
  criteria: {
    targetEntitiesIds: string[]
  }
  deletedAt: string
  emails: string[]
  id: string
  locations: string[]
  name: string
  nextRunAt: string | null
  period: string
  schedule: string[] | null
  startAt: string | null
  updatedAt: string
}

export interface NotificationsQuery {
  start: string
  end: string
  limit: number
  offset: number
  orderFields: string[]
  q: string
}

export interface NotificationsOptions {
  base?: string
  limit?: number
  uri?: string
  query?: NotificationsQuery
}

export interface NotificationsResponse {
  data?: Notification[]
  metadata?: Record<string, unknown>
  msg?: string
  next?: () => Promise<NotificationsResponse>
}

export interface ErrorObject {
  id: string
  label: string
  errorDetails: Record<string, unknown>
}

export class Notifications extends ThBaseHandler {
  public static baseEndpoint = '/api/v1/notifications'
  endpoint: string
  http: Client
  public options: NotificationsOptions
  public uriHelper: UriHelper

  constructor (options: NotificationsOptions, http: Client) {
    super(http, {
      endpoint: Notifications.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = Notifications.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (options?: NotificationsOptions | undefined): Promise<NotificationsResponse> {
    let next

    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, options)

      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) {
        throw new NotificationsFetchFailed(undefined, { status: response.status })
      }

      if (response.data.cursor?.next) {
        next = (): Promise<NotificationsResponse> => this.getAll({ uri: response.data.cursor.next })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count, cursor: response.data.cursor },
        next
      }
    } catch (error: any) {
      throw new NotificationsFetchFailed(error.message, { error })
    }
  }

  async meta (q?: NotificationsQuery | undefined): Promise<NotificationsResponse> {
    const base = this.uriHelper.generateBaseUri('/meta')
    const uri = this.uriHelper.generateUriWithQuery(base, q)
    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new NotificationsMetaFailed(undefined, { status: response.status })
      }
      if (!response.data.results[0]) {
        throw new NotificationsMetaFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new NotificationsMetaFailed(error.message, { error })
    }
  }

  async create (notification: Notification): Promise<NotificationsResponse> {
    const uri = this.uriHelper.generateBaseUri()

    try {
      const response = await this.http.getClient().post(uri, notification)
      if (response.status !== 200) {
        throw new NotificationsCreateFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new NotificationsCreateFailed(error.message, { error })
    }
  }

  async update (notificationId: string, product: Notification): Promise<NotificationsResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${notificationId}`)

    try {
      const response = await this.http.getClient().put(uri, product)
      if (response.status !== 200) {
        throw new NotificationsUpdateFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new NotificationsUpdateFailed(error.message, { error })
    }
  }

  async delete (notificationId: string): Promise<NotificationsResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri(`/${notificationId}`)

      const response = await this.http.getClient().delete(uri)
      if (response.status !== 200) {
        throw new NotificationsDeleteFailed(undefined, { status: response.status })
      }

      return {
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new NotificationsDeleteFailed(error.message, { error })
    }
  }
}

export class NotificationsFetchFailed extends BaseError {
  public name = 'NotificationsFetchFailed'
  constructor (
    public message: string = 'Could not fetch the notifications',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, NotificationsFetchFailed.prototype)
  }
}

export class NotificationsMetaFailed extends BaseError {
  public name = 'NotificationsMetaFailed'
  constructor (
    public message: string = 'Could not fetch the notifications meta',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, NotificationsMetaFailed.prototype)
  }
}

export class NotificationsCreateFailed extends BaseError {
  public name = 'NotificationsCreateFailed'
  constructor (
    public message: string = 'Could not create the notification',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, NotificationsCreateFailed.prototype)
  }
}

export class NotificationsUpdateFailed extends BaseError {
  public name = 'NotificationsUpdateFailed'
  constructor (
    public message: string = 'Could not update the notification',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, NotificationsUpdateFailed.prototype)
  }
}

export class NotificationsDeleteFailed extends BaseError {
  public name = 'NotificationsDeleteFailed'
  constructor (
    public message: string = 'Could not delete the notification',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, NotificationsDeleteFailed.prototype)
  }
}
