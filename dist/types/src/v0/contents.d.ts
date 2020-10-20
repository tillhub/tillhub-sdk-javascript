import { Client } from '../client';
import { BaseError } from '../errors';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface ContentOptions {
    user?: string;
    base?: string;
}
export interface ContentsQuery {
    limit?: number;
    uri?: string;
    query?: {
        deleted?: boolean;
        active?: boolean;
    };
}
export interface ContentsResponse {
    data: Array<Record<string, unknown>>;
    metadata: Record<string, unknown>;
    next?: () => Promise<ContentsResponse>;
}
export interface ContentResponse {
    data?: Content;
    metadata?: {
        count?: number;
        patch?: any;
    };
    msg?: string;
}
export declare type ContentTypeType = 'video' | 'image' | 'text' | 'transition';
export interface Content {
    id?: string;
    name?: string;
    type: ContentTypeType;
    payload: string | null;
    content_configuration: {
        [key: string]: any;
    } | null;
    payload_configuration: {
        [key: string]: any;
    } | null;
    active?: boolean;
    deleted?: boolean;
    metadata: {
        [key: string]: any;
    } | null;
}
export declare class Contents extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: ContentOptions;
    uriHelper: UriHelper;
    constructor(options: ContentOptions, http: Client);
    getAll(queryOrOptions?: ContentsQuery | undefined): Promise<ContentsResponse>;
    get(contentId: string): Promise<ContentResponse>;
    search(searchTerm: string): Promise<ContentsResponse>;
    patch(contentId: string, content: Content): Promise<ContentResponse>;
    create(content: Content): Promise<ContentResponse>;
    delete(contentId: string): Promise<ContentResponse>;
}
export declare class ContentsFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class ContentFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class ContentPatchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class ContentCreationFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class ContentDeleteFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class ContentsSearchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
