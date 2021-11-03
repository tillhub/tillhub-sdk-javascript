import { ThAnalyticsBaseHandler, ThAnalyticsExportsBaseResponse } from '../../../base';
import { Client } from '../../../client';
import { BaseError } from '../../../errors';
import { AnalyticsOptions } from '../../../v0/analytics';
export interface CountingProtocolsQuery {
    limit?: number;
    uri?: string;
    query?: {
        deleted?: boolean;
        active?: boolean;
        cashier?: string;
        branch?: string;
        amount?: string;
        only_discrepancies?: boolean;
        date_start?: string;
        date_end?: string;
        format?: string;
        branch_custom_id?: string;
        register_custom_id?: string;
        cashier_staff?: string;
        counting_type?: string;
    };
}
export interface AnalyticsReportsCountingProtocolsResponse {
    data: CountingProtocol[];
    summary: Array<Record<string, unknown>>;
    metaData: {
        count: number;
        total_count: number;
    };
    next?: () => Promise<AnalyticsReportsCountingProtocolsResponse>;
}
export interface CountingProtocol {
    id: string;
    insert_id?: number;
    custom_id?: string;
    branch?: string;
    branch_custom_id?: string;
    register?: string;
    register_custom_id?: string;
    client?: string;
    client_custom_id?: string;
    staff?: string;
    cashier_staff?: string;
    device?: string;
    context?: string;
    comments?: string;
    location?: string;
    cash_units?: Array<Record<string, unknown>>;
    timezone?: string;
    discrepancy?: boolean;
    discrepancy_total?: string;
    temp_staff?: string;
    counting_type?: string;
    counting_date?: string;
    counting_tips?: string;
    balance_number?: string;
    balance_last?: string;
    balance_custom_id_last?: string;
    merchant_receipt?: string;
    client_id?: string;
    has_discrepancy?: boolean;
    total_counted?: string;
    total_calculated?: string;
}
export declare type AnalyticsReportsCountingProtocolsExportResponseItem = ThAnalyticsExportsBaseResponse;
export declare class AnalyticsReportsCountingProtocols extends ThAnalyticsBaseHandler {
    http: Client;
    options: AnalyticsOptions;
    timeout: AnalyticsOptions['timeout'];
    constructor(options: AnalyticsOptions, http: Client);
    static create(options: Record<string, unknown>, http: Client): AnalyticsReportsCountingProtocols;
    getAll(query?: CountingProtocolsQuery): Promise<AnalyticsReportsCountingProtocolsResponse>;
    export(query?: Record<string, unknown>): Promise<AnalyticsReportsCountingProtocolsExportResponseItem>;
}
export declare class AnalyticsReportsCountingProtocolsFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class AnalyticsReportsCountingProtocolsExportFetchError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
