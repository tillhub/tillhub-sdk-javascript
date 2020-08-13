import { Client } from '../client';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
import { BaseError } from '../errors';
export interface UserPermissionsTemplatesOptions {
    user?: string;
    base?: string;
}
export interface UserPermissionsTemplatesResponse {
    data: UserPermissionsTemplate[];
    metadata: Record<string, unknown>;
}
export interface UserPermissionsTemplateResponse {
    data: UserPermissionsTemplate;
    metadata: Record<string, unknown>;
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
    getAll(query?: Record<string, unknown>): Promise<UserPermissionsTemplatesResponse>;
    get(templateId: string, query?: Record<string, unknown>): Promise<UserPermissionsTemplateResponse>;
    update(templateId: string, template: UserPermissionsTemplate): Promise<UserPermissionsTemplateResponse>;
    delete(templateId: string): Promise<UserPermissionsTemplateResponse>;
}
export declare class UserPermissionsTemplatesFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class UserPermissionsTemplatesFetchOneFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class UserPermissionsTemplatesUpdateFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class UserPermissionsTemplatesCreationFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class UserPermissionsTemplatesDeleteFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
