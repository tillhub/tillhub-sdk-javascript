import { Client } from '../../../client';
import { UriHelper } from '../../../uri-helper';
export interface BalancesOptions {
    user?: string;
    base?: string;
}
export interface BalanceGetOneQuery {
    legacy?: boolean;
    currency: string;
}
export interface BalancesGetOneRequestObject {
    balanceId: string;
    query: BalanceGetOneQuery;
}
export interface BalancesResponse {
    data: Array<Record<string, unknown>>;
    metadata: Record<string, unknown>;
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
    legacy?: boolean;
}
export declare class Balances {
    http: Client;
    options: BalancesOptions;
    uriHelper: UriHelper;
    constructor(options: BalancesOptions, http: Client, uriHelper: UriHelper);
    getAll(query?: BalancesQuery): Promise<BalancesResponse>;
    meta(query?: BalancesQuery): Promise<BalancesResponse>;
    get(requestObject: BalancesGetOneRequestObject): Promise<BalancesResponse>;
}
