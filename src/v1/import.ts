import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface ImportOptions {
  user?: string
  base?: string
}

export interface ImportChunksBody {
  correlationId: string
  isDone: boolean
  index: number
  type: string
  chunk: Array<Record<string, unknown>>
}

export interface ImportChunksResponse {
  data: Array<Record<string, unknown>>
  msg: string
}

export class Import extends ThBaseHandler {
  public static baseEndpoint = '/api/v1/import'
  endpoint: string
  http: Client
  public options: ImportOptions
  public uriHelper: UriHelper

  constructor (options: ImportOptions, http: Client) {
    super(http, {
      endpoint: Import.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = Import.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async chunks (body: ImportChunksBody): Promise<ImportChunksResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri('/chunks')

      const response = await this.http.getClient().post(uri, body)

      return {
        data: response.data.results,
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new ImportChunksFailed(error.message)
    }
  }
}

export class ImportChunksFailed extends BaseError {
  public name = 'ImportChunksFailed'
  constructor (
    public message: string = 'Could not import chunk',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ImportChunksFailed.prototype)
  }
}
