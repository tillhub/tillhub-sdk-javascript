import { Client } from '../client';
import { BaseError } from '../errors/baseError';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
import { IamUserResponse } from './iam_users';
export interface IamMeClassOptions {
    user?: string;
    base?: string;
}
export interface IamMeResponse {
    data: IamMe;
    metadata: Record<string, unknown>;
    msg?: string;
    errors?: ErrorObject[];
}
export interface ErrorObject {
    id: string;
    label: string;
    errorDetails: Record<string, unknown>;
}
export interface IamMe {
    name?: string;
    firstname?: string;
    lastname?: string;
    display_name?: string;
    email?: string;
    features?: Record<string, boolean>;
    legacy_id?: string;
    licenses?: string[];
    role?: string;
    scopes?: string[];
    whitelabel?: string;
}
export declare class IamMeClass extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: IamMeClassOptions;
    uriHelper: UriHelper;
    constructor(options: IamMeClassOptions, http: Client);
    get(tenantId: string): Promise<IamMeResponse>;
    setup2faActionMe(tenantId: string): Promise<IamUserResponse>;
}
export declare class IamMeFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class IamMeBackupCodes2faFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class IamMeSetup2faActionFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
