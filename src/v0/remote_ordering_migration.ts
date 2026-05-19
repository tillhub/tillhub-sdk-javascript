import { Client } from '../client'
import { BaseError } from '../errors/baseError'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface RemoteOrderingMigrationOptions {
  user?: string
  base?: string
}

export interface RemoteOrderingMigrationProgress {
  started: boolean
  finished: boolean
  progress: number | null
  startedAt: string | null
  lastUpdatedAt: string | null
}

export interface RemoteOrderingMigrationProgressResponse {
  data: RemoteOrderingMigrationProgress | null
  metadata: Record<string, unknown>
  msg?: string
}

export class RemoteOrderingMigration extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/remote-ordering-inner'
  endpoint: string
  http: Client
  public options: RemoteOrderingMigrationOptions
  public uriHelper: UriHelper

  constructor (options: RemoteOrderingMigrationOptions, http: Client) {
    super(http, {
      endpoint: RemoteOrderingMigration.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = RemoteOrderingMigration.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getProgress (): Promise<RemoteOrderingMigrationProgressResponse> {
    const base = this.uriHelper.generateBaseUri('/data-migration-progress')
    const uri = this.uriHelper.generateUriWithQuery(base)

    try {
      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) {
        throw new RemoteOrderingMigrationProgressFetchFailed(undefined, {
          status: response.status
        })
      }

      const row = response.data.results?.[0] as RemoteOrderingMigrationProgress | undefined

      return {
        data: row ?? null,
        msg: response.data.msg,
        metadata: {
          count: response.data.count ?? response.data.results?.length
        }
      }
    } catch (error: any) {
      if (error instanceof RemoteOrderingMigrationProgressFetchFailed) throw error
      throw new RemoteOrderingMigrationProgressFetchFailed(error.message, { error })
    }
  }
}

export class RemoteOrderingMigrationProgressFetchFailed extends BaseError {
  public name = 'RemoteOrderingMigrationProgressFetchFailed'
  constructor (
    public message: string = 'Could not fetch remote ordering migration progress',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, RemoteOrderingMigrationProgressFetchFailed.prototype)
  }
}
