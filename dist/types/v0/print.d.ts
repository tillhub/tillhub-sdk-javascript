import { Client } from '../client';
import { UriHelper } from '../uri-helper';
import { Jobs } from './print/jobs';
import { Messages } from './print/messages';
import { Printers } from './print/printers';
export interface PrintOptions {
    user?: string;
    base?: string;
}
export declare class Print {
    endpoint: string;
    http: Client;
    options: PrintOptions;
    uriHelper: UriHelper;
    constructor(options: PrintOptions, http: Client);
    jobs(): Jobs;
    messages(): Messages;
    printers(): Printers;
    subscribeTo(eventName: string): EventSource;
}
