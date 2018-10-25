import { Client } from '../client';
export interface OrdersOptions {
    user?: string;
    base?: string;
}
export interface OrdersQuery {
    limit?: number;
    uri?: string;
}
export interface OrdersResponse {
    data: object[];
    metadata: object;
}
export declare class Orders {
    endpoint: string;
    http: Client;
    options: OrdersOptions;
    constructor(options: OrdersOptions, http: Client);
    getAll(query?: OrdersQuery | undefined): Promise<OrdersResponse>;
    getIncomingOrders(query?: OrdersQuery | undefined): Promise<OrdersResponse>;
    getOutgoingOrders(query?: OrdersQuery | undefined): Promise<OrdersResponse>;
}
