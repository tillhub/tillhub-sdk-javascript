import { Client } from '../client'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'
import { BaseError } from '../errors'

export interface GastroReservationsAppointmentsOptions {
  user?: string
  base?: string
}

export type GastroReservationStatus = 'reserved' | 'seated' | 'completed' | 'cancelled' | 'no_show'

export interface GastroReservationsAppointment {
  id?: string
  start?: string
  end?: string
  status?: GastroReservationStatus
  branchId?: string
  partySize?: number
  [key: string]: unknown
}

export interface GastroReservationsAppointmentsQuery {
  start?: string | Date
  end?: string | Date
  limit?: number
  q?: string
  status?: GastroReservationStatus | GastroReservationStatus[]
  branchId?: string
  updatedAt?: string | Date
  source?: string | string[]
  layoutId?: string
  uri?: string
}

export interface GastroReservationsAppointmentsResponse {
  data?: GastroReservationsAppointment[]
  metadata?: Record<string, unknown>
  msg?: string
  next?: () => Promise<GastroReservationsAppointmentsResponse>
}

export interface CountOpeningHoursConflictsBody {
  startDate: string
  endDate: string
  from?: string | null
  to?: string | null
  branchId?: string
  timeZone?: string
}

export interface OpeningHoursConflictsResult {
  count: number
}

export interface CountOpeningHoursConflictsResponse {
  data?: OpeningHoursConflictsResult
  metadata?: Record<string, unknown>
  msg?: string
}

export class GastroReservationsAppointments extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/gastro/reservations/appointments'
  endpoint: string
  http: Client
  public options: GastroReservationsAppointmentsOptions
  public uriHelper: UriHelper

  constructor (options: GastroReservationsAppointmentsOptions, http: Client) {
    super(http, {
      endpoint: GastroReservationsAppointments.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = GastroReservationsAppointments.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (query?: GastroReservationsAppointmentsQuery): Promise<GastroReservationsAppointmentsResponse> {
    let next
    const base = this.uriHelper.generateBaseUri()
    const uri = this.uriHelper.generateUriWithQuery(base, query)

    try {
      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) {
        throw new GastroReservationsAppointmentsFetchFailed(undefined, { status: response.status })
      }

      if (response.data.cursors?.after) {
        next = (): Promise<GastroReservationsAppointmentsResponse> =>
          this.getAll({ uri: response.data.cursors.after })
      }

      return {
        data: response.data.results,
        metadata: { cursor: response.data.cursors },
        next
      }
    } catch (error: any) {
      throw new GastroReservationsAppointmentsFetchFailed(error.message, { error })
    }
  }

  async countOpeningHoursConflicts (
    body: CountOpeningHoursConflictsBody
  ): Promise<CountOpeningHoursConflictsResponse> {
    const uri = this.uriHelper.generateBaseUri('/opening-hours-conflicts')

    try {
      const response = await this.http.getClient().post(uri, body)

      if (response.status !== 200) {
        throw new GastroReservationsOpeningHoursConflictsFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results?.[0] as OpeningHoursConflictsResult,
        metadata: { count: response.data.count },
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new GastroReservationsOpeningHoursConflictsFailed(error.message, { error })
    }
  }
}

export class GastroReservationsAppointmentsFetchFailed extends BaseError {
  public name = 'GastroReservationsAppointmentsFetchFailed'
  constructor (
    public message: string = 'Could not fetch gastro reservations',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, GastroReservationsAppointmentsFetchFailed.prototype)
  }
}

export class GastroReservationsOpeningHoursConflictsFailed extends BaseError {
  public name = 'GastroReservationsOpeningHoursConflictsFailed'
  constructor (
    public message: string = 'Could not count opening hours conflicts',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, GastroReservationsOpeningHoursConflictsFailed.prototype)
  }
}
