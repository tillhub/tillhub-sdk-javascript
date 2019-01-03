import { Client } from '../client';
export interface PaymentOptionsOptions {
    user?: string;
    base?: string;
}
export interface PaymentOptionsQuery {
    limit?: number;
    uri?: string;
}
export interface PaymentOptionsResponse {
    data: PaymentOption[];
    metadata: object;
}
export interface PaymentOptionResponse {
    data: PaymentOption;
    metadata?: {
        count?: number;
        patch?: any;
    };
    msg?: string;
}
export interface PaymentOption {
    id?: string;
}
export declare type PaymentOptionType = 'expense' | 'deposit' | 'bank';
export interface PaymentOption {
    active?: boolean;
    type: PaymentOptionType;
    name: string;
    cost_center?: string;
    currency: string;
    accounts: string[];
    diff_account: string;
    order_index: number;
    summable: boolean;
}
export declare class PaymentOptions {
    endpoint: string;
    http: Client;
    options: PaymentOptionsOptions;
    constructor(options: PaymentOptionsOptions, http: Client);
    getAll(query?: PaymentOptionsQuery | undefined): Promise<PaymentOptionsResponse>;
    get(paymentOptionId: string): Promise<PaymentOptionResponse>;
    put(paymentOptionId: string, paymentOption: PaymentOption): Promise<PaymentOptionResponse>;
    create(paymentOption: PaymentOption): Promise<PaymentOptionResponse>;
}
