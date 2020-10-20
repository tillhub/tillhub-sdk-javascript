export interface HandlerOption {
    user?: string;
    base?: string;
}
export interface HandlerQuery {
    uri?: string;
    limit?: number;
    offset?: number;
    query?: any;
    [key: string]: any;
}
export declare class UriHelper {
    baseUri: string;
    constructor(endpoint: string, options: HandlerOption);
    generateBaseUri(path?: string): string;
    generateUriWithQuery(basePath: string, query?: HandlerQuery): string;
}
