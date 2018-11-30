import qs from 'qs'
import { Client } from '../client'
import * as errors from '../errors'

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
  data: object[]
  metadata: object
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
}
