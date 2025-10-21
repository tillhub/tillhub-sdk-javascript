
import { Client } from '../client'
import { BaseError } from '../errors/baseError'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface SaleStreamsOptions {
  user?: string
  base?: string
}

export interface SaleStreamsResponse {
  data: SaleStream[]
}

export interface ErrorObject {
  id: string
  label: string
  errorDetails: Record<string, unknown>
}

export interface SaleStream {
  id?: string
  active?: boolean
  name?: string
  type?: string
  businessUnit?: BusinessUnit
  keyPairIds?: string[]
}

export interface BusinessUnit {
  unzerId?: string
  type?: string
}

export class SaleStreams extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/sales-streams'
  endpoint: string
  http: Client
  public options: SaleStreamsOptions
  public uriHelper: UriHelper

  constructor (options: SaleStreamsOptions, http: Client) {
    super(http, { endpoint: SaleStreams.baseEndpoint, base: options.base ?? 'https://api.tillhub.com' })
    this.options = options
    this.http = http

    this.endpoint = SaleStreams.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getMotoSaleStreams (): Promise<SaleStreamsResponse> {
    const base = this.uriHelper.generateBaseUri()
    const uri = this.uriHelper.generateUriWithQuery(`${base}/moto`)

    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new SaleStreamsFetchFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results as SaleStream[]
      }
    } catch (error: any) {
      throw new SaleStreamsFetchFailed(error.message, { error })
    }
  }
}

export class SaleStreamsFetchFailed extends BaseError {
  public name = 'SaleStreamsFetchFailed'
  constructor (
    public message: string = 'Could not fetch payment products',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, SaleStreamsFetchFailed.prototype)
  }
}
