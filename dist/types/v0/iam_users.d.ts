import { Client } from '../client';
import { BaseError } from '../errors/baseError';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface IamUsersOptions {
    user?: string;
    base?: string;
}
export interface IamUsersResponse {
    data: IamUser[];
    metadata: Record<string, unknown>;
    next?: () => Promise<IamUsersResponse>;
}
export interface IamUsersMetaResponse {
    data: Record<string, unknown>;
    metadata: Record<string, unknown>;
    msg: string;
}
export interface IamUserResponse {
    data: IamUser;
    metadata: Record<string, unknown>;
    msg?: string;
    errors?: ErrorObject[];
}
export interface ErrorObject {
    id: string;
    label: string;
    errorDetails: Record<string, unknown>;
}
export interface IamUser {
    id?: string;
    email?: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    attributes?: Record<string, unknown>;
}
export interface IamUsersQueryHandler {
    limit?: number;
    uri?: string;
    query?: IamUsersQuery;
    orderFields?: string[] | string;
}
export interface IamUsersQuery extends IamUser {
    deleted?: boolean;
    active?: boolean;
    q?: string;
}
export declare class IamUsers extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: IamUsersOptions;
    uriHelper: UriHelper;
    constructor(options: IamUsersOptions, http: Client);
    getAll(query?: IamUsersQueryHandler | undefined): Promise<IamUsersResponse>;
    meta(query?: IamUsersQueryHandler | undefined): Promise<IamUsersResponse>;
    get(iamUserId: string): Promise<IamUserResponse>;
    put(iamUserId: string, iamUser: IamUser): Promise<IamUserResponse>;
    create(iamUser: IamUser): Promise<IamUserResponse>;
    delete(iamUserId: string): Promise<IamUserResponse>;
}
export declare class IamUsersFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class IamUsersMetaFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class IamUserFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class IamUserPutFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class IamUserCreationFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class IamUserDeleteFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
