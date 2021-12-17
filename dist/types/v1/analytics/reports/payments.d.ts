import { ThAnalyticsBaseHandler } from '../../../base';
import { PaymentsQuery } from '../../../v0/analytics/reports/payments';
import { Client, Timeout } from '../../../client';
import { BaseError } from '../../../errors';
export interface PaymentsHandlerOptions {
    user?: string;
    base?: string;
    timeout?: Timeout;
}
export interface AnalyticsReportsPaymentsV1ExportResponseItem {
    correlationId?: string;
}
export interface AnalyticsResponse {
    data: AnalyticsReportsPaymentsV1ExportResponseItem[];
    metadata: Record<string, unknown>;
    msg?: string;
}
export declare class AnalyticsReportsPayments extends ThAnalyticsBaseHandler {
    http: Client;
    options: PaymentsHandlerOptions;
    timeout: Timeout;
    constructor(options: PaymentsHandlerOptions, http: Client);
    static create(options: Record<string, unknown>, http: Client): AnalyticsReportsPayments;
    getAll(query?: PaymentsQuery): Promise<AnalyticsResponse>;
}
export declare class AnalyticsReportsV1PaymentsFetchError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
