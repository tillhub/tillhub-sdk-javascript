import { ThAnalyticsBaseHandler, ThAnalyticsBaseHandlerJsonReponseItem } from '../../../base'
import { Client } from '../../../client'
import { BaseError } from '../../../errors'

export interface BalancesHandlerOptions {
  user?: string
  base?: string
}

export interface AnalyticsReportsBalancesOverviewResponseItem extends ThAnalyticsBaseHandlerJsonReponseItem {

}

export interface AnalyticsReportsTransactionDetailResponsseItem extends ThAnalyticsBaseHandlerJsonReponseItem {

}

export class AnalyticsReportsBalancesOveview extends ThAnalyticsBaseHandler {
  http: Client
  public options: BalancesHandlerOptions

  constructor(options: BalancesHandlerOptions, http: Client) {
    super(http, options)
    this.options = options
    this.http = http
  }

  static create(options: object, http: Client): AnalyticsReportsBalancesOveview {
    return ThAnalyticsBaseHandler.generateAuthenticatedInstance(AnalyticsReportsBalancesOveview, options, http)
  }

  public async get(query?: object): Promise<AnalyticsReportsBalancesOverviewResponseItem[]> {
    try {
      const data = await this.handleGet(`${this.options.base}/api/v2/analytics/${this.options.user}/reports/balances/overview`, query)
      return data
    } catch (err) {
      throw new AnalyticsReportsBalancesOverviewFetchError(undefined, { error: err })
    }
  }
}

export class AnalyticsReportsBalancesDetail extends ThAnalyticsBaseHandler {
  http: Client
  public options: BalancesHandlerOptions

  constructor(options: BalancesHandlerOptions, http: Client) {
    super(http, options)
    this.options = options
    this.http = http
  }

  static create(options: object, http: Client): AnalyticsReportsBalancesDetail {
    return ThAnalyticsBaseHandler.generateAuthenticatedInstance(AnalyticsReportsBalancesDetail, options, http)
  }

  public async get(id?: string): Promise<AnalyticsReportsTransactionDetailResponsseItem[]> {
    try {
      const data = await this.handleGet(`${this.options.base}/api/v2/analytics/${this.options.user}/reports/balances/${id}`)
      return data
    } catch (err) {
      throw new AnalyticsReportsTransactionDetailFetcshError(undefined, { error: err })
    }
  }
}

export class AnalyticsReportsBalancesOverviewFetchError extends BaseError {
  public name = 'AnalyticsReportsBalancesOverviewFetchError'
  constructor(public message: string = 'Could not fetch balance overview. ', properties?: any) {
    super(message, properties)
  }
}

export class AnalyticsReportsTransactionDetailFetcshError extends BaseError {
  public name = 'AnalyticsReportsTransactionDetailFetcshError'
  constructor(public message: string = 'Could not fetch balance detail. ', properties?: any) {
    super(message, properties)
  }
}
