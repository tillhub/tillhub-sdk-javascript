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
export interface DocumentExportsMetric {
    tags: {
        operation: string;
        documentType: string;
        result: 'success' | 'error';
    };
}
export interface DocumentExportsMetricResponse {
    data: DocumentExportsMetric;
    metadata: Record<string, unknown>;
}
export interface DocumentsExportsCreateResponse {
    data: {
        correlationId: string;
    };
}
export interface DocumentsExportsCreatePayload {
    documentType: string;
    email: string;
    filter: Record<string, unknown>;
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
    metric(metric: DocumentExportsMetric): Promise<DocumentExportsMetricResponse>;
    create(options: DocumentsExportsCreatePayload): Promise<DocumentsExportsCreateResponse>;
}
export declare class DocumentExportsGetFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class DocumentExportsCreateFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class DocumentExportsMetaFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class DocumentExportsMetricFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
