import { Client } from '../client';
import { BaseError } from '../errors';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface FunctionsOptions {
    user?: string;
    base?: string;
}
export interface FunctionsQuery {
    limit?: number;
    uri?: string;
    query?: {
        deleted?: boolean;
        active?: boolean;
    };
}
export interface FunctionsResponse {
    data: Array<Record<string, unknown>>;
    metadata: Record<string, unknown>;
    next?: () => Promise<FunctionsResponse>;
}
export interface FunctionResponse {
    data?: () => any;
    metadata?: {
        count?: number;
        patch?: any;
    };
    msg?: string;
}
export declare type FunctionRuntime = 'pos' | 'nodejs8x' | 'python27';
export declare type FunctionType = 'local' | 'http' | 'pubsub';
export declare type FunctionConfigurationClass = 'instant_checkout' | 'add_to_cart';
export declare type FunctionConfigurationResourceType = 'product' | 'discount' | 'voucher_action' | 'customer';
export interface FunctionConfigurationResource {
    type?: FunctionConfigurationResourceType;
    obj?: string;
}
export interface FunctionConfigurationImages {
    original?: string;
    '1x'?: string;
    avatar?: string;
}
export interface FunctionConfiguration {
    class: FunctionConfigurationClass;
    description?: string;
    resources?: FunctionConfigurationResource[];
    images?: FunctionConfigurationImages;
}
export interface FunctionInterface {
    name?: string;
    runtime?: FunctionRuntime;
    type?: FunctionType;
    function?: string;
    topic?: string;
    handler?: string;
    deps?: string;
    active?: boolean;
    deleted?: boolean;
    configuration?: FunctionConfiguration;
}
export declare class Functions extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: FunctionsOptions;
    uriHelper: UriHelper;
    constructor(options: FunctionsOptions, http: Client);
    getAll(query?: FunctionsQuery | undefined): Promise<FunctionsResponse>;
    get(functionId: string): Promise<FunctionResponse>;
    put(functionId: string, fn: FunctionInterface): Promise<FunctionResponse>;
    create(fn: FunctionInterface): Promise<FunctionResponse>;
    delete(functionId: string): Promise<FunctionResponse>;
}
export declare class FunctionsFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class FunctionFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class FunctionPutFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class FunctionCreationFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class FunctionDeleteFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
