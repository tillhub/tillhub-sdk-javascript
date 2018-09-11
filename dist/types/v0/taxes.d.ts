import { Client } from '../client';
export interface TaxesOptions {
    user?: string;
    base?: string;
}
export interface TaxesQuery {
    limit?: number;
    uri?: string;
}
export interface TaxesResponse {
    data: object[];
    metadata: object;
}
export declare class Taxes {
    endpoint: string;
    http: Client;
    options: TaxesOptions;
    constructor(options: TaxesOptions, http: Client);
    getAll(query?: TaxesQuery | undefined): Promise<TaxesResponse>;
}
