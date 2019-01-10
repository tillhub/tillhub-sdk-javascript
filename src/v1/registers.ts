import qs from 'qs'
import { Client } from '../client'
import * as errors from '../errors'

export interface RegistersOptions {
  user?: string
  base?: string
}

export interface RegistersQuery {
  start?: string | null
  deleted?: boolean | null
  active?: boolean | null
  branch?: string | null
  limit?: number
  uri?: string
}

export interface RegistersResponse {
  data: object[]
  metadata: object
}

export class Registers {
  endpoint: string
  http: Client
  public options: RegistersOptions

  constructor(options: RegistersOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v1/Registers'
    this.options.base = this.options.base || 'https://api.tillhub.com'
  }

  getAll(q?: RegistersQuery): Promise<RegistersResponse> {
    return new Promise(async (resolve, reject) => {
      const query = q ? JSON.parse(JSON.stringify(q)) : {}
      let uri
      let next

      try {
        if (query && query.uri) {
          uri = query.uri
        } else {
          uri = `${this.options.base}${this.endpoint}/${this.options.user}`
        }

        const queryString = qs.stringify(query)
        if (queryString) {
          uri = `${uri}?${queryString}`
        }

        const response = await this.http.getClient().get(uri)

        if (response.data.cursor && response.data.cursor.next) {
          next = (): Promise<RegistersResponse> => this.getAll({ uri: response.data.cursor.next })
        }

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count },
          next
        } as RegistersResponse)
      } catch (err) {
        return reject(new errors.RegistersFetchFailed())
      }
    })
  }
}
