import { Client } from '../client';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface MessagesOptions {
    user?: string;
    base?: string;
}
export interface MessagesQueryOptions {
    read?: boolean;
    ignored?: boolean;
    min_updated_at?: string;
}
export interface MessagesResponse {
    data: Message[];
    metadata: object;
}
export interface Message {
    message?: string;
    consumer_type?: string;
    channel?: string;
    level?: string;
    type?: string;
    payload?: object;
    metadata?: object;
    ignorable?: boolean;
    ignored?: boolean;
    read?: boolean;
    read_at?: string;
    deleted?: boolean;
    progress?: object;
    client_account?: string;
}
export declare class Messages extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: MessagesOptions;
    uriHelper: UriHelper;
    constructor(options: MessagesOptions, http: Client);
    getAll(query?: MessagesQueryOptions | undefined): Promise<MessagesResponse>;
    update(messageId: string, messageRequest: Message): Promise<MessagesResponse>;
}
