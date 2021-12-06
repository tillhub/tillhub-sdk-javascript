import { Client } from '../client';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface ProductAddonOptions {
    user?: string;
    base?: string;
}
export interface ProductAddonQuery {
    q?: string;
    name?: string;
    product_name?: number;
    addon_group_name?: string;
    product?: string;
    addon_group?: string;
    deleted?: boolean;
    active?: boolean;
    uri?: string;
}
export interface ProductAddonResponse {
    data?: ProductAddon;
    metadata?: {
        count?: number;
        patch?: any;
    };
    msg?: string;
}
export interface ProductAddonsResponse {
    data: ProductAddon[];
    metadata: Record<string, unknown>;
    next?: () => Promise<ProductAddonsResponse>;
}
export interface PriceChange {
    amount: number;
    currency: string;
}
export interface ProductAddon {
    name?: string;
    addon_group?: string;
    product?: string;
    price_change?: PriceChange[];
    stock_quantity: number;
    add_to_cart: boolean;
    allow_quantity_edit: boolean;
    max_quantity: number;
    order_index: number;
    active: boolean;
    deleted?: boolean;
}
export declare class ProductAddons extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: ProductAddonOptions;
    uriHelper: UriHelper;
    constructor(options: ProductAddonOptions, http: Client);
    getAll(query?: ProductAddonQuery | undefined): Promise<ProductAddonsResponse>;
    get(productAddonId: string): Promise<ProductAddonResponse>;
    meta(): Promise<ProductAddonsResponse>;
    create(productAddon: ProductAddon): Promise<ProductAddonResponse>;
    put(productAddonId: string, productAddon: ProductAddon): Promise<ProductAddonResponse>;
    delete(productAddonId: string): Promise<ProductAddonResponse>;
}
