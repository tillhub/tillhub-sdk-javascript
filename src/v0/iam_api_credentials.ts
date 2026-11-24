import { Client } from '../client'
import { BaseError } from '../errors/baseError'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface IamApiCredentialsOptions {
  user?: string
  base?: string
}

export interface IamApiCredential {
  clientId: string
  createdAt: string | null
  createdBy: string | null
  secretExpiresAt: string | null
  rotatedSecretExpiresAt: string | null
  lastUsedAt: string | null
}

export interface CreatedIamApiCredential {
  clientId: string
  clientSecret: string
  createdAt: string | null
  secretExpiresAt: string | null
}

export interface RotatedIamApiCredentialSecret {
  clientSecret: string
  secretExpiresAt: string | null
  rotatedSecretExpiresAt: string | null
}

export interface IamApiCredentialsResponse {
  data: IamApiCredential[]
  metadata: Record<string, unknown>
}

export interface CreatedIamApiCredentialResponse {
  data: CreatedIamApiCredential
  metadata: Record<string, unknown>
}

export interface RotatedIamApiCredentialSecretResponse {
  data: RotatedIamApiCredentialSecret
  metadata: Record<string, unknown>
}

export class IamApiCredentials extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/iam/api-credentials'
  endpoint: string
  http: Client
  public options: IamApiCredentialsOptions
  public uriHelper: UriHelper

  constructor (options: IamApiCredentialsOptions, http: Client) {
    super(http, { endpoint: IamApiCredentials.baseEndpoint, base: options.base ?? 'https://api.tillhub.com' })
    this.options = options
    this.http = http
    this.endpoint = IamApiCredentials.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (): Promise<IamApiCredentialsResponse> {
    const uri = this.uriHelper.generateBaseUri()

    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new IamApiCredentialsFetchFailed(undefined, { status: response.status })

      return {
        data: response.data.results as IamApiCredential[],
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new IamApiCredentialsFetchFailed(error.message, { error })
    }
  }

  async create (): Promise<CreatedIamApiCredentialResponse> {
    const uri = this.uriHelper.generateBaseUri()

    try {
      const response = await this.http.getClient().post(uri)
      if (![200, 201].includes(response.status)) throw new IamApiCredentialCreateFailed(undefined, { status: response.status })

      return {
        data: response.data.results[0] as CreatedIamApiCredential,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new IamApiCredentialCreateFailed(error.message, { error })
    }
  }

  async rotateSecret (clientId: string): Promise<RotatedIamApiCredentialSecretResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${encodeURIComponent(clientId)}/rotate-secret`)

    try {
      const response = await this.http.getClient().post(uri)
      if (response.status !== 200) throw new IamApiCredentialSecretRotateFailed(undefined, { status: response.status })

      return {
        data: response.data.results[0] as RotatedIamApiCredentialSecret,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new IamApiCredentialSecretRotateFailed(error.message, { error })
    }
  }

  async revokeRotatedSecret (clientId: string): Promise<void> {
    const uri = this.uriHelper.generateBaseUri(`/${encodeURIComponent(clientId)}/rotated-secret`)

    try {
      const response = await this.http.getClient().delete(uri)
      if (response.status !== 204) throw new IamApiCredentialRotatedSecretRevokeFailed(undefined, { status: response.status })
    } catch (error: any) {
      throw new IamApiCredentialRotatedSecretRevokeFailed(error.message, { error })
    }
  }

  async delete (clientId: string): Promise<void> {
    const uri = this.uriHelper.generateBaseUri(`/${encodeURIComponent(clientId)}`)

    try {
      const response = await this.http.getClient().delete(uri)
      if (response.status !== 204) throw new IamApiCredentialDeleteFailed(undefined, { status: response.status })
    } catch (error: any) {
      throw new IamApiCredentialDeleteFailed(error.message, { error })
    }
  }
}

export class IamApiCredentialsFetchFailed extends BaseError {
  public name = 'IamApiCredentialsFetchFailed'
  constructor (public message: string = 'Could not fetch API credentials', properties?: Record<string, unknown>) {
    super(message, properties)
    Object.setPrototypeOf(this, IamApiCredentialsFetchFailed.prototype)
  }
}

export class IamApiCredentialCreateFailed extends BaseError {
  public name = 'IamApiCredentialCreateFailed'
  constructor (public message: string = 'Could not create API credential', properties?: Record<string, unknown>) {
    super(message, properties)
    Object.setPrototypeOf(this, IamApiCredentialCreateFailed.prototype)
  }
}

export class IamApiCredentialSecretRotateFailed extends BaseError {
  public name = 'IamApiCredentialSecretRotateFailed'
  constructor (public message: string = 'Could not rotate API credential secret', properties?: Record<string, unknown>) {
    super(message, properties)
    Object.setPrototypeOf(this, IamApiCredentialSecretRotateFailed.prototype)
  }
}

export class IamApiCredentialRotatedSecretRevokeFailed extends BaseError {
  public name = 'IamApiCredentialRotatedSecretRevokeFailed'
  constructor (public message: string = 'Could not revoke rotated API credential secret', properties?: Record<string, unknown>) {
    super(message, properties)
    Object.setPrototypeOf(this, IamApiCredentialRotatedSecretRevokeFailed.prototype)
  }
}

export class IamApiCredentialDeleteFailed extends BaseError {
  public name = 'IamApiCredentialDeleteFailed'
  constructor (public message: string = 'Could not delete API credential', properties?: Record<string, unknown>) {
    super(message, properties)
    Object.setPrototypeOf(this, IamApiCredentialDeleteFailed.prototype)
  }
}
