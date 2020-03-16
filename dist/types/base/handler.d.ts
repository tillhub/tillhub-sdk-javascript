import { Client } from '../client';
export interface ThBaseHandlerOptions {
    endpoint: string;
    base: string;
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
export interface ThAnalyticsBaseHandlerJsonReponseItem {
    created_at: {
        iso: string;
        unix: number;
    };
    metric: {
        job: string;
        user: string;
    };
    count: number;
    results: any[];
}
export declare class ThAnalyticsBaseHandler {
    private handlerOptions;
    private client;
    constructor(http: Client, handlerOptions: ThAnalyticsBaseHandlerOptions);
    protected static generateAuthenticatedInstance<T>(type: {
        new (options: object, http: Client): T;
    }, options: ThAnalyticsBaseHandlerOptions, http: Client): T;
    protected handleGet(url: string, query?: object, requestOptions?: object): Promise<ThAnalyticsBaseHandlerJsonReponseItem[]>;
}
