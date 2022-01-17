import { ThAnalyticsBaseHandler, AnalyticsSocketsExportResponseItem } from '../../../base';
import { Client } from '../../../client';
import { BaseError } from '../../../errors';
import { AnalyticsOptions } from '../../../v0/analytics';
export interface TransactionsItemsExportOptions {
    format?: string;
    uri?: string;
    register_custom_id?: string;
    register?: string;
    product?: string;
    branch?: string;
    limit?: number;
    dates?: {
        start?: string;
        end?: string;
    };
}
export interface AnalyticsReportsTransactionsItemsResponse {
    data: Array<Record<string, unknown>>;
    summary: Array<Record<string, unknown>>;
    metaData: {
        count: number;
        total_count: number;
    };
    next?: () => Promise<AnalyticsReportsTransactionsItemsResponse>;
}
export declare class AnalyticsReportsTransactionsItems extends ThAnalyticsBaseHandler {
    http: Client;
    options: AnalyticsOptions;
    timeout: AnalyticsOptions['timeout'];
    constructor(options: AnalyticsOptions, http: Client);
    static create(options: Record<string, unknown>, http: Client): AnalyticsReportsTransactionsItems;
    getAll(query?: Record<string, unknown>): Promise<AnalyticsReportsTransactionsItemsResponse>;
    export(query?: TransactionsItemsExportOptions): Promise<AnalyticsSocketsExportResponseItem>;
}
export declare class AnalyticsReportsTransactionsItemsFetchError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class AnalyticsReportsTransactionsItemsExportError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
