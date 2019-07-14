import { Client } from '../client';
import { BaseError } from '../errors';
export interface VouchersOptions {
    user?: string;
    base?: string;
}
export interface VouchersQueryOptions {
    limit?: number;
    uri?: string;
    query?: {
        deleted?: boolean;
        active?: boolean;
    };
}
export interface VouchersMetaQuery {
    deleted?: boolean;
    active?: boolean;
}
export interface VouchersResponse {
    data: object[];
    metadata: object;
    msg?: string;
    next?: () => Promise<VouchersResponse>;
}
export interface VoucherLogsResponse {
    data: object[];
    metadata: object;
    msg?: string;
    next?: () => Promise<VoucherLogsResponse>;
}
export interface VoucherResponse {
    data: Voucher;
    metadata?: {
        count?: number;
        patch?: any;
    };
    msg?: string;
}
declare type VoucherFormatTypes = 'numeric' | 'alphanumeric' | 'alphabetic';
declare type VoucherTypes = 'amount' | 'discount' | 'product';
export interface Voucher {
    id?: string;
}
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
export interface UsersResponse {
    data: object[];
}
export declare class Vouchers {
    endpoint: string;
    http: Client;
    logs: VoucherLogs;
    options: VouchersOptions;
    constructor(options: VouchersOptions, http: Client);
    getAll(optionsOrQuery?: VouchersQueryOptions | undefined): Promise<VouchersResponse>;
    meta(q?: VouchersMetaQuery | undefined): Promise<VouchersResponse>;
    delete(voucherId: string): Promise<VouchersResponse>;
    count(): Promise<VouchersResponse>;
    get(voucherId: string): Promise<VoucherResponse>;
    getLogs(voucherId: string, optionsOrQuery?: VouchersQueryOptions | undefined): Promise<VoucherLogsResponse>;
    put(voucherId: string, voucher: Voucher): Promise<VoucherResponse>;
    patch(source: Voucher, target: Voucher): Promise<VoucherResponse>;
    create(voucher: Voucher): Promise<VoucherResponse>;
    getAllUsers(): Promise<UsersResponse>;
}
export declare class VoucherLogs {
    endpoint: string;
    http: Client;
    options: VouchersOptions;
    constructor(options: VouchersOptions, http: Client);
    getAll(optionsOrQuery?: VouchersQueryOptions | undefined): Promise<VoucherLogsResponse>;
    meta(): Promise<VoucherLogsResponse>;
}
export declare class VoucherTypeError extends BaseError {
    message: string;
    name: string;
    constructor(message: string, properties?: any);
}
export declare class VouchersFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class VoucherLogsFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class VoucherFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class VoucherPutFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class VoucherPatchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class VoucherCreationFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class VouchersCountFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class VouchersMetaFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class VoucherLogsMetaFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class VoucherDeleteFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class VouchersLogsFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class VouchersLogsCountFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class VouchersUsersFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export {};
