import { Client } from '../client'
import { BaseError } from '../errors/baseError'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface RemoteOrderingApiUsersOptions {
  user?: string
  base?: string
}

export interface ErrorObject {
  id: string
  label: string
  errorDetails: Record<string, unknown>
}

export interface RemoteOrderingServiceAccount {
  id?: string
  createdTimestamp?: number
  username?: string
  email?: string
  enabled?: boolean
  totp?: boolean
  emailVerified?: boolean
  attributes?: {
    integrationPartnerId?: string
    clientAccountId?: string
  }
  groups?: string[]
}

export interface RemoteOrderingApiUsersListResponse {
  data: RemoteOrderingServiceAccount[]
  metadata: Record<string, unknown>
  msg?: string
  errors?: ErrorObject[]
}

export interface RemoteOrderingApiUserMutationResponse {
  data: RemoteOrderingServiceAccount | null
  metadata: Record<string, unknown>
  msg?: string
  errors?: ErrorObject[]
}

export interface RemoteOrderingApiUserCreatePayload {
  password: string
  integrationPartnerId: string
}

export class RemoteOrderingApiUsers extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/remote-ordering-inner'
  endpoint: string
  http: Client
  public options: RemoteOrderingApiUsersOptions
  public uriHelper: UriHelper

  constructor (options: RemoteOrderingApiUsersOptions, http: Client) {
    super(http, {
      endpoint: RemoteOrderingApiUsers.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = RemoteOrderingApiUsers.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async get (): Promise<RemoteOrderingApiUsersListResponse> {
    const base = this.uriHelper.generateBaseUri('/service-accounts')
    const uri = this.uriHelper.generateUriWithQuery(base)

    try {
      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) {
        throw new RemoteOrderingApiUserFetchFailed(undefined, {
          status: response.status
        })
      }
      const rows = Array.isArray(response.data.results) ? response.data.results : []

      return {
        data: rows as RemoteOrderingServiceAccount[],
        msg: response.data.msg,
        metadata: {
          count: response.data.count ?? rows.length
        }
      }
    } catch (error: any) {
      if (error instanceof RemoteOrderingApiUserFetchFailed) throw error
      throw new RemoteOrderingApiUserFetchFailed(error.message, { error })
    }
  }

  async create (
    payload: RemoteOrderingApiUserCreatePayload
  ): Promise<RemoteOrderingApiUserMutationResponse> {
    const base = this.uriHelper.generateBaseUri('/service-accounts')
    const uri = this.uriHelper.generateUriWithQuery(base)
    const body = {
      integrationPartnerId: payload.integrationPartnerId,
      password: payload.password
    }

    try {
      const response = await this.http.getClient().post(uri, body)

      if (response.status !== 200 && response.status !== 201) {
        throw new RemoteOrderingApiUserCreateFailed(undefined, {
          status: response.status
        })
      }
      const row = response.data.results?.[0] as RemoteOrderingServiceAccount | undefined

      return {
        data: row ?? null,
        msg: response.data.msg,
        metadata: {
          count: response.data.count ?? response.data.results?.length
        }
      }
    } catch (error: any) {
      if (error instanceof RemoteOrderingApiUserCreateFailed) throw error
      throw new RemoteOrderingApiUserCreateFailed(error.message, { error })
    }
  }

  async delete (serviceAccountId: string): Promise<RemoteOrderingApiUserMutationResponse> {
    const id = typeof serviceAccountId === 'string' ? serviceAccountId.trim() : ''
    if (!id) {
      throw new RemoteOrderingApiUserDeleteFailed(
        'serviceAccountId is required to delete a remote ordering API user',
        {}
      )
    }

    const base = this.uriHelper.generateBaseUri('/service-accounts')
    const uri = this.uriHelper.generateUriWithQuery(`${base}/${encodeURIComponent(id)}`)

    try {
      const response = await this.http.getClient().delete(uri)

      if (response.status !== 200 && response.status !== 204) {
        throw new RemoteOrderingApiUserDeleteFailed(undefined, {
          status: response.status
        })
      }

      const row = response.data?.results?.[0] as RemoteOrderingServiceAccount | undefined

      return {
        data: row ?? null,
        msg: response.data?.msg,
        metadata: {
          count: response.data?.count
        }
      }
    } catch (error: any) {
      if (error instanceof RemoteOrderingApiUserDeleteFailed) throw error
      throw new RemoteOrderingApiUserDeleteFailed(error.message, { error })
    }
  }
}

export class RemoteOrderingApiUserFetchFailed extends BaseError {
  public name = 'RemoteOrderingApiUserFetchFailed'
  constructor (
    public message: string = 'Could not fetch remote ordering API user',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, RemoteOrderingApiUserFetchFailed.prototype)
  }
}

export class RemoteOrderingApiUserCreateFailed extends BaseError {
  public name = 'RemoteOrderingApiUserCreateFailed'
  constructor (
    public message: string = 'Could not create remote ordering API user',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, RemoteOrderingApiUserCreateFailed.prototype)
  }
}

export class RemoteOrderingApiUserUpdateFailed extends BaseError {
  public name = 'RemoteOrderingApiUserUpdateFailed'
  constructor (
    public message: string = 'Could not update remote ordering API user',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, RemoteOrderingApiUserUpdateFailed.prototype)
  }
}

export class RemoteOrderingApiUserDeleteFailed extends BaseError {
  public name = 'RemoteOrderingApiUserDeleteFailed'
  constructor (
    public message: string = 'Could not delete remote ordering API user',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, RemoteOrderingApiUserDeleteFailed.prototype)
  }
}
