import { Client, Timeout } from '../../../client';
import { UriHelper } from '../../../uri-helper';
import { BaseError } from '../../../errors';
import { ThAnalyticsBaseHandler } from '../../../base';
import { AnalyticsOptions } from '../../../v0/analytics';
import { exportJobQuery } from '../../../shared_interfaces';
export interface AnalyticsReportsCommunicationsItem {
    id: string;
    contentType: CommunicationsContentType | null;
    recipient: string | null;
    sentScheduledOn: string | null;
    createdBy: CommunicationsCreatedBy;
    status: CommunicationsDeliveryStatus;
    content: string | null;
    reservationId: string | null;
}
export interface AnalyticsReportsCommunicationsResponse {
    data: AnalyticsReportsCommunicationsItem[];
    metadata: {
        count?: number;
        cursor?: {
            before?: string | null;
            after?: string | null;
        };
    };
    msg?: string;
    next?: () => Promise<AnalyticsReportsCommunicationsResponse>;
}
export interface AnalyticsReportsCommunicationsMetaResponse {
    data: {
        count: number;
    };
    metadata: Record<string, unknown>;
}
export declare type CommunicationsChannel = 'sms' | 'email';
export declare type CommunicationsContentType = 'reservation_reminder' | 'msu' | 'pay_od' | 'unknown';
export declare type CommunicationsDeliveryStatus = 'scheduled' | 'pending' | 'delivered' | 'undelivered' | 'sent' | 'unknown' | 'failed';
export declare type CommunicationsCreatedBy = 'customer' | 'staff' | 'unknown';
export interface AnalyticsReportsCommunicationsFilters {
    limit?: number;
    channel?: CommunicationsChannel;
    start?: string;
    end?: string;
    contentType?: CommunicationsContentType;
    branchId?: string;
    status?: CommunicationsDeliveryStatus;
    createdBy?: CommunicationsCreatedBy;
}
export interface AnalyticsReportsCommunicationsQuery extends AnalyticsReportsCommunicationsFilters {
    uri?: string;
}
export declare type AnalyticsReportsCommunicationsExportQuery = AnalyticsReportsCommunicationsFilters & Omit<exportJobQuery, 'documentType' | 'emailTemplate' | 'timezone' | 'filenamePrefix' | 'startDate'> & {
    documentType: 'CommunicationsStatisticsExport';
    emailLayout?: string;
    language?: string;
    timezone?: string;
    filenamePrefix?: string;
    startDate?: string;
};
export interface AnalyticsReportsCommunicationsExportResult {
    correlationId: string;
}
export interface AnalyticsReportsCommunicationsExportResponse {
    data: AnalyticsReportsCommunicationsExportResult;
    msg?: string;
}
export declare class AnalyticsReportsCommunications extends ThAnalyticsBaseHandler {
    http: Client;
    options: AnalyticsOptions;
    timeout: Timeout;
    uriHelper: UriHelper;
    constructor(options: AnalyticsOptions, http: Client);
    static create(options: Record<string, unknown>, http: Client): AnalyticsReportsCommunications;
    getAll(query?: AnalyticsReportsCommunicationsQuery): Promise<AnalyticsReportsCommunicationsResponse>;
    export(query: AnalyticsReportsCommunicationsExportQuery): Promise<AnalyticsReportsCommunicationsExportResponse>;
    meta(queryOrOptions?: AnalyticsReportsCommunicationsFilters | undefined): Promise<AnalyticsReportsCommunicationsMetaResponse>;
}
export declare class AnalyticsReportsCommunicationsFetchAllFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class AnalyticsReportsCommunicationsMetaFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class AnalyticsReportsCommunicationsExportFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
