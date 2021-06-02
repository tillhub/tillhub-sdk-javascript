import { Client } from '../client';
import { UriHelper } from '../uri-helper';
import { ExportsOptions, GobdQuery, GobdQueryOrOptions } from '../v0/exports';
export interface ExportsV1ResponseItem {
    correlationId?: string;
}
export interface ExportsV1Response {
    data: ExportsV1ResponseItem[];
    metadata: Record<string, unknown>;
    msg?: string;
}
export declare class ExportsV1 {
    endpoint: string;
    http: Client;
    options: ExportsOptions;
    uriHelper: UriHelper;
    constructor(options: ExportsOptions, http: Client);
    gobd(gobdQuery: GobdQuery, queryOrOptions?: GobdQueryOrOptions): Promise<ExportsV1Response>;
}
