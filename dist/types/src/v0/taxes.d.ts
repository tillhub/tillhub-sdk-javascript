import { Client } from '../client';
import { ThBaseHandler } from '../base';
import { UriHelper } from '../uri-helper';
export interface TaxesOptions {
    user?: string;
    base?: string;
}
export interface TaxesQuery {
    limit?: number;
    uri?: string;
    query?: {
        deleted?: boolean;
        active?: boolean;
    };
}
export interface TaxesResponse {
    data: Tax[];
    metadata: Record<string, unknown>;
}
export interface TaxResponse {
    data?: Tax;
    metadata?: {
        count?: number;
        patch?: any;
    };
    msg?: string;
}
export interface Tax {
    id?: string;
    name: string;
    fa_account_number?: string;
    type: TaxType;
    account: string;
    rate?: string;
    percentage?: string;
    is_fixed: boolean;
    jurisdiction?: Jurisdictions;
    rate_class: RateClasses;
}
export declare type TaxType = 'vat';
export declare type RateClasses = 'normal' | 'reduced' | 'super_reduced';
export declare type Jurisdictions = 'austria' | 'czech_republic' | 'france' | 'germany' | 'hungary' | 'italy' | 'ireland' | 'jungholz' | 'mittelberg' | 'monaco' | 'spain' | 'switzerland';
export declare class Taxes extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: TaxesOptions;
    uriHelper: UriHelper;
    constructor(options: TaxesOptions, http: Client);
    getAll(queryOrOptions?: TaxesQuery | undefined): Promise<TaxesResponse>;
    get(taxId: string): Promise<TaxResponse>;
    put(taxId: string, tax: Tax): Promise<TaxResponse>;
    create(tax: Tax): Promise<TaxResponse>;
    delete(taxId: string): Promise<TaxResponse>;
}
