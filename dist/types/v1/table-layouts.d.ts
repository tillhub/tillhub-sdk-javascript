import { ThBaseHandler } from '../base';
import { Client } from '../client';
import { BaseError } from '../errors';
import { UriHelper } from '../uri-helper';
export interface TableLayoutsOptions {
    user?: string;
    base?: string;
}
export interface TableLayoutsQuery {
    limit?: number;
    uri?: string;
    query?: {
        deleted?: boolean;
        active?: boolean;
        q?: string;
        locations?: string[];
    };
}
export interface TableLayoutDuplicateOptions {
    location: string;
    name: string;
}
export interface TableLayoutsResponse {
    data: TableLayoutEntity[];
    metadata?: {
        count?: number;
        cursor?: {
            next?: string;
        };
    };
    next?: () => Promise<TableLayoutsResponse>;
    msg?: string;
}
export interface TableLayoutResponse {
    data?: TableLayoutEntity;
    msg?: string;
    metadata?: {
        count?: number;
    };
}
export interface TableLayoutEntity {
    id?: string;
    name?: string;
    location?: string;
    tables_count?: number;
    active?: boolean;
    layout?: Record<string, any>;
}
export declare class TableLayouts extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: TableLayoutsOptions;
    uriHelper: UriHelper;
    constructor(options: TableLayoutsOptions, http: Client);
    getAll(query?: TableLayoutsQuery | undefined): Promise<TableLayoutsResponse>;
    meta(query?: TableLayoutsQuery): Promise<TableLayoutsResponse>;
    get(id: string): Promise<TableLayoutResponse>;
    put(id: string, tableLayout: TableLayoutEntity): Promise<TableLayoutResponse>;
    create(tableLayout: TableLayoutEntity): Promise<TableLayoutResponse>;
    delete(id: string): Promise<TableLayoutResponse>;
    duplicate(id: string, options: TableLayoutDuplicateOptions): Promise<TableLayoutResponse>;
    toggleActive(id: string): Promise<TableLayoutResponse>;
}
export declare class TableLayoutsFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class TableLayoutsMetaFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class TableLayoutFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class TableLayoutPutFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class TableLayoutCreateFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class TableLayoutDeleteFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class TableLayoutDuplicateFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class TableLayoutToggleActiveFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
