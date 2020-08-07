import qs from 'qs'
import { Client } from '../client'
import * as errors from '../errors'
import { ThBaseHandler } from '../base'

export interface TaxesOptions {
  user?: string
  base?: string
}

export interface TaxesQuery {
  limit?: number
  uri?: string
  query?: {
    deleted?: boolean
    active?: boolean
  }
}

export interface TaxesResponse {
  data: Tax[]
  metadata: object
}

export interface TaxResponse {
  data: Tax
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}
export interface Tax {
  id?: string
}

export interface Tax {
  name: string
  fa_account_number?: string
  type: TaxType
  account: string
  rate?: string
  percentage?: string
  is_fixed: boolean
  jurisdiction?: Jurisdictions
  rate_class: RateClasses
}

export type TaxType = 'vat'
export type RateClasses = 'normal' | 'reduced' | 'super_reduced'
export type Jurisdictions =
  | 'austria'
  | 'czech_republic'
  | 'france'
  | 'germany'
  | 'hungary'
  | 'italy'
  | 'ireland'
  | 'jungholz'
  | 'mittelberg'
  | 'monaco'
  | 'spain'
  | 'switzerland'

export class Taxes extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/taxes'
  endpoint: string
  http: Client
  public options: TaxesOptions

  constructor(options: TaxesOptions, http: Client) {
    super(http, { endpoint: Taxes.baseEndpoint, base: options.base || 'https://api.tillhub.com' })
    this.options = options
    this.http = http

    this.endpoint = Taxes.baseEndpoint
    this.options.base = this.options.base || 'https://api.tillhub.com'
  }

  getAll(queryOrOptions?: TaxesQuery | undefined): Promise<TaxesResponse> {
    return new Promise(async (resolve, reject) => {
      let next

      try {
        let uri
        if (queryOrOptions && queryOrOptions.uri) {
          uri = queryOrOptions.uri
        } else {
          let queryString = ''
          if (queryOrOptions && (queryOrOptions.query || queryOrOptions.limit)) {
            queryString = qs.stringify({ limit: queryOrOptions.limit, ...queryOrOptions.query })
          }

          uri = `${this.options.base}${this.endpoint}/${this.options.user}${queryString ? `?${queryString}` : ''}`
        }
        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) {
          return reject(new errors.TaxesFetchFailed(undefined, { status: response.status }))
        }

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count },
          next
        } as TaxesResponse)
      } catch (error) {
        return reject(new errors.TaxesFetchFailed(undefined, { error }))
      }
    })
  }

  get(taxId: string): Promise<TaxResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${taxId}`
      try {
        const response = await this.http.getClient().get(uri)
        response.status !== 200 &&
          reject(new errors.TaxesFetchFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results[0] as Tax,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        } as TaxResponse)
      } catch (error) {
        return reject(new errors.TaxesFetchFailed(undefined, { error }))
      }
    })
  }

  put(taxId: string, tax: Tax): Promise<TaxResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${taxId}`
      try {
        const response = await this.http.getClient().put(uri, tax)

        return resolve({
          data: response.data.results[0] as Tax,
          metadata: { count: response.data.count }
        } as TaxResponse)
      } catch (error) {
        return reject(new errors.TaxesPutFailed(undefined, { error }))
      }
    })
  }

  create(tax: Tax): Promise<TaxResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}`
      try {
        const response = await this.http.getClient().post(uri, tax)

        return resolve({
          data: response.data.results[0] as Tax,
          metadata: { count: response.data.count }
        } as TaxResponse)
      } catch (error) {
        return reject(new errors.TaxesCreationFailed(undefined, { error }))
      }
    })
  }

  delete(taxId: string): Promise<TaxResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${taxId}`
      try {
        const response = await this.http.getClient().delete(uri)
        response.status !== 200 && reject(new errors.TaxDeleteFailed())

        return resolve({
          msg: response.data.msg
        } as TaxResponse)
      } catch (err) {
        return reject(new errors.TaxDeleteFailed())
      }
    })
  }
}
