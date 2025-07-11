import { Client } from '../client';
import { BaseError } from '../errors';
import { UriHelper } from '../uri-helper';
export interface TaxpayerOptions {
    user?: string;
    base?: string;
}
export interface TaxpayerResponse {
    data?: TaxpayerEntity;
    metadata?: {
        count?: number;
    };
    msg?: string;
}
export declare enum PersonType {
    NATURAL = "natural",
    LEGAL = "legal"
}
export declare enum Salutation {
    MR = "1",
    MS = "2",
    OTHER = "3"
}
export interface PostAddress {
    house_number?: string;
    street?: string;
    town?: string;
    zip_code?: string;
}
export interface NaturalPersonInformation {
    salutation?: Salutation;
    first_name?: string;
    last_name?: string;
    birthdate?: string;
    identification_number?: string;
}
export interface LegalPersonInformation {
    company_name?: string;
    legal_form?: string;
}
export interface TaxpayerEntity {
    personType?: PersonType;
    taxNumber?: string;
    address?: PostAddress;
    organizationId?: string;
    information?: LegalPersonInformation | NaturalPersonInformation;
}
export declare class Taxpayer {
    http: Client;
    options: TaxpayerOptions;
    uriHelper: UriHelper;
    constructor(options: TaxpayerOptions, http: Client, uriHelper: UriHelper);
    get(): Promise<TaxpayerResponse>;
    put(taxpayer: TaxpayerEntity): Promise<TaxpayerResponse>;
}
export declare class TaxpayerFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class TaxpayerPutFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
