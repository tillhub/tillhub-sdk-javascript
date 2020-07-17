import { Client } from '../client';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
import { BaseError } from '../errors';
export interface UserPermissionsTemplatesOptions {
    user?: string;
    base?: string;
}
export interface UserPermissionsTemplatesQueryOptions {
}
export interface UserPermissionsTemplatesResponse {
    data: UserPermissionsTemplate[];
    metadata: object;
}
export interface UserPermissionsTemplateResponse {
    data: UserPermissionsTemplate;
    metadata: object;
    msg?: string;
}
export interface UserPermissionsTemplate {
    name?: string;
    scopes?: string[];
    deleted?: boolean;
    active?: boolean;
}
export declare class UserPermissionsTemplates extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: UserPermissionsTemplatesOptions;
    uriHelper: UriHelper;
    constructor(options: UserPermissionsTemplatesOptions, http: Client);
    create(template: UserPermissionsTemplate): Promise<UserPermissionsTemplateResponse>;
    getAll(query?: UserPermissionsTemplatesQueryOptions): Promise<UserPermissionsTemplatesResponse>;
    get(templateId: string, query?: UserPermissionsTemplatesQueryOptions): Promise<UserPermissionsTemplateResponse>;
    update(templateId: string, template: UserPermissionsTemplate): Promise<UserPermissionsTemplateResponse>;
    delete(templateId: string): Promise<UserPermissionsTemplateResponse>;
}
export declare class UserPermissionsTemplatesFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class UserPermissionsTemplatesFetchOneFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class UserPermissionsTemplatesUpdateFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class UserPermissionsTemplatesCreationFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class UserPermissionsTemplatesDeleteFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
