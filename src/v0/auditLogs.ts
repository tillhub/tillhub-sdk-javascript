import qs from 'qs'
import { Client } from '../client'
import * as errors from '../errors'

export interface AuditsOptions {
  user?: string
  base?: string
}

export interface AuditsQuery {
  type?: string | string[]
  limit?: number
  cursor_field?: string
  embed?: string | string[]
  uri?: string
  branch?: string
  register?: string
  staff?: string
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
  data?: object[]
  metadata?: object
  msg?: string
  next?: () => Promise<AuditsResponse>
}

export class AuditLogs {
  endpoint: string
  http: Client
  public options: AuditsOptions

  constructor(options: AuditsOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v0/audits'
    this.options.base = this.options.base || 'https://api.tillhub.com'
  }

  getAll(q?: AuditsQuery | undefined): Promise<AuditsResponse> {
    return new Promise(async (resolve, reject) => {
      let next
      let uri

      try {
        if (q && q.uri) {
          uri = q.uri
        } else {
          uri = `${this.options.base}${this.endpoint}/${this.options.user}/logs`
        }

        const queryString = qs.stringify(q)
        if (queryString) {
          uri = `${uri}?${queryString}`
        }

        const response = await this.http.getClient().get(uri)

        if (response.data.cursor && response.data.cursor.next) {
          next = (): Promise<AuditsResponse> => this.getAll({ ...q, uri: response.data.cursor.next })
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
      let uri = `${this.options.base}${this.endpoint}/${this.options.user}/logs/meta`

      try {
        const queryString = qs.stringify(q)
        if (queryString) {
          uri = `${uri}?${queryString}`
        }

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
      let uri = `${this.options.base}${this.endpoint}/${this.options.user}/logs/${auditLogId}`

      try {
        const queryString = qs.stringify(query)
        if (queryString) {
          uri = `${uri}?${queryString}`
        }

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
