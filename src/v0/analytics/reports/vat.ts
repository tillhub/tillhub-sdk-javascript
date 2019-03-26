import { Client } from '../../../client'
import { UriHelper } from '../../../uri-helper'
import * as errors from '../../../errors/analytics'

export interface VatOptions {
  user?: string
  base?: string
}

export interface VatResponse {
  data: object[]
  metadata: object
}

export interface VatQuery {
  format?: string
  uri?: string
  legacy?: boolean
}

export interface MetaQuery {
  legacy?: boolean
}

export class Vat {
  http: Client
  public options: VatOptions
  public uriHelper: UriHelper

  constructor(options: VatOptions, http: Client, uriHelper: UriHelper) {
    this.options = options
    this.http = http
    this.uriHelper = uriHelper
  }

  getAll(query?: VatQuery): Promise<VatResponse> {
    return new Promise(async (resolve, reject) => {
      let next
      try {
        const base = this.uriHelper.generateBaseUri('/reports/vat')
        const uri = this.uriHelper.generateUriWithQuery(base, query)
        const response = await this.http.getClient().get(uri)

        if (response.data.cursor && response.data.cursor.next) {
          next = (): Promise<VatResponse> => this.getAll({ uri: response.data.cursor.next })
        }

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count },
          next
        } as VatResponse)
      } catch (err) {
        return reject(new errors.VatReportFetchFailed())
      }
    })
  }

  meta(query?: MetaQuery): Promise<VatResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const base = this.uriHelper.generateBaseUri('/reports/vat/meta')
        const uri = this.uriHelper.generateUriWithQuery(base, query)
        const response = await this.http.getClient().get(uri)

        if (response.status !== 200) {
          return reject(new errors.VatReportFetchMetaFailed(undefined, { status: response.status }))
        }

        if (!response.data.results[0]) {
          return reject(
            new errors.VatReportFetchMetaFailed('Could not get vat metadata unexpectedly')
          )
        }

        return resolve({
          data: response.data.results[0],
          metadata: { count: response.data.count }
        } as VatResponse)
      } catch (err) {
        return reject(new errors.VatReportFetchMetaFailed())
      }
    })
  }
}
