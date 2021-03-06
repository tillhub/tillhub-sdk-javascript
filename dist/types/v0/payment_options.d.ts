import { Client } from '../client';
import { ThBaseHandler } from '../base';
import { UriHelper } from '../uri-helper';
export interface PaymentOptionsOptions {
    user?: string;
    base?: string;
}
export interface PaymentOptionsQuery {
    limit?: number;
    uri?: string;
    query?: {
        deleted?: boolean;
        active?: boolean;
    };
}
export interface PaymentOptionsResponse {
    data: PaymentOption[];
    metadata: Record<string, unknown>;
}
export interface PaymentOptionResponse {
    data?: PaymentOption;
    metadata?: {
        count?: number;
        patch?: any;
    };
    msg?: string;
}
export declare type PaymentOptionType = 'expense' | 'deposit' | 'bank';
export interface PaymentOption {
    id?: string;
    active?: boolean;
    type: PaymentOptionType;
    name: string;
    cost_center?: string;
    currency: string;
    accounts: string[];
    discrepancy_account: string;
    order_index: number;
    summable: boolean;
}
export declare class PaymentOptions extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: PaymentOptionsOptions;
    uriHelper: UriHelper;
    constructor(options: PaymentOptionsOptions, http: Client);
    getAll(queryOrOptions?: PaymentOptionsQuery | undefined): Promise<PaymentOptionsResponse>;
    get(paymentOptionId: string): Promise<PaymentOptionResponse>;
    put(paymentOptionId: string, paymentOption: PaymentOption): Promise<PaymentOptionResponse>;
    create(paymentOption: PaymentOption): Promise<PaymentOptionResponse>;
    delete(paymentOptionId: string): Promise<PaymentOptionResponse>;
}
