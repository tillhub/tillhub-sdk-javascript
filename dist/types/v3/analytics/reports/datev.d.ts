import { ThAnalyticsBaseHandler, AnalyticsSocketsExportResponseItem } from '../../../base';
import { Client } from '../../../client';
import { BaseError } from '../../../errors';
export interface DatevHandlerOptions {
    user?: string;
    base?: string;
}
export declare class AnalyticsReportsDatev extends ThAnalyticsBaseHandler {
    http: Client;
    options: DatevHandlerOptions;
    constructor(options: DatevHandlerOptions, http: Client);
    static create(options: Record<string, unknown>, http: Client): AnalyticsReportsDatev;
    export(query?: Record<string, unknown>): Promise<AnalyticsSocketsExportResponseItem>;
}
export declare class AnalyticsReportsV3DatevExportFetchError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
