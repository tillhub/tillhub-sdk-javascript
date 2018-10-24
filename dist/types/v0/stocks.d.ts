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
export declare class Stocks {
    endpoint: string;
    http: Client;
    options: StocksOptions;
    constructor(options: StocksOptions, http: Client);
    getAll(query?: StocksQuery | undefined): Promise<StocksResponse>;
    getLocations(query?: StocksQuery | undefined): Promise<StocksResponse>;
}
