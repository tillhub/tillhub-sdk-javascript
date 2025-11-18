import { Client, Timeout } from '../../../client'
import { UriHelper } from '../../../uri-helper'
import * as errors from '../../../errors/analytics'

export interface AnalyticsOptions {
  user?: string
  base?: string
}

export interface AnalyticsResponse {
  data: Array<Record<string, unknown>>
  metadata: Record<string, unknown>
  msg?: string
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
    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new errors.ReportsGastroReservationsFetchAllFailed()

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.ReportsGastroReservationsFetchAllFailed()
    }
  }
}
