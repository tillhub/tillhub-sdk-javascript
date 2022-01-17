import { ThAnalyticsBaseHandler, AnalyticsSocketsExportResponseItem } from '../../../base';
import { Client } from '../../../client';
import { BaseError } from '../../../errors';
import { AnalyticsOptions } from '../../../v0/analytics';
interface AnalyticsReportsStocksResponseItem {
    data: Array<Record<string, unknown>>;
    metaData: {
        count?: number;
        total_count?: number;
    };
    next?: () => Promise<AnalyticsReportsStocksResponseItem>;
}
export interface StocksExportOptions {
    format?: string;
    branch_number?: number;
    uri?: string;
}
export declare class AnalyticsReportsStocks extends ThAnalyticsBaseHandler {
    http: Client;
    options: AnalyticsOptions;
    timeout: AnalyticsOptions['timeout'];
    constructor(options: AnalyticsOptions, http: Client);
    static create(options: Record<string, unknown>, http: Client): AnalyticsReportsStocks;
    getAll(query?: StocksExportOptions | undefined): Promise<AnalyticsReportsStocksResponseItem>;
    export(query?: StocksExportOptions): Promise<AnalyticsSocketsExportResponseItem>;
}
export declare class AnalyticsReportsStocksFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class AnalyticsReportsStocksExportFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export {};
