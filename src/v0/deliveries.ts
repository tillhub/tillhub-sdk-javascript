import { Client } from '../client'
import * as errors from '../errors'

export interface DeliveriesOptions {
  user?: string
  base?: string
}

export interface DeliveriesQuery {
  limit?: number
  uri?: string
  embed?: string[]
}

export interface DeliveriesResponse {
  data: object[]
  metadata: object
  next?: Promise<DeliveriesResponse>
}

export class Deliveries {
  endpoint: string
  http: Client
  public options: DeliveriesOptions

  constructor(options: DeliveriesOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v0/deliveries'
    this.options.base = this.options.base || 'https://api.tillhub.com'
  }

  getAll(query?: DeliveriesQuery | undefined): Promise<DeliveriesResponse> {
    return new Promise(async (resolve, reject) => {
      let next

      try {
        let uri
        if (query && query.uri) {
          uri = query.uri
        } else {
          uri = `${this.options.base}${this.endpoint}/${this.options.user}`
        }

        if (query && query.embed) {
          const queryString = query.embed
            .map(item => {
              return `embed[]=${item}`
            })
            .join('&')
          uri = `${uri}?${queryString}`
        }

        const response = await this.http.getClient().get(uri)

        if (response.data.cursor && response.data.cursor.next) {
          next = this.getAll({ uri: response.data.cursor.next })
        }

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count },
          next
        } as DeliveriesResponse)
      } catch (err) {
        return reject(new errors.DeliveriesFetchFailed())
      }
    })
  }
}
