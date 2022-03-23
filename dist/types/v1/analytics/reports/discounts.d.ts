import { ThAnalyticsBaseHandler } from '../../../base';
import { DiscountOptions } from '../../../v0/analytics';
import { Client, Timeout } from '../../../client';
import { BaseError } from '../../../errors';
export interface DiscountsHandlerOptions {
    user?: string;
    base?: string;
    timeout?: Timeout;
}
export interface AnalyticsReportsDiscountsV1ExportResponseItem {
    correlationId?: string;
}
export interface AnalyticsResponse {
    data: AnalyticsReportsDiscountsV1ExportResponseItem[];
    metadata: Record<string, unknown>;
    msg?: string;
}
export declare class AnalyticsReportsDiscounts extends ThAnalyticsBaseHandler {
    http: Client;
    options: DiscountsHandlerOptions;
    timeout: Timeout;
    constructor(options: DiscountsHandlerOptions, http: Client);
    static create(options: Record<string, unknown>, http: Client): AnalyticsReportsDiscounts;
    getAll(query?: DiscountOptions): Promise<AnalyticsResponse>;
}
export declare class AnalyticsReportsV1DiscountsFetchError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
