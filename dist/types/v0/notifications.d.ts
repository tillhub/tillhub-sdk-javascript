import { Client } from '../client';
import { UriHelper } from '../uri-helper';
export interface NotificationsOpions {
    user?: string;
    base?: string;
}
export interface EmailOptions {
    type: string;
    body?: object;
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
}
