import { Client } from '../client'
import * as errors from '../errors'

export interface CustomersOptions {
  user?: string
  base?: string
}

export interface CustomersQuery {
  limit?: number
  uri?: string
}

export interface CustomersResponse {
  data: object[]
  metadata: object
  msg?: string
}

export class Customers {
  endpoint: string
  http: Client
  public options: CustomersOptions

  constructor(options: CustomersOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v0/customers'
    this.options.base = this.options.base || 'https://api.tillhub.com'
  }

  getAll(query?: CustomersQuery | undefined): Promise<CustomersResponse> {
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
        if (response.status !== 200) reject(new errors.CustomersFetchFailed())

        if (response.data.cursor && response.data.cursor.next) {
          next = this.getAll({ uri: response.data.cursor.next })
        }

        return resolve({
          data: response.data.results,
          metadata: { cursor: response.data.cursor },
          next
        } as CustomersResponse)
      } catch (err) {
        return reject(new errors.CustomersFetchFailed())
      }
    })
  }

  delete(customerId: string): Promise<CustomersResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${customerId}`
      try {
        const response = await this.http.getClient().delete(uri)
        response.status !== 200 && reject(new errors.CustomerDeleteFailed())

        return resolve({
          msg: response.data.msg
        } as CustomersResponse)
      } catch (err) {
        return reject(new errors.CustomerDeleteFailed())
      }
    })
  }

  count(): Promise<CustomersResponse> {
    return new Promise(async (resolve, reject) => {
      let uri = `${this.options.base}${this.endpoint}/${this.options.user}/meta`

      try {
        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) reject(new errors.CustomersCountFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as CustomersResponse)
      } catch (err) {
        return reject(new errors.CustomersCountFailed())
      }
    })
  }
}
