/// <reference types="node" />
import * as EventEmitter from 'events';
import { UsernameAuth, TokenAuth } from './v0/Auth';
import { Auth } from './v1/Auth';
import { Transactions } from './v0/Transactions';
import { Client } from './Client';
import v0 from './v0';
import v1 from './v1';
export { v0, v1 };
export declare const defaultOptions: TillhubSDKOptions;
export interface TillhubSDKOptions {
    credentials?: UsernameAuth | TokenAuth | undefined;
    base?: string;
}
export declare class TillhubClient extends EventEmitter {
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
}
export declare class Tillhub extends TillhubClient {
    private static instance;
    constructor(options: TillhubSDKOptions);
    static getInstance(options: TillhubSDKOptions): Tillhub;
}
declare const _default: Tillhub;
export default _default;
