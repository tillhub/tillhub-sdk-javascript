import { ThAnalyticsBaseHandler } from '../../../base';
import { Client } from '../../../client';
import { BaseError } from '../../../errors';
export interface TransactionsHandlerOptions {
    user?: string;
    base?: string;
}
export interface AnalyticsReportsTransactionsV3ExportResponseItem {
    correlationId?: string;
}
export interface AnalyticsResponse {
    data: AnalyticsReportsTransactionsV3ExportResponseItem[];
    metadata: Record<string, unknown>;
    msg?: string;
}
export declare class AnalyticsReportsTransactions extends ThAnalyticsBaseHandler {
    http: Client;
    options: TransactionsHandlerOptions;
    constructor(options: TransactionsHandlerOptions, http: Client);
    static create(options: Record<string, unknown>, http: Client): AnalyticsReportsTransactions;
    export(query?: Record<string, unknown>): Promise<AnalyticsResponse>;
}
export declare class AnalyticsReportsV3TransactionsExportFetchError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
