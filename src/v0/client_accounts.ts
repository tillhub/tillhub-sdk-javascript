
import { Client } from '../client'
import { BaseError } from '../errors/baseError'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface ClientAccountsOptions {
  user?: string
  base?: string
}

/** MMS: display details for a connected dashboard. */
export interface ConnectedDashboardDetails {
  name: string | null
}

/**
 * MMS connections for a client account: the dashboards it is connected to, the
 * roles available on each, and their display names.
 */
export interface ClientAccountConnections {
  // { [unzerId]: roleId[] } — the roles available on each connected dashboard.
  connectedDashboards: Record<string, string[]>
  // The unzerIds of the connected dashboards.
  connectedDashboardsList: string[]
  // { [unzerId]: { name } } — display names for the connected dashboards.
  connectedDashboardsDetails: Record<string, ConnectedDashboardDetails>
}

export interface ClientAccountConnectionsResponse {
  data: ClientAccountConnections
  metadata: Record<string, unknown>
  msg?: string
}

export class ClientAccounts extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/client_accounts'
  endpoint: string
  http: Client
  public options: ClientAccountsOptions
  public uriHelper: UriHelper

  constructor (options: ClientAccountsOptions, http: Client) {
    super(http, { endpoint: ClientAccounts.baseEndpoint, base: options.base ?? 'https://api.tillhub.com' })
    this.options = options
    this.http = http

    this.endpoint = ClientAccounts.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  /**
   * Fetch a client account's MMS connections — the dashboards it is connected to,
   * with the roles available on each and their display names.
   *
   * @param clientAccountId the client account UUID
   */
  async getConnections (clientAccountId: string): Promise<ClientAccountConnectionsResponse> {
    const base = this.options.base ?? 'https://api.tillhub.com'
    const uri = `${base}${this.endpoint}/${clientAccountId}/connections`

    try {
      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) {
        throw new ClientAccountConnectionsFetchFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0] as ClientAccountConnections,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new ClientAccountConnectionsFetchFailed(error.message, { error })
    }
  }
}

export class ClientAccountConnectionsFetchFailed extends BaseError {
  public name = 'ClientAccountConnectionsFetchFailed'
  constructor (
    public message: string = 'Could not fetch client account connections',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ClientAccountConnectionsFetchFailed.prototype)
  }
}
