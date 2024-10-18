import { Client } from '../client'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'
import { BaseError } from '../errors'

export interface AppointmentReminderTemplatesOptions {
  user?: string
  base?: string
}

export type AppointmentReminderTemplateType = 'email' | 'sms'

export interface AppointmentReminderTemplateTypeEntity {
  id?: string
  type?: AppointmentReminderTemplateType
  language?: string
  name?: string
  content?: string
  subject?: string
}

export interface AppointmentReminderTemplatesResponse {
  data?: AppointmentReminderTemplateTypeEntity[]
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}

export class AppointmentReminderTemplates extends ThBaseHandler {
  public static baseEndpoint = '/api/v1/notifications/appointment-reminders'
  endpoint: string
  http: Client
  public options: AppointmentReminderTemplatesOptions
  public uriHelper: UriHelper

  constructor (options: AppointmentReminderTemplatesOptions, http: Client) {
    super(http, {
      endpoint: AppointmentReminderTemplates.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = AppointmentReminderTemplates.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (): Promise<AppointmentReminderTemplatesResponse> {
    const uri = this.uriHelper.generateBaseUri('/templates')

    try {
      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) {
        throw new AppointmentReminderTemplatesFetchFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results as AppointmentReminderTemplateTypeEntity[],
        msg: response.data.msg,
        metadata: { count: response.data.results.length }
      }
    } catch (error: any) {
      throw new AppointmentReminderTemplatesFetchFailed(error.message, { error })
    }
  }
}

export class AppointmentReminderTemplatesFetchFailed extends BaseError {
  public name = 'AppointmentReminderTemplatesFetchFailed'
  constructor (
    public message: string = 'Could not fetch appointment reminder templates.',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AppointmentReminderTemplatesFetchFailed.prototype)
  }
}
