import { ThAnalyticsBaseHandler, ThAnalyticsExportsBaseResponse } from '../../../base';
import { Client } from '../../../client';
import { BaseError } from '../../../errors';
export interface DatevHandlerOptions {
    user?: string;
    base?: string;
}
export interface AnalyticsReportsDatevExportResponseItem extends ThAnalyticsExportsBaseResponse {
}
export declare class AnalyticsReportsDatev extends ThAnalyticsBaseHandler {
    http: Client;
    options: DatevHandlerOptions;
    constructor(options: DatevHandlerOptions, http: Client);
    static create(options: object, http: Client): AnalyticsReportsDatev;
    export(query?: object): Promise<AnalyticsReportsDatevExportResponseItem>;
}
export declare class AnalyticsReportsDatevExportFetchError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
