import { Client } from '../client';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface PdfRequestObject {
    transactionId: string;
    template: string;
    query?: TransactionsQuery;
}
export interface TransactionsQuery {
    uri?: string;
    format?: string;
    legacy?: boolean;
    query?: object;
}
export interface TransactionsMetaQuery {
    type?: string | string[];
    legacy?: boolean;
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
export declare class Transactions extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: TransactionsOptions;
    uriHelper: UriHelper;
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
