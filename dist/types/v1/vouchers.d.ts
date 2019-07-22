import { Client } from '../client';
import { BaseError } from '../errors';
import { UriHelper } from '../uri-helper';
import { Vouchers as VoucherV0, VouchersOptions } from '../v0/vouchers';
/**
 * @extends "VoucherV0"
 */
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
    data: object[];
    metadata: object;
    msg?: string;
    next?: () => Promise<VouchersResponse>;
}
export declare class Vouchers extends VoucherV0 {
    static baseEndpointV1: string;
    endpointV1: string;
    uriHelperV1: UriHelper;
    constructor(options: VouchersOptions, http: Client);
    getAll(optionsOrQuery?: VouchersQueryOptions): Promise<VouchersResponse>;
}
export declare class VouchersFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
