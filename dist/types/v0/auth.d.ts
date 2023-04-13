import * as errors from '../errors';
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
    whitelabel?: string;
}
export interface UsernameAuth {
    username: string;
    password: string;
    recaptcha_token?: string;
}
export interface KeyAuth {
    id: string;
    apiKey: string;
}
export interface OrgAuth {
    organisation: string;
    username: string;
    password: string;
    recaptcha_token?: string;
}
export interface SupportAuth {
    token: string;
    client_account: string;
    recaptcha_token?: string;
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
export interface LogoutResponse {
    msg: string;
}
export interface TokenAuth {
    token: string;
}
export declare function isUsernameAuth(obj: any): obj is UsernameAuth;
export declare function isKeyAuth(obj: any): obj is KeyAuth;
export declare function isTokenAuth(obj: any): obj is KeyAuth;
export declare function isOrgAuth(obj: any): obj is KeyAuth;
export interface ErrorObject {
    id: string;
    label: string;
    errorDetails: Record<string, unknown>;
}
export interface AuthResponse {
    token: string;
    user: string;
    name?: string;
    features?: any;
    is_support?: boolean;
    scopes?: string[];
    role?: string;
    subUser?: Record<string, unknown>;
    orgName?: string;
    expiresAt?: string;
    whitelabel?: string;
    errors?: ErrorObject[];
}
export declare class Auth {
    authenticated: boolean;
    options: AuthOptions;
    token?: string;
    user?: string;
    whitelabel?: string | undefined;
    constructor(options: AuthOptions);
    getEndpoint(path?: string): string;
    clearInstance(): void;
    protected determineAuthType(): void;
    authenticate(): Promise<AuthResponse>;
    loginUsername(authData: UsernameAuth): Promise<AuthResponse>;
    requestPasswordReset(target: PasswordResetRequest): Promise<PasswordResetRequestResponse>;
    setNewPassword(nonce: PasswordResetNonce): Promise<PasswordResetRequestResponse>;
    protected setDefaultHeader(user: string, token: string, whitelabel?: string): void;
    logout(token?: string, whitelabel?: string): Promise<LogoutResponse>;
}
export declare class LogoutMissingToken extends errors.BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class LogoutFailed extends errors.BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
