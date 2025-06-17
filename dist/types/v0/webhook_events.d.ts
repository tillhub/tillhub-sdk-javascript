import { Client } from '../client';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
import { Webhook } from './webhooks';
export interface WebhooksOptions {
    user?: string;
    base?: string;
}
export interface WebhookEventQuery {
    sentSuccess?: boolean;
    returnRetries?: boolean;
    start?: string;
    end?: string;
    event?: string[];
    eventId?: string[];
    entity?: string[];
    eventType?: string[];
    version?: string;
    limit?: number;
    offset?: number;
    deleted?: boolean;
    active?: boolean;
    uri?: string;
}
export interface WebhookEventResponse {
    msg?: string;
    data: WebhookEvent[];
    metadata: Record<string, unknown>;
    next?: () => Promise<WebhookEventResponse>;
}
export interface WebhookEventTestResponse {
    msg: string;
    data: WebhookEvent[];
}
export declare type EventType = 'create' | 'update' | 'delete';
export interface WebhookEvent {
    id?: string;
    entityInstanceId?: string;
    entity?: string;
    eventType?: EventType;
    nextTryAt?: Date;
    requestPayload?: JSON;
    triesCount?: number;
    sentSuccessfully?: boolean;
    url?: string;
    version?: string;
    webhook?: Webhook;
    children?: WebhookEventLog[];
}
export interface WebhookEventLog {
    id?: string;
    responsePayload?: JSON;
    sentSuccessfully?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    webhookEvent?: WebhookEvent;
}
export interface WebhookEventTestPayload {
    events: string[];
}
export declare class WebhookEvents extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: WebhooksOptions;
    uriHelper: UriHelper;
    constructor(options: WebhooksOptions, http: Client);
    getAll(webhookId: string, query?: WebhookEventQuery | undefined): Promise<WebhookEventResponse>;
    meta(webhookId: string, query?: WebhookEventQuery | undefined): Promise<WebhookEventResponse>;
    get(webhookId: string, eventId: string): Promise<WebhookEventResponse>;
    replay(webhookId: string, query?: WebhookEventQuery | undefined): Promise<WebhookEventResponse>;
    test(webhookId: string, payload: WebhookEventTestPayload): Promise<WebhookEventTestResponse>;
}
