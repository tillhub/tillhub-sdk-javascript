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
    data: Account[];
    metadata: object;
}
export interface AccountResponse {
    data: Account;
    metadata?: {
        count?: number;
        patch?: any;
    };
    msg?: string;
}
export interface Account {
    id?: string;
}
export declare type AccountType = 'expense' | 'deposit' | 'bank';
interface AccountsRefType {
    branch: string;
    branch_number: number;
    name: string;
    account: string;
}
export interface Account {
    name: string;
    fa_account_number?: string;
    type: AccountType;
    accounts: AccountsRefType[];
}
export declare class Accounts {
    endpoint: string;
    http: Client;
    options: AccountsOptions;
    constructor(options: AccountsOptions, http: Client);
    getAll(query?: AccountsQuery | undefined): Promise<AccountsResponse>;
    get(accountId: string): Promise<AccountResponse>;
    put(accountId: string, account: Account): Promise<AccountResponse>;
    create(account: Account): Promise<AccountResponse>;
}
export {};
