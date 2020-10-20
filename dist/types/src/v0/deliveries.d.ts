import { Client } from '../client';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
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
    items: Array<Record<string, unknown>>;
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
    recipient?: Record<string, unknown> | null;
    sender?: Record<string, unknown> | null;
    metadata?: Record<string, unknown>;
    orders?: Array<Record<string, unknown>>;
    issuer?: Record<string, unknown>;
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
    recipient?: Record<string, unknown> | null;
    sender?: Record<string, unknown> | null;
    metadata?: Record<string, unknown>;
    orders?: Array<Record<string, unknown>>;
    issuer?: Record<string, unknown>;
    stock_mode?: string | null;
    status?: string | null;
}
export interface DeliveriesSimpleUpdateRequestBody {
    deliveryId: string;
    query?: DeliveriesQuery;
}
export interface DeliveryItemsCreateRequestObject {
    body: DeliveryItemsCreateBody;
    query?: DeliveriesQuery;
}
export interface DeliveryItemsCreateBody {
    items: Array<Record<string, unknown>>;
}
export interface DeliveryItemsCreateBodyItem {
    product: string;
    delivery: string;
    position?: number;
    qty?: number | null;
    qty_picked?: number | null;
    stock?: string;
    stock_location?: string;
    added_at?: string;
    comments?: string | null;
}
export interface DeliveryItemsGetAllRequestObject {
    deliveryId: string;
    query?: DeliveriesQuery;
}
export interface DeliveryItemUpdateRequestObject {
    itemId: string;
    body: DeliveryItemsUpdateBody;
    query?: DeliveriesQuery;
}
export interface DeliveryItemsUpdateBody {
    product?: string;
    delivery?: string;
    position?: number;
    qty?: number | null;
    qty_picked?: number | null;
    stock?: string;
    stock_location?: string;
    added_at?: string;
    comments?: string | null;
}
export interface DeliveriesResponse {
    data?: Array<Record<string, unknown>>;
    metadata?: Record<string, unknown>;
    next?: () => Promise<DeliveriesResponse>;
    msg?: string;
}
export declare class Deliveries extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: DeliveriesOptions;
    uriHelper: UriHelper;
    constructor(options: DeliveriesOptions, http: Client);
    generateUriQueryEmbed(base: string, query?: DeliveriesQuery): string;
    getAll(query?: DeliveriesQuery | undefined): Promise<DeliveriesResponse>;
    getOne(requestObject: DeliveriesGetOneRequestObject): Promise<DeliveriesResponse>;
    createDelivery(requestObject: DeliveriesCreateRequestObject): Promise<DeliveriesResponse>;
    createDeliveryPDF(deliveryId: string): Promise<DeliveriesResponse>;
    updateDelivery(requestObject: DeliveriesUpdateRequestObject): Promise<DeliveriesResponse>;
    setInProgress(requestObject: DeliveriesSimpleUpdateRequestBody): Promise<DeliveriesResponse>;
    dispatchDelivery(requestObject: DeliveriesSimpleUpdateRequestBody): Promise<DeliveriesResponse>;
    deleteDelivery(deliveryId: string): Promise<DeliveriesResponse>;
    createDeliveryItems(requestObject: DeliveryItemsCreateRequestObject): Promise<DeliveriesResponse>;
    getAllDeliveryItems(requestObject: DeliveryItemsGetAllRequestObject): Promise<DeliveriesResponse>;
    updateDeliveryItem(requestObject: DeliveryItemUpdateRequestObject): Promise<DeliveriesResponse>;
    deleteDeliveryItem(itemId: string): Promise<DeliveriesResponse>;
}
