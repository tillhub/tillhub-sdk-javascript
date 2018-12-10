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
export interface TransactionsOptions {
    user?: string;
    base?: string;
}
export interface TransactionResponse {
    data: object[];
}
interface FiskaltrustAuth {
    cashbox: string;
    cashbox_auth: string;
}
export declare class Transactions {
    endpoint: string;
    http: Client;
    signing: Signing;
    options: TransactionsOptions;
    constructor(options: TransactionsOptions, http: Client);
    pdfUri(requestObject: PdfRequestObject): Promise<TransactionResponse>;
}
export declare class Signing {
    endpoint: string;
    http: Client;
    options: TransactionsOptions;
    constructor(options: TransactionsOptions, http: Client);
    initialise(singingResourceType: string, singingResource: string, signingSystem: string, signingConfiguration: FiskaltrustAuth): Promise<TransactionResponse>;
}
export {};
