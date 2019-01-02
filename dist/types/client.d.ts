import { AxiosInstance } from 'axios';
export interface ClientOptions {
    base?: string;
    timeout?: number;
    headers?: object;
    token?: string;
}
/**
 * The Tillhub HTTP client is an axios instance that carries the state of of Authentication
 * in - if default headers have been set - has Authorization header.
 *
 * Since this class is a singleton we are destroying state internally through `.clearInstance()`.
 */
export declare class Client {
    private static instance;
    private axiosInstance;
    private constructor();
    static getInstance(options: ClientOptions): Client;
    static clearInstance(): void;
    getClient(): AxiosInstance;
    setDefaults(options: ClientOptions): Client;
    clearDefaults(): void;
}
