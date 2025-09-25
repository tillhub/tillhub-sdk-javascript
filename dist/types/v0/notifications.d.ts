import { Client } from '../client';
import { UriHelper } from '../uri-helper';
export interface NotificationsOpions {
    user?: string;
    base?: string;
}
export interface EmailOptions {
    type: string;
    body?: Record<string, unknown>;
}
export interface SmsOptions {
    to: string;
    body?: Record<string, unknown>;
}
export interface NotificationsResponse {
    msg?: string;
}
export declare class Notifications {
    endpoint: string;
    http: Client;
    options: NotificationsOpions;
    uriHelper: UriHelper;
    constructor(options: NotificationsOpions, http: Client);
    email(requestObject: EmailOptions): Promise<NotificationsResponse>;
    sms(requestObject: SmsOptions): Promise<NotificationsResponse>;
}
