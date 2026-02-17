import { Client } from '../client';
import { BaseError } from '../errors/baseError';
import { UriHelper } from '../uri-helper';
export declare enum FileStatus {
    UPLOADING = "UPLOADING",
    UPLOADED = "UPLOADED",
    PROCESSING = "PROCESSING",
    UPLOAD_FAILED = "UPLOAD_FAILED",
    PROCESSING_FAILED = "PROCESSING_FAILED",
    PROCESSING_DONE = "PROCESSING_DONE"
}
export interface FileBatch {
    id: number;
    inputFileName: string;
    inputFileFormat: 'csv';
    uploadedOn: string;
    inputFileSize: number;
    state: FileStatus;
    createdBy: string;
    outputFileName: string;
}
export interface FileBatchFilters {
    fileName?: string;
    state?: FileStatus;
    uploadedOn?: string;
    inputFileSize?: number;
}
export interface TransactionBatchesQuery extends FileBatchFilters {
    active?: boolean;
}
export interface TransactionBatchesQueryHandler {
    limit?: number;
    uri?: string;
    query?: TransactionBatchesQuery;
    orderFields?: string[] | string;
}
export interface FileUploadPayload {
    publicKey: string;
    file: File;
}
export interface TransactionBatchesOptions {
    user?: string;
    base?: string;
}
export interface TransactionBatchUploadResponse {
    data?: Record<string, unknown>;
    msg?: string;
}
export interface TransactionBatchesListResponse {
    data: FileBatch[];
    metadata: Record<string, unknown>;
    next?: () => Promise<TransactionBatchesListResponse>;
}
export interface TransactionBatchesMetaData {
    data: Record<string, unknown>;
    metadata: Record<string, unknown>;
}
export declare class TransactionBatches {
    endpoint: string;
    http: Client;
    options: TransactionBatchesOptions;
    uriHelper: UriHelper;
    constructor(options: TransactionBatchesOptions, http: Client);
    getAll(query?: TransactionBatchesQueryHandler | undefined): Promise<TransactionBatchesListResponse>;
    meta(query?: TransactionBatchesQueryHandler | undefined): Promise<TransactionBatchesMetaData>;
    download(id: string | number, fileName: string): Promise<Blob>;
    downloadInput(id: string | number, inputFileName: string): Promise<Blob>;
    upload(payload: FileUploadPayload): Promise<TransactionBatchUploadResponse>;
}
export declare class TransactionBatchUploadFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class TransactionBatchesFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class TransactionBatchesMetaFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class TransactionBatchDownloadFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class TransactionBatchDownloadInputFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
