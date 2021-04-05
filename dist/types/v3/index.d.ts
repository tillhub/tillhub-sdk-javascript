export interface AnalyticsHandlerTypesV3 {
    analytics: {
        reports: {
            AnalyticsReportsDatev: any;
            AnalyticsReportsTransactions: any;
        };
    };
}
declare const _default: {
    analytics: {
        reports: {
            AnalyticsReportsDatev: typeof import("./analytics/reports/datev").AnalyticsReportsDatev;
            AnalyticsReportsTransactions: typeof import("./analytics/reports/transactions").AnalyticsReportsTransactions;
        };
    };
};
export default _default;
