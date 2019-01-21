import { Client } from '../client'
import * as errors from '../errors'

export interface StaffOptions {
  user?: string
  base?: string
}

export interface StaffQuery {
  start?: string | undefined
  deleted?: boolean | undefined
  active?: boolean | undefined
}

export interface StaffResponse {
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

  getAll(query?: StaffQuery | undefined): Promise<StaffResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        let uri = `${this.options.base}${this.endpoint}/${this.options.user}`
        let isQuery = false
        if (query) {
          if (query.start) {
            isQuery ? (uri += '&') : (uri += '?')
            isQuery = true
            uri += `start=${query.start}`
          }
          if (query.deleted !== undefined) {
            isQuery ? (uri += '&') : (uri += '?')
            isQuery = true
            uri += `deleted=${query.deleted}`
          }
          if (query.active !== undefined) {
            isQuery ? (uri += '&') : (uri += '?')
            isQuery = true
            uri += `active=${query.active}`
          }
        }

        const response = await this.http.getClient().get(uri)

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as StaffResponse)
      } catch (err) {
        return reject(new errors.StaffFetchFailed())
      }
    })
  }

  meta(): Promise<StaffResponse> {
    return new Promise(async (resolve, reject) => {
      let uri = `${this.options.base}${this.endpoint}/${this.options.user}/meta`

      try {
        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) {
          return reject(new errors.StaffCountFailed(undefined, { status: response.status }))
        }

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as StaffResponse)
      } catch (error) {
        return reject(new errors.StaffCountFailed(undefined, { error }))
      }
    })
  }
}
