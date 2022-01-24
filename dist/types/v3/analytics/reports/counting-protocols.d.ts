import { ThAnalyticsBaseHandler, AnalyticsSocketsExportResponseItem } from '../../../base';
import { Client } from '../../../client';
import { AnalyticsOptions } from '../../../v0/analytics';
export declare class AnalyticsReportsCountingProtocols extends ThAnalyticsBaseHandler {
    http: Client;
    options: AnalyticsOptions;
    constructor(options: AnalyticsOptions, http: Client);
    static create(options: Record<string, unknown>, http: Client): AnalyticsReportsCountingProtocols;
    export(query?: Record<string, unknown>): Promise<AnalyticsSocketsExportResponseItem>;
}
