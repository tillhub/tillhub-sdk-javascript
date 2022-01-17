import { ThAnalyticsBaseHandler } from '../../../base'
import { ProcessesQueryOptions } from '../../../v0/processes'
import { Client, Timeout } from '../../../client'
import { BaseError } from '../../../errors'
import { UriHelper } from '../../../uri-helper'

export interface ProcessesHandlerOptions {
  user?: string
  base?: string
  timeout?: Timeout
}

export interface AnalyticsReportsProcessesV1ExportResponseItem {
  correlationId?: string
}

export interface AnalyticsResponse {
  data: AnalyticsReportsProcessesV1ExportResponseItem[]
  metadata: Record<string, unknown>
  msg?: string
}

export class AnalyticsReportsProcesses extends ThAnalyticsBaseHandler {
  http: Client
  public options: ProcessesHandlerOptions
  public timeout: Timeout

  constructor (options: ProcessesHandlerOptions, http: Client) {
    super(http, options)
    this.options = options
    this.http = http
    this.timeout = options.timeout ?? this.http.getClient().defaults.timeout
  }

  static create (options: Record<string, unknown>, http: Client): AnalyticsReportsProcesses {
    return ThAnalyticsBaseHandler.generateAuthenticatedInstance(
      AnalyticsReportsProcesses,
      options,
      http
    )
  }

  public async getAll (
    query?: ProcessesQueryOptions
  ): Promise<AnalyticsResponse> {
    try {
      const localUriHelper = new UriHelper('/api/v1/analytics', this.options)
      const base = localUriHelper.generateBaseUri('/reports/processes')
      const uri = localUriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri, { timeout: this.timeout })
      if (response.status !== 200) throw new AnalyticsReportsV1ProcessesFetchError()
      return {
        data: response.data.results,
        metadata: {
          count: response.data.count
        }
      }
    } catch (error: any) {
      throw new AnalyticsReportsV1ProcessesFetchError(error.message, { error })
    }
  }
}

export class AnalyticsReportsV1ProcessesFetchError extends BaseError {
  public name = 'AnalyticsReportsV1ProcessesFetchError'
  constructor (
    public message: string = 'Could not fetch processes report',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AnalyticsReportsV1ProcessesFetchError.prototype)
  }
}
