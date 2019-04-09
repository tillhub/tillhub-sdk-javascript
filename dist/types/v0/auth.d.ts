export declare enum AuthTypes {
    username = 1,
    key = 2,
    token = 3,
    org = 4,
    support = 5
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
export interface OrgAuth {
    organisation: string;
    username: string;
    password: string;
}
export interface SupportAuth {
    token: string;
    client_account: string;
}
export interface PasswordResetRequest {
    email: string;
}
export interface PasswordResetNonce {
    password: string;
    password_reset_id: string;
}
export interface PasswordResetRequestResponse {
    msg: string;
}
export interface TokenAuth {
    token: string;
}
export declare function isUsernameAuth(object: any): object is UsernameAuth;
export declare function isKeyAuth(object: any): object is KeyAuth;
export declare function isTokenAuth(object: any): object is KeyAuth;
export declare function isOrgAuth(object: any): object is KeyAuth;
export interface AuthResponse {
    token: string;
    user: string;
    name?: string;
    features?: any;
    is_support?: boolean;
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
    /**
     * Initialise the SDK instance by authenticating the client
     *
     */
    clearInstance(): void;
    protected determineAuthType(): void;
    authenticate(): Promise<AuthResponse>;
    loginUsername(authData?: UsernameAuth): Promise<AuthResponse>;
    requestPasswordReset(target: PasswordResetRequest): Promise<PasswordResetRequestResponse>;
    setNewPassword(nonce: PasswordResetNonce): Promise<PasswordResetRequestResponse>;
    protected setDefaultHeader(user: string, token: string): void;
}
