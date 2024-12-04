import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface MeOptions {
  user?: string
  base?: string
}

export interface MeResponse {
  data: Me
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
  errors?: ErrorObject[]
}

export interface Me {
  id: string
  role: string
  scopes: string[]
}

export interface ErrorObject {
  id: string
  label: string
  errorDetails?: Record<string, unknown>
}

export class Me extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/me'
  endpoint: string
  http: Client
  public options: MeOptions
  public uriHelper: UriHelper

  constructor (options: MeOptions, http: Client) {
    super(http, {
      endpoint: Me.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = Me.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async get (clientAccount?: string | null): Promise<MeResponse> {
    const base = this.options.base ?? 'https://api.tillhub.com'
    const uri = `${base}${this.endpoint}`
    try {
      const headers: Record<string, string> = {}

      // Check if clientAccount is provided and not null. Then, add x-client-account header
      if (clientAccount !== undefined && clientAccount !== null) {
        headers['x-client-account'] = clientAccount
      }

      const response = await this.http.getClient().get(uri, { headers })
      if (response.status !== 200) throw new MeFetchFailed(undefined, { status: response.status })

      return {
        data: response.data.results[0] as Me,
        msg: response.data.msg,
        metadata: { count: response.data.count },
        errors: response.data.errors || []
      }
    } catch (error: any) {
      throw new MeFetchFailed(error?.response?.data?.message || error.message, { error })
    }
  }
}

export class MeFetchFailed extends BaseError {
  public name = 'MeFetchFailed'
  constructor (
    public message: string = 'Could not fetch me data',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, MeFetchFailed.prototype)
  }
}
