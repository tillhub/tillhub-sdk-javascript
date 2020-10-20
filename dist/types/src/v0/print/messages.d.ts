import { Client } from '../../client';
import { UriHelper } from '../../uri-helper';
import { PrintOptions } from '../print';
export interface PrintMessage {
    id?: string;
    printer?: string;
    message?: {
        type: string;
        body?: string | Record<string, unknown>;
    };
    response?: {
        status: number;
        msg?: string | Record<string, unknown>;
    };
}
export interface PrintMessagesResponse {
    data?: PrintMessage[];
    metadata?: Record<string, unknown>;
    msg?: string;
}
export interface PrintMessageResponse {
    data?: PrintMessage;
    metadata?: Record<string, unknown>;
    msg?: string;
}
export declare class Messages {
    http: Client;
    options: PrintOptions;
    uriHelper: UriHelper;
    constructor(options: PrintOptions, http: Client, uriHelper: UriHelper);
    getAll(query?: Record<string, unknown>): Promise<PrintMessagesResponse>;
    get(messageId: string): Promise<PrintMessageResponse>;
    create(message: Record<string, unknown>): Promise<PrintMessageResponse>;
    update(messageId: string, message: Record<string, unknown>): Promise<PrintMessageResponse>;
    delete(messageId: string): Promise<PrintMessageResponse>;
}
