import { Client } from '../client';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
import { BaseError } from '../errors';
export interface GastroReservationsOptions {
    user?: string;
    base?: string;
}
export declare type GastroReservationStatus = 'reserved' | 'seated' | 'completed' | 'cancelled' | 'no_show';
export interface GastroReservation {
    id?: string;
    start?: string;
    end?: string;
    status?: GastroReservationStatus;
    branchId?: string;
    partySize?: number;
    [key: string]: unknown;
}
export interface GastroReservationsQuery {
    start?: string | Date;
    end?: string | Date;
    limit?: number;
    q?: string;
    status?: GastroReservationStatus | GastroReservationStatus[];
    branchId?: string;
    updatedAt?: string | Date;
    source?: string | string[];
    layoutId?: string;
    uri?: string;
}
export interface GastroReservationsResponse {
    data?: GastroReservation[];
    metadata?: Record<string, unknown>;
    msg?: string;
    next?: () => Promise<GastroReservationsResponse>;
}
export interface CountOpeningHoursConflictsBody {
    startDate: string;
    endDate: string;
    type: 'open' | 'closed';
    from?: string | null;
    to?: string | null;
    breakFrom?: string | null;
    breakTo?: string | null;
    weekdays?: number[];
    branchId?: string;
    timeZone?: string;
}
export interface OpeningHoursConflictsResult {
    count: number;
}
export interface CountOpeningHoursConflictsResponse {
    data?: OpeningHoursConflictsResult;
    metadata?: Record<string, unknown>;
    msg?: string;
}
export declare class GastroReservations extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: GastroReservationsOptions;
    uriHelper: UriHelper;
    constructor(options: GastroReservationsOptions, http: Client);
    getAll(query?: GastroReservationsQuery): Promise<GastroReservationsResponse>;
    countOpeningHoursConflicts(body: CountOpeningHoursConflictsBody): Promise<CountOpeningHoursConflictsResponse>;
}
export declare class GastroReservationsFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class GastroReservationsOpeningHoursConflictsFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
