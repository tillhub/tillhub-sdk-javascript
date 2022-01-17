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
  actions: Array<Record<string, unknown>>
}

export interface AuditsResponse {
  data?: Array<Record<string, unknown>>
  metadata?: Record<string, unknown>
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
      const base = this.uriHelper.generateBaseUri('/actions')
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
    } catch (error: any) {
      throw new errors.AuditActionsFetchAllFailed(error.message, { error })
    }
  }

  async meta (q?: AuditsMetaQuery | undefined): Promise<AuditsResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/actions/meta')
      const uri = this.uriHelper.generateUriWithQuery(base, q)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new errors.AuditActionsGetMetaFailed()

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.AuditActionsGetMetaFailed(error.message, { error })
    }
  }

  async get (requestObject: AuditActionsGetOneRequestObject): Promise<AuditsResponse> {
    const { auditActionId, query } = requestObject

    try {
      const base = this.uriHelper.generateBaseUri(`/actions/${auditActionId}`)
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.AuditActionsFetchOneFailed(error.message, { error })
    }
  }

  async create (body: AuditActionsCreateBody): Promise<AuditsResponse> {
    const uri = this.uriHelper.generateBaseUri('/actions')

    try {
      const response = await this.http.getClient().post(uri, body)

      return {
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new errors.AuditActionsCreateFailed(error.message, { error })
    }
  }

  async getTypes (query: AuditsTypesQuery): Promise<AuditsResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/actions/types')
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)

      return {
        data: response.data.results
      }
    } catch (error: any) {
      throw new errors.AuditActionsTypesFetchFailed(error.message, { error })
    }
  }
}
