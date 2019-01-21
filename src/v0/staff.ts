import { Client } from '../client'
import * as errors from '../errors'

export interface StaffOptions {
  user?: string
  base?: string
}

export interface StaffsResponse {
  data: object[]
  metadata: object
}

export class Staff {
  endpoint: string
  http: Client
  public options: StaffOptions

  constructor(options: StaffOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v0/staff'
    this.options.base = this.options.base || 'https://api.tillhub.com'
  }

  getAll(): Promise<StaffsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uri = `${this.options.base}${this.endpoint}/${this.options.user}`

        const response = await this.http.getClient().get(uri)

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as StaffsResponse)
      } catch (err) {
        return reject(new errors.StaffsFetchFailed())
      }
    })
  }
}
