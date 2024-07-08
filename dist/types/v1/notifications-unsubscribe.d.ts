import { Client } from '../client';
import { BaseError } from '../errors';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface NotificationsUnsubscribeOptions {
    base?: string;
    uri?: string;
    user: undefined;
}
export interface NotificationsUnsubscribeResponse {
    msg: string;
}
export declare class NotificationsUnsubscribe extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: NotificationsUnsubscribeOptions;
    uriHelper: UriHelper;
    constructor(options: NotificationsUnsubscribeOptions, http: Client);
    unsubscribe(tenantId: string, notificationId: string): Promise<NotificationsUnsubscribeResponse>;
}
export declare class NotificationsUnsubscribeFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
