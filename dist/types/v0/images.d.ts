import { Client } from '../client';
export interface ImagesOptions {
    user?: string;
    base?: string;
}
export interface ImagesResponse {
    data: object;
}
export interface ImagesQuery {
    subsystem: 'products' | 'customers' | 'branches';
    prefix: string;
}
export declare class Images {
    endpoint: string;
    http: Client;
    options: ImagesOptions;
    constructor(options: ImagesOptions, http: Client);
    put(query: ImagesQuery, payload: FormData): Promise<ImagesResponse>;
    create(query: ImagesQuery, payload: FormData): Promise<ImagesResponse>;
}
