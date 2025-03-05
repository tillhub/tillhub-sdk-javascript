import { Client } from '../client';
import { BaseError } from '../errors';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface ContentTemplatesOptions {
    user?: string;
    base?: string;
}
export interface ContentTemplatesQuery {
    limit?: number;
    uri?: string;
    query?: {
        q?: string;
        deleted?: boolean;
        active?: boolean;
    };
}
export interface ContentTemplatesResponse {
    data: Array<Record<string, unknown>>;
    metadata: Record<string, unknown>;
    next?: () => Promise<ContentTemplatesResponse>;
}
export interface ContentTemplateResponse {
    data: ContentTemplate;
    metadata?: {
        count?: number;
        patch?: any;
    };
    msg?: string;
}
export declare type ContentTypeType = 'video' | 'image' | 'text' | 'transition';
export interface ContentTemplate {
    id?: string;
    name?: string;
    active?: boolean;
    deleted?: boolean;
    contents?: Contents;
}
export interface Contents {
    idle?: string[];
    welcome?: string[];
    cart?: string[];
    payment?: string[];
    paymentTerminal?: string[];
    paymentApproved?: string[];
    goodbye?: string[];
    logo?: string[];
    runtime?: string[];
}
export declare class ContentTemplates extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: ContentTemplatesOptions;
    uriHelper: UriHelper;
    constructor(options: ContentTemplatesOptions, http: Client);
    meta(queryOrOptions?: ContentTemplatesQuery): Promise<ContentTemplatesResponse>;
    getAll(queryOrOptions?: ContentTemplatesQuery | undefined): Promise<ContentTemplatesResponse>;
    get(templateId: string): Promise<ContentTemplateResponse>;
    patch(templateId: string, content: ContentTemplate): Promise<ContentTemplateResponse>;
    create(content: ContentTemplate): Promise<ContentTemplateResponse>;
    delete(templateId: string): Promise<ContentTemplateResponse>;
}
export declare class ContentTemplatesFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class ContentTemplateFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class ContentTemplatePatchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class ContentTemplateCreationFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class ContentTemplateDeleteFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class ContentTemplatesMetaFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
