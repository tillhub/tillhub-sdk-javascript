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
export interface DevicesResponse {
    data: Device[];
    metadata: Record<string, unknown>;
    next?: () => Promise<DevicesResponse>;
}
export interface DeviceResponse {
    data?: Device;
    metadata?: {
        count?: number;
        patch?: any;
    };
    msg?: string;
}
export interface DeviceCreateBody {
    type: 'cfd';
    otpToken: string;
    shortId: string;
}
export declare type DeviceStatusType = 'Advertised' | 'Approved' | 'Disabled';
export declare type DeviceTypeType = 'cfd' | 'printer';
export interface Device {
    id?: string;
    status?: DeviceStatusType;
    register?: string;
    deviceId?: string;
    type?: DeviceTypeType;
    template?: string;
    contents?: {
        [key: string]: any;
    } | null;
    clientId?: string;
}
export declare class Devices extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: DevicesOptions;
    uriHelper: UriHelper;
    constructor(options: DevicesOptions, http: Client);
    getAll(queryOrOptions?: DevicesQuery | undefined): Promise<DevicesResponse>;
    meta(queryOrOptions?: DevicesQuery): Promise<DevicesResponse>;
    get(deviceId: string): Promise<DeviceResponse>;
    put(deviceId: string, device: Device): Promise<DeviceResponse>;
    create(device: DeviceCreateBody): Promise<DeviceResponse>;
    delete(deviceId: string): Promise<DeviceResponse>;
}
export declare class DevicesFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class DeviceFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class DevicesMetaFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class DevicePutFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class DeviceCreationFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class DeviceDeleteFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
