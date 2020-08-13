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
        deleted?: boolean;
        active?: boolean;
    };
}
export interface ContentTemplatesResponse {
    data: Record<string, unknown>[];
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
export interface ContentTemplate {
    id?: string;
}
export declare type ContentTypeType = 'video' | 'image' | 'text' | 'transition';
export interface ContentTemplate {
    name?: string;
    active?: boolean;
    deleted?: boolean;
    contents?: Contents;
}
export interface Contents {
    idle?: Array<string>;
    welcome?: Array<string>;
    cart?: Array<string>;
    payment?: Array<string>;
    payment_terminal?: Array<string>;
    payment_approved?: Array<string>;
    goodbye?: Array<string>;
    logo?: Array<string>;
    runtime?: Array<string>;
}
export declare class ContentTemplates extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: ContentTemplatesOptions;
    uriHelper: UriHelper;
    constructor(options: ContentTemplatesOptions, http: Client);
    getAll(queryOrOptions?: ContentTemplatesQuery | undefined): Promise<ContentTemplatesResponse>;
    get(templateId: string): Promise<ContentTemplateResponse>;
    search(searchTerm: string): Promise<ContentTemplatesResponse>;
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
export declare class ContentTemplatesSearchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
