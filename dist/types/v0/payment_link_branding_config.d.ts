import { Client } from '../client';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface PaymentLinkBrandingConfigurationOptions {
    user?: string;
    base?: string;
}
export interface PaymentLinkBrandingConfigurationQueryOptions {
    limit?: number;
    uri?: string;
    owner?: string;
    query?: Record<string, unknown>;
}
export interface PaymentLinkBrandingConfigurationsResponse {
    data: PaymentLinkBrandingConfiguration[];
    metadata: Record<string, unknown>;
}
export interface PaymentLinkBrandingConfigurationResponse {
    data: PaymentLinkBrandingConfiguration;
    metadata?: {
        count?: number;
        patch?: any;
    };
    msg?: string;
}
export interface PaymentLinkBrandingConfiguration {
    id?: string;
    userId?: string;
    shopName?: string;
    shopLogo?: string;
    brandColor?: string;
    backgroundColor?: string;
    backgroundImage?: string;
    fontStyle?: string;
    formStyle?: string;
    faviconUrl?: string;
    textColor?: string;
    linkColor?: string;
    paymentFormBackgroundColor?: string;
    basketBackgroundColor?: string;
    termsAndConditionsUrl?: string;
    privacyPolicyUrl?: string;
    imprintUrl?: string;
    helpUrl?: string;
    contactUrl?: string;
    successPageUrl?: string;
    failurePageUrl?: string;
    pendingPageUrl?: string;
    cancelPageUrl?: string;
    shadows?: boolean;
    unzerLogoInFooter?: boolean;
}
declare class PaymentLinkBrandingConfigurationReference {
    data: PaymentLinkBrandingConfiguration;
    id?: string;
    metadata?: {
        count?: number;
        patch?: any;
    };
    response: PaymentLinkBrandingConfigurationResponse;
    private readonly options;
    private readonly http;
    constructor(response: PaymentLinkBrandingConfigurationResponse, http: Client, options: PaymentLinkBrandingConfigurationOptions);
}
export declare class PaymentLinkBrandingConfigs extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: PaymentLinkBrandingConfigurationOptions;
    uriHelper: UriHelper;
    constructor(options: PaymentLinkBrandingConfigurationOptions, http: Client);
    getAll(optionsOrQuery?: PaymentLinkBrandingConfigurationQueryOptions | undefined): Promise<PaymentLinkBrandingConfigurationsResponse>;
    get(configurationId: string): Promise<PaymentLinkBrandingConfigurationReference>;
    put(configurationId: string, configuration: PaymentLinkBrandingConfiguration): Promise<PaymentLinkBrandingConfigurationResponse>;
    patch(configurationId: string, configuration: PaymentLinkBrandingConfiguration): Promise<PaymentLinkBrandingConfigurationResponse>;
    create(configuration: PaymentLinkBrandingConfiguration): Promise<PaymentLinkBrandingConfigurationResponse>;
    delete(configurationId: string): Promise<PaymentLinkBrandingConfigurationResponse>;
}
export {};
