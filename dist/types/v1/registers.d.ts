import { Client } from '../client';
export interface DeviceConfigurationObject {
    device_token: string;
    bundle_id: string;
    network?: {
        ip: string;
    };
}
export interface RegisterResponse {
    data: object;
}
export interface NotificationResponse {
    data: string;
}
export interface Notification {
    aps?: {
        alert: string | object;
        sound?: string;
        badge?: string;
    };
    data?: {
        command: string;
        args?: string[];
        ui?: boolean;
    };
}
export interface RegistersOptions {
    user?: string;
    base?: string;
}
export interface RegistersQuery {
    start?: string | null;
    deleted?: boolean | null;
    active?: boolean | null;
    branch?: string | null;
    limit?: number;
    uri?: string;
}
export interface RegistersResponse {
    data: object[];
    metadata: object;
    next?: () => Promise<RegistersResponse>;
}
export declare class Registers {
    endpoint: string;
    http: Client;
    options: RegistersOptions;
    constructor(options: RegistersOptions, http: Client);
    getAll(q?: RegistersQuery): Promise<RegistersResponse>;
    get(registerId: string): Promise<RegisterResponse>;
    notify(registerId: string, notification: Notification): Promise<NotificationResponse>;
    updateDeviceConfiguration(registerId: string, deviceConfiguration: DeviceConfigurationObject): Promise<RegisterResponse>;
}
