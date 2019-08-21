import { Client } from '../client';
import { BaseError } from '../errors';
import { UriHelper, HandlerQuery } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface Images {
    '1x'?: string;
    avatar?: string;
}
export interface Cart {
    id?: string;
}
export interface Cart {
    name?: string;
}
export interface HandlerCartsQuery {
}
export interface CartsOptions {
    user?: string;
    base?: string;
    limit?: number;
    uri?: string;
    query?: {
        deleted?: boolean;
        active?: boolean;
        [key: string]: any;
    };
}
export interface CartDeleteOptions {
}
export interface CartsResponse {
    data: Cart[];
    metadata: object;
    msg?: string;
    next?: () => Promise<CartsResponse>;
}
export interface CartResponse {
    data: Cart;
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
    errorDetails: object;
}
export interface CartsCreateQuery {
}
export interface HandlerProductsQuery extends HandlerQuery {
    query?: CartsCreateQuery;
}
export interface ProductsUpdateRequestObject {
    cartId: string;
    body: Cart;
}
export declare class Carts extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: CartsOptions;
    uriHelper: UriHelper;
    constructor(options: CartsOptions, http: Client);
    create(cart: Cart, query?: HandlerCartsQuery): Promise<CartResponse>;
    getAll(options?: CartsOptions | undefined): Promise<CartsResponse>;
    get(cartId: string): Promise<CartResponse>;
    meta(): Promise<CartsResponse>;
    put(cartId: string, cart: Cart): Promise<CartResponse>;
    delete(cartId: string, deleteOptions?: CartDeleteOptions): Promise<CartsResponse>;
    search(searchTerm: string): Promise<CartsResponse>;
}
export declare class CartFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class CartsSearchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class CartsDeleteFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class CartsUpdateFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class CartsMetaFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class CartsFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class CartsCreateFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
