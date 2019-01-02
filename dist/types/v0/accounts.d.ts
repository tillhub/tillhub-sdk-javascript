import { Client } from '../client';
export interface AccountsOptions {
    user?: string;
    base?: string;
}
export interface AccountsQuery {
    limit?: number;
    uri?: string;
}
export interface AccountsResponse {
    data: object[];
    metadata: object;
}
export declare class Accounts {
    endpoint: string;
    http: Client;
    options: AccountsOptions;
    constructor(options: AccountsOptions, http: Client);
    getAll(query?: AccountsQuery | undefined): Promise<AccountsResponse>;
}
