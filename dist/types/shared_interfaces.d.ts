export interface exportJobQuery {
    show_column_name: boolean;
    column_selection?: string[];
    delimiter: 'semicolon' | 'comma';
    documentType: string;
    enclosure: 'single' | 'double';
    email: string;
    emailTemplate?: string;
    timezone?: string | null;
    filename_prefix?: string | null;
    format: 'csv' | 'xls';
    interval?: '1 day' | '7 days' | '1 mons';
    startDate?: string | null;
}
