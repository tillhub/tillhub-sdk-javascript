import { Client } from '../client'
import { UriHelper } from '../uri-helper'
import { BaseError } from '../errors/baseError'

export interface ExportsOptions {
  user?: string
  base?: string
}

export interface ExportsQueryOrOptions {
  limit?: number
  uri?: string
  query?: {
    embed?: string[]
    tz?: string
  }
}

export interface DatevQuery {
  range?: {
    from: string
    to: string
  }
  tz?: string
  password?: string
  emails?: string[]
}

export interface GobdQuery {
  start: string
  end: string
  tz?: string
  password?: string
  emails?: string[]
  client_name: string
}

export interface GobdQueryOrOptions {
  limit?: number
  uri?: string
  query?: {
    embed?: string[]
    tz?: string
  }
}

export interface ExportsResponse {
  data: {
    uri: string
  }[]
  metadata: Record<string, unknown>
  msg?: string | null
}

export class Exports {
  endpoint: string
  http: Client
  public options: ExportsOptions
  public uriHelper: UriHelper

  constructor(options: ExportsOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v0/exports'
    this.options.base = this.options.base || 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  datev(datevQuery: DatevQuery, queryOrOptions: ExportsQueryOrOptions): Promise<ExportsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const base = `${this.options.base}${this.endpoint}/${this.options.user}/datev`
        const uri = this.uriHelper.generateUriWithQuery(base, queryOrOptions)

        const response = await this.http.getClient().post(uri, datevQuery)
        if (response.status !== 200) {
          return reject(new ExportsDatevFetchFailed(undefined, { status: response.status }))
        }

        return resolve({
          data: response.data.results,
          metadata: {}
        } as ExportsResponse)
      } catch (error) {
        return reject(new ExportsDatevFetchFailed(undefined, { error }))
      }
    })
  }

  gobd(gobdQuery: GobdQuery, queryOrOptions: GobdQueryOrOptions): Promise<ExportsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const base = `${this.options.base}${this.endpoint}/${this.options.user}/gobd`
        const uri = this.uriHelper.generateUriWithQuery(base, queryOrOptions)

        const response = await this.http.getClient().post(uri, gobdQuery)
        if (response.status !== 200) {
          return reject(new ExportsGobdFetchFailed(undefined, { status: response.status }))
        }

        return resolve({
          data: response.data.results,
          metadata: {}
        } as ExportsResponse)
      } catch (error) {
        return reject(new ExportsGobdFetchFailed(undefined, { error }))
      }
    })
  }
}

class ExportsDatevFetchFailed extends BaseError {
  public name = 'ExportsDatevFetchFailed'
  constructor(
    public message: string = 'Could not fetch datev export',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ExportsDatevFetchFailed.prototype)
  }
}

class ExportsGobdFetchFailed extends BaseError {
  public name = 'ExportsGobdFetchFailed'
  constructor(
    public message: string = 'Could not fetch gobd export',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ExportsGobdFetchFailed.prototype)
  }
}
