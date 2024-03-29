import { Client } from '../client';
import { BaseError } from '../errors';
import { UriHelper } from '../uri-helper';
import { Vouchers as VoucherV0, VouchersOptions, VouchersMetaQuery } from '../v0/vouchers';
export interface VouchersQueryOptions {
    limit?: number;
    uri?: string;
    deleted?: boolean;
    active?: boolean;
    code?: string;
    expires_at_start?: boolean;
    expires_at_end?: boolean;
    amount_from?: string;
    amount_to?: string;
    regions?: string[] | string;
    issuable?: boolean;
    reissuable?: boolean;
    expires_at?: string;
    partial_redemption?: boolean;
    limited_to_region?: boolean;
    refundable?: boolean;
    mutable?: boolean;
    exchange_for_cash?: boolean;
    is_campaign?: boolean;
}
export interface VouchersResponse {
    data: Array<Record<string, unknown>>;
    metadata: Record<string, unknown>;
    msg?: string;
    next?: () => Promise<VouchersResponse>;
}
export declare class Vouchers extends VoucherV0 {
    static baseEndpointV1: string;
    endpointV1: string;
    uriHelperV1: UriHelper;
    constructor(options: VouchersOptions, http: Client);
    getAll(optionsOrQuery?: VouchersQueryOptions): Promise<VouchersResponse>;
    meta(q?: VouchersMetaQuery | undefined): Promise<VouchersResponse>;
}
export declare class VouchersFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
