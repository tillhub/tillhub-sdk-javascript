import { Client } from '../../../client';
import { BaseError } from '../../../errors';
import { UriHelper } from '../../../uri-helper';
export interface AnalyticsReportsStocksV3ExportResponseItem {
    correlationId?: string;
}
export interface AnalyticsResponse {
    data: AnalyticsReportsStocksV3ExportResponseItem[];
    metadata: Record<string, unknown>;
    msg?: string;
}
export interface AnalyticsOptions {
    user?: string;
    base?: string;
}
export interface StocksExportOptions {
    format?: string;
    branch_number?: number;
}
export declare class AnalyticsReportsStocks {
    endpoint: string;
    http: Client;
    options: AnalyticsOptions;
    uriHelper: UriHelper;
    constructor(options: AnalyticsOptions, http: Client);
    getAll(query?: StocksExportOptions | undefined): Promise<AnalyticsResponse>;
}
export declare class AnalyticsReportsStocksFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
