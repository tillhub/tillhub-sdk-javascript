import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'


export interface OrdersOptions {
    user?: string
    base?: string
}

export interface OrdersResponse {
    data: Order[]
    metadata: Record<string, unknown>
    next?: () => Promise<OrdersResponse>
}

export interface OrdersQuery {
    limit?: number
    uri?: string
    query?: {
        deleted?: boolean
        active?: boolean
        extended?: boolean
        location?: string
    }
}

declare type RecurringFormatType = 'scheduled' | 'unscheduled' | 'oneclick'
declare type ReturnFormatType = 'refundable' | 'capturable' | 'cancellable'

export interface Order {
    id?: string
    orderStatus?: string
    totalAmount?: number | null
    currency?: string | null
    salesChannel?: string | null
    origin?: string | null
    recurring?: RecurringFormatType | null
    returnable?: ReturnFormatType | null
}

export class Orders extends ThBaseHandler {
    public static baseEndpoint = '/api/v2/orders'
    endpoint: string
    http: Client
    public options: OrdersOptions
    public uriHelper: UriHelper

    constructor (options: OrdersOptions, http: Client) {
        super(http, {
          endpoint: Orders.baseEndpoint,
          base: options.base ?? 'https://api.tillhub.com'
        })
        this.options = options
        this.http = http
    
        this.endpoint = Orders.baseEndpoint
        this.options.base = this.options.base ?? 'https://api.tillhub.com'
        this.uriHelper = new UriHelper(this.endpoint, this.options)
    }

    async getAll (query?: OrdersQuery | undefined): Promise<OrdersResponse> {
        let next
        const base = this.uriHelper.generateBaseUri()
        const uri = this.uriHelper.generateUriWithQuery(base, query)
    
        try {
            const response = await this.http.getClient().get(uri)
            if (response.status !== 200) {
                throw new OrdersFetchFailed(undefined, { status: response.status })
            }
    
            if (response.data.cursor?.next) {
                next = (): Promise<OrdersResponse> => this.getAll({ uri: response.data.cursor.next })
            }
    
            return {
                data: response.data.results,
                metadata: { cursor: response.data.cursor },
                next
            }
        } catch (error: any) {
            throw new OrdersFetchFailed(error.message, { error })
        }
    }

    async get (orderId: string, query: OrdersQuery): Promise<OrdersResponse> {
        const base = this.uriHelper.generateBaseUri(`/${orderId}`)
        const uri = this.uriHelper.generateUriWithQuery(base, query)
    
        try {
            const response = await this.http.getClient().get(uri)
    
            if (response.status !== 200) {
                throw new OrderFetchFailed(undefined, { status: response.status })
            }
            return {
                data: response.data.results[0] as Order,
                msg: response.data.msg,
                metadata: { count: response.data.count }
            }
        } catch (error: any) {
            throw new OrderFetchFailed(error.message, { error })
        }
      }

}

export class OrdersFetchFailed extends BaseError {
    public name = 'OrdersFetchFailed'
    constructor (
        public message: string = 'Could not fetch orders',
        properties?: Record<string, unknown>
    ) {
        super(message, properties)
        Object.setPrototypeOf(this, OrdersFetchFailed.prototype)
    }
}

export class OrderFetchFailed extends BaseError {
    public name = 'OrderFetchFailed'
    constructor (
        public message: string = 'Could not fetch order',
        properties?: Record<string, unknown>
    ) {
        super(message, properties)
        Object.setPrototypeOf(this, OrderFetchFailed.prototype)
    }
}