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
  data?: TimetrackingEntry
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

export interface TimetrackingConfigurationResponse {
  data?: TimetrackingConfiguration[]
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}

export interface TimetrackingConfiguration {
  id?: string | null
  client_id?: string | null
  owner?: string | null
  active?: boolean
  deleted?: boolean
  auto_clock_out?: boolean
  auto_clock_out_after?: {
    value: number
    period: TimetrackingPeriodTypes
  } | null
  auto_clock_out_at: string | null
}

export type TimetrackingPeriodTypes = 'hours' | 'days'

export class Timetracking extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/time_tracking'
  endpoint: string
  http: Client
  public options: TimetrackingOptions
  public uriHelper: UriHelper

  constructor (options: TimetrackingOptions, http: Client) {
    super(http, {
      endpoint: Timetracking.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = Timetracking.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async get (staffId: string, query?: TimetrackingQuery): Promise<TimetrackingResponse> {
    const base = this.uriHelper.generateBaseUri(`/reports/staff/${staffId}`)
    const uri = this.uriHelper.generateUriWithQuery(base, query)
    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) { throw new TimetrackingReportFetchFailed(undefined, { status: response.status }) }

      return {
        data: response.data.results,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error) {
      throw new TimetrackingReportFetchFailed(undefined, { error })
    }
  }

  async getEntries (staffId: string, query?: TimetrackingEntryQuery): Promise<TimetrackingResponse> {
    const base = this.uriHelper.generateBaseUri(`/entries/staff/${staffId}`)
    const uri = this.uriHelper.generateUriWithQuery(base, query)
    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) { throw new TimetrackingEntriesFetchFailed(undefined, { status: response.status }) }

      return {
        data: response.data.results,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error) {
      throw new TimetrackingEntriesFetchFailed(undefined, { error })
    }
  }

  async createEntry (entry: TimetrackingEntry): Promise<TimetrackingEntryResponse> {
    const uri = this.uriHelper.generateBaseUri('/entries')
    try {
      const response = await this.http.getClient().post(uri, entry)
      if (response.status !== 200) { throw new TimetrackingEntryCreateFailed(undefined, { status: response.status }) }

      return {
        data: response.data.results[0] as TimetrackingEntry,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error) {
      throw new TimetrackingEntryCreateFailed(undefined, { error })
    }
  }

  async updateEntry (entryId: string, data?: TimetrackingEntry): Promise<TimetrackingEntryResponse> {
    const uri = this.uriHelper.generateBaseUri(`/entries/${entryId}`)
    try {
      const response = await this.http.getClient().put(uri, data)
      if (response.status !== 200) {
        throw new TimetrackingEntryPutFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0] as TimetrackingEntry,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error) {
      throw new TimetrackingEntryPutFailed(undefined, { error })
    }
  }

  async deleteEntry (entryId: string): Promise<TimetrackingEntryResponse> {
    const uri = this.uriHelper.generateBaseUri(`/entries/${entryId}`)
    try {
      const response = await this.http.getClient().delete(uri)
      if (response.status !== 200) { throw new TimetrackingEntryDeleteFailed(undefined, { status: response.status }) }

      return { msg: response.data.msg }
    } catch (error) {
      throw new TimetrackingEntryDeleteFailed(undefined, { error })
    }
  }

  async getAllConfigurations (): Promise<TimetrackingConfigurationResponse> {
    const uri = this.uriHelper.generateBaseUri('/configurations')
    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new TimetrackingConfigurationFetchFailed(undefined, { status: response.status })
      }
      return {
        data: response.data.results as TimetrackingConfiguration[],
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error) {
      throw new TimetrackingConfigurationFetchFailed(undefined, { error })
    }
  }

  async updateConfiguration (configId: string, data?: TimetrackingConfiguration): Promise<TimetrackingConfigurationResponse> {
    const uri = this.uriHelper.generateBaseUri(`/configurations/${configId}`)
    try {
      const response = await this.http.getClient().put(uri, data)
      if (response.status !== 200) {
        throw new TimetrackingConfigurationPutFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results as TimetrackingConfiguration[],
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error) {
      throw new TimetrackingConfigurationPutFailed(undefined, { error })
    }
  }

  async getStaffList (): Promise<TimetrackingResponse> {
    const uri = this.uriHelper.generateBaseUri('/staff')
    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) { throw new TimetrackingStaffListFetchFailed(undefined, { status: response.status }) }

      return {
        data: response.data.results,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error) {
      throw new TimetrackingStaffListFetchFailed(undefined, { error })
    }
  }
}

export class TimetrackingReportFetchFailed extends BaseError {
  public name = 'TimetrackingReportFetchFailed'
  constructor (
    public message: string = 'Could not fetch the timetracking report for the staff member',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TimetrackingReportFetchFailed.prototype)
  }
}

export class TimetrackingStaffListFetchFailed extends BaseError {
  public name = 'TimetrackingStaffListFetchFailed'
  constructor (
    public message: string = 'Could not fetch the list of staff with timetracking entries',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TimetrackingStaffListFetchFailed.prototype)
  }
}

export class TimetrackingEntriesFetchFailed extends BaseError {
  public name = 'TimetrackingEntriesFetchFailed'
  constructor (
    public message: string = 'Could not fetch the timetracking entries for the staff member',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TimetrackingEntriesFetchFailed.prototype)
  }
}

export class TimetrackingEntryCreateFailed extends BaseError {
  public name = 'TimetrackingEntryCreateFailed'
  constructor (
    public message: string = 'Could have not create the timetracking entry',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TimetrackingEntryCreateFailed.prototype)
  }
}

export class TimetrackingEntryPutFailed extends BaseError {
  public name = 'TimetrackingEntryPutFailed'
  constructor (
    public message: string = 'Could have not update the timetracking entry',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TimetrackingEntryPutFailed.prototype)
  }
}

export class TimetrackingEntryDeleteFailed extends BaseError {
  public name = 'TimetrackingEntryDeleteFailed'
  constructor (
    public message: string = 'Could have not delete the timetracking entry',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TimetrackingEntryDeleteFailed.prototype)
  }
}

export class TimetrackingConfigurationFetchFailed extends BaseError {
  public name = 'TimetrackingConfigurationFetchFailed'
  constructor (
    public message: string = 'Could not fetch the timetracking configurations',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TimetrackingConfigurationFetchFailed.prototype)
  }
}

export class TimetrackingConfigurationPutFailed extends BaseError {
  public name = 'TimetrackingConfigurationPutFailed'
  constructor (
    public message: string = 'Could not update the timetracking configurations',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TimetrackingConfigurationPutFailed.prototype)
  }
}
