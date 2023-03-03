import { Client } from '../client'
import * as errors from '../errors'
import { Users, UsersOptions } from './users'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface InventoryConfigurationOptions {
  user?: string
  base?: string
}

export interface InventoryConfigurationsQueryOptions {
  limit?: number
  uri?: string
  owner?: string
  query?: Record<string, unknown>
}

export interface InventoryConfigurationsResponse {
  data: InventoryConfiguration[]
  metadata: Record<string, unknown>
}

export interface InventoryConfigurationResponse {
  data: InventoryConfiguration
  metadata?: {
    count?: number
  }
  msg?: string
}

export interface InventoryConfiguration {
  id?: string
  template?: string | null
  autoGenerate?: boolean | null
  active?: boolean | null
  owner?: string | null
}

class InventoryConfigurationReference {
  data: InventoryConfiguration
  id?: string
  metadata?: {
    count?: number
    patch?: any
  }

  response: InventoryConfigurationResponse
  private readonly options: InventoryConfigurationOptions
  private readonly http: Client

  constructor (response: InventoryConfigurationResponse, http: Client, options: InventoryConfigurationOptions) {
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

export class InventoryConfiguration extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/inventory-configurations'
  endpoint: string
  http: Client
  public options: InventoryConfigurationOptions
  public uriHelper: UriHelper

  constructor (options: InventoryConfigurationOptions, http: Client) {
    super(http, {
      endpoint: InventoryConfiguration.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = InventoryConfiguration.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (optionsOrQuery?: InventoryConfigurationsQueryOptions | undefined): Promise<InventoryConfigurationsResponse> {
    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, optionsOrQuery)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new errors.InventoryConfigurationFetchFailed()

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.InventoryConfigurationFetchFailed(error.message, { error })
    }
  }

  async get (configurationId: string): Promise<InventoryConfigurationReference> {
    const uri = this.uriHelper.generateBaseUri(`/${configurationId}`)

    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) { throw new errors.InventoryConfigurationFetchFailed(undefined, { status: response.status }) }

      // we are wrapping the response into a class to reference sub APIs more easily
      return new InventoryConfigurationReference(
        {
          data: response.data.results[0] as InventoryConfiguration,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        },
        this.http,
        this.options
      )
    } catch (error: any) {
      throw new errors.InventoryConfigurationFetchFailed(error.message, { error })
    }
  }

  async put (configurationId: string, configuration: InventoryConfiguration): Promise<InventoryConfigurationResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${configurationId}`)
    try {
      const response = await this.http.getClient().put(uri, configuration)

      return {
        data: response.data.results[0] as InventoryConfiguration,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.ConfigurationPutFailed(error.message, { error })
    }
  }
}
