import { ThAnalyticsBaseHandler, ThAnalyticsExportsBaseResponse } from '../../../base';
import { Client } from '../../../client';
import { BaseError } from '../../../errors';
export interface TransactionsHandlerOptions {
    user?: string;
    base?: string;
}
export interface AnalyticsReportsTransactionsOverviewResponseItem {
    data: Record<string, unknown>[];
    summary: Record<string, unknown>[];
    metaData: {
        count: number;
        total_count: number;
    };
    next?: () => Promise<AnalyticsReportsTransactionsOverviewResponseItem>;
}
export interface AnalyticsReportsTransactionDetailResponseItem {
    data: Record<string, unknown>;
    metaData: {
        count: number;
        total_count: number;
    };
}
export declare type AnalyticsReportsTraansactionsOverviewExportResponseItem = ThAnalyticsExportsBaseResponse;
export declare class AnalyticsReportsTransactionsOverview extends ThAnalyticsBaseHandler {
    http: Client;
    options: TransactionsHandlerOptions;
    constructor(options: TransactionsHandlerOptions, http: Client);
    static create(options: Record<string, unknown>, http: Client): AnalyticsReportsTransactionsOverview;
    getAll(query?: Record<string, unknown>): Promise<AnalyticsReportsTransactionsOverviewResponseItem>;
    export(query?: Record<string, unknown>): Promise<AnalyticsReportsTraansactionsOverviewExportResponseItem>;
}
export declare class AnalyticsReportsTransactionsDetail extends ThAnalyticsBaseHandler {
    http: Client;
    options: TransactionsHandlerOptions;
    constructor(options: TransactionsHandlerOptions, http: Client);
    static create(options: Record<string, unknown>, http: Client): AnalyticsReportsTransactionsDetail;
    get(id?: string): Promise<AnalyticsReportsTransactionDetailResponseItem>;
}
export declare class AnalyticsReportsTransactionsOverviewFetchError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class AnalyticsReportsTransactionDetailFetcshError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class AnalyticsReportsTransactionsOverviewExportFetchError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
