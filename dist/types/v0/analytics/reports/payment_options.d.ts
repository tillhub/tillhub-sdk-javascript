import { Client } from '../../../client';
import { UriHelper } from '../../../uri-helper';
export interface PaymentOptionsOptions {
    user?: string;
    base?: string;
}
export interface PaymentOptionsResponse {
    data: Array<Record<string, unknown>>;
    metadata: Record<string, unknown>;
}
export interface PaymentOptionsQuery {
    start?: string;
    end?: string;
    branch_number?: string;
    register_id?: string;
    payment_method?: string;
    uri?: string;
    format?: string;
    legacy?: boolean;
    cursor_field?: string;
}
export declare class PaymentOptions {
    http: Client;
    options: PaymentOptionsOptions;
    uriHelper: UriHelper;
    constructor(options: PaymentOptionsOptions, http: Client, uriHelper: UriHelper);
    getAll(query?: PaymentOptionsQuery): Promise<PaymentOptionsResponse>;
    meta(query?: PaymentOptionsQuery): Promise<PaymentOptionsResponse>;
}
