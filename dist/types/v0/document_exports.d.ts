import { Client } from '../client';
import { BaseError } from '../errors';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface DocumentExportsOptions {
    user?: string;
    base?: string;
}
export interface DocumentExportssMultipleResponse {
    data: DocumentExport[];
    metadata?: Record<string, unknown>;
    next?: () => Promise<DocumentExportssMultipleResponse>;
}
export interface DocumentExport {
    id: string;
    documentType: string;
    createdAt: string | null;
    updatedAt: string | null;
    isSuccess: boolean | null;
    status: 'pending' | 'completed' | 'error';
    documentNumber: string | null;
    schedule: null | {
        id: string;
        documentType: string;
        startDate: string;
        lastExportedAt: string | null;
        email: string;
        active: boolean;
        createdAt: string;
        updatedAt: string;
    };
    user: null | {
        id: string;
        customId: string;
        name?: string;
        email?: string;
        createdAt: string;
        updatedAt: string;
    };
}
export declare class DocumentExports extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: DocumentExportsOptions;
    uriHelper: UriHelper;
    constructor(options: DocumentExportsOptions, http: Client);
    getAll(query?: Record<string, unknown>): Promise<DocumentExportssMultipleResponse>;
    meta(query?: Record<string, unknown>): Promise<DocumentExportssMultipleResponse>;
}
export declare class DocumentExportsGetFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class DocumentExportsMetaFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
