import { ThAnalyticsBaseHandler, ThAnalyticsExportsBaseResponse } from '../../../base';
import { Client } from '../../../client';
import { BaseError } from '../../../errors';
import { AnalyticsOptions } from '../../../v0/analytics';
export interface AnalyticsReportsRevenuesGroupedResponseItem {
    data: Array<Record<string, unknown>>;
    summary: Array<Record<string, unknown>>;
    metaData: {
        count?: number;
        total_count?: number;
    };
    next?: () => Promise<AnalyticsReportsRevenuesGroupedResponseItem>;
}
export declare type AnalyticsReportsRevenuesGroupedExportResponseItem = ThAnalyticsExportsBaseResponse;
export declare class AnalyticsReportsRevenuesGrouped extends ThAnalyticsBaseHandler {
    http: Client;
    options: AnalyticsOptions;
    timeout: AnalyticsOptions['timeout'];
    constructor(options: AnalyticsOptions, http: Client);
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
