import { Client } from '../client';
export interface DeliveriesCreateRequestObject {
    query?: DeliveriesCreateQuery;
    body: DeliveriesCreateBody;
}
export interface DeliveriesUpdateRequestObject {
    query: DeliveriesUpdateQuery;
    body: DeliveriesUpdateBody;
}
export interface DeliveriesOptions {
    user?: string;
    base?: string;
}
export interface DeliveriesGetQuery {
    limit?: number;
    embed?: string[];
    uri?: string;
}
export interface DeliveriesCreateQuery {
    limit?: number;
    embed?: string[];
}
export interface DeliveriesUpdateQuery {
    deliveryId: string;
    embed?: string[];
}
export interface DeliveriesDeleteQuery {
    deliveryId: string;
}
export interface DeliveriesResponse {
    data: object[];
    metadata: object;
    next?: Promise<DeliveriesResponse>;
    msg?: string;
}
export interface DeliveriesCreateBody {
    items: object[];
    order?: string | null;
    open?: boolean;
    deleted?: boolean;
    ordered_at?: string | null;
    received?: boolean;
    delivered?: boolean;
    dispatched?: boolean;
    revoked?: boolean;
    received_at?: string | null;
    dispatched_at?: string | null;
    delivered_at?: string | null;
    revoked_at?: string | null;
    comments?: string | null;
    from?: string | null;
    to?: string | null;
    recipient?: object | null;
    sender?: object | null;
    metadata?: object;
    orders?: object[];
    issuer?: object;
    stock_mode?: string | null;
    status?: string | null;
}
export interface DeliveriesUpdateBody {
    order?: string | null;
    open?: boolean;
    deleted?: boolean;
    ordered_at?: string | null;
    received?: boolean;
    delivered?: boolean;
    dispatched?: boolean;
    revoked?: boolean;
    received_at?: string | null;
    dispatched_at?: string | null;
    delivered_at?: string | null;
    revoked_at?: string | null;
    comments?: string | null;
    from?: string | null;
    to?: string | null;
    recipient?: object | null;
    sender?: object | null;
    metadata?: object;
    orders?: object[];
    issuer?: object;
    stock_mode?: string | null;
    status?: string | null;
}
export declare class Deliveries {
    endpoint: string;
    http: Client;
    options: DeliveriesOptions;
    constructor(options: DeliveriesOptions, http: Client);
    getAll(query?: DeliveriesGetQuery | undefined): Promise<DeliveriesResponse>;
    createDelivery(requestObject: DeliveriesCreateRequestObject): Promise<DeliveriesResponse>;
    updateDelivery(requestObject: DeliveriesUpdateRequestObject): Promise<DeliveriesResponse>;
    deleteDelivery(query: DeliveriesDeleteQuery): Promise<DeliveriesResponse>;
}
