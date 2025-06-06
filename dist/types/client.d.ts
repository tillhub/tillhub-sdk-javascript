import { AxiosInstance } from 'axios';
declare type Fn = () => any;
export declare type Timeout = number | undefined;
export interface ClientOptions {
    base?: string;
    timeout?: Timeout;
    headers?: {
        [key: string]: any;
    };
    token?: string;
    responseInterceptors?: Fn[];
    requestInterceptors?: Fn[];
}
export declare class Client {
    private static instance;
    private readonly axiosInstance;
    private responseInterceptorIds;
    private requestInterceptorIds;
    private constructor();
    static getInstance(options: ClientOptions): Client;
    static clearInstance(): void;
    getClient(): AxiosInstance;
    setDefaults(options: ClientOptions): Client;
    clearDefaults(): void;
}
export {};
