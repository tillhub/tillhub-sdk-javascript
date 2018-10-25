import { Client } from '../client';
export interface StocksOptions {
    user?: string;
    base?: string;
}
export interface StocksQuery {
    limit?: number;
    uri?: string;
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
export interface StocksUpdateRequestObject {
    stockId: string;
    body: Stock;
}
export declare class Stocks {
    endpoint: string;
    http: Client;
    options: StocksOptions;
    constructor(options: StocksOptions, http: Client);
    getAll(query?: StocksQuery | undefined): Promise<StocksResponse>;
    create(stock: Stock): Promise<StocksResponse>;
    update(requestObject: StocksUpdateRequestObject): Promise<StocksResponse>;
    getLocations(query?: StocksQuery | undefined): Promise<StocksResponse>;
}
