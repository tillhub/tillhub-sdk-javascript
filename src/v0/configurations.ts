import qs from 'qs'
import { Client } from '../client'
import * as errors from '../errors'
import { Users, UsersOptions } from './users'

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
  metadata: object
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
  vouchers?: object
  scan_prefixes?: object[]
  voucher_actions?: object[]
  settings?: object
  hooks?: object[]
  themes?: object
  name?: string
  client_id?: string
  metadata?: object
  registers?: object
  branches?: object
  owner?: string
  franchise?: object
  staff?: object
  financials?: object | null
  features?: object | null
  stock?: object | null
  transactions?: object | null
  products?: object
  customers?: object
  crm?: object | null
  datev?: object | null
  label_printer?: object | null
  delivery_note?: object | null
  togo?: object | null
  receipts?: object | null
  orders?: object | null
  carts?: object | null
  tips?: object | null
  emails?: object | null
  level?: 'client_account' | 'registers' | 'branches'
  taxes?: object | null
  analytics?: object
  custom_dashboards?: object
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

export class Configurations {
  endpoint: string
  http: Client
  public options: ConfigurationsOptions

  constructor(options: ConfigurationsOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v0/configurations'
    this.options.base = this.options.base || 'https://api.tillhub.com'
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
        return resolve(new ConfigurationReference({
          data: response.data.results[0] as Configuration,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        }, this.http, this.options))
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
}
