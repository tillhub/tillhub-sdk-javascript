import { Client } from '../client';
import { UriHelper, HandlerQuery } from '../uri-helper';
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
    };
}
export interface StaffResponse {
    data: StaffMember[];
    metadata: object;
    errors?: ErrorObject[];
}
export interface StaffMemberResponse {
    data: StaffMember;
    metadata?: {
        count?: number;
        patch?: any;
    };
    msg?: string;
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
    errorDetails: object;
}
export interface StaffMember {
    firstname?: string;
    lastname?: string;
    displayname?: string;
    phonenumbers?: StaffPhoneNumbers;
    email?: string;
    addresses?: StaffAddress;
    pin?: number;
    metadata?: object;
    scopes?: string[];
    staff_number?: number;
    discounts?: object;
    date_of_birth?: string | null;
    short_code?: number;
    default?: boolean;
}
export interface StaffItem {
    staff_number?: string;
    firstname?: string;
    lastname?: string;
    email?: string;
    phone?: object;
}
export declare class Staff {
    endpoint: string;
    http: Client;
    options: StaffOptions;
    uriHelper: UriHelper;
    constructor(options: StaffOptions, http: Client);
    getAll(queryOrOptions?: StaffQueryOrOptions): Promise<StaffResponse>;
    create(staffMember: StaffMember, query?: HandleStaffQuery): Promise<StaffResponse>;
    getOne(staffId: string): Promise<StaffMemberResponse>;
    put(staffId: string, staff: StaffMember): Promise<StaffMemberResponse>;
    delete(staffId: string): Promise<StaffMemberResponse>;
    getPin(providedPin?: PinRequest): Promise<StaffMemberResponse>;
    getStaffNumber(providedStaffNumber?: StaffNumberRequest): Promise<StaffMemberResponse>;
    getFilters(queryOrOptions?: StaffQueryOrOptions): Promise<StaffResponse>;
}
