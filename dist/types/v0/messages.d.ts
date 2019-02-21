import { Client } from '../client';
export interface MessagesOptions {
    user?: string;
    base?: string;
}
export interface MessagesQueryOptions {
    read?: boolean;
    ignored?: boolean;
    last_updated_at?: string;
}
export interface MessagesResponse {
    data: Message[];
    metadata: object;
}
export interface Message {
    id: string;
    updated_at?: string;
    created_at: string;
    message?: string;
    invoked_at?: string;
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
export declare class Messages {
    endpoint: string;
    http: Client;
    options: MessagesOptions;
    constructor(options: MessagesOptions, http: Client);
    getAll(query?: MessagesQueryOptions | undefined): Promise<MessagesResponse>;
}
