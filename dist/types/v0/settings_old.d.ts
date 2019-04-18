import { Client } from '../client';
export interface LegacySettingsOptions {
    user?: string;
    base?: string;
}
export interface LegacySetting {
    id?: number;
    product_number_length?: number;
    require_cashier_pin?: number;
    barcode_length?: number;
    product_group_number_length?: number;
    customer_number_length?: number;
    show_product_number?: number;
    show_product_group_number?: number;
    cash_payment_type?: number;
    login?: number;
    auto_product_number_enabled?: number;
    auto_product_group_number_enabled?: number;
    auto_customer_number_enabled?: number;
    auto_staff_number_enabled?: number;
    staff_number_length?: number;
    require_salesman_pin?: number;
    zedas_url?: string;
    templater_url?: string;
    invoice_id?: number;
    fleurop_voucher?: number;
    print_without_tax_enabled?: number;
    fa_transit_account?: string;
    shop_url?: string;
    franchise_id?: string;
    updated_at?: string;
    update_id?: number;
    customer_number_type?: string;
    supported_languages?: string;
    skr_transit?: string;
}
export interface LegacySettingsResponse {
    data: LegacySetting[];
    metadata: {
        count: number;
    };
}
export interface LegacySettingResponse {
    data: LegacySetting;
    metadata: {
        count: number;
    };
}
export declare class LegacySettings {
    endpoint: string;
    http: Client;
    options: LegacySettingsOptions;
    constructor(options: LegacySettingsOptions, http: Client);
    getAll(): Promise<LegacySettingsResponse>;
    get(LegacySettingId: string): Promise<LegacySettingResponse>;
    update(LegacySettingId: string, LegacySetting: LegacySetting): Promise<LegacySettingResponse>;
}
