import { Client } from '../client';
import { ThBaseHandler } from '../base';
import { UriHelper } from '../uri-helper';
export interface ExpenseAccountsOptions {
    user?: string;
    base?: string;
}
export interface ExpenseAccountsQuery {
    limit?: number;
    uri?: string;
    query?: {
        deleted?: boolean;
        active?: boolean;
    };
}
export interface ExpenseAccountsResponse {
    data: ExpenseAccount[];
    metadata: Record<string, unknown>;
}
export interface ExpenseAccountResponse {
    data?: ExpenseAccount;
    metadata?: {
        count?: number;
        patch?: any;
    };
    msg?: string;
}
export declare type ExpenseAccountType = 'expense' | 'deposit' | 'bank';
export interface ExpenseAccount {
    id?: string;
    name: string;
    active?: boolean;
    fa_account_number: number;
    tax?: string;
    type: ExpenseAccountType;
    accepts_booking_from_safe?: boolean;
}
export declare class ExpenseAccounts extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: ExpenseAccountsOptions;
    uriHelper: UriHelper;
    constructor(options: ExpenseAccountsOptions, http: Client);
    getAll(queryOrOptions?: ExpenseAccountsQuery | undefined): Promise<ExpenseAccountsResponse>;
    get(expenseAccountId: string): Promise<ExpenseAccountResponse>;
    put(expenseAccountId: string, expenseAccount: ExpenseAccount): Promise<ExpenseAccountResponse>;
    create(expenseAccount: ExpenseAccount): Promise<ExpenseAccountResponse>;
    delete(expenseAccountId: string): Promise<ExpenseAccountResponse>;
}
