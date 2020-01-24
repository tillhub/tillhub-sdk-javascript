import { Client } from '../client';
import { BaseError } from '../errors';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface DependenciesOptions {
    user?: string;
    base?: string;
}
export declare type DependenciesTypes = 'tax_account' | 'revenue_account' | 'product_group';
export interface DependenciesQuery {
    resource: string;
    type: DependenciesTypes;
}
export interface DependenciesResponse {
    data: Dependents[];
    metadata: object;
}
export interface Dependents {
    products?: number;
    product_groups?: number;
    price_book_entries?: number;
}
export declare class Dependencies extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: DependenciesOptions;
    uriHelper: UriHelper;
    constructor(options: DependenciesOptions, http: Client);
    get(query: DependenciesQuery): Promise<DependenciesResponse>;
}
export declare class DependenciesFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
