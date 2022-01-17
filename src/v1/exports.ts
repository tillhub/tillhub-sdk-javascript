import { Client } from '../client'
import { UriHelper } from '../uri-helper'
import { ExportsOptions, GobdQuery, GobdQueryOrOptions, ExportsGobdFetchFailed } from '../v0/exports'

export interface ExportsV1ResponseItem {
  correlationId?: string
}

export interface ExportsV1Response {
  data: ExportsV1ResponseItem[]
  metadata: Record<string, unknown>
  msg?: string
}

export class ExportsV1 {
  endpoint: string
  http: Client
  public options: ExportsOptions
  public uriHelper: UriHelper

  constructor (options: ExportsOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v1/exports'
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async gobd (gobdQuery: GobdQuery, queryOrOptions?: GobdQueryOrOptions): Promise<ExportsV1Response> {
    try {
      const base = this.uriHelper.generateBaseUri('/gobd')
      const uri = this.uriHelper.generateUriWithQuery(base, queryOrOptions)

      const response = await this.http.getClient().post(uri, gobdQuery)
      if (response.status !== 200) {
        throw new ExportsGobdFetchFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results,
        metadata: {}
      }
    } catch (error: any) {
      throw new ExportsGobdFetchFailed(error.message, { error })
    }
  }
}
