import { Client } from '../client'
import * as errors from '../errors'
import { ThBaseHandler } from '../base'
import { UriHelper } from '../uri-helper'

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
  metadata: Record<string, unknown>
}

export interface TaxResponse {
  data?: Tax
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}

export interface Tax {
  id?: string
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
  public uriHelper: UriHelper

  constructor (options: TaxesOptions, http: Client) {
    super(http, { endpoint: Taxes.baseEndpoint, base: options.base ?? 'https://api.tillhub.com' })
    this.options = options
    this.http = http

    this.endpoint = Taxes.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (queryOrOptions?: TaxesQuery | undefined): Promise<TaxesResponse> {
    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, queryOrOptions)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new errors.TaxesFetchFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.TaxesFetchFailed(undefined, { error })
    }
  }

  async get (taxId: string): Promise<TaxResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${taxId}`)
    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) { throw new errors.TaxesFetchFailed(undefined, { status: response.status }) }

      return {
        data: response.data.results[0],
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.TaxesFetchFailed(undefined, { error })
    }
  }

  async put (taxId: string, tax: Tax): Promise<TaxResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${taxId}`)
    try {
      const response = await this.http.getClient().put(uri, tax)

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.TaxesPutFailed(undefined, { error })
    }
  }

  async create (tax: Tax): Promise<TaxResponse> {
    const uri = this.uriHelper.generateBaseUri()
    try {
      const response = await this.http.getClient().post(uri, tax)

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.TaxesCreationFailed(undefined, { error })
    }
  }

  async delete (taxId: string): Promise<TaxResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${taxId}`)
    try {
      const response = await this.http.getClient().delete(uri)
      if (response.status !== 200) throw new errors.TaxDeleteFailed()

      return {
        msg: response.data.msg
      }
    } catch (err) {
      throw new errors.TaxDeleteFailed()
    }
  }
}
