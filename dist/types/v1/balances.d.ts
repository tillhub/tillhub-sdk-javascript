import { Client } from '../client';
import { ThBaseHandler } from '../base';
import { UriHelper } from '../uri-helper';
export interface BalancesOptions {
    user?: string;
    base?: string;
}
export interface BalancesResponse {
    data: Array<Record<string, unknown>>;
    metadata?: Record<string, unknown>;
    next?: () => Promise<BalancesResponse>;
}
export interface BalancesQuery {
    start?: string | null;
    end?: string | null;
    branches?: boolean | null;
    register?: boolean | null;
    staff?: string | null;
    limit?: number;
    uri?: string;
    format?: string;
}
export interface LatestQuery {
    register_number: string;
    branch_number: string;
    date_start: string;
}
export declare class Balances extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: BalancesOptions;
    uriHelper: UriHelper;
    constructor(options: BalancesOptions, http: Client);
    getAll(query?: BalancesQuery): Promise<BalancesResponse>;
    meta(): Promise<BalancesResponse>;
    get(transactionId: string): Promise<BalancesResponse>;
}
