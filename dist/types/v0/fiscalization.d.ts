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
export interface FiskalyDeCompany {
    name: string;
    street: string;
    streetNumber?: string | null;
    postalCode: string;
    locality: string;
    country: string;
    vatId?: string | null;
    taxNumber?: string | null;
}
export interface FiskalyDeOrganizationCreateRequest {
    branchId?: string;
    company: FiskalyDeCompany;
}
export interface FiskalyDeOrganization {
    organizationId: string;
    organizationType: string;
    managedBy: string;
}
export interface FiskalyDeTss {
    tssId: string;
    clientId: string;
    clientSerialNumber: string;
}
export interface FiskalyDeOrganizationResponse {
    data?: FiskalyDeOrganization;
    msg?: string;
}
export interface FiskalyDeTssResponse {
    data?: FiskalyDeTss;
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
    createFiskalyDeOrganization(options: FiskalyDeOrganizationCreateRequest): Promise<FiskalyDeOrganizationResponse>;
    createFiskalyDeTss(registerId: string): Promise<FiskalyDeTssResponse>;
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
export declare class FiscalizationFiskalyDeOrganizationCreateFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class FiscalizationFiskalyDeTssCreateFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
