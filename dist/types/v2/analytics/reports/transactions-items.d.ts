import { ThAnalyticsBaseHandler } from '../../../base';
import { Client } from '../../../client';
import { BaseError } from '../../../errors';
export interface TransactionsItemsHandlerOptions {
    user?: string;
    base?: string;
}
export interface AnalyticsReportsTransactionsItemsResponse {
    data: object[];
    summary: object[];
    metaData: {
        count: number;
        total_count: number;
    };
    next?: () => Promise<AnalyticsReportsTransactionsItemsResponse>;
}
export declare class AnalyticsReportsTransactionsItems extends ThAnalyticsBaseHandler {
    http: Client;
    options: TransactionsItemsHandlerOptions;
    constructor(options: TransactionsItemsHandlerOptions, http: Client);
    static create(options: object, http: Client): AnalyticsReportsTransactionsItems;
    getAll(query?: object): Promise<AnalyticsReportsTransactionsItemsResponse>;
}
export declare class AnalyticsReportsTransactionsItemsFetchError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
