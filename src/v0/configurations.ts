import { Client } from '../client'
import * as errors from '../errors'

export interface ConfigurationsOptions {
  user?: string
  base?: string
}

export interface ConfigurationsQuery {
  limit?: number
  uri?: string
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

  getAll(query?: ConfigurationsQuery | undefined): Promise<ConfigurationsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        let uri
        if (query && query.uri) {
          uri = query.uri
        } else {
          uri = `${this.options.base}${this.endpoint}/${this.options.user}`
        }

        const response = await this.http.getClient().get(uri)

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
