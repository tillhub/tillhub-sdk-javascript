import { Client } from '../client';
import { UriHelper } from '../uri-helper';
export interface WarehousesOptions {
    user?: string;
    base?: string;
}
export interface WarehousesQuery {
    limit?: number;
    uri?: string;
    query?: {
        deleted?: boolean;
        active?: boolean;
    };
}
export interface WarehousesResponse {
    data: object[];
    metadata: object;
}
export interface WarehouseResponse {
    data: Warehouse;
    metadata?: {
        count?: number;
        patch?: any;
    };
    msg?: string;
}
export interface Warehouse {
    id?: string;
}
export declare class Warehouses {
    endpoint: string;
    http: Client;
    options: WarehousesOptions;
    uriHelper: UriHelper;
    constructor(options: WarehousesOptions, http: Client);
    getAll(query?: WarehousesQuery | undefined): Promise<WarehousesResponse>;
}
