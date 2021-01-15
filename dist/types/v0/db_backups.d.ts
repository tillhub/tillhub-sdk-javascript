import { ThBaseHandler } from '../base';
import { Client } from '../client';
import { UriHelper } from '../uri-helper';
import { BaseError } from '../errors';
export interface DbBackupsOptions {
    user?: string;
    base?: string;
}
export interface DbBackup {
    file_name: string;
    environment: string;
    datetime: string;
    zip_name: string;
}
export interface DbBackupSignedUrl {
    signed_url: string;
    environment: string;
    datetime: string;
    zip_name: string;
}
export interface DbBackupsResponse {
    data: DbBackup[];
    metadata?: {
        count?: number;
    };
    msg?: string;
}
export interface DbBackupSignedUrlResponse {
    data: DbBackupSignedUrl;
    msg?: string;
}
export declare class DbBackups extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: DbBackupsOptions;
    uriHelper: UriHelper;
    constructor(options: DbBackupsOptions, http: Client);
    getAll(): Promise<DbBackupsResponse>;
    signedUrl(dbBackupDate: string): Promise<DbBackupSignedUrlResponse>;
}
export declare class DbBackupsFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class DbBackupsSignedUrlFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
