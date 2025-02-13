import { Client } from '../client';
import { BaseError } from '../errors/baseError';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface IamUserGroupsOptions {
    user?: string;
    base?: string;
}
export interface IamUserGroupsResponse {
    data: IamUserGroup[];
    metadata: Record<string, unknown>;
    next?: () => Promise<IamUserGroupsResponse>;
}
export interface ErrorObject {
    id: string;
    label: string;
    errorDetails: Record<string, unknown>;
}
export interface IamUserGroup {
    id?: string;
    name?: string;
    path?: string;
    parentId?: string;
    subGroupCount?: BigInt;
    subGroups?: IamUserGroup[];
    attributes?: Record<string, unknown>;
    realmRoles?: string[];
    clientRoles?: Record<string, unknown>;
    access?: Record<string, boolean>;
}
export interface IamUserGroupsQueryHandler {
    limit?: number;
    uri?: string;
    query?: IamUserGroupsQuery;
    orderFields?: string[] | string;
}
export interface IamUserGroupsQuery extends IamUserGroup {
    deleted?: boolean;
    active?: boolean;
    q?: string;
}
export declare class IamUserGroups extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: IamUserGroupsOptions;
    uriHelper: UriHelper;
    constructor(options: IamUserGroupsOptions, http: Client);
    getAll(query?: IamUserGroupsQueryHandler | undefined): Promise<IamUserGroupsResponse>;
}
export declare class IamUserGroupsFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
