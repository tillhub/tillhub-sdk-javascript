import { Client } from '../../../client';
import { BaseError } from '../../../errors';
import { UriHelper } from '../../../uri-helper';
import { AnalyticsOptions } from '../../../v0/analytics';
export interface AnalyticsResponse {
    data: Array<Record<string, unknown>>;
    metadata: Record<string, unknown>;
    msg?: string;
}
export interface ProductsOptions {
    [key: string]: any;
    branch_id?: string;
    register_id?: string;
    staff_id?: string;
    limit?: number;
    offset?: number;
    start?: string;
    end?: string;
    q?: string;
    format?: string;
}
export declare class AnalyticsReportsProducts {
    endpoint: string;
    http: Client;
    options: AnalyticsOptions;
    uriHelper: UriHelper;
    timeout: AnalyticsOptions['timeout'];
    constructor(options: AnalyticsOptions, http: Client);
    getAll(query?: ProductsOptions | undefined): Promise<AnalyticsResponse>;
}
export declare class AnalyticsReportsProductsFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
