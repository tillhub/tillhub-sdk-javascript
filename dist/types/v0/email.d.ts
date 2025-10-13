import { Client } from '../client';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface EmailOptions {
    user?: string;
    base?: string;
}
export interface MailjetCredentials {
    apiKey: string;
    apiSecret: string;
    defaultSenderMail?: string;
}
export interface MailjetEmail {
    name: string;
    email: string;
    isDefault: boolean;
}
export interface MailjetConfiguration {
    credentials: {
        apiKey: string;
        apiSecret: string;
    };
    settings: {
        emails: MailjetEmail[];
    };
    isActive: boolean;
}
export interface MailjetConfigurationResponse {
    data?: MailjetConfiguration | null;
    msg?: string;
    status?: number;
}
export interface TestCustomMailjetRequest {
    email: string;
}
export interface TestCustomMailjetResponse {
    data?: {
        success: boolean;
        message: string;
    };
    msg?: string;
    status?: number;
}
export interface CustomMailjetCredentialStatusResponse {
    data?: {
        hasCredentials: boolean;
        isValid: boolean;
        lastValidated: string | null;
        error?: string;
        emailsUpdated: boolean;
        defaultSenderChanged: boolean;
        updateCode: 'NONE' | 'MAILJET_SENDER_LIST_SYNCED' | 'MAILJET_DEFAULT_SENDER_CHANGED';
        previousDefaultEmail: string | null;
        newDefaultEmail: string | null;
    };
    msg?: string;
    status?: number;
}
export declare class Email extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: EmailOptions;
    uriHelper: UriHelper;
    constructor(options: EmailOptions, http: Client);
    getMailjetConfiguration(): Promise<MailjetConfigurationResponse>;
    setMailjetConfiguration(credentials: MailjetCredentials): Promise<MailjetConfigurationResponse>;
    testCustomMailjet(request: TestCustomMailjetRequest): Promise<TestCustomMailjetResponse>;
    getCustomMailjetCredentialStatus(): Promise<CustomMailjetCredentialStatusResponse>;
}
