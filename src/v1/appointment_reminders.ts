import { Client } from '../client'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'
import { BaseError } from '../errors'
import { AppointmentReminderTemplates } from './appointment-reminder-templates'

export interface AppointmentRemindersOptions {
  user?: string
  base?: string
}

export type ReminderType = 'email' | 'sms'

export interface AppointmentReminderEntity {
  id?: string
  type?: ReminderType
  locationId?: string
  active?: boolean
  templateId?: string
  reminderLeadTime?: {
    type: 'day' | 'hour' | 'month'
    value: number
  }
}

export interface AppointmentRemindersResponse {
  data?: AppointmentReminderEntity
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}

export interface AppointmentRemindersTestReminderPayload {
  templateId?: string
  branchId?: string
  type?: ReminderType
  email?: string
  phoneNumber?: string
}

export interface AppointmentRemindersTestReminderResponse {
  msg?: string
}

export class AppointmentReminders extends ThBaseHandler {
  public static baseEndpoint = '/api/v1/notifications/appointment-reminders'
  endpoint: string
  http: Client
  public options: AppointmentRemindersOptions
  public uriHelper: UriHelper

  constructor (options: AppointmentRemindersOptions, http: Client) {
    super(http, {
      endpoint: AppointmentReminders.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = AppointmentReminders.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async get (): Promise<AppointmentRemindersResponse> {
    const uri = this.uriHelper.generateBaseUri()

    try {
      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) {
        throw new AppointmentReminderFetchFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0] as AppointmentReminderEntity,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new AppointmentReminderFetchFailed(error.message, { error })
    }
  }

  async post (
    appointmentReminder: AppointmentReminderEntity
  ): Promise<AppointmentRemindersResponse> {
    const uri = this.uriHelper.generateBaseUri()

    try {
      const response = await this.http.getClient().post(uri, appointmentReminder)

      return {
        data: response.data.results[0] as AppointmentReminderEntity,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new AppointmentReminderPostFailed(error.message, { error })
    }
  }

  async patch (
    id: string,
    appointmentReminder: AppointmentReminderEntity
  ): Promise<AppointmentRemindersResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${id}`)

    try {
      const response = await this.http.getClient().patch(uri, appointmentReminder)

      return {
        data: response.data.results[0] as AppointmentReminderEntity,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new AppointmentReminderPatchFailed(error.message, { error })
    }
  }

  async sendTestReminder (payload: AppointmentRemindersTestReminderPayload): Promise<AppointmentRemindersTestReminderResponse> {
    const uri = this.uriHelper.generateBaseUri('/test-reminder')

    try {
      const response = await this.http.getClient().post(uri, payload)

      return {
        msg: response.data.results[0].msg
      }
    } catch (error: any) {
      throw new AppointmentReminderSendTestReminderFailed(error.message, { error })
    }
  }

  templates (): AppointmentReminderTemplates {
    return new AppointmentReminderTemplates(this.options, this.http)
  }
}

export class AppointmentReminderPatchFailed extends BaseError {
  public name = 'AppointmentReminderPatchFailed'
  constructor (
    public message: string = 'Could not alter appointment reminder.',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AppointmentReminderPatchFailed.prototype)
  }
}

export class AppointmentReminderPostFailed extends BaseError {
  public name = 'AppointmentReminderPostFailed'
  constructor (
    public message: string = 'Could not create appointment reminder.',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AppointmentReminderPostFailed.prototype)
  }
}

export class AppointmentReminderFetchFailed extends BaseError {
  public name = 'AppointmentReminderFetchFailed'
  constructor (
    public message: string = 'Could not fetch appointment reminders.',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AppointmentReminderFetchFailed.prototype)
  }
}

export class AppointmentReminderSendTestReminderFailed extends BaseError {
  public name = 'AppointmentReminderSendTestReminderFailed'
  constructor (
    public message: string = 'Could not send test reminder.',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AppointmentReminderSendTestReminderFailed.prototype)
  }
}
