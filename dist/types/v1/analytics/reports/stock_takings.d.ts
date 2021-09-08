import { ThAnalyticsBaseHandler } from '../../../base';
import { StockTakingsQueryOptions } from '../../../v0/stock_takings';
import { Client } from '../../../client';
import { BaseError } from '../../../errors';
export interface StockTakingsHandlerOptions {
    user?: string;
    base?: string;
}
export interface AnalyticsReportsStockTakingsV1ExportResponseItem {
    correlationId?: string;
}
export interface AnalyticsResponse {
    data: AnalyticsReportsStockTakingsV1ExportResponseItem[];
    metadata: Record<string, unknown>;
    msg?: string;
}
export declare class AnalyticsReportsStockTakings extends ThAnalyticsBaseHandler {
    http: Client;
    options: StockTakingsHandlerOptions;
    constructor(options: StockTakingsHandlerOptions, http: Client);
    static create(options: Record<string, unknown>, http: Client): AnalyticsReportsStockTakings;
    getAll(query?: StockTakingsQueryOptions): Promise<AnalyticsResponse>;
}
export declare class AnalyticsReportsV1StockTakingsFetchError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
