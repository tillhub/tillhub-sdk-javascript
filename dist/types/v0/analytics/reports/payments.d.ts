import { Client, Timeout } from '../../../client';
import { UriHelper } from '../../../uri-helper';
import { AnalyticsOptions } from '../../analytics';
export interface PaymentsResponse {
    data: Array<Record<string, unknown>>;
    metadata: Record<string, unknown>;
    next?: () => Promise<PaymentsResponse>;
}
export interface PaymentsQuery {
    uri?: string;
    format?: string;
    start?: string;
    end?: string;
    payment_option?: string;
    payment_type?: string;
    transaction_number?: number;
    balance_number?: number;
    customer_number?: string;
    cashier_number?: string;
    legacy?: boolean;
    limit?: number;
    cursor_field?: string;
    q?: string;
    change?: {
        from: number;
        to: number;
    };
    amount?: {
        from: number;
        to: number;
    };
}
export interface MetaQuery {
    legacy?: boolean;
}
export declare class Payments {
    http: Client;
    options: AnalyticsOptions;
    uriHelper: UriHelper;
    timeout: Timeout;
    constructor(options: AnalyticsOptions, http: Client, uriHelper: UriHelper);
    getAll(query?: PaymentsQuery): Promise<PaymentsResponse>;
    meta(query?: MetaQuery): Promise<PaymentsResponse>;
}
