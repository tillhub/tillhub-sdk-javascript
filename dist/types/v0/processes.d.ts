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
}
export interface ProcessesResponse {
    data: Process[];
    metadata: object;
}
export interface ProcessResponse {
    data: Process;
    metadata: object;
}
export interface Process {
    started_at?: string;
    finished_at?: string;
    assigned_staff?: string;
    status?: string;
    result?: object | {
        items: {
            code: string;
            amount: number;
        }[];
    };
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
}
export declare class ProcessesFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class ProcessesFetchOneFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class ProcessesUpdateFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class ProcessesCreationFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class ProcessesDeleteFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}