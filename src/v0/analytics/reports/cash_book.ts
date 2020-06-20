import { Client } from '../../../client'
import { UriHelper } from '../../../uri-helper'
import { BaseError } from '../../../errors'

export interface CashBookOptions {
  user?: string
  base?: string
}

export interface CashBookResponse {
  data: Record<string, unknown>[]
}

export interface CashBookQuery {
  format?: string
  uri?: string
  query: {
    start: string
    end: string
    timezone: string
    register_custom_id: string
    register: string
    branch_custom_id: string
    branch: string
  }
}

export class CashBook {
  http: Client
  public options: CashBookOptions
  public uriHelper: UriHelper

  constructor(options: CashBookOptions, http: Client, uriHelper: UriHelper) {
    this.options = options
    this.http = http
    this.uriHelper = uriHelper
  }

  getAll(query?: CashBookQuery): Promise<CashBookResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const base = this.uriHelper.generateBaseUri('/reports/cash_book')
        const uri = this.uriHelper.generateUriWithQuery(base, query)
        const response = await this.http.getClient().get(uri)

        return resolve({
          data: response.data.results[0].values,
          metadata: { count: response.data.results[0].count }
        } as CashBookResponse)
      } catch (err) {
        return reject(new CashBookReportFetchFailed())
      }
    })
  }
}

export class CashBookReportFetchFailed extends BaseError {
  public name = 'CashBookReportFetchFailed'
  constructor(public message: string = 'Could not fetch the cash book report', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, CashBookReportFetchFailed.prototype)
  }
}
