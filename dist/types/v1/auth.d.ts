import v0 from '../v0';
import { AuthOptions, AuthResponse, KeyAuth } from '../v0/auth';
/**
 * @extends "v0.Auth"
 */
export declare class Auth extends v0.Auth {
    authenticated: boolean;
    options: AuthOptions;
    constructor(options: AuthOptions);
    authenticate(): Promise<AuthResponse>;
    loginServiceAccount(authData: KeyAuth): Promise<AuthResponse>;
}
