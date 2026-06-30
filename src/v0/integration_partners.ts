import { Client } from '../client'
import { BaseError } from '../errors/baseError'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface IntegrationPartnersOptions {
  user?: string
  base?: string
}

export interface IntegrationPartner {
  id: string
  name: string
  displayName: string
  active: boolean
  deletedAt: string | null
}

export interface IntegrationPartnersQuery {
  withDeleted?: boolean
  uri?: string
}

export interface IntegrationPartnersListResponse {
  data: IntegrationPartner[]
  metadata: Record<string, unknown>
  msg?: string
  next?: () => Promise<IntegrationPartnersListResponse>
}

export interface IntegrationPartnerResponse {
  data: IntegrationPartner | null
  metadata: Record<string, unknown>
  msg?: string
}

export interface IntegrationPartnerCreateBody {
  name: string
  displayName: string
  active?: boolean
}

export interface IntegrationPartnerUpdateBody {
  displayName?: string
  active?: boolean
}

export class IntegrationPartners extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/integration-partners'
  endpoint: string
  http: Client
  public options: IntegrationPartnersOptions
  public uriHelper: UriHelper

  constructor (options: IntegrationPartnersOptions, http: Client) {
    super(http, {
      endpoint: IntegrationPartners.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = IntegrationPartners.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  private partnerPath (integrationPartnerId: string): string {
    const id = typeof integrationPartnerId === 'string' ? integrationPartnerId.trim() : ''
    if (!id) {
      throw new IntegrationPartnersFailed(
        'integrationPartnerId is required for integration partner requests',
        {}
      )
    }
    return `/${encodeURIComponent(id)}`
  }

  async getAll (query?: IntegrationPartnersQuery): Promise<IntegrationPartnersListResponse> {
    const base = this.uriHelper.generateBaseUri()
    const uri = this.uriHelper.generateUriWithQuery(base, query)

    try {
      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) {
        throw new IntegrationPartnersFetchFailed(undefined, {
          status: response.status
        })
      }

      const rows = Array.isArray(response.data.results) ? response.data.results : []
      let next: (() => Promise<IntegrationPartnersListResponse>) | undefined

      const cursorNext = response.data?.cursors?.after ?? response.data?.cursor?.next
      if (cursorNext) {
        next = (): Promise<IntegrationPartnersListResponse> =>
          this.getAll({ uri: cursorNext })
      }

      return {
        data: rows as IntegrationPartner[],
        msg: response.data.msg,
        metadata: {
          count: response.data.count ?? rows.length
        },
        next
      }
    } catch (error: any) {
      if (error instanceof IntegrationPartnersFetchFailed) throw error
      throw new IntegrationPartnersFetchFailed(error.message, { error })
    }
  }

  async listAll (query?: Omit<IntegrationPartnersQuery, 'uri'>): Promise<IntegrationPartner[]> {
    const aggregated: IntegrationPartner[] = []
    let page = await this.getAll(query)

    for (const row of page.data) {
      aggregated.push(row)
    }

    while (page.next) {
      page = await page.next()
      for (const row of page.data) {
        aggregated.push(row)
      }
    }

    return aggregated
  }

  async get (integrationPartnerId: string): Promise<IntegrationPartnerResponse> {
    const base = this.uriHelper.generateBaseUri(this.partnerPath(integrationPartnerId))
    const uri = this.uriHelper.generateUriWithQuery(base)

    try {
      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) {
        throw new IntegrationPartnerFetchFailed(undefined, {
          status: response.status
        })
      }

      return {
        data: (response.data.results?.[0] ?? null) as IntegrationPartner | null,
        msg: response.data.msg,
        metadata: {
          count: response.data.count
        }
      }
    } catch (error: any) {
      if (error instanceof IntegrationPartnerFetchFailed) throw error
      throw new IntegrationPartnerFetchFailed(error.message, { error })
    }
  }

  async create (body: IntegrationPartnerCreateBody): Promise<IntegrationPartnerResponse> {
    const base = this.uriHelper.generateBaseUri()
    const uri = this.uriHelper.generateUriWithQuery(base)

    try {
      const response = await this.http.getClient().post(uri, body)

      if (response.status !== 200 && response.status !== 201) {
        throw new IntegrationPartnerCreateFailed(undefined, {
          status: response.status
        })
      }

      return {
        data: (response.data.results?.[0] ?? null) as IntegrationPartner | null,
        msg: response.data.msg,
        metadata: {
          count: response.data.count
        }
      }
    } catch (error: any) {
      if (error instanceof IntegrationPartnerCreateFailed) throw error
      throw new IntegrationPartnerCreateFailed(error.message, { error })
    }
  }

  async update (
    integrationPartnerId: string,
    body: IntegrationPartnerUpdateBody
  ): Promise<IntegrationPartnerResponse> {
    const base = this.uriHelper.generateBaseUri(this.partnerPath(integrationPartnerId))
    const uri = this.uriHelper.generateUriWithQuery(base)

    try {
      const response = await this.http.getClient().patch(uri, body)

      if (response.status !== 200) {
        throw new IntegrationPartnerUpdateFailed(undefined, {
          status: response.status
        })
      }

      return {
        data: (response.data.results?.[0] ?? null) as IntegrationPartner | null,
        msg: response.data.msg,
        metadata: {
          count: response.data.count
        }
      }
    } catch (error: any) {
      if (error instanceof IntegrationPartnerUpdateFailed) throw error
      throw new IntegrationPartnerUpdateFailed(error.message, { error })
    }
  }

  async delete (integrationPartnerId: string): Promise<IntegrationPartnerResponse> {
    const base = this.uriHelper.generateBaseUri(this.partnerPath(integrationPartnerId))
    const uri = this.uriHelper.generateUriWithQuery(base)

    try {
      const response = await this.http.getClient().delete(uri)

      if (response.status !== 200 && response.status !== 204) {
        throw new IntegrationPartnerDeleteFailed(undefined, {
          status: response.status
        })
      }

      return {
        data: (response.data?.results?.[0] ?? null) as IntegrationPartner | null,
        msg: response.data?.msg,
        metadata: {
          count: response.data?.count
        }
      }
    } catch (error: any) {
      if (error instanceof IntegrationPartnerDeleteFailed) throw error
      throw new IntegrationPartnerDeleteFailed(error.message, { error })
    }
  }

  async restore (integrationPartnerId: string): Promise<IntegrationPartnerResponse> {
    const base = this.uriHelper.generateBaseUri(
      `${this.partnerPath(integrationPartnerId)}/restore`
    )
    const uri = this.uriHelper.generateUriWithQuery(base)

    try {
      const response = await this.http.getClient().patch(uri)

      if (response.status !== 200) {
        throw new IntegrationPartnerRestoreFailed(undefined, {
          status: response.status
        })
      }

      return {
        data: (response.data.results?.[0] ?? null) as IntegrationPartner | null,
        msg: response.data.msg,
        metadata: {
          count: response.data.count
        }
      }
    } catch (error: any) {
      if (error instanceof IntegrationPartnerRestoreFailed) throw error
      throw new IntegrationPartnerRestoreFailed(error.message, { error })
    }
  }
}

