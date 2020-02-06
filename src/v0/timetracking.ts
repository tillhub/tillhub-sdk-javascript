import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface TimetrackingOptions {
  user?: string
  base?: string
}

export interface TimetrackingQuery {
  limit?: number
  uri?: string
  query?: {
    start?: string
    end?: string
  }
}

export interface TimetrackingResponse {
  data: TimetrackingReport
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}

export interface TimetrackingReport {
  date: string
  clock_in: string
  clock_out: string
  total_break: Time
  total_worked: Time
}

export interface Time {
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
}

export class Timetracking extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/time_tracking'
  endpoint: string
  http: Client
  public options: TimetrackingOptions
  public uriHelper: UriHelper

  constructor(options: TimetrackingOptions, http: Client) {
    super(http, { endpoint: Timetracking.baseEndpoint, base: options.base || 'https://api.tillhub.com' })
    this.options = options
    this.http = http

    this.endpoint = Timetracking.baseEndpoint
    this.options.base = this.options.base || 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  get(staffId: string, query?: TimetrackingQuery): Promise<TimetrackingResponse> {
    return new Promise(async (resolve, reject) => {
      const base = this.uriHelper.generateBaseUri(`/reports/staff/${staffId}`)
      const uri = this.uriHelper.generateUriWithQuery(base, query)
      try {
        const response = await this.http.getClient().get(uri)
        response.status !== 200 &&
          reject(new TimetrackingReportFetchFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results[0] as TimetrackingReport,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        } as TimetrackingResponse)
      } catch (error) {
        return reject(new TimetrackingReportFetchFailed(undefined, { error }))
      }
    })
  }
}

export class TimetrackingReportFetchFailed extends BaseError {
  public name = 'TimetrackingReportFetchFailed'
  constructor(public message: string = 'Could not fetch the timetracking report for the staff member', properties?: any) {
    super(message, properties)
  }
}
