import { Client } from '../client';
import { BaseError } from '../errors';
import { UriHelper } from '../uri-helper';
export interface ContentOptions {
    user?: string;
    base?: string;
}
export interface ContentsQuery {
    limit?: number;
    uri?: string;
    query?: {
        deleted?: boolean;
    };
}
export interface ContentsResponse {
    data: object[];
    metadata: object;
    next?: () => Promise<ContentsResponse>;
}
export interface ContentResponse {
    data: Content;
    metadata?: {
        count?: number;
        patch?: any;
    };
    msg?: string;
}
export interface Content {
    id?: string;
}
export declare type ContentTypeType = 'video' | 'image' | 'text' | 'transition';
export interface Content {
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
export declare class Contents {
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
    constructor(message?: string, properties?: any);
}
export declare class ContentFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class ContentPatchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class ContentCreationFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class ContentDeleteFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class ContentsSearchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
