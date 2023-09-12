import { Client } from '../client';
import { BaseError } from '../errors';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface ConsignmentNotesResponse {
    data?: ConsignmentNote[];
    metadata?: Record<string, unknown>;
    msg?: string;
    next?: () => Promise<ConsignmentNotesResponse>;
}
export interface ConsignmentNote {
    id: string;
    createdAt?: string;
    createdBy?: string;
    purchaseOrder?: {
        id?: string;
    };
    consignmentNoteNumber: string;
}
export interface ConsignmentNotesMetaQuery {
    consignmentNoteNumber?: string;
}
export interface ConsignmentNotesOptions {
    base?: string;
    limit?: number;
    uri?: string;
    query?: ConsignmentNotesQuery;
}
export interface ConsignmentNotesQuery {
    consignmentNoteNumber?: string;
    [key: string]: any;
}
export interface ConsignmentNotesPdfResponse {
    data?: string;
    contentType?: string;
    filename?: string;
}
export declare class ConsignmentNotes extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: ConsignmentNotesOptions;
    uriHelper: UriHelper;
    constructor(options: ConsignmentNotesOptions, http: Client);
    getAll(options?: ConsignmentNotesOptions | undefined): Promise<ConsignmentNotesResponse>;
    meta(q?: ConsignmentNotesMetaQuery | undefined): Promise<ConsignmentNotesResponse>;
    pdfUri(consignmentNoteId: string): Promise<ConsignmentNotesPdfResponse>;
}
export declare class ConsignmentNotesFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class ConsignmentNotesMetaFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
