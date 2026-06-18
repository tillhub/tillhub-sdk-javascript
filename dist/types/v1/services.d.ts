import { Client } from '../client';
import { UriHelper } from '../uri-helper';
import { BaseError } from '../errors/baseError';
import { ThBaseHandler } from '../base';
export interface ServicesOptions {
    user?: string;
    base?: string;
}
export interface ServicesQuery {
    q?: string;
    limit?: number;
    offset?: number;
    uri?: string;
    active?: boolean;
    deleted?: boolean;
    serviceCategoryId?: string;
}
export interface ServicesResponse {
    data: Service[];
    metadata: Record<string, unknown>;
}
export interface ServiceResponse {
    data?: Service;
    metadata?: {
        count?: number;
    };
    msg?: string;
}
export interface Service {
    id?: string;
    name: string;
    description?: string | null;
    duration: number;
    linkedProductId: string;
    bookableOnline?: boolean;
    serviceCategoryId?: string | null;
    locations?: string[] | null;
    active?: boolean;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
}
export declare class Services extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: ServicesOptions;
    uriHelper: UriHelper;
    constructor(options: ServicesOptions, http: Client);
    getAll(query?: ServicesQuery | undefined): Promise<ServicesResponse>;
    get(serviceId: string): Promise<ServiceResponse>;
    create(service: Service): Promise<ServiceResponse>;
    put(serviceId: string, service: Service): Promise<ServiceResponse>;
    delete(serviceId: string): Promise<ServiceResponse>;
}
export declare class ServicesFetchAllFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class ServiceFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class ServiceCreationFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class ServicePutFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class ServiceDeleteFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
