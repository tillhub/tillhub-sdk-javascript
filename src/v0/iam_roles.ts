
import { Client } from '../client'
import { BaseError } from '../errors/baseError'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface IamRolesOptions {
  user?: string
  base?: string
}

export interface IamRolesResponse {
  data: IamRole[]
  metadata: Record<string, unknown>
  next?: () => Promise<IamRolesResponse>
}

export interface ErrorObject {
  id: string
  label: string
  errorDetails: Record<string, unknown>
}

export interface IamRole {
  permissions?: string[]
}

export interface IamRolesQueryHandler {
  limit?: number
  uri?: string
  query?: IamRolesQuery
  orderFields?: string[] | string
}

export interface IamRolesQuery extends IamRole {
  deleted?: boolean
  active?: boolean
  q?: string
}

export class IamRoles extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/iam/roles'
  endpoint: string
  http: Client
  public options: IamRolesOptions
  public uriHelper: UriHelper

  constructor (options: IamRolesOptions, http: Client) {
    super(http, { endpoint: IamRoles.baseEndpoint, base: options.base ?? 'https://api.tillhub.com' })
    this.options = options
    this.http = http

    this.endpoint = IamRoles.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (query?: IamRolesQueryHandler | undefined): Promise<IamRolesResponse> {
    let next
    const base = this.uriHelper.generateBaseUri()
    const uri = this.uriHelper.generateUriWithQuery(base, query)

    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new IamRolesFetchFailed(undefined, { status: response.status })
      }

      if (response.data.cursors?.after) {
        next = (): Promise<IamRolesResponse> => this.getAll({ uri: response.data.cursors.after })
      }

      return {
        data: response.data.results as IamRole[],
        metadata: { cursor: response.data.cursors },
        next
      }
    } catch (error: any) {
      throw new IamRolesFetchFailed(error.message, { error })
    }
  }
}

export class IamRolesFetchFailed extends BaseError {
  public name = 'IamRolesFetchFailed'
  constructor (
    public message: string = 'Could not fetch iam roles',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, IamRolesFetchFailed.prototype)
  }
}
