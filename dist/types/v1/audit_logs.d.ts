import { Client } from '../client';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
import { AuditsOptions, AuditsQuery, AuditsResponse } from '../v0/audit_logs';
export declare class AuditLogs extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: AuditsOptions;
    uriHelper: UriHelper;
    constructor(options: AuditsOptions, http: Client);
    getAll(query?: AuditsQuery | undefined): Promise<AuditsResponse>;
}
