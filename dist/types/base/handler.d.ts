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
    private readonly handlerOptions;
    private readonly client;
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
    values: any[];
}
export interface ThAnalyticsBaseResponse {
    results: ThAnalyticsBaseResultItem[];
    status: number;
    next?: string;
}
export interface ThAnalyticsExportsBaseResponse {
    url: string;
    filename?: string;
    expires_at?: string;
}
export interface ThAnalyticsSocketsExportsBaseResponse {
    correlationId?: string;
}
export interface AnalyticsSocketsExportResponseItem {
    data: ThAnalyticsSocketsExportsBaseResponse[];
    metadata: Record<string, unknown>;
}
export declare class ThAnalyticsBaseHandler {
    private readonly handlerOptions;
    private readonly client;
    constructor(http: Client, handlerOptions: ThAnalyticsBaseHandlerOptions);
    protected static generateAuthenticatedInstance<T>(Type: new (options: ThAnalyticsBaseHandlerOptions, http: Client) => T, options: ThAnalyticsBaseHandlerOptions, http: Client): T;
    private static generateUriWithQuery;
    protected handleGet(url: string, query?: HandlerQuery, requestOptions?: any): Promise<ThAnalyticsBaseResponse>;
    protected handleExport(url: string, query?: HandlerQuery, requestOptions?: any): Promise<ThAnalyticsExportsBaseResponse>;
    protected handleSocketsExport(url: string, query?: HandlerQuery, requestOptions?: any): Promise<AnalyticsSocketsExportResponseItem>;
}
