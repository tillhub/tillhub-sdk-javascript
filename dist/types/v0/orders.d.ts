import { Client } from '../client';
import { ThBaseHandler } from '../base';
import { UriHelper } from '../uri-helper';
export interface OrdersOptions {
    user?: string;
    base?: string;
}
export interface OrdersQuery {
    limit?: number;
    uri?: string;
    itemId?: string;
    order?: string;
    auto?: boolean;
    suggestion?: boolean;
    order_qty?: number;
    active?: boolean;
    deleted?: boolean;
}
export interface OrdersResponse {
    data?: Array<Record<string, unknown>>;
    metadata?: Record<string, unknown>;
    msg?: string;
}
export interface OrdersUpdateValues {
    id?: string;
    open?: boolean;
    deleted?: boolean;
    ordered_at?: string;
    finalized_at?: string;
    direction?: string;
}
export interface OrdersRequest {
    orderId: string;
    values: OrdersUpdateValues;
}
export interface OrderItem {
    added_at?: string;
    issuer?: Record<string, unknown>;
    order_qty: number;
    auto?: boolean;
    suggestion?: boolean;
    deleted?: boolean;
    product: string;
    stock?: string;
    location?: string;
}
export interface OrderItemCreate extends OrderItem {
    order: string;
}
export interface OrderItemUpdate extends OrderItem {
    id: string;
}
export interface OrderItemsCreateRequest {
    order_items: OrderItemCreate[];
}
export interface OrderItemsUpdateRequest {
    order_items: OrderItemUpdate[];
}
export interface OrderItemUpdateRequest {
    itemId: string;
    item: OrderItemUpdate;
}
export interface BookStockBody {
    qty: number;
}
export interface BookStockRequest {
    orderId: string;
    body: BookStockBody;
    uri?: string;
}
export declare class Orders extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: OrdersOptions;
    uriHelper: UriHelper;
    constructor(options: OrdersOptions, http: Client);
    getAll(query?: OrdersQuery | undefined): Promise<OrdersResponse>;
    create(options: OrdersRequest): Promise<OrdersResponse>;
    update(options: OrdersRequest): Promise<OrdersResponse>;
    getOrderItems(orderId: string): Promise<OrdersResponse>;
    deleteOrderItems(query: OrdersQuery): Promise<OrdersResponse>;
    createOrderItems(body: OrderItemsCreateRequest): Promise<OrdersResponse>;
    updateOrderItems(body: OrderItemsUpdateRequest): Promise<OrdersResponse>;
    updateOrderItem(query: OrderItemUpdateRequest): Promise<OrdersResponse>;
    getIncomingOrders(query?: OrdersQuery | undefined): Promise<OrdersResponse>;
    getOutgoingOrders(query?: OrdersQuery | undefined): Promise<OrdersResponse>;
    getOrderSuggestions(query?: OrdersQuery | undefined): Promise<OrdersResponse>;
    getHistoricOrderItems(orderId: string): Promise<OrdersResponse>;
    bookStock(query: BookStockRequest): Promise<OrdersResponse>;
    getOpenOrder(query?: OrdersQuery | undefined): Promise<OrdersResponse>;
}
