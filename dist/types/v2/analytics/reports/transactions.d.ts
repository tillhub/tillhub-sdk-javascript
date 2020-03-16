import { ThAnalyticsBaseHandler, ThAnalyticsBaseHandlerJsonReponseItem } from '../../../base';
import { Client } from '../../../client';
import { BaseError } from '../../../errors';
export interface TransactionsHandlerOptions {
    user?: string;
    base?: string;
}
export interface AnalyticsReportsTransactionsOverviewResponseItem extends ThAnalyticsBaseHandlerJsonReponseItem {
}
export interface AnalyticsReportsTransactionDetailResponsseItem extends ThAnalyticsBaseHandlerJsonReponseItem {
}
export declare class AnalyticsReportsTransactionsOveview extends ThAnalyticsBaseHandler {
    http: Client;
    options: TransactionsHandlerOptions;
    constructor(options: TransactionsHandlerOptions, http: Client);
    static create(options: object, http: Client): AnalyticsReportsTransactionsOveview;
    getAll(query?: object): Promise<AnalyticsReportsTransactionsOverviewResponseItem[]>;
}
export declare class AnalyticsReportsTransactionsDetail extends ThAnalyticsBaseHandler {
    http: Client;
    options: TransactionsHandlerOptions;
    constructor(options: TransactionsHandlerOptions, http: Client);
    static create(options: object, http: Client): AnalyticsReportsTransactionsDetail;
    get(id?: string): Promise<AnalyticsReportsTransactionDetailResponsseItem[]>;
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
