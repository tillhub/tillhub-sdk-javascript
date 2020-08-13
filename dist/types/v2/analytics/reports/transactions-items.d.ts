import { ThAnalyticsBaseHandler } from '../../../base';
import { Client } from '../../../client';
import { BaseError } from '../../../errors';
export interface TransactionsItemsHandlerOptions {
    user?: string;
    base?: string;
}
export interface AnalyticsReportsTransactionsItemsResponse {
    data: Record<string, unknown>[];
    summary: Record<string, unknown>[];
    metaData: {
        count: number;
        total_count: number;
    };
    next?: () => Promise<AnalyticsReportsTransactionsItemsResponse>;
}
export declare class AnalyticsReportsTransactionsItems extends ThAnalyticsBaseHandler {
    http: Client;
    options: TransactionsItemsHandlerOptions;
    constructor(options: TransactionsItemsHandlerOptions, http: Client);
    static create(options: Record<string, unknown>, http: Client): AnalyticsReportsTransactionsItems;
    getAll(query?: Record<string, unknown>): Promise<AnalyticsReportsTransactionsItemsResponse>;
}
export declare class AnalyticsReportsTransactionsItemsFetchError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
