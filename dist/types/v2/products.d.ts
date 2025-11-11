import { Client } from '../client';
import { BaseError } from '../errors/baseError';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface Images {
    '1x'?: string;
    avatar?: string;
}
declare type ProductTypes = 'product' | 'voucher' | 'linked' | 'linked_product' | 'variant' | 'variant_product';
export interface Product {
    id?: string;
    name?: string;
    description?: string | null;
    attributes?: Record<string, unknown> | null;
    parent?: string | null;
    parent_custom_id?: string | null;
    tags?: any[] | null;
    linked_products?: any[] | null;
    prices?: Record<string, unknown>;
    barcode?: string | null;
    codes?: any[] | null;
    sku?: string | null;
    stock_minimum?: number | null;
    stock_maximum?: number | null;
    stockable?: boolean | null;
    metadata?: Record<string, unknown> | null;
    audiences?: any[] | null;
    keywords?: any[] | null;
    categories?: any[] | null;
    related_to?: any[] | null;
    similar_to?: any[] | null;
    released_at?: string | null;
    purchased_at?: string | null;
    produced_at?: string | null;
    custom_id?: string | string[] | null;
    children?: Product[];
    tax?: string;
    taxes_options?: any[] | Record<string, unknown> | null;
    season?: string | null;
    seasons?: Record<string, unknown> | null;
    account?: string;
    vat_class?: string | null;
    category?: string | null;
    brand?: string | null;
    active?: boolean;
    deleted?: boolean;
    type?: ProductTypes;
    manufacturer?: Record<string, unknown> | null;
    supplier?: Record<string, unknown> | null;
    condition?: string | null;
    images?: Images | null;
    summary?: string | null;
    insert_id?: number;
    product_group?: string | null;
    delegated_to?: string[] | null;
    stock_mode?: string | null;
    stock_configuration_location?: StockConfigurationLocation | null;
    reorder_point?: number | null;
    reorder_qty?: number | null;
    locations?: string[] | null;
    stock_info?: Record<string, unknown> | null;
    i18n?: Record<string, unknown> | null;
    is_service?: boolean;
    delegateable?: boolean;
    delegateable_to?: Array<Record<string, unknown>>;
    delegated_from?: Record<string, unknown>;
}
export interface StockConfigurationLocation {
    location?: string | null;
    stockable?: boolean | null;
    stock_minimum?: number | null;
    reorder_qty?: number | null;
    reorder_point?: number | null;
}
export interface ProductsQuery {
    deleted?: boolean;
    active?: boolean;
    exclude_system_products?: boolean;
    location?: string;
    extended?: boolean;
    [key: string]: any;
}
export interface ProductsOptions {
    user?: string;
    base?: string;
    limit?: number;
    uri?: string;
    query?: ProductsQuery;
}
export interface ProductsResponse {
    data?: Product[];
    metaData?: Record<string, unknown>;
    msg?: string;
    next?: () => Promise<ProductsResponse>;
}
export interface ProductsBulkImportResponse {
    msg?: string;
}
export interface ProductsBulkImportRequestObject {
    preferUpdate: boolean;
    products: Product[];
}
export declare class Products extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: ProductsOptions;
    uriHelper: UriHelper;
    constructor(options: ProductsOptions, http: Client);
    getAll(options?: ProductsOptions | undefined): Promise<ProductsResponse>;
    bulkImport(payload: ProductsBulkImportRequestObject): Promise<ProductsBulkImportResponse>;
}
export declare class ProductsBulkImportFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class ProductsFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export {};
