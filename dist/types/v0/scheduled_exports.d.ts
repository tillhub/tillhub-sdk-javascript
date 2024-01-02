import { Client } from '../client';
import { BaseError } from '../errors';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface ScheduledExportsOptions {
    user?: string;
    base?: string;
}
export interface ScheduledExportsCreateResponse {
    data: ScheduledExport;
}
export interface ScheduledExportsToggleResponse {
    data: ScheduledExport;
}
export interface ScheduledExport {
    id: string;
    documentType: string;
    startDate: string;
    lastExportedAt: string | null;
    email: string;
    active: boolean;
    interval: {
        years?: number;
        months?: number;
        days?: number;
        hours?: number;
        minutes?: number;
        seconds?: number;
        milliseconds?: number;
    };
    filter?: Record<string, unknown>;
    createdAt?: string;
    updatedAt?: string;
}
export declare class ScheduledExports extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: ScheduledExportsOptions;
    uriHelper: UriHelper;
    constructor(options: ScheduledExportsOptions, http: Client);
    create(): Promise<ScheduledExportsCreateResponse>;
    toggle(scheduleId: string): Promise<ScheduledExportsToggleResponse>;
}
export declare class ScheduledExportsToggleFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
