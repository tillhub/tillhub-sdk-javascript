import qs from 'qs'
import { Client } from '../client'
import * as errors from '../errors'
import { ThBaseHandler } from '../base'

const allowedStatuses = [200, 204]

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
  active?: boolean
  deleted?: boolean
}

export interface OrdersResponse {
  data: object[]
  metadata: object
  msg?: string
}

export interface OrdersUpdateValues {
  id?: string
  open?: boolean
  deleted?: boolean
  ordered_at?: string
  finalized_at?: string
  direction?: string
}

export interface OrdersRequest {
  orderId: string
  values: OrdersUpdateValues
}

export interface OrderItem {
  added_at?: string
  issuer?: object
  order_qty: number
  auto?: boolean
  suggestion?: boolean
  deleted?: boolean
  product: string
  stock?: string
  location?: string
}

export interface OrderItemCreate extends OrderItem {
  order: string
}

export interface OrderItemUpdate extends OrderItem {
  id: string
}

export interface OrderItemsCreateRequest {
  order_items: OrderItemCreate[]
}

export interface OrderItemsUpdateRequest {
  order_items: OrderItemUpdate[]
}

export interface OrderItemUpdateRequest {
  itemId: string
  item: OrderItemUpdate
}

export interface BookStockBody {
  qty: number
}

export interface BookStockRequest {
  orderId: string
  body: BookStockBody
  uri?: string
}

export class Orders extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/orders'
  endpoint: string
  http: Client
  public options: OrdersOptions

  constructor(options: OrdersOptions, http: Client) {
    super(http, { endpoint: Orders.baseEndpoint, base: options.base || 'https://api.tillhub.com' })
    this.options = options
    this.http = http

    this.endpoint = Orders.baseEndpoint
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

  create(options: OrdersRequest): Promise<OrdersResponse> {
    return new Promise(async (resolve, reject) => {
      const { orderId, values } = options
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${orderId}`
      try {
        const response = await this.http.getClient().post(uri, values)
        response.status !== 200 && reject(new errors.OrdersCreateFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as OrdersResponse)
      } catch (err) {
        return reject(new errors.OrdersCreateFailed())
      }
    })
  }

  update(options: OrdersRequest): Promise<OrdersResponse> {
    return new Promise(async (resolve, reject) => {
      const { orderId, values } = options
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${orderId}`
      try {
        const response = await this.http.getClient().put(uri, values)
        response.status !== 200 && reject(new errors.OrdersUpdateFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as OrdersResponse)
      } catch (err) {
        return reject(new errors.OrdersUpdateFailed())
      }
    })
  }

  getOrderItems(orderId: string | undefined): Promise<OrdersResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${orderId}/order_items`
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
    let route: string
    if (query.itemId) {
      route = `/${query.itemId}`
    } else {
      route = `?${qs.stringify(query)}`
    }
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/order_items${route}`
      try {
        const response = await this.http.getClient().delete(uri)
        allowedStatuses.includes(response.status) === false &&
          reject(new errors.OrderItemsDeleteFailed())

        return resolve({ msg: response.data.msg } as OrdersResponse)
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

  updateOrderItems(body: OrderItemsUpdateRequest): Promise<OrdersResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/order_items`
      try {
        const response = await this.http.getClient().put(uri, body)
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

  updateOrderItem(query: OrderItemUpdateRequest): Promise<OrdersResponse> {
    return new Promise(async (resolve, reject) => {
      const { item, itemId } = query
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/order_items/${itemId}`
      try {
        const response = await this.http.getClient().put(uri, item)
        response.status !== 200 && reject(new errors.OrderItemUpdateFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as OrdersResponse)
      } catch (err) {
        return reject(new errors.OrderItemUpdateFailed())
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

  getHistoricOrderItems(orderId?: string | undefined): Promise<OrdersResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uri = `${this.options.base}${this.endpoint}/${
          this.options.user
          }/${orderId}/order_items`

        const response = await this.http.getClient().get(uri)
        response.status !== 200 && reject(new errors.HistoricOrderItemsFetchFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as OrdersResponse)
      } catch (err) {
        return reject(new errors.HistoricOrderItemsFetchFailed())
      }
    })
  }

  bookStock(query: BookStockRequest): Promise<OrdersResponse> {
    return new Promise(async (resolve, reject) => {
      const { orderId, body } = query
      try {
        let uri
        if (query && query.uri) {
          uri = query.uri
        } else {
          uri = `${this.options.base}${this.endpoint}/${
            this.options.user
            }/order_items/${orderId}/book_stock`
        }

        const response = await this.http.getClient().post(uri, body)
        response.status !== 200 && reject(new errors.BookStockFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as OrdersResponse)
      } catch (err) {
        return reject(new errors.BookStockFailed())
      }
    })
  }

  getOpenOrder(query?: OrdersQuery | undefined): Promise<OrdersResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        let uri
        if (query && query.uri) {
          uri = query.uri
        } else {
          uri = `${this.options.base}${this.endpoint}/${this.options.user}/open`
        }

        const response = await this.http.getClient().get(uri)
        response.status !== 200 && reject(new errors.OpenOrderFetchFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as OrdersResponse)
      } catch (err) {
        return reject(new errors.OpenOrderFetchFailed())
      }
    })
  }
}
