import { Client } from '../client';
import { BaseError } from '../errors/baseError';
import { UriHelper, HandlerQuery } from '../uri-helper';
import { ThBaseHandler } from '../base';
import { Pricebooks } from './pricebooks';
import { PricebookEntries } from './pricebook-entries';
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
    custom_id?: string | null;
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
export interface ProductsOptions {
    user?: string;
    base?: string;
    limit?: number;
    uri?: string;
    query?: {
        deleted?: boolean;
        active?: boolean;
        extended?: boolean;
        [key: string]: any;
    };
}
export interface ProductDeleteOptions {
    delete_dependencies?: boolean;
}
export interface ProductsResponse {
    data?: Product[];
    metadata?: Record<string, unknown>;
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
    errors?: ErrorObject[];
}
export interface ErrorObject {
    id: string;
    label: string;
    errorDetails: Record<string, unknown>;
}
export interface ProductsCreateQuery {
    product_id_template?: string;
    generate_product_id?: boolean;
}
export interface HandlerProductsQuery extends HandlerQuery {
    query?: ProductsCreateQuery;
}
export interface ProductsUpdateRequestObject {
    productId: string;
    body: Product;
}
export interface SearchQuery {
    q: string;
    types?: ProductTypes[];
}
export interface BookStockQuery {
    productId: string;
    body: BookStock;
}
export interface BookStock {
    location: string;
    qty: number;
}
export interface BarcodeResponse {
    barcode?: string;
    id?: string;
    name?: string;
    codes?: Array<Record<string, unknown>>;
}
export declare class Products extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: ProductsOptions;
    uriHelper: UriHelper;
    constructor(options: ProductsOptions, http: Client);
    create(product: Product, query?: HandlerProductsQuery): Promise<ProductResponse>;
    getAll(options?: ProductsOptions | undefined): Promise<ProductsResponse>;
    import(options?: ProductsOptions | undefined): Promise<ProductsResponse>;
    get(productId: string): Promise<ProductResponse>;
    getDetails(productId: string): Promise<ProductResponse>;
    getChildrenDetails(productId: string): Promise<ProductResponse>;
    meta(): Promise<ProductsResponse>;
    put(productId: string, product: Product): Promise<ProductResponse>;
    bulkEdit(products: Product[]): Promise<ProductsResponse>;
    count(): Promise<ProductsResponse>;
    delete(productId: string, deleteOptions?: ProductDeleteOptions): Promise<ProductsResponse>;
    search(query: SearchQuery | string): Promise<ProductsResponse>;
    bookStock(requestOptions: BookStockQuery): Promise<ProductResponse>;
    checkBarcode(code: string): Promise<ProductResponse>;
    pricebooks(): Pricebooks;
    pricebookEntries(): PricebookEntries;
}
export declare class ProductsCreateFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class ProductFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class ProductsFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class ProductsImportFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class ProductDetailsFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class ProductChildrenDetailsFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class ProductsCountFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class ProductsMetaFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class ProductsUpdateFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class ProductsBulkEditFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class ProductsDeleteFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class ProductsSearchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class ProductsBookStockFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class BarcodeGetFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export {};
