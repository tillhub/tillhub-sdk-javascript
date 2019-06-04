import { Client } from '../client';
import { UriHelper } from '../uri-helper';
export interface ExportsOptions {
    user?: string;
    base?: string;
}
export interface ExportsQueryOrOptions {
    limit?: number;
    uri?: string;
    query?: {
        embed?: string[];
        tz?: string;
    };
}
export interface DatevQuery {
    range?: {
        from: string;
        to: string;
    };
    tz?: string;
    password?: string;
    emails?: string[];
}
export interface ExportsResponse {
    data: {
        uri: string;
    }[];
    metadata: object;
    msg?: string | null;
}
export declare class Exports {
    endpoint: string;
    http: Client;
    options: ExportsOptions;
    uriHelper: UriHelper;
    constructor(options: ExportsOptions, http: Client);
    datev(dateQuery: DatevQuery, queryOrOptions: ExportsQueryOrOptions): Promise<ExportsResponse>;
}
