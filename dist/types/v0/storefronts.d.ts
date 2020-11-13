import { Client } from '../client';
import { BaseError } from '../errors';
import { ThBaseHandler } from '../base';
import { UriHelper } from '../uri-helper';
export interface StorefrontsOptions {
    user?: string;
    base?: string;
}
export interface StorefrontsQuery {
    limit?: number;
    uri?: string;
    query?: {
        deleted?: boolean;
        active?: boolean;
    };
}
export interface StorefrontsResponse {
    data: Storefront[];
    metadata: Record<string, unknown>;
}
export interface StorefrontResponse {
    data?: Storefront;
    metadata?: {
        count?: number;
        patch?: any;
    };
    msg?: string;
}
export interface StorefrontProfileResponse {
    data?: StorefrontProfile;
    metadata?: {
        count?: number;
        patch?: any;
    };
    msg?: string;
}
export interface StorefrontSyncAllResponse {
    msg: string;
}
export interface StorefrontSyncStatusResponse {
    data?: StorefrontSyncStatus;
    metadata?: {
        count?: number;
    };
    msg?: string;
}
export interface Storefront {
    id?: string;
    name?: string;
    description?: string;
    type?: string;
    external_system_type?: string;
    resource_syncs_outbound?: string[];
    resource_syncs_inbound?: string[];
    link?: string;
    default_location?: string;
    external_reference_id?: string;
    external_api_base?: string;
    auth?: Record<string, unknown>;
    metadata?: Record<string, unknown>;
    profile?: StorefrontProfile;
}
export interface StorefrontProfile {
    company: {
        companyName?: string;
        email?: string;
        street?: string;
        city?: string;
        countryCode?: string;
        postalCode?: string;
        stateOrProvinceCode?: string;
        phone?: string;
    };
    formatsAndUnits: {
        currency?: string;
        currencyPrefix?: string;
        currencySuffix?: string;
        currencyPrecision?: number;
        currencyGroupSeparator?: string;
        currencyDecimalSeparator?: string;
        currencyTruncateZeroFractional?: boolean;
        currencyRate?: number;
        weightUnit?: string;
        weightPrecision?: number;
        weightGroupSeparator?: string;
        weightDecimalSeparator?: string;
        weightTruncateZeroFractional?: boolean;
        dateFormat?: string;
        timeFormat?: string;
        timezone?: string;
        dimensionsUnit?: string;
        orderNumberPrefix?: string;
        orderNumberSuffix?: string;
    };
    languages: {
        enabledLanguages?: string[];
        facebookPreferredLocale?: string;
    };
    taxSettings: {
        automaticTaxEnabled?: boolean;
        taxes?: [{
            id?: number;
            name?: string;
            enabled?: boolean;
            includeInPrice?: boolean;
            useShippingAddress?: boolean;
            taxShipping?: boolean;
            appliedByDefault?: boolean;
            defaultTax?: number;
            rules?: any[];
        }];
    };
}
export interface StorefrontSyncStatus {
    id?: string;
    synced?: number;
    not_synced?: number;
    started_at?: string;
    ended_at?: string;
    total?: string;
    status?: string;
}
export declare class Storefronts extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: StorefrontsOptions;
    uriHelper: UriHelper;
    constructor(options: StorefrontsOptions, http: Client);
    getAll(queryOrOptions?: StorefrontsQuery | undefined): Promise<StorefrontsResponse>;
    get(storefrontId: string): Promise<StorefrontResponse>;
    put(storefrontId: string, storefront: Storefront): Promise<StorefrontResponse>;
    create(storefront: Storefront): Promise<StorefrontResponse>;
    delete(storefrontId: string): Promise<StorefrontResponse>;
    profile(storefrontId: string): Promise<StorefrontProfileResponse>;
    syncAll(storefrontId: string): Promise<StorefrontSyncAllResponse>;
    syncStatus(storefrontId: string): Promise<StorefrontSyncStatusResponse>;
}
export declare class StorefrontsFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class StorefrontsFetchOneFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class StorefrontsPutFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class StorefrontsCreationFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class StorefrontsDeleteFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class StorefrontsProfileFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class StorefrontsSyncAllFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class StorefrontsSyncStatusFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
