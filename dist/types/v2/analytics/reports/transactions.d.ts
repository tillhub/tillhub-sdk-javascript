import { ThAnalyticsBaseHandler, ThAnalyticsExportsBaseResponse } from '../../../base';
import { Client } from '../../../client';
import { BaseError } from '../../../errors';
export interface TransactionsHandlerOptions {
    user?: string;
    base?: string;
}
export interface AnalyticsReportsTransactionsOverviewResponseItem {
    data: object[];
    summary: object[];
    metaData: {
        count: number;
        total_count: number;
    };
    next?: () => Promise<AnalyticsReportsTransactionsOverviewResponseItem>;
}
export interface AnalyticsReportsTransactionDetailResponseItem {
    data: object;
    metaData: {
        count: number;
        total_count: number;
    };
}
export interface AnalyticsReportsTraansactionsOverviewExportResponseItem extends ThAnalyticsExportsBaseResponse {
}
export declare class AnalyticsReportsTransactionsOverview extends ThAnalyticsBaseHandler {
    http: Client;
    options: TransactionsHandlerOptions;
    constructor(options: TransactionsHandlerOptions, http: Client);
    static create(options: object, http: Client): AnalyticsReportsTransactionsOverview;
    getAll(query?: object): Promise<AnalyticsReportsTransactionsOverviewResponseItem>;
    export(query?: object): Promise<AnalyticsReportsTraansactionsOverviewExportResponseItem>;
}
export declare class AnalyticsReportsTransactionsDetail extends ThAnalyticsBaseHandler {
    http: Client;
    options: TransactionsHandlerOptions;
    constructor(options: TransactionsHandlerOptions, http: Client);
    static create(options: object, http: Client): AnalyticsReportsTransactionsDetail;
    get(id?: string): Promise<AnalyticsReportsTransactionDetailResponseItem>;
}
export declare class AnalyticsReportsTransactionsOverviewFetchError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class AnalyticsReportsTransactionDetailFetcshError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class AnalyticsReportsTransactionsOverviewExportFetchError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
