import { Client } from '../client';
import { ThBaseHandler } from '../base';
import { UriHelper } from '../uri-helper';
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
    metadata: Record<string, unknown>;
    next?: () => Promise<AccountsResponse>;
}
export interface AccountResponse {
    data?: Account;
    metadata?: {
        count?: number;
        patch?: any;
    };
    msg?: string;
}
interface AccountsRefType {
    id?: string;
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
    uriHelper: UriHelper;
    constructor(options: AccountsOptions, http: Client);
    getAll(queryOrOptions?: AccountsQueryOrOptions | undefined): Promise<AccountsResponse>;
    get(accountId: string): Promise<AccountResponse>;
    put(accountId: string, account: Account): Promise<AccountResponse>;
    create(account: Account): Promise<AccountResponse>;
    delete(accountId: string): Promise<AccountResponse>;
}
export {};
