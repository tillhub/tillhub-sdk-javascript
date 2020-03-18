import { Client } from '../client';
export interface ThBaseHandlerOptions {
    endpoint: string;
    base: string;
}
export interface HandlerQuery {
    uri?: string;
    limit?: number;
    offset?: number;
    query?: any;
    [key: string]: any;
}
export declare class ThBaseHandler {
    private handlerOptions;
    private client;
    constructor(http: Client, handlerOptions: ThBaseHandlerOptions);
}
export interface ThAnalyticsBaseHandlerOptions {
    user?: string;
    base?: string;
}
export interface ThAnalyticsBaseResultItem {
    created_at: {
        iso: string;
        unix: number;
    };
    metric: {
        job: string;
        user: string;
        type?: string;
    };
    count: number;
    values: object[];
}
export declare type ThAnalyticsBaseResponse = ThAnalyticsBaseResultItem[];
export declare class ThAnalyticsBaseHandler {
    private handlerOptions;
    private client;
    constructor(http: Client, handlerOptions: ThAnalyticsBaseHandlerOptions);
    protected static generateAuthenticatedInstance<T>(type: {
        new (options: object, http: Client): T;
    }, options: ThAnalyticsBaseHandlerOptions, http: Client): T;
    private static generateUriWithQuery;
    protected handleGet(url: string, query?: HandlerQuery, requestOptions?: object): Promise<ThAnalyticsBaseResponse>;
}
