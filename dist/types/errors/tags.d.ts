import { BaseError } from './baseError';
export declare class TagsFetchAllFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class TagsFetchOneFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class TagsGetMetaFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class TagsCreationFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class TagsPutFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
