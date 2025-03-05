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
        q?: string;
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
    contentConfiguration: {
        [key: string]: any;
    } | null;
    payloadConfiguration: {
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
    meta(queryOrOptions?: ContentsQuery): Promise<ContentsResponse>;
    getAll(queryOrOptions?: ContentsQuery | undefined): Promise<ContentsResponse>;
    get(contentId: string): Promise<ContentResponse>;
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
export declare class ContentsMetaFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
