import { Client } from '../client';
import { UriHelper } from '../uri-helper';
import { BaseError } from '../errors/baseError';
interface TransactionsOptions {
    user?: string;
    base?: string;
}
interface TransactionImageResponseItem {
    correlationId?: string;
}
interface TransactionImageCreateResponse {
    data: TransactionImageResponseItem[];
    metadata?: Record<string, unknown>;
}
interface TransactionImageGetResponse {
    data: TransactionImage[];
    metadata?: Record<string, unknown>;
}
interface TransactionImage {
    original: string;
    '1x': string;
    '2x': string;
    '3x': string;
}
export declare class Transactions {
    endpoint: string;
    http: Client;
    options: TransactionsOptions;
    uriHelper: UriHelper;
    constructor(options: TransactionsOptions, http: Client);
    getImages(transactionId: string): Promise<TransactionImageGetResponse>;
    createImage(transactionId: string, image: string): Promise<TransactionImageCreateResponse>;
}
export declare class TransactionsGetImagesFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class TransactionsImageCreateFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export {};
