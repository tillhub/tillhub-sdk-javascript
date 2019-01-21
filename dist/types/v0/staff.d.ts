import { Client } from '../client';
export interface StaffOptions {
    user?: string;
    base?: string;
}
export interface StaffsResponse {
    data: object[];
    metadata: object;
}
export declare class Staff {
    endpoint: string;
    http: Client;
    options: StaffOptions;
    constructor(options: StaffOptions, http: Client);
    getAll(): Promise<StaffsResponse>;
}
