
import { Client } from '../client'
import { BaseError } from '../errors/baseError'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface IamUserGroupsOptions {
  user?: string
  base?: string
}

export interface IamUserGroupsResponse {
  data: IamUserGroup[]
  metadata: Record<string, unknown>
  next?: () => Promise<IamUserGroupsResponse>
}

export interface ErrorObject {
  id: string
  label: string
  errorDetails: Record<string, unknown>
}

export interface IamUserGroup {
  id?: string
  name?: string
  path?: string
  parentId?: string
  subGroupCount?: BigInt
  subGroups?: IamUserGroup[]
  attributes?: Record<string, unknown>
  realmRoles?: string[]
  clientRoles?: Record<string, unknown>
  access?: Record<string, boolean>
}

export interface IamUserGroupsQueryHandler {
  limit?: number
  uri?: string
  query?: IamUserGroupsQuery
  orderFields?: string[] | string
}

export interface IamUserGroupsQuery extends IamUserGroup {
  deleted?: boolean
  active?: boolean
  q?: string
}

export class IamUserGroups extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/iam/user-groups'
  endpoint: string
  http: Client
  public options: IamUserGroupsOptions
  public uriHelper: UriHelper

  constructor (options: IamUserGroupsOptions, http: Client) {
    super(http, { endpoint: IamUserGroups.baseEndpoint, base: options.base ?? 'https://api.tillhub.com' })
    this.options = options
    this.http = http

    this.endpoint = IamUserGroups.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (query?: IamUserGroupsQueryHandler | undefined): Promise<IamUserGroupsResponse> {
    let next
    const base = this.uriHelper.generateBaseUri()
    const uri = this.uriHelper.generateUriWithQuery(base, query)

    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new IamUserGroupsFetchFailed(undefined, { status: response.status })
      }

      if (response.data.cursors?.after) {
        next = (): Promise<IamUserGroupsResponse> => this.getAll({ uri: response.data.cursors.after })
      }

      return {
        data: response.data.results as IamUserGroup[],
        metadata: { cursor: response.data.cursors },
        next
      }
    } catch (error: any) {
      throw new IamUserGroupsFetchFailed(error.message, { error })
    }
  }
}

export class IamUserGroupsFetchFailed extends BaseError {
  public name = 'IamUserGroupsFetchFailed'
  constructor (
    public message: string = 'Could not fetch iam user group',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, IamUserGroupsFetchFailed.prototype)
  }
}
