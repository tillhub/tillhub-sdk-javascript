import { ThAnalyticsBaseHandler } from '../../../base';
import { Client } from '../../../client';
import { CountingProtocolsHandlerOptions, AnalyticsReportsCountingProtocolsExportResponseItem } from '../../../v2/analytics/reports/counting-protocols';
export interface AnalyticsResponse {
    data: AnalyticsReportsCountingProtocolsExportResponseItem[];
    metadata: Record<string, unknown>;
    msg?: string;
}
export declare class AnalyticsReportsCountingProtocols extends ThAnalyticsBaseHandler {
    http: Client;
    options: CountingProtocolsHandlerOptions;
    constructor(options: CountingProtocolsHandlerOptions, http: Client);
    static create(options: Record<string, unknown>, http: Client): AnalyticsReportsCountingProtocols;
    export(query?: Record<string, unknown>): Promise<AnalyticsResponse>;
}
