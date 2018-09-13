import { Client } from '../client';
export interface DeliveriesOptions {
    user?: string;
    base?: string;
}
export interface DeliveriesQuery {
    limit?: number;
    embed?: string[];
    uri?: string;
}
export interface DeliveriesGetOneRequestObject {
    deliveryId: string;
    query?: DeliveriesQuery;
}
export interface DeliveriesCreateRequestObject {
    body: DeliveriesCreateBody;
    query?: DeliveriesQuery;
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
export interface DeliveriesUpdateRequestObject {
    body: DeliveriesUpdateBody;
    deliveryId: string;
    query?: DeliveriesQuery;
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
export interface DeliveriesSimpleUpdateRequestBody {
    deliveryId: string;
    query?: DeliveriesQuery;
}
export interface DeliveriesResponse {
    data: object[];
    metadata: object;
    next?: Promise<DeliveriesResponse>;
    msg?: string;
}
export declare class Deliveries {
    endpoint: string;
    http: Client;
    options: DeliveriesOptions;
    constructor(options: DeliveriesOptions, http: Client);
    getAll(query?: DeliveriesQuery | undefined): Promise<DeliveriesResponse>;
    getOne(requestObject: DeliveriesGetOneRequestObject): Promise<DeliveriesResponse>;
    createDelivery(requestObject: DeliveriesCreateRequestObject): Promise<DeliveriesResponse>;
    updateDelivery(requestObject: DeliveriesUpdateRequestObject): Promise<DeliveriesResponse>;
    setInProgress(requestObject: DeliveriesSimpleUpdateRequestBody): Promise<DeliveriesResponse>;
    dispatchDelivery(requestObject: DeliveriesSimpleUpdateRequestBody): Promise<DeliveriesResponse>;
    deleteDelivery(deliveryId: string): Promise<DeliveriesResponse>;
}
