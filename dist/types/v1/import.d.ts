import { Client } from '../client';
import { BaseError } from '../errors';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface ImportOptions {
    user?: string;
    base?: string;
}
export interface ImportChunksBody {
    correlationId: string;
    isDone: boolean;
    index: number;
    type: string;
    chunk: Array<Record<string, unknown>>;
}
export interface ImportChunksResponse {
    data: Array<Record<string, unknown>>;
    msg: string;
}
export declare class Import extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: ImportOptions;
    uriHelper: UriHelper;
    constructor(options: ImportOptions, http: Client);
    chunks(body: ImportChunksBody): Promise<ImportChunksResponse>;
}
export declare class ImportChunksFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
