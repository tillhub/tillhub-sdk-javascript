import { Client } from '../client';
import { UriHelper } from '../uri-helper';
import { BaseError } from '../errors/baseError';
import { ThBaseHandler } from '../base';
export interface StaffGroupsOptions {
    user?: string;
    base?: string;
}
export interface StaffGroupsQuery {
    limit?: number;
    uri?: string;
    name?: string;
    deleted?: boolean;
    count?: number;
    q?: string;
}
export interface StaffGroupsResponse {
    data: object[];
    metadata: object;
}
export interface StaffGroupResponse {
    data: StaffGroup;
    metadata?: {
        count?: number;
        patch?: any;
    };
    msg?: string;
}
export interface StaffGroup {
    name: string;
    id?: string;
    color?: string;
    staffs?: string[];
    custom_id?: string;
    client_id?: string;
    active?: boolean;
    deleted?: boolean;
}
export declare class StaffGroups extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: StaffGroupsOptions;
    uriHelper: UriHelper;
    constructor(options: StaffGroupsOptions, http: Client);
    getAll(query?: StaffGroupsQuery | undefined): Promise<StaffGroupsResponse>;
    meta(): Promise<StaffGroupsResponse>;
    get(staffGroupId: string): Promise<StaffGroupResponse>;
    put(staffGroupId: string, staffGroup: StaffGroup): Promise<StaffGroupResponse>;
    create(staffGroup: StaffGroup): Promise<StaffGroupResponse>;
    delete(staffGroupId: string): Promise<StaffGroupResponse>;
}
export declare class StaffGroupFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class StaffGroupPutFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class StaffGroupCreationFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class StaffGroupDeleteFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
