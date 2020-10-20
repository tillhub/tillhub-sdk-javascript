import { Client } from '../client';
import { ThBaseHandler } from '../base';
import { UriHelper } from '../uri-helper';
export interface InvoicesOptions {
    user?: string;
    base?: string;
}
export interface InvoicesQuery {
    limit?: number;
    offset?: number;
    filter?: string;
    order_by?: string;
    direction?: string;
    location?: string;
    embed?: string[];
    uri?: string;
    archived?: boolean;
    deleted?: boolean;
    active?: boolean;
}
export interface InvoicesGetOneRequestObject {
    invoiceId: string;
    query?: InvoicesQuery;
}
export interface InvoicesCreateRequestObject {
    body: InvoicesCreateBody;
    query?: InvoicesQuery;
}
export interface InvoicesCreateBody {
    comments?: string | null;
    customer?: string | null;
    customer_external_reference_id?: string | null;
    amount?: Record<string, unknown> | null;
    currency?: string | null;
    issued_at?: string | null;
    balance?: number | null;
    due_date?: string | null;
    status?: string | null;
    archived?: boolean | null;
    archived_at?: string | null;
    custom_id?: string | null;
    external_reference_id?: string | null;
    external_reference?: Record<string, unknown> | null;
    metadata?: Record<string, unknown> | null;
    origins?: string[] | null;
    related_to?: string[] | null;
    depends_on?: string[] | null;
    deleted?: boolean | null;
    active?: boolean | null;
    assignee?: string | null;
    assigned_by?: string | null;
}
export interface InvoicesUpdateRequestObject {
    body: InvoicesUpdateBody;
    invoiceId: string;
    query?: InvoicesQuery;
}
export interface InvoicesUpdateBody {
    comments?: string | null;
    customer?: string | null;
    customer_external_reference_id?: string | null;
    amount?: Record<string, unknown> | null;
    currency?: string | null;
    issued_at?: string | null;
    balance?: number | null;
    due_date?: string | null;
    status?: string | null;
    archived?: boolean | null;
    archived_at?: string | null;
    custom_id?: string | null;
    external_reference_id?: string | null;
    external_reference?: Record<string, unknown> | null;
    metadata?: Record<string, unknown> | null;
    origins?: string[] | null;
    related_to?: string[] | null;
    depends_on?: string[] | null;
    deleted?: boolean | null;
    active?: boolean | null;
    assignee?: string | null;
    assigned_by?: string | null;
}
export interface InvoicesSimpleUpdateRequestBody {
    invoiceId: string;
    query?: InvoicesQuery;
}
export interface InvoicesResponse {
    data?: Array<Record<string, unknown>>;
    metadata?: Record<string, unknown>;
    next?: () => Promise<InvoicesResponse>;
    msg?: string;
}
export declare class Invoices extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: InvoicesOptions;
    uriHelper: UriHelper;
    constructor(options: InvoicesOptions, http: Client);
    generateUriQueryEmbed(base: string, query?: InvoicesQuery): string;
    getAll(query?: InvoicesQuery | undefined): Promise<InvoicesResponse>;
    getMeta(): Promise<InvoicesResponse>;
    getOne(requestObject: InvoicesGetOneRequestObject): Promise<InvoicesResponse>;
    create(requestObject: InvoicesCreateRequestObject): Promise<InvoicesResponse>;
    update(requestObject: InvoicesUpdateRequestObject): Promise<InvoicesResponse>;
    deleteOne(invoiceId: string): Promise<InvoicesResponse>;
}
