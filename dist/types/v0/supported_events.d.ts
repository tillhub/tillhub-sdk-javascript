import { Client } from '../client';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface WebhooksOptions {
    user?: string;
    base?: string;
}
export interface SupportedEventResponse {
    msg?: string;
    data: SupportedEvent[];
    metadata: Record<string, unknown>;
}
export declare type EventType = 'create' | 'update' | 'delete';
export interface SupportedEvent {
    event?: string;
    entity?: string;
    eventType?: EventType;
    version?: number;
    payloadExample?: JSON;
}
export declare class SupportedEvents extends ThBaseHandler {
    static baseEndpoint: string;
    static baseUrl: string;
    endpoint: string;
    http: Client;
    options: WebhooksOptions;
    uriHelper: UriHelper;
    constructor(options: WebhooksOptions, http: Client);
    getAll(): Promise<SupportedEventResponse>;
}
