import { ThBaseHandler } from '../base'
import { Client } from '../client'
import { UriHelper } from '../uri-helper'
import { BaseError } from '../errors'

export interface DbBackupsOptions {
  user?: string
  base?: string
}

export interface DbBackup {
  file_name: string
  environment: string
  datetime: string
  zip_name: string
}

export interface DbBackupSignedUrl {
  signed_url: string
  environment: string
  datetime: string
  zip_name: string
}

export interface DbBackupsResponse {
  data: DbBackup[]
  metadata?: {
    count?: number
  }
  msg?: string
}

export interface DbBackupSignedUrlResponse {
  data: DbBackupSignedUrl
  msg?: string
}

export class DbBackups extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/db_backups'
  endpoint: string
  http: Client
  public options: DbBackupsOptions
  public uriHelper: UriHelper

  constructor (options: DbBackupsOptions, http: Client) {
    super(http, {
      endpoint: DbBackups.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = DbBackups.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (): Promise<DbBackupsResponse> {
    try {
      const base = this.uriHelper.generateBaseUri()

      // Since DB backup response might take almost up to 1 min
      // therefore we are overriding the Axios instance default timeout (10 secs) for this specific handler to have NO timeout.
      const response = await this.http.getClient().get(base, { timeout: 0 })
      if (response.status !== 200) {
        throw new DbBackupsFetchFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results,
        msg: response.data.msg,
        metadata: {
          count: response.data.count
        }
      }
    } catch (error: any) {
      throw new DbBackupsFetchFailed(error.message, { error })
    }
  }

  async signedUrl (dbBackupDate: string): Promise<DbBackupSignedUrlResponse> {
    const uri = this.uriHelper.generateBaseUri(`/signed_url/${dbBackupDate}`)
    try {
      // Since DB backup response might take almost up to 1 min
      // therefore we are overriding the Axios instance default timeout (10 secs) for this specific handler to have NO timeout.
      const response = await this.http.getClient().get(uri, { timeout: 0 })
      if (response.status !== 200) {
        throw new DbBackupsSignedUrlFetchFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0] as DbBackupSignedUrl,
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new DbBackupsSignedUrlFetchFailed(error.message, { error })
    }
  }
}

export class DbBackupsFetchFailed extends BaseError {
  public name = 'DbBackupsFetchFailed'

  constructor (
    public message: string = 'Could not fetch backups',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, DbBackupsFetchFailed.prototype)
  }
}

export class DbBackupsSignedUrlFetchFailed extends BaseError {
  public name = 'DbBackupsSignedUrlFetchFailed'

  constructor (
    public message: string = 'Could not fetch signed url for backup',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, DbBackupsSignedUrlFetchFailed.prototype)
  }
}
