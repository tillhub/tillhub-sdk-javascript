import { Client } from '../client';
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
}
export interface OrdersResponse {
    data: object[];
    metadata: object;
    msg?: string;
}
export interface OrdersUpdateValues {
    id?: string;
    open?: boolean;
    deleted?: boolean;
    ordered_at?: string;
    finalized_at?: string;
}
export interface OrdersUpdateRequest {
    orderId: string;
    values: OrdersUpdateValues;
}
export interface OrderItems {
    added_at: string;
    issuer: object;
    order_qty: number;
    auto: boolean;
    suggestion: boolean;
    deleted?: boolean;
    order: string;
    product: string;
    stock?: string;
    location: string;
}
export interface OrderItemsCreateRequest {
    order_items: OrderItems[];
}
export interface BookStockBody {
    qty: number;
}
export interface BookStockRequest {
    orderId: string;
    body: BookStockBody;
    uri?: string;
}
export declare class Orders {
    endpoint: string;
    http: Client;
    options: OrdersOptions;
    constructor(options: OrdersOptions, http: Client);
    getAll(query?: OrdersQuery | undefined): Promise<OrdersResponse>;
    update(options: OrdersUpdateRequest): Promise<OrdersResponse>;
    getOrderItems(orderId: string | undefined): Promise<OrdersResponse>;
    deleteOrderItems(query: OrdersQuery): Promise<OrdersResponse>;
    createOrderItems(body: OrderItemsCreateRequest): Promise<OrdersResponse>;
    updateOrderItems(items: OrderItems[]): Promise<OrdersResponse>;
    getIncomingOrders(query?: OrdersQuery | undefined): Promise<OrdersResponse>;
    getOutgoingOrders(query?: OrdersQuery | undefined): Promise<OrdersResponse>;
    getOrderSuggestions(query?: OrdersQuery | undefined): Promise<OrdersResponse>;
    getHistoricOrderItems(orderId?: string | undefined): Promise<OrdersResponse>;
    bookStock(query: BookStockRequest): Promise<OrdersResponse>;
    getOpenOrder(query?: OrdersQuery | undefined): Promise<OrdersResponse>;
}
