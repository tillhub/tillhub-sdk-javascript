import { Client } from '../client';
export interface VouchersOptions {
    user?: string;
    base?: string;
}
export interface VouchersQuery {
    limit?: number;
    uri?: string;
}
export interface VouchersResponse {
    data: object[];
    metadata: object;
    msg?: string;
}
export declare class Vouchers {
    endpoint: string;
    http: Client;
    options: VouchersOptions;
    constructor(options: VouchersOptions, http: Client);
    getAll(query?: VouchersQuery | undefined): Promise<VouchersResponse>;
    delete(voucherId: string): Promise<VouchersResponse>;
    count(): Promise<VouchersResponse>;
    getAllLogs(query?: VouchersQuery | undefined): Promise<VouchersResponse>;
    countLogs(): Promise<VouchersResponse>;
}
