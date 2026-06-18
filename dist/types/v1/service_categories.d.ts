import { Client } from '../client';
import { UriHelper } from '../uri-helper';
import { BaseError } from '../errors/baseError';
import { ThBaseHandler } from '../base';
export interface ServiceCategoriesOptions {
    user?: string;
    base?: string;
}
export interface ServiceCategoriesQuery {
    q?: string;
    limit?: number;
    offset?: number;
    uri?: string;
    active?: boolean;
    deleted?: boolean;
    branchId?: string;
}
export interface ServiceCategoriesResponse {
    data: ServiceCategory[];
    metadata: Record<string, unknown>;
}
export interface ServiceCategoryResponse {
    data?: ServiceCategory;
    metadata?: {
        count?: number;
    };
    msg?: string;
}
export interface ServiceCategory {
    id?: string;
    name: string;
    description?: string | null;
    active?: boolean;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
}
export declare class ServiceCategories extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: ServiceCategoriesOptions;
    uriHelper: UriHelper;
    constructor(options: ServiceCategoriesOptions, http: Client);
    getAll(query?: ServiceCategoriesQuery | undefined): Promise<ServiceCategoriesResponse>;
    get(serviceCategoryId: string): Promise<ServiceCategoryResponse>;
    create(serviceCategory: ServiceCategory): Promise<ServiceCategoryResponse>;
    put(serviceCategoryId: string, serviceCategory: ServiceCategory): Promise<ServiceCategoryResponse>;
    delete(serviceCategoryId: string): Promise<ServiceCategoryResponse>;
}
export declare class ServiceCategoriesFetchAllFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class ServiceCategoryFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class ServiceCategoryCreationFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class ServiceCategoryPutFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class ServiceCategoryDeleteFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
