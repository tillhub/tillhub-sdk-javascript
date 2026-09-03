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
export interface ReservationsConfigBody {
    openingHours: Array<{
        closed: boolean;
        dayIndex: number;
        openFrom: string;
        openTo: string;
        breakFrom?: string | null;
        breakTo?: string | null;
    }>;
    closingDays: Array<{
        reason: string;
        startDate: string;
        endDate: string;
    }>;
    openingHoursExceptions: Array<{
        type: 'open' | 'closed';
        startDate: string;
        endDate: string;
        from: string | null;
        to: string | null;
        weekdays?: number[];
        breakFrom?: string | null;
        breakTo?: string | null;
    }>;
}
export interface CountOpeningHoursConfigConflictsBody {
    previousReservations: ReservationsConfigBody;
    nextReservations: ReservationsConfigBody;
    timeZone: string;
    branchId?: string;
}
export interface CountOpeningHoursConfigConflictsResponse {
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
    countOpeningHoursConfigConflicts(body: CountOpeningHoursConfigConflictsBody): Promise<CountOpeningHoursConfigConflictsResponse>;
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
export declare class GastroReservationsOpeningHoursConfigConflictsFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
