import { Client } from '../client';
import { BaseError } from '../errors';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface Notification {
    active?: boolean;
    createdAt?: string;
    criteria?: {
        targetEntitiesIds: string[];
    };
    deletedAt?: string;
    emails?: string[];
    id?: string;
    locations?: string[];
    name?: string;
    nextRunAt?: string | null;
    period?: string;
    schedule?: string[] | null;
    startAt?: string | null;
    updatedAt?: string;
}
export interface NotificationsQuery {
    start?: string;
    end?: string;
    limit?: number;
    offset?: number;
    orderFields?: string[];
    q?: string;
}
export interface NotificationsOptions {
    base?: string;
    limit?: number;
    uri?: string;
    query?: NotificationsQuery;
}
export interface NotificationsResponse {
    data?: Notification[];
    metadata?: Record<string, unknown>;
    msg?: string;
    next?: () => Promise<NotificationsResponse>;
}
export interface ErrorObject {
    id: string;
    label: string;
    errorDetails: Record<string, unknown>;
}
export declare class Notifications extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: NotificationsOptions;
    uriHelper: UriHelper;
    constructor(options: NotificationsOptions, http: Client);
    getAll(options?: NotificationsOptions | undefined): Promise<NotificationsResponse>;
    meta(q?: NotificationsQuery | undefined): Promise<NotificationsResponse>;
    create(notification: Notification): Promise<NotificationsResponse>;
    update(notificationId: string, product: Notification): Promise<NotificationsResponse>;
    delete(notificationId: string): Promise<NotificationsResponse>;
}
export declare class NotificationsFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class NotificationsMetaFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class NotificationsCreateFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class NotificationsUpdateFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class NotificationsDeleteFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
