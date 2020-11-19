import { Client } from '../client'
import { BaseError } from '../errors'
import { ThBaseHandler } from '../base'
import { UriHelper } from '../uri-helper'

export interface StorefrontsOptions {
  user?: string
  base?: string
}

export interface StorefrontsQuery {
  limit?: number
  uri?: string
  query?: {
    deleted?: boolean
    active?: boolean
  }
}

export interface StorefrontsResponse {
  data: Storefront[]
  metadata: Record<string, unknown>
}

export interface StorefrontResponse {
  data?: Storefront
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}

export interface StorefrontProfileResponse {
  data?: StorefrontProfile
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}

export interface StorefrontSyncAllResponse {
  msg: string
}

export interface StorefrontSyncStatusResponse {
  data?: StorefrontSyncStatus
  metadata?: {
    count?: number
  }
  msg?: string
}

export interface StorefrontWhitelistResponse {
  data?: Array<Record<string, unknown>>
  metadata?: {
    count?: number
  }
  msg?: string
}

export interface Storefront {
  id?: string
  name?: string
  description?: string
  type?: string
  external_system_type?: string
  resource_syncs_outbound?: string[]
  resource_syncs_inbound?: string[]
  link?: string
  default_location?: string
  external_reference_id?: string
  external_api_base?: string
  auth?: Record<string, unknown>
  metadata?: Record<string, unknown>
  profile?: StorefrontProfile
}

export interface StorefrontProfile {
  company: {
    companyName?: string
    email?: string
    street?: string
    city?: string
    countryCode?: string
    postalCode?: string
    stateOrProvinceCode?: string
    phone?: string
  }
  formatsAndUnits: {
    currency?: string
    currencyPrefix?: string
    currencySuffix?: string
    currencyPrecision?: number
    currencyGroupSeparator?: string
    currencyDecimalSeparator?: string
    currencyTruncateZeroFractional?: boolean
    currencyRate?: number
    weightUnit?: string
    weightPrecision?: number
    weightGroupSeparator?: string
    weightDecimalSeparator?: string
    weightTruncateZeroFractional?: boolean
    dateFormat?: string
    timeFormat?: string
    timezone?: string
    dimensionsUnit?: string
    orderNumberPrefix?: string
    orderNumberSuffix?: string
  }
  languages: {
    enabledLanguages?: string[]
    facebookPreferredLocale?: string
  }
  taxSettings: {
    automaticTaxEnabled?: boolean
    taxes?: [
      {
        id?: number
        name?: string
        enabled?: boolean
        includeInPrice?: boolean
        useShippingAddress?: boolean
        taxShipping?: boolean
        appliedByDefault?: boolean
        defaultTax?: number
        rules?: any[]
      }
    ]
  }
}

export interface StorefrontSyncStatus {
  id?: string
  synced?: number
  not_synced?: number
  started_at?: string
  ended_at?: string
  total?: string
  status?: string
}

