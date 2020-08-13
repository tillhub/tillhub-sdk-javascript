import { Client } from '../client';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
import { BaseError } from '../errors';
export interface StaffPermissionsTemplatesOptions {
    user?: string;
    base?: string;
}
export interface StaffPermissionsTemplatesQueryOptions {
    [key: string]: any;
}
export interface StaffPermissionsTemplatesResponse {
    data: StaffPermissionsTemplate[];
    metadata: Record<string, unknown>;
}
export interface StaffPermissionsTemplateResponse {
    data: StaffPermissionsTemplate;
    metadata: Record<string, unknown>;
    msg?: string;
}
export interface StaffPermissionsTemplate {
    name?: string;
    scopes?: string[];
    deleted?: boolean;
    active?: boolean;
}
export declare class StaffPermissionsTemplates extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: StaffPermissionsTemplatesOptions;
    uriHelper: UriHelper;
    constructor(options: StaffPermissionsTemplatesOptions, http: Client);
    create(template: StaffPermissionsTemplate): Promise<StaffPermissionsTemplateResponse>;
    getAll(query?: StaffPermissionsTemplatesQueryOptions): Promise<StaffPermissionsTemplatesResponse>;
    get(templateId: string, query?: StaffPermissionsTemplatesQueryOptions): Promise<StaffPermissionsTemplateResponse>;
    update(templateId: string, template: StaffPermissionsTemplate): Promise<StaffPermissionsTemplateResponse>;
    delete(templateId: string): Promise<StaffPermissionsTemplateResponse>;
}
export declare class StaffPermissionsTemplatesFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class StaffPermissionsTemplatesFetchOneFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class StaffPermissionsTemplatesUpdateFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class StaffPermissionsTemplatesCreationFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class StaffPermissionsTemplatesDeleteFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
