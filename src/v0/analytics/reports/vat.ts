import { Client } from '../../../client'
import { UriHelper } from '../../../uri-helper'
import * as errors from '../../../errors/analytics'

export interface VatOptions {
  user?: string
  base?: string
}

export interface VatResponse {
  data: Array<Record<string, unknown>>
  metadata: Record<string, unknown>
  next?: () => Promise<VatResponse>
}

export interface VatQuery {
  format?: string
  uri?: string
  legacy?: boolean
  limit?: number
}

export interface MetaQuery {
  legacy?: boolean
}

export class Vat {
  http: Client
  public options: VatOptions
  public uriHelper: UriHelper

  constructor (options: VatOptions, http: Client, uriHelper: UriHelper) {
    this.options = options
    this.http = http
    this.uriHelper = uriHelper
  }

  async getAll (query?: VatQuery): Promise<VatResponse> {
    let next
    try {
      const base = this.uriHelper.generateBaseUri('/reports/vat')
      const uri = this.uriHelper.generateUriWithQuery(base, query)
      const response = await this.http.getClient().get(uri)

      if (response.data.cursor?.next) {
        next = (): Promise<VatResponse> => this.getAll({ uri: response.data.cursor.next })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count },
        next
      }
    } catch (err) {
      throw new errors.VatReportFetchFailed()
    }
  }

  async meta (query?: MetaQuery): Promise<VatResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/reports/vat/meta')
      const uri = this.uriHelper.generateUriWithQuery(base, query)
      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) {
        throw new errors.VatReportFetchMetaFailed(undefined, { status: response.status })
      }

      if (!response.data.results[0]) {
        throw new errors.VatReportFetchMetaFailed('Could not get vat metadata unexpectedly')
      }

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (err) {
      throw new errors.VatReportFetchMetaFailed()
    }
  }
}
