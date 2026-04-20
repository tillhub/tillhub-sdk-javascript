import { Client } from '../client'
import { BaseError } from '../errors/baseError'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface RemoteOrderingServiceAccountConfigsOptions {
  user?: string
  base?: string
}

export interface RemoteOrderingServiceAccountConfig {
  id: string
  serviceAccountId: string
  locationId: string
  registerId: string
}

export interface RemoteOrderingServiceAccountConfigBody {
  locationId: string
  registerId: string
}

export interface RemoteOrderingServiceAccountConfigsListResponse {
  data: RemoteOrderingServiceAccountConfig[]
  metadata: Record<string, unknown>
  msg?: string
  next?: () => Promise<RemoteOrderingServiceAccountConfigsListResponse>
}

export interface RemoteOrderingServiceAccountConfigMutationResponse {
  data: RemoteOrderingServiceAccountConfig | { success: boolean } | null
  metadata: Record<string, unknown>
  msg?: string
}

export class RemoteOrderingServiceAccountConfigs extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/remote-ordering-inner'
  endpoint: string
  http: Client
  public options: RemoteOrderingServiceAccountConfigsOptions
  public uriHelper: UriHelper

  constructor (options: RemoteOrderingServiceAccountConfigsOptions, http: Client) {
    super(http, {
      endpoint: RemoteOrderingServiceAccountConfigs.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = RemoteOrderingServiceAccountConfigs.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  private basePath (serviceAccountId: string): string {
    const id = typeof serviceAccountId === 'string' ? serviceAccountId.trim() : ''
    if (!id) {
      throw new RemoteOrderingServiceAccountConfigsFailed(
        'serviceAccountId is required for service account configuration requests',
        {}
      )
    }
    return `/service-accounts-configuration/${encodeURIComponent(id)}`
  }

  async list (
    serviceAccountId: string,
    query?: { limit?: number, uri?: string }
  ): Promise<RemoteOrderingServiceAccountConfigsListResponse> {
    const base = this.uriHelper.generateBaseUri(this.basePath(serviceAccountId))
    const uri = this.uriHelper.generateUriWithQuery(base, query)

    try {
      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) {
        throw new RemoteOrderingServiceAccountConfigsFailed(undefined, {
          status: response.status
        })
      }

      const rows = Array.isArray(response.data.results) ? response.data.results : []
      let next: (() => Promise<RemoteOrderingServiceAccountConfigsListResponse>) | undefined

      const cursorNext = response.data?.cursors?.after ?? response.data?.cursor?.next
      if (cursorNext) {
        next = (): Promise<RemoteOrderingServiceAccountConfigsListResponse> =>
          this.list(serviceAccountId, { uri: cursorNext })
      }

      return {
        data: rows as RemoteOrderingServiceAccountConfig[],
        msg: response.data.msg,
        metadata: {
          count: response.data.count ?? rows.length
        },
        next
      }
    } catch (error: any) {
      if (error instanceof RemoteOrderingServiceAccountConfigsFailed) throw error
      throw new RemoteOrderingServiceAccountConfigsFailed(error.message, { error })
    }
  }

  async listAll (serviceAccountId: string): Promise<RemoteOrderingServiceAccountConfig[]> {
    const aggregated: RemoteOrderingServiceAccountConfig[] = []
    let page = await this.list(serviceAccountId)
    aggregated.push(...page.data)
    while (page.next) {
      page = await page.next()
      aggregated.push(...page.data)
    }
    return aggregated
  }

  async create (
    serviceAccountId: string,
    body: RemoteOrderingServiceAccountConfigBody
  ): Promise<RemoteOrderingServiceAccountConfigMutationResponse> {
    const base = this.uriHelper.generateBaseUri(this.basePath(serviceAccountId))
    const uri = this.uriHelper.generateUriWithQuery(base)

    try {
      const response = await this.http.getClient().post(uri, body)

      if (response.status !== 200 && response.status !== 201) {
        throw new RemoteOrderingServiceAccountConfigsFailed(undefined, {
          status: response.status
        })
      }

      return {
        data: response.data.results?.[0] ?? { success: true },
        msg: response.data.msg,
        metadata: {
          count: response.data.count
        }
      }
    } catch (error: any) {
      if (error instanceof RemoteOrderingServiceAccountConfigsFailed) throw error
      throw new RemoteOrderingServiceAccountConfigsFailed(error.message, { error })
    }
  }

  async update (
    serviceAccountId: string,
    configurationId: string,
    body: RemoteOrderingServiceAccountConfigBody
  ): Promise<RemoteOrderingServiceAccountConfigMutationResponse> {
    const saId = typeof serviceAccountId === 'string' ? serviceAccountId.trim() : ''
    const cfgId = typeof configurationId === 'string' ? configurationId.trim() : ''
    if (!cfgId) {
      throw new RemoteOrderingServiceAccountConfigsFailed(
        'configurationId is required to update a service account configuration',
        {}
      )
    }
    const base = this.uriHelper.generateBaseUri(
      `${this.basePath(saId)}/configuration/${encodeURIComponent(cfgId)}`
    )
    const uri = this.uriHelper.generateUriWithQuery(base)

    try {
      const response = await this.http.getClient().put(uri, body)

      if (response.status !== 200) {
        throw new RemoteOrderingServiceAccountConfigsFailed(undefined, {
          status: response.status
        })
      }

      return {
        data: response.data.results?.[0] ?? { success: true },
        msg: response.data.msg,
        metadata: {
          count: response.data.count
        }
      }
    } catch (error: any) {
      if (error instanceof RemoteOrderingServiceAccountConfigsFailed) throw error
      throw new RemoteOrderingServiceAccountConfigsFailed(error.message, { error })
    }
  }

  async delete (serviceAccountId: string, configurationId: string): Promise<RemoteOrderingServiceAccountConfigMutationResponse> {
    const saId = typeof serviceAccountId === 'string' ? serviceAccountId.trim() : ''
    const cfgId = typeof configurationId === 'string' ? configurationId.trim() : ''
    if (!cfgId) {
      throw new RemoteOrderingServiceAccountConfigsFailed(
        'configurationId is required to delete a service account configuration',
        {}
      )
    }
    const base = this.uriHelper.generateBaseUri(
      `${this.basePath(saId)}/configuration/${encodeURIComponent(cfgId)}`
    )
    const uri = this.uriHelper.generateUriWithQuery(base)

    try {
      const response = await this.http.getClient().delete(uri)

      if (response.status !== 200 && response.status !== 204) {
        throw new RemoteOrderingServiceAccountConfigsFailed(undefined, {
          status: response.status
        })
      }

      return {
        data: response.data?.results?.[0] ?? { success: true },
        msg: response.data?.msg,
        metadata: {
          count: response.data?.count
        }
      }
    } catch (error: any) {
      if (error instanceof RemoteOrderingServiceAccountConfigsFailed) throw error
      throw new RemoteOrderingServiceAccountConfigsFailed(error.message, { error })
    }
  }
}

export class RemoteOrderingServiceAccountConfigsFailed extends BaseError {
  public name = 'RemoteOrderingServiceAccountConfigsFailed'
  constructor (
    public message: string = 'Remote ordering service account configuration request failed',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, RemoteOrderingServiceAccountConfigsFailed.prototype)
  }
}
