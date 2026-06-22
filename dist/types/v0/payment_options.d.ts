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
export declare type PaymentOptionType = 'cash' | 'card' | 'invoice' | 'card_opi' | 'card_concardis' | 'card_tim' | 'card_adyen' | 'gift_card' | 'terminal_gift_card' | 'default' | 'undefined' | 'voucher' | 'sumup' | 'buy_now_pay_later' | 'unzer_installment' | 'unzer_invoice' | 'applepay' | 'googlepay' | 'paypal' | 'ideal' | 'wechatpay' | 'alipay' | 'twint' | 'trustly';
export interface PaymentOption {
    id: string;
    type: PaymentOptionType;
    name: string | null;
    active: boolean;
    metadata: Record<string, unknown>;
    cost_center: string | null;
    currency: string | null;
    discrepancy_account: string | null;
    summable: boolean;
    order_index: number | null;
    fa_account_number: string | null;
    accounts: string[] | null;
    account: string | null;
    card_circuits: string[] | null;
    financial_accounts: string[] | null;
    diff_account: string | null;
    price_range: Record<string, unknown> | null;
    is_mms: boolean;
    registers: string[] | null;
    deleted: boolean;
    created_at: string;
    updated_at: string | null;
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
