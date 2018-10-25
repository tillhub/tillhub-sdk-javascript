import qs from 'qs'
import { Client } from '../client'
import * as errors from '../errors'

export interface OrdersOptions {
  user?: string
  base?: string
}

export interface OrdersQuery {
  limit?: number
  uri?: string
}

export interface OrdersResponse {
  data: object[]
  metadata: object
}

export class Orders {
  endpoint: string
  http: Client
  public options: OrdersOptions

  constructor(options: OrdersOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v0/orders'
    this.options.base = this.options.base || 'https://api.tillhub.com'
  }

  getAll(query?: OrdersQuery | undefined): Promise<OrdersResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        let uri
        if (query && query.uri) {
          uri = query.uri
        } else {
          uri = `${this.options.base}${this.endpoint}/${this.options.user}`
        }

        const response = await this.http.getClient().get(uri)
        response.status !== 200 && reject(new errors.OrdersFetchFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as OrdersResponse)
      } catch (err) {
        return reject(new errors.OrdersFetchFailed())
      }
    })
  }

  getIncomingOrders(query?: OrdersQuery | undefined): Promise<OrdersResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        let uri
        if (query && query.uri) {
          uri = query.uri
        } else {
          uri = `${this.options.base}${this.endpoint}/${
            this.options.user
          }?embed=location&direction=incoming${query ? `${qs.stringify(query)}` : ''}`
        }

        const response = await this.http.getClient().get(uri)
        response.status !== 200 && reject(new errors.IncomingOrdersFetchFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as OrdersResponse)
      } catch (err) {
        return reject(new errors.IncomingOrdersFetchFailed())
      }
    })
  }

  getOutgoingOrders(query?: OrdersQuery | undefined): Promise<OrdersResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        let uri
        if (query && query.uri) {
          uri = query.uri
        } else {
          uri = `${this.options.base}${this.endpoint}/${
            this.options.user
          }?embed=location&direction=outgoing${query ? `${qs.stringify(query)}` : ''}`
        }

        const response = await this.http.getClient().get(uri)
        response.status !== 200 && reject(new errors.OutgoingOrdersFetchFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as OrdersResponse)
      } catch (err) {
        return reject(new errors.OutgoingOrdersFetchFailed())
      }
    })
  }
}
