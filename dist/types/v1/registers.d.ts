import { Client } from '../client';
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
}
export declare class Registers {
    endpoint: string;
    http: Client;
    options: RegistersOptions;
    constructor(options: RegistersOptions, http: Client);
    getAll(q?: RegistersQuery): Promise<RegistersResponse>;
}
