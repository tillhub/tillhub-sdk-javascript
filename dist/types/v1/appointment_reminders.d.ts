import { Client } from '../client';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
import { BaseError } from '../errors';
import { AppointmentReminderTemplates } from './appointment-reminder-templates';
export interface AppointmentRemindersOptions {
    user?: string;
    base?: string;
}
export declare type ReminderType = 'email' | 'sms';
export interface AppointmentReminderEntity {
    id?: string;
    type?: ReminderType;
    locationId?: string;
    active?: boolean;
    templateId?: string;
    reminderLeadTime?: {
        type: 'day' | 'hour' | 'month';
        value: number;
    };
}
export interface AppointmentRemindersResponse {
    data?: AppointmentReminderEntity;
    metadata?: {
        count?: number;
        patch?: any;
    };
    msg?: string;
}
export declare class AppointmentReminders extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: AppointmentRemindersOptions;
    uriHelper: UriHelper;
    constructor(options: AppointmentRemindersOptions, http: Client);
    get(): Promise<AppointmentRemindersResponse>;
    post(appointmentReminder: AppointmentReminderEntity): Promise<AppointmentRemindersResponse>;
    patch(id: string, appointmentReminder: AppointmentReminderEntity): Promise<AppointmentRemindersResponse>;
    templates(): AppointmentReminderTemplates;
}
export declare class AppointmentReminderPatchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class AppointmentReminderPostFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class AppointmentReminderFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
