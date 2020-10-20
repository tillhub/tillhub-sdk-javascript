import { Client } from '../client';
import { UriHelper } from '../uri-helper';
export interface AuditsOptions {
    user?: string;
    base?: string;
}
export interface AuditsQuery {
    type?: string | string[];
    limit?: number;
    cursor_field?: string;
    uri?: string;
    start?: string;
    end?: string;
}
export interface AuditsMetaQuery {
    type?: string | string[];
}
export interface AuditLogsGetOneRequestObject {
    auditLogId: string;
    query?: AuditsQuery;
}
export interface AuditsResponse {
    data?: Array<Record<string, unknown>>;
    metadata?: Record<string, unknown>;
    msg?: string;
    next?: () => Promise<AuditsResponse>;
}
export declare class AuditLogs {
    endpoint: string;
    http: Client;
    options: AuditsOptions;
    uriHelper: UriHelper;
    constructor(options: AuditsOptions, http: Client);
    getAll(q?: AuditsQuery | undefined): Promise<AuditsResponse>;
    meta(q?: AuditsMetaQuery | undefined): Promise<AuditsResponse>;
    get(requestObject: AuditLogsGetOneRequestObject): Promise<AuditsResponse>;
}
