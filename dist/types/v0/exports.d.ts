import { Client } from '../client';
import { UriHelper } from '../uri-helper';
import { BaseError } from '../errors/baseError';
export interface ExportsOptions {
    user?: string;
    base?: string;
}
export interface ExportsQueryOrOptions {
    limit?: number;
    uri?: string;
    query?: {
        embed?: string[];
        tz?: string;
    };
}
export interface DatevQuery {
    range?: {
        from: string;
        to: string;
    };
    tz?: string;
    password?: string;
    emails?: string[];
}
export interface GobdQuery {
    start: string;
    end: string;
    tz?: string;
    password?: string;
    emails?: string[];
    client_name?: string;
}
export interface GobdQueryOrOptions {
    limit?: number;
    uri?: string;
    query?: {
        embed?: string[];
        tz?: string;
    };
}
export interface ExportsResponse {
    data: Array<{
        uri: string;
    }>;
    metadata: Record<string, unknown>;
    msg?: string | null;
}
export declare class Exports {
    endpoint: string;
    http: Client;
    options: ExportsOptions;
    uriHelper: UriHelper;
    constructor(options: ExportsOptions, http: Client);
    datev(datevQuery: DatevQuery, queryOrOptions: ExportsQueryOrOptions): Promise<ExportsResponse>;
    gobd(gobdQuery: GobdQuery, queryOrOptions: GobdQueryOrOptions): Promise<ExportsResponse>;
}
export declare class ExportsGobdFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
