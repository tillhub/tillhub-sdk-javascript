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
export declare class Transactions {
    endpoint: string;
    http: Client;
    options: TransactionsOptions;
    constructor(options: TransactionsOptions, http: Client);
    pdfUri(requestObject: PdfRequestObject): Promise<TransactionResponse>;
}
