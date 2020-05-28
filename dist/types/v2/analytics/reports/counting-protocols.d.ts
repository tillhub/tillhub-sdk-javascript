import { ThAnalyticsBaseHandler } from '../../../base';
import { Client } from '../../../client';
import { BaseError } from '../../../errors';
export interface CountingProtocolsHandlerOptions {
    user?: string;
    base?: string;
}
export interface CountingProtocolsQuery {
    limit?: number;
    uri?: string;
    query?: {
        deleted?: boolean;
        active?: boolean;
        cashier?: string;
        branch?: string;
        time?: string;
        amount?: string;
        discrepancy?: boolean;
    };
}
export interface AnalyticsReportsCountingProtocolsResponse {
    data: CountingProtocol[];
    summary: object[];
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
    cash_units?: object[];
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
export declare class AnalyticsReportsCountingProtocols extends ThAnalyticsBaseHandler {
    http: Client;
    options: CountingProtocolsHandlerOptions;
    constructor(options: CountingProtocolsHandlerOptions, http: Client);
    static create(options: object, http: Client): AnalyticsReportsCountingProtocols;
    getAll(query?: CountingProtocolsQuery): Promise<AnalyticsReportsCountingProtocolsResponse>;
}
export declare class AnalyticsReportsCountingProtocolsFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
