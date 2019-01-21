import { Client } from '../client';
export interface StaffOptions {
    user?: string;
    base?: string;
}
export interface StaffResponse {
    data: StaffMember[];
    metadata: object;
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
    date_of_birth?: Date;
    short_code?: number;
    default?: boolean;
}
export declare class Staff {
    endpoint: string;
    http: Client;
    options: StaffOptions;
    constructor(options: StaffOptions, http: Client);
    getAll(): Promise<StaffResponse>;
    create(staffMember: StaffMember): Promise<StaffResponse>;
}
