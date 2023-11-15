import { Client } from '../client';
import { BaseError } from '../errors/baseError';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface FiscalizationOptions {
    user?: string;
    base?: string;
}
export interface OrganizationAddress {
    name: string | null;
    address_line1: string | null;
    town: string | null;
    zip: string | null;
    country_code: string | null;
}
export interface fiscalizationConfiguration {
    fon_participant_id: string | null;
    fon_user_id: string | null;
    fon_user_pin: string | null;
}
export declare type provider = 'at_fiskaly' | null;
export interface FiscalizationItem {
    provider: provider;
    payload: {
        branchId: string | null;
        organization: OrganizationAddress;
        fon: fiscalizationConfiguration;
    };
}
export interface fiscalizationLicenseKey {
    licenseKey: string | null;
}
export interface FiscalizationResponse {
    data?: FiscalizationItem;
    msg?: string;
}
export declare class Fiscalization extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: FiscalizationOptions;
    uriHelper: UriHelper;
    constructor(options: FiscalizationOptions, http: Client);
    init(options: FiscalizationItem): Promise<FiscalizationResponse>;
    setLicense(branchId: string, options: fiscalizationLicenseKey): Promise<FiscalizationResponse>;
}
export declare class FiscalizationInitFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class FiscalizationSetLicenseFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
