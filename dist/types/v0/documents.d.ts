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
    createdAt?: string;
    documentNumber: string;
    documentType: string;
    id: string;
    updatedAt?: string;
}
export interface DocumentsSendQuery {
    partnerName: string;
    recipients: string[];
}
export interface DocumentsSendResponse {
    data: {
        success: true;
    };
    msg: string;
}
export interface DocumentsDownloadResponse {
    data?: string;
    contentType?: string;
    filename?: string;
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
    send(documentId: string, sendQuery: DocumentsSendQuery): Promise<DocumentsSendResponse>;
    download(documentId: string): Promise<DocumentsDownloadResponse>;
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
export declare class DocumentsSendFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class DocumentsDownloadFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
