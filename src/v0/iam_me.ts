
import { Client } from '../client'
import { BaseError } from '../errors/baseError'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface IamMeClassOptions {
  user?: string
  base?: string
}

export interface IamMeResponse {
  data: IamMe
  metadata: Record<string, unknown>
  msg?: string
  errors?: ErrorObject[]
}

export interface ErrorObject {
  id: string
  label: string
  errorDetails: Record<string, unknown>
}

export interface IamMe {
  name?: string
  firstname?: string
  lastname?: string
  display_name?: string
  email?: string
  features?: Record<string, boolean>
  legacy_id?: string
  licenses?: string[]
  role?: string
  scopes?: string[]
  whitelabel?: string
}

export class IamMeClass extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/iam/me'
  endpoint: string
  http: Client
  public options: IamMeClassOptions
  public uriHelper: UriHelper

  constructor (options: IamMeClassOptions, http: Client) {
    super(http, { endpoint: IamMeClass.baseEndpoint, base: options.base ?? 'https://api.tillhub.com' })
    this.options = options
    this.http = http

    this.endpoint = IamMeClass.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async get (tenantId: string): Promise<IamMeResponse> {
    const base = this.uriHelper.generateBaseUri(`/${tenantId}`)
    const uri = this.uriHelper.generateUriWithQuery(base)

    try {
      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) {
        throw new IamMeFetchFailed(undefined, { status: response.status })
      }
      return {
        data: response.data.results[0] as IamMe,
        msg: response.data.msg,
        metadata: { count: response.data.count },
        errors: response.data.errors || []
      }
    } catch (error: any) {
      throw new IamMeFetchFailed(error.message, { error })
    }
  }
}

export class IamMeFetchFailed extends BaseError {
  public name = 'IamMeFetchFailed'
  constructor (
    public message: string = 'Could not fetch iam me',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, IamMeFetchFailed.prototype)
  }
}
