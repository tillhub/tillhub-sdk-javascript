import { Client } from '../client'
import * as errors from '../errors'
import { Users, UsersOptions } from './users'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface ConfigurationsOptions {
  user?: string
  base?: string
}

export interface ConfigurationsQueryOptions {
  limit?: number
  uri?: string
  owner?: string
  query?: Record<string, unknown>
}

export interface ConfigurationsResponse {
  data: Configuration[]
  metadata: Record<string, unknown>
}

export interface ConfigurationResponse {
  data: Configuration
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}

export interface BulkFetchRequestBody {
  sections?: string[]
  owners?: string[]
}

export interface BulkFetchResponse {
  data: Configuration[]
  metadata?: Record<string, unknown>
}

export interface BulkUpdateRequestBody {
  configurations: Configuration[]
}

export interface BulkUpdateResult {
  id: string
  success: boolean
}

export interface BulkUpdateResponse {
  data: BulkUpdateResult[]
  metadata?: Record<string, unknown>
}

export interface Configuration {
  id?: string
  vouchers?: Record<string, unknown>
  scan_prefixes?: Array<Record<string, unknown>>
  voucher_actions?: Array<Record<string, unknown>>
  settings?: Record<string, unknown>
  hooks?: Array<Record<string, unknown>>
  themes?: Record<string, unknown>
  name?: string
  client_id?: string
  metadata?: Record<string, unknown>
  registers?: Record<string, unknown>
  branches?: Record<string, unknown>
  owner?: string
  franchise?: Record<string, unknown>
  staff?: Record<string, unknown>
  financials?: Record<string, unknown> | null
  features?: Record<string, unknown> | null
  stock?: Record<string, unknown> | null
  transactions?: Record<string, unknown> | null
  products?: Record<string, unknown>
  customers?: Record<string, unknown>
  crm?: Record<string, unknown> | null
  datev?: Record<string, unknown> | null
  label_printer?: Record<string, unknown> | null
  delivery_note?: Record<string, unknown> | null
  togo?: Record<string, unknown> | null
  receipts?: Record<string, unknown> | null
  orders?: Record<string, unknown> | null
  carts?: Record<string, unknown> | null
  tips?: Record<string, unknown> | null
  emails?: Record<string, unknown> | null
  level?: 'client_account' | 'registers' | 'branches'
  taxes?: Record<string, unknown> | null
  analytics?: Record<string, unknown>
  reservations?: Record<string, unknown>
  custom_dashboards?: Record<string, unknown>
}

class ConfigurationReference {
  data: Configuration
  id?: string
  metadata?: {
    count?: number
    patch?: any
  }

  response: ConfigurationResponse
  private readonly options: ConfigurationsOptions
  private readonly http: Client

  constructor (response: ConfigurationResponse, http: Client, options: ConfigurationsOptions) {
    this.data = response.data
    this.id = response.data.id
    this.metadata = response.metadata
    this.response = response
    this.options = options
    this.http = http
  }

  users (): Users {
    return new Users(this.options as UsersOptions, this.http)
  }
}

export class Configurations extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/configurations'
  endpoint: string
  http: Client
  public options: ConfigurationsOptions
  public uriHelper: UriHelper

  constructor (options: ConfigurationsOptions, http: Client) {
    super(http, {
      endpoint: Configurations.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = Configurations.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (optionsOrQuery?: ConfigurationsQueryOptions | undefined): Promise<ConfigurationsResponse> {
    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, optionsOrQuery)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new errors.ConfigurationsFetchFailed()

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.ConfigurationsFetchFailed(error.message, { error })
    }
  }

  async get (configurationId: string): Promise<ConfigurationReference> {
    const uri = this.uriHelper.generateBaseUri(`/${configurationId}`)

    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) { throw new errors.ConfigurationFetchFailed(undefined, { status: response.status }) }

      // we are wrapping the response into a class to reference sub APIs more easily
      return new ConfigurationReference(
        {
          data: response.data.results[0] as Configuration,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        },
        this.http,
        this.options
      )
    } catch (error: any) {
      throw new errors.ConfigurationFetchFailed(error.message, { error })
    }
  }

  async put (configurationId: string, configuration: Configuration): Promise<ConfigurationResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${configurationId}`)
    try {
      const response = await this.http.getClient().put(uri, configuration)

      return {
        data: response.data.results[0] as Configuration,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.ConfigurationPutFailed(error.message, { error })
    }
  }

  async patch (configurationId: string, configuration: Configuration): Promise<ConfigurationResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${configurationId}`)
    try {
      const response = await this.http.getClient().patch(uri, configuration)

      return {
        data: response.data.results[0] as Configuration,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.ConfigurationPatchFailed(error.message, { error })
    }
  }

  async create (configuration: Configuration): Promise<ConfigurationResponse> {
    const uri = this.uriHelper.generateBaseUri()
    try {
      const response = await this.http.getClient().post(uri, configuration)

      return {
        data: response.data.results[0] as Configuration,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.ConfigurationCreationFailed(error.message, { error })
    }
  }

  async delete (configurationId: string): Promise<ConfigurationResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri(`/${configurationId}`)
      const response = await this.http.getClient().delete(uri)

      return {
        data: {},
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new errors.ConfigurationDeleteFailed(error.message, { error })
    }
  }

  async bulkFetch (body: BulkFetchRequestBody): Promise<BulkFetchResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri('/bulk-fetch')
      const response = await this.http.getClient().post(uri, body)

      if (response.status !== 200) {
        throw new errors.ConfigurationBulkFetchFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results as Configuration[],
        metadata: response.data.metadata
      }
    } catch (error: any) {
      throw new errors.ConfigurationBulkFetchFailed(error.message, { error })
    }
  }

  async bulkUpdate (body: BulkUpdateRequestBody): Promise<BulkUpdateResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri('/bulk-update')
      const response = await this.http.getClient().patch(uri, body)

      if (response.status !== 200) {
        throw new errors.ConfigurationBulkUpdateFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results as BulkUpdateResult[],
        metadata: response.data.metadata
      }
    } catch (error: any) {
      throw new errors.ConfigurationBulkUpdateFailed(error.message, { error })
    }
  }
}
