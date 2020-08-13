import { Client } from '../client';
import { BaseError } from '../errors';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface CountingProtocolsOptions {
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
export interface CountingProtocolsResponse {
    data: CountingProtocol[];
    metadata?: {
        count?: number;
        patch?: any;
    };
    msg?: string;
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
    cash_units?: Record<string, unknown>[];
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
export declare class CountingProtocols extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: CountingProtocolsOptions;
    uriHelper: UriHelper;
    constructor(options: CountingProtocolsOptions, http: Client);
    getAll(query?: CountingProtocolsQuery): Promise<CountingProtocolsResponse>;
    meta(): Promise<CountingProtocolsResponse>;
}
export declare class CountingProtocolsFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class CountingProtocolsMetaFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
