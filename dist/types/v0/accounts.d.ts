import { Client } from '../client';
import { ThBaseHandler } from '../base';
export interface AccountsOptions {
    user?: string;
    base?: string;
}
export declare type AccountType = 'expense' | 'deposit' | 'bank';
export interface AccountsQueryOrOptions {
    limit?: number;
    uri?: string;
    query?: {
        type?: AccountType;
        deleted?: boolean;
        active?: boolean;
    };
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
export declare class Accounts extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: AccountsOptions;
    constructor(options: AccountsOptions, http: Client);
    getAll(queryOrOptions?: AccountsQueryOrOptions | undefined): Promise<AccountsResponse>;
    get(accountId: string): Promise<AccountResponse>;
    put(accountId: string, account: Account): Promise<AccountResponse>;
    create(account: Account): Promise<AccountResponse>;
    delete(accountId: string): Promise<AccountResponse>;
}
export {};
