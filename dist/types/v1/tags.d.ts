import { Client } from '../client';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
import { TagsOptions, TagsQuery, TagsResponse } from '../v0/tags';
export declare class Tags extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: TagsOptions;
    uriHelper: UriHelper;
    constructor(options: TagsOptions, http: Client);
    getAll(query?: TagsQuery | undefined): Promise<TagsResponse>;
}
