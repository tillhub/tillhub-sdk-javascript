import { Client } from '../client';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface WebhooksOptions {
    user?: string;
    base?: string;
}
export interface WebhookQuery {
    limit?: number;
    offset?: number;
    uri?: string;
}
export interface WebhookResponse {
    msg?: string;
    data?: Webhook[];
    metadata?: Record<string, unknown>;
    next?: () => Promise<WebhookResponse>;
}
export interface WebhookRegenerateSecretResponse {
    msg?: string;
    data: {
        secret: string;
    };
}
export interface Webhook {
    id?: string;
    createdBy?: string;
    description?: string;
    eventList?: string[];
    ratePerSecond?: number | null;
    maxInFlight?: number | null;
    burst?: number | null;
    connectTimeoutMs?: number | null;
    requestTimeoutMs?: number | null;
    secret?: string;
    updatedBy?: string;
    url?: string;
    active?: boolean;
    deletedAt?: Date;
}
export interface WebhookDeliveryLimitDefaults {
    ratePerSecond: number;
    burst: number;
    maxInFlight: number;
    connectTimeoutMs: number;
    requestTimeoutMs: number;
}
export interface WebhookDeliveryLimitDefaultsResponse {
    msg?: string;
    data?: WebhookDeliveryLimitDefaults;
    metadata?: Record<string, unknown>;
}
export declare class Webhooks extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: WebhooksOptions;
    uriHelper: UriHelper;
    constructor(options: WebhooksOptions, http: Client);
    getAll(query?: WebhookQuery | undefined): Promise<WebhookResponse>;
    get(webhookId: string): Promise<WebhookResponse>;
    create(webhook: Webhook): Promise<WebhookResponse>;
    put(webhookId: string, webhook: Webhook): Promise<WebhookResponse>;
    delete(webhookId: string): Promise<WebhookResponse>;
    defaults(): Promise<WebhookDeliveryLimitDefaultsResponse>;
    regenerateSecret(webhookId: string): Promise<WebhookRegenerateSecretResponse>;
}
