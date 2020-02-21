import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface CashingOutOptions {
  user?: string
  base?: string
}

export interface CashingOutQuery {
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

export interface CashingOutResponse {
  data: CashingOutReport[]
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}

export interface CashingOutReport {
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

export class CashingOut extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/cashier_counting_protocol'
  endpoint: string
  http: Client
  public options: CashingOutOptions
  public uriHelper: UriHelper

  constructor(options: CashingOutOptions, http: Client) {
    super(http, { endpoint: CashingOut.baseEndpoint, base: options.base || 'https://api.tillhub.com' })
    this.options = options
    this.http = http

    this.endpoint = CashingOut.baseEndpoint
    this.options.base = this.options.base || 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  getAll(query?: CashingOutQuery): Promise<CashingOutResponse> {
    return new Promise(async (resolve, reject) => {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, query)
      try {
        const response = await this.http.getClient().get(uri)
        response.status !== 200 &&
          reject(new CashingOutFetchFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        } as CashingOutResponse)
      } catch (error) {
        return reject(new CashingOutFetchFailed(undefined, { error }))
      }
    })
  }
}

export class CashingOutFetchFailed extends BaseError {
  public name = 'CashingOutFetchFailed'
  constructor(public message: string = 'Could not fetch the cashing out', properties?: any) {
    super(message, properties)
  }
}
