import { Client } from '../client'
import * as errors from '../errors'
import { ThBaseHandler } from '../base'
import { UriHelper } from '../uri-helper'

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
  data?: Array<Record<string, unknown>>
  metadata?: Record<string, unknown>
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
  issuer?: Record<string, unknown>
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
  public uriHelper: UriHelper

  constructor (options: OrdersOptions, http: Client) {
    super(http, { endpoint: Orders.baseEndpoint, base: options.base ?? 'https://api.tillhub.com' })
    this.options = options
    this.http = http

    this.endpoint = Orders.baseEndpoint
    this.uriHelper = new UriHelper(this.endpoint, this.options)
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
  }

  async getAll (query?: OrdersQuery | undefined): Promise<OrdersResponse> {
    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new errors.OrdersFetchFailed()

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (err) {
      throw new errors.OrdersFetchFailed()
    }
  }

  async create (options: OrdersRequest): Promise<OrdersResponse> {
    const { orderId, values } = options
    const uri = this.uriHelper.generateBaseUri(`/${orderId}`)
    try {
      const response = await this.http.getClient().post(uri, values)
      if (response.status !== 200) throw new errors.OrdersCreateFailed()

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (err) {
      throw new errors.OrdersCreateFailed()
    }
  }

  async update (options: OrdersRequest): Promise<OrdersResponse> {
    const { orderId, values } = options
    const uri = this.uriHelper.generateBaseUri(`/${orderId}`)
    try {
      const response = await this.http.getClient().put(uri, values)
      if (response.status !== 200) throw new errors.OrdersUpdateFailed()

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (err) {
      throw new errors.OrdersUpdateFailed()
    }
  }

  async getOrderItems (orderId: string): Promise<OrdersResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${orderId}/order_items`)

    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new errors.OrderItemsFetchFailed()

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (err) {
      throw new errors.OrderItemsFetchFailed()
    }
  }

  async deleteOrderItems (query: OrdersQuery): Promise<OrdersResponse> {
    let uri
    if (query.itemId) {
      uri = this.uriHelper.generateBaseUri(`/order_items/${query.itemId}`)
    } else {
      const base = this.uriHelper.generateBaseUri('/order_items')
      uri = this.uriHelper.generateUriWithQuery(base, query)
    }

    try {
      const response = await this.http.getClient().delete(uri)
      if (!allowedStatuses.includes(response.status)) {
        throw new errors.OrderItemsDeleteFailed()
      }

      return { msg: response.data.msg }
    } catch (err) {
      throw new errors.OrderItemsDeleteFailed()
    }
  }

  async createOrderItems (body: OrderItemsCreateRequest): Promise<OrdersResponse> {
    const uri = this.uriHelper.generateBaseUri('/order_items')
    try {
      const response = await this.http.getClient().post(uri, body)
      if (response.status !== 200) throw new errors.OrderItemsCreateFailed()

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (err) {
      throw new errors.OrderItemsCreateFailed()
    }
  }

  async updateOrderItems (body: OrderItemsUpdateRequest): Promise<OrdersResponse> {
    const uri = this.uriHelper.generateBaseUri('/order_items')
    try {
      const response = await this.http.getClient().put(uri, body)
      if (response.status !== 200) throw new errors.OrderItemsUpdateFailed()

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (err) {
      throw new errors.OrderItemsUpdateFailed()
    }
  }

  async updateOrderItem (query: OrderItemUpdateRequest): Promise<OrdersResponse> {
    const { item, itemId } = query
    const uri = this.uriHelper.generateBaseUri(`/order_items/${itemId}`)
    try {
      const response = await this.http.getClient().put(uri, item)
      if (response.status !== 200) throw new errors.OrderItemUpdateFailed()

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (err) {
      throw new errors.OrderItemUpdateFailed()
    }
  }

  async getIncomingOrders (query?: OrdersQuery | undefined): Promise<OrdersResponse> {
    try {
      const extendedQuery = {
        ...query,
        embed: 'location',
        direction: 'incoming'
      }
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, extendedQuery)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new errors.IncomingOrdersFetchFailed()

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (err) {
      throw new errors.IncomingOrdersFetchFailed()
    }
  }

  async getOutgoingOrders (query?: OrdersQuery | undefined): Promise<OrdersResponse> {
    try {
      const extendedQuery = {
        ...query,
        embed: 'location',
        direction: 'outgoing'
      }
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, extendedQuery)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new errors.OutgoingOrdersFetchFailed()

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (err) {
      throw new errors.OutgoingOrdersFetchFailed()
    }
  }

  async getOrderSuggestions (query?: OrdersQuery | undefined): Promise<OrdersResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/suggestions')
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new errors.OrderSuggestionsFetchFailed()

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (err) {
      throw new errors.OrderSuggestionsFetchFailed()
    }
  }

  async getHistoricOrderItems (orderId: string): Promise<OrdersResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri(`/${orderId}/order_items`)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new errors.HistoricOrderItemsFetchFailed()

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (err) {
      throw new errors.HistoricOrderItemsFetchFailed()
    }
  }

  async bookStock (query: BookStockRequest): Promise<OrdersResponse> {
    const { orderId, body } = query
    try {
      const base = this.uriHelper.generateBaseUri(`/order_items/${orderId}/book_stock`)
      const uri = this.uriHelper.generateUriWithQuery(base, { uri: query?.uri })

      const response = await this.http.getClient().post(uri, body)
      if (response.status !== 200) throw new errors.BookStockFailed()

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (err) {
      throw new errors.BookStockFailed()
    }
  }

  async getOpenOrder (query?: OrdersQuery | undefined): Promise<OrdersResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/open')
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new errors.OpenOrderFetchFailed()

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (err) {
      throw new errors.OpenOrderFetchFailed()
    }
  }
}
