import { Client } from '../../../client';
import { UriHelper } from '../../../uri-helper';
export interface BalancesOptions {
    user?: string;
    base?: string;
}
export interface BalancesResponse {
    data: object[];
    metadata: object;
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
    meta(): Promise<BalancesResponse>;
}
