import { Client } from '../client';
import { UriHelper } from '../uri-helper';
import { BaseError } from '../errors/baseError';
import { ThBaseHandler } from '../base';
export interface ServiceCategoryOptions {
    user?: string;
    base?: string;
}
export interface ServiceCategoryResponse {
    data?: ServiceCategoryItem;
    metadata?: {
        count?: number;
        patch?: any;
    };
    msg?: string;
}
export interface ServiceCategoryItem {
    name: string;
    description?: string;
    active?: boolean;
    deleted?: boolean;
}
export interface ServiceCategoriesQuery {
    deleted?: boolean;
    active?: boolean;
    name?: string;
    q?: string;
    uri?: string;
}
export interface ServiceCategoriesResponse {
    data: Array<Record<string, unknown>>;
    metadata: Record<string, unknown>;
    next?: () => Promise<ServiceCategoriesResponse>;
}
export declare class ServiceCategory extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: ServiceCategoryOptions;
    uriHelper: UriHelper;
    constructor(options: ServiceCategoryOptions, http: Client);
    getAll(query?: ServiceCategoriesQuery | undefined): Promise<ServiceCategoriesResponse>;
    create(serviceCategory: ServiceCategoryItem): Promise<ServiceCategoryResponse>;
}
export declare class ServiceCategoryCreationFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
