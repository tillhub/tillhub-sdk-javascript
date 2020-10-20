import { Client } from '../client';
import { BaseError } from '../errors';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface DeviceGroupsOptions {
    user?: string;
    base?: string;
}
export interface DeviceGroupsQuery {
    limit?: number;
    uri?: string;
    query?: {
        deleted?: boolean;
        active?: boolean;
        name?: string;
    };
}
export interface DeviceGroupsResponse {
    data: DeviceGroup[];
    metadata: Record<string, unknown>;
    next?: () => Promise<DeviceGroupsResponse>;
}
export interface DeviceGroupResponse {
    data?: DeviceGroup;
    metadata?: {
        count?: number;
        patch?: any;
    };
    msg?: string;
}
export interface DeviceGroup {
    name?: string;
    description?: string;
    devices?: string[];
    active?: boolean;
    deleted?: boolean;
}
export declare class DeviceGroups extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: DeviceGroupsOptions;
    uriHelper: UriHelper;
    constructor(options: DeviceGroupsOptions, http: Client);
    getAll(query?: DeviceGroupsQuery | undefined): Promise<DeviceGroupsResponse>;
    get(deviceGroupId: string): Promise<DeviceGroupResponse>;
    put(deviceGroupId: string, deviceGroup: DeviceGroup): Promise<DeviceGroupResponse>;
    create(deviceGroup: DeviceGroup): Promise<DeviceGroupResponse>;
    delete(deviceGroupId: string): Promise<DeviceGroupResponse>;
}
export declare class DeviceGroupsFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class DeviceGroupFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class DeviceGroupPutFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class DeviceGroupCreationFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class DeviceGroupDeleteFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
