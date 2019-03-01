import { Client } from '../client';
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
}
export interface LatestQuery {
    register_number: string;
    branch_number: string;
    date_start: string;
}
export declare class Balances {
    endpoint: string;
    http: Client;
    options: BalancesOptions;
    constructor(options: BalancesOptions, http: Client);
    getAll(q?: BalancesQuery): Promise<BalancesResponse>;
    get(transactionId: string): Promise<BalancesResponse>;
}
