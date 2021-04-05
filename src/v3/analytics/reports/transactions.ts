import { ThAnalyticsBaseHandler } from '../../../base'
import { Client } from '../../../client'
import { BaseError } from '../../../errors'
import { UriHelper } from '../../../uri-helper'

export interface TransactionsHandlerOptions {
  user?: string
  base?: string
}

export interface AnalyticsReportsTransactionsV3ExportResponseItem {
  correlationId?: string
}

export interface AnalyticsResponse {
  data: AnalyticsReportsTransactionsV3ExportResponseItem[]
  metadata: Record<string, unknown>
  msg?: string
}

export class AnalyticsReportsTransactions extends ThAnalyticsBaseHandler {
  http: Client
  public options: TransactionsHandlerOptions

  constructor (options: TransactionsHandlerOptions, http: Client) {
    super(http, options)
    this.options = options
    this.http = http
  }

  static create (options: Record<string, unknown>, http: Client): AnalyticsReportsTransactions {
    return ThAnalyticsBaseHandler.generateAuthenticatedInstance(
      AnalyticsReportsTransactions,
      options,
      http
    )
  }

  public async export (
    query?: Record<string, unknown>
  ): Promise<AnalyticsResponse> {
    try {
      const localUriHelper = new UriHelper('/api/v3/analytics', this.options)
      const base = localUriHelper.generateBaseUri('/reports/transactions/overview')
      const uri = localUriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new AnalyticsReportsV3TransactionsExportFetchError()
      return {
        data: response.data.results,
        metadata: {
          count: response.data.count
        }
      }
    } catch (err) {
      throw new AnalyticsReportsV3TransactionsExportFetchError(undefined, { error: err })
    }
  }
}

export class AnalyticsReportsV3TransactionsExportFetchError extends BaseError {
  public name = 'AnalyticsReportsV3TransactionsExportFetchError'
  constructor (
    public message: string = 'Could not fetch transactions report export.',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AnalyticsReportsV3TransactionsExportFetchError.prototype)
  }
}
