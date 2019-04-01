import qs from 'qs'
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
  next?: () => Promise<AuditsResponse>
}

export interface AuditsTypesQuery {
  delegated?: boolean
}

export class AuditActions {
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
      let uri

      try {
        const base = this.uriHelper.generateBaseUri('/actions')
        const uri = this.uriHelper.generateUriWithQuery(base, q)

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
        return reject(new errors.AuditActionsFetchAllFailed())
      }
    })
  }

  meta(q?: AuditsMetaQuery | undefined): Promise<AuditsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const base = this.uriHelper.generateBaseUri('/actions/meta')
        const uri = this.uriHelper.generateUriWithQuery(base, q)

        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) reject(new errors.AuditActionsGetMetaFailed())

        return resolve({
          data: response.data.results[0],
          metadata: { count: response.data.count }
        } as AuditsResponse)
      } catch (err) {
        return reject(new errors.AuditActionsGetMetaFailed())
      }
    })
  }

  get(requestObject: AuditActionsGetOneRequestObject): Promise<AuditsResponse> {
    return new Promise(async (resolve, reject) => {
      const { auditActionId, query } = requestObject

      try {
        const base = this.uriHelper.generateBaseUri(`/actions/${auditActionId}`)
        const uri = this.uriHelper.generateUriWithQuery(base, query)

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

  create(body: AuditActionsCreateBody): Promise<AuditsResponse> {
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

  getTypes(query: AuditsTypesQuery): Promise<AuditsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const base = this.uriHelper.generateBaseUri(`/actions/types`)
        const uri = this.uriHelper.generateUriWithQuery(base, query)

        const response = await this.http.getClient().get(uri)

        return resolve({
          data: response.data.results
        } as AuditsResponse)
      } catch (err) {
        return reject(new errors.AuditActionsTypesFetchFailed())
      }
    })
  }
}
