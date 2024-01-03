import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface ScheduledExportsOptions {
  user?: string
  base?: string
}

export interface ScheduledExportsCreateResponse {
  data: ScheduledExport
}

export interface ScheduledExportsToggleResponse {
  data: ScheduledExport
}

export interface ScheduledExport {
  id?: string
  documentType: string
  startDate: string
  lastExportedAt?: string | null
  email: string
  active?: boolean
  interval: {
    years?: number
    months?: number
    days?: number
    hours?: number
    minutes?: number
    seconds?: number
    milliseconds?: number
  }
  filter?: Record<string, unknown>
  createdAt?: string
  updatedAt?: string
}

export class ScheduledExports extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/documents/scheduled-exports'
  endpoint: string
  http: Client
  public options: ScheduledExportsOptions
  public uriHelper: UriHelper

  constructor (options: ScheduledExportsOptions, http: Client) {
    super(http, {
      endpoint: ScheduledExports.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = ScheduledExports.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async create (options: ScheduledExport): Promise<ScheduledExportsCreateResponse> {
    const uri = this.uriHelper.generateBaseUri()

    try {
      const response = await this.http.getClient().post(uri, options)
      if (response.status !== 200) { throw new ScheduledExportsCreationFailed(undefined, { status: response.status }) }

      return {
        data: response.data.results[0] as ScheduledExport
      }
    } catch (error: any) {
      throw new ScheduledExportsCreationFailed(error.message, { error })
    }
  }

  async toggle (scheduleId: string): Promise<ScheduledExportsToggleResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri(`/${scheduleId}/toggle`)

      const response = await this.http.getClient().put(uri)

      if (response.status !== 200) throw new ScheduledExportsToggleFailed()

      return {
        data: response.data.results[0] as ScheduledExport
      }
    } catch (error: any) {
      throw new ScheduledExportsToggleFailed()
    }
  }
}

export class ScheduledExportsCreationFailed extends BaseError {
  public name = 'ScheduledExportsCreationFailed'
  constructor (
    public message: string = 'Failed to create scheduled export',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ScheduledExportsCreationFailed.prototype)
  }
}

export class ScheduledExportsToggleFailed extends BaseError {
  public name = 'ScheduledExportsToggleFailed'
  constructor (
    public message: string = 'Failed to toggle scheduled export active status',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ScheduledExportsToggleFailed.prototype)
  }
}
