import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface CountingProtocolsOptions {
  user?: string
  base?: string
}

export interface CountingProtocolsQuery {
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

export interface CountingProtocolsResponse {
  data: CountingProtocol[]
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}

export interface CountingProtocol {
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
  cash_units?: Record<string, unknown>[]
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

export class CountingProtocols extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/cashier_counting_protocols'
  endpoint: string
  http: Client
  public options: CountingProtocolsOptions
  public uriHelper: UriHelper

  constructor(options: CountingProtocolsOptions, http: Client) {
    super(http, {
      endpoint: CountingProtocols.baseEndpoint,
      base: options.base || 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = CountingProtocols.baseEndpoint
    this.options.base = this.options.base || 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  getAll(query?: CountingProtocolsQuery): Promise<CountingProtocolsResponse> {
    return new Promise(async (resolve, reject) => {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, query)
      try {
        const response = await this.http.getClient().get(uri)
        response.status !== 200 &&
          reject(new CountingProtocolsFetchFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        } as CountingProtocolsResponse)
      } catch (error) {
        return reject(new CountingProtocolsFetchFailed(undefined, { error }))
      }
    })
  }

  meta(): Promise<CountingProtocolsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uri = this.uriHelper.generateBaseUri(`/meta`)
        const response = await this.http.getClient().get(uri)

        if (response.status !== 200) reject(new CountingProtocolsMetaFailed())

        return resolve({
          data: response.data.results[0],
          metadata: { count: response.data.count }
        } as CountingProtocolsResponse)
      } catch (error) {
        return reject(new CountingProtocolsMetaFailed(undefined, { error }))
      }
    })
  }
}

export class CountingProtocolsFetchFailed extends BaseError {
  public name = 'CountingProtocolsFetchFailed'
  constructor(
    public message: string = 'Could not fetch the counting protocols',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, CountingProtocolsFetchFailed.prototype)
  }
}

export class CountingProtocolsMetaFailed extends BaseError {
  public name = 'CountingProtocolsMetaFailed'
  constructor(
    public message: string = 'Could not fetch metadata for counting protocols',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, CountingProtocolsMetaFailed.prototype)
  }
}
