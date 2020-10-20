import { Client } from '../client';
import { BaseError } from '../errors';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface VoucherSystemsOptions {
    user?: string;
    base?: string;
}
export interface VoucherSystemsQuery {
    limit?: number;
    uri?: string;
    query?: {
        deleted?: boolean;
        active?: boolean;
    };
}
export interface VoucherSystemsResponse {
    data: Array<Record<string, unknown>>;
    metadata: Record<string, unknown>;
    next?: () => Promise<VoucherSystemsResponse>;
}
export interface VoucherSystemResponse {
    data?: VoucherSystem;
    metadata?: {
        count?: number;
        patch?: any;
    };
    msg?: string;
}
export interface VoucherSystem {
    id?: string;
    name: string;
    country?: string;
    region?: string;
    branches?: string[];
    hooks?: Record<string, unknown>;
    active?: boolean;
    deleted?: boolean;
    increments?: Array<Record<string, unknown>>;
}
export declare class VoucherSystems extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: VoucherSystemsOptions;
    uriHelper: UriHelper;
    constructor(options: VoucherSystemsOptions, http: Client);
    getAll(queryOrOptions?: VoucherSystemsQuery | undefined): Promise<VoucherSystemsResponse>;
    get(voucherSystemId: string): Promise<VoucherSystemResponse>;
    put(voucherSystemId: string, voucherSystemGroup: VoucherSystem): Promise<VoucherSystemResponse>;
    create(voucherSystemGroup: VoucherSystem): Promise<VoucherSystemResponse>;
    delete(voucherSystemId: string): Promise<VoucherSystemResponse>;
}
export declare class VoucherSystemsFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class VoucherSystemFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class VoucherSystemPutFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class VoucherSystemCreationFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class VoucherSystemDeleteFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
