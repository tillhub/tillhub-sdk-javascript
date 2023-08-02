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
    id?: string;
    active?: boolean;
    deleted?: boolean;
}
export declare class ServiceCategory extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: ServiceCategoryOptions;
    uriHelper: UriHelper;
    constructor(options: ServiceCategoryOptions, http: Client);
    create(serviceCategory: ServiceCategoryItem): Promise<ServiceCategoryResponse>;
    put(serviceCategoryId: string, serviceCategory: ServiceCategoryItem): Promise<ServiceCategoryResponse>;
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
