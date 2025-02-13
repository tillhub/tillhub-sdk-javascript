import { Client } from '../client';
import { BaseError } from '../errors/baseError';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface IamRolesOptions {
    user?: string;
    base?: string;
}
export interface IamRolesResponse {
    data: IamRole[];
    metadata: Record<string, unknown>;
    next?: () => Promise<IamRolesResponse>;
}
export interface ErrorObject {
    id: string;
    label: string;
    errorDetails: Record<string, unknown>;
}
export interface IamRole {
    permissions?: string[];
}
export interface IamRolesQueryHandler {
    limit?: number;
    uri?: string;
    query?: IamRolesQuery;
    orderFields?: string[] | string;
}
export interface IamRolesQuery extends IamRole {
    deleted?: boolean;
    active?: boolean;
    q?: string;
}
export declare class IamRoles extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: IamRolesOptions;
    uriHelper: UriHelper;
    constructor(options: IamRolesOptions, http: Client);
    getAll(query?: IamRolesQueryHandler | undefined): Promise<IamRolesResponse>;
}
export declare class IamRolesFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
