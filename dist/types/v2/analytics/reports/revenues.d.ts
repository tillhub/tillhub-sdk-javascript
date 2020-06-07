import { ThAnalyticsBaseHandler, ThAnalyticsExportsBaseResponse } from '../../../base';
import { Client } from '../../../client';
import { BaseError } from '../../../errors';
export interface RevenueHandlerOptions {
    user?: string;
    base?: string;
}
export interface AnalyticsReportsRevenuesGroupedResponseItem {
    data: object[];
    summary: object[];
    metaData: {
        count: number;
        total_count: number;
    };
    next?: () => Promise<AnalyticsReportsRevenuesGroupedResponseItem>;
}
export interface AnalyticsReportsRevenuesGroupedExportResponseItem extends ThAnalyticsExportsBaseResponse {
}
export declare class AnalyticsReportsRevenuesGrouped extends ThAnalyticsBaseHandler {
    http: Client;
    options: RevenueHandlerOptions;
    constructor(options: RevenueHandlerOptions, http: Client);
    static create(options: object, http: Client): AnalyticsReportsRevenuesGrouped;
    getAll(query?: object): Promise<AnalyticsReportsRevenuesGroupedResponseItem>;
    export(query?: object): Promise<AnalyticsReportsRevenuesGroupedExportResponseItem>;
}
export declare class AnalyticsReportsRevenuesGroupedFetchError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class AnalyticsReportsRevenuesGroupedExportFetchError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
