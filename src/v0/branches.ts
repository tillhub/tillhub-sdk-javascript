import { Client } from '../client'
import * as errors from '../errors'

export interface BranchesOptions {
  user?: string
  base?: string
}

export interface BranchesQuery {
  limit?: number
  uri?: string
}

export interface BranchesResponse {
  data: object[]
  metadata: object
}

export class Branches {
  endpoint: string
  http: Client
  public options: BranchesOptions

  constructor(options: BranchesOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v0/branches'
    this.options.base = this.options.base || 'https://api.tillhub.com'
  }

  getAll(query?: BranchesQuery | undefined): Promise<BranchesResponse> {
    return new Promise(async (resolve, reject) => {
      let next

      try {
        let uri
        if (query && query.uri) {
          uri = query.uri
        } else {
          uri = `${this.options.base}${this.endpoint}/${this.options.user}`
        }

        const response = await this.http.getClient().get(uri)

        if (response.data.cursor && response.data.cursor.next) {
          next = this.getAll({ uri: response.data.cursor.next })
        }

        return resolve({
          data: response.data.results,
          metadata: { cursor: response.data.cursor },
          next
        } as BranchesResponse)
      } catch (err) {
        return reject(new errors.BranchesFetchFailed())
      }
    })
  }

  count(): Promise<BranchesResponse> {
    return new Promise(async (resolve, reject) => {
      let uri = `${this.options.base}${this.endpoint}/${this.options.user}/meta`

      try {
        const response = await this.http.getClient().get(uri)

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as BranchesResponse)
      } catch (err) {
        return reject(new errors.BranchesCountFailed())
      }
    })
  }
}
