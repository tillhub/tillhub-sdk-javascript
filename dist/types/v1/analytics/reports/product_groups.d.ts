import { ThAnalyticsBaseHandler } from '../../../base';
import { ProductGroupsOptions } from '../../../v0/analytics';
import { Client } from '../../../client';
import { BaseError } from '../../../errors';
export interface ProductGroupsHandlerOptions {
    user?: string;
    base?: string;
}
export interface AnalyticsReportsProductGroupsV1ExportResponseItem {
    correlationId?: string;
}
export interface AnalyticsResponse {
    data: AnalyticsReportsProductGroupsV1ExportResponseItem[];
    metadata: Record<string, unknown>;
    msg?: string;
}
export declare class AnalyticsReportsProductGroups extends ThAnalyticsBaseHandler {
    http: Client;
    options: ProductGroupsHandlerOptions;
    constructor(options: ProductGroupsHandlerOptions, http: Client);
    static create(options: Record<string, unknown>, http: Client): AnalyticsReportsProductGroups;
    getAll(query?: ProductGroupsOptions): Promise<AnalyticsResponse>;
}
export declare class AnalyticsReportsV1ProductGroupsFetchError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
