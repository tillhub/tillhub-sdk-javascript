import { ThAnalyticsBaseHandler } from '../../../base';
import { VatQuery } from '../../../v0/analytics/reports/vat';
import { Client } from '../../../client';
import { BaseError } from '../../../errors';
export interface VatHandlerOptions {
    user?: string;
    base?: string;
}
export interface AnalyticsReportsVatV1ExportResponseItem {
    correlationId?: string;
}
export interface AnalyticsResponse {
    data: AnalyticsReportsVatV1ExportResponseItem[];
    metadata: Record<string, unknown>;
    msg?: string;
}
export declare class AnalyticsReportsVat extends ThAnalyticsBaseHandler {
    http: Client;
    options: VatHandlerOptions;
    constructor(options: VatHandlerOptions, http: Client);
    static create(options: Record<string, unknown>, http: Client): AnalyticsReportsVat;
    getAll(query?: VatQuery): Promise<AnalyticsResponse>;
}
export declare class AnalyticsReportsV1VatFetchError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
