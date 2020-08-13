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
    metadata: Record<string, unknown>;
}
export interface MessageResponse {
    data: Message;
    metadata: Record<string, unknown>;
}
export interface Message {
    message?: string;
    consumer_type?: string;
    channel?: string;
    level?: string;
    type?: string;
    payload?: Record<string, unknown>;
    metadata?: Record<string, unknown>;
    ignorable?: boolean;
    ignored?: boolean;
    read?: boolean;
    read_at?: string;
    deleted?: boolean;
    progress?: Record<string, unknown>;
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
    update(messageId: string, messageRequest: Message): Promise<MessageResponse>;
}
