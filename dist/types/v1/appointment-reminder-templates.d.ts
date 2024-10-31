import { Client } from '../client';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
import { BaseError } from '../errors';
export interface AppointmentReminderTemplatesOptions {
    user?: string;
    base?: string;
}
export declare type AppointmentReminderTemplateType = 'email' | 'sms';
export interface AppointmentReminderTemplateTypeEntity {
    id?: string;
    type?: AppointmentReminderTemplateType;
    language?: string;
    name?: string;
    content?: string;
    subject?: string;
}
export interface AppointmentReminderTemplatesResponse {
    data?: AppointmentReminderTemplateTypeEntity[];
    metadata?: {
        count?: number;
        patch?: any;
    };
    msg?: string;
}
export interface AppointmentReminderTemplatesQuery {
    language?: string;
}
export declare class AppointmentReminderTemplates extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: AppointmentReminderTemplatesOptions;
    uriHelper: UriHelper;
    constructor(options: AppointmentReminderTemplatesOptions, http: Client);
    getAll(query?: AppointmentReminderTemplatesQuery | undefined): Promise<AppointmentReminderTemplatesResponse>;
}
export declare class AppointmentReminderTemplatesFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
