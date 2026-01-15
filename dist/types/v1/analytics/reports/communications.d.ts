import { Client, Timeout } from '../../../client';
import { UriHelper } from '../../../uri-helper';
import { BaseError } from '../../../errors';
import { ThAnalyticsBaseHandler } from '../../../base';
import { AnalyticsOptions } from '../../../v0/analytics';
export interface AnalyticsReportsCommunicationsResponse {
    data: Array<Record<string, unknown>>;
    metadata: Record<string, unknown>;
    msg?: string;
    next?: () => Promise<AnalyticsReportsCommunicationsResponse>;
}
export interface AnalyticsReportsCommunicationsMetaResponse {
    data: Array<Record<string, unknown>>;
    metadata: Record<string, unknown>;
}
export declare type CommunicationsChannel = 'sms' | 'email';
export declare type CommunicationsContentType = 'reservation_reminder' | 'msu' | 'pay_od' | 'unknown';
export declare type CommunicationsDeliveryStatus = 'scheduled' | 'pending' | 'delivered' | 'undelivered';
export declare type CommunicationsCreatedBy = 'customer' | 'staff' | 'unknown';
export interface AnalyticsReportsCommunicationsQuery {
    limit?: number;
    channel?: CommunicationsChannel;
    start?: string;
    end?: string;
    contentType?: CommunicationsContentType;
    branchId?: string;
    status?: CommunicationsDeliveryStatus | CommunicationsDeliveryStatus[];
    createdBy?: CommunicationsCreatedBy;
    uri?: string;
}
export declare class AnalyticsReportsCommunications extends ThAnalyticsBaseHandler {
    http: Client;
    options: AnalyticsOptions;
    timeout: Timeout;
    uriHelper: UriHelper;
    constructor(options: AnalyticsOptions, http: Client);
    static create(options: Record<string, unknown>, http: Client): AnalyticsReportsCommunications;
    getAll(query?: AnalyticsReportsCommunicationsQuery): Promise<AnalyticsReportsCommunicationsResponse>;
    meta(queryOrOptions?: AnalyticsReportsCommunicationsQuery | undefined): Promise<AnalyticsReportsCommunicationsMetaResponse>;
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
