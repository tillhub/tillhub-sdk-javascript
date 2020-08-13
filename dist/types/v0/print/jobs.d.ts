import { Client } from '../../client';
import { UriHelper } from '../../uri-helper';
import { PrintOptions } from '../print';
export interface PrintJob {
    id?: string;
    data?: string;
    printer?: string;
    type?: string;
    options?: Record<string, unknown>;
    amount?: number;
    status?: string;
    status_message?: string;
}
export interface PrintJobsResponse {
    data: PrintJob[];
    metadata: Record<string, unknown>;
    msg?: string;
}
export interface PrintJobResponse {
    data: PrintJob;
    metadata: Record<string, unknown>;
    msg?: string;
}
export interface PrintJobDataResponse {
    data: string;
    msg?: string;
}
export declare class Jobs {
    http: Client;
    options: PrintOptions;
    uriHelper: UriHelper;
    constructor(options: PrintOptions, http: Client, uriHelper: UriHelper);
    getAll(query?: Record<string, unknown>): Promise<PrintJobsResponse>;
    get(jobId: string): Promise<PrintJobResponse>;
    create(job: Record<string, unknown>, query?: Record<string, unknown>): Promise<PrintJobResponse>;
    update(jobId: string, job: Record<string, unknown>): Promise<PrintJobResponse>;
    delete(jobId: string): Promise<PrintJobResponse>;
    getData(jobId: string): Promise<PrintJobDataResponse>;
}
