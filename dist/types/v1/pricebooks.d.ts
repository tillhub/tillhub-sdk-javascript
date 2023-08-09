import { Client } from '../client';
import { BaseError } from '../errors';
import { UriHelper } from '../uri-helper';
export interface PricebooksOptions {
    user?: string;
    base?: string;
}
export interface PricebooksQuery {
    limit?: number;
    uri?: string;
    query?: {
        deleted?: boolean;
        active?: boolean;
        name?: string;
    };
}
export interface PricebooksResponse {
    data: Pricebook[];
    metadata: Record<string, unknown>;
    next?: () => Promise<PricebooksResponse>;
}
export interface PricebookResponse {
    data?: Pricebook;
    metadata?: {
        count?: number;
        patch?: any;
    };
    msg?: string;
}
export interface Pricebook {
    name?: string;
    custom_id?: string;
    constraints?: Record<string, unknown>;
    active?: boolean;
    deleted?: boolean;
}
export declare class Pricebooks {
    http: Client;
    options: PricebooksOptions;
    uriHelper: UriHelper;
    constructor(options: PricebooksOptions, http: Client, uriHelper: UriHelper);
    getAll(query?: PricebooksQuery | undefined): Promise<PricebooksResponse>;
    meta(): Promise<PricebooksResponse>;
    get(pricebookId: string): Promise<PricebookResponse>;
    put(pricebookId: string, pricebook: Pricebook): Promise<PricebookResponse>;
    create(pricebook: Pricebook): Promise<PricebookResponse>;
    delete(pricebookId: string): Promise<PricebookResponse>;
    copy(pricebookIds: string[]): Promise<PricebookResponse>;
}
export declare class PricebooksFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class PricebookFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class PricebookPutFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class PricebookCreationFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class PricebookDeleteFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class PricebooksCopyFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
