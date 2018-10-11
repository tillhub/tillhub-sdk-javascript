import { Client } from '../client'
import * as errors from '../errors'

export interface VouchersOptions {
  user?: string
  base?: string
}

export interface VouchersQuery {
  limit?: number
  uri?: string
}

export interface VouchersResponse {
  data: object[]
  metadata: object
  msg?: string
}

export class Vouchers {
  endpoint: string
  http: Client
  public options: VouchersOptions

  constructor(options: VouchersOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v0/vouchers'
    this.options.base = this.options.base || 'https://api.tillhub.com'
  }

  getAll(query?: VouchersQuery | undefined): Promise<VouchersResponse> {
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
        if (response.status !== 200) reject(new errors.VouchersFetchFailed())

        if (response.data.cursor && response.data.cursor.next) {
          next = this.getAll({ uri: response.data.cursor.next })
        }

        return resolve({
          data: response.data.results,
          metadata: { cursor: response.data.cursor },
          next
        } as VouchersResponse)
      } catch (err) {
        return reject(new errors.VouchersFetchFailed())
      }
    })
  }

  delete(voucherId: string): Promise<VouchersResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${voucherId}`
      try {
        const response = await this.http.getClient().delete(uri)
        response.status !== 200 && reject(new errors.VoucherDeleteFailed())

        return resolve({
          msg: response.data.msg
        } as VouchersResponse)
      } catch (err) {
        return reject(new errors.VoucherDeleteFailed())
      }
    })
  }

  count(): Promise<VouchersResponse> {
    return new Promise(async (resolve, reject) => {
      let uri = `${this.options.base}${this.endpoint}/${this.options.user}/meta`

      try {
        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) reject(new errors.VouchersCountFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as VouchersResponse)
      } catch (err) {
        return reject(new errors.VouchersCountFailed())
      }
    })
  }

  getAllLogs(): Promise<VouchersResponse> {
    return new Promise(async (resolve, reject) => {
      let uri = `${this.options.base}${this.endpoint}/${this.options.user}/logs`

      try {
        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) reject(new errors.VouchersLogsFetchFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as VouchersResponse)
      } catch (err) {
        return reject(new errors.VouchersLogsFetchFailed())
      }
    })
  }
  countLogs(): Promise<VouchersResponse> {
    return new Promise(async (resolve, reject) => {
      let uri = `${this.options.base}${this.endpoint}/${this.options.user}/logs/meta`

      try {
        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) reject(new errors.VouchersLogsCountFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as VouchersResponse)
      } catch (err) {
        return reject(new errors.VouchersLogsCountFailed())
      }
    })
  }
}
