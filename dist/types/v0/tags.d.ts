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
export interface TagsResponse {
    data: object[];
    metadata: object;
}
export declare class Tags {
    endpoint: string;
    http: Client;
    options: TagsOptions;
    uriHelper: UriHelper;
    constructor(options: TagsOptions, http: Client);
    getAll(query?: TagsQuery | undefined): Promise<TagsResponse>;
    meta(): Promise<TagsResponse>;
}
