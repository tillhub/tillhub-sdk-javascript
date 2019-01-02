import { Client } from '../client';
export interface ProductGroupsOptions {
    user?: string;
    base?: string;
}
export interface ProductGroupsQuery {
    limit?: number;
    uri?: string;
}
export interface ProductGroupsResponse {
    data: object[];
    metadata: object;
}
export declare class ProductGroups {
    endpoint: string;
    http: Client;
    options: ProductGroupsOptions;
    constructor(options: ProductGroupsOptions, http: Client);
    getAll(query?: ProductGroupsQuery | undefined): Promise<ProductGroupsResponse>;
}
