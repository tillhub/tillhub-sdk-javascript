import qs from 'qs'
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
  query?: any
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
export interface Configuration {
  id?: string
}

export interface Configuration {
  vouchers?: Record<string, unknown>
  scan_prefixes?: Record<string, unknown>[]
  voucher_actions?: Record<string, unknown>[]
  settings?: Record<string, unknown>
  hooks?: Record<string, unknown>[]
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
  private options: ConfigurationsOptions
  private http: Client

  constructor(response: ConfigurationResponse, http: Client, options: ConfigurationsOptions) {
    this.data = response.data
    this.id = response.data.id
    this.metadata = response.metadata
    this.response = response
    this.options = options
    this.http = http
  }

  users(): Users {
    return new Users(this.options as UsersOptions, this.http)
  }
}

export class Configurations extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/configurations'
  endpoint: string
  http: Client
  public options: ConfigurationsOptions
  public uriHelper: UriHelper

  constructor(options: ConfigurationsOptions, http: Client) {
    super(http, {
      endpoint: Configurations.baseEndpoint,
      base: options.base || 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = Configurations.baseEndpoint
    this.options.base = this.options.base || 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  getAll(optionsOrQuery?: ConfigurationsQueryOptions | undefined): Promise<ConfigurationsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        let uri
        if (optionsOrQuery && optionsOrQuery.uri) {
          uri = optionsOrQuery.uri
        } else {
          let queryString = ''
          if (optionsOrQuery && (optionsOrQuery.query || optionsOrQuery.owner)) {
            queryString = qs.stringify({ owner: optionsOrQuery.owner, ...optionsOrQuery.query })
          }

          uri = `${this.options.base}${this.endpoint}/${this.options.user}${
            queryString ? `?${queryString}` : ''
          }`
        }

        const response = await this.http.getClient().get(uri)
        response.status !== 200 && reject(new errors.ConfigurationsFetchFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as ConfigurationsResponse)
      } catch (err) {
        return reject(new errors.ConfigurationsFetchFailed())
      }
    })
  }

  get(configurationId: string): Promise<ConfigurationReference> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${configurationId}`
      try {
        const response = await this.http.getClient().get(uri)
        response.status !== 200 &&
          reject(new errors.ConfigurationFetchFailed(undefined, { status: response.status }))

        // we are wrapping the response into a class to reference sub APIs more easily
        return resolve(
          new ConfigurationReference(
            {
              data: response.data.results[0] as Configuration,
              msg: response.data.msg,
              metadata: { count: response.data.count }
            },
            this.http,
            this.options
          )
        )
      } catch (error) {
        return reject(new errors.ConfigurationFetchFailed(undefined, { error }))
      }
    })
  }

  put(configurationId: string, configuration: Configuration): Promise<ConfigurationResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${configurationId}`
      try {
        const response = await this.http.getClient().put(uri, configuration)

        return resolve({
          data: response.data.results[0] as Configuration,
          metadata: { count: response.data.count }
        } as ConfigurationResponse)
      } catch (error) {
        return reject(new errors.ConfigurationPutFailed(undefined, { error }))
      }
    })
  }

  patch(configurationId: string, configuration: Configuration): Promise<ConfigurationResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${configurationId}`
      try {
        const response = await this.http.getClient().patch(uri, configuration)

        return resolve({
          data: response.data.results[0] as Configuration,
          metadata: { count: response.data.count }
        } as ConfigurationResponse)
      } catch (error) {
        return reject(new errors.ConfigurationPatchFailed(undefined, { error }))
      }
    })
  }

  create(configuration: Configuration): Promise<ConfigurationResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}`
      try {
        const response = await this.http.getClient().post(uri, configuration)

        return resolve({
          data: response.data.results[0] as Configuration,
          metadata: { count: response.data.count }
        } as ConfigurationResponse)
      } catch (error) {
        return reject(new errors.ConfigurationCreationFailed(undefined, { error }))
      }
    })
  }

  delete(configurationId: string): Promise<ConfigurationResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uri = this.uriHelper.generateBaseUri(`/${configurationId}`)
        const response = await this.http.getClient().delete(uri)

        return resolve({
          msg: response.data.msg
        } as ConfigurationResponse)
      } catch (error) {
        return reject(new errors.ConfigurationDeleteFailed(undefined, { error }))
      }
    })
  }
}
