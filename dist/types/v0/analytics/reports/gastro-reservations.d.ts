import { Client, Timeout } from '../../../client';
import { UriHelper } from '../../../uri-helper';
export interface AnalyticsOptions {
    user?: string;
    base?: string;
}
export interface AnalyticsResponse {
    data: Array<Record<string, unknown>>;
    summary: Array<Record<string, unknown>>;
    metadata: Record<string, unknown>;
    msg?: string;
    next?: () => Promise<AnalyticsResponse>;
}
export interface AnalyticsMetaResponse {
    data: Array<Record<string, unknown>>;
    metadata: Record<string, unknown>;
}
export declare enum ReservationStatus {
    RESERVED = "reserved",
    SEATED = "seated",
    COMPLETED = "completed",
    CANCELLED = "cancelled",
    NO_SHOW = "no_show"
}
export declare enum ReservationSource {
    WALK_IN = "walk_in",
    ONLINE_BOOKING = "online_booking",
    ONLINE_CALENDAR = "ios_calendar"
}
export interface GastroReservationsQuery {
    start?: string;
    end?: string;
    limit?: number;
    q?: string;
    status?: ReservationStatus | ReservationStatus[];
    branchId?: string;
    source?: ReservationStatus | ReservationSource[];
    layoutId?: string;
    uri?: string;
}
export declare class GastroReservations {
    endpoint: string;
    http: Client;
    options: AnalyticsOptions;
    uriHelper: UriHelper;
    timeout: Timeout;
    constructor(options: AnalyticsOptions, http: Client);
    getAll(query?: GastroReservationsQuery): Promise<AnalyticsResponse>;
    meta(queryOrOptions?: GastroReservationsQuery | undefined): Promise<AnalyticsMetaResponse>;
}
