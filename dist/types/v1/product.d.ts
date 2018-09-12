import { Client } from '../client';
export interface Images {
    '1x'?: string;
    avatar?: string;
}
declare type ProductTypes = 'product' | 'voucher' | 'linked' | 'linked_product' | 'variant' | 'variant_product';
export interface ProductType {
    name?: string;
    description?: string | null;
    attributes?: object | null;
    parent?: string | null;
    tags?: any[] | null;
    linked_products?: any[] | null;
    prices?: object;
    barcode?: string | null;
    sku?: string | null;
    stock_minimum?: number | null;
    stock_maximum?: number | null;
    stockable?: boolean | null;
    metadata?: object | null;
    audiences?: any[] | null;
    keywords?: any[] | null;
    categories?: any[] | null;
    related_to?: any[] | null;
    similar_to?: any[] | null;
    released_at?: string | null;
    purchased_at?: string | null;
    produced_at?: string | null;
    custom_id?: string | null;
    tax?: string;
    taxes_options?: any[] | object | null;
    season?: string | null;
    seasons?: object | null;
    account?: string;
    vat_class?: string | null;
    category?: string | null;
    brand?: string | null;
    active?: boolean;
    deleted?: boolean;
    type?: ProductTypes;
    manufacturer?: object | null;
    supplier?: object | null;
    condition?: string | null;
    images?: Images | null;
    summary?: string | null;
    insert_id?: number;
    product_group?: string | null;
    delegated_to?: string[] | null;
}
export interface ProductOptions {
    user?: string;
    base?: string;
}
export interface ProductResponse {
    data: object[];
    metadata: object;
}
export declare class Product {
    endpoint: string;
    http: Client;
    options: ProductOptions;
    constructor(options: ProductOptions, http: Client);
    createProduct(product: ProductType): Promise<ProductResponse>;
}
export {};
