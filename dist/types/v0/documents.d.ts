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
export interface DocumentsBulkPreviewBody {
    documentIds: string[];
}
export interface DocumentsPreviewResponse {
    data: {
        subject?: string;
        body?: string;
    };
}
export interface DocumentsSendBody {
    recipients: string[];
}
export interface DocumentsBulkSendBody {
    recipients: string[];
    documentIds: string[];
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
export interface DocumentsBulkDownloadBody {
    documentIds: string[];
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
    preview(documentId: string): Promise<DocumentsPreviewResponse>;
    bulkPreview(body: DocumentsBulkPreviewBody): Promise<DocumentsPreviewResponse>;
    send(documentId: string, body: DocumentsSendBody): Promise<DocumentsSendResponse>;
    bulkSend(body: DocumentsBulkSendBody): Promise<DocumentsSendResponse>;
    download(documentId: string): Promise<DocumentsDownloadResponse>;
    bulkDownload(body: DocumentsBulkDownloadBody): Promise<DocumentsDownloadResponse>;
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
export declare class DocumentsBulkSendFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class DocumentsDownloadFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class DocumentsBulkDownloadFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
