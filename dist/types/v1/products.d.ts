import { Client } from '../client';
export interface Images {
    '1x'?: string;
    avatar?: string;
}
declare type ProductTypes = 'product' | 'voucher' | 'linked' | 'linked_product' | 'variant' | 'variant_product';
export interface Product {
    id?: string;
}
export interface Product {
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
export interface ProductsOptions {
    user?: string;
    base?: string;
}
export interface ProductsResponse {
    data: object[];
    metadata: object;
    msg?: string;
    next?: () => Promise<ProductsResponse>;
}
export interface ProductResponse {
    data: Product;
    metadata?: {
        count?: number;
        patch?: any;
    };
    msg?: string;
}
export interface ProductsOptions {
    limit?: number;
    uri?: string;
    query?: any;
}
export interface ProductsUpdateRequestObject {
    productId: string;
    body: Product;
}
export declare class Products {
    endpoint: string;
    http: Client;
    options: ProductsOptions;
    constructor(options: ProductsOptions, http: Client);
    create(product: Product): Promise<ProductsResponse>;
    getAll(options?: ProductsOptions | undefined): Promise<ProductsResponse>;
    get(productId: string): Promise<ProductResponse>;
    meta(): Promise<ProductsResponse>;
    update(requestObject: ProductsUpdateRequestObject): Promise<ProductsResponse>;
    count(): Promise<ProductsResponse>;
    delete(productId: string): Promise<ProductsResponse>;
    search(searchTerm: string): Promise<ProductsResponse>;
}
export {};
