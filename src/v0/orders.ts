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
  itemId?: string
  order?: string
  auto?: boolean
  suggestion?: boolean
  order_qty?: number
}

export interface OrdersResponse {
  data: object[]
  metadata: object
  msg?: string
}

export interface OrderItems {
  added_at: string
  issuer: object
  order_qty: number
  auto: boolean
  suggestion: boolean
  deleted?: boolean
  order: string
  product: string
  stock?: string
  location: string
}

export interface OrderItemsCreateRequest {
  order_items: OrderItems[]
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

  getOrderItems(orderId: string | undefined): Promise<OrdersResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/order_items/${orderId}`
      try {
        const response = await this.http.getClient().get(uri)
        response.status !== 200 && reject(new errors.OrderItemsFetchFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as OrdersResponse)
      } catch (err) {
        return reject(new errors.OrderItemsFetchFailed())
      }
    })
  }

  deleteOrderItems(query: OrdersQuery): Promise<OrdersResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${
        this.options.user
      }/order_items/${query.itemId || qs.stringify(query)}`
      try {
        const response = await this.http.getClient().delete(uri)
        response.status !== 200 && reject(new errors.OrderItemsDeleteFailed())

        return resolve({
          msg: response.data.msg
        } as OrdersResponse)
      } catch (err) {
        return reject(new errors.OrderItemsDeleteFailed())
      }
    })
  }

  createOrderItems(body: OrderItemsCreateRequest): Promise<OrdersResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/order_items`
      try {
        const response = await this.http.getClient().post(uri, body)
        response.status !== 200 && reject(new errors.OrderItemsCreateFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as OrdersResponse)
      } catch (err) {
        return reject(new errors.OrderItemsCreateFailed())
      }
    })
  }

  updateOrderItems(items: OrderItems[]): Promise<OrdersResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/order_items`
      try {
        const response = await this.http.getClient().put(uri, items)
        response.status !== 200 && reject(new errors.OrderItemsUpdateFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as OrdersResponse)
      } catch (err) {
        return reject(new errors.OrderItemsUpdateFailed())
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

  getOrderSuggestions(query?: OrdersQuery | undefined): Promise<OrdersResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        let uri
        if (query && query.uri) {
          uri = query.uri
        } else {
          uri = `${this.options.base}${this.endpoint}/${this.options.user}/suggestions`
        }

        const response = await this.http.getClient().get(uri)
        response.status !== 200 && reject(new errors.OrderSuggestionsFetchFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as OrdersResponse)
      } catch (err) {
        return reject(new errors.OrderSuggestionsFetchFailed())
      }
    })
  }
}
