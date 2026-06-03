import { Client } from '../client';
import { UriHelper } from '../uri-helper';
import { BaseError } from '../errors/baseError';
import { ThBaseHandler } from '../base';
export interface ServiceStepsOptions {
    user?: string;
    base?: string;
}
export interface ServiceStepsQuery {
    q?: string;
    limit?: number;
    uri?: string;
    deleted?: boolean;
}
export interface ServiceStepsResponse {
    data: ServiceStep[];
    metadata: Record<string, unknown>;
    next?: () => Promise<ServiceStepsResponse>;
}
export interface ServiceStepResponse {
    data?: ServiceStep;
    metadata?: {
        count?: number;
    };
    msg?: string;
}
export interface ServiceStepLinkedService {
    id: string;
    name: string;
}
export interface ServiceStep {
    id?: string;
    name: string;
    duration: number;
    active?: boolean;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
    services?: ServiceStepLinkedService[];
    servicesCount?: number;
}
export declare class ServiceSteps extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: ServiceStepsOptions;
    uriHelper: UriHelper;
    constructor(options: ServiceStepsOptions, http: Client);
    getAll(query?: ServiceStepsQuery | undefined): Promise<ServiceStepsResponse>;
    meta(): Promise<ServiceStepsResponse>;
    get(serviceStepId: string): Promise<ServiceStepResponse>;
    put(serviceStepId: string, serviceStep: ServiceStep): Promise<ServiceStepResponse>;
    create(serviceStep: ServiceStep): Promise<ServiceStepResponse>;
    delete(serviceStepId: string): Promise<ServiceStepResponse>;
}
export declare class ServiceStepsFetchAllFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class ServiceStepsMetaFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class ServiceStepFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class ServiceStepPutFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class ServiceStepCreationFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class ServiceStepDeleteFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
