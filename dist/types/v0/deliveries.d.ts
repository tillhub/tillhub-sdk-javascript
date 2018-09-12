import { Client } from '../client';
export interface DeliveriesOptions {
    user?: string;
    base?: string;
}
export interface DeliveriesQuery {
    limit?: number;
    uri?: string;
    embed?: string[];
}
export interface DeliveriesResponse {
    data: object[];
    metadata: object;
    next?: Promise<DeliveriesResponse>;
}
export declare class Deliveries {
    endpoint: string;
    http: Client;
    options: DeliveriesOptions;
    constructor(options: DeliveriesOptions, http: Client);
    getAll(query?: DeliveriesQuery | undefined): Promise<DeliveriesResponse>;
}
