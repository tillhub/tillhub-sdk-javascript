import { Client } from '../client';
export interface ThBaseHandlerOptions {
    endpoint: string;
    base: string;
}
export declare class ThBaseHandler {
    private handlerOptions;
    private client;
    constructor(http: Client, handlerOptions: ThBaseHandlerOptions);
}
