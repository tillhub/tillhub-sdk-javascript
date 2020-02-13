import { Client } from '../client';
import { BaseError } from '../errors';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface TimetrackingOptions {
    user?: string;
    base?: string;
}
export interface TimetrackingQuery {
    limit?: number;
    uri?: string;
    query?: {
        start?: string;
        end?: string;
    };
}
export interface TimetrackingResponse {
    data: TimetrackingReport[];
    metadata?: {
        count?: number;
        patch?: any;
    };
    msg?: string;
}
export interface TimetrackingEntryResponse {
    data: TimetrackingEntry;
    metadata?: {
        count?: number;
        patch?: any;
    };
    msg?: string;
}
export interface TimetrackingReport {
    date: string;
    clock_in: string;
    clock_out: string;
    total_break: Time;
    total_worked: Time;
}
export interface Time {
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
}
export interface TimetrackingEntry {
    id?: string;
    staff?: string;
    type?: TimetrackingEntryTypes;
    started_at?: string;
    ended_at?: string;
    client_id?: string;
}
export declare type TimetrackingEntryTypes = 'day' | 'break';
export declare class Timetracking extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: TimetrackingOptions;
    uriHelper: UriHelper;
    constructor(options: TimetrackingOptions, http: Client);
    get(staffId: string, query?: TimetrackingQuery): Promise<TimetrackingResponse>;
    getEntries(staffId: string, date?: string): Promise<TimetrackingResponse>;
    createEntry(entry: TimetrackingEntry): Promise<TimetrackingEntryResponse>;
    updateEntry(entryId: string, data?: TimetrackingEntry): Promise<TimetrackingEntryResponse>;
    deleteEntry(entryId: string): Promise<TimetrackingEntryResponse>;
}
export declare class TimetrackingReportFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class TimetrackingEntriesFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class TimetrackingEntryCreateFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class TimetrackingEntryPutFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class TimetrackingEntryDeleteFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
