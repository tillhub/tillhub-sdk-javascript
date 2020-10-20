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
  data?: Array<Record<string, unknown>>
  metadata?: Record<string, unknown>
  msg?: string
  next?: () => Promise<AuditsResponse>
}

export class AuditLogs {
  endpoint: string
  http: Client
  public options: AuditsOptions
  public uriHelper: UriHelper

  constructor (options: AuditsOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v0/audits'
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (q?: AuditsQuery | undefined): Promise<AuditsResponse> {
    let next

    try {
      const base = this.uriHelper.generateBaseUri('/logs')
      const uri = this.uriHelper.generateUriWithQuery(base, q)

      const response = await this.http.getClient().get(uri)

      if (response.data.cursor?.next) {
        next = (): Promise<AuditsResponse> =>
          this.getAll({ ...q, uri: response.data.cursor.next })
      }

      return {
        data: response.data.results,
        metadata: { cursor: response.data.cursor },
        next
      }
    } catch (err) {
      throw new errors.AuditLogsFetchAllFailed()
    }
  }

  async meta (q?: AuditsMetaQuery | undefined): Promise<AuditsResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/logs/meta')
      const uri = this.uriHelper.generateUriWithQuery(base, q)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new errors.AuditLogsGetMetaFailed()

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (err) {
      throw new errors.AuditLogsGetMetaFailed()
    }
  }

  async get (requestObject: AuditLogsGetOneRequestObject): Promise<AuditsResponse> {
    const { auditLogId, query } = requestObject

    try {
      const base = this.uriHelper.generateBaseUri(`/logs/${auditLogId}`)
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (err) {
      throw new errors.AuditLogsFetchOneFailed()
    }
  }
}
