import { Client } from '../client';
import { BaseError } from '../errors';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface BranchGroupsOptions {
    user?: string;
    base?: string;
}
export interface BranchGroupsQuery {
    limit?: number;
    uri?: string;
    query?: {
        deleted?: boolean;
        active?: boolean;
    };
}
export interface BranchGroupsResponse {
    data: object[];
    metadata: object;
    next?: () => Promise<BranchGroupsResponse>;
}
export interface BranchGroupResponse {
    data: BranchGroup;
    metadata?: {
        count?: number;
        patch?: any;
    };
    msg?: string;
}
export interface BranchGroup {
    id?: string;
}
export interface BranchGroup {
    name: string;
    color?: string;
    brannches?: string[];
    custom_id?: string;
    client_id?: string;
    active?: boolean;
    deleted?: boolean;
}
export declare class BranchGroups extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: BranchGroupsOptions;
    uriHelper: UriHelper;
    constructor(options: BranchGroupsOptions, http: Client);
    getAll(queryOrOptions?: BranchGroupsQuery | undefined): Promise<BranchGroupsResponse>;
    get(branchId: string): Promise<BranchGroupResponse>;
    put(branchId: string, branchGroup: BranchGroup): Promise<BranchGroupResponse>;
    create(branchGroup: BranchGroup): Promise<BranchGroupResponse>;
    delete(branchId: string): Promise<BranchGroupResponse>;
}
export declare class BranchGroupsFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class BranchGroupFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class BranchGroupPutFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class BranchGroupCreationFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class BranchGroupDeleteFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}