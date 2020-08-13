import { Client } from '../client';
import { BaseError } from '../errors';
import { UriHelper } from '../uri-helper';
export interface PricebookEntriesOptions {
    user?: string;
    base?: string;
}
export interface PricebookEntriesQuery {
    limit?: number;
    uri?: string;
    query?: {
        deleted?: boolean;
        active?: boolean;
        name?: string;
        price_book?: string;
    };
}
export interface PricebookEntriesResponse {
    data: PricebookEntry[];
    metadata: Record<string, unknown>;
    next?: () => Promise<PricebookEntriesResponse>;
}
export interface PricebookEntryResponse {
    data: PricebookEntry;
    metadata?: {
        count?: number;
        patch?: any;
    };
    msg?: string;
}
export interface PricebookEntry {
    price_book: string;
    product: string;
    name?: string;
    summary?: string;
    locations?: string[];
    clients?: string[];
    external_reference_id?: string;
    constraints?: Record<string, unknown>;
    value_type?: string;
    amount_net?: number;
    amount_gross?: number;
    rate?: number;
    discounted_by?: number;
    metadata?: Record<string, unknown>;
    active?: boolean;
    deleted?: boolean;
    updated_at?: string;
    created_at?: string;
}
export declare class PricebookEntries {
    http: Client;
    options: PricebookEntriesOptions;
    uriHelper: UriHelper;
    constructor(options: PricebookEntriesOptions, http: Client, uriHelper: UriHelper);
    getAll(query?: PricebookEntriesQuery | undefined): Promise<PricebookEntriesResponse>;
    meta(): Promise<PricebookEntriesResponse>;
    get(pricebookEntryId: string): Promise<PricebookEntryResponse>;
    put(pricebookEntryId: string, pricebookEntry: PricebookEntry): Promise<PricebookEntryResponse>;
    create(pricebookEntry: PricebookEntry): Promise<PricebookEntryResponse>;
    delete(pricebookEntryId: string): Promise<PricebookEntryResponse>;
}
export declare class PricebookEntriesFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class PricebookEntryFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class PricebookEntryPutFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class PricebookEntryCreationFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class PricebookEntryDeleteFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
