import { Client } from '../client';
import { BaseError } from '../errors/baseError';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface RemoteOrderingApiUsersOptions {
    user?: string;
    base?: string;
}
export interface ErrorObject {
    id: string;
    label: string;
    errorDetails: Record<string, unknown>;
}
export interface RemoteOrderingServiceAccount {
    id?: string;
    createdTimestamp?: number;
    username?: string;
    email?: string;
    enabled?: boolean;
    totp?: boolean;
    emailVerified?: boolean;
    attributes?: {
        partner?: string;
        clientAccountId?: string;
    };
    groups?: string[];
}
export interface RemoteOrderingApiUsersListResponse {
    data: RemoteOrderingServiceAccount[];
    metadata: Record<string, unknown>;
    msg?: string;
    errors?: ErrorObject[];
}
export interface RemoteOrderingApiUserMutationResponse {
    data: RemoteOrderingServiceAccount | null;
    metadata: Record<string, unknown>;
    msg?: string;
    errors?: ErrorObject[];
}
export interface RemoteOrderingApiUserCreatePayload {
    password: string;
    partner?: string;
}
export declare class RemoteOrderingApiUsers extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: RemoteOrderingApiUsersOptions;
    uriHelper: UriHelper;
    constructor(options: RemoteOrderingApiUsersOptions, http: Client);
    get(): Promise<RemoteOrderingApiUsersListResponse>;
    create(payload: RemoteOrderingApiUserCreatePayload): Promise<RemoteOrderingApiUserMutationResponse>;
    delete(serviceAccountId: string): Promise<RemoteOrderingApiUserMutationResponse>;
}
export declare class RemoteOrderingApiUserFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class RemoteOrderingApiUserCreateFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class RemoteOrderingApiUserUpdateFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class RemoteOrderingApiUserDeleteFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
