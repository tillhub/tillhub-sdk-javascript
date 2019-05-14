import { Client } from '../client';
export interface TemplatesOptions {
    limit?: number;
    uri?: string;
    query?: any;
}
export declare type TemplateTypes = 'delivery_note_v1' | 'invoice_v1' | 'full_receipt_v1';
export declare type PaperSize = 'A4' | 'letter';
export declare type Font = 'Open Sans';
interface TemplateOptions {
    title?: string;
    logo?: string;
    main_text?: String;
    addresses?: {
        self?: {
            enabled: boolean;
        } | null;
        local?: {
            enabled: boolean;
        } | null;
    } | null;
    font_color?: String;
    font?: Font;
    paper_size?: PaperSize;
}
export interface Template {
    name?: string | null;
    type: TemplateTypes;
    options?: TemplateOptions | null;
    active?: boolean;
    deleted?: boolean;
}
export interface TemplatesPreviewRequestObject {
    body: TemplatesPreviewBody;
    templateId: string;
    query?: TemplatesQuery;
}
export interface TemplatesPreviewBody {
    paper_size?: string;
    title?: string;
    addresses?: object;
    main_text?: string;
    attention?: string;
    font_color?: string;
    font?: string;
}
export interface TemplatesQuery {
    format?: string;
    deleted?: boolean;
    active?: boolean;
}
export interface TemplatesOptions {
    user?: string;
    base?: string;
}
export interface TemplatesResponse {
    data: object[];
    metadata: object;
}
export declare class Templates {
    endpoint: string;
    http: Client;
    options: TemplatesOptions;
    constructor(options: TemplatesOptions, http: Client);
    create(template: Template): Promise<TemplatesResponse>;
    put(templateId: string, template: Template): Promise<TemplatesResponse>;
    getAll(options?: TemplatesOptions | undefined): Promise<TemplatesResponse>;
    preview(requestObject: TemplatesPreviewRequestObject): Promise<TemplatesResponse>;
}
export {};
