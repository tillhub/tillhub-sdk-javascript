import { Client } from '../client';
import { UriHelper } from '../uri-helper';
import { BaseError } from '../errors/baseError';
import { ThBaseHandler } from '../base';
import { ServiceStepAssignments } from '../v1/service_step_assignments';
export interface ServicesOptions {
    user?: string;
    base?: string;
}
export interface ServiceResponse {
    data?: ServicesObject;
    metadata?: {
        count?: number;
        patch?: any;
    };
    msg?: string;
}
export interface ServicesObject {
    name: string;
    category?: string;
    duration: number;
    description?: string;
    linked_product: string;
    id?: string;
    deleted?: boolean;
    locations?: null | string[];
    bookable_online?: boolean;
}
export declare class Services extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: ServicesOptions;
    uriHelper: UriHelper;
    constructor(options: ServicesOptions, http: Client);
    create(service: ServicesObject): Promise<ServiceResponse>;
    put(serviceId: string, service: ServicesObject): Promise<ServiceResponse>;
    steps(): ServiceStepAssignments;
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
