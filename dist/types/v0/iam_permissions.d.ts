import { Client } from '../client';
import { BaseError } from '../errors/baseError';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface IamPermissionsOptions {
    user?: string;
    base?: string;
}
export interface IamPermissionsResponse {
    data: IamPermission[];
    metadata: Record<string, unknown>;
    next?: () => Promise<IamPermissionsResponse>;
}
export interface ErrorObject {
    id: string;
    label: string;
    errorDetails: Record<string, unknown>;
}
export interface IamPermission {
    scope?: string;
    name?: string;
    require2fa?: boolean;
}
export interface IamPermissionsQueryHandler {
    limit?: number;
    uri?: string;
    query?: IamPermissionsQuery;
    orderFields?: string[] | string;
}
export interface IamPermissionsQuery extends IamPermission {
    deleted?: boolean;
    active?: boolean;
    q?: string;
}
export declare class IamPermissions extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: IamPermissionsOptions;
    uriHelper: UriHelper;
    constructor(options: IamPermissionsOptions, http: Client);
    getAll(query?: IamPermissionsQueryHandler | undefined): Promise<IamPermissionsResponse>;
}
export declare class IamPermissionsFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
