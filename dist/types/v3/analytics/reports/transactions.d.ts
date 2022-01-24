import { ThAnalyticsBaseHandler, AnalyticsSocketsExportResponseItem } from '../../../base';
import { Client } from '../../../client';
import { BaseError } from '../../../errors';
import { AnalyticsOptions } from '../../../v0/analytics';
export interface AnalyticsReportsTransactionsOverviewResponseItem {
    data: Array<Record<string, unknown>>;
    summary: Array<Record<string, unknown>>;
    metaData: {
        count: number;
        total_count: number;
    };
    next?: () => Promise<AnalyticsReportsTransactionsOverviewResponseItem>;
}
export declare class AnalyticsReportsTransactions extends ThAnalyticsBaseHandler {
    http: Client;
    options: AnalyticsOptions;
    timeout: AnalyticsOptions['timeout'];
    constructor(options: AnalyticsOptions, http: Client);
    static create(options: Record<string, unknown>, http: Client): AnalyticsReportsTransactions;
    getAll(query?: Record<string, unknown>): Promise<AnalyticsReportsTransactionsOverviewResponseItem>;
    export(query?: Record<string, unknown>): Promise<AnalyticsSocketsExportResponseItem>;
}
export declare class AnalyticsReportsTransactionsOverviewFetchError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class AnalyticsReportsV3TransactionsExportFetchError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
