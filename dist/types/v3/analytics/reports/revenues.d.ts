import { ThAnalyticsBaseHandler } from '../../../base';
import { Client } from '../../../client';
import { BaseError } from '../../../errors';
export interface RevenuesHandlerOptions {
    user?: string;
    base?: string;
}
export interface AnalyticsReportsRevenuesV3ExportResponseItem {
    correlationId?: string;
}
export interface AnalyticsResponse {
    data: AnalyticsReportsRevenuesV3ExportResponseItem[];
    metadata: Record<string, unknown>;
    msg?: string;
}
export declare class AnalyticsReportsRevenues extends ThAnalyticsBaseHandler {
    http: Client;
    options: RevenuesHandlerOptions;
    constructor(options: RevenuesHandlerOptions, http: Client);
    static create(options: Record<string, unknown>, http: Client): AnalyticsReportsRevenues;
    export(query?: Record<string, unknown>): Promise<AnalyticsResponse>;
}
export declare class AnalyticsReportsV3RevenuesExportFetchError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
