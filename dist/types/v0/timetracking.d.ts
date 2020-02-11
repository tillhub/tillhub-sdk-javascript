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
export declare class Timetracking extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: TimetrackingOptions;
    uriHelper: UriHelper;
    constructor(options: TimetrackingOptions, http: Client);
    get(staffId: string, query?: TimetrackingQuery): Promise<TimetrackingResponse>;
    getEntries(staffId: string, date?: string): Promise<TimetrackingResponse>;
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
