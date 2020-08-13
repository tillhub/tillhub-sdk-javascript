import { Client } from '../client';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface WarehousesOptions {
    user?: string;
    base?: string;
}
export interface WarehousesQuery {
    limit?: number;
    uri?: string;
    embed?: string[];
    query?: {
        deleted?: boolean;
        active?: boolean;
    };
}
export interface WarehousesResponse {
    data: Warehouse;
    metadata: Record<string, unknown>;
    msg?: string | null;
}
export interface WarehouseResponse {
    data: Warehouse;
    metadata?: {
        count?: number;
        patch?: any;
    };
    msg?: string;
}
export interface WarehousePhoneNumbers {
    line_main?: number;
    line_1?: number;
    line_2?: number;
}
export declare type WarehouseAddressType = 'local' | 'delivery' | 'billing';
export interface WarehouseAddress {
    lines?: string[] | null;
    street?: string | null;
    street_number?: string | null;
    locality?: string | null;
    region?: string | null;
    postal_code?: string | null;
    country?: string | null;
    type?: WarehouseAddressType;
}
export interface WarehouseImage {
    '1x': string;
    avatar: string;
}
export interface Warehouse {
    id?: string;
    name: string;
    short_name?: string | null;
    custom_id?: string | null;
    phonenumbers?: WarehousePhoneNumbers | null;
    addresses?: WarehouseAddress[] | null;
    images?: WarehouseImage | null;
    capacity?: number | null;
    barcode?: string | null;
}
export declare class Warehouses extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: WarehousesOptions;
    uriHelper: UriHelper;
    constructor(options: WarehousesOptions, http: Client);
    getAll(query?: WarehousesQuery | undefined): Promise<WarehousesResponse>;
    getOne(warehouseId: string): Promise<WarehousesResponse>;
    create(warehouse: Warehouse): Promise<WarehousesResponse>;
    put(warehouseId: string, warehouse: Warehouse): Promise<WarehousesResponse>;
    delete(warehouseId: string): Promise<WarehousesResponse>;
}
