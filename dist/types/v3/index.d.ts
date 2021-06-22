export interface AnalyticsHandlerTypesV3 {
    analytics: {
        reports: {
            AnalyticsReportsDatev: any;
            AnalyticsReportsTransactions: any;
            AnalyticsReportsBalances: any;
        };
    };
}
declare const _default: {
    analytics: {
        reports: {
            AnalyticsReportsDatev: typeof import("./analytics/reports/datev").AnalyticsReportsDatev;
            AnalyticsReportsTransactions: typeof import("./analytics/reports/transactions").AnalyticsReportsTransactions;
            AnalyticsReportsBalances: typeof import("./analytics/reports/balances").AnalyticsReportsBalances;
        };
    };
};
export default _default;
