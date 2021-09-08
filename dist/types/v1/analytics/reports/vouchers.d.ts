import { ThAnalyticsBaseHandler } from '../../../base';
import { VoucherOptions } from '../../../v0/analytics';
import { Client } from '../../../client';
import { BaseError } from '../../../errors';
export interface VouchersHandlerOptions {
    user?: string;
    base?: string;
}
export interface AnalyticsReportsVouchersV1ExportResponseItem {
    correlationId?: string;
}
export interface AnalyticsResponse {
    data: AnalyticsReportsVouchersV1ExportResponseItem[];
    metadata: Record<string, unknown>;
    msg?: string;
}
export declare class AnalyticsReportsVouchers extends ThAnalyticsBaseHandler {
    http: Client;
    options: VouchersHandlerOptions;
    constructor(options: VouchersHandlerOptions, http: Client);
    static create(options: Record<string, unknown>, http: Client): AnalyticsReportsVouchers;
    getAll(query?: VoucherOptions): Promise<AnalyticsResponse>;
}
export declare class AnalyticsReportsV1VouchersFetchError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
