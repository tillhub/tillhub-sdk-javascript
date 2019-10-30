import { Client } from '../client';
import { ThBaseHandler } from '../base';
export interface DeviceConfigurationObject {
    device_token: string;
    bundle_id: string;
    network?: {
        ip: string;
    };
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
export interface RegisterResponse {
    data: Register;
}
export interface RegistersResponse {
    data: Register[];
    metadata: object;
    next?: () => Promise<RegistersResponse>;
}
export interface Register {
    id: string;
}
export interface Register {
    name?: string | null;
    description?: string | null;
    register_number: number;
    cost_center: number | null;
}
export declare class Registers extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: RegistersOptions;
    constructor(options: RegistersOptions, http: Client);
    getAll(q?: RegistersQuery): Promise<RegistersResponse>;
    get(registerId: string): Promise<RegisterResponse>;
    notify(registerId: string, notification: Notification): Promise<NotificationResponse>;
    updateDeviceConfiguration(registerId: string, deviceConfiguration: DeviceConfigurationObject): Promise<RegisterResponse>;
    put(registerId: string, register: Register): Promise<RegisterResponse>;
}
