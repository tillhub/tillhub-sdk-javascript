import { Client } from '../client';
export interface ProductGroupsOptions {
    user?: string;
    base?: string;
}
export declare type ProductGroupsEmbedOptions = 'account' | 'tax';
export interface ProductGroupsQuery {
    limit?: number;
    uri?: string;
    query?: {
        embed?: ProductGroupsEmbedOptions | ProductGroupsEmbedOptions[];
        deleted?: boolean;
        active?: boolean;
    };
}
export interface ProductGroupsResponse {
    data: ProductGroup[];
    metadata: object;
}
export interface ProductGroupResponse {
    data: ProductGroup;
    metadata?: {
        count?: number;
        patch?: any;
    };
    msg?: string;
}
export interface ProductGroup {
    id?: string;
}
export interface ProductGroup {
    name: string;
    product_group_id: string;
    tax: string;
    active?: boolean;
    account: string;
    images: object;
    color?: string;
}
export declare class ProductGroups {
    endpoint: string;
    http: Client;
    options: ProductGroupsOptions;
    constructor(options: ProductGroupsOptions, http: Client);
    getAll(queryOrOptions?: ProductGroupsQuery | undefined): Promise<ProductGroupsResponse>;
    get(productGroupId: string, queryOrOptions?: ProductGroupsQuery | undefined): Promise<ProductGroupResponse>;
    put(productGroupId: string, productGroup: ProductGroup): Promise<ProductGroupResponse>;
    create(productGroup: ProductGroup): Promise<ProductGroupResponse>;
    delete(taxId: string): Promise<ProductGroupResponse>;
}
