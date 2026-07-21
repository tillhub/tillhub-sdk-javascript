import { Client, Timeout } from '../../../client'
import { UriHelper } from '../../../uri-helper'
import { BaseError } from '../../../errors'
import { ThAnalyticsBaseHandler } from '../../../base'
import { AnalyticsOptions } from '../../../v0/analytics'
import { exportJobQuery } from '../../../shared_interfaces'

export interface AnalyticsReportsCommunicationsItem {
  id: string
  contentType: CommunicationsContentType | null
  recipient: string | null
  sentScheduledOn: string | null
  createdBy: CommunicationsCreatedBy
  status: CommunicationsDeliveryStatus
  content: string | null
  reservationId: string | null
}

export interface AnalyticsReportsCommunicationsResponse {
  data: AnalyticsReportsCommunicationsItem[]
  metadata: {
    count?: number
    cursor?: {
      before?: string | null
      after?: string | null
    }
  }
  msg?: string
  next?: () => Promise<AnalyticsReportsCommunicationsResponse>
}

export interface AnalyticsReportsCommunicationsMetaResponse {
  data: {
    count: number
  }
  metadata: Record<string, unknown>
}

export type CommunicationsChannel = 'sms' | 'email'

export type CommunicationsContentType = 'reservation_reminder' | 'msu' | 'pay_od' | 'unknown'

export type CommunicationsDeliveryStatus = 'scheduled' | 'pending' | 'delivered' | 'undelivered' | 'sent' | 'unknown' | 'failed'

export type CommunicationsCreatedBy = 'customer' | 'staff' | 'unknown'

export interface AnalyticsReportsCommunicationsFilters {
  limit?: number
  channel?: CommunicationsChannel
  start?: string
  end?: string
  contentType?: CommunicationsContentType
  branchId?: string
  status?: CommunicationsDeliveryStatus
  createdBy?: CommunicationsCreatedBy
}

export interface AnalyticsReportsCommunicationsQuery extends AnalyticsReportsCommunicationsFilters {
  uri?: string
}

export type AnalyticsReportsCommunicationsExportQuery =
  AnalyticsReportsCommunicationsFilters &
  Omit<exportJobQuery, 'documentType' | 'emailTemplate' | 'timezone' | 'filenamePrefix' | 'startDate'> & {
    documentType: 'CommunicationsStatisticsExport'
    emailLayout?: string
    language?: string
    timezone?: string
    filenamePrefix?: string
    startDate?: string
  }

export interface AnalyticsReportsCommunicationsExportResult {
  correlationId: string
}

export interface AnalyticsReportsCommunicationsExportResponse {
  data: AnalyticsReportsCommunicationsExportResult
  msg?: string
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

  async export (query: AnalyticsReportsCommunicationsExportQuery): Promise<AnalyticsReportsCommunicationsExportResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/export')
      const uri = this.uriHelper.generateUriWithQuery(base, query)
      const response = await this.http.getClient().get(uri)

      if (response.status !== 200 || !response.data.results?.[0]) {
        throw new AnalyticsReportsCommunicationsExportFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0],
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new AnalyticsReportsCommunicationsExportFailed(error.message, { error })
    }
  }

  async meta (queryOrOptions?: AnalyticsReportsCommunicationsFilters | undefined): Promise<AnalyticsReportsCommunicationsMetaResponse> {
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

export class AnalyticsReportsCommunicationsExportFailed extends BaseError {
  public name = 'ReportsCommunicationsExportFailed'
  constructor (
    public message: string = 'Could not export communications report',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AnalyticsReportsCommunicationsExportFailed.prototype)
  }
}
