import { Client } from '../client';
import { BaseError } from '../errors';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface CategoriesOptions {
    user?: string;
    base?: string;
}
export interface CategoriesQuery {
    limit?: number;
    uri?: string;
    query?: {
        start?: string;
    };
}
export interface CategoriesResponse {
    data: object[];
    metadata: object;
    next?: () => Promise<CategoriesResponse>;
}
export interface CategoryResponse {
    data: Category;
    metadata?: {
        count?: number;
        patch?: any;
    };
    msg?: string;
}
export interface Category {
    metadata?: object;
    name?: string;
    summary?: string;
    description?: string;
    comments?: string;
    color?: string;
    images?: object;
    active?: boolean;
    deleted?: boolean;
}
export declare class Categories extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: CategoriesOptions;
    uriHelper: UriHelper;
    constructor(options: CategoriesOptions, http: Client);
    getAll(query?: CategoriesQuery | undefined): Promise<CategoriesResponse>;
    get(categoryId: string): Promise<CategoryResponse>;
    put(categoryId: string, category: Category): Promise<CategoryResponse>;
    create(category: Category): Promise<CategoryResponse>;
    delete(storefrontId: string): Promise<CategoryResponse>;
}
export declare class CategoriesFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class CategoryFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class CategoryPutFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class CategoryCreationFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class CategoriesDeleteFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
