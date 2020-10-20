export declare class BaseError extends Error {
    properties?: Record<string, unknown>;
    message: string;
    constructor(message: string, properties?: Record<string, unknown>);
}
