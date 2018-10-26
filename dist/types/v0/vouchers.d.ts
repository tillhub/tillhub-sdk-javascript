import { Client } from '../client';
export interface VouchersOptions {
    user?: string;
    base?: string;
}
export interface VouchersQuery {
    limit?: number;
    uri?: string;
}
export interface VouchersResponse {
    data: object[];
    metadata: object;
    msg?: string;
}
export interface VoucherResponse {
    data: Voucher;
    metadata: object;
    msg?: string;
}
declare type VoucherFormatTypes = 'numeric' | 'alphanumeric' | 'alphabetic';
declare type VoucherTypes = 'amount' | 'discount' | 'product';
export interface Voucher {
    type?: VoucherTypes | null;
    format: string | null;
    format_type: VoucherFormatTypes | null;
    amount?: number | null;
    amount_max?: number | null;
    currency?: string;
    issuable?: boolean;
    reissuable?: boolean;
    issuer?: string;
    comment?: string;
    expires_at?: string;
    title?: string;
    partial_redemption?: boolean;
    active?: boolean;
    namespace?: string;
    limited_to_region?: boolean;
    refundable?: boolean;
    mutable?: boolean;
    exchange_for_cash?: boolean;
    restriction_single_transaction?: boolean;
}
export declare class Vouchers {
    endpoint: string;
    http: Client;
    options: VouchersOptions;
    constructor(options: VouchersOptions, http: Client);
    getAll(query?: VouchersQuery | undefined): Promise<VouchersResponse>;
    delete(voucherId: string): Promise<VouchersResponse>;
    count(): Promise<VouchersResponse>;
    getAllLogs(query?: VouchersQuery | undefined): Promise<VouchersResponse>;
    countLogs(): Promise<VouchersResponse>;
    get(voucherId: string): Promise<VoucherResponse>;
    put(voucherId: string, voucher: Voucher): Promise<VoucherResponse>;
    create(voucher: Voucher): Promise<VoucherResponse>;
}
export {};
