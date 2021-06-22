import { ThAnalyticsBaseHandler } from '../../../base';
import { Client } from '../../../client';
import { BaseError } from '../../../errors';
export interface BalancesHandlerOptions {
    user?: string;
    base?: string;
}
export interface AnalyticsReportsBalancesV3ExportResponseItem {
    correlationId?: string;
}
export interface AnalyticsResponse {
    data: AnalyticsReportsBalancesV3ExportResponseItem[];
    metadata: Record<string, unknown>;
    msg?: string;
}
export declare class AnalyticsReportsBalances extends ThAnalyticsBaseHandler {
    http: Client;
    options: BalancesHandlerOptions;
    constructor(options: BalancesHandlerOptions, http: Client);
    static create(options: Record<string, unknown>, http: Client): AnalyticsReportsBalances;
    export(query?: Record<string, unknown>): Promise<AnalyticsResponse>;
}
export declare class AnalyticsReportsV3BalancesExportFetchError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