export class IntegrationPartnersFailed extends BaseError {
  public name = 'IntegrationPartnersFailed'
  constructor (
    public message: string = 'Integration partner request failed',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, IntegrationPartnersFailed.prototype)
  }
}

export class IntegrationPartnersFetchFailed extends BaseError {
  public name = 'IntegrationPartnersFetchFailed'
  constructor (
    public message: string = 'Could not fetch integration partners',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, IntegrationPartnersFetchFailed.prototype)
  }
}

export class IntegrationPartnerFetchFailed extends BaseError {
  public name = 'IntegrationPartnerFetchFailed'
  constructor (
    public message: string = 'Could not fetch integration partner',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, IntegrationPartnerFetchFailed.prototype)
  }
}

export class IntegrationPartnerCreateFailed extends BaseError {
  public name = 'IntegrationPartnerCreateFailed'
  constructor (
    public message: string = 'Could not create integration partner',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, IntegrationPartnerCreateFailed.prototype)
  }
}

export class IntegrationPartnerUpdateFailed extends BaseError {
  public name = 'IntegrationPartnerUpdateFailed'
  constructor (
    public message: string = 'Could not update integration partner',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, IntegrationPartnerUpdateFailed.prototype)
  }
}

export class IntegrationPartnerDeleteFailed extends BaseError {
  public name = 'IntegrationPartnerDeleteFailed'
  constructor (
    public message: string = 'Could not delete integration partner',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, IntegrationPartnerDeleteFailed.prototype)
  }
}

export class IntegrationPartnerRestoreFailed extends BaseError {
  public name = 'IntegrationPartnerRestoreFailed'
  constructor (
    public message: string = 'Could not restore integration partner',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, IntegrationPartnerRestoreFailed.prototype)
  }
}
