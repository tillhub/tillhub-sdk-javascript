export declare enum AuthTypes {
    username = 1,
    token = 2
}
export interface AuthOptions {
    type?: AuthTypes | undefined;
    credentials?: UsernameAuth | TokenAuth;
    base?: string | undefined;
}
export interface UsernameAuth {
    username: string;
    password: string;
}
export interface TokenAuth {
    id: string;
    apiKey: string;
}
export declare function isUsernameAuth(object: any): object is UsernameAuth;
export declare function isTokenAuth(object: any): object is TokenAuth;
export interface AuthResponse {
    token: string;
    user: string;
    name?: string;
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
