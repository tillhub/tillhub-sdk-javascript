export declare class BaseError {
    constructor(message: string);
}
export declare class AuthenticationFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class UninstantiatedClient extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class TransactionFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