export class Storefronts extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/storefronts'
  endpoint: string
  http: Client
  public options: StorefrontsOptions
  public uriHelper: UriHelper

  constructor (options: StorefrontsOptions, http: Client) {
    super(http, {
      endpoint: Storefronts.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = Storefronts.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (queryOrOptions?: StorefrontsQuery | undefined): Promise<StorefrontsResponse> {
    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, queryOrOptions)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new StorefrontsFetchFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (error) {
      throw new StorefrontsFetchFailed(undefined, { error })
    }
  }

  async get (storefrontId: string): Promise<StorefrontResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${storefrontId}`)
    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) { throw new StorefrontsFetchOneFailed(undefined, { status: response.status }) }

      return {
        data: response.data.results[0] as Storefront,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error) {
      throw new StorefrontsFetchOneFailed(undefined, { error })
    }
  }

  async put (storefrontId: string, storefront: Storefront): Promise<StorefrontResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${storefrontId}`)
    try {
      const response = await this.http.getClient().put(uri, storefront)

      return {
        data: response.data.results[0] as Storefront,
        metadata: { count: response.data.count }
      }
    } catch (error) {
      throw new StorefrontsPutFailed(undefined, { error })
    }
  }

  async create (storefront: Storefront): Promise<StorefrontResponse> {
    const uri = this.uriHelper.generateBaseUri()
    try {
      const response = await this.http.getClient().post(uri, storefront)

      return {
        data: response.data.results[0] as Storefront,
        metadata: { count: response.data.count }
      }
    } catch (error) {
      throw new StorefrontsCreationFailed(undefined, { error })
    }
  }

  async delete (storefrontId: string): Promise<StorefrontResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${storefrontId}`)
    try {
      const response = await this.http.getClient().delete(uri)
      if (response.status !== 200) throw new StorefrontsDeleteFailed()

      return {
        msg: response.data.msg
      }
    } catch (err) {
      throw new StorefrontsDeleteFailed()
    }
  }

  async profile (storefrontId: string): Promise<StorefrontProfileResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${storefrontId}/profile`)
    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new StorefrontsProfileFetchFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0] as StorefrontProfile,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error) {
      throw new StorefrontsProfileFetchFailed(undefined, { error })
    }
  }

  async sync (storefrontId: string): Promise<StorefrontSyncAllResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${storefrontId}/products/sync`)
    try {
      const response = await this.http.getClient().post(uri)
      if (response.status !== 200) {
        throw new StorefrontsSyncAllFailed(undefined, { status: response.status })
      }

      return {
        msg: response.data.msg
      }
    } catch (error) {
      throw new StorefrontsSyncAllFailed(undefined, { error })
    }
  }

  async syncStatus (storefrontId: string): Promise<StorefrontSyncStatusResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${storefrontId}/sync/status`)
    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new StorefrontsSyncStatusFetchFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0] as StorefrontSyncStatus,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error) {
      throw new StorefrontsSyncStatusFetchFailed(undefined, { error })
    }
  }

  async whitelist (storefrontId: string, products: string[]): Promise<StorefrontWhitelistResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${storefrontId}/products/whitelist`)
    try {
      const response = await this.http.getClient().post(uri, { products })
      if (response.status !== 200) {
        throw new StorefrontsWhitelistFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error) {
      throw new StorefrontsWhitelistFailed(undefined, { error })
    }
  }
}

export class StorefrontsFetchFailed extends BaseError {
  public name = 'StorefrontsFetchFailed'
  constructor (
    public message: string = 'Could not fetch storefronts',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, StorefrontsFetchFailed.prototype)
  }
}

export class StorefrontsFetchOneFailed extends BaseError {
  public name = 'StorefrontsFetchOneFailed'
  constructor (
    public message: string = 'Could not fetch one storefront',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, StorefrontsFetchOneFailed.prototype)
  }
}

export class StorefrontsPutFailed extends BaseError {
  public name = 'StorefrontsPutFailed'
  constructor (
    public message: string = 'Could not update storefront',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, StorefrontsPutFailed.prototype)
  }
}

export class StorefrontsCreationFailed extends BaseError {
  public name = 'StorefrontsCreationFailed'
  constructor (
    public message: string = 'Could not create storefronts',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, StorefrontsCreationFailed.prototype)
  }
}

export class StorefrontsDeleteFailed extends BaseError {
  public name = 'StorefrontsDeleteFailed'
  constructor (
    public message: string = 'Could not delete storefronts',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, StorefrontsDeleteFailed.prototype)
  }
}

export class StorefrontsProfileFetchFailed extends BaseError {
  public name = 'StorefrontsProfileFetchFailed'
  constructor (
    public message: string = 'Could not fetch the storefront profile data',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, StorefrontsProfileFetchFailed.prototype)
  }
}

export class StorefrontsSyncAllFailed extends BaseError {
  public name = 'StorefrontsSyncAllFailed'
  constructor (
    public message: string = 'Could not sync all the products',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, StorefrontsSyncAllFailed.prototype)
  }
}

export class StorefrontsSyncStatusFetchFailed extends BaseError {
  public name = 'StorefrontsSyncStatusFetchFailed'
  constructor (
    public message: string = 'Could not fetch the status of the sync process',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, StorefrontsSyncStatusFetchFailed.prototype)
  }
}

export class StorefrontsWhitelistFailed extends BaseError {
  public name = 'StorefrontsWhitelistFailed'
  constructor (
    public message: string = 'Could not whitelist the provided products',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, StorefrontsWhitelistFailed.prototype)
  }
}
