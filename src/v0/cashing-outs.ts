import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface CashingOutsOptions {
  user?: string
  base?: string
}

export interface CashingOutsQuery {
  limit?: number
  uri?: string
  query?: {
    deleted?: boolean
    active?: boolean
    cashier?: string
    branch?: string
    time?: string
    amount?: string
    discrepancy?: boolean
  }
}

export interface CashingOutsResponse {
  data: CashingOut[]
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}

export interface CashingOut {
  id: string
  insert_id?: number
  custom_id?: string
  branch?: string
  branch_custom_id?: string
  register?: string
  register_custom_id?: string
  client?: string
  client_custom_id?: string
  staff?: string
  cashier_staff?: string
  device?: string
  context?: string
  comments?: string
  location?: string
  cash_units?: object[]
  timezone?: string
  discrepancy?: boolean
  discrepancy_total?: string
  temp_staff?: string
  counting_type?: string
  counting_date?: string
  counting_tips?: string
  balance_number?: string
  balance_last?: string
  balance_custom_id_last?: string
  merchant_receipt?: string
  client_id?: string
  has_discrepancy?: boolean
  total_counted?: string
  total_calculated?: string
}

export class CashingOuts extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/cashier_counting_protocol'
  endpoint: string
  http: Client
  public options: CashingOutsOptions
  public uriHelper: UriHelper

  constructor(options: CashingOutsOptions, http: Client) {
    super(http, { endpoint: CashingOuts.baseEndpoint, base: options.base || 'https://api.tillhub.com' })
    this.options = options
    this.http = http

    this.endpoint = CashingOuts.baseEndpoint
    this.options.base = this.options.base || 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  getAll(query?: CashingOutsQuery): Promise<CashingOutsResponse> {
    return new Promise(async (resolve, reject) => {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, query)
      try {
        const response = await this.http.getClient().get(uri)
        response.status !== 200 &&
          reject(new CashingOutsFetchFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        } as CashingOutsResponse)
      } catch (error) {
        return reject(new CashingOutsFetchFailed(undefined, { error }))
      }
    })
  }

  meta(): Promise<CashingOutsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uri = this.uriHelper.generateBaseUri(`/meta`)
        const response = await this.http.getClient().get(uri)

        if (response.status !== 200) reject(new CashingOutsMetaFailed())

        return resolve({
          data: response.data.results[0],
          metadata: { count: response.data.count }
        } as CashingOutsResponse)
      } catch (error) {
        return reject(new CashingOutsMetaFailed(undefined, { error }))
      }
    })
  }
}

export class CashingOutsFetchFailed extends BaseError {
  public name = 'CashingOutsFetchFailed'
  constructor(public message: string = 'Could not fetch the cashing outs', properties?: any) {
    super(message, properties)
  }
}

export class CashingOutsMetaFailed extends BaseError {
  public name = 'CashingOutsMetaFailed'
  constructor(public message: string = 'Could not fetch metadata for cashing outs', properties?: any) {
    super(message, properties)
  }
}
