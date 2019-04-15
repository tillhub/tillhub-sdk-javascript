import { Client } from '../client';
import { UriHelper } from '../uri-helper';
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
}
export interface StocksResponse {
    data: object[];
    metadata: object;
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
    created_at?: Object;
    location_type?: string | null;
    qty?: number;
}
export interface StocksUpdateRequestObject {
    stockId: string;
    body: Stock;
}
export declare class Stocks {
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
}
export declare class StocksBook {
    endpoint: string;
    http: Client;
    options: StocksOptions;
    uriHelper: UriHelper;
    constructor(options: StocksOptions, http: Client);
    getAll(query?: StocksBookQuery | undefined): Promise<StocksResponse>;
    meta(): Promise<StocksResponse>;
}
