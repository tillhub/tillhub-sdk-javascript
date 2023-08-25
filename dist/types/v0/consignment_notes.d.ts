import { Client } from '../client';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface ConsignmentNotesOptions {
    user?: string;
    base?: string;
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
    pdfUri(consignmentNoteId: string): Promise<ConsignmentNotesPdfResponse>;
}
