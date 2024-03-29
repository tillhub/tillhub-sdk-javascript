import { ThAnalyticsBaseHandler } from '../../../base';
import { CustomersQuery } from '../../../v0/analytics/reports/customers';
import { Client, Timeout } from '../../../client';
import { BaseError } from '../../../errors';
export interface CustomersHandlerOptions {
    user?: string;
    base?: string;
    timeout?: Timeout;
}
export interface AnalyticsReportsCustomersV1ExportResponseItem {
    correlationId?: string;
}
export interface AnalyticsResponse {
    data: AnalyticsReportsCustomersV1ExportResponseItem[];
    metadata: Record<string, unknown>;
    msg?: string;
}
export declare class AnalyticsReportsCustomers extends ThAnalyticsBaseHandler {
    http: Client;
    options: CustomersHandlerOptions;
    timeout: Timeout;
    constructor(options: CustomersHandlerOptions, http: Client);
    static create(options: Record<string, unknown>, http: Client): AnalyticsReportsCustomers;
    getAll(query?: CustomersQuery): Promise<AnalyticsResponse>;
}
export declare class AnalyticsReportsV1CustomersFetchError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
