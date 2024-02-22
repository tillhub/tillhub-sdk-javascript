import { Client } from '../client';
import { BaseError } from '../errors/baseError';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface StocksOptions {
    user?: string;
    base?: string;
}
export interface StocksQuery {
    limit?: number;
    uri?: string;
    deleted?: boolean;
}
export interface StocksBookQuery {
    limit?: number;
    uri?: string;
    embed?: string[];
    start?: string;
    end?: string;
    product?: string;
    location?: string;
    to?: string;
    from?: string;
    branch?: string;
    format?: string;
    product_group?: string;
    q?: string;
}
export interface StocksResponse {
    data?: Array<Record<string, unknown>>;
    metadata?: Record<string, unknown>;
    msg?: string;
    next?: () => Promise<StocksResponse>;
}
export interface Stock {
    product: string;
    location: string;
    location_type: string | null;
    qty: number;
}
export interface Location {
    id?: string;
    name?: string;
    insert_id?: number;
    type?: string;
    created_at?: Record<string, unknown>;
    location_type?: string | null;
    qty?: number;
}
export interface StocksUpdateRequestObject {
    stockId: string;
    body: Stock;
}
export interface TransferRequestObject {
    product: string;
    qty: number;
    from: TransferLocation;
    to: TransferLocation;
}
export interface TransferLocation {
    id: string;
    location_type?: string;
}
export declare class Stocks extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: StocksOptions;
    uriHelper: UriHelper;
    constructor(options: StocksOptions, http: Client);
    getAll(query?: StocksQuery | undefined): Promise<StocksResponse>;
    create(stock: Stock): Promise<StocksResponse>;
    update(requestObject: StocksUpdateRequestObject): Promise<StocksResponse>;
    getLocations(query?: StocksQuery | undefined): Promise<StocksResponse>;
    getOneLocation(locationId: string): Promise<StocksResponse>;
    transfer(body: TransferRequestObject): Promise<StocksResponse>;
}
export declare class StocksBook {
    endpoint: string;
    http: Client;
    options: StocksOptions;
    uriHelper: UriHelper;
    constructor(options: StocksOptions, http: Client);
    getAll(query?: StocksBookQuery | undefined): Promise<StocksResponse>;
    meta(query?: StocksBookQuery | undefined): Promise<StocksResponse>;
}
export declare class StocksBookFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class StocksBookGetMetaFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
