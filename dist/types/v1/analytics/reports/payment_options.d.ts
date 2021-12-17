import { ThAnalyticsBaseHandler } from '../../../base';
import { PaymentOptionsQuery } from '../../../v0/analytics/reports/payment_options';
import { Client, Timeout } from '../../../client';
import { BaseError } from '../../../errors';
export interface PaymentOptionsHandlerOptions {
    user?: string;
    base?: string;
    timeout?: Timeout;
}
export interface AnalyticsReportsPaymentOptionsV1ExportResponseItem {
    correlationId?: string;
}
export interface AnalyticsResponse {
    data: AnalyticsReportsPaymentOptionsV1ExportResponseItem[];
    metadata: Record<string, unknown>;
    msg?: string;
}
export declare class AnalyticsReportsPaymentOptions extends ThAnalyticsBaseHandler {
    http: Client;
    options: PaymentOptionsHandlerOptions;
    timeout: Timeout;
    constructor(options: PaymentOptionsHandlerOptions, http: Client);
    static create(options: Record<string, unknown>, http: Client): AnalyticsReportsPaymentOptions;
    getAll(query?: PaymentOptionsQuery): Promise<AnalyticsResponse>;
}
export declare class AnalyticsReportsV1PaymentOptionsFetchError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
