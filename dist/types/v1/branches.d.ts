import { Client } from '../client';
import { BaseError } from '../errors';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface BranchesOptions {
    user?: string;
    base?: string;
}
export interface BranchesQuery {
    limit?: number;
    uri?: string;
    q?: string;
    start?: string;
    active?: string;
    deleted?: string;
    name?: string;
    branch_number?: string;
    branch_group?: string;
    postal_code?: string;
    city?: string;
    street?: string;
}
export interface BranchesResponse {
    data: Array<Record<string, unknown>>;
    metadata: Record<string, unknown>;
    next?: () => Promise<BranchesResponse>;
}
export interface BranchResponse {
    data?: Branch;
    metadata?: {
        count?: number;
        patch?: any;
    };
    msg?: string;
}
export interface Branch {
    id?: string;
    created_at?: {
        iso: string;
        unix: number;
    };
    updated_at?: {
        iso: string;
        unix: number;
    };
    insert_id?: number;
    metadata?: object;
    email?: string;
    name: string;
    receipt_header?: string;
    receipt_footer?: string;
    receipt_logo?: string;
    cid?: string;
    addresses?: object[];
    active?: boolean;
    deleted?: boolean;
    images?: object;
    branch_number?: number;
    image?: string;
    signing_configuration?: object;
    custom_id?: string;
    configuration?: string;
    configurations?: object;
    external_custom_id?: string;
    currency_default?: string;
    timezone_default?: string;
    fa_account_nunmber?: string;
    cost_center?: string;
    custom_properties?: object;
    default_favourite?: string;
}
export declare class Branches extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: BranchesOptions;
    uriHelper: UriHelper;
    constructor(options: BranchesOptions, http: Client);
    getAll(queryOrOptions?: BranchesQuery | undefined): Promise<BranchesResponse>;
    get(branchId: string): Promise<BranchResponse>;
}
export declare class BranchFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class BranchesFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
