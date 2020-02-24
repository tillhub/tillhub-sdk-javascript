import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface CashingUpsOptions {
  user?: string
  base?: string
}

export interface CashingUpsQuery {
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

export interface CashingUpsResponse {
  data: CashingUp[]
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}

export interface CashingUp {
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

export class CashingUps extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/cashier_counting_protocol'
  endpoint: string
  http: Client
  public options: CashingUpsOptions
  public uriHelper: UriHelper

  constructor(options: CashingUpsOptions, http: Client) {
    super(http, { endpoint: CashingUps.baseEndpoint, base: options.base || 'https://api.tillhub.com' })
    this.options = options
    this.http = http

    this.endpoint = CashingUps.baseEndpoint
    this.options.base = this.options.base || 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  getAll(query?: CashingUpsQuery): Promise<CashingUpsResponse> {
    return new Promise(async (resolve, reject) => {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, query)
      try {
        const response = await this.http.getClient().get(uri)
        response.status !== 200 &&
          reject(new CashingUpsFetchFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        } as CashingUpsResponse)
      } catch (error) {
        return reject(new CashingUpsFetchFailed(undefined, { error }))
      }
    })
  }

  meta(): Promise<CashingUpsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uri = this.uriHelper.generateBaseUri(`/meta`)
        const response = await this.http.getClient().get(uri)

        if (response.status !== 200) reject(new CashingUpsMetaFailed())

        return resolve({
          data: response.data.results[0],
          metadata: { count: response.data.count }
        } as CashingUpsResponse)
      } catch (error) {
        return reject(new CashingUpsMetaFailed(undefined, { error }))
      }
    })
  }
}

export class CashingUpsFetchFailed extends BaseError {
  public name = 'CashingUpsFetchFailed'
  constructor(public message: string = 'Could not fetch the cashing ups', properties?: any) {
    super(message, properties)
  }
}

export class CashingUpsMetaFailed extends BaseError {
  public name = 'CashingUpsMetaFailed'
  constructor(public message: string = 'Could not fetch metadata for cashing ups', properties?: any) {
    super(message, properties)
  }
}
