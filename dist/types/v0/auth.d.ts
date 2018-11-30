export declare enum AuthTypes {
    username = 1,
    key = 2,
    token = 3
}
export interface AuthOptions {
    type?: AuthTypes | undefined;
    credentials?: UsernameAuth | KeyAuth | TokenAuth;
    base?: string | undefined;
    user?: string;
    token?: string;
}
export interface UsernameAuth {
    username: string;
    password: string;
}
export interface KeyAuth {
    id: string;
    apiKey: string;
}
export interface TokenAuth {
    token: string;
}
export declare function isUsernameAuth(object: any): object is UsernameAuth;
export declare function isKeyAuth(object: any): object is KeyAuth;
export declare function isTokenAuth(object: any): object is KeyAuth;
export interface AuthResponse {
    token: string;
    user: string;
    name?: string;
    features?: any;
}
/**
 * @class "v0.Auth"
 */
export declare class Auth {
    authenticated: boolean;
    options: AuthOptions;
    token?: string;
    user?: string;
    constructor(options: AuthOptions);
    protected determineAuthType(): void;
    authenticate(): Promise<AuthResponse>;
    loginUsername(authData?: UsernameAuth): Promise<AuthResponse>;
    protected setDefaultHeader(user: string, token: string): void;
}
