import { Client } from '../client';
import { BaseError } from '../errors/baseError';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface RemoteOrderingMigrationOptions {
    user?: string;
    base?: string;
}
export interface RemoteOrderingMigrationProgress {
    started: boolean;
    finished: boolean;
    progress: number | null;
    startedAt: string | null;
    lastUpdatedAt: string | null;
}
export interface RemoteOrderingMigrationProgressResponse {
    data: RemoteOrderingMigrationProgress | null;
    metadata: Record<string, unknown>;
    msg?: string;
}
export declare class RemoteOrderingMigration extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: RemoteOrderingMigrationOptions;
    uriHelper: UriHelper;
    constructor(options: RemoteOrderingMigrationOptions, http: Client);
    getProgress(): Promise<RemoteOrderingMigrationProgressResponse>;
}
export declare class RemoteOrderingMigrationProgressFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
