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
    deleted?: boolean
    active?: boolean
    start?: string
    end?: string
  }
}

export interface TimetrackingResponse {
  data: TimetrackingReport[]
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}

export interface TimetrackingEntryQuery {
  limit?: number
  uri?: string
  query?: {
    deleted?: boolean
    active?: boolean
    date?: string
  }
}

export interface TimetrackingEntryResponse {
  data: TimetrackingEntry
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

export interface TimetrackingEntry {
  id?: string
  staff?: string
  type?: TimetrackingEntryTypes
  started_at?: string
  ended_at?: string
  client_id?: string
}

export type TimetrackingEntryTypes = 'day' | 'break'

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
          data: response.data.results,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        } as TimetrackingResponse)
      } catch (error) {
        return reject(new TimetrackingReportFetchFailed(undefined, { error }))
      }
    })
  }

  getEntries(staffId: string, query?: TimetrackingEntryQuery): Promise<TimetrackingResponse> {
    return new Promise(async (resolve, reject) => {
      const base = this.uriHelper.generateBaseUri(`/entries/staff/${staffId}`)
      const uri = this.uriHelper.generateUriWithQuery(base, query)
      try {
        const response = await this.http.getClient().get(uri)
        response.status !== 200 &&
          reject(new TimetrackingEntriesFetchFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        } as TimetrackingResponse)
      } catch (error) {
        return reject(new TimetrackingEntriesFetchFailed(undefined, { error }))
      }
    })
  }

  createEntry(entry: TimetrackingEntry): Promise<TimetrackingEntryResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = this.uriHelper.generateBaseUri(`/entries`)
      try {
        const response = await this.http.getClient().post(uri, entry)
        response.status !== 200 &&
          reject(new TimetrackingEntryCreateFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results[0] as TimetrackingEntry,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        } as TimetrackingEntryResponse)
      } catch (error) {
        return reject(new TimetrackingEntryCreateFailed(undefined, { error }))
      }
    })
  }

  updateEntry(entryId: string, data?: TimetrackingEntry): Promise<TimetrackingEntryResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = this.uriHelper.generateBaseUri(`/entries/${entryId}`)
      try {
        const response = await this.http.getClient().put(uri, data)
        response.status !== 200 &&
          reject(new TimetrackingEntryPutFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results[0] as TimetrackingEntry,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        } as TimetrackingEntryResponse)
      } catch (error) {
        return reject(new TimetrackingEntryPutFailed(undefined, { error }))
      }
    })
  }

  deleteEntry(entryId: string): Promise<TimetrackingEntryResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = this.uriHelper.generateBaseUri(`/entries/${entryId}`)
      try {
        const response = await this.http.getClient().delete(uri)
        response.status !== 200 &&
          reject(new TimetrackingEntryDeleteFailed(undefined, { status: response.status }))

        return resolve({ msg: response.data.msg } as TimetrackingEntryResponse)
      } catch (error) {
        return reject(new TimetrackingEntryDeleteFailed(undefined, { error }))
      }
    })
  }

  getStaffList(): Promise<TimetrackingResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = this.uriHelper.generateBaseUri(`/staff`)
      try {
        const response = await this.http.getClient().get(uri)
        response.status !== 200 &&
          reject(new TimetrackingStaffListFetchFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        } as TimetrackingResponse)
      } catch (error) {
        return reject(new TimetrackingStaffListFetchFailed(undefined, { error }))
      }
    })
  }
}

export class TimetrackingReportFetchFailed extends BaseError {
  public name = 'TimetrackingReportFetchFailed'
  constructor(public message: string = 'Could not fetch the timetracking report for the staff member', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, TimetrackingReportFetchFailed.prototype)
  }
}

export class TimetrackingStaffListFetchFailed extends BaseError {
  public name = 'TimetrackingStaffListFetchFailed'
  constructor(public message: string = 'Could not fetch the list of staff with timetracking entries', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, TimetrackingStaffListFetchFailed.prototype)
  }
}

export class TimetrackingEntriesFetchFailed extends BaseError {
  public name = 'TimetrackingEntriesFetchFailed'
  constructor(public message: string = 'Could not fetch the timetracking entries for the staff member', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, TimetrackingEntriesFetchFailed.prototype)
  }
}

export class TimetrackingEntryCreateFailed extends BaseError {
  public name = 'TimetrackingEntryCreateFailed'
  constructor(public message: string = 'Could have not create the timetracking entry', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, TimetrackingEntryCreateFailed.prototype)
  }
}

export class TimetrackingEntryPutFailed extends BaseError {
  public name = 'TimetrackingEntryPutFailed'
  constructor(public message: string = 'Could have not update the timetracking entry', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, TimetrackingEntryPutFailed.prototype)
  }
}

export class TimetrackingEntryDeleteFailed extends BaseError {
  public name = 'TimetrackingEntryDeleteFailed'
  constructor(public message: string = 'Could have not delete the timetracking entry', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, TimetrackingEntryDeleteFailed.prototype)
  }
}
