import { Client } from '../client';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
import { BaseError } from '../errors';
export interface StockTakingsOptions {
    user?: string;
    base?: string;
}
export interface StockTakingsQueryOptions {
    limit?: number;
    uri?: string;
    query?: {
        deleted?: boolean;
        start?: string;
        q?: string;
        cursor_field?: string;
    };
    format?: string;
}
export interface StockTakingsResponse {
    data: StockTaking[];
    metadata: Record<string, unknown>;
    next?: () => Promise<StockTakingsResponse>;
}
export interface StockTakingResponse {
    data?: StockTaking;
    metadata?: Record<string, unknown>;
    msg?: string;
}
export interface StockTaking {
    name?: string;
    description?: string;
    processes?: string[];
    deleted?: boolean;
}
export declare class StockTakings extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: StockTakingsOptions;
    uriHelper: UriHelper;
    constructor(options: StockTakingsOptions, http: Client);
    create(stockTaking: StockTaking): Promise<StockTakingResponse>;
    getAll(query?: StockTakingsQueryOptions): Promise<StockTakingsResponse>;
    get(stockTakingId: string, query?: StockTakingsQueryOptions): Promise<StockTakingResponse>;
    update(stockTakingId: string, stockTaking: StockTaking): Promise<StockTakingResponse>;
    delete(stockTakingId: string): Promise<StockTakingResponse>;
    meta(query?: StockTakingsQueryOptions): Promise<StockTakingsResponse>;
}
export declare class StockTakingsFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class StockTakingsFetchOneFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class StockTakingsUpdateFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class StockTakingsCreationFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class StockTakingsDeleteFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class StockTakingsMetaFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
