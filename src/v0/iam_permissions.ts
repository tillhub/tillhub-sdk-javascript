
import { Client } from '../client'
import { BaseError } from '../errors/baseError'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface IamPermissionsOptions {
  user?: string
  base?: string
}

export interface IamPermissionsResponse {
  data: IamPermission[]
  metadata: Record<string, unknown>
  next?: () => Promise<IamPermissionsResponse>
}

export interface ErrorObject {
  id: string
  label: string
  errorDetails: Record<string, unknown>
}

export interface IamPermission {
  scope?: string
  name?: string
  require2fa?: boolean
}

export interface IamPermissionsQueryHandler {
  limit?: number
  uri?: string
  query?: IamPermissionsQuery
  orderFields?: string[] | string
}

export interface IamPermissionsQuery extends IamPermission {
  deleted?: boolean
  active?: boolean
  q?: string
}

export class IamPermissions extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/iam/permissions'
  endpoint: string
  http: Client
  public options: IamPermissionsOptions
  public uriHelper: UriHelper

  constructor (options: IamPermissionsOptions, http: Client) {
    super(http, { endpoint: IamPermissions.baseEndpoint, base: options.base ?? 'https://api.tillhub.com' })
    this.options = options
    this.http = http

    this.endpoint = IamPermissions.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (query?: IamPermissionsQueryHandler | undefined): Promise<IamPermissionsResponse> {
    let next
    const base = this.uriHelper.generateBaseUri()
    const uri = this.uriHelper.generateUriWithQuery(base, query)

    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new IamPermissionsFetchFailed(undefined, { status: response.status })
      }

      if (response.data.cursors?.after) {
        next = (): Promise<IamPermissionsResponse> => this.getAll({ uri: response.data.cursors.after })
      }

      return {
        data: response.data.results as IamPermission[],
        metadata: { cursor: response.data.cursors },
        next
      }
    } catch (error: any) {
      throw new IamPermissionsFetchFailed(error.message, { error })
    }
  }
}

export class IamPermissionsFetchFailed extends BaseError {
  public name = 'IamPermissionsFetchFailed'
  constructor (
    public message: string = 'Could not fetch iam permissions',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, IamPermissionsFetchFailed.prototype)
  }
}
