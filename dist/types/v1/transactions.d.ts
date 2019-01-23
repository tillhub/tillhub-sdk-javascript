import { Client } from '../client';
export interface PdfRequestObject {
    transactionId: string;
    template: string;
    query?: TransactionsQuery;
}
export interface TransactionsQuery {
    uri?: string;
    format?: string;
}
export interface TransactionsMetaQuery {
    type?: string | string[];
}
export interface TransactionsOptions {
    user?: string;
    base?: string;
}
export interface TransactionResponse {
    data: object[];
    next?: () => Promise<TransactionResponse>;
}
interface FiskaltrustAuth {
    cashbox: string;
    cashbox_auth: string;
}
export declare class Transactions {
    endpoint: string;
    http: Client;
    options: TransactionsOptions;
    constructor(options: TransactionsOptions, http: Client);
    getAll(query?: TransactionsQuery | undefined): Promise<TransactionResponse>;
    meta(q?: TransactionsMetaQuery | undefined): Promise<TransactionResponse>;
}
export declare class TransactionsLegacy {
    endpoint: string;
    http: Client;
    signing: Signing;
    options: TransactionsOptions;
    constructor(options: TransactionsOptions, http: Client);
    getAll(query?: TransactionsQuery | undefined): Promise<TransactionResponse>;
    pdfUri(requestObject: PdfRequestObject): Promise<TransactionResponse>;
    meta(q?: TransactionsMetaQuery | undefined): Promise<TransactionResponse>;
}
export declare class Signing {
    endpoint: string;
    http: Client;
    options: TransactionsOptions;
    constructor(options: TransactionsOptions, http: Client);
    initialise(singingResourceType: string, singingResource: string, signingSystem: string, signingConfiguration: FiskaltrustAuth): Promise<TransactionResponse>;
    yearly(singingResourceType: string, singingResource: string, signingSystem: string): Promise<TransactionResponse>;
    monthly(singingResourceType: string, singingResource: string, signingSystem: string): Promise<TransactionResponse>;
    zero(singingResourceType: string, singingResource: string, signingSystem: string): Promise<TransactionResponse>;
}
export {};
