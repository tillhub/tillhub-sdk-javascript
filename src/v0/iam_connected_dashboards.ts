
import { Client } from '../client'
import { BaseError } from '../errors/baseError'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface IamConnectedDashboardsOptions {
  user?: string
  base?: string
}

export interface IamConnectedDashboardsResponse {
  data: IamConnectedDashboard[]
  metadata: Record<string, unknown>
  next?: () => Promise<IamConnectedDashboardsResponse>
}

export interface ErrorObject {
  id: string
  label: string
  errorDetails: Record<string, unknown>
}

/**
 * A merchant account the signed-in user is connected to via the MMS hierarchy.
 */
export interface IamConnectedDashboard {
  unzerId: string
  name: string
}

export interface IamConnectedDashboardsQueryHandler {
  limit?: number
  uri?: string
  query?: Record<string, unknown>
  orderFields?: string[] | string
}

export class IamConnectedDashboards extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/iam/connected-dashboards'
  endpoint: string
  http: Client
  public options: IamConnectedDashboardsOptions
  public uriHelper: UriHelper

  constructor (options: IamConnectedDashboardsOptions, http: Client) {
    super(http, { endpoint: IamConnectedDashboards.baseEndpoint, base: options.base ?? 'https://api.tillhub.com' })
    this.options = options
    this.http = http

    this.endpoint = IamConnectedDashboards.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (query?: IamConnectedDashboardsQueryHandler | undefined): Promise<IamConnectedDashboardsResponse> {
    let next
    const base = this.uriHelper.generateBaseUri()
    const uri = this.uriHelper.generateUriWithQuery(base, query)

    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new IamConnectedDashboardsFetchFailed(undefined, { status: response.status })
      }

      if (response.data.cursors?.after) {
        next = (): Promise<IamConnectedDashboardsResponse> =>
          this.getAll({ uri: response.data.cursors.after })
      }

      return {
        data: response.data.results as IamConnectedDashboard[],
        metadata: { cursor: response.data.cursors },
        next
      }
    } catch (error: any) {
      throw new IamConnectedDashboardsFetchFailed(error.message, { error })
    }
  }
}

export class IamConnectedDashboardsFetchFailed extends BaseError {
  public name = 'IamConnectedDashboardsFetchFailed'
  constructor (
    public message: string = 'Could not fetch connected dashboards',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, IamConnectedDashboardsFetchFailed.prototype)
  }
}
