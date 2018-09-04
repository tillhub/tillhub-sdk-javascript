import { Client } from '../Client';
export interface TransactionsOptions {
    user?: string;
    base?: string;
}
export interface TransactionsQuery {
    limit?: number;
    uri?: string;
}
export interface TransactionResponse {
    data: object[];
    metadata: object;
    next?: Promise<TransactionResponse>;
}
export declare class Transactions {
    endpoint: string;
    http: Client;
    options: TransactionsOptions;
    constructor(options: TransactionsOptions, http: Client);
    getAll(query?: TransactionsQuery | undefined): Promise<TransactionResponse>;
}
