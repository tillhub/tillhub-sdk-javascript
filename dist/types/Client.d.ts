import { AxiosInstance } from 'axios';
export interface ClientOptions {
    base?: string;
    timeout?: number;
    headers?: object;
    token?: string;
}
export declare class Client {
    private static instance;
    private axiosInstance;
    private constructor();
    static getInstance(options: ClientOptions): Client;
    getClient(): AxiosInstance;
    setDefaults(optons: ClientOptions): Client;
}
