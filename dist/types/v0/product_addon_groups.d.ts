import { Client } from '../client';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface ProductAddonGroupOptions {
    user?: string;
    base?: string;
}
export interface ProductAddonGroupsQuery {
    q?: string;
    name?: string;
    addon_name?: string;
    addon?: string;
    multiselect?: string;
    skippable?: string;
    deleted?: boolean;
    active?: boolean;
    uri?: string;
}
export interface ProductAddonGroupResponse {
    data?: ProductAddonGroup;
    metadata?: {
        count?: number;
        patch?: any;
    };
    msg?: string;
}
export interface ProductAddonGroupsResponse {
    data: ProductAddonGroup[];
    metadata: Record<string, unknown>;
    next?: () => Promise<ProductAddonGroupsResponse>;
}
export interface PriceChange {
    currency: string;
    amount: number;
}
export interface ProductAddonGroup {
    name: string;
    multiselect: boolean;
    max_selected?: number;
    skippable: boolean;
    active: boolean;
    deleted?: boolean;
}
export declare class ProductAddonGroups extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: ProductAddonGroupOptions;
    uriHelper: UriHelper;
    constructor(options: ProductAddonGroupOptions, http: Client);
    getAll(query?: ProductAddonGroupsQuery | undefined): Promise<ProductAddonGroupsResponse>;
    get(productAddonGroupId: string): Promise<ProductAddonGroupResponse>;
    meta(): Promise<ProductAddonGroupResponse>;
    create(productAddonGroup: ProductAddonGroup): Promise<ProductAddonGroupResponse>;
    put(productAddonGroupId: string, productAddonGroup: ProductAddonGroup): Promise<ProductAddonGroupResponse>;
    delete(productAddonGroupId: string): Promise<ProductAddonGroupResponse>;
}
