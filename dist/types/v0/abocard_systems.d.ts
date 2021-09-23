import { Client } from '../client';
import { BaseError } from '../errors/baseError';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface Abocard {
    id?: string;
    name?: string;
    linked_product?: string;
    system_revenue_account?: string;
    system_tax_account?: string;
    system_tax_rate?: string;
    used_product_price?: number;
    price_source?: string;
    price_id?: string;
    selling_price?: number;
    discount_value?: number;
    total_value?: number;
    units?: number;
    voucher_value_per_unit?: number;
    discount_value_per_unit?: number;
    locations?: string[];
    location_group?: string[];
}
export interface AbocardsResponse {
    data: Abocard[];
    metadata: Record<string, unknown>;
    msg?: string;
    next?: () => Promise<AbocardsResponse>;
}
export interface AbocardResponse {
    data?: Abocard;
    metadata?: Record<string, unknown>;
    msg?: string;
}
export interface AbocardsOptions {
    user?: string;
    base?: string;
}
export declare class AbocardSystems extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: AbocardsOptions;
    uriHelper: UriHelper;
    constructor(options: AbocardsOptions, http: Client);
    getAll(query?: Record<string, unknown>): Promise<AbocardsResponse>;
    get(abocardId: string): Promise<AbocardResponse>;
    create(abocard: Abocard): Promise<AbocardResponse>;
    update(abocardId: string, abocard: Abocard): Promise<AbocardResponse>;
    delete(abocardId: string): Promise<AbocardResponse>;
}
export declare class AbocardsFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class AbocardFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class AbocardCreateFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class AbocardDeleteFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class AbocardUpdateFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
