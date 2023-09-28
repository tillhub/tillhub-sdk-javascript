import { Client } from '../client';
import { BaseError } from '../errors';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface DocumentsOptions {
    user?: string;
    base?: string;
}
export interface DocumentsMultipleResponse {
    data: Document[];
    metadata?: Record<string, unknown>;
    next?: () => Promise<DocumentsMultipleResponse>;
}
export interface Document {
    id: string;
    createdAt?: string;
    createdBy?: string;
    documentType: string;
    filter: Record<string, any>;
    location: string | null;
    expireDate: string | null;
}
export declare class Documents extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: DocumentsOptions;
    uriHelper: UriHelper;
    constructor(options: DocumentsOptions, http: Client);
    getAll(query?: Record<string, unknown>): Promise<DocumentsMultipleResponse>;
    meta(query?: Record<string, unknown>): Promise<DocumentsMultipleResponse>;
}
export declare class DocumentsGetFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class DocumentsMetaFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
