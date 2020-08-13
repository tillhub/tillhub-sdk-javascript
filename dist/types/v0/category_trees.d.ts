import { Client } from '../client';
import { BaseError } from '../errors';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface CategoryTreesOptions {
    user?: string;
    base?: string;
}
export interface CategoryTreesQuery {
    limit?: number;
    uri?: string;
    query?: {
        start?: string;
    };
}
export interface CategoryTreesResponse {
    data: Record<string, unknown>[];
    metadata: Record<string, unknown>;
    next?: () => Promise<CategoryTreesResponse>;
}
export interface CategoryTreeResponse {
    data: CategoryTree;
    metadata?: {
        count?: number;
        patch?: any;
    };
    msg?: string;
}
export interface CategoryTree {
    metadata?: Record<string, unknown>;
    name?: string;
    summary?: string;
    description?: string;
    comments?: string;
    children?: Record<string, unknown>[];
    active?: boolean;
    deleted?: boolean;
}
export declare class CategoryTrees extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: CategoryTreesOptions;
    uriHelper: UriHelper;
    constructor(options: CategoryTreesOptions, http: Client);
    getAll(query?: CategoryTreesQuery | undefined): Promise<CategoryTreesResponse>;
    get(categoryTreeId: string): Promise<CategoryTreeResponse>;
    put(categoryTreeId: string, categoryTree: CategoryTree): Promise<CategoryTreeResponse>;
    create(categoryTree: CategoryTree): Promise<CategoryTreeResponse>;
    delete(storefrontId: string): Promise<CategoryTreeResponse>;
}
export declare class CategoryTreesFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class CategoryTreeFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class CategoryTreePutFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class CategoryTreeCreationFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class CategortTreesDeleteFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
