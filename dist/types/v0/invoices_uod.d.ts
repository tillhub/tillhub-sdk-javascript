import { Client } from '../client';
import { BaseError } from '../errors';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
declare type StateTypes = 'Open' | 'Paid' | 'Dunning' | 'Encashment' | 'Cancellation' | 'Cancellation paid';
declare type DocumentTypes = 'Standard' | 'Credit Note' | 'Partial Cancellation' | 'Full Cancellation';
declare type OriginTypes = 'Ecom' | 'POS';
declare type InvoiceType = 'pdf' | 'csv';
export interface UodInvoicesResponse {
    data: UodInvoicesEntity[];
    metadata: Record<string, unknown>;
    next?: () => Promise<UodInvoicesResponse>;
}
export interface UodInvoicesOptions {
    user?: string;
    base?: string;
}
export interface UodInvoicesQueryHandler {
    limit?: number;
    uri?: string;
    query?: UodInvoicesQuery;
    orderFields?: string[] | string;
}
export interface UodInvoicesQuery extends UodInvoicesEntity {
    active?: boolean;
}
export interface UodInvoicesEntity {
    document: Document;
    billingPeriodStart: Date | string;
    billingPeriodEnd: Date | string;
    origin?: OriginTypes;
    state?: StateTypes;
    type?: DocumentTypes;
    csvUrl?: string;
    pdfUrl?: string;
}
export interface Document {
    id?: string;
    documentNumber?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}
export interface ErrorObject {
    id: string;
    label: string;
    errorDetails: Record<string, unknown>;
}
export interface DocumentsDownloadResponse {
    url?: string;
    data?: string;
    contentType?: string;
    filename?: string;
    correlationId?: string;
}
export declare class UodInvoices extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: UodInvoicesOptions;
    uriHelper: UriHelper;
    constructor(options: UodInvoicesOptions, http: Client);
    getAll(query?: UodInvoicesQueryHandler | undefined): Promise<UodInvoicesResponse>;
    download(documentId: string, type: InvoiceType): Promise<DocumentsDownloadResponse>;
}
export declare class UodInvoicesFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class DocumentsDownloadFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export {};
