import { Client } from '../../client';
import { UriHelper } from '../../uri-helper';
import { PrintOptions } from '../print';
export interface PrintMessage {
    id?: string;
    printer?: string;
    message?: {
        type: string;
        body?: string | object;
    };
    response?: {
        status: number;
        msg?: string | object;
    };
}
export interface PrintMessagesResponse {
    data: PrintMessage[];
    metadata: object;
    msg?: string;
}
export interface PrintMessageResponse {
    data: PrintMessage;
    metadata: object;
    msg?: string;
}
export declare class Messages {
    http: Client;
    options: PrintOptions;
    uriHelper: UriHelper;
    constructor(options: PrintOptions, http: Client, uriHelper: UriHelper);
    getAll(query?: Object): Promise<PrintMessagesResponse>;
    get(messageId: string): Promise<PrintMessageResponse>;
    create(message: Object): Promise<PrintMessageResponse>;
    update(messageId: string, message: Object): Promise<PrintMessageResponse>;
    delete(messageId: string): Promise<PrintMessageResponse>;
}
