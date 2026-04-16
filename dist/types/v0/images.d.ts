import { Client } from '../client';
import { UriHelper } from '../uri-helper';
export interface ImagesOptions {
    user?: string;
    base?: string;
}
export interface ImagesResponse {
    data: Record<string, unknown>;
}
export interface ImagesQuery {
    subsystem: 'products' | 'customers' | 'branches' | 'staff';
    prefix: string;
    acceptFormats?: string[];
    metadata?: boolean;
    flatten?: Record<string, unknown> | null;
}
export declare class Images {
    endpoint: string;
    http: Client;
    options: ImagesOptions;
    uriHelper: UriHelper;
    constructor(options: ImagesOptions, http: Client);
    put(query: ImagesQuery, payload: FormData): Promise<ImagesResponse>;
    create(query: ImagesQuery, payload: FormData): Promise<ImagesResponse>;
}
