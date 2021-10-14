import { ThAnalyticsBaseHandler } from '../../../base';
import { Client } from '../../../client';
import { BaseError } from '../../../errors';
export interface TransactionsItemsHandlerOptions {
    user?: string;
    base?: string;
}
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
interface AnalyticsReportsTransactionsItemsExportItem {
    correlationId?: string;
}
interface AnalyticsReportsTransactionsItemsExportResponse {
    data: AnalyticsReportsTransactionsItemsExportItem[];
    metadata: Record<string, unknown>;
    msg?: string;
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
    options: TransactionsItemsHandlerOptions;
    constructor(options: TransactionsItemsHandlerOptions, http: Client);
    static create(options: Record<string, unknown>, http: Client): AnalyticsReportsTransactionsItems;
    getAll(query?: Record<string, unknown>): Promise<AnalyticsReportsTransactionsItemsResponse>;
    export(query?: TransactionsItemsExportOptions): Promise<AnalyticsReportsTransactionsItemsExportResponse>;
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
export {};
