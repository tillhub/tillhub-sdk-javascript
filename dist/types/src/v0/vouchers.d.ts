import { Client } from '../client';
import { BaseError } from '../errors';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
import { Customer } from './customers';
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
    data?: Array<Record<string, unknown>>;
    metadata?: Record<string, unknown>;
    msg?: string;
    next?: () => Promise<VouchersResponse>;
}
export interface VoucherLogsResponse {
    data: Array<Record<string, unknown>>;
    metadata: Record<string, unknown>;
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
export interface BoundedCustomersGetResponse {
    data?: Customer[];
    metadata?: {
        count?: number;
        patch?: any;
    };
    msg?: string;
}
export interface BoundedCustomersPostResponse {
    data: {
        id: string;
        voucher_id: string;
        customer_id: string;
    };
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
    code?: string;
}
export interface UsersResponse {
    data: Array<Record<string, unknown>>;
}
export declare class Vouchers extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    logs: VoucherLogs;
    options: VouchersOptions;
    uriHelper: UriHelper;
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
    getBoundedCustomers(voucherId: string): Promise<BoundedCustomersGetResponse>;
    createBoundedCustomers(voucherId: string, customers: string[]): Promise<BoundedCustomersPostResponse>;
    updateBoundedCustomers(voucherId: string, customers: string[]): Promise<BoundedCustomersPostResponse>;
}
export declare class VoucherLogs extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: VouchersOptions;
    uriHelper: UriHelper;
    constructor(options: VouchersOptions, http: Client);
    getAll(optionsOrQuery?: VouchersQueryOptions | undefined): Promise<VoucherLogsResponse>;
    meta(): Promise<VoucherLogsResponse>;
}
export declare class VoucherTypeError extends BaseError {
    message: string;
    name: string;
    constructor(message: string, properties?: Record<string, unknown>);
}
export declare class VouchersFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class VoucherLogsFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class VoucherFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class VoucherPutFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class VoucherPatchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class VoucherCreationFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class VoucherCodeConflict extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class VouchersCountFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class VouchersMetaFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class VoucherLogsMetaFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class VoucherDeleteFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class VouchersLogsFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class VouchersLogsCountFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class VouchersUsersFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class VouchersBoundedCustomerGetFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class VouchersBoundedCustomerCreateFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class VouchersBoundedCustomerPutFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export {};
