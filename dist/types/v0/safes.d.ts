import { Client } from '../client';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface SafesOptions {
    user?: string;
    base?: string;
}
export interface SafesQuery {
    limit?: number;
    uri?: string;
    location?: string;
}
export interface SafeResponse {
    data: SafesResponse;
    metadata?: {
        count?: number;
    };
    msg?: string;
}
export interface SafesResponse {
    data: object[];
    metadata: object;
}
export interface AmountItem {
    currency: string;
    amount: number;
}
export interface Safe {
    type?: string;
    account_number?: string;
    name?: string;
    custom_id?: string;
    cost_center?: string;
    location?: string;
    state?: string;
    limit_upper?: number;
    limit_lower?: number;
    items?: Array<AmountItem> | null;
    metadata?: object;
    deleted?: boolean;
    active?: boolean;
}
export interface BookRequestBody {
    to: string;
    from: string;
    issuer: string;
    items: Array<Object>;
    comment?: string;
    initiated_at?: string;
}
export interface SafesLogBookOptions {
    user?: string;
    base?: string;
}
export interface SafesLogBookQuery {
    limit?: number;
    uri?: string;
    embed?: string | string[];
    operation?: string | string[];
    exclude_errors?: boolean;
    start?: string;
    end?: string;
    transaction_id?: string;
    transfer_party?: string;
}
export interface SafesLogBookResponse {
    data: object[];
    next?: () => Promise<SafesLogBookResponse>;
}
export declare class Safes extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: SafesOptions;
    uriHelper: UriHelper;
    constructor(options: SafesOptions, http: Client);
    getAll(query?: SafesQuery | undefined): Promise<SafesResponse>;
    get(safeId: string): Promise<SafeResponse>;
    meta(): Promise<SafesResponse>;
    create(safe: Safe): Promise<SafeResponse>;
    put(safeId: string, safe: Safe): Promise<SafeResponse>;
    book(body: BookRequestBody): Promise<SafeResponse>;
}
export declare class SafesLogBook extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: SafesLogBookOptions;
    uriHelper: UriHelper;
    constructor(options: SafesLogBookOptions, http: Client);
    getAll(query?: SafesLogBookQuery | undefined): Promise<SafesLogBookResponse>;
    meta(query?: SafesLogBookQuery | undefined): Promise<SafesLogBookResponse>;
}
