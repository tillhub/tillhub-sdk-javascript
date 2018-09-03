/// <reference types="node" />
import * as EventEmitter from 'events';
import { UsernameAuth, TokenAuth } from './v0/Auth';
import { Auth } from './v1/Auth';
import { Transactions } from './v0/Transactions';
import { Client } from './Client';
import * as errors from './Errors';
import v0 from './v0';
import v1 from './v1';
export { v0, v1 };
export interface TillhubSDKOptions {
    credentials: UsernameAuth | TokenAuth;
    base?: string;
}
export declare class Tillhub extends EventEmitter {
    user?: string;
    auth: Auth;
    http?: Client;
    options: TillhubSDKOptions;
    constructor(options: TillhubSDKOptions);
    /**
     * Initialise the SDK instance by authenticating the client
     *
     */
    init(): Promise<errors.AuthenticationFailed | Auth>;
    /**
     * Create an authenticated transactions instance
     *
     */
    transactions(): Transactions;
}
