import { Client } from '../client';
import { BaseError } from '../errors/baseError';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface Item {
    type?: string;
    object_id: string;
    client_id: string;
    order_index: number;
}
export interface Tab {
    name?: string;
    order_index: number;
    items: Item[];
}
export interface Favourite {
    id?: string;
    branches?: string[];
    name?: string;
    tabs?: Tab[];
    client_id?: string;
    created_at?: Date;
    updated_at?: Date;
}
export interface FavouritesResponse {
    data: Favourite[];
    metadata: Record<string, unknown>;
    msg?: string;
    next?: () => Promise<FavouritesResponse>;
}
export interface FavouriteResponse {
    data?: Favourite;
    metadata?: Record<string, unknown>;
    msg?: string;
}
export interface FavouritesOptions {
    user?: string;
    base?: string;
}
export declare class Favourites extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: FavouritesOptions;
    uriHelper: UriHelper;
    constructor(options: FavouritesOptions, http: Client);
    getAll(query?: Record<string, unknown>): Promise<FavouritesResponse>;
    get(favouriteId: string): Promise<FavouriteResponse>;
    create(favourite: Favourite): Promise<FavouriteResponse>;
    update(favouriteId: string, favourite: Favourite): Promise<FavouriteResponse>;
    delete(favouriteId: string): Promise<FavouriteResponse>;
}
export declare class FavouritesFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class FavouriteFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class FavouriteCreateFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class FavouriteDeleteFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class FavouriteUpdateFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
