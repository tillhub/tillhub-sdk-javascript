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
export interface NotificationsMsuQuery {
    start?: string;
    end?: string;
    limit?: number;
    offset?: number;
    orderFields?: string[];
    q?: string;
}
export interface NotificationsMsuOptions {
    base?: string;
    limit?: number;
    uri?: string;
    query?: NotificationsMsuQuery;
}
export interface NotificationsMsuResponse {
    data?: Notification[];
    metadata?: Record<string, unknown>;
    msg?: string;
    next?: () => Promise<NotificationsMsuResponse>;
}
export interface NotificationSingleResponse {
    data: Notification;
    msg: string;
}
export interface ErrorObject {
    id: string;
    label: string;
    errorDetails: Record<string, unknown>;
}
export declare class NotificationsMsu extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: NotificationsMsuOptions;
    uriHelper: UriHelper;
    constructor(options: NotificationsMsuOptions, http: Client);
    getAll(options?: NotificationsMsuOptions | undefined): Promise<NotificationsMsuResponse>;
    get(notificationId: string): Promise<NotificationSingleResponse>;
    meta(q?: NotificationsMsuQuery | undefined): Promise<NotificationsMsuResponse>;
    create(notification: Notification): Promise<NotificationsMsuResponse>;
    update(notificationId: string, product: Notification): Promise<NotificationsMsuResponse>;
    delete(notificationId: string): Promise<NotificationsMsuResponse>;
}
export declare class NotificationsMsuFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class NotificationsMsuGetFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class NotificationsMsuMetaFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class NotificationsMsuCreateFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class NotificationsMsuUpdateFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class NotificationsMsuDeleteFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
