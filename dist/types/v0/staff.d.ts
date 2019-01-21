import { Client } from '../client';
export interface StaffOptions {
    user?: string;
    base?: string;
}
export interface StaffQuery {
    start?: string | undefined;
    deleted?: boolean | undefined;
    active?: boolean | undefined;
}
export interface StaffResponse {
    data: object[];
    metadata: object;
}
export declare class Staff {
    endpoint: string;
    http: Client;
    options: StaffOptions;
    constructor(options: StaffOptions, http: Client);
    getAll(query?: StaffQuery | undefined): Promise<StaffResponse>;
    meta(): Promise<StaffResponse>;
}
