import { ThAnalyticsBaseHandler } from '../../../base'
import { VoucherOptions } from '../../../v0/analytics'
import { Client, Timeout } from '../../../client'
import { BaseError } from '../../../errors'
import { UriHelper } from '../../../uri-helper'

export interface VouchersHandlerOptions {
  user?: string
  base?: string
  timeout?: Timeout
}

export interface AnalyticsReportsVouchersV1ExportResponseItem {
  correlationId?: string
}

export interface AnalyticsResponse {
  data: AnalyticsReportsVouchersV1ExportResponseItem[]
  metadata: Record<string, unknown>
  msg?: string
}

export class AnalyticsReportsVouchers extends ThAnalyticsBaseHandler {
  http: Client
  public options: VouchersHandlerOptions
  public timeout: Timeout

  constructor (options: VouchersHandlerOptions, http: Client) {
    super(http, options)
    this.options = options
    this.http = http
    this.timeout = options.timeout ?? this.http.getClient().defaults.timeout
  }

  static create (options: Record<string, unknown>, http: Client): AnalyticsReportsVouchers {
    return ThAnalyticsBaseHandler.generateAuthenticatedInstance(
      AnalyticsReportsVouchers,
      options,
      http
    )
  }

  public async getAll (
    query?: VoucherOptions
  ): Promise<AnalyticsResponse> {
    try {
      const localUriHelper = new UriHelper('/api/v1/analytics', this.options)
      const base = localUriHelper.generateBaseUri('/reports/vouchers')
      const uri = localUriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri, { timeout: this.timeout })
      if (response.status !== 200) throw new AnalyticsReportsV1VouchersFetchError()
      return {
        data: response.data.results,
        metadata: {
          count: response.data.count
        }
      }
    } catch (error: any) {
      throw new AnalyticsReportsV1VouchersFetchError(error.message, { error })
    }
  }
}

export class AnalyticsReportsV1VouchersFetchError extends BaseError {
  public name = 'AnalyticsReportsV1VouchersFetchError'
  constructor (
    public message: string = 'Could not fetch vouchers report',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AnalyticsReportsV1VouchersFetchError.prototype)
  }
}
