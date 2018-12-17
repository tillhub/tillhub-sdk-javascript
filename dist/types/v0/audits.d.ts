import { Client } from '../client';
export interface AuditsOptions {
    user?: string;
    base?: string;
}
export interface AuditsQuery {
    type?: string | string[];
    limit?: number;
    offset?: number;
    order_by?: string;
    order_direction?: string;
    embed?: string | string[];
    uri?: string;
}
export interface AuditsMetaQuery {
    type?: string | string[];
}
export interface AuditActionsGetOneRequestObject {
    auditActionId: string;
    query?: AuditsQuery;
}
export interface AuditActionsCreateBody {
    actions: object[];
}
export interface AuditsResponse {
    data?: object[];
    metadata?: object;
    msg?: string;
}
export declare class Audits {
    endpoint: string;
    http: Client;
    options: AuditsOptions;
    constructor(options: AuditsOptions, http: Client);
    getAllActions(q?: AuditsQuery | undefined): Promise<AuditsResponse>;
    getActionsMeta(q?: AuditsMetaQuery | undefined): Promise<AuditsResponse>;
    getOneAction(requestObject: AuditActionsGetOneRequestObject): Promise<AuditsResponse>;
    createAction(body: AuditActionsCreateBody): Promise<AuditsResponse>;
}
