
import { Client } from '../client'
import { BaseError } from '../errors/baseError'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface IamApiKeysOptions {
  user?: string
  base?: string
}

export interface IamApiKeysResponse {
  data: MerchantApiKey[]
  metadata: Record<string, unknown>
  next?: () => Promise<IamApiKeysResponse>
}

export interface IamApiKeyResponse {
  data: MerchantApiKey
  metadata: Record<string, unknown>
  msg?: string
  errors?: ErrorObject[]
}

export interface ErrorObject {
  id: string
  label: string
  errorDetails: Record<string, unknown>
}

export interface IamApiKeysPrivateKeyResponse {
  privateKey?: string
}

export interface MerchantApiKey {
  publicKey?: string
  secureLevel?: string
  alias?: string
  productType?: string
  keyPairState?: string
  paymentTypes?: MerchantApiKeyPaymentType[]
}

export interface MerchantApiKeyPaymentType {
  type?: string
  allowCustomerTypes?: string
  allowCreditTransaction?: string
  supports?: MerchantApiKeyScope[]
}

export interface MerchantApiKeyScope {
  channel?: string
  pmpId?: string
  brands?: string[]
  currency?: string[]
  countries?: string[]
}

export interface IamApiKeysQueryHandler {
  limit?: number
  uri?: string
  query?: IamApiKeysQuery
  orderFields?: string[] | string
}

export interface IamApiKeysQuery extends MerchantApiKey {
  deleted?: boolean
  active?: boolean
  q?: string
}

export class IamApiKeys extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/iam/api-keys'
  endpoint: string
  http: Client
  public options: IamApiKeysOptions
  public uriHelper: UriHelper

  constructor (options: IamApiKeysOptions, http: Client) {
    super(http, { endpoint: IamApiKeys.baseEndpoint, base: options.base ?? 'https://api.tillhub.com' })
    this.options = options
    this.http = http

    this.endpoint = IamApiKeys.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (query?: IamApiKeysQueryHandler | undefined): Promise<IamApiKeysResponse> {
    let next
    const base = this.uriHelper.generateBaseUri()
    const uri = this.uriHelper.generateUriWithQuery(base, query)

    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new IamApiKeysFetchFailed(undefined, { status: response.status })
      }

      if (response.data.cursors?.after) {
        next = (): Promise<IamApiKeysResponse> => this.getAll({ uri: response.data.cursors.after })
      }

      return {
        data: response.data.results as MerchantApiKey[],
        metadata: { cursor: response.data.cursors },
        next
      }
    } catch (error: any) {
      throw new IamApiKeysFetchFailed(error.msg, { error })
    }
  }

  async get (apiKeyId: string): Promise<IamApiKeyResponse> {
    const base = this.uriHelper.generateBaseUri(`/${apiKeyId}`)
    const uri = this.uriHelper.generateUriWithQuery(base)

    try {
      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) {
        throw new IamApiKeyFetchFailed(undefined, { status: response.status })
      }
      return {
        data: response.data.results[0] as MerchantApiKey,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new IamApiKeyFetchFailed(error.message, { error })
    }
  }

  async getPrivateKey (publicKey: string): Promise<IamApiKeysPrivateKeyResponse> {
    const base = this.uriHelper.generateBaseUri('/private-key')
    const uri = this.uriHelper.generateUriWithQuery(base)

    try {
      const response = await this.http.getClient().post(uri, { publicKey })
      if (response.status !== 200) {
        throw new IamApiKeysPrivateKeyFetchFailed(undefined, { status: response.status })
      }

      return {
        privateKey: response.data.results[0].privateKey as string
      }
    } catch (error: any) {
      throw new IamApiKeysPrivateKeyFetchFailed(error.msg, { error })
    }
  }

  async meta (query?: IamApiKeysQueryHandler | undefined): Promise<IamApiKeysResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/meta')
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) throw new IamApiKeysMetaFailed()

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new IamApiKeysMetaFailed(error.msg, { error })
    }
  }
}

export class IamApiKeysFetchFailed extends BaseError {
  public name = 'IamApiKeysFetchFailed'
  constructor (
    public message: string = 'Could not fetch meta api keys',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, IamApiKeysFetchFailed.prototype)
  }
}

export class IamApiKeysMetaFailed extends BaseError {
  public name = 'IamApiKeysMetaFailed'
  constructor (
    public message: string = 'Could not fetch meta api keys',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, IamApiKeysMetaFailed.prototype)
  }
}

export class IamApiKeyFetchFailed extends BaseError {
  public name = 'IamApiKeyFetchFailed'
  constructor (
    public message: string = 'Could not meta api key',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, IamApiKeyFetchFailed.prototype)
  }
}

export class IamApiKeysPrivateKeyFetchFailed extends BaseError {
  public name = 'IamApiKeysPrivateKeyFetchFailed'
  constructor (
    public message: string = 'Could not private key',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, IamApiKeysMetaFailed.prototype)
  }
}
