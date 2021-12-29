import { Client } from '../../../client';
import { BaseError } from '../../../errors';
import { UriHelper } from '../../../uri-helper';
import { AnalyticsOptions } from '../../../v0/analytics';
export interface AnalyticsReportsStocksV3ExportResponseItem {
    correlationId?: string;
}
export interface AnalyticsResponse {
    data: AnalyticsReportsStocksV3ExportResponseItem[];
    metadata: Record<string, unknown>;
    msg?: string;
    next?: () => Promise<AnalyticsResponse>;
}
export interface StocksExportOptions {
    format?: string;
    branch_number?: number;
    uri?: string;
}
export declare class AnalyticsReportsStocks {
    endpoint: string;
    http: Client;
    options: AnalyticsOptions;
    uriHelper: UriHelper;
    timeout: AnalyticsOptions['timeout'];
    constructor(options: AnalyticsOptions, http: Client);
    getAll(query?: StocksExportOptions | undefined): Promise<AnalyticsResponse>;
}
export declare class AnalyticsReportsStocksFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
