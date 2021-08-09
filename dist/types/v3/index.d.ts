export interface AnalyticsHandlerTypesV3 {
    analytics: {
        reports: {
            AnalyticsReportsDatev: any;
            AnalyticsReportsTransactions: any;
            AnalyticsReportsBalances: any;
            AnalyticsReportsCountingProtocols: any;
        };
    };
}
declare const _default: {
    analytics: {
        reports: {
            AnalyticsReportsDatev: typeof import("./analytics/reports/datev").AnalyticsReportsDatev;
            AnalyticsReportsTransactions: typeof import("./analytics/reports/transactions").AnalyticsReportsTransactions;
            AnalyticsReportsCountingProtocols: typeof import("./analytics/reports/counting-protocols").AnalyticsReportsCountingProtocols;
            AnalyticsReportsBalances: typeof import("./analytics/reports/balances").AnalyticsReportsBalances;
        };
    };
};
export default _default;
