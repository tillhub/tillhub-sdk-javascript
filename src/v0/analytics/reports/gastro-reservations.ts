import { Client, Timeout } from '../../../client'
import { UriHelper } from '../../../uri-helper'
import * as errors from '../../../errors/analytics'

export interface AnalyticsOptions {
  user?: string
  base?: string
}

export interface AnalyticsResponse {
  data: Array<Record<string, unknown>>
  summary: Array<Record<string, unknown>>
  metadata: Record<string, unknown>
  msg?: string
  next?: () => Promise<AnalyticsResponse>
}

export interface AnalyticsMetaResponse {
  data: Array<Record<string, unknown>>
  metadata: Record<string, unknown>
}

export enum ReservationStatus {
  RESERVED = 'reserved',
  SEATED = 'seated',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  NO_SHOW = 'no_show'
}

export enum ReservationSource {
  WALK_IN = 'walk_in',
  ONLINE_BOOKING = 'online_booking',
  ONLINE_CALENDAR = 'ios_calendar'
}

export interface GastroReservationsQuery {
  start?: string
  end?: string
  limit?: number
  q?: string
  status?: ReservationStatus | ReservationStatus[]
  branchId?: string
  source?: ReservationStatus | ReservationSource[]
  layoutId?: string
  uri?: string
}

export class GastroReservations {
  endpoint: string
  http: Client
  public options: AnalyticsOptions
  public uriHelper: UriHelper
  public timeout: Timeout

  constructor (options: AnalyticsOptions, http: Client) {
    this.endpoint = '/api/v0/gastro/reservations/appointments/report'
    this.options = options
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.http = http
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (query?: GastroReservationsQuery): Promise<AnalyticsResponse> {
    let next

    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new errors.ReportsGastroReservationsFetchAllFailed(undefined, { status: response.status })
      }

      if (response.data.cursors?.after) {
        next = (): Promise<AnalyticsResponse> => this.getAll({ uri: response.data.cursors.after })
      }

      return {
        data: response.data.results[0]?.values ?? [],
        summary: [response.data.results[1]?.values ?? {}],
        metadata: { cursor: response.data.cursors },
        next
      }
    } catch (error: any) {
      throw new errors.ReportsGastroReservationsFetchAllFailed(error.message, { error })
    }
  }

  async meta (queryOrOptions?: GastroReservationsQuery | undefined): Promise<AnalyticsMetaResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/meta')
      const uri = this.uriHelper.generateUriWithQuery(base, queryOrOptions)
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) { throw new errors.ReportsGastroReservationsMetaFailed(undefined, { status: response.status }) }
      if (!response.data.results[0]) { throw new errors.ReportsGastroReservationsMetaFailed(undefined, { status: response.status }) }

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.ReportsGastroReservationsMetaFailed(error.message, { error })
    }
  }
}
