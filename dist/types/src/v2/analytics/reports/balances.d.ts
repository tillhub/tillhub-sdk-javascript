import { ThAnalyticsBaseHandler, ThAnalyticsExportsBaseResponse } from '../../../base';
import { Client } from '../../../client';
import { BaseError } from '../../../errors';
export interface BalancesHandlerOptions {
    user?: string;
    base?: string;
}
export interface AnalyticsReportsBalancesOverviewResponseItem {
    data: Array<Record<string, unknown>>;
    summary: Array<Record<string, unknown>>;
    metaData: {
        count: number;
        total_count: number;
    };
    next?: () => Promise<AnalyticsReportsBalancesOverviewResponseItem>;
}
export interface AnalyticsReportsBalancesDetailResponseItem {
    data: Record<string, unknown>;
    metaData: {
        count: number;
        total_count: number;
    };
}
export declare type AnalyticsReportsBalancesOverviewExportResponseItem = ThAnalyticsExportsBaseResponse;
export declare class AnalyticsReportsBalancesOverview extends ThAnalyticsBaseHandler {
    http: Client;
    options: BalancesHandlerOptions;
    constructor(options: BalancesHandlerOptions, http: Client);
    static create(options: Record<string, unknown>, http: Client): AnalyticsReportsBalancesOverview;
    getAll(query?: Record<string, unknown>): Promise<AnalyticsReportsBalancesOverviewResponseItem>;
    export(query?: Record<string, unknown>): Promise<AnalyticsReportsBalancesOverviewExportResponseItem>;
}
export declare class AnalyticsReportsBalancesDetail extends ThAnalyticsBaseHandler {
    http: Client;
    options: BalancesHandlerOptions;
    constructor(options: BalancesHandlerOptions, http: Client);
    static create(options: Record<string, unknown>, http: Client): AnalyticsReportsBalancesDetail;
    get(id: string): Promise<AnalyticsReportsBalancesDetailResponseItem>;
}
export declare class AnalyticsReportsBalancesOverviewFetchError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class AnalyticsReportsTransactionDetailFetcshError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class AnalyticsReportsBalancesOverviewExportFetchError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
