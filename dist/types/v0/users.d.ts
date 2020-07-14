import { Client } from '../client';
import { BaseError } from '../errors/baseError';
import { UriHelper, HandlerQuery } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface UsersOptions {
    user?: string;
    base?: string;
    configurationId?: string;
}
export interface UsersQuery {
    limit?: number;
    uri?: string;
}
export interface HandleUsersQuery extends HandlerQuery {
    query?: UsersQuery;
}
export interface UsersResponse {
    data: User[];
    metadata: object;
}
export interface UserResponse {
    data: User;
    metadata?: {
        count?: number;
        patch?: any;
    };
    msg?: string;
}
export interface User {
    id?: string;
}
export declare type UserRoles = 'admin' | 'manager' | 'serviceaccount' | 'franchisee' | 'franchise' | 'staff';
export interface User {
    user: {
        id?: string;
        email?: string;
    };
    description?: string | null;
    blocked?: boolean;
    deleted?: boolean;
    active?: boolean;
    metadata?: object;
    role: UserRoles;
    user_id?: string;
    configuration_id: string;
    groups?: object | null;
    scopes?: string[] | null;
    attributes?: object | null;
    parents?: string[] | null;
    children?: string[] | null;
    api_key?: string | null;
    key?: object | null;
    secret?: string;
    username?: string;
    firstname?: string;
    lastname?: string;
    locations?: string[] | null;
}
export declare class Users extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: UsersOptions;
    configurationId?: string;
    uriHelper: UriHelper;
    constructor(options: UsersOptions, http: Client);
    getAll(query?: HandleUsersQuery): Promise<UsersResponse>;
    get(userId: string): Promise<UserResponse>;
    put(userId: string, user: User): Promise<UserResponse>;
    create(user: User): Promise<UserResponse>;
    delete(userId: string): Promise<UserResponse>;
    createToken(userId: string): Promise<UserResponse>;
}
export declare class UsersFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class UserFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class UserPutFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class UserCreationFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class UserDeleteFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class UserTokenCreationFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
