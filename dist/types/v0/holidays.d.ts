import { Client } from '../client';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface HolidaysOptions {
    user?: string;
    base?: string;
}
export interface HolidaysResponse {
    msg?: string;
    data?: Holiday[];
    metadata?: Record<string, unknown>;
}
export declare type HolidayType = 'Public' | 'Bank' | 'School' | 'Authorities' | 'Optional' | 'Observance';
export interface Holiday {
    date: string;
    localName: string;
    name: string;
    countryCode: string;
    fixed: boolean;
    global: boolean;
    countries: string[] | null;
    launchYear: null | number;
    types: HolidayType[];
}
export declare class Holidays extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: HolidaysOptions;
    uriHelper: UriHelper;
    constructor(options: HolidaysOptions, http: Client);
    getAll(): Promise<HolidaysResponse>;
}
