import { ThAnalyticsBaseHandler } from '../../../base';
import { ProcessesQueryOptions } from '../../../v0/processes';
import { Client } from '../../../client';
import { BaseError } from '../../../errors';
export interface ProcessesHandlerOptions {
    user?: string;
    base?: string;
}
export interface AnalyticsReportsProcessesV1ExportResponseItem {
    correlationId?: string;
}
export interface AnalyticsResponse {
    data: AnalyticsReportsProcessesV1ExportResponseItem[];
    metadata: Record<string, unknown>;
    msg?: string;
}
export declare class AnalyticsReportsProcesses extends ThAnalyticsBaseHandler {
    http: Client;
    options: ProcessesHandlerOptions;
    constructor(options: ProcessesHandlerOptions, http: Client);
    static create(options: Record<string, unknown>, http: Client): AnalyticsReportsProcesses;
    getAll(query?: ProcessesQueryOptions): Promise<AnalyticsResponse>;
}
export declare class AnalyticsReportsV1ProcessesFetchError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
