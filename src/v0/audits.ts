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
  offset?: number
  order_by?: string
  order_direction?: string
  embed?: string | string[]
  uri?: string
}

export interface AuditsMetaQuery {
  type?: string | string[]
}

export interface AuditActionsGetOneRequestObject {
  auditActionId: string
  query?: AuditsQuery
}

export interface AuditActionsCreateBody {
  actions: object[]
}

export interface AuditsResponse {
  data?: object[]
  metadata?: object
  msg?: string
}

export class Audits {
  endpoint: string
  http: Client
  public options: AuditsOptions

  constructor(options: AuditsOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v0/audits'
    this.options.base = this.options.base || 'https://api.tillhub.com'
  }

  getAllActions(q?: AuditsQuery | undefined): Promise<AuditsResponse> {
    return new Promise(async (resolve, reject) => {
      let uri

      try {
        if (q && q.uri) {
          uri = q.uri
        } else {
          uri = `${this.options.base}${this.endpoint}/${this.options.user}/actions`
        }

        const queryString = qs.stringify(q)
        if (queryString) {
          uri = `${uri}?${queryString}`
        }

        const response = await this.http.getClient().get(uri)

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as AuditsResponse)
      } catch (err) {
        return reject(new errors.AuditActionsFetchAllFailed())
      }
    })
  }

  getActionsMeta(q?: AuditsMetaQuery | undefined): Promise<AuditsResponse> {
    return new Promise(async (resolve, reject) => {
      let uri = `${this.options.base}${this.endpoint}/${this.options.user}/actions/meta`

      try {
        const queryString = qs.stringify(q)
        if (queryString) {
          uri = `${uri}?${queryString}`
        }

        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) reject(new errors.AuditActionsGetMetaFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as AuditsResponse)
      } catch (err) {
        return reject(new errors.AuditActionsGetMetaFailed())
      }
    })
  }

  getOneAction(requestObject: AuditActionsGetOneRequestObject): Promise<AuditsResponse> {
    return new Promise(async (resolve, reject) => {
      const { auditActionId, query } = requestObject
      let uri = `${this.options.base}${this.endpoint}/${this.options.user}/actions/${auditActionId}`

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
        return reject(new errors.AuditActionsFetchOneFailed())
      }
    })
  }

  createAction(body: AuditActionsCreateBody): Promise<AuditsResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/actions`

      try {
        const response = await this.http.getClient().post(uri, body)

        return resolve({
          msg: response.data.msg
        } as AuditsResponse)
      } catch (err) {
        return reject(new errors.AuditActionsCreateFailed())
      }
    })
  }
}
