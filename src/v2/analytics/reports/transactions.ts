import { ThAnalyticsBaseHandler, ThAnalyticsBaseHandlerJsonReponseItem } from '../../../base'
import { Client } from '../../../client'
import { BaseError } from '../../../errors'

export interface TransactionsHandlerOptions {
  user?: string
  base?: string
}

export interface AnalyticsReportsTransactionsOverviewResponseItem extends ThAnalyticsBaseHandlerJsonReponseItem {

}

export interface AnalyticsReportsTransactionDetailResponsseItem extends ThAnalyticsBaseHandlerJsonReponseItem {

}

export class AnalyticsReportsTransactionsOveview extends ThAnalyticsBaseHandler {
  http: Client
  public options: TransactionsHandlerOptions

  constructor(options: TransactionsHandlerOptions, http: Client) {
    super(http, options)
    this.options = options
    this.http = http
  }

  static create(options: object, http: Client): AnalyticsReportsTransactionsOveview {
    return ThAnalyticsBaseHandler.generateAuthenticatedInstance(AnalyticsReportsTransactionsOveview, options, http)
  }

  public async get(query?: object): Promise<AnalyticsReportsTransactionsOverviewResponseItem[]> {
    try {
      const data = await this.handleGet(`${this.options.base}/api/v2/analytics/${this.options.user}/reports/transactions/overview`, query)
      return data
    } catch (err) {
      throw new AnalyticsReportsTransactionsOverviewFetchError(undefined, { error: err })
    }
  }
}

export class AnalyticsReportsTransactionsDetail extends ThAnalyticsBaseHandler {
  http: Client
  public options: TransactionsHandlerOptions

  constructor(options: TransactionsHandlerOptions, http: Client) {
    super(http, options)
    this.options = options
    this.http = http
  }

  static create(options: object, http: Client): AnalyticsReportsTransactionsDetail {
    return ThAnalyticsBaseHandler.generateAuthenticatedInstance(AnalyticsReportsTransactionsDetail, options, http)
  }

  public async get(id?: string): Promise<AnalyticsReportsTransactionDetailResponsseItem[]> {
    try {
      const data = await this.handleGet(`${this.options.base}/api/v2/analytics/${this.options.user}/reports/transactions/${id}`)
      return data
    } catch (err) {
      throw new AnalyticsReportsTransactionDetailFetcshError(undefined, { error: err })
    }
  }
}

export class AnalyticsReportsTransactionsOverviewFetchError extends BaseError {
  public name = 'AnalyticsReportsTransactionsOverviewFetchError'
  constructor(public message: string = 'Could not fetch transaction overview. ', properties?: any) {
    super(message, properties)
  }
}

export class AnalyticsReportsTransactionDetailFetcshError extends BaseError {
  public name = 'AnalyticsReportsTransactionDetailFetcshError'
  constructor(public message: string = 'Could not fetch transaction detail. ', properties?: any) {
    super(message, properties)
  }
}
