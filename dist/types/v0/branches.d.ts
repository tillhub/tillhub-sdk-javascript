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
    query?: {
        deleted?: boolean;
        active?: boolean;
    };
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
export interface ExternalCustomIdQuery {
    provided_id: string;
    branch?: string;
}
export interface ExternalCustomIdResponse {
    external_custom_id: string;
}
export interface SearchQuery {
    q: string;
    fields?: string[];
}
export interface Branch {
    id?: string;
    branch_number?: number;
    name: string;
    email?: string;
    custom_id?: string;
    external_custom_id?: string | null;
    cost_center?: string | null;
    receipt_header?: string;
    receipt_footer?: string;
    active?: boolean;
    deleted?: boolean;
    configuration?: string;
    timezone_default?: string | null;
    currency_default?: string | null;
    shift_plan_enabled?: boolean;
    available_in_online_booking?: boolean;
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
    put(branchId: string, branch: Branch): Promise<BranchResponse>;
    create(branch: Branch): Promise<BranchResponse>;
    count(): Promise<BranchesResponse>;
    delete(branchId: string): Promise<BranchResponse>;
    getUniqueExternalId(query: ExternalCustomIdQuery): Promise<BranchResponse>;
    search(query: string | SearchQuery): Promise<BranchResponse>;
}
export declare class BranchesFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class BranchFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class BranchPutFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class BranchCreationFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class BranchesCountFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class BranchDeleteFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class ExternalCustomIdGetUniqueFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class BranchesSearchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
