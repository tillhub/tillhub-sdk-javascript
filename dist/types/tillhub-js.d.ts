import { UsernameAuth, KeyAuth, TokenAuth } from './v0/auth';
import { Auth } from './v1/auth';
import { Transactions } from './v0/transactions';
import { Taxes } from './v0/taxes';
import { Client } from './client';
import v0 from './v0';
import v1 from './v1';
export { v0, v1 };
export declare const defaultOptions: TillhubSDKOptions;
export interface TillhubSDKOptions {
    credentials?: UsernameAuth | KeyAuth | TokenAuth | undefined;
    base?: string;
    user?: string;
}
export declare class TillhubClient {
    user?: string;
    auth?: Auth;
    http?: Client;
    options: TillhubSDKOptions | undefined;
    constructor(options?: TillhubSDKOptions);
    /**
     * Initialise the SDK instance by authenticating the client
     *
     */
    init(options?: TillhubSDKOptions): void;
    private handleOptions;
    /**
     * Create an authenticated transactions instance
     *
     */
    transactions(): Transactions;
    taxes(): Taxes;
}
export declare class Tillhub extends TillhubClient {
    private static instance;
    constructor(options: TillhubSDKOptions);
    static getInstance(options: TillhubSDKOptions): Tillhub;
}
declare const _default: Tillhub;
export default _default;
