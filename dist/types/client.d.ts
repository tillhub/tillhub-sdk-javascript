import { AxiosInstance } from 'axios';
declare type Fn = () => any;
export interface ClientOptions {
    base?: string;
    timeout?: number;
    headers?: {
        [key: string]: any;
    };
    token?: string;
    responseInterceptors?: Fn[];
    requestInterceptors?: Fn[];
}
export declare class Client {
    private static instance;
    private axiosInstance;
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
