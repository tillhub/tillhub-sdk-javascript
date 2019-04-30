import { Client } from '../client';
import { UriHelper } from '../uri-helper';
export interface TagsOptions {
    user?: string;
    base?: string;
}
export interface TagsQuery {
    limit?: number;
    uri?: string;
    name?: string;
    q?: string;
}
export interface TagResponse {
    data: TagsResponse;
    metadata?: {
        count?: number;
        patch?: any;
    };
    msg?: string;
}
export interface TagsResponse {
    data: object[];
    metadata: object;
}
export interface Tag {
    name?: string;
    deleted?: boolean;
    legacy_id?: number;
    update_id?: number;
}
export declare class Tags {
    endpoint: string;
    http: Client;
    options: TagsOptions;
    uriHelper: UriHelper;
    constructor(options: TagsOptions, http: Client);
    getAll(query?: TagsQuery | undefined): Promise<TagsResponse>;
    get(tagId: string): Promise<TagResponse>;
    meta(): Promise<TagsResponse>;
    create(tag: Tag): Promise<TagResponse>;
    put(tagId: string, tag: Tag): Promise<TagResponse>;
}
