import { Client } from '../client';
import { BaseError } from '../errors';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface ContentTemplatesOptions {
    user?: string;
    base?: string;
}
export interface ContentsTemplatesQuery {
    limit?: number;
    uri?: string;
    query?: {
        deleted?: boolean;
        active?: boolean;
    };
}
export interface ContentsTemplatesResponse {
    data: object[];
    metadata: object;
    next?: () => Promise<ContentsTemplatesResponse>;
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
export declare class ContentsTemplates extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: ContentTemplatesOptions;
    uriHelper: UriHelper;
    constructor(options: ContentTemplatesOptions, http: Client);
    getAll(queryOrOptions?: ContentsTemplatesQuery | undefined): Promise<ContentsTemplatesResponse>;
    get(templateId: string): Promise<ContentTemplateResponse>;
    search(searchTerm: string): Promise<ContentsTemplatesResponse>;
    patch(templateId: string, content: ContentTemplate): Promise<ContentTemplateResponse>;
    create(content: ContentTemplate): Promise<ContentTemplateResponse>;
    delete(templateId: string): Promise<ContentTemplateResponse>;
}
export declare class ContentsTemplatesFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class ContentTemplateFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class ContentTemplatePatchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class ContentTemplateCreationFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class ContentTemplateDeleteFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class ContentsTemplatesSearchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
