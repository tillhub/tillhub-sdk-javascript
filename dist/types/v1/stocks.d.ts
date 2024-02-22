import { Client } from '../client';
import { ThBaseHandler } from '../base';
import { UriHelper } from '../uri-helper';
import { StocksOptions, StocksBookQuery, StocksResponse } from '../v0/stocks';
export declare class StocksBook extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: StocksOptions;
    uriHelper: UriHelper;
    constructor(options: StocksOptions, http: Client);
    getAll(query?: StocksBookQuery | undefined): Promise<StocksResponse>;
    meta(query?: StocksBookQuery | undefined): Promise<StocksResponse>;
}
