import { Client, Timeout } from '../client';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
import { AnalyticsOptions } from '../v0/analytics';
export interface PdfRequestObject {
    transactionId: string;
    template: string;
    query?: TransactionsQuery;
}
export interface TransactionsQuery {
    uri?: string;
    format?: string;
    legacy?: boolean;
    query?: Record<string, unknown>;
}
export interface TransactionsMetaQuery {
    type?: string | string[];
    legacy?: boolean;
    query?: Record<string, unknown>;
}
export interface TransactionResponse {
    data: Array<Record<string, unknown>>;
    metadata?: Record<string, unknown>;
    next?: () => Promise<TransactionResponse>;
}
export interface TransactionImageResponse {
    data: Record<string, unknown>;
}
export interface TransactionImage {
    original: string;
    '1x': string;
    '2x': string;
    '3x': string;
}
interface FiskaltrustAuth {
    cashbox: string;
    cashbox_auth: string;
}
export declare class Transactions extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: AnalyticsOptions;
    uriHelper: UriHelper;
    timeout: Timeout;
    constructor(options: AnalyticsOptions, http: Client);
    getAll(query?: TransactionsQuery | undefined): Promise<TransactionResponse>;
    meta(q?: TransactionsMetaQuery | undefined): Promise<TransactionResponse>;
    getImages(transactionId: string): Promise<TransactionResponse>;
    putImage(transactionId: string, image: TransactionImage): Promise<TransactionImageResponse>;
    createImage(transactionId: string, image: TransactionImage): Promise<TransactionImageResponse>;
}
export declare class TransactionsLegacy {
    endpoint: string;
    http: Client;
    signing: Signing;
    options: AnalyticsOptions;
    uriHelper: UriHelper;
    constructor(options: AnalyticsOptions, http: Client);
    getAll(query?: TransactionsQuery | undefined): Promise<TransactionResponse>;
    pdfUri(requestObject: PdfRequestObject): Promise<TransactionResponse>;
    meta(q?: TransactionsMetaQuery | undefined): Promise<TransactionResponse>;
}
export declare class Signing {
    endpoint: string;
    http: Client;
    options: AnalyticsOptions;
    uriHelper: UriHelper;
    constructor(options: AnalyticsOptions, http: Client);
    initialise(singingResourceType: string, singingResource: string, signingSystem: string, signingConfiguration: FiskaltrustAuth): Promise<TransactionResponse>;
    yearly(singingResourceType: string, singingResource: string, signingSystem: string): Promise<TransactionResponse>;
    monthly(singingResourceType: string, singingResource: string, signingSystem: string): Promise<TransactionResponse>;
    zero(singingResourceType: string, singingResource: string, signingSystem: string): Promise<TransactionResponse>;
}
export {};
