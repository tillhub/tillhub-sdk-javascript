import { Client } from '../client';
export interface TaxesOptions {
    user?: string;
    base?: string;
}
export interface TaxesQuery {
    limit?: number;
    uri?: string;
    query?: {
        deleted?: boolean;
    };
}
export interface TaxesResponse {
    data: Tax[];
    metadata: object;
}
export interface TaxResponse {
    data: Tax;
    metadata?: {
        count?: number;
        patch?: any;
    };
    msg?: string;
}
export interface Tax {
    id?: string;
}
export interface Tax {
    name: string;
    fa_account_number?: string;
    type: 'vat';
    account: string;
    rate?: string;
    percentage?: string;
    is_fixed: boolean;
}
export declare class Taxes {
    endpoint: string;
    http: Client;
    options: TaxesOptions;
    constructor(options: TaxesOptions, http: Client);
    getAll(queryOrOptions?: TaxesQuery | undefined): Promise<TaxesResponse>;
    get(taxId: string): Promise<TaxResponse>;
    put(taxId: string, tax: Tax): Promise<TaxResponse>;
    create(tax: Tax): Promise<TaxResponse>;
    delete(taxId: string): Promise<TaxResponse>;
}
