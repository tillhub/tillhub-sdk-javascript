import { Client } from '../client';
import { BaseError } from '../errors';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface DevicesOptions {
    user?: string;
    base?: string;
}
export interface DevicesQuery {
    limit?: number;
    uri?: string;
    query?: {
        deleted?: boolean;
        active?: boolean;
    };
}
export interface DeviceBindRequest {
    token: string;
    register: string;
    client_account: string;
}
export interface DevicesResponse {
    data: object[];
    metadata: object;
    next?: () => Promise<DevicesResponse>;
}
export interface DeviceResponse {
    data: Device;
    metadata?: {
        count?: number;
        patch?: any;
    };
    msg?: string;
}
export interface DeviceContentResponse {
    data: DeviceContent;
    msg?: string;
}
export interface DeviceContent {
    idle?: object;
    welcome?: object;
}
export interface Device {
    id?: string;
}
export declare type DeviceStatusType = 'bound' | 'pending';
export declare type DeviceTypeType = 'cfd' | 'printer';
export interface Device {
    status?: DeviceStatusType;
    register?: string;
    type: DeviceTypeType;
    device_configuration: {
        [key: string]: any;
    } | null;
    client_id?: string;
}
export declare class Devices extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: DevicesOptions;
    uriHelper: UriHelper;
    constructor(options: DevicesOptions, http: Client);
    getAll(queryOrOptions?: DevicesQuery | undefined): Promise<DevicesResponse>;
    get(deviceId: string): Promise<DeviceResponse>;
    contents(deviceId: string): Promise<DeviceContentResponse>;
    patch(deviceId: string, device: Device): Promise<DeviceResponse>;
    create(device: Device): Promise<DeviceResponse>;
    bind(deviceOrShortId: string, bindRequest: DeviceBindRequest): Promise<DeviceResponse>;
    delete(deviceId: string): Promise<DeviceResponse>;
}
export declare class DevicesFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class DeviceFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class DeviceContentFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class DevicePatchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class DeviceCreationFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class DevicesCountFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class DeviceDeleteFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class DeviceBindingFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
