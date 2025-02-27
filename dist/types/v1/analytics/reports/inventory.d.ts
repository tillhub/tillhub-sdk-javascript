import { ThAnalyticsBaseHandler, ThAnalyticsExportsBaseResponse } from '../../../base';
import { Client } from '../../../client';
import { BaseError } from '../../../errors';
import { AnalyticsOptions } from '../../../v0/analytics';
export interface AnalyticsReportsInventoryResponseItem {
    data: Array<Record<string, unknown>>;
    summary: Array<Record<string, unknown>>;
    metadata: {
        count?: number;
        total_count?: number;
    };
    next?: () => Promise<AnalyticsReportsInventoryResponseItem>;
}
export declare type AnalyticsReportsInventoryExportResponseItem = ThAnalyticsExportsBaseResponse;
export declare class AnalyticsReportsInventory extends ThAnalyticsBaseHandler {
    http: Client;
    options: AnalyticsOptions;
    timeout: AnalyticsOptions['timeout'];
    constructor(options: AnalyticsOptions, http: Client);
    static create(options: Record<string, unknown>, http: Client): AnalyticsReportsInventory;
    getAll(query?: Record<string, unknown>): Promise<AnalyticsReportsInventoryResponseItem>;
}
export declare class AnalyticsReportsInventoryFetchError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class AnalyticsReportsInventoryExportFetchError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
