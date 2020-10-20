import { Client } from '../client';
import { BaseError } from '../errors';
import { UriHelper, HandlerQuery } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface StaffOptions {
    user?: string;
    base?: string;
}
export interface StaffQueryOrOptions {
    limit?: number;
    uri?: string;
    query?: {
        deleted?: boolean;
        active?: boolean;
        start?: string;
        staff_number?: string;
        lastname?: string;
        firstname?: string;
        email?: string;
        q?: string;
        staff_groups?: string;
        cursor_field?: string;
    };
}
export interface StaffResponse {
    data: StaffMember[];
    metadata: Record<string, unknown>;
    errors?: ErrorObject[];
    next?: () => Promise<StaffResponse>;
}
export interface StaffMemberResponse {
    data?: StaffMember;
    metadata?: {
        count?: number;
        patch?: any;
    };
    msg?: string;
    errors?: Record<string, unknown>;
}
export interface StaffAddress {
    street?: string;
    street_number?: number;
    locality?: string;
    region?: string;
    postal_code?: number;
    country?: string;
    type?: string;
}
export interface StaffPhoneNumbers {
    any?: number;
    home?: number;
    mobile?: number;
    work?: number;
}
export interface PinRequest {
    provided_pin?: string;
    staff_id?: string;
}
export interface PinResponse {
    pin?: string;
}
export interface StaffNumberRequest {
    provided_staff_number?: string;
    staff_id?: string;
}
export interface StaffNumberResponse {
    number?: string;
}
export interface StaffQuery {
    staff_id_template?: string;
    generate_staff_id?: boolean;
}
export interface HandleStaffQuery extends HandlerQuery {
    query?: StaffQuery;
}
export interface ErrorObject {
    id: string;
    label: string;
    errorDetails: Record<string, unknown>;
}
export interface StaffMember {
    firstname?: string;
    lastname?: string;
    displayname?: string;
    phonenumbers?: StaffPhoneNumbers;
    email?: string;
    addresses?: StaffAddress;
    pin?: number;
    metadata?: Record<string, unknown>;
    scopes?: string[];
    staff_number?: number;
    discounts?: Record<string, unknown>;
    date_of_birth?: string | null;
    short_code?: number;
    locations?: string[];
    default?: boolean;
}
export interface StaffItem {
    staff_number?: string;
    firstname?: string;
    lastname?: string;
    email?: string;
    phone?: Record<string, unknown>;
}
export interface MakeUserRequest {
    user: string;
}
export interface SearchQuery {
    q: string;
    fields?: string[];
}
export declare class Staff extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: StaffOptions;
    uriHelper: UriHelper;
    constructor(options: StaffOptions, http: Client);
    getAll(queryOrOptions?: StaffQueryOrOptions): Promise<StaffResponse>;
    create(staffMember: StaffMember, query?: HandleStaffQuery): Promise<StaffMemberResponse>;
    getOne(staffId: string): Promise<StaffMemberResponse>;
    get(staffId: string): Promise<StaffMemberResponse>;
    put(staffId: string, staff: StaffMember): Promise<StaffMemberResponse>;
    delete(staffId: string): Promise<StaffMemberResponse>;
    getPin(providedPin?: PinRequest): Promise<StaffMemberResponse>;
    getStaffNumber(providedStaffNumber?: StaffNumberRequest): Promise<StaffMemberResponse>;
    getFilters(queryOrOptions?: StaffQueryOrOptions): Promise<StaffResponse>;
    makeUser(staffID: string, makeUserObj: MakeUserRequest): Promise<StaffMemberResponse>;
    meta(query?: StaffQueryOrOptions | undefined): Promise<StaffMemberResponse>;
    search(query: string | SearchQuery): Promise<StaffMemberResponse>;
}
export declare class StaffFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class StaffFetchOneFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class StaffPutFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class StaffDeleteFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class StaffMemberCreateFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class StaffPinGetFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class StaffNumberGetFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class MakeUserStaffFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class StaffMetaFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class StaffSearchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
