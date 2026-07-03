import { Client } from '../client';
import { BaseError } from '../errors/baseError';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface IntegrationPartnersOptions {
    user?: string;
    base?: string;
}
export interface IntegrationPartner {
    id: string;
    name: string;
    displayName: string;
    active: boolean;
    deletedAt: string | null;
}
export interface IntegrationPartnersQuery {
    withDeleted?: boolean;
    uri?: string;
}
export interface IntegrationPartnersListResponse {
    data: IntegrationPartner[];
    metadata: Record<string, unknown>;
    msg?: string;
    next?: () => Promise<IntegrationPartnersListResponse>;
}
export interface IntegrationPartnerResponse {
    data: IntegrationPartner | null;
    metadata: Record<string, unknown>;
    msg?: string;
}
export interface IntegrationPartnerCreateBody {
    name: string;
    displayName: string;
    active?: boolean;
}
export interface IntegrationPartnerUpdateBody {
    displayName?: string;
    active?: boolean;
}
export declare class IntegrationPartners extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: IntegrationPartnersOptions;
    uriHelper: UriHelper;
    constructor(options: IntegrationPartnersOptions, http: Client);
    private partnerPath;
    getAll(query?: IntegrationPartnersQuery): Promise<IntegrationPartnersListResponse>;
    listAll(query?: Omit<IntegrationPartnersQuery, 'uri'>): Promise<IntegrationPartner[]>;
    get(integrationPartnerId: string): Promise<IntegrationPartnerResponse>;
    create(body: IntegrationPartnerCreateBody): Promise<IntegrationPartnerResponse>;
    update(integrationPartnerId: string, body: IntegrationPartnerUpdateBody): Promise<IntegrationPartnerResponse>;
    delete(integrationPartnerId: string): Promise<IntegrationPartnerResponse>;
    restore(integrationPartnerId: string): Promise<IntegrationPartnerResponse>;
}
export declare class IntegrationPartnersFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class IntegrationPartnersFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class IntegrationPartnerFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class IntegrationPartnerCreateFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class IntegrationPartnerUpdateFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class IntegrationPartnerDeleteFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class IntegrationPartnerRestoreFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
