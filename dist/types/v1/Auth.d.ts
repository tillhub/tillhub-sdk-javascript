import * as errors from '../Errors';
import v0 from '../v0';
import { AuthOptions, AuthResponse, TokenAuth } from '../v0/Auth';
/**
 * @extends "v0.Auth"
 */
export declare class Auth extends v0.Auth {
    authenticated: boolean;
    options: AuthOptions;
    constructor(options: AuthOptions);
    authenticate(): Promise<[errors.AuthenticationFailed | null, AuthResponse | null]>;
    loginServiceAccount(authData: TokenAuth): Promise<[errors.AuthenticationFailed | null, AuthResponse | null]>;
}
