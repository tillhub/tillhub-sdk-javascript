import { Client } from '../client';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
import { BaseError } from '../errors';
export interface ProcessesOptions {
    user?: string;
    base?: string;
}
export interface ProcessesQueryOptions {
    read?: boolean;
    ignored?: boolean;
    min_updated_at?: string;
    format?: string;
    uri?: string;
}
export interface ProcessItemsQueryOptions {
    format?: string;
}
export interface ProcessesResponse {
    data: Process[];
    metadata: Record<string, unknown>;
    next?: () => Promise<ProcessesResponse>;
}
export interface ProcessResponse {
    data?: Process;
    metadata?: Record<string, unknown>;
    msg?: string;
}
export interface ProcessItemsObject {
    code: string;
    amount: number;
}
export interface ProcessItems {
    items: ProcessItemsObject[];
}
export interface ProcessesItemsResponse {
    data: ProcessItems;
    metadata: Record<string, unknown>;
}
export interface Process {
    started_at?: string;
    finished_at?: string;
    assigned_staff?: string;
    status?: string;
    name?: string;
    result?: Record<string, unknown> | ProcessItemsObject;
    deleted?: boolean;
}
export declare class Processes extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: ProcessesOptions;
    uriHelper: UriHelper;
    constructor(options: ProcessesOptions, http: Client);
    create(process: Process): Promise<ProcessResponse>;
    getAll(query?: ProcessesQueryOptions): Promise<ProcessesResponse>;
    get(processId: string, query?: ProcessesQueryOptions): Promise<ProcessResponse>;
    update(processId: string, process: Process): Promise<ProcessResponse>;
    delete(processId: string): Promise<ProcessResponse>;
    getItems(processId: string, query?: ProcessItemsQueryOptions): Promise<ProcessesItemsResponse>;
    meta(query?: ProcessesQueryOptions): Promise<ProcessesResponse>;
}
export declare class ProcessesFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class ProcessesFetchOneFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class ProcessesUpdateFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class ProcessesCreationFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class ProcessesDeleteFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class ProcessItemsFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class ProcessesMetaFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
