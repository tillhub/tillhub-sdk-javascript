import { ThAnalyticsBaseHandler, ThAnalyticsExportsBaseResponse } from '../../../base';
import { Client } from '../../../client';
import { BaseError } from '../../../errors';
export interface RevenueHandlerOptions {
    user?: string;
    base?: string;
}
export interface AnalyticsReportsRevenuesGroupedResponseItem {
    data: Record<string, unknown>[];
    summary: Record<string, unknown>[];
    metaData: {
        count: number;
        total_count: number;
    };
    next?: () => Promise<AnalyticsReportsRevenuesGroupedResponseItem>;
}
export declare type AnalyticsReportsRevenuesGroupedExportResponseItem = ThAnalyticsExportsBaseResponse;
export declare class AnalyticsReportsRevenuesGrouped extends ThAnalyticsBaseHandler {
    http: Client;
    options: RevenueHandlerOptions;
    constructor(options: RevenueHandlerOptions, http: Client);
    static create(options: Record<string, unknown>, http: Client): AnalyticsReportsRevenuesGrouped;
    getAll(query?: Record<string, unknown>): Promise<AnalyticsReportsRevenuesGroupedResponseItem>;
    export(query?: Record<string, unknown>): Promise<AnalyticsReportsRevenuesGroupedExportResponseItem>;
}
export declare class AnalyticsReportsRevenuesGroupedFetchError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class AnalyticsReportsRevenuesGroupedExportFetchError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
