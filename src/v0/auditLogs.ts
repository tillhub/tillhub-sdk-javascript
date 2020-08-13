import { Client } from '../client'
import * as errors from '../errors'
import { UriHelper } from '../uri-helper'

export interface AuditsOptions {
  user?: string
  base?: string
}

export interface AuditsQuery {
  type?: string | string[]
  limit?: number
  cursor_field?: string
  uri?: string
  start?: string
  end?: string
}

export interface AuditsMetaQuery {
  type?: string | string[]
}

export interface AuditLogsGetOneRequestObject {
  auditLogId: string
  query?: AuditsQuery
}

export interface AuditsResponse {
  data?: Record<string, unknown>[]
  metadata?: Record<string, unknown>
  msg?: string
  next?: () => Promise<AuditsResponse>
}

export class AuditLogs {
  endpoint: string
  http: Client
  public options: AuditsOptions
  public uriHelper: UriHelper

  constructor(options: AuditsOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v0/audits'
    this.options.base = this.options.base || 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  getAll(q?: AuditsQuery | undefined): Promise<AuditsResponse> {
    return new Promise(async (resolve, reject) => {
      let next

      try {
        const base = this.uriHelper.generateBaseUri('/logs')
        const uri = this.uriHelper.generateUriWithQuery(base, q)

        const response = await this.http.getClient().get(uri)

        if (response.data.cursor && response.data.cursor.next) {
          next = (): Promise<AuditsResponse> =>
            this.getAll({ ...q, uri: response.data.cursor.next })
        }

        return resolve({
          data: response.data.results,
          metadata: { cursor: response.data.cursor },
          next
        } as AuditsResponse)
      } catch (err) {
        return reject(new errors.AuditLogsFetchAllFailed())
      }
    })
  }

  meta(q?: AuditsMetaQuery | undefined): Promise<AuditsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const base = this.uriHelper.generateBaseUri('/logs/meta')
        const uri = this.uriHelper.generateUriWithQuery(base, q)

        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) reject(new errors.AuditLogsGetMetaFailed())

        return resolve({
          data: response.data.results[0],
          metadata: { count: response.data.count }
        } as AuditsResponse)
      } catch (err) {
        return reject(new errors.AuditLogsGetMetaFailed())
      }
    })
  }

  get(requestObject: AuditLogsGetOneRequestObject): Promise<AuditsResponse> {
    return new Promise(async (resolve, reject) => {
      const { auditLogId, query } = requestObject

      try {
        const base = this.uriHelper.generateBaseUri(`/logs/${auditLogId}`)
        const uri = this.uriHelper.generateUriWithQuery(base, query)

        const response = await this.http.getClient().get(uri)

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as AuditsResponse)
      } catch (err) {
        return reject(new errors.AuditLogsFetchOneFailed())
      }
    })
  }
}
