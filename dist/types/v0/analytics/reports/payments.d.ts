import { Client } from '../../../client';
import { UriHelper } from '../../../uri-helper';
export interface PaymentsOptions {
    user?: string;
    base?: string;
}
export interface PaymentsResponse {
    data: object[];
    metadata: object;
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
    change?: {
        from: number;
        to: number;
    };
    amount?: {
        from: number;
        to: number;
    };
}
export declare class Payments {
    http: Client;
    options: PaymentsOptions;
    uriHelper: UriHelper;
    constructor(options: PaymentsOptions, http: Client, uriHelper: UriHelper);
    getAll(query?: PaymentsQuery): Promise<PaymentsResponse>;
    meta(): Promise<PaymentsResponse>;
}
