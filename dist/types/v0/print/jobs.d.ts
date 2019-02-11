import { Client } from '../../client';
import { UriHelper } from '../../uri-helper';
import { PrintOptions } from '../print';
export interface PrintJob {
    id?: string;
    data?: string;
    printer?: string;
    type?: string;
    options?: object;
    amount?: number;
    status?: string;
    status_message?: string;
}
export interface PrintJobsResponse {
    data: PrintJob[];
    metadata: object;
    msg?: string;
}
export interface PrintJobResponse {
    data: PrintJob;
    metadata: object;
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
    getAll(query?: Object): Promise<PrintJobsResponse>;
    get(jobId: string): Promise<PrintJobResponse>;
    create(job: Object): Promise<PrintJobResponse>;
    update(jobId: string, job: Object): Promise<PrintJobResponse>;
    delete(jobId: string): Promise<PrintJobResponse>;
    getData(jobId: string): Promise<PrintJobDataResponse>;
}
