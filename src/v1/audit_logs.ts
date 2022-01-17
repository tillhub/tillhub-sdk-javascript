import { Client } from '../client'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'
import { AuditsOptions, AuditsQuery, AuditsResponse, AuditLogsFetchAllFailed } from '../v0/audit_logs'

export class AuditLogs extends ThBaseHandler {
  public static baseEndpoint = '/api/v1/audits'
  endpoint: string
  http: Client
  public options: AuditsOptions
  public uriHelper: UriHelper

  constructor (options: AuditsOptions, http: Client) {
    super(http, {
      endpoint: AuditLogs.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = AuditLogs.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (query?: AuditsQuery | undefined): Promise<AuditsResponse> {
    let next

    try {
      const base = this.uriHelper.generateBaseUri('/logs')
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)

      if (response.data.cursor?.next) {
        next = (): Promise<AuditsResponse> =>
          this.getAll({ uri: response.data.cursor.next })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count, cursor: response.data.cursor },
        next
      }
    } catch (error: any) {
      throw new AuditLogsFetchAllFailed(error.message, { error })
    }
  }
}
