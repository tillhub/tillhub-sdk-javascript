import { Client } from '../client'
import { UriHelper } from '../uri-helper'
import { BaseError } from '../errors/baseError'
import { ThBaseHandler } from '../base'

export interface HolidaysOptions {
  user?: string
  base?: string
}

export interface HolidaysResponse {
  msg?: string
  data?: Holiday[]
  metadata?: Record<string, unknown>
}

export type HolidayType = 'Public' | 'Bank' | 'School' | 'Authorities' | 'Optional' | 'Observance'

export interface Holiday {
  date: string
  localName: string
  name: string
  countryCode: string
  fixed: boolean
  global: boolean
  countries: string[] | null
  launchYear: null | number
  types: HolidayType[]
}

export class Holidays extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/holidays'
  endpoint: string
  http: Client
  public options: HolidaysOptions
  public uriHelper: UriHelper

  constructor (options: HolidaysOptions, http: Client) {
    super(http, {
      endpoint: Holidays.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = Holidays.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (): Promise<HolidaysResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri()

      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) {
        throw new HolidaysFetchFailed(undefined, { status: response.status })
      }

      return {
        msg: response.data.msg,
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new HolidaysFetchFailed(error.message, { error })
    }
  }
}

class HolidaysFetchFailed extends BaseError {
  public name = 'HolidaysFetchFailed'
  constructor (
    public message: string = 'Could not fetch holidays',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, HolidaysFetchFailed.prototype)
  }
}
