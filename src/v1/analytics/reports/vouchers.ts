import { ThAnalyticsBaseHandler } from '../../../base'
import { VoucherOptions } from '../../../v0/analytics'
import { Client } from '../../../client'
import { BaseError } from '../../../errors'
import { UriHelper } from '../../../uri-helper'

export interface VouchersHandlerOptions {
  user?: string
  base?: string
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

  constructor (options: VouchersHandlerOptions, http: Client) {
    super(http, options)
    this.options = options
    this.http = http
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

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new AnalyticsReportsV1VouchersFetchError()
      return {
        data: response.data.results,
        metadata: {
          count: response.data.count
        }
      }
    } catch (err: any) {
      throw new AnalyticsReportsV1VouchersFetchError(undefined, { error: err })
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
