import { Client } from '../client';
import { BaseError } from '../errors/baseError';
import { ThBaseHandler } from '../base';
export interface IamBackupCodesOptions {
    user?: string;
    base?: string;
}
export interface IamBackupCodesVerify2faResponse {
    success: boolean;
}
export declare class IamBackupCodes extends ThBaseHandler {
    static baseEndpoint: string;
    http: Client;
    options: IamBackupCodesOptions;
    endpoint: string;
    constructor(options: IamBackupCodesOptions, http: Client);
    verify2fa(tenantId: string): Promise<IamBackupCodesVerify2faResponse>;
}
export declare class IamBackupCodesVerify2faFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
