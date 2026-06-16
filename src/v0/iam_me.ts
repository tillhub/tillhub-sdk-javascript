
import { Client } from '../client'
import { BaseError } from '../errors/baseError'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'
import { IamUser, IamUserResponse } from './iam_users'

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
  // MMS: { [unzerId]: roleId[] } — the dashboards this user can access.
  connectedDashboards?: Record<string, string[]>
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
    // We dont need to pass the legacyId with the base URL.
    const base = this.options.base ?? 'https://api.tillhub.com'
    const uri = `${base}${this.endpoint}/${tenantId}`

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

  async setup2faActionMe (tenantId: string): Promise<IamUserResponse> {
    const base = this.options.base ?? 'https://api.tillhub.com'
    const uri = `${base}${this.endpoint}/${tenantId}/reset-2fa`

    try {
      const response = await this.http.getClient().post(uri)

      if (response.status !== 200) {
        throw new IamMeSetup2faActionFailed(undefined, { status: response.status })
      }
      return {
        data: response.data.results[0] as IamUser,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new IamMeSetup2faActionFailed(error.message, { error })
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
export class IamMeBackupCodes2faFailed extends BaseError {
  public name = 'IamMeBackupCodes2faFailed'
  constructor (
    public message: string = 'Could not verify 2fa for backup codes',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, IamMeBackupCodes2faFailed.prototype)
  }
}
export class IamMeSetup2faActionFailed extends BaseError {
  public name = 'IamMeSetup2faActionFailed'
  constructor (
    public message: string = 'Could not setup 2fa action',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, IamMeSetup2faActionFailed.prototype)
  }
}
