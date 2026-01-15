import { Client, Timeout } from '../../../client'
import { UriHelper } from '../../../uri-helper'
import { BaseError } from '../../../errors'
import { ThAnalyticsBaseHandler } from '../../../base'
import { AnalyticsOptions } from '../../../v0/analytics'

export interface AnalyticsReportsCommunicationsResponse {
  data: Array<Record<string, unknown>>
  metadata: Record<string, unknown>
  msg?: string
  next?: () => Promise<AnalyticsReportsCommunicationsResponse>
}

export interface AnalyticsReportsCommunicationsMetaResponse {
  data: Array<Record<string, unknown>>
  metadata: Record<string, unknown>
}

export type CommunicationsChannel = 'sms' | 'email'

export type CommunicationsContentType = 'reservation_reminder' | 'msu' | 'pay_od' | 'unknown'

export type CommunicationsDeliveryStatus = 'scheduled' | 'pending' | 'delivered' | 'undelivered'

export type CommunicationsCreatedBy = 'customer' | 'staff' | 'unknown'

export interface AnalyticsReportsCommunicationsQuery {
  limit?: number
  channel?: CommunicationsChannel
  start?: string
  end?: string
  contentType?: CommunicationsContentType
  branchId?: string
  status?: CommunicationsDeliveryStatus | CommunicationsDeliveryStatus[]
  createdBy?: CommunicationsCreatedBy
  uri?: string
}

export class AnalyticsReportsCommunications extends ThAnalyticsBaseHandler {
  http: Client
  public options: AnalyticsOptions
  public timeout: Timeout
  public uriHelper: UriHelper

  constructor (options: AnalyticsOptions, http: Client) {
    super(http, options)
    this.options = options
    this.http = http
    this.timeout = options.timeout ?? this.http.getClient().defaults.timeout
    this.uriHelper = new UriHelper('/api/v1/notifications/reports/communications', this.options)
  }

  static create (options: Record<string, unknown>, http: Client): AnalyticsReportsCommunications {
    return ThAnalyticsBaseHandler.generateAuthenticatedInstance(
      AnalyticsReportsCommunications,
      options,
      http
    )
  }

  async getAll (query?: AnalyticsReportsCommunicationsQuery): Promise<AnalyticsReportsCommunicationsResponse> {
    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new AnalyticsReportsCommunicationsFetchAllFailed(undefined, { status: response.status })
      }

      let next
      if (response.data.cursors?.after) {
        next = (): Promise<AnalyticsReportsCommunicationsResponse> => this.getAll({ uri: response.data.cursors.after })
      }

      return {
        data: response.data.results ?? [],
        metadata: { count: response.data.count, cursor: response.data.cursors },
        next
      }
    } catch (error: any) {
      throw new AnalyticsReportsCommunicationsFetchAllFailed(error.message, { error })
    }
  }

  async meta (queryOrOptions?: AnalyticsReportsCommunicationsQuery | undefined): Promise<AnalyticsReportsCommunicationsMetaResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/meta')
      const uri = this.uriHelper.generateUriWithQuery(base, queryOrOptions)
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) { throw new AnalyticsReportsCommunicationsMetaFailed(undefined, { status: response.status }) }
      if (!response.data.results[0]) { throw new AnalyticsReportsCommunicationsMetaFailed(undefined, { status: response.status }) }

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new AnalyticsReportsCommunicationsMetaFailed(error.message, { error })
    }
  }
}

export class AnalyticsReportsCommunicationsFetchAllFailed extends BaseError {
  public name = 'ReportsCommunicationsFetchAllFailed'
  constructor (
    public message: string = 'Could not fetch all the communications',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AnalyticsReportsCommunicationsFetchAllFailed.prototype)
  }
}

export class AnalyticsReportsCommunicationsMetaFailed extends BaseError {
  public name = 'ReportsCommunicationsMetaFailed'
  constructor (
    public message: string = 'Could not fetch communications report metadata',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AnalyticsReportsCommunicationsMetaFailed.prototype)
  }
}
