import { Client } from '../client';
import { BaseError } from '../errors';
import { ThBaseHandler } from '../base';
import { UriHelper } from '../uri-helper';
export interface ReasonsOptions {
    user?: string;
    base?: string;
}
export interface ReasonsQuery {
    limit?: number;
    uri?: string;
    query?: {
        deleted?: boolean;
        active?: boolean;
    };
}
export interface ReasonsResponse {
    data: Reason[];
    metadata: Record<string, unknown>;
}
export interface ReasonResponse {
    data?: Reason;
    metadata?: {
        count?: number;
        patch?: any;
    };
    msg?: string;
}
export interface Reason {
    id?: string;
    name?: string;
    description?: string;
    type?: string;
    behavior?: Behavior;
}
export interface Behavior {
    stock?: string;
    stock_location?: string;
    navigation?: string;
}
export declare class Reasons extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: ReasonsOptions;
    uriHelper: UriHelper;
    constructor(options: ReasonsOptions, http: Client);
    getAll(queryOrOptions?: ReasonsQuery | undefined): Promise<ReasonsResponse>;
    get(reasonId: string): Promise<ReasonResponse>;
    put(reasonId: string, reason: Reason): Promise<ReasonResponse>;
    create(reason: Reason): Promise<ReasonResponse>;
    delete(reasonId: string): Promise<ReasonResponse>;
}
export declare class ReasonsFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class ReasonsFetchOneFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class ReasonsPutFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class ReasonsCreationFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class ReasonsDeleteFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
