import { Client } from '../client';
import { BaseError } from '../errors';
export interface VideosOptions {
    user?: string;
    base?: string;
}
export interface VideosResponse {
    data: Record<string, unknown>;
}
export interface VideosQuery {
    subsystem: 'contentVideos';
    prefix: string;
    ext?: string;
}
export declare class Videos {
    endpoint: string;
    http: Client;
    options: VideosOptions;
    constructor(options: VideosOptions, http: Client);
    put(query: VideosQuery, payload: FormData): Promise<VideosResponse>;
    create(query: VideosQuery, payload: FormData): Promise<VideosResponse>;
}
export declare class VideoCreationFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class VideoPutFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
