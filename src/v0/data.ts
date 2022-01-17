import { Client } from '../client'
import { UriHelper } from '../uri-helper'
import { BaseError } from '../errors'

export interface DataOptions {
  user?: string
  base?: string
}

export interface DataResponse {
  data: Record<string, unknown>
}

export class Data {
  endpoint: string
  http: Client
  public options: DataOptions
  public uriHelper: UriHelper

  constructor (options: DataOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v0/data'
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async replace (dataId: string, payload: FormData): Promise<DataResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${dataId}`)
    try {
      const response = await this.http
        .getClient()
        .put(uri, payload, { timeout: 60000, headers: { 'Content-Type': 'multipart/form-data' } })
      return {
        data: response.data.results
      }
    } catch (error: any) {
      throw new DataReplaceFailed(error.message, { error })
    }
  }

  async create (payload: FormData): Promise<DataResponse> {
    const uri = this.uriHelper.generateBaseUri()
    try {
      const response = await this.http.getClient().post(uri, payload, {
        timeout: 60000,
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      return {
        data: response.data.results
      }
    } catch (error: any) {
      throw new DataCreateFailed(error.message, { error })
    }
  }
}

export class DataCreateFailed extends BaseError {
  public name = 'DataCreateFailed'
  constructor (public message: string = 'Could not create data',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, DataCreateFailed.prototype)
  }
}

export class DataReplaceFailed extends BaseError {
  public name = 'DataReplaceFailed'
  constructor (public message: string = 'Could not replace data',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, DataReplaceFailed.prototype)
  }
}
