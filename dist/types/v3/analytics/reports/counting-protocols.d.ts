import { ThAnalyticsBaseHandler } from '../../../base';
import { Client } from '../../../client';
import { AnalyticsReportsCountingProtocolsExportResponseItem } from '../../../v2/analytics/reports/counting-protocols';
import { AnalyticsOptions } from '../../../v0/analytics';
export interface AnalyticsResponse {
    data: AnalyticsReportsCountingProtocolsExportResponseItem[];
    metadata: Record<string, unknown>;
    msg?: string;
}
export declare class AnalyticsReportsCountingProtocols extends ThAnalyticsBaseHandler {
    http: Client;
    options: AnalyticsOptions;
    constructor(options: AnalyticsOptions, http: Client);
    static create(options: Record<string, unknown>, http: Client): AnalyticsReportsCountingProtocols;
    export(query?: Record<string, unknown>): Promise<AnalyticsResponse>;
}
