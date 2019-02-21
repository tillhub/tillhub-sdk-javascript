import { Client } from '../client';
import { UriHelper } from '../uri-helper';
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
    metadata: object;
    msg?: string;
}
export interface FavouriteResponse {
    data: Favourite;
    metadata: object;
    msg?: string;
}
export interface FavouritesOptions {
    user?: string;
    base?: string;
}
export declare class Favourites {
    endpoint: string;
    http: Client;
    options: FavouritesOptions;
    uriHelper: UriHelper;
    constructor(options: FavouritesOptions, http: Client);
    getAll(query?: Object): Promise<FavouritesResponse>;
    get(favouritesId: string): Promise<FavouriteResponse>;
    create(favourites: Object): Promise<FavouriteResponse>;
    update(favouritesId: string, favourites: Object): Promise<FavouriteResponse>;
    delete(favouritesId: string): Promise<FavouriteResponse>;
}
