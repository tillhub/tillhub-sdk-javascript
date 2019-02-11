import { Client } from '../../client';
import { UriHelper } from '../../uri-helper';
import { PrintOptions } from '../print';
export interface Printer {
    id?: string;
    name?: string;
    status?: string;
    driver_options?: string;
    types?: string;
    is_default?: boolean;
}
export interface PrintersResponse {
    data: Printer[];
    metadata: object;
    msg?: string;
}
export interface PrinterResponse {
    data: Printer;
    metadata: object;
    msg?: string;
}
export declare class Printers {
    http: Client;
    options: PrintOptions;
    uriHelper: UriHelper;
    constructor(options: PrintOptions, http: Client, uriHelper: UriHelper);
    getAll(query?: Object): Promise<PrintersResponse>;
    get(printerId: string): Promise<PrinterResponse>;
    create(printer: Object): Promise<PrinterResponse>;
    update(printerId: string, printer: Object): Promise<PrinterResponse>;
    delete(printerId: string): Promise<PrinterResponse>;
}
