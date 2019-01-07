import { Client } from '../client';
export interface UsersOptions {
    user?: string;
    base?: string;
    configurationId?: string;
}
export interface UsersQuery {
    limit?: number;
    uri?: string;
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
export declare type UserRoles = 'admin' | 'manager' | 'serviceaccount' | 'franchisee' | 'franchise';
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
}
export declare class Users {
    endpoint: string;
    http: Client;
    options: UsersOptions;
    configurationId?: string;
    constructor(options: UsersOptions, http: Client);
    getAll(query?: UsersQuery | undefined): Promise<UsersResponse>;
    get(userId: string): Promise<UserResponse>;
    put(userId: string, user: User): Promise<UserResponse>;
    create(user: User): Promise<UserResponse>;
    delete(userId: string): Promise<UserResponse>;
}
