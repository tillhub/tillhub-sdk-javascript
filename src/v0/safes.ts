import { Client } from '../client'
import * as errors from '../errors/safes'
import { UriHelper } from '../uri-helper'

export interface SafesOptions {
  user?: string
  base?: string
}

export interface SafesQuery {
  limit?: number
  uri?: string
}

export interface SafeResponse {
  data: SafesResponse
  metadata?: {
    count?: number
  }
  msg?: string
}

export interface SafesResponse {
  data: object[]
  metadata: object
}

export interface AmountItem {
  currency: string
  amount: number
}

export interface Safe {
  type?: string
  account_number?: string
  name?: string
  custom_id?: string
  cost_center?: string
  location?: string
  state?: string
  limit_upper?: number
  limit_lower?: number
  items?: Array<AmountItem> | null
  metadata?: object
  deleted?: boolean
  active?: boolean
}

export class Safes {
  endpoint: string
  http: Client
  public options: SafesOptions
  public uriHelper: UriHelper

  constructor(options: SafesOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v0/safes'
    this.options.base = this.options.base || 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  getAll(query?: SafesQuery | undefined): Promise<SafesResponse> {
    return new Promise(async (resolve, reject) => {
      let next

      try {
        const base = this.uriHelper.generateBaseUri()
        const uri = this.uriHelper.generateUriWithQuery(base, query)

        const response = await this.http.getClient().get(uri)

        if (response.data.cursor && response.data.cursor.next) {
          next = (): Promise<SafesResponse> => this.getAll({ uri: response.data.cursor.next })
        }

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count, cursor: response.data.cursor },
          next
        } as SafesResponse)
      } catch (error) {
        return reject(new errors.SafesFetchAllFailed(undefined, { error }))
      }
    })
  }

  get(safeId: string): Promise<SafeResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uri = this.uriHelper.generateBaseUri(`/${safeId}`)
        const response = await this.http.getClient().get(uri)
        response.status !== 200 &&
          reject(new errors.SafesFetchOneFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results[0] as Safe,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        } as SafeResponse)
      } catch (error) {
        return reject(new errors.SafesFetchOneFailed(undefined, { error }))
      }
    })
  }

  meta(): Promise<SafesResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uri = this.uriHelper.generateBaseUri(`/meta`)
        const response = await this.http.getClient().get(uri)

        if (response.status !== 200) reject(new errors.SafesGetMetaFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as SafesResponse)
      } catch (error) {
        return reject(new errors.SafesGetMetaFailed(undefined, { error }))
      }
    })
  }

  create(safe: Safe): Promise<SafeResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uri = this.uriHelper.generateBaseUri()
        const response = await this.http.getClient().post(uri, safe)

        return resolve({
          data: response.data.results[0] as Safe,
          metadata: { count: response.data.count }
        } as SafeResponse)
      } catch (error) {
        return reject(new errors.SafesCreationFailed(undefined, { error }))
      }
    })
  }

  put(safeId: string, safe: Safe): Promise<SafeResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uri = this.uriHelper.generateBaseUri(`/${safeId}`)
        const response = await this.http.getClient().put(uri, safe)
        response.status !== 200 &&
          reject(new errors.SafesPutFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results[0] as Safe,
          metadata: { count: response.data.count }
        } as SafeResponse)
      } catch (error) {
        return reject(new errors.SafesPutFailed(undefined, { error }))
      }
    })
  }
}
